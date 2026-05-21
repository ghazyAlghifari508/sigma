import { Building2, Utensils, School, Activity, ShieldAlert, CheckCircle2 } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSppgProfile, getSekolahSasaranSppg, getDistribusiSppg } from "@/app/actions/sppg";

export default async function SppgOverviewPage() {
  const sppg = await getSppgProfile();
  const sekolahSasaran = await getSekolahSasaranSppg();
  const distribusi = await getDistribusiSppg();

  // Hari ini
  const today = new Date().toDateString();
  const distribusiHariIni = distribusi.filter(d => new Date(d.tanggal).toDateString() === today);
  const totalPorsiHariIni = distribusiHariIni.reduce((acc, curr) => acc + curr.jumlahPorsi, 0);

  // Sekolah dengan jarak > 4km (risiko terlambat)
  const sekolahJauh = sekolahSasaran.filter(s => s.jarakKm > 4);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-[32px] md:text-[40px] font-normal text-ink tracking-tight">Overview Dapur</h2>
          <p className="text-body mt-1">Pantau performa dan ringkasan operasional dapur Anda hari ini.</p>
        </div>
        {sppg?.status === "AKTIF" ? (
          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-100 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-700 font-semibold text-sm">Dapur Operasional</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full border border-red-100 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-red-700 font-semibold text-sm">Dapur Non-Aktif</span>
          </div>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Primary Metric - Total Kapasitas */}
        <div className="bg-[#124f97] rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#dbda16] rounded-bl-full -mr-4 -mt-4 opacity-90 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10 flex flex-col h-full justify-between gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white/80 uppercase tracking-wider">Total Kapasitas</span>
              <Utensils className="h-5 w-5 text-[#dbda16]" />
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">{sppg?.kapasitasMax || 0}</div>
              <div className="text-sm font-medium text-white/70">Porsi per hari</div>
            </div>
          </div>
        </div>

        {/* Secondary Metric - Sekolah Dilayani */}
        <div className="bg-[#fffbf7] border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex flex-col h-full justify-between gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Sekolah Dilayani</span>
              <div className="w-10 h-10 rounded-full bg-[#124f97]/10 flex items-center justify-center group-hover:bg-[#124f97] transition-colors">
                <School className="h-5 w-5 text-[#124f97] group-hover:text-white transition-colors" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#124f97] mb-1">{sekolahSasaran.length}</div>
              <p className="text-xs font-medium text-gray-400">Institusi terdaftar</p>
            </div>
          </div>
        </div>

        {/* Secondary Metric - Porsi Terdistribusi */}
        <div className="bg-[#fffbf7] border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex flex-col h-full justify-between gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Porsi Disalurkan</span>
              <div className="w-10 h-10 rounded-full bg-[#124f97]/10 flex items-center justify-center group-hover:bg-[#124f97] transition-colors">
                <Activity className="h-5 w-5 text-[#124f97] group-hover:text-white transition-colors" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#124f97] mb-1">{totalPorsiHariIni}</div>
              <p className="text-xs font-medium text-green-600 bg-green-50 w-fit px-2 py-0.5 rounded-full">Hari ini</p>
            </div>
          </div>
        </div>

        {/* Risk Level Metric */}
        <div className={`border-2 rounded-3xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden ${sppg?.tingkatRisiko === 'AMAN' ? 'bg-white border-green-100 hover:border-green-300' : 'bg-white border-orange-100 hover:border-orange-300'}`}>
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${sppg?.tingkatRisiko === 'AMAN' ? 'bg-green-50/50' : 'bg-orange-50/50'}`}></div>
          <div className="relative z-10 flex flex-col h-full justify-between gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Tingkat Risiko</span>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${sppg?.tingkatRisiko === 'AMAN' ? 'bg-green-100' : 'bg-orange-100'}`}>
                <ShieldAlert className={`h-5 w-5 ${sppg?.tingkatRisiko === 'AMAN' ? 'text-green-600' : 'text-orange-600'}`} />
              </div>
            </div>
            <div>
              <div className={`text-3xl font-bold mb-1 ${sppg?.tingkatRisiko === 'AMAN' ? 'text-green-600' : 'text-orange-600'}`}>
                {sppg?.tingkatRisiko || "N/A"}
              </div>
              {sekolahJauh.length > 0 ? (
                <p className="text-xs font-medium text-orange-600 bg-orange-50 w-fit px-2 py-1 rounded-md">{sekolahJauh.length} sekolah jarak &gt; 4km</p>
              ) : (
                <p className="text-xs font-medium text-green-700/70">Jarak distribusi aman</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dapur Details */}
        <div className="bg-[#fffbf7] border border-gray-100 shadow-sm rounded-3xl p-6 lg:p-8 lg:col-span-3 transition-shadow hover:shadow-md">
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
      </div>

      {/* Tabel Sekolah */}
      <div className="bg-[#fffbf7] border border-gray-100 shadow-sm rounded-3xl p-6 lg:p-8 transition-shadow hover:shadow-md">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#124f97]">Daftar Sekolah Terlayani</h3>
          <p className="text-gray-500 text-sm mt-1">Sekolah yang berada di bawah jangkauan dapur Anda hari ini.</p>
        </div>
        
        <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#124f97]/5 border-b border-gray-100">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-[#124f97] font-semibold py-4">Nama Sekolah</TableHead>
                  <TableHead className="text-[#124f97] font-semibold py-4">Kecamatan</TableHead>
                  <TableHead className="text-[#124f97] font-semibold py-4">Jarak (Haversine)</TableHead>
                  <TableHead className="text-[#124f97] font-semibold py-4 text-right">Jumlah Siswa</TableHead>
                  <TableHead className="text-[#124f97] font-semibold py-4 text-right">Status Hari Ini</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sekolahSasaran.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500 py-10">Belum ada sekolah yang ditugaskan</TableCell>
                  </TableRow>
                ) : (
                  sekolahSasaran.map((sekolah) => {
                    const distInfo = distribusiHariIni.find(d => d.sekolahId === sekolah.id);
                    
                    return (
                      <TableRow key={sekolah.id} className="border-b border-gray-50 hover:bg-[#fffbf7] transition-colors group">
                        <TableCell className="text-[#124f97] font-medium py-4">{sekolah.nama}</TableCell>
                        <TableCell className="text-gray-600 py-4">{sekolah.kecamatan}</TableCell>
                        <TableCell className="py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sekolah.jarakKm > 4 ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-700"}`}>
                            {sekolah.jarakKm} km
                          </span>
                        </TableCell>
                        <TableCell className="text-right text-gray-700 font-medium py-4">{sekolah.jumlahSiswa}</TableCell>
                        <TableCell className="text-right py-4">
                          {distInfo ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Terkirim
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                              Belum Dikirim
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

    </div>
  );
}
