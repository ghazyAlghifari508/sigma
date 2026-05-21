import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";

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

    // Ambil data SPPG dari database riil
    const dbSppgs = await prisma.sPPG.findMany(
      province && province !== "Semua" ? { where: { kabupaten: { contains: province, mode: 'insensitive' } } } : undefined
    );

    const mappedDbSppg = dbSppgs.map(d => ({
      id: d.id,
      lng: d.longitude,
      lat: d.latitude,
      nama_sppg: d.namaDapur,
      provinsi: "JAWA BARAT", // Mock for Hackathon since DB currently sets kabupaten as province in dummy
      kabupaten: d.kabupaten,
      kecamatan: d.kecamatan,
      status: d.status,
    }));

    // Gabungkan data statis dan data riil
    const finalData = [...data, ...mappedDbSppg];

    return NextResponse.json(finalData, {
      headers: {
        "Cache-Control": "public, max-age=0", // Disable cache to see new pending SPPG instantly
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
