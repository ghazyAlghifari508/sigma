import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Cache parsed data di memory — parse sekali, reuse berulang
let cachedData: any[] | null = null;

function loadData() {
  if (cachedData) return cachedData;

  const filePath = path.join(process.cwd(), "schools_risk_final (2).geojson");
  const raw = fs.readFileSync(filePath, "utf-8");
  const geojson = JSON.parse(raw);

  // Simplifikasi: buang struktur GeoJSON, ambil field penting saja
  cachedData = geojson.features.map((f: any) => ({
    lng: f.geometry.coordinates[0],
    lat: f.geometry.coordinates[1],
    name: f.properties.name,
    province: f.properties.province,
    stage: f.properties.stage,
    dist_km: f.properties.dist_km,
    risk_label: f.properties.risk_label,
  }));

  return cachedData;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const province = searchParams.get("province");

    let data = loadData()!;

    if (province && province !== "Semua") {
      data = data.filter((d: any) => d.province === province);
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (err: any) {
    console.error("Error loading schools GeoJSON:", err);
    return NextResponse.json(
      { error: "Gagal memuat data sekolah" },
      { status: 500 }
    );
  }
}
