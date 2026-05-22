"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

/**
 * Utility: Haversine Formula untuk menghitung jarak antara 2 koordinat bumi dalam KM
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius bumi dalam KM
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance; // Jarak dalam KM
}

export async function getSppgProfile() {
  const session = await auth();
  if (!session || session.user.role !== "SPPG") return null;

  const sppg = await prisma.sPPG.findUnique({
    where: { userId: session.user.id },
  });

  return sppg;
}

export async function getSekolahSasaranSppg() {
  const sppg = await getSppgProfile();
  if (!sppg) return [];

  const dapurSekolah = await prisma.dapurSekolah.findMany({
    where: { sppgId: sppg.id },
    include: { sekolah: true },
  });

  return dapurSekolah.map(ds => {
    // Hitung jarak real-time menggunakan Haversine
    const jarakHitung = calculateDistance(
      sppg.latitude, sppg.longitude,
      ds.sekolah.latitude, ds.sekolah.longitude
    );
    
    return {
      ...ds.sekolah,
      jarakKm: Number(jarakHitung.toFixed(2))
    }
  });
}

export async function getDistribusiSppg() {
  const sppg = await getSppgProfile();
  if (!sppg) return [];

  const distribusi = await prisma.distribusi.findMany({
    where: { sppgId: sppg.id },
    include: { sekolah: true },
    orderBy: { tanggal: "desc" },
  });

  return distribusi;
}

export async function submitDistribusi(data: { sekolahId: string; jumlahPorsi: number; keterangan?: string }) {
  const session = await auth();
  if (!session || session.user.role !== "SPPG") return { success: false, error: "Unauthorized" };

  const sppg = await getSppgProfile();
  if (!sppg) return { success: false, error: "SPPG profile not found" };

  try {
    const today = new Date();
    // Normalisasi waktu ke jam 00:00 untuk menghindari duplikat pada tanggal yang sama
    today.setHours(0, 0, 0, 0);

    await prisma.distribusi.upsert({
      where: {
        sppgId_sekolahId_tanggal: {
          sppgId: sppg.id,
          sekolahId: data.sekolahId,
          tanggal: today
        }
      },
      update: {
        jumlahPorsi: data.jumlahPorsi,
        keterangan: data.keterangan || "Diperbarui"
      },
      create: {
        sppgId: sppg.id,
        sekolahId: data.sekolahId,
        tanggal: today,
        jumlahPorsi: data.jumlahPorsi,
        keterangan: data.keterangan || "Terkirim",
      }
    });

    revalidatePath("/dashboard/sppg");
    revalidatePath("/dashboard/sppg/distribusi");
    return { success: true };
  } catch (error: any) {
    console.error("Submit distribusi error:", error);
    return { success: false, error: error.message };
  }
}

export async function getKeluhanSppg() {
  const sppg = await getSppgProfile();
  if (!sppg) return [];

  const laporan = await prisma.laporan.findMany({
    where: { sppgId: sppg.id },
    include: {
      siswa: {
        include: { sekolah: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return laporan;
}

export async function evaluasiLaporanSppg(laporanId: string, tanggapan: string) {
  const session = await auth();
  if (!session || session.user.role !== "SPPG") return { success: false, error: "Unauthorized" };

  const sppg = await getSppgProfile();
  if (!sppg) return { success: false, error: "SPPG profile not found" };

  try {
    const laporan = await prisma.laporan.findUnique({ where: { id: laporanId } });
    if (!laporan || laporan.sppgId !== sppg.id) {
      return { success: false, error: "Laporan tidak ditemukan atau bukan wewenang Anda." };
    }

    await prisma.laporan.update({
      where: { id: laporanId },
      data: { 
        status: "SELESAI",
        tanggapan 
      }
    });

    revalidatePath("/dashboard/sppg/keluhan");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getSekolahByLokasiSppg() {
  const sppg = await getSppgProfile();
  if (!sppg) return [];

  const sekolah = await prisma.sekolah.findMany({
    where: { kabupaten: sppg.kabupaten },
    orderBy: { nama: "asc" },
  });

  return sekolah;
}

export async function assignSekolahToSppg(sekolahId: string) {
  const session = await auth();
  if (!session || session.user.role !== "SPPG") return { success: false, error: "Unauthorized" };

  const sppg = await getSppgProfile();
  if (!sppg) return { success: false, error: "SPPG profile not found" };

  try {
    const sekolah = await prisma.sekolah.findUnique({ where: { id: sekolahId } });
    if (!sekolah) return { success: false, error: "Sekolah tidak ditemukan" };

    // Cek apakah sudah di-assign ke SPPG ini
    const existing = await prisma.dapurSekolah.findFirst({
      where: { sppgId: sppg.id, sekolahId }
    });
    
    if (existing) {
      return { success: false, error: "Sekolah sudah dilayani oleh dapur Anda." };
    }

    const jarakHitung = calculateDistance(
      sppg.latitude, sppg.longitude,
      sekolah.latitude, sekolah.longitude
    );

    await prisma.dapurSekolah.create({
      data: {
        sppgId: sppg.id,
        sekolahId: sekolahId,
        jarakKm: Number(jarakHitung.toFixed(2))
      }
    });

    revalidatePath("/dashboard/sppg");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
