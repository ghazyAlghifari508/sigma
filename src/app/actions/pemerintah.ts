"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getMakroAnalitik() {
  const session = await auth();
  if (!session || session.user.role !== "PEMERINTAH") return null;

  // 1. Total Sekolah
  const totalSekolah = await prisma.sekolah.count();

  // 2. Total Siswa
  const sekolah = await prisma.sekolah.findMany({ select: { jumlahSiswa: true } });
  const totalSiswa = sekolah.reduce((acc, curr) => acc + curr.jumlahSiswa, 0);

  // 3. Total Dapur (SPPG)
  const sppg = await prisma.sPPG.findMany();
  const totalDapur = sppg.length;

  // 4. Total Distribusi (Porsi)
  const distribusi = await prisma.distribusi.findMany({ select: { jumlahPorsi: true } });
  const totalPorsiDisalurkan = distribusi.reduce((acc, curr) => acc + curr.jumlahPorsi, 0);

  return {
    totalSekolah,
    totalSiswa,
    totalDapur,
    totalPorsiDisalurkan
  };
}

export async function getGeospasialData() {
  const session = await auth();
  if (!session || session.user.role !== "PEMERINTAH") return { dapurs: [], sekolahs: [] };

  const dapurs = await prisma.sPPG.findMany({
    select: {
      id: true,
      namaDapur: true,
      latitude: true,
      longitude: true,
      tingkatRisiko: true,
      status: true,
      kapasitasMax: true
    }
  });

  const sekolahs = await prisma.sekolah.findMany({
    select: {
      id: true,
      nama: true,
      latitude: true,
      longitude: true,
      jumlahSiswa: true
    }
  });

  return { dapurs, sekolahs };
}

export async function getLaporanForPemerintah() {
  const session = await auth();
  if (!session || session.user.role !== "PEMERINTAH") return [];

  return await prisma.laporan.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      siswa: {
        include: {
          sekolah: true
        }
      },
      sppg: true
    }
  });
}

export async function forwardLaporanKeDapur(laporanId: string) {
  const session = await auth();
  if (!session || session.user.role !== "PEMERINTAH") {
    return { success: false, error: "Unauthorized" };
  }

  const laporan = await prisma.laporan.findUnique({
    where: { id: laporanId },
    include: {
      siswa: {
        include: {
          sekolah: {
            include: {
              dapur: true
            }
          }
        }
      }
    }
  });

  if (!laporan) return { success: false, error: "Laporan tidak ditemukan" };

  // Prioritaskan sppgId yang sudah ada di laporan (dipilih siswa saat lapor)
  // Fallback ke pemetaan sekolah -> dapur jika sppgId kosong
  const targetSppgId = laporan.sppgId || laporan.siswa?.sekolah?.dapur?.[0]?.sppgId;
  
  if (!targetSppgId) {
    return { success: false, error: "Sekolah ini belum dipetakan ke Dapur manapun dan laporan tidak memiliki SPPG tujuan." };
  }

  try {
    await prisma.laporan.update({
      where: { id: laporanId },
      data: {
        status: "DIPROSES",
        sppgId: targetSppgId
      }
    });

    return { success: true };
  } catch (err: any) {
    console.error("Forward Laporan error:", err);
    return { success: false, error: "Terjadi kesalahan sistem." };
  }
}

export async function tolakLaporanPemerintah(laporanId: string) {
  const session = await auth();
  if (!session || session.user.role !== "PEMERINTAH") {
    return { success: false, error: "Unauthorized" };
  }

  await prisma.laporan.update({
    where: { id: laporanId },
    data: { status: "DITOLAK" }
  });

  return { success: true };
}

export async function hapusLaporanPemerintah(laporanId: string) {
  const session = await auth();
  if (!session || session.user.role !== "PEMERINTAH") {
    return { success: false, error: "Unauthorized" };
  }

  await prisma.laporan.delete({
    where: { id: laporanId }
  });

  return { success: true };
}

export async function approveSppg(sppgId: string) {
  const session = await auth();
  if (!session || session.user.role !== "PEMERINTAH") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await prisma.sPPG.update({
      where: { id: sppgId },
      data: { status: "AKTIF", alasanPenolakan: null }
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function rejectSppg(sppgId: string, alasan: string) {
  const session = await auth();
  if (!session || session.user.role !== "PEMERINTAH") {
    return { success: false, error: "Unauthorized" };
  }

  if (!alasan || alasan.trim() === "") {
    return { success: false, error: "Alasan penolakan harus diisi" };
  }

  try {
    await prisma.sPPG.update({
      where: { id: sppgId },
      data: { status: "DITOLAK", alasanPenolakan: alasan }
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getAllSppgForVerification() {
  const session = await auth();
  if (!session || session.user.role !== "PEMERINTAH") return [];

  const sppgList = await prisma.sPPG.findMany({
    orderBy: [
      { status: "asc" }, // PENDING first
      { createdAt: "desc" }
    ],
    include: {
      user: {
        select: { name: true, email: true }
      }
    }
  });

  // Load titik rekomendasi GeoJSON untuk menghitung jarak
  const fs = await import("fs");
  const path = await import("path");
  let rekomenPoints: { lat: number; lng: number }[] = [];

  try {
    const filePath = path.join(process.cwd(), "rekomen (1).geojson");
    const raw = fs.readFileSync(filePath, "utf-8");
    const geojson = JSON.parse(raw);
    rekomenPoints = geojson.features.map((f: any) => ({
      lat: f.geometry.coordinates[1],
      lng: f.geometry.coordinates[0],
    }));
  } catch (e) {
    console.error("Gagal memuat data rekomendasi GeoJSON:", e);
  }

  // Haversine formula — hitung jarak antara 2 titik koordinat (km)
  function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // radius bumi dalam km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  // Untuk setiap SPPG, cari titik rekomendasi terdekat
  const enriched = sppgList.map(sppg => {
    let nearestDist = Infinity;

    for (const rp of rekomenPoints) {
      const dist = haversineKm(sppg.latitude, sppg.longitude, rp.lat, rp.lng);
      if (dist < nearestDist) nearestDist = dist;
    }

    // Tentukan risk label berdasarkan jarak ke rekomendasi terdekat
    let risk_label: string;
    if (nearestDist <= 3) {
      risk_label = "Aman";       // Dekat titik rekomendasi = lokasi strategis
    } else if (nearestDist <= 6) {
      risk_label = "Rawan";      // Agak jauh
    } else {
      risk_label = "Bahaya";     // Jauh dari titik rekomendasi = tidak strategis
    }

    return {
      ...sppg,
      distance_km: Math.round(nearestDist * 10) / 10, // 1 desimal
      risk_label,
    };
  });

  return enriched;
}
