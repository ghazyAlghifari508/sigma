"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

/**
 * Mendapatkan data Siswa yang sedang login beserta Sekolahnya
 */
export async function getSiswaProfile() {
  const session = await auth();
  if (!session || session.user.role !== "SISWA") return null;

  const siswa = await prisma.siswa.findUnique({
    where: { userId: session.user.id },
    include: { sekolah: true },
  });

  return siswa;
}

/**
 * Mendapatkan Dapur (SPPG) yang melayani sekolah siswa
 */
export async function getDapurLayanan() {
  const profile = await getSiswaProfile();
  if (!profile) return null;

  // Cari relasi dapur yang melayani sekolah ini
  const dapurSekolah = await prisma.dapurSekolah.findFirst({
    where: { sekolahId: profile.sekolahId },
    include: { sppg: true },
  });

  return dapurSekolah?.sppg || null;
}

/**
 * Mendapatkan Riwayat Distribusi harian untuk sekolah siswa
 */
export async function getRiwayatDistribusiSiswa() {
  const profile = await getSiswaProfile();
  if (!profile) return [];

  const distribusi = await prisma.distribusi.findMany({
    where: { sekolahId: profile.sekolahId },
    orderBy: { tanggal: "desc" },
    take: 10, // Ambil 10 histori terbaru
    include: {
      sppg: { select: { namaDapur: true } }
    }
  });

  return distribusi;
}

/**
 * Mendapatkan Riwayat Laporan/Keluhan yang pernah dibuat siswa
 */
export async function getRiwayatLaporan() {
  const profile = await getSiswaProfile();
  if (!profile) return [];

  const laporan = await prisma.laporan.findMany({
    where: { siswaId: profile.id },
    orderBy: { createdAt: "desc" },
  });

  return laporan;
}

/**
 * Mengirim Keluhan/Laporan baru
 */
export async function submitLaporan(data: { judul: string; isi: string; kategori: string }) {
  const session = await auth();
  if (!session || session.user.role !== "SISWA") {
    return { success: false, error: "Unauthorized" };
  }

  const profile = await getSiswaProfile();
  if (!profile) return { success: false, error: "Profile not found" };

  try {
    await prisma.laporan.create({
      data: {
        siswaId: profile.id,
        judul: data.judul,
        isi: data.isi,
        kategori: data.kategori,
        status: "DITERIMA", // Default
      },
    });

    revalidatePath("/dashboard/siswa");
    revalidatePath("/dashboard/siswa/laporan");
    return { success: true };
  } catch (error: any) {
    console.error("Submit laporan error:", error);
    return { success: false, error: error.message || "Terjadi kesalahan" };
  }
}
