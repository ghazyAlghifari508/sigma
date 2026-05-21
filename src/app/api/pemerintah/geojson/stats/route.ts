import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Cache stats sehingga hanya dihitung sekali
let cachedStats: any | null = null;

function computeStats() {
  if (cachedStats) return cachedStats;

  // --- Schools ---
  const schoolsPath = path.join(process.cwd(), "schools_risk_final (2).geojson");
  const schoolsRaw = fs.readFileSync(schoolsPath, "utf-8");
  const schoolsGeo = JSON.parse(schoolsRaw);

  const totalSekolah = schoolsGeo.features.length;
  const riskCounts: Record<string, number> = { Bahaya: 0, Waspada: 0, Aman: 0 };
  const provinceCounts: Record<string, { total: number; bahaya: number; waspada: number; aman: number }> = {};

  for (const f of schoolsGeo.features) {
    const { risk_label, province } = f.properties;
    if (riskCounts[risk_label] !== undefined) riskCounts[risk_label]++;

    if (!provinceCounts[province]) {
      provinceCounts[province] = { total: 0, bahaya: 0, waspada: 0, aman: 0 };
    }
    provinceCounts[province].total++;
    if (risk_label === "Bahaya") provinceCounts[province].bahaya++;
    else if (risk_label === "Waspada") provinceCounts[province].waspada++;
    else if (risk_label === "Aman") provinceCounts[province].aman++;
  }

  // --- SPPG ---
  const sppgPath = path.join(process.cwd(), "sppg_existing (1).geojson");
  const sppgRaw = fs.readFileSync(sppgPath, "utf-8");
  const sppgGeo = JSON.parse(sppgRaw);
  const totalSppg = sppgGeo.features.length;

  // --- Rekomendasi ---
  const rekomenPath = path.join(process.cwd(), "rekomen (1).geojson");
  const rekomenRaw = fs.readFileSync(rekomenPath, "utf-8");
  const rekomenGeo = JSON.parse(rekomenRaw);
  const totalRekomen = rekomenGeo.features.length;

  // Daftar provinsi (sorted)
  const provinces = Object.keys(provinceCounts).sort();

  cachedStats = {
    totalSekolah,
    totalSppg,
    totalRekomen,
    riskCounts,
    provinces,
    provinceCounts,
  };

  return cachedStats;
}

export async function GET() {
  try {
    const stats = computeStats();

    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (err: any) {
    console.error("Error computing stats:", err);
    return NextResponse.json(
      { error: "Gagal menghitung statistik" },
      { status: 500 }
    );
  }
}
