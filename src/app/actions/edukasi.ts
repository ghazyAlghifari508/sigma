"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type EdukasiCreateInput = {
  judul: string;
  konten: string;
  gambarUrl?: string;
  kategori: string;
  isPublished: boolean;
};

export type EdukasiUpdateInput = Partial<EdukasiCreateInput>;

/**
 * Get all Edukasi for Pemerintah (Admin view)
 */
export async function getSemuaEdukasi() {
  try {
    const data = await prisma.edukasi.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: { select: { name: true } },
      },
    });
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching semua edukasi:", error);
    return { success: false, error: "Gagal mengambil data edukasi" };
  }
}

/**
 * Get only published Edukasi for Siswa
 */
export async function getEdukasiPublished() {
  try {
    const data = await prisma.edukasi.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      include: {
        author: { select: { name: true } },
      },
    });
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching published edukasi:", error);
    return { success: false, error: "Gagal mengambil data edukasi" };
  }
}

/**
 * Get single Edukasi by ID
 */
export async function getEdukasiById(id: string) {
  try {
    const data = await prisma.edukasi.findUnique({
      where: { id },
      include: {
        author: { select: { name: true } },
      },
    });
    if (!data) return { success: false, error: "Edukasi tidak ditemukan" };
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching edukasi by id:", error);
    return { success: false, error: "Gagal mengambil data edukasi" };
  }
}

/**
 * Create new Edukasi
 */
export async function createEdukasi(authorId: string, data: EdukasiCreateInput) {
  try {
    await prisma.edukasi.create({
      data: {
        ...data,
        authorId,
      },
    });
    revalidatePath("/dashboard/pemerintah/edukasi");
    revalidatePath("/dashboard/siswa/edukasi");
    return { success: true };
  } catch (error) {
    console.error("Error creating edukasi:", error);
    return { success: false, error: "Gagal membuat edukasi baru" };
  }
}

/**
 * Update existing Edukasi
 */
export async function updateEdukasi(id: string, data: EdukasiUpdateInput) {
  try {
    await prisma.edukasi.update({
      where: { id },
      data,
    });
    revalidatePath("/dashboard/pemerintah/edukasi");
    revalidatePath("/dashboard/siswa/edukasi");
    return { success: true };
  } catch (error) {
    console.error("Error updating edukasi:", error);
    return { success: false, error: "Gagal mengupdate edukasi" };
  }
}

/**
 * Delete Edukasi
 */
export async function deleteEdukasi(id: string) {
  try {
    await prisma.edukasi.delete({
      where: { id },
    });
    revalidatePath("/dashboard/pemerintah/edukasi");
    revalidatePath("/dashboard/siswa/edukasi");
    return { success: true };
  } catch (error) {
    console.error("Error deleting edukasi:", error);
    return { success: false, error: "Gagal menghapus edukasi" };
  }
}
