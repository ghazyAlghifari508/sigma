import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import { config } from "dotenv";

config();

const connectionString = process.env.DATABASE_URL || "postgresql://postgres.hmmavuqdcpvcurtjdjkn:mGBBEzeBoMu49BuN@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database SIGMA dengan data lengkap...");

  const passwordHash = await bcrypt.hash("sigma123", 10);

  // ─── Sekolah ─────────────────────────────────────────────
  const [sekolah1, sekolah2, sekolah3] = await Promise.all([
    prisma.sekolah.upsert({
      where: { id: "sekolah-001" },
      update: {},
      create: {
        id: "sekolah-001",
        nama: "SDN Sukajadi 01",
        alamat: "Jl. Sukajadi No. 10, Bandung",
        latitude: -6.8944,
        longitude: 107.6048,
        kecamatan: "Sukajadi",
        kabupaten: "Kota Bandung",
        jumlahSiswa: 320,
      },
    }),
    prisma.sekolah.upsert({
      where: { id: "sekolah-002" },
      update: {},
      create: {
        id: "sekolah-002",
        nama: "SDN Coblong 02",
        alamat: "Jl. Dipatiukur No. 35, Bandung",
        latitude: -6.897,
        longitude: 107.6149,
        kecamatan: "Coblong",
        kabupaten: "Kota Bandung",
        jumlahSiswa: 275,
      },
    }),
    prisma.sekolah.upsert({
      where: { id: "sekolah-003" },
      update: {},
      create: {
        id: "sekolah-003",
        nama: "SDN Cicendo 03",
        alamat: "Jl. Pajajaran No. 50, Bandung",
        latitude: -6.9097,
        longitude: 107.6005,
        kecamatan: "Cicendo",
        kabupaten: "Kota Bandung",
        jumlahSiswa: 410,
      },
    }),
  ]);

  console.log("✅ Sekolah tersimpan");

  // ─── Users ───────────────────────────────────────────────
  const [userSiswa, userSppg1, userSppg2, userGov] = await Promise.all([
    prisma.user.upsert({
      where: { email: "siswa@sigma.id" },
      update: {},
      create: {
        id: "user-siswa-001",
        email: "siswa@sigma.id",
        password: passwordHash,
        name: "Budi Santoso",
        role: "SISWA",
      },
    }),
    prisma.user.upsert({
      where: { email: "sppg@sigma.id" },
      update: {},
      create: {
        id: "user-sppg-001",
        email: "sppg@sigma.id",
        password: passwordHash,
        name: "Cahaya Mandiri",
        role: "SPPG",
      },
    }),
    prisma.user.upsert({
      where: { email: "sppg2@sigma.id" },
      update: {},
      create: {
        id: "user-sppg-002",
        email: "sppg2@sigma.id",
        password: passwordHash,
        name: "Nusantara Food",
        role: "SPPG",
      },
    }),
    prisma.user.upsert({
      where: { email: "gov@sigma.id" },
      update: {},
      create: {
        id: "user-gov-001",
        email: "gov@sigma.id",
        password: passwordHash,
        name: "Dinas Kesehatan",
        role: "PEMERINTAH",
      },
    }),
  ]);

  console.log("✅ Users tersimpan");

  // ─── Siswa profile ────────────────────────────────────────
  const siswa1 = await prisma.siswa.upsert({
    where: { userId: userSiswa.id },
    update: {},
    create: {
      id: "siswa-001",
      userId: userSiswa.id,
      sekolahId: sekolah1.id,
      kelas: "5A",
    },
  });

  // ─── SPPG (dapur) ─────────────────────────────────────────
  const [sppg1, sppg2] = await Promise.all([
    prisma.sPPG.upsert({
      where: { userId: userSppg1.id },
      update: {},
      create: {
        id: "sppg-001",
        userId: userSppg1.id,
        namaDapur: "Dapur Cahaya Bandung",
        alamat: "Jl. Setiabudi No. 5, Bandung",
        latitude: -6.89,
        longitude: 107.61,
        kecamatan: "Sukajadi",
        kabupaten: "Kota Bandung",
        kapasitasMax: 500,
        status: "AKTIF",
        tingkatRisiko: "AMAN",
      },
    }),
    prisma.sPPG.upsert({
      where: { userId: userSppg2.id },
      update: {},
      create: {
        id: "sppg-002",
        userId: userSppg2.id,
        namaDapur: "Dapur Nusantara Coblong",
        alamat: "Jl. Dago No. 88, Bandung",
        latitude: -6.885,
        longitude: 107.618,
        kecamatan: "Coblong",
        kabupaten: "Kota Bandung",
        kapasitasMax: 350,
        status: "AKTIF",
        tingkatRisiko: "WASPADA",
      },
    }),
  ]);

  console.log("✅ SPPG tersimpan");

  // ─── DapurSekolah relasi ──────────────────────────────────
  await Promise.all([
    prisma.dapurSekolah.upsert({
      where: { sppgId_sekolahId: { sppgId: sppg1.id, sekolahId: sekolah1.id } },
      update: {},
      create: { id: "ds-001", sppgId: sppg1.id, sekolahId: sekolah1.id, jarakKm: 1.2 },
    }),
    prisma.dapurSekolah.upsert({
      where: { sppgId_sekolahId: { sppgId: sppg1.id, sekolahId: sekolah2.id } },
      update: {},
      create: { id: "ds-002", sppgId: sppg1.id, sekolahId: sekolah2.id, jarakKm: 2.8 },
    }),
    prisma.dapurSekolah.upsert({
      where: { sppgId_sekolahId: { sppgId: sppg2.id, sekolahId: sekolah2.id } },
      update: {},
      create: { id: "ds-003", sppgId: sppg2.id, sekolahId: sekolah2.id, jarakKm: 1.5 },
    }),
    prisma.dapurSekolah.upsert({
      where: { sppgId_sekolahId: { sppgId: sppg2.id, sekolahId: sekolah3.id } },
      update: {},
      create: { id: "ds-004", sppgId: sppg2.id, sekolahId: sekolah3.id, jarakKm: 3.4 },
    }),
  ]);

  // ─── Distribusi ──────────────────────────────────
  const today = new Date();
  today.setHours(7, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  await prisma.distribusi.createMany({
    skipDuplicates: true,
    data: [
      {
        id: "dist-001",
        sppgId: sppg1.id,
        sekolahId: sekolah1.id,
        tanggal: today,
        jumlahPorsi: 320,
        keterangan: "Pengiriman tepat waktu"
      },
      {
        id: "dist-002",
        sppgId: sppg1.id,
        sekolahId: sekolah2.id,
        tanggal: today,
        jumlahPorsi: 150,
        keterangan: "Dalam perjalanan"
      },
      {
        id: "dist-003",
        sppgId: sppg2.id,
        sekolahId: sekolah3.id,
        tanggal: yesterday,
        jumlahPorsi: 410,
        keterangan: "Semua porsi diterima dengan baik"
      }
    ]
  });
  console.log("✅ Distribusi tersimpan");

  // ─── Laporan ──────────────────────────────────
  await prisma.laporan.createMany({
    skipDuplicates: true,
    data: [
      {
        id: "lap-001",
        siswaId: siswa1.id,
        judul: "Keterlambatan Makanan",
        isi: "Makanan datang jam 11 siang, sudah lewat jam istirahat.",
        kategori: "makanan tidak datang",
        status: "DITERIMA",
      },
      {
        id: "lap-002",
        siswaId: siswa1.id,
        judul: "Rasa Makanan Aneh",
        isi: "Sayurnya asam dan bau.",
        kategori: "kualitas",
        status: "DIPROSES",
      }
    ]
  });
  console.log("✅ Laporan tersimpan");

  // ─── Edukasi ──────────────────────────────────
  await prisma.edukasi.createMany({
    skipDuplicates: true,
    data: [
      {
        id: "edu-001",
        judul: "Pentingnya Sarapan Pagi",
        konten: "### Mengapa Sarapan Penting?\n\nSarapan memberikan energi awal bagi otak dan tubuh Anda untuk memulai hari. Penelitian menunjukkan bahwa anak yang sarapan memiliki konsentrasi dan daya ingat yang lebih baik di sekolah.\n\n- **Sumber Energi:** Karbohidrat kompleks dari roti gandum atau oatmeal.\n- **Fokus Otak:** Otak membutuhkan glukosa setelah puasa semalaman.\n- **Menjaga Berat Badan:** Mencegah makan berlebihan di siang hari.\n\nJangan lewatkan sarapan Anda!",
        gambarUrl: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&q=80&w=1000",
        kategori: "Kesehatan",
        isPublished: true,
        authorId: userGov.id,
      },
      {
        id: "edu-002",
        judul: "Mengenal Piring Makanku",
        konten: "### Porsi Ideal dalam Satu Piring\n\nUntuk mendapatkan gizi seimbang, Kementerian Kesehatan RI merekomendasikan panduan *Isi Piringku*:\n\n1. **1/3 Makanan Pokok:** Nasi, jagung, singkong, atau kentang.\n2. **1/3 Sayuran:** Berbagai macam sayuran hijau atau berwarna.\n3. **1/6 Lauk Pauk:** Sumber protein nabati dan hewani (tempe, tahu, ikan, telur, ayam).\n4. **1/6 Buah-buahan:** Sumber vitamin dan mineral.\n\nPastikan piring makanmu berwarna-warni setiap harinya!",
        gambarUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000",
        kategori: "Nutrisi",
        isPublished: true,
        authorId: userGov.id,
      },
      {
        id: "edu-003",
        judul: "Bahaya Mengonsumsi Gula Berlebih",
        konten: "### Batasi Konsumsi Gula Anda\n\nMengonsumsi makanan atau minuman yang terlalu manis bisa berdampak buruk bagi kesehatan jangka panjang.\n\n**Dampak Buruk Gula Berlebih:**\n- Meningkatkan risiko obesitas pada anak.\n- Menyebabkan kerusakan gigi berlubang.\n- Memicu risiko diabetes tipe 2 sejak usia muda.\n\n**Tips:** Ganti minuman manis (seperti es teh manis atau minuman kemasan) dengan air putih atau jus buah murni tanpa tambahan gula.",
        gambarUrl: "https://images.unsplash.com/photo-1622484211148-522f7b8ca5a1?auto=format&fit=crop&q=80&w=1000",
        kategori: "Pola Makan",
        isPublished: true,
        authorId: userGov.id,
      },
      {
        id: "edu-004",
        judul: "Manfaat Minum Air Putih yang Cukup",
        konten: "### Air Putih = Sumber Kehidupan\n\nTubuh kita terdiri dari sekitar 60% air. Mengapa kita butuh minum yang cukup?\n\n- **Mencegah Dehidrasi:** Dehidrasi dapat menyebabkan sakit kepala dan tubuh lemas.\n- **Membantu Pencernaan:** Air penting untuk melancarkan sistem pencernaan.\n- **Menjaga Fungsi Ginjal:** Ginjal membutuhkan air untuk menyaring racun dari tubuh.\n\n**Berapa Banyak?** Anak usia sekolah disarankan minum sekitar 6-8 gelas air setiap harinya. Bawa botol minum sendiri ke sekolah ya!",
        gambarUrl: "https://images.unsplash.com/photo-1548839140-29a749e1abc4?auto=format&fit=crop&q=80&w=1000",
        kategori: "Kesehatan",
        isPublished: true,
        authorId: userGov.id,
      },
      {
        id: "edu-005",
        judul: "Pentingnya Cuci Tangan Sebelum Makan",
        konten: "### Tangan Bersih, Perut Sehat\n\nTangan kita menyentuh banyak benda yang mungkin mengandung kuman dan bakteri sepanjang hari.\n\n**Langkah Cuci Tangan yang Benar:**\n1. Basahi tangan dengan air mengalir.\n2. Gunakan sabun secukupnya.\n3. Gosok telapak, punggung tangan, sela-sela jari, hingga di bawah kuku selama 20 detik.\n4. Bilas bersih dan keringkan.\n\nSelalu ingat mencuci tangan setelah bermain dan sebelum menyentuh makanan, agar terhindar dari penyakit seperti diare.",
        gambarUrl: "https://images.unsplash.com/photo-1584483785135-24c885fb1294?auto=format&fit=crop&q=80&w=1000",
        kategori: "Kebersihan",
        isPublished: true,
        authorId: userGov.id,
      }
    ]
  });
  console.log("✅ Edukasi tersimpan");

  console.log("\n🎉 Seed selesai!");
  console.log("   siswa@sigma.id    / sigma123");
  console.log("   sppg@sigma.id     / sigma123");
  console.log("   sppg2@sigma.id    / sigma123");
  console.log("   gov@sigma.id      / sigma123");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
