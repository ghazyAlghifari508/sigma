"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createEdukasi, updateEdukasi, deleteEdukasi } from "@/app/actions/edukasi";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Link from "next/link";

type EdukasiItem = {
  id: string;
  judul: string;
  konten: string;
  gambarUrl: string | null;
  kategori: string;
  isPublished: boolean;
  createdAt: Date;
};

export function EdukasiClient({ initialData, authorId }: { initialData: EdukasiItem[], authorId: string }) {
  const [data, setData] = useState<EdukasiItem[]>(initialData);
  const [isPending, startTransition] = useTransition();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [gambarUrl, setGambarUrl] = useState("");
  const [konten, setKonten] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  const resetForm = () => {
    setJudul("");
    setKategori("");
    setGambarUrl("");
    setKonten("");
    setIsPublished(true);
    setEditingId(null);
  };

  const handleEdit = (item: EdukasiItem) => {
    setEditingId(item.id);
    setJudul(item.judul);
    setKategori(item.kategori);
    setGambarUrl(item.gambarUrl || "");
    setKonten(item.konten);
    setIsPublished(item.isPublished);
    setOpenDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus artikel edukasi ini?")) return;
    
    startTransition(async () => {
      const res = await deleteEdukasi(id);
      if (res.success) {
        toast.success("Edukasi berhasil dihapus");
        setData((prev) => prev.filter((item) => item.id !== id));
      } else {
        toast.error(res.error || "Gagal menghapus");
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !kategori || !konten) {
      toast.error("Judul, Kategori, dan Konten wajib diisi");
      return;
    }

    startTransition(async () => {
      const payload = {
        judul,
        kategori,
        gambarUrl: gambarUrl || undefined,
        konten,
        isPublished,
      };

      if (editingId) {
        const res = await updateEdukasi(editingId, payload);
        if (res.success) {
          toast.success("Edukasi berhasil diupdate");
          setOpenDialog(false);
          // Update local state optimistic
          setData(prev => prev.map(item => item.id === editingId ? { ...item, ...payload, gambarUrl: payload.gambarUrl || null } : item));
        } else {
          toast.error(res.error);
        }
      } else {
        const res = await createEdukasi(authorId, payload);
        if (res.success) {
          toast.success("Edukasi berhasil ditambahkan");
          setOpenDialog(false);
          // Hard reload or let server components re-fetch, but for simplicity we reload
          window.location.reload();
        } else {
          toast.error(res.error);
        }
      }
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-[32px] font-normal tracking-tight text-ink">Manajemen Edukasi</h2>
          <p className="text-body mt-1">Kelola artikel edukasi gizi dan kesehatan untuk siswa.</p>
        </div>

        <Dialog open={openDialog} onOpenChange={(open) => {
          setOpenDialog(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger render={<Button variant="airtable-primary" className="h-10 py-2 px-4 rounded-[8px] text-[14px]" />}>
            <Plus className="mr-2 h-4 w-4" /> Tambah Edukasi
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] bg-white border-hairline text-ink max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-ink">{editingId ? "Edit Edukasi" : "Tambah Edukasi Baru"}</DialogTitle>
              <DialogDescription className="text-body">
                Gunakan Markdown untuk memformat konten (contoh: **tebal**, *miring*, - list).
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="judul" className="text-ink">Judul Artikel</Label>
                <Input 
                  id="judul" 
                  value={judul} 
                  onChange={(e) => setJudul(e.target.value)} 
                  className="bg-white border-hairline text-ink" 
                  placeholder="Contoh: Pentingnya Sarapan Pagi" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="kategori" className="text-ink">Kategori</Label>
                  <Input 
                    id="kategori" 
                    value={kategori} 
                    onChange={(e) => setKategori(e.target.value)} 
                    className="bg-white border-hairline text-ink" 
                    placeholder="Contoh: Gizi, Kesehatan" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gambar" className="text-ink">URL Gambar Cover (Opsional)</Label>
                  <Input 
                    id="gambar" 
                    value={gambarUrl} 
                    onChange={(e) => setGambarUrl(e.target.value)} 
                    className="bg-white border-hairline text-ink" 
                    placeholder="https://images.unsplash.com/..." 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="konten" className="text-ink flex justify-between">
                  <span>Isi Konten (Markdown)</span>
                  <Link href="https://www.markdownguide.org/cheat-sheet/" target="_blank" className="text-indigo-600 hover:text-indigo-500 text-xs flex items-center">
                    Panduan Markdown <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                </Label>
                <Textarea 
                  id="konten" 
                  value={konten} 
                  onChange={(e) => setKonten(e.target.value)} 
                  className="bg-white border-hairline text-ink min-h-[250px] font-mono text-sm" 
                  placeholder="Tulis konten edukasi di sini..." 
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input 
                  type="checkbox" 
                  id="isPublished" 
                  checked={isPublished} 
                  onChange={(e) => setIsPublished(e.target.checked)} 
                  className="rounded border-hairline bg-white"
                />
                <Label htmlFor="isPublished" className="text-ink">Publikasikan segera</Label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-hairline/50">
                <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)} className="text-body hover:text-ink">
                  Batal
                </Button>
                <Button type="submit" disabled={isPending} variant="airtable-primary">
                  {isPending ? "Menyimpan..." : "Simpan Edukasi"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-white border-hairline shadow-sm rounded-[10px]">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-ink">Daftar Artikel Edukasi</CardTitle>
          <CardDescription className="text-body">Total {data.length} artikel telah dibuat.</CardDescription>
        </CardHeader>
        <CardContent>
          {data.length === 0 ? (
            <div className="text-center py-12 text-muted">
              Belum ada data edukasi. Klik tombol "Tambah Edukasi" untuk mulai.
            </div>
          ) : (
            <div className="overflow-x-auto border border-hairline rounded-md">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-ink uppercase bg-surface-soft border-b border-hairline">
                  <tr>
                    <th className="px-4 py-3 font-medium">Judul</th>
                    <th className="px-4 py-3 font-medium">Kategori</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} className="border-b border-hairline hover:bg-surface-soft/50 transition-colors">
                      <td className="px-4 py-4 font-medium text-ink">
                        {item.judul}
                      </td>
                      <td className="px-4 py-4 text-body">
                        {item.kategori}
                      </td>
                      <td className="px-4 py-4">
                        {item.isPublished ? (
                          <Badge className="bg-success/10 text-success border-success/20">Published</Badge>
                        ) : (
                          <Badge variant="outline" className="text-muted border-hairline">Draft</Badge>
                        )}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(item)} className="h-8 w-8 text-body hover:text-indigo-600">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="h-8 w-8 text-body hover:text-destructive" disabled={isPending}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
