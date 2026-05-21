import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UtensilsCrossed, CheckCircle2, XCircle, FileText } from "lucide-react";
import { getSiswaProfile, getRiwayatLaporan } from "@/app/actions/siswa";

export default async function SiswaDashboard() {
  const profile = await getSiswaProfile();
  const laporan = await getRiwayatLaporan();

  const totalLaporan = laporan.length;
  const laporanDiterima = laporan.filter((l) => l.status === "DITERIMA" || l.status === "SELESAI").length;
  const laporanDitolak = laporan.filter((l) => l.status === "DITOLAK").length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Welcome Banner */}
      <div className="bg-surface-soft border border-hairline rounded-[10px] p-6 md:p-8 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-[32px] md:text-[40px] font-normal text-ink mb-2 tracking-tight">Selamat Datang di SIGMA, {profile?.sekolah?.nama || "Siswa"}</h2>
          <p className="text-body max-w-2xl">
            Sistem Informasi Gizi & Mapping Analysis. Pantau distribusi makanan bergizi gratis yang disalurkan ke sekolahmu hari ini.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
          <UtensilsCrossed className="w-48 h-48 -mb-8 -mr-8 text-ink" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border-hairline shadow-sm rounded-[10px]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-body">Total Laporan</CardTitle>
            <FileText className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-ink">{totalLaporan}</div>
            <p className="text-xs text-body mt-1">Semua laporan yang dikirim</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-hairline shadow-sm rounded-[10px]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-body">Laporan Diterima</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-ink">{laporanDiterima}</div>
            <p className="text-xs text-success mt-1">Diproses atau telah selesai</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-hairline shadow-sm rounded-[10px]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-body">Laporan Ditolak</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-ink">{laporanDitolak}</div>
            <p className="text-xs text-destructive mt-1">Tidak dapat diproses</p>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
