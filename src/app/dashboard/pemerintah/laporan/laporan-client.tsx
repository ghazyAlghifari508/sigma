"use client";

import { useState, useTransition } from "react";
import { MessageSquareWarning, Send, Clock, CheckCircle2, User, Building, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { forwardLaporanKeDapur, tolakLaporanPemerintah, hapusLaporanPemerintah } from "@/app/actions/pemerintah";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function LaporanClient({ initialLaporan }: { initialLaporan: any[] }) {
  const [laporan, setLaporan] = useState(initialLaporan);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleForward = (id: string) => {
    startTransition(async () => {
      const res = await forwardLaporanKeDapur(id);
      if (res.success) {
        toast.success("Laporan diteruskan ke Dapur terkait.");
        setLaporan(prev => prev.map(l => l.id === id ? { ...l, status: "DIPROSES" } : l));
      } else {
        toast.error(res.error || "Gagal meneruskan laporan");
      }
    });
  };

  const handleTolak = (id: string) => {
    startTransition(async () => {
      const res = await tolakLaporanPemerintah(id);
      if (res.success) {
        toast.success("Laporan berhasil ditolak.");
        setLaporan(prev => prev.map(l => l.id === id ? { ...l, status: "DITOLAK" } : l));
      } else {
        toast.error(res.error || "Gagal menolak laporan");
      }
    });
  };

  const handleHapus = () => {
    if(!deleteId) return;
    
    startTransition(async () => {
      const res = await hapusLaporanPemerintah(deleteId);
      if (res.success) {
        toast.success("Laporan berhasil dihapus.");
        setLaporan(prev => prev.filter(l => l.id !== deleteId));
      } else {
        toast.error(res.error || "Gagal menghapus laporan");
      }
      setDeleteId(null);
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div>
        <h2 className="text-[32px] md:text-[40px] font-normal text-ink mb-2 flex items-center gap-2 tracking-tight">
          <MessageSquareWarning className="h-7 w-7 text-indigo-600" />
          Eskalasi Keluhan
        </h2>
        <p className="text-body max-w-3xl">
          Tinjau laporan keluhan dari siswa dan teruskan ke Dapur (SPPG) yang bersangkutan untuk evaluasi lebih lanjut.
        </p>
      </div>

      <div className="space-y-6">
        {laporan.length === 0 ? (
          <div className="text-center py-20 bg-surface-soft border border-hairline rounded-xl">
            <MessageSquareWarning className="w-12 h-12 text-body mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium text-ink mb-1">Belum ada keluhan</h3>
            <p className="text-body">Semua berjalan lancar hari ini.</p>
          </div>
        ) : (
          laporan.map((item) => (
            <Card key={item.id} className="bg-[#fffbf7] border-hairline shadow-sm overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Info Siswa & Sekolah */}
                <div className="md:w-1/3 p-6 bg-surface-soft border-b md:border-b-0 md:border-r border-hairline">
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-body uppercase tracking-wider mb-1 block">Pelapor</span>
                      <div className="flex items-center gap-2 text-ink font-medium">
                        <User className="w-4 h-4 text-indigo-600" />
                        Siswa ID: {item.siswa?.userId?.substring(0, 5)}...
                      </div>
                      <div className="text-sm text-body mt-0.5">Kelas {item.siswa?.kelas || "-"}</div>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-body uppercase tracking-wider mb-1 block">Sekolah</span>
                      <div className="flex items-center gap-2 text-ink text-sm">
                        <Building className="w-4 h-4 text-indigo-600 shrink-0" />
                        {item.siswa?.sekolah?.nama}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-body uppercase tracking-wider mb-1 block">Tanggal Laporan</span>
                      <div className="text-sm text-ink flex items-center gap-2">
                        <Clock className="w-4 h-4 text-body" />
                        {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detail Laporan */}
                <div className="md:w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <Badge variant="outline" className="mb-2 bg-[#fffbf7] text-ink border-hairline">
                          {item.kategori}
                        </Badge>
                        <h3 className="text-xl font-semibold text-ink leading-tight">{item.judul}</h3>
                      </div>
                      
                      {item.status === "DITERIMA" && (
                        <Badge className="bg-warning text-white whitespace-nowrap">Baru Masuk</Badge>
                      )}
                      {item.status === "DIPROSES" && (
                        <Badge className="bg-indigo-600 text-white whitespace-nowrap">Diteruskan ke Dapur</Badge>
                      )}
                      {item.status === "SELESAI" && (
                        <Badge className="bg-success text-white whitespace-nowrap">Telah Dievaluasi</Badge>
                      )}
                      {item.status === "DITOLAK" && (
                        <Badge className="bg-destructive text-white whitespace-nowrap">Ditolak</Badge>
                      )}
                    </div>
                    
                    <div className="p-4 bg-surface-soft border border-hairline rounded-md mb-6">
                      <p className="text-body whitespace-pre-wrap">{item.isi}</p>
                    </div>

                    {item.tanggapan && (
                      <div className="mt-4 mb-6">
                        <span className="text-sm font-semibold text-ink block mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                          Tanggapan dari Dapur
                        </span>
                        <div className="p-4 bg-success/5 border border-success/20 rounded-md text-ink text-sm">
                          {item.tanggapan}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Unified Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-hairline mt-4">
                    <Button 
                      onClick={() => setDeleteId(item.id)}
                      disabled={isPending}
                      variant="ghost"
                      className="text-destructive hover:bg-destructive/10"
                    >
                      Hapus
                    </Button>
                    <div className="flex items-center gap-2">
                      {item.status === "DIPROSES" && (
                        <div className="hidden md:flex items-center gap-2 text-sm text-body mr-2">
                          <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                          Menunggu evaluasi Dapur...
                        </div>
                      )}
                      
                      <Button 
                        onClick={() => handleTolak(item.id)}
                        disabled={isPending || item.status !== "DITERIMA"}
                        variant="outline"
                        className={item.status === "DITOLAK" ? "bg-destructive text-white border-destructive opacity-100" : "text-destructive border-destructive hover:bg-destructive hover:text-white"}
                      >
                        {item.status === "DITOLAK" ? "Ditolak" : "Tolak"}
                      </Button>
                      <Button 
                        onClick={() => handleForward(item.id)}
                        disabled={isPending || item.status !== "DITERIMA"}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-100 disabled:bg-indigo-600/80"
                      >
                        {item.status === "DIPROSES" || item.status === "SELESAI" ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Terkirim
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Teruskan ke Dapur
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Laporan</DialogTitle>
            <DialogDescription>
              Yakin ingin menghapus laporan keluhan ini secara permanen? Data yang telah dihapus tidak dapat dikembalikan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button variant="outline" onClick={() => setDeleteId(null)} disabled={isPending}>Batal</Button>
            <Button variant="destructive" onClick={handleHapus} disabled={isPending}>
              {isPending ? "Menghapus..." : "Hapus Laporan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

