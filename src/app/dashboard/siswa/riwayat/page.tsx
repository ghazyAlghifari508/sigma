import { Clock, Search, Filter } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRiwayatLaporan } from "@/app/actions/siswa";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "DITERIMA":
      return <Badge variant="outline" className="text-body border-hairline bg-surface-soft">Diterima</Badge>;
    case "DIPROSES":
      return <Badge variant="secondary" className="bg-warning/10 text-warning hover:bg-warning/20">Diproses</Badge>;
    case "SELESAI":
      return <Badge variant="default" className="bg-success/10 text-success hover:bg-success/20 border border-success/20">Selesai</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export default async function RiwayatLaporanPage() {
  const laporanDb = await getRiwayatLaporan();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-[32px] md:text-[40px] font-normal text-ink mb-2 flex items-center gap-2 tracking-tight">
            <Clock className="h-7 w-7 text-indigo-600" />
            Riwayat Laporan
          </h2>
          <p className="text-body">
            Pantau status laporan keluhan yang pernah kamu kirimkan sebelumnya.
          </p>
        </div>
      </div>

      <Card className="bg-[#fffbf7] border-hairline shadow-sm rounded-[10px]">
        <CardHeader className="border-b border-hairline/50 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-lg font-medium text-ink">Daftar Laporan</CardTitle>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-body" />
                <Input 
                  placeholder="Cari laporan..." 
                  className="pl-9 bg-surface-soft border-hairline text-ink focus-visible:ring-indigo-600 h-9"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-surface-soft border-b border-hairline">
                <TableRow className="border-hairline hover:bg-transparent">
                  <TableHead className="w-[100px] text-ink font-medium pl-6">ID</TableHead>
                  <TableHead className="text-ink font-medium">Tanggal</TableHead>
                  <TableHead className="text-ink font-medium">Judul Keluhan</TableHead>
                  <TableHead className="text-ink font-medium hidden md:table-cell">Kategori</TableHead>
                  <TableHead className="text-right text-ink font-medium pr-6">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {laporanDb.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted">
                      Belum ada laporan yang pernah dikirim.
                    </TableCell>
                  </TableRow>
                ) : (
                  laporanDb.map((laporan) => (
                    <TableRow key={laporan.id} className="border-hairline hover:bg-surface-soft/50 transition-colors">
                      <TableCell className="font-medium text-body pl-6">{laporan.id.slice(0, 8)}...</TableCell>
                      <TableCell className="text-body">
                          {new Date(laporan.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </TableCell>
                      <TableCell className="align-top py-4">
                        <div className="text-ink font-medium">{laporan.judul}</div>
                        {laporan.tanggapan && (
                          <div className="mt-2 p-2 bg-success/5 border border-success/20 rounded text-sm text-body">
                            <span className="font-medium text-success block text-xs mb-0.5">Tanggapan Dapur:</span>
                            {laporan.tanggapan}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-body hidden md:table-cell align-top py-4">{laporan.kategori}</TableCell>
                      <TableCell className="text-right pr-6 align-top py-4">
                        {getStatusBadge(laporan.status)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
    </div>
  );
}

