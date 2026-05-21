import { getEdukasiById } from "@/app/actions/edukasi";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CalendarIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default async function SiswaEdukasiDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const result = await getEdukasiById(resolvedParams.id);
  
  if (!result.success || !result.data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
        <h2 className="text-2xl font-semibold text-ink mb-2">Edukasi Tidak Ditemukan</h2>
        <p className="text-body mb-6">Artikel edukasi yang Anda cari mungkin sudah dihapus atau tidak tersedia.</p>
        <Link href="/dashboard/siswa/edukasi" className="text-indigo-600 hover:text-indigo-700 flex items-center font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Daftar Edukasi
        </Link>
      </div>
    );
  }

  const edukasi = result.data;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <Link href="/dashboard/siswa/edukasi" className="text-body hover:text-indigo-600 flex items-center w-fit transition-colors mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali ke Daftar Edukasi
      </Link>

      <Card className="bg-[#fffbf7] border-hairline shadow-sm rounded-[12px] overflow-hidden">
        {edukasi.gambarUrl ? (
          <div className="w-full h-64 md:h-[400px] overflow-hidden bg-surface-soft relative">
            <img 
              src={edukasi.gambarUrl} 
              alt={edukasi.judul} 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-32 bg-gradient-to-br from-indigo-100 to-indigo-50 border-b border-hairline flex items-center justify-center">
             <span className="text-indigo-300 text-3xl font-medium tracking-tight">SIGMA Edukasi</span>
          </div>
        )}

        <div className="p-6 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <Badge variant="outline" className="text-indigo-600 border-indigo-600/20 bg-indigo-50 text-sm px-3 py-1">
              {edukasi.kategori}
            </Badge>
            <div className="flex items-center text-sm text-body">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {new Date(edukasi.createdAt).toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
              })}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-ink mb-8 leading-tight tracking-tight">
            {edukasi.judul}
          </h1>

          <div className="prose prose-indigo max-w-none text-ink prose-headings:text-ink prose-a:text-indigo-600">
            <ReactMarkdown>
              {edukasi.konten}
            </ReactMarkdown>
          </div>
        </div>
        
        <CardFooter className="bg-surface-soft border-t border-hairline px-6 py-4 flex justify-between items-center text-sm text-body">
          <span>Diterbitkan oleh: <span className="font-medium text-ink">{edukasi.author?.name || "Tim SIGMA"}</span></span>
          <Link href="/dashboard/siswa/edukasi" className="text-indigo-600 hover:underline font-medium">
            Selesai Membaca
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
