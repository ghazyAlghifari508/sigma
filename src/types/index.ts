// Type definitions untuk SIGMA
// Akan diisi sesuai kebutuhan di tiap fase

export type UserRole = "SISWA" | "SPPG" | "PEMERINTAH";

export type StatusDapur = "AKTIF" | "TIDAK_AKTIF" | "MAINTENANCE";

export type StatusLaporan = "DITERIMA" | "DIPROSES" | "SELESAI" | "DITOLAK";

export type TingkatRisiko = "AMAN" | "WASPADA" | "RAWAN";

export type EarlyWarningType =
  | "JARAK_JAUH"
  | "TIDAK_AKTIF"
  | "KELUHAN_BERULANG"
  | "OUTLIER_ML";
