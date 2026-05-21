# PRD — SIGMA
### Strategic Intelligence for Gizi & Mapping Analysis
**Versi:** 1.0.0
**Tanggal:** 21 Mei 2026
**Tim:** Raja Iblis — Ghazy Nabil Alghifari, Muhammad Haikal, Dava Nur Khalik Ilham
**Kompetisi:** IN:NOVATE – CodeUp! 2026 · Politeknik Astra
**Institusi:** S1 Terapan Sistem Informasi Kota Cerdas, Fakultas Ilmu Terapan, Universitas Telkom

---

## Daftar Isi

1. [Overview](#1-overview)
2. [Goals & Success Metrics](#2-goals--success-metrics)
3. [Requirements](#3-requirements)
4. [Core Features](#4-core-features)
5. [User Flow](#5-user-flow)
6. [Architecture](#6-architecture)
7. [Database Schema](#7-database-schema)
8. [Design & Technical Constraints](#8-design--technical-constraints)
9. [Fase Pengerjaan](#9-fase-pengerjaan)

---

## 1. Overview

### 1.1 Latar Belakang

Program Makan Bergizi Gratis (MBG) adalah program nasional yang bertujuan meningkatkan asupan gizi siswa di seluruh Indonesia. Salah satu tantangan terbesar program ini adalah **penempatan Satuan Pelayanan Pemenuhan Gizi (SPPG) / Dapur MBG** yang tidak efisien — terlalu jauh dari sekolah target, distribusi tidak merata, atau berada di zona rawan (bencana, aksesibilitas rendah, kepadatan rendah).

**SIGMA** (*Strategic Intelligence for Gizi & Mapping Analysis*) hadir sebagai platform berbasis web yang menjawab permasalahan tersebut. Dengan memanfaatkan algoritma **K-Means Clustering** pada data geografis dan demografis, SIGMA memberikan rekomendasi cerdas penempatan dapur MBG yang optimal, mendeteksi dapur yang berisiko atau tidak efisien, serta menyajikan dasbor monitoring untuk siswa, operator dapur/SPPG, dan pemerintah.

### 1.2 Konteks Kompetisi

Aplikasi ini dikembangkan dalam rangka hackathon **IN:NOVATE – CodeUp! 2026** dengan tema *"One Earth, One Daye, Infinite Solutions"*, sejalan dengan poin SDGs:
- **SDG 2** — Zero Hunger (ketahanan pangan & gizi)
- **SDG 11** — Sustainable Cities and Communities (infrastruktur layanan kota)
- **SDG 3** — Good Health and Well-Being (kesehatan dan gizi anak)

### 1.3 Pengguna

| Role | Deskripsi |
|---|---|
| **Siswa** | Penerima manfaat MBG, dapat memantau status distribusi makanan, melaporkan keluhan, dan melakukan scan makanan berbasis AI |
| **Dapur / SPPG** | Operator dapur MBG, mengelola data distribusi, kapasitas, dan laporan harian |
| **Pemerintah** | Admin/dinas terkait, melihat rekomendasi AI, peta sebaran dapur, dan analitik makro |

---

## 2. Goals & Success Metrics

### 2.1 Goals
- Menyediakan rekomendasi penempatan dapur MBG berbasis AI (K-Means) dengan radius maksimal **6 km** dari sekolah target.
- Memberikan peringatan dini (*early warning*) untuk dapur yang berada di zona rawan atau tidak efisien.
- Menyajikan dasbor monitoring real-time untuk ketiga role pengguna.
- Membantu pemerintah mengambil keputusan berbasis data (data-driven policy).
- Memungkinkan siswa memverifikasi kelayakan gizi makanan MBG yang diterima melalui scan foto berbasis AI.

### 2.2 Success Metrics
| Metrik | Target |
|---|---|
| Akurasi rekomendasi penempatan (radius ≤ 6 km) | ≥ 90% sekolah terlayani |
| Dapur terdeteksi sebagai rawan dapat diidentifikasi | ≥ 80% dari total outlier |
| Scan makanan AI memberikan hasil analisis | < 10 detik per scan |
| Waktu load halaman | < 3 detik |
| Semua role dapat login & mengakses dashboard | 100% |

---

## 3. Requirements

### 3.1 Functional Requirements

#### FR-01 · Autentikasi & Otorisasi
- Sistem harus mendukung login dengan 3 role: Siswa, Dapur/SPPG, Pemerintah.
- Setiap role diarahkan ke halaman dashboard masing-masing setelah login.
- Sistem menyediakan seed akun default untuk keperluan demo.

#### FR-02 · Dashboard Siswa
- Siswa dapat melihat informasi dapur/SPPG yang melayani sekolahnya.
- Siswa dapat melihat jadwal distribusi makanan.
- Siswa dapat melaporkan keluhan terkait kualitas/distribusi makanan.
- Siswa dapat melihat status laporan yang sudah dikirim.
- Siswa dapat melakukan **scan makanan MBG** dengan mengunggah foto makanan yang diterima.
  - AI akan menganalisis apakah makanan tersebut bergizi/sehat, kurang layak, atau berbahaya.
  - Hasil analisis mencakup: kesimpulan status gizi, deskripsi singkat kandungan makanan terdeteksi, dan saran.
  - Riwayat hasil scan tersimpan dan dapat dilihat kembali oleh siswa.

#### FR-03 · Dashboard Dapur / SPPG
- Operator dapur dapat mengajukan lokasi dapur baru melalui form pengajuan.
- Operator dapat melihat status pengajuan lokasi dapur (menunggu / disetujui / ditolak beserta alasan).
- Operator dapat mengajukan ulang dengan lokasi baru jika pengajuan sebelumnya ditolak.
- Operator dapur dapat mengelola data distribusi harian (jumlah porsi, sekolah yang dilayani).
- Operator dapat melihat daftar sekolah dalam radius layanan.
- Operator dapat melihat notifikasi/peringatan jika kapasitas melebihi batas atau ada keluhan masuk.
- Operator dapat mengupdate status operasional dapur (aktif/tidak aktif/perbaikan).

#### FR-04 · Pengajuan & Approval Lokasi Dapur
- Saat SPPG mengajukan lokasi, sistem otomatis menghitung jarak ke sekolah-sekolah terdekat (Haversine) dan mengkategorikan:
  - **Aman** (hijau) → jarak ke sekolah terdekat **≤ 3 km** → pemerintah dapat langsung menyetujui.
  - **Sedang** (kuning) → jarak **> 3 km dan ≤ 6 km** → pemerintah dapat menyetujui atau menolak; alasan wajib diisi jika menolak.
  - **Rawan** (merah) → jarak **> 6 km** → sistem merekomendasikan penolakan; alasan penolakan wajib diisi.
- Pemerintah melihat daftar pengajuan masuk beserta: kategori otomatis, jarak terdekat ke sekolah, dan pratinjau lokasi di peta mini.
- Pemerintah dapat **menyetujui** atau **menolak** setiap pengajuan.
- Alasan wajib diisi saat menolak (untuk kategori Sedang dan Rawan).
- Dapur yang disetujui → status menjadi `AKTIF`, muncul di peta sebaran, dan SPPG dapat mulai input distribusi.
- Dapur yang ditolak → status `DITOLAK`, SPPG menerima notifikasi beserta alasan, dan dapat mengajukan ulang dengan lokasi baru.

#### FR-05 · Dashboard Pemerintah
- Pemerintah dapat melihat peta interaktif sebaran dapur MBG dan sekolah.
- Pemerintah dapat melihat dan memproses daftar pengajuan lokasi dapur dari SPPG.
- Pemerintah dapat melihat hasil clustering K-Means dan rekomendasi penempatan dapur baru.
- Pemerintah dapat melihat daftar dapur yang terindikasi rawan beserta alasannya.
- Pemerintah dapat melihat analitik makro (total siswa terlayani, rata-rata jarak, distribusi per wilayah).
- Pemerintah dapat mengunduh laporan dalam format PDF/CSV.

#### FR-06 · Integrasi Machine Learning
- Sistem mengintegrasikan hasil model K-Means yang sudah tersedia.
- Rekomendasi ditampilkan secara visual di peta dan dalam bentuk tabel prioritas.
- Sistem menandai dapur dengan jarak > 6 km sebagai *out-of-range* dan perlu ditinjau.

#### FR-06 · Landing Page
- Halaman publik yang menampilkan informasi singkat tentang SIGMA.

### 3.2 Non-Functional Requirements
- **Performa:** Halaman utama dan dashboard harus load < 3 detik pada koneksi normal.
- **Responsif:** Tampilan harus berfungsi di desktop (prioritas) dan mobile.
- **Keamanan:** Password di-hash (bcrypt), sesi menggunakan JWT/session cookie yang aman.
- **Maintainability:** Kode terstruktur dengan separation of concerns yang jelas (komponen, service, API routes).
- **Aksesibilitas:** Menggunakan komponen shadcn/ui yang accessible by default.

---

## 4. Core Features

### 4.1 Peta Interaktif Sebaran Dapur & Sekolah
Menampilkan seluruh titik dapur MBG dan sekolah pada peta (Leaflet.js / Mapbox). Dapur yang terlalu jauh (> 6 km) atau berada di zona rawan ditandai dengan warna merah. Dapur optimal ditandai hijau.

### 4.2 Rekomendasi K-Means AI
Hasil clustering dari model ML ditampilkan sebagai:
- **Cluster optimal**: lokasi terbaik untuk penempatan dapur baru berdasarkan kepadatan sekolah.
- **Outlier / zona rawan**: dapur yang tidak efisien atau berisiko.
- **Radius warning**: alert otomatis bila jarak dapur ke sekolah terdekat > 6 km.

### 4.3 Sistem Pengajuan & Approval Lokasi Dapur
SPPG mengajukan lokasi dapur baru melalui form (koordinat, nama, kapasitas). Sistem langsung menghitung jarak ke sekolah terdekat dan mengkategorikan lokasi sebagai **Aman** (≤ 3 km), **Sedang** (3–6 km), atau **Rawan** (> 6 km). Pemerintah mereview pengajuan di halaman approval — bisa ACC atau tolak dengan alasan. Keputusan dikirim sebagai notifikasi ke SPPG.

### 4.4 Scan Makanan MBG Berbasis AI
Siswa dapat mengunggah foto makanan MBG yang mereka terima. Foto dikirim ke model AI via **OpenRouter** (model vision gratis, misal `google/gemini-flash-1.5`). AI menganalisis gambar dan memberikan output:
- **Status gizi**: Bergizi ✅ / Kurang Layak ⚠️ / Berbahaya ❌
- **Deskripsi**: Identifikasi komponen makanan yang terdeteksi (nasi, lauk, sayur, dll.)
- **Saran**: Rekomendasi singkat terkait kelayakan konsumsi

Hasil scan disimpan ke database dan dapat dilihat kembali di riwayat scan siswa. Jika status **Berbahaya**, sistem otomatis menyarankan siswa untuk membuat laporan keluhan.

### 4.5 Sistem Pelaporan & Keluhan Siswa
Siswa dapat mengajukan keluhan (makanan tidak datang, kualitas buruk, dll.) yang masuk ke dasbor operator dapur dan dapat diteruskan ke pemerintah.

### 4.5 Manajemen Distribusi Harian (SPPG)
Operator memasukkan data distribusi per hari: jumlah porsi dikirim, sekolah yang dilayani, status operasional. Data ini menjadi input dasbor monitoring pemerintah.

### 4.6 Dasbor Analitik Pemerintah
Visualisasi data makro: total porsi terdistribusi, persentase sekolah terlayani, distribusi per kecamatan/kabupaten, tren mingguan.

### 4.7 Early Warning System
Sistem otomatis memflagging dapur yang:
- Jaraknya > 6 km dari sekolah yang dilayani.
- Tidak aktif lebih dari X hari.
- Mendapat keluhan berulang dari siswa.
- Teridentifikasi sebagai outlier oleh model K-Means.

---

## 5. User Flow

### 5.1 Flow Umum — Autentikasi
```
Landing Page
    │
    ▼
[Tombol Login]
    │
    ▼
Halaman Login (email + password)
    │
    ├── Role: Siswa       → /dashboard/siswa
    ├── Role: Dapur/SPPG  → /dashboard/sppg
    └── Role: Pemerintah  → /dashboard/pemerintah
```

### 5.2 Flow Siswa
```
/dashboard/siswa
    │
    ├── Lihat info dapur yang melayani sekolahnya
    ├── Lihat jadwal distribusi hari ini
    │
    ├── [Scan Makanan AI]
    │       ├── Upload foto makanan (jpg/png)
    │       ├── Kirim ke OpenRouter API (model vision)
    │       ├── Tampilkan hasil: status gizi + deskripsi + saran
    │       └── Jika Berbahaya → muncul tombol "Laporkan Sekarang"
    │
    ├── [Buat Laporan Keluhan]
    │       └── Isi form → Submit → Status: "Diterima"
    │
    ├── Lihat riwayat laporan & statusnya
    └── Lihat riwayat scan makanan
```

### 5.3 Flow Dapur / SPPG
```
Login sebagai SPPG
    │
    ├── [Jika status MENUNGGU_APPROVAL]
    │       └── Halaman "Pengajuan Sedang Ditinjau"
    │               ├── Lihat status: Menunggu / Disetujui / Ditolak
    │               └── Jika Ditolak → lihat alasan → [Ajukan Ulang]
    │
    └── [Jika status AKTIF]
            └── /dashboard/sppg
                    ├── Overview: kapasitas, sekolah dilayani, status operasional
                    ├── [Input Distribusi Harian]
                    │       └── Pilih sekolah, jumlah porsi, tanggal → Simpan
                    ├── Daftar sekolah dalam radius layanan
                    ├── Notifikasi keluhan masuk dari siswa
                    └── Update status dapur (aktif / tidak aktif / maintenance)
```

### 5.3a Flow Pengajuan Lokasi Dapur (SPPG Baru)
```
Register/Login SPPG baru
    │
    ▼
Halaman Pengajuan Lokasi Dapur
    ├── Isi form: nama dapur, alamat, lat/lng, kapasitas
    ├── Submit → status: MENUNGGU_APPROVAL
    │
    ▼
Halaman Status Pengajuan (polling / refresh)
    ├── [MENUNGGU]  → tampilkan spinner + pesan menunggu tinjauan
    ├── [DISETUJUI] → redirect ke /dashboard/sppg
    └── [DITOLAK]   → tampilkan alasan → tombol "Ajukan Ulang"
```

### 5.4 Flow Pemerintah
```
/dashboard/pemerintah
    │
    ├── Peta Interaktif
    │       ├── Layer: Titik Dapur (hijau/kuning/merah)
    │       ├── Layer: Titik Sekolah
    │       └── Layer: Hasil Clustering K-Means
    │
    ├── [Approval Pengajuan Dapur] ← FITUR BARU
    │       ├── Tabel pengajuan masuk (status: MENUNGGU)
    │       ├── Per baris: nama dapur, lokasi, koordinat, kapasitas
    │       │             jarak ke sekolah terdekat, badge kategori
    │       │             (AMAN=hijau / SEDANG=kuning / RAWAN=merah)
    │       ├── Tombol [Setujui] → dapur langsung AKTIF
    │       └── Tombol [Tolak]   → modal wajib isi alasan → kirim
    │
    ├── Rekomendasi AI
    │       ├── Lokasi cluster optimal baru
    │       └── Daftar dapur bermasalah (> 6km / outlier)
    │
    ├── Analitik Makro
    │       ├── Total siswa terlayani
    │       ├── Rata-rata jarak dapur-sekolah
    │       └── Grafik distribusi per wilayah
    │
    └── Ekspor Laporan (PDF / CSV)
```

---

## 6. Architecture

### 6.1 High-Level Architecture

```
┌─────────────────────────────────────────────────┐
│                   CLIENT BROWSER                │
│   Next.js App Router (RSC + Client Components)  │
│   shadcn/ui · Tailwind CSS · Leaflet.js          │
└────────────────────┬────────────────────────────┘
                     │ HTTP / API Routes
┌────────────────────▼────────────────────────────┐
│              NEXT.JS SERVER (App Router)         │
│   /api/auth   - NextAuth.js                      │
│   /api/siswa  - Endpoints untuk role siswa       │
│   /api/sppg   - Endpoints untuk role SPPG        │
│   /api/gov    - Endpoints untuk pemerintah       │
│   /api/ml     - Bridge ke hasil ML (K-Means)     │
└──────────┬───────────────────┬───────────────────┘
           │                   │
┌──────────▼──────┐   ┌────────▼──────────────────┐
│   PostgreSQL    │   │   ML Module (Python/JSON)  │
│   via Prisma    │   │   K-Means hasil clustering │
│   ORM           │   │   disimpan di DB / JSON    │
└─────────────────┘   └────────────────────────────┘
```

### 6.2 Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 14+ (App Router) |
| UI Library | shadcn/ui + Tailwind CSS |
| Auth | NextAuth.js v5 (Credentials Provider) |
| ORM | Prisma |
| Database | PostgreSQL via **Supabase** (cloud, tanpa Docker) |
| Peta | Leaflet.js (react-leaflet) |
| AI Scan Makanan | **OpenRouter API** (model vision gratis, e.g. `google/gemini-flash-1.5`) |
| ML Integration | Python K-Means hasil disimpan ke DB / endpoint JSON |
| Validasi | Zod |
| State Management | React Server Components + Zustand (client state ringan) |
| Deployment | Vercel (frontend) + Supabase (DB) |

### 6.3 Struktur Folder Next.js

```
sigma/
├── app/
│   ├── (public)/
│   │   └── page.tsx                  # Landing page
│   ├── (auth)/
│   │   └── login/page.tsx
│   ├── dashboard/
│   │   ├── siswa/
│   │   │   ├── page.tsx
│   │   │   ├── scan/page.tsx             # ← scan makanan AI
│   │   │   ├── laporan/page.tsx
│   │   │   └── riwayat/page.tsx
│   │   ├── sppg/
│   │   │   ├── page.tsx
│   │   │   ├── pengajuan/page.tsx        ← BARU
│   │   │   ├── status-pengajuan/page.tsx ← BARU
│   │   │   ├── distribusi/page.tsx
│   │   │   └── keluhan/page.tsx
│   │   └── pemerintah/
│   │       ├── page.tsx
│   │       ├── approval/page.tsx         ← BARU
│   │       ├── peta/page.tsx
│   │       ├── rekomendasi/page.tsx
│   │       └── analitik/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── siswa/
│       ├── sppg/
│       ├── pemerintah/
│       └── ml/
├── components/
│   ├── ui/                           # shadcn/ui components
│   ├── map/                          # Leaflet map components
│   ├── charts/                       # Chart components
│   └── shared/                       # Shared components
├── lib/
│   ├── auth.ts
│   ├── prisma.ts
│   └── utils.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── types/
    └── index.ts
```

---

## 7. Database Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── ENUM ───────────────────────────────────────────────

enum Role {
  SISWA
  SPPG
  PEMERINTAH
}

enum StatusDapur {
  AKTIF
  TIDAK_AKTIF
  MAINTENANCE
  MENUNGGU_APPROVAL  // baru diajukan, belum di-approve pemerintah
  DITOLAK            // ditolak pemerintah, bisa resubmit
}

enum StatusPengajuan {
  MENUNGGU   // belum ditinjau pemerintah
  DISETUJUI  // acc → dapur jadi AKTIF
  DITOLAK    // ditolak, alasan wajib diisi
}

enum KategoriJarak {
  AMAN    // < 3 km  → rekomen acc
  SEDANG  // >= 3 km dan <= 6 km → keputusan pemerintah
  RAWAN   // > 6 km → rekomen tolak
}

enum StatusLaporan {
  DITERIMA
  DIPROSES
  SELESAI
  DITOLAK
}

enum TingkatRisiko {
  AMAN
  WASPADA
  RAWAN
}

// ─── USER ────────────────────────────────────────────────

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // bcrypt hash
  name      String
  role      Role
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  siswa     Siswa?
  sppg      SPPG?
}

// ─── SISWA ───────────────────────────────────────────────

model Siswa {
  id        String  @id @default(cuid())
  userId    String  @unique
  user      User    @relation(fields: [userId], references: [id])
  sekolahId String
  sekolah   Sekolah @relation(fields: [sekolahId], references: [id])
  kelas     String?

  laporan   Laporan[]
}

// ─── SEKOLAH ─────────────────────────────────────────────

model Sekolah {
  id          String  @id @default(cuid())
  nama        String
  alamat      String
  latitude    Float
  longitude   Float
  kecamatan   String
  kabupaten   String
  jumlahSiswa Int     @default(0)

  siswa       Siswa[]
  distribusi  Distribusi[]
  // Dapur yang melayani sekolah ini (many-to-many)
  dapur       DapurSekolah[]
}

// ─── DAPUR / SPPG ────────────────────────────────────────

model SPPG {
  id            String        @id @default(cuid())
  userId        String        @unique
  user          User          @relation(fields: [userId], references: [id])
  namaDapur     String
  alamat        String
  latitude      Float
  longitude     Float
  kecamatan     String
  kabupaten     String
  kapasitasMax  Int           // maks porsi per hari
  status        StatusDapur   @default(MENUNGGU_APPROVAL)
  tingkatRisiko TingkatRisiko @default(AMAN)
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  distribusi    Distribusi[]
  sekolah       DapurSekolah[]
  earlyWarning  EarlyWarning[]
  clusterResult ClusterResult?
  pengajuan     PengajuanDapur[]
}

// ─── PENGAJUAN LOKASI DAPUR ──────────────────────────────

model PengajuanDapur {
  id               String          @id @default(cuid())
  sppgId           String
  sppg             SPPG            @relation(fields: [sppgId], references: [id])
  namaDapur        String
  alamat           String
  latitude         Float
  longitude        Float
  kapasitasMax     Int
  // Dihitung otomatis oleh sistem saat pengajuan masuk
  jarakKeSekolahKm Float?          // jarak ke sekolah terdekat (Haversine)
  kategoriJarak    KategoriJarak?  // AMAN / SEDANG / RAWAN
  sekolahTerdekat  String?         // nama sekolah terdekat (info display)
  // Keputusan pemerintah
  status           StatusPengajuan @default(MENUNGGU)
  alasanPenolakan  String?         // wajib diisi jika DITOLAK
  ditinjauOleh     String?         // nama/id pejabat yang approve/tolak
  ditinjauAt       DateTime?
  createdAt        DateTime        @default(now())
  updatedAt        DateTime        @updatedAt
}

// ─── RELASI DAPUR ↔ SEKOLAH (many-to-many) ──────────────

model DapurSekolah {
  id         String  @id @default(cuid())
  sppgId     String
  sppg       SPPG    @relation(fields: [sppgId], references: [id])
  sekolahId  String
  sekolah    Sekolah @relation(fields: [sekolahId], references: [id])
  jarakKm    Float   // jarak dapur ke sekolah dalam km

  @@unique([sppgId, sekolahId])
}

// ─── DISTRIBUSI HARIAN ───────────────────────────────────

model Distribusi {
  id          String   @id @default(cuid())
  sppgId      String
  sppg        SPPG     @relation(fields: [sppgId], references: [id])
  sekolahId   String
  sekolah     Sekolah  @relation(fields: [sekolahId], references: [id])
  tanggal     DateTime @db.Date
  jumlahPorsi Int
  keterangan  String?
  createdAt   DateTime @default(now())

  @@unique([sppgId, sekolahId, tanggal])
}

// ─── LAPORAN KELUHAN SISWA ───────────────────────────────

model Laporan {
  id          String        @id @default(cuid())
  siswaId     String
  siswa       Siswa         @relation(fields: [siswaId], references: [id])
  judul       String
  isi         String
  kategori    String        // "makanan tidak datang" | "kualitas" | "lainnya"
  status      StatusLaporan @default(DITERIMA)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

// ─── SCAN MAKANAN AI ─────────────────────────────────────

enum StatusGizi {
  BERGIZI     // makanan layak dan bergizi
  KURANG_LAYAK // makanan kurang memenuhi standar gizi
  BERBAHAYA   // makanan terindikasi tidak aman dikonsumsi
}

model ScanMakanan {
  id           String      @id @default(cuid())
  siswaId      String
  siswa        Siswa       @relation(fields: [siswaId], references: [id])
  fotoUrl      String      // URL foto yang diupload (Supabase Storage)
  statusGizi   StatusGizi  // hasil analisis AI
  deskripsi    String      // narasi komponen makanan yang terdeteksi AI
  saran        String      // saran dari AI
  modelUsed    String      @default("google/gemini-flash-1.5") // model OpenRouter
  createdAt    DateTime    @default(now())
}

// ─── EARLY WARNING ───────────────────────────────────────

model EarlyWarning {
  id          String   @id @default(cuid())
  sppgId      String
  sppg        SPPG     @relation(fields: [sppgId], references: [id])
  tipe        String   // "JARAK_JAUH" | "TIDAK_AKTIF" | "KELUHAN_BERULANG" | "OUTLIER_ML"
  deskripsi   String
  isResolved  Boolean  @default(false)
  createdAt   DateTime @default(now())
}

// ─── HASIL CLUSTERING ML (K-MEANS) ───────────────────────

model ClusterResult {
  id            String   @id @default(cuid())
  sppgId        String   @unique
  sppg          SPPG     @relation(fields: [sppgId], references: [id])
  clusterId     Int      // ID cluster dari model K-Means
  isOutlier     Boolean  @default(false)
  skorEfisiensi Float    // 0.0 - 1.0
  catatan       String?
  updatedAt     DateTime @updatedAt
}

// ─── REKOMENDASI LOKASI BARU ─────────────────────────────

model RekomendasiLokasi {
  id            String   @id @default(cuid())
  latitude      Float
  longitude     Float
  kecamatan     String
  kabupaten     String
  alasan        String   // narasi dari model ML
  prioritas     Int      // 1 = tertinggi
  isImplemented Boolean  @default(false)
  createdAt     DateTime @default(now())
}
```

---

## 8. Design & Technical Constraints

### 8.1 Design Constraints

| Aspek | Ketentuan |
|---|---|
| UI Framework | **shadcn/ui** wajib digunakan untuk semua komponen UI |
| Styling | Tailwind CSS, tidak boleh menggunakan CSS-in-JS library lain |
| Peta | react-leaflet (open source, tidak butuh API key berbayar) |
| Ikon | lucide-react (sudah bundled dengan shadcn) |
| Font | Geist (default Next.js) atau Inter |
| Warna sistem | Merah = rawan/bahaya, Kuning = waspada, Hijau = aman/optimal |
| Responsive | Prioritas desktop, mobile-friendly sebagai bonus |

### 8.2 Technical Constraints

| Aspek | Ketentuan |
|---|---|
| Radius maksimal dapur–sekolah | **≤ 6 km** (hardcoded sebagai konstanta `MAX_RADIUS_KM = 6`) |
| Kategori jarak approval | `AMAN` < 3 km · `SEDANG` ≥ 3 km & ≤ 6 km · `RAWAN` > 6 km (konstanta `RADIUS_AMAN = 3`, `RADIUS_MAX = 6`) |
| Alasan penolakan | Wajib diisi (minimal 10 karakter) saat pemerintah menolak pengajuan |
| Auth | NextAuth.js Credentials Provider, password bcrypt, session JWT |
| Role guard | Middleware Next.js wajib mem-protect semua route `/dashboard/*` |
| ML integration | Model K-Means sudah tersedia; integrasi melalui endpoint internal atau import JSON hasil prediksi |
| Data statis | **Tidak boleh ada** setelah Fase 6 selesai |
| Seed data | Wajib ada 3 akun seed (1 per role) dan data dummy sekolah + dapur untuk demo |
| Environment | `.env.local` untuk local dev, tidak boleh commit secrets |
| Database | PostgreSQL via **Supabase** (cloud, tanpa Docker) |
| ORM | Prisma |

### 8.3 Batasan Waktu (Hackathon)
Aplikasi dikerjakan dalam format hackathon 24 jam (21–22 Mei 2026). Prioritas pengerjaan mengikuti fase yang telah ditentukan, dengan fokus pada demo-ability: semua role harus bisa login, navigasi dashboard berfungsi, dan rekomendasi ML tampil di peta.

---

## 9. Fase Pengerjaan

---

### Fase 0 — Project Setup

**Tujuan:** Menyiapkan boilerplate proyek yang siap dikembangkan.

**Checklist:**
- [ ] Init project Next.js 14+ dengan App Router: `npx create-next-app@latest sigma`
- [ ] Setup Tailwind CSS (sudah include di create-next-app)
- [ ] Install dan init shadcn/ui: `npx shadcn@latest init`
- [ ] Install dependencies awal:
  - `prisma`, `@prisma/client`
  - `next-auth` v5 (beta)
  - `bcryptjs`, `@types/bcryptjs`
  - `zod`
  - `react-leaflet`, `leaflet`, `@types/leaflet`
  - `lucide-react`
- [ ] Setup Prisma: `npx prisma init`, konfigurasi `DATABASE_URL` dari Supabase project ke `.env`
  - Buat project di [supabase.com](https://supabase.com), copy **Connection String (URI)** dari Settings → Database
  - Gunakan **Transaction pooler** (port 6543) untuk connection string Prisma
- [ ] Buat file `lib/prisma.ts` (singleton Prisma client)
- [ ] Setup struktur folder sesuai arsitektur di atas
- [ ] Inisialisasi Git repository
- [ ] Buat file `.env.example`

**Deliverable:** Project Next.js berjalan di `localhost:3000`, shadcn/ui terinstall, koneksi DB terkonfigurasi.

---

### Fase 1 — Autentikasi & Role-Based Access

**Tujuan:** Sistem login dengan 3 role, redirect ke halaman masing-masing, seed akun demo.

**Checklist:**
- [ ] Buat Prisma schema lengkap (seluruh model di atas) dan jalankan `npx prisma migrate dev`
- [ ] Konfigurasi NextAuth.js dengan Credentials Provider
- [ ] Buat file `lib/auth.ts` dengan konfigurasi session dan JWT
- [ ] Implementasi middleware (`middleware.ts`) untuk proteksi route:
  - `/dashboard/siswa/*` → hanya Role `SISWA`
  - `/dashboard/sppg/*` → hanya Role `SPPG`
  - `/dashboard/pemerintah/*` → hanya Role `PEMERINTAH`
  - Jika tidak login → redirect ke `/login`
  - Jika login tapi salah role → redirect ke dashboard miliknya
- [ ] Buat halaman login (`/login`) dengan form email + password menggunakan shadcn/ui
- [ ] Buat API route `/api/auth/[...nextauth]/route.ts`
- [ ] Buat seed file (`prisma/seed.ts`) dengan akun:
  ```
  Siswa     : siswa@sigma.id    / password: sigma123
  SPPG      : sppg@sigma.id     / password: sigma123
  Pemerintah: gov@sigma.id      / password: sigma123
  ```
  Seed juga mencakup minimal: 3 sekolah, 2 dapur SPPG, relasi DapurSekolah
- [ ] Jalankan `npx prisma db seed`, verifikasi redirect berfungsi per role

**Deliverable:** Login berfungsi, 3 akun seed aktif, setiap role redirect ke dashboard masing-masing.

---

### Fase 2 — Frontend Role Siswa (UI Only)

**Tujuan:** Membangun tampilan lengkap dashboard siswa menggunakan shadcn/ui, **tanpa integrasi backend**.

**Halaman yang dibuat:**
- `/dashboard/siswa` — Halaman utama
  - Card: nama dapur yang melayani, jadwal distribusi hari ini, status terakhir
  - Quick stats: "Laporan Aktif", "Makanan Diterima Hari Ini"
- `/dashboard/siswa/laporan` — Form buat laporan keluhan
  - Input: judul, kategori (dropdown), deskripsi
  - Tombol submit
- `/dashboard/siswa/riwayat` — Tabel riwayat laporan
  - Kolom: tanggal, judul, kategori, status (badge berwarna)

**Checklist:**
- [ ] Layout sidebar navigasi siswa (shadcn `Sidebar` atau custom)
- [ ] Semua data menggunakan **static/dummy data** (hardcode di komponen)
- [ ] Responsive di desktop
- [ ] Tambahkan tombol logout (non-fungsional atau fungsional NextAuth)

**Deliverable:** Semua halaman siswa dapat diakses dan tampil dengan UI yang proper.

---

### Fase 3 — Frontend Role SPPG/Dapur (UI Only)

**Tujuan:** Membangun tampilan lengkap dashboard SPPG, **tanpa integrasi backend**.

**Halaman yang dibuat:**
- `/dashboard/sppg/pengajuan` — Form pengajuan lokasi dapur baru
  - Input: nama dapur, alamat, latitude, longitude, kapasitas maksimal
  - Tombol submit
- `/dashboard/sppg/status-pengajuan` — Status pengajuan yang sudah dikirim
  - Badge status besar: MENUNGGU (abu) / DISETUJUI (hijau) / DITOLAK (merah)
  - Jika DITOLAK: tampilkan alasan penolakan dari pemerintah + tombol "Ajukan Ulang"
- `/dashboard/sppg` — Halaman utama *(hanya tampil jika status AKTIF)*
  - Card: nama dapur, status operasional, kapasitas hari ini, jumlah sekolah dilayani
  - Badge tingkat risiko (Aman / Waspada / Rawan)
  - Daftar sekolah dalam jangkauan (tabel)
- `/dashboard/sppg/distribusi` — Input distribusi harian
  - Form: pilih sekolah, tanggal, jumlah porsi, keterangan
  - Tabel histori distribusi
- `/dashboard/sppg/keluhan` — Daftar keluhan masuk dari siswa
  - Tabel: nama siswa, judul, kategori, tanggal, status
  - Tombol "Tandai Selesai"

**Checklist:**
- [ ] Layout sidebar navigasi SPPG
- [ ] Middleware/guard: jika status `MENUNGGU_APPROVAL` atau `DITOLAK`, redirect ke `/dashboard/sppg/status-pengajuan`
- [ ] Semua data **dummy/statis**
- [ ] Komponen badge status menggunakan warna merah/kuning/hijau

**Deliverable:** Semua halaman SPPG dapat diakses dan tampil dengan UI yang proper.

---

### Fase 4 — Frontend Role Pemerintah (UI Only)

**Tujuan:** Membangun tampilan lengkap dashboard pemerintah termasuk peta interaktif, **tanpa integrasi backend**.

**Halaman yang dibuat:**
- `/dashboard/pemerintah` — Halaman utama (analitik makro)
  - Summary cards: total dapur aktif, total sekolah terlayani, total porsi hari ini, dapur rawan, **pengajuan menunggu (badge notif)**
  - Grafik sederhana (bar chart): distribusi per kecamatan
- `/dashboard/pemerintah/approval` — Manajemen pengajuan lokasi dapur ← **BARU**
  - Tabel pengajuan masuk: nama dapur, operator, lokasi, kapasitas, jarak ke sekolah terdekat
  - Badge kategori jarak: AMAN (hijau) / SEDANG (kuning) / RAWAN (merah)
  - Tombol [Setujui] dan [Tolak] per baris
  - Modal konfirmasi tolak: textarea alasan (required)
  - Tab: Menunggu / Disetujui / Ditolak (riwayat keputusan)
- `/dashboard/pemerintah/peta` — Peta interaktif
  - Leaflet map dengan marker dummy dapur (hijau/merah) dan sekolah (biru)
  - Popup info saat marker diklik
  - Layer toggle: tampilkan/sembunyikan sekolah atau dapur
- `/dashboard/pemerintah/rekomendasi` — Rekomendasi AI
  - Tabel: lokasi rekomendasi, kecamatan, prioritas, alasan
  - Tabel: daftar dapur bermasalah dengan alasan (badge merah)
- `/dashboard/pemerintah/analitik` — Analitik mendalam
  - Grafik tren distribusi mingguan
  - Tabel detail per wilayah

**Checklist:**
- [ ] Layout sidebar navigasi pemerintah
- [ ] Integrasi `react-leaflet` untuk peta (data marker dummy)
- [ ] Semua chart menggunakan Recharts atau chart.js
- [ ] Semua data **dummy/statis**

**Deliverable:** Semua halaman pemerintah tampil dengan peta dan grafik fungsional (data dummy).

---

### Fase 5 — Landing Page

**Tujuan:** Membuat halaman publik sederhana sebagai pintu masuk aplikasi.

**Checklist:**
- [ ] Halaman `/` dengan teks **"Selamat Datang"** (placeholder)
- [ ] Tampilkan nama aplikasi SIGMA dan deskripsi singkat
- [ ] Tombol "Masuk" yang mengarah ke `/login`
- [ ] Desain minimal tapi bersih menggunakan Tailwind + shadcn/ui

**Deliverable:** Landing page dapat diakses publik tanpa login.

---

### Fase 6 — Integrasi Backend (Semua Role)

**Tujuan:** Menghubungkan semua halaman frontend ke API dan database nyata. **Tidak boleh ada data statis/dummy setelah fase ini selesai.**

**Checklist API & Integrasi:**

*Auth:*
- [ ] Verifikasi NextAuth session di semua API route
- [ ] Middleware role guard berfungsi penuh

*Siswa:*
- [ ] `GET /api/siswa/dapur` — ambil info dapur yang melayani sekolah siswa
- [ ] `GET /api/siswa/distribusi` — jadwal/histori distribusi untuk sekolah siswa
- [ ] `POST /api/siswa/laporan` — kirim laporan baru
- [ ] `GET /api/siswa/laporan` — riwayat laporan siswa

*SPPG:*
- [ ] `GET /api/sppg/profile` — profil dan status dapur
- [ ] `POST /api/sppg/pengajuan` — kirim pengajuan lokasi dapur baru (otomatis hitung jarak + kategori)
- [ ] `GET /api/sppg/pengajuan` — cek status pengajuan terbaru
- [ ] `GET /api/sppg/sekolah` — daftar sekolah dalam radius
- [ ] `POST /api/sppg/distribusi` — input distribusi harian
- [ ] `GET /api/sppg/distribusi` — histori distribusi
- [ ] `GET /api/sppg/keluhan` — daftar keluhan masuk
- [ ] `PATCH /api/sppg/keluhan/[id]` — update status keluhan
- [ ] `PATCH /api/sppg/status` — update status operasional dapur

*Pemerintah:*
- [ ] `GET /api/pemerintah/summary` — statistik makro (+ jumlah pengajuan menunggu)
- [ ] `GET /api/pemerintah/dapur` — semua data dapur (untuk peta)
- [ ] `GET /api/pemerintah/sekolah` — semua data sekolah (untuk peta)
- [ ] `GET /api/pemerintah/pengajuan` — daftar pengajuan (filter: status)
- [ ] `PATCH /api/pemerintah/pengajuan/[id]/approve` — setujui pengajuan → update SPPG status jadi `AKTIF`
- [ ] `PATCH /api/pemerintah/pengajuan/[id]/reject` — tolak pengajuan (body: `{ alasan: string }`) → update SPPG status jadi `DITOLAK`
- [ ] `GET /api/pemerintah/rekomendasi` — rekomendasi lokasi dari DB
- [ ] `GET /api/pemerintah/early-warning` — daftar dapur bermasalah
- [ ] `GET /api/pemerintah/analitik` — data tren distribusi

*Utilitas:*
- [ ] Hitung jarak dapur–sekolah menggunakan Haversine formula, flag otomatis jika > 6km
- [ ] Pastikan semua komponen mengambil data dari API (hapus semua dummy data)

**Deliverable:** Aplikasi fully-connected ke database, semua role berfungsi dengan data real dari PostgreSQL.

---

### Fase 7 — Integrasi Machine Learning (K-Means)

**Tujuan:** Menampilkan hasil model K-Means yang sudah jadi ke dalam UI dashboard pemerintah.

**Konteks:** Model K-Means sudah tersedia. Fokus fase ini adalah **bridging** hasil ML ke tampilan web.

**Checklist:**
- [ ] Tentukan format output model ML (JSON file atau API Python endpoint)
- [ ] Buat script atau API route `/api/ml/sync` untuk mengimport hasil clustering ke tabel `ClusterResult` dan `RekomendasiLokasi` di database
- [ ] Update `SPPG.tingkatRisiko` dan `SPPG.clusterResult` berdasarkan hasil ML
- [ ] Buat flag otomatis `EarlyWarning` dengan tipe `OUTLIER_ML` untuk dapur yang `isOutlier = true`
- [ ] Tampilkan hasil cluster di peta:
  - Warna marker berdasarkan `clusterId` (tiap cluster warna berbeda)
  - Marker khusus untuk `isOutlier = true` (ikon peringatan merah)
  - Marker rekomendasi lokasi baru (ikon bintang/pin ungu)
- [ ] Update halaman `/dashboard/pemerintah/rekomendasi` dengan data ML nyata
- [ ] Tampilkan skor efisiensi (`skorEfisiensi`) di detail dapur
- [ ] Verifikasi: dapur dengan jarak > 6km ke sekolah terdekat otomatis masuk early warning

**Deliverable:** Hasil K-Means tampil di peta dan tabel rekomendasi dengan data nyata dari model ML.

---

### Fase 8 — Code Review & Finishing

**Tujuan:** Memastikan kualitas kode, pengalaman pengguna yang mulus, dan kesiapan demo.

**Checklist:**
- [ ] **Code review:** periksa semua API route (validasi input dengan Zod, error handling)
- [ ] **Security check:** tidak ada secret di kode, semua route terlindungi middleware
- [ ] **UI/UX polish:** konsistensi warna, tipografi, spacing di semua halaman
- [ ] **Loading states:** tambahkan skeleton/spinner di semua fetch data
- [ ] **Error states:** tampilkan pesan error yang user-friendly jika API gagal
- [ ] **Empty states:** tampilkan ilustrasi/teks jika data kosong (belum ada laporan, dll)
- [ ] **Verifikasi seed data:** pastikan akun seed + data dummy cukup untuk demo semua fitur
- [ ] **Uji coba alur lengkap:** login 3 role → navigasi → fitur utama → ML → logout
- [ ] **Persiapan pitching:** pastikan demo flow berjalan tanpa error di depan juri
- [ ] **README.md:** dokumentasi cara menjalankan project (setup env, migrate, seed, run)

**Deliverable:** Aplikasi siap demo, zero dummy data, semua fitur berjalan, siap presentasi di hadapan juri.

---

## Ringkasan Fase

| Fase | Nama | Output Utama |
|---|---|---|
| **0** | Project Setup | Next.js + shadcn/ui + Prisma terkonfigurasi |
| **1** | Auth & Role | Login 3 role, seed akun, middleware redirect |
| **2** | Frontend Siswa | UI dashboard siswa (data dummy) |
| **3** | Frontend SPPG | UI dashboard SPPG (data dummy) |
| **4** | Frontend Pemerintah | UI peta + analitik (data dummy) |
| **5** | Landing Page | Halaman publik "Selamat Datang" |
| **6** | Integrasi Backend | Semua role connected ke DB (no more dummy) |
| **7** | Integrasi ML | K-Means tampil di peta & rekomendasi |
| **8** | Code Review | Polish, testing, siap demo |

---

*Dokumen ini dibuat untuk keperluan kompetisi IN:NOVATE – CodeUp! 2026 · Tim Raja Iblis · Universitas Telkom*