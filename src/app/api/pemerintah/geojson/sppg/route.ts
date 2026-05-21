import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

let cachedData: any[] | null = null;

function loadData() {
  if (cachedData) return cachedData;

  const filePath = path.join(process.cwd(), "sppg_existing (1).geojson");
  const raw = fs.readFileSync(filePath, "utf-8");
  const geojson = JSON.parse(raw);

  cachedData = geojson.features.map((f: any) => ({
    lng: f.geometry.coordinates[0],
    lat: f.geometry.coordinates[1],
    nama_sppg: f.properties.nama_sppg,
    provinsi: f.properties.provinsi,
    kabupaten: f.properties.kabupaten,
    kecamatan: f.properties.kecamatan,
  }));

  return cachedData;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const province = searchParams.get("province");

    let data = loadData()!;

    if (province && province !== "Semua") {
      // SPPG provinsi pakai uppercase, normalize dulu
      const normalized = province.toUpperCase();
      data = data.filter((d: any) => d.provinsi === normalized);
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (err: any) {
    console.error("Error loading SPPG GeoJSON:", err);
    return NextResponse.json(
      { error: "Gagal memuat data SPPG" },
      { status: 500 }
    );
  }
}
