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

  // Cari dapur pertama yang melayani sekolah ini
  const dapurRel = laporan.siswa.sekolah.dapur[0];
  
  if (!dapurRel) {
    return { success: false, error: "Sekolah ini belum dipetakan ke Dapur manapun." };
  }

  try {
    await prisma.laporan.update({
      where: { id: laporanId },
      data: {
        status: "DIPROSES",
        sppgId: dapurRel.sppgId
      }
    });

    return { success: true };
  } catch (err: any) {
    console.error("Forward Laporan error:", err);
    return { success: false, error: "Terjadi kesalahan sistem." };
  }
}
