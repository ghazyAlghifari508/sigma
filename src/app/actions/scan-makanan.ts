"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

/**
 * Mendapatkan Riwayat Scan Makanan untuk siswa yang sedang login
 */
export async function getScanHistory() {
  const session = await auth();
  if (!session || session.user.role !== "SISWA") return [];

  const siswa = await prisma.siswa.findUnique({
    where: { userId: session.user.id },
  });

  if (!siswa) return [];

  const history = await prisma.scanMakanan.findMany({
    where: { siswaId: siswa.id },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return history;
}

/**
 * Memproses gambar Base64 ke OpenRouter AI dan menyimpannya ke database
 */
export async function analyzeFoodImage(base64Image: string) {
  const session = await auth();
  if (!session || session.user.role !== "SISWA") {
    return { success: false, error: "Unauthorized" };
  }

  const siswa = await prisma.siswa.findUnique({
    where: { userId: session.user.id },
  });

  if (!siswa) {
    return { success: false, error: "Profile Siswa not found" };
  }

  try {
    // Determine mime type from base64 string
    const match = base64Image.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
    if (!match) {
      return { success: false, error: "Format gambar tidak valid. Gunakan Base64 data URL." };
    }

    const mimeType = match[1];
    const base64Data = match[2];

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    if (!OPENROUTER_API_KEY) {
      return { success: false, error: "OpenRouter API Key tidak dikonfigurasi" };
    }

    // Prepare payload for OpenRouter
    const payload = {
      model: "openrouter/auto",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Anda adalah ahli gizi. Analisis foto makanan ini (kemungkinan makanan Program Makan Bergizi Gratis / MBG Indonesia).

Tentukan apakah makanan ini LAYAK DIMAKAN (aman, tidak basi, tidak kotor, tidak berbahaya).
Kemudian estimasi persentase nutrisi berdasarkan visual makanan.

WAJIB merespons HANYA dengan JSON valid tanpa markdown, format:
{
  "isAman": boolean,
  "layakDimakan": "Layak" | "Tidak Layak" | "Perlu Diperhatikan",
  "analisis": "ringkasan singkat 2-3 kalimat tentang makanan ini",
  "nutrisi": {
    "karbohidrat": number (0-100),
    "protein": number (0-100),
    "lemak": number (0-100),
    "serat": number (0-100),
    "vitamin": number (0-100)
  }
}`
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Data}`
              }
            }
          ]
        }
      ]
    };

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://sigma.vercel.app", // Optional but recommended by OpenRouter
        "X-Title": "SIGMA App",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenRouter error:", response.status, errText);
      return { success: false, error: `OpenRouter error ${response.status}: ${errText.slice(0, 200)}` };
    }

    const data = await response.json();
    let resultText = data.choices?.[0]?.message?.content || "";

    // Bersihkan json block markdown jika ada
    resultText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();

    let parsedResult;
    try {
      parsedResult = JSON.parse(resultText);
    } catch (e) {
      console.error("Gagal parsing JSON dari AI:", resultText);
      return { success: false, error: "AI memberikan format respons yang tidak dikenali." };
    }

    // Save to database
    const scan = await prisma.scanMakanan.create({
      data: {
        siswaId: siswa.id,
        imageUrl: base64Image,
        analisis: parsedResult.analisis || "Tidak ada analisis.",
        isAman: parsedResult.isAman ?? true,
      }
    });

    revalidatePath("/dashboard/siswa/scan");

    return { 
      success: true, 
      data: {
        id: scan.id,
        isAman: scan.isAman,
        analisis: scan.analisis,
        layakDimakan: parsedResult.layakDimakan || (scan.isAman ? "Layak" : "Tidak Layak"),
        nutrisi: parsedResult.nutrisi || null,
      }
    };

  } catch (error: any) {
    console.error("Error analyzing image:", error);
    return { success: false, error: error.message || "Terjadi kesalahan internal" };
  }
}
