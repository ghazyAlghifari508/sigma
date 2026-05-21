"use client";

import { useState, useTransition } from "react";
import { MessageSquareWarning, Search, Filter, CheckCircle2, Send, X } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { evaluasiLaporanSppg } from "@/app/actions/sppg";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "DITERIMA":
      return <Badge variant="outline" className="border-destructive/30 text-destructive bg-destructive/10">Baru</Badge>;
    case "DIPROSES":
      return <Badge variant="secondary" className="bg-warning/20 text-warning hover:bg-warning/30 border-warning/30 border">Diteruskan ke Anda</Badge>;
    case "SELESAI":
      return <Badge variant="default" className="bg-success/20 text-success hover:bg-success/30 border-success/30 border">Telah Dievaluasi</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

type KeluhanClientProps = {
  initialKeluhan: any[];
};

export default function KeluhanClient({ initialKeluhan }: KeluhanClientProps) {
  const [keluhanList, setKeluhanList] = useState(initialKeluhan);
  const [isPending, startTransition] = useTransition();
  const [evaluasiId, setEvaluasiId] = useState<string | null>(null);
  const [tanggapan, setTanggapan] = useState("");

  const handleSubmitEvaluasi = (id: string) => {
    if (!tanggapan.trim()) return;

    startTransition(async () => {
      const res = await evaluasiLaporanSppg(id, tanggapan);
      if (res.success) {
        setKeluhanList(prev => 
          prev.map(k => k.id === id ? { ...k, status: "SELESAI", tanggapan } : k)
        );
        setEvaluasiId(null);
        setTanggapan("");
      } else {
        alert("Gagal menyimpan evaluasi: " + res.error);
      }
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-[32px] md:text-[40px] font-normal text-ink mb-2 flex items-center gap-2 tracking-tight">
            <MessageSquareWarning className="h-7 w-7 text-indigo-600" />
            Tindak Lanjut Keluhan
          </h2>
          <p className="text-body">
            Berikan evaluasi terhadap keluhan yang diteruskan oleh Pemerintah kepada Dapur Anda.
          </p>
        </div>
      </div>

      <Card className="bg-white border-hairline shadow-sm rounded-[10px]">
        <CardHeader className="border-b border-hairline pb-4 bg-surface-soft">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-lg font-medium text-ink">Daftar Tiket Keluhan Eskalasi</CardTitle>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-body" />
                <Input 
                  placeholder="Cari keluhan..." 
                  className="pl-9 bg-white border-hairline text-ink focus-visible:ring-indigo-600/20 h-9"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader className="bg-surface-soft border-b border-hairline">
              <TableRow className="border-hairline hover:bg-transparent">
                <TableHead className="w-[100px] text-ink font-medium pl-6">ID</TableHead>
                <TableHead className="text-ink font-medium">Informasi Siswa</TableHead>
                <TableHead className="text-ink font-medium w-[40%]">Detail Keluhan</TableHead>
                <TableHead className="text-ink font-medium">Status</TableHead>
                <TableHead className="text-right text-ink font-medium pr-6">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keluhanList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-body">
                    Belum ada keluhan yang diekskalasi ke Dapur ini.
                  </TableCell>
                </TableRow>
              ) : (
                keluhanList.map((keluhan) => (
                  <TableRow key={keluhan.id} className="border-hairline hover:bg-surface-soft/20 transition-colors">
                    <TableCell className="font-medium text-body pl-6 text-xs align-top pt-4">{keluhan.id.slice(0, 8)}...</TableCell>
                    <TableCell className="align-top pt-4">
                      <div className="text-ink font-medium">{keluhan.siswa?.user?.name || "Siswa Anonim"}</div>
                      <div className="text-xs text-body mt-1">{keluhan.siswa?.sekolah?.nama}</div>
                    </TableCell>
                    <TableCell className="align-top pt-4">
                      <div className="text-ink font-medium">{keluhan.judul}</div>
                      <div className="text-body text-sm mt-1 whitespace-pre-wrap">{keluhan.isi}</div>
                      <div className="flex items-center gap-2 mt-2 mb-2">
                        <span className="text-xs text-body">
                          {new Date(keluhan.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                        <span className="text-xs text-body/50">•</span>
                        <span className="text-xs text-body bg-surface-soft border border-hairline px-2 py-0.5 rounded-sm">{keluhan.kategori}</span>
                      </div>
                      
                      {/* Tanggapan Area */}
                      {keluhan.status === "SELESAI" && keluhan.tanggapan && (
                        <div className="mt-3 p-3 bg-surface-soft border border-hairline rounded-md">
                          <span className="text-xs font-semibold text-ink flex items-center gap-1 mb-1">
                            <CheckCircle2 className="w-3 h-3 text-success" /> Tanggapan Dapur:
                          </span>
                          <p className="text-sm text-body">{keluhan.tanggapan}</p>
                        </div>
                      )}

                      {/* Evaluasi Form */}
                      {evaluasiId === keluhan.id && (
                        <div className="mt-3 p-3 bg-white border border-indigo-200 rounded-md shadow-sm">
                          <span className="text-sm font-medium text-indigo-600 block mb-2">Beri Evaluasi/Tanggapan</span>
                          <Textarea 
                            placeholder="Ketik tanggapan atau evaluasi atas keluhan ini..."
                            className="bg-surface-soft border-hairline min-h-[80px] mb-2"
                            value={tanggapan}
                            onChange={(e) => setTanggapan(e.target.value)}
                          />
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 border-hairline"
                              onClick={() => { setEvaluasiId(null); setTanggapan(""); }}
                              disabled={isPending}
                            >
                              <X className="w-3 h-3 mr-1" /> Batal
                            </Button>
                            <Button 
                              size="sm" 
                              className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white"
                              onClick={() => handleSubmitEvaluasi(keluhan.id)}
                              disabled={isPending || !tanggapan.trim()}
                            >
                              <Send className="w-3 h-3 mr-1" /> Simpan
                            </Button>
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="align-top pt-4">
                      {getStatusBadge(keluhan.status)}
                    </TableCell>
                    <TableCell className="text-right pr-6 align-top pt-4">
                      {keluhan.status === "DIPROSES" && evaluasiId !== keluhan.id && (
                        <Button 
                          size="sm" 
                          className="h-8 text-xs bg-indigo-600 hover:bg-indigo-700 text-white"
                          onClick={() => {
                            setEvaluasiId(keluhan.id);
                            setTanggapan("");
                          }}
                        >
                          Beri Tanggapan
                        </Button>
                      )}
                      {keluhan.status === "SELESAI" && (
                        <span className="text-xs text-body italic">Telah Ditanggapi</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
    </div>
  );
}
