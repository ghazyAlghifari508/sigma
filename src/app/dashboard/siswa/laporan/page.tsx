import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import LaporanClient from "./laporan-client";

export default async function LaporanPage() {
  const session = await auth();
  if (!session || session.user.role !== "SISWA") {
    redirect("/login");
  }

  // Ambil profil siswa dan sekolahnya
  const siswa = await prisma.siswa.findUnique({
    where: { userId: session.user.id },
    include: { sekolah: true }
  });

  if (!siswa || !siswa.sekolah) {
    return <div>Data sekolah tidak ditemukan.</div>;
  }

  // Cari SPPG yang AKTIF di provinsi yang sama dengan sekolah siswa
  // Kita gunakan pola: kabupaten sekolah mengandung nama provinsi atau kota di Jabar
  // Pendekatan: ambil semua SPPG AKTIF, karena semua data SPPG yang terdaftar
  // sudah melewati filter wilayah saat registrasi
  const sppgTerdekat = await prisma.sPPG.findMany({
    where: {
      status: "AKTIF", // Hanya SPPG yang sudah disetujui pemerintah
    },
    select: {
      id: true,
      namaDapur: true,
      kabupaten: true,
    },
    orderBy: { namaDapur: "asc" }
  });

  return (
    <LaporanClient 
      sppgTerdekat={sppgTerdekat} 
      namaSekolah={siswa.sekolah.nama} 
    />
  );
}
