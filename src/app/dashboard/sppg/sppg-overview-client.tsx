"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Building2, Plus, MapIcon, Loader2, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Kita akan buat komponen peta sederhana nanti
const MapView = dynamic<{ sppg: any; sekolah: any[] }>(() => import("./sppg-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex flex-col items-center justify-center bg-[#fffbf7] border border-gray-100 rounded-2xl animate-pulse">
      <MapIcon className="w-10 h-10 text-gray-300 mb-4 animate-bounce" />
      <div className="text-gray-400 font-medium">Memuat Peta...</div>
    </div>
  ),
});

type SppgOverviewProps = {
  sppg: any;
  sekolahSasaran: any[];
  sekolahTersedia: any[];
};

export default function SppgOverviewClient({ sppg, sekolahSasaran, sekolahTersedia }: SppgOverviewProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedSekolah, setSelectedSekolah] = useState("");
  
  const handleAddSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSekolah) return;
    setIsAdding(true);
    // Simulasi penambahan sekolah
    setTimeout(() => {
      setIsAdding(false);
      alert("Permintaan penambahan sekolah berhasil dikirim! Menunggu konfirmasi.");
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-[32px] md:text-[40px] font-normal text-ink tracking-tight">Overview Dapur</h2>
          <p className="text-body mt-1">Pemetaan sekolah yang dilayani oleh Dapur SPPG Anda.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-100 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-700 font-semibold text-sm">Dapur Operasional</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Identitas Operasional Dapur */}
        <div className="bg-[#fffbf7] border border-gray-100 shadow-sm rounded-3xl p-6 lg:p-8 lg:col-span-2 transition-shadow hover:shadow-md">
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div>
              <h3 className="text-xl font-bold text-[#124f97]">Identitas Operasional Dapur</h3>
              <p className="text-gray-500 text-sm mt-1">Detail profil dan lokasi layanan dapur sentral</p>
            </div>
            <div className="bg-[#124f97]/5 px-4 py-2 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#124f97] flex items-center justify-center text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider block">ID Sistem</span>
                <span className="text-[#124f97] font-bold">{sppg?.id}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2 block">Nama Resmi Dapur</span>
              <p className="text-lg text-[#124f97] font-semibold">{sppg?.namaDapur || "-"}</p>
            </div>
            <div>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2 block">Alamat & Lokasi Lengkap</span>
              <p className="text-gray-700 font-medium">{sppg?.alamat || "-"}</p>
              <p className="text-gray-500 text-sm mt-1">{sppg?.kecamatan}, {sppg?.kabupaten}</p>
            </div>
          </div>
        </div>

        {/* Form Tambah Sekolah */}
        <div className="bg-[#fffbf7] border border-gray-100 shadow-sm rounded-3xl p-6 lg:p-8 lg:col-span-1 transition-shadow hover:shadow-md flex flex-col">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-[#124f97]">Tambah Layanan</h3>
            <p className="text-gray-500 text-sm mt-1">Ajukan sekolah baru untuk dilayani.</p>
          </div>
          <form onSubmit={handleAddSchool} className="flex-1 flex flex-col justify-center space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Pilih Sekolah Sasaran</label>
              <div className="relative">
                <select 
                  className={`w-full border-2 border-gray-200 h-11 rounded-lg bg-[#fffbf7] px-4 text-[#124f97] font-medium outline-none drop-shadow-sm transition-all focus:border-[#124f97] appearance-none ${!selectedSekolah ? 'text-gray-400 font-normal' : ''}`}
                  value={selectedSekolah}
                  onChange={(e) => setSelectedSekolah(e.target.value)}
                  required
                >
                  <option value="" disabled hidden>Pilih Sekolah di {sppg?.kabupaten || 'Wilayah Anda'}</option>
                  {sekolahTersedia?.length > 0 ? (
                    sekolahTersedia.map((s) => {
                      // Cek apakah sudah terlayani
                      const isAssigned = sekolahSasaran.some((ss) => ss.id === s.id);
                      return (
                        <option key={s.id} value={s.id} disabled={isAssigned}>
                          {s.nama} {isAssigned ? "(Sudah Dilayani)" : ""}
                        </option>
                      );
                    })
                  ) : (
                    <option value="" disabled>Tidak ada sekolah tersedia</option>
                  )}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#124f97] hover:bg-[#0d3a73] text-white rounded-lg h-11"
              disabled={isAdding}
            >
              {isAdding ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
              {isAdding ? "Mengajukan..." : "Ajukan Sekolah"}
            </Button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-[#fffbf7] border border-gray-100 shadow-sm rounded-3xl overflow-hidden h-[500px] relative">
        <div className="absolute top-4 left-4 z-[1000] bg-[#fffbf7]/90 backdrop-blur-md px-4 py-3 rounded-xl border border-gray-100 shadow-sm pointer-events-none">
          <h3 className="font-bold text-[#124f97] mb-1">Peta Distribusi Dapur</h3>
          <p className="text-xs text-gray-500">Visualisasi dapur SPPG dan sekolah yang dilayani</p>
          <div className="flex gap-4 mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs font-medium">Dapur Anda</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#124f97]"></div>
              <span className="text-xs font-medium">Sekolah Dilayani</span>
            </div>
          </div>
        </div>
        <MapView sppg={sppg} sekolah={sekolahSasaran} />
      </div>

    </div>
  );
}

