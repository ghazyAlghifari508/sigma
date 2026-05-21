'use server';

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Role, StatusDapur } from "@prisma/client";

export async function registerUser(formData: FormData) {
  try {
    const role = formData.get("role") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const namaSekolah = formData.get("sekolah") as string;
    const provinsi = formData.get("provinsi") as string;

    if (!email || !password || !namaSekolah) {
      return { success: false, error: "Data tidak lengkap" };
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { success: false, error: "Email sudah terdaftar" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Cari atau buat sekolah (karena database sekolah mungkin kosong)
    let sekolah = await prisma.sekolah.findFirst({
      where: { nama: namaSekolah }
    });

    if (!sekolah) {
      sekolah = await prisma.sekolah.create({
        data: {
          nama: namaSekolah,
          alamat: "-",
          latitude: -6.9 + (Math.random() * 0.5 - 0.25), // Random sekitar Jabar
          longitude: 107.6 + (Math.random() * 0.5 - 0.25),
          kecamatan: "-",
          kabupaten: provinsi || "Unknown",
          jumlahSiswa: 0
        }
      });
    }

    if (role === "siswa") {
      const namaLengkap = formData.get("namaLengkap") as string;

      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: namaLengkap || "Siswa Baru",
          role: Role.SISWA,
          siswa: {
            create: {
              sekolahId: sekolah.id,
            }
          }
        }
      });
    } else if (role === "sppg") {
      const namaDapur = formData.get("namaDapur") as string;
      
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: namaDapur || "Dapur Baru",
          role: Role.SPPG,
          sppg: {
            create: {
              namaDapur: namaDapur || "Dapur Baru",
              alamat: "-",
              latitude: -6.9 + (Math.random() * 0.5 - 0.25), // Random sekitar Jabar
              longitude: 107.6 + (Math.random() * 0.5 - 0.25),
              kecamatan: "-",
              kabupaten: provinsi || "Unknown",
              kapasitasMax: 1000,
              status: StatusDapur.PENDING
            }
          }
        }
      });
    }

    return { success: true };
  } catch (error: any) {
    console.error("Register error:", error);
    return { success: false, error: error.message || "Gagal mendaftar" };
  }
}
