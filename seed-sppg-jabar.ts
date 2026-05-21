import "dotenv/config";
import { prisma } from "./src/lib/prisma";
import bcrypt from "bcryptjs";

const SPPG_SEED_DATA = [
  {
    namaDapur: "Dapur Berkah Nusantara - Bandung",
    email: "berkah.bandung@sppg.id",
    kabupaten: "Kota Bandung",
    kecamatan: "Coblong",
    alamat: "Jl. Ir. H. Juanda No. 120, Kota Bandung",
    lat: -6.892,
    lng: 107.615,
    status: "PENDING"
  },
  {
    namaDapur: "Dapur Sehat Anak Bangsa - Bogor",
    email: "sehat.bogor@sppg.id",
    kabupaten: "Kota Bogor",
    kecamatan: "Bogor Tengah",
    alamat: "Jl. Pajajaran No. 35, Kota Bogor",
    lat: -6.595,
    lng: 106.805,
    status: "PENDING"
  },
  {
    namaDapur: "Gizi Unggul Harapan - Bekasi",
    email: "gizi.bekasi@sppg.id",
    kabupaten: "Kota Bekasi",
    kecamatan: "Bekasi Barat",
    alamat: "Jl. Jend. Sudirman No. 45, Kota Bekasi",
    lat: -6.234,
    lng: 106.993,
    status: "PENDING"
  },
  {
    namaDapur: "Bunda Catering SPPG - Depok",
    email: "bunda.depok@sppg.id",
    kabupaten: "Kota Depok",
    kecamatan: "Pancoran Mas",
    alamat: "Jl. Margonda Raya No. 100, Kota Depok",
    lat: -6.393,
    lng: 106.831,
    status: "PENDING"
  },
  {
    namaDapur: "Cita Rasa Generasi - Cirebon",
    email: "citarasa.cirebon@sppg.id",
    kabupaten: "Kota Cirebon",
    kecamatan: "Kejaksan",
    alamat: "Jl. Siliwangi No. 11, Kota Cirebon",
    lat: -6.705,
    lng: 108.558,
    status: "AKTIF" // Kita buat 1 sudah aktif
  },
  {
    namaDapur: "SPPG Mitra Sukabumi",
    email: "mitra.sukabumi@sppg.id",
    kabupaten: "Kota Sukabumi",
    kecamatan: "Cikole",
    alamat: "Jl. RE Martadinata No. 50, Kota Sukabumi",
    lat: -6.917,
    lng: 106.927,
    status: "PENDING"
  },
  {
    namaDapur: "Dapur Peduli Kasih - Tasikmalaya",
    email: "peduli.tasikmalaya@sppg.id",
    kabupaten: "Kota Tasikmalaya",
    kecamatan: "Tawang",
    alamat: "Jl. HZ. Mustofa No. 80, Kota Tasikmalaya",
    lat: -7.327,
    lng: 108.223,
    status: "PENDING"
  }
];

async function main() {
  console.log("Memulai proses seeding SPPG Jawa Barat...");
  
  const hashedPassword = await bcrypt.hash("password123", 10);

  for (const data of SPPG_SEED_DATA) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!existingUser) {
      console.log(`Membuat akun: ${data.namaDapur}...`);
      await prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          name: data.namaDapur,
          role: "SPPG",
          sppg: {
            create: {
              namaDapur: data.namaDapur,
              alamat: data.alamat,
              latitude: data.lat,
              longitude: data.lng,
              kecamatan: data.kecamatan,
              kabupaten: data.kabupaten, // Di DB provinsi belum ada, data geojson provinsi filter pakai kabupaten / JAWA BARAT dsb
              kapasitasMax: 1500,
              // @ts-ignore
              status: data.status,
            }
          }
        }
      });
    } else {
      console.log(`Akun ${data.email} sudah ada.`);
    }
  }

  console.log("Seeding selesai!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
