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
          <Badge variant="outline" className="w-fit bg-success/10 text-success border-success/20 px-3 py-1 font-medium text-sm">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Status: Operasional
          </Badge>
        ) : (
          <Badge variant="outline" className="w-fit bg-destructive/10 text-destructive border-destructive/20 px-3 py-1 font-medium text-sm">
            <ShieldAlert className="w-4 h-4 mr-2" />
            Status: Non-Aktif
          </Badge>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-hairline shadow-sm rounded-[10px]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-body">Total Kapasitas</CardTitle>
            <Utensils className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-ink">{sppg?.kapasitasMax || 0}</div>
            <p className="text-xs text-body mt-1">porsi per hari</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-hairline shadow-sm rounded-[10px]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-body">Sekolah Dilayani</CardTitle>
            <School className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-ink">{sekolahSasaran.length}</div>
            <p className="text-xs text-body mt-1">institusi terdaftar</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-hairline shadow-sm rounded-[10px]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-body">Porsi Terdistribusi</CardTitle>
            <Activity className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-ink">{totalPorsiHariIni}</div>
            <p className="text-xs text-success mt-1">Hari ini</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-hairline shadow-sm rounded-[10px] overflow-hidden relative group">
          <div className={`absolute inset-0 z-0 ${sppg?.tingkatRisiko === 'AMAN' ? 'bg-success/5' : 'bg-warning/5'}`} />
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-body">Tingkat Risiko</CardTitle>
            <ShieldAlert className={`h-4 w-4 ${sppg?.tingkatRisiko === 'AMAN' ? 'text-success' : 'text-warning'}`} />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className={`text-3xl font-bold drop-shadow-sm ${sppg?.tingkatRisiko === 'AMAN' ? 'text-success' : 'text-warning'}`}>
              {sppg?.tingkatRisiko || "N/A"}
            </div>
            {sekolahJauh.length > 0 ? (
              <p className="text-xs text-warning mt-1">Terdapat {sekolahJauh.length} sekolah jarak &gt; 4km</p>
            ) : (
              <p className="text-xs text-body mt-1">Semua sekolah dalam jangkauan wajar</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dapur Details */}
        <Card className="bg-white border-hairline shadow-sm rounded-[10px] lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-ink">Informasi Dapur</CardTitle>
            <CardDescription className="text-body">Detail identitas operasional</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1 border-r border-hairline pr-6">
                <span className="text-xs text-body font-medium uppercase tracking-wider">Nama Resmi</span>
                <p className="text-ink font-medium">{sppg?.namaDapur || "-"}</p>
              </div>
              <div className="space-y-1 border-r border-hairline pr-6">
                <span className="text-xs text-body font-medium uppercase tracking-wider">Lokasi</span>
                <p className="text-ink text-sm">{sppg?.alamat || "-"}, {sppg?.kecamatan}, {sppg?.kabupaten}</p>
              </div>
              <div className="space-y-1 pb-1">
                <span className="text-xs text-body font-medium uppercase tracking-wider">ID Sistem</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-8 h-8 rounded-full bg-surface-soft flex items-center justify-center text-xs font-bold text-ink border border-hairline">
                    <Building2 className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-ink text-sm font-medium">{sppg?.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabel Sekolah */}
      <Card className="bg-white border-hairline shadow-sm rounded-[10px]">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-ink">Daftar Sekolah Terlayani</CardTitle>
          <CardDescription className="text-body">Sekolah yang berada di bawah jangkauan dapur Anda hari ini.</CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          <div className="border border-hairline rounded-[8px] overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-surface-soft">
                  <TableRow className="border-hairline hover:bg-transparent">
                    <TableHead className="text-ink font-medium">Nama Sekolah</TableHead>
                    <TableHead className="text-ink font-medium">Kecamatan</TableHead>
                    <TableHead className="text-ink font-medium">Jarak Aktual (Haversine)</TableHead>
                    <TableHead className="text-ink font-medium text-right">Jumlah Siswa</TableHead>
                    <TableHead className="text-ink font-medium text-right">Status Pengiriman Hari Ini</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sekolahSasaran.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-body py-6">Belum ada sekolah yang ditugaskan</TableCell>
                    </TableRow>
                  ) : (
                    sekolahSasaran.map((sekolah) => {
                      const distInfo = distribusiHariIni.find(d => d.sekolahId === sekolah.id);
                      
                      return (
                        <TableRow key={sekolah.id} className="border-hairline hover:bg-surface-soft/50">
                          <TableCell className="text-ink font-medium">{sekolah.nama}</TableCell>
                          <TableCell className="text-body">{sekolah.kecamatan}</TableCell>
                          <TableCell>
                            <span className={`text-sm ${sekolah.jarakKm > 4 ? "text-warning font-medium" : "text-body"}`}>
                              {sekolah.jarakKm} km
                            </span>
                          </TableCell>
                          <TableCell className="text-right text-ink">{sekolah.jumlahSiswa}</TableCell>
                          <TableCell className="text-right">
                            {distInfo ? (
                              <Badge variant="outline" className="border-success/30 text-success bg-success/10">Terkirim</Badge>
                            ) : (
                              <Badge variant="outline" className="border-body/30 text-body bg-surface-soft">Belum Dikirim</Badge>
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
        </CardContent>
      </Card>

    </div>
  );
}
