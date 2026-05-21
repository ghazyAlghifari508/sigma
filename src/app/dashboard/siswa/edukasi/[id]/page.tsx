import { getEdukasiById } from "@/app/actions/edukasi";
import { notFound } from "next/navigation";
import { MarkdownViewer } from "@/components/shared/MarkdownViewer";
import Link from "next/link";
import { ChevronLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function EdukasiDetailPage({ params }: { params: { id: string } }) {
  const result = await getEdukasiById(params.id);
  
  if (!result.success || !result.data) {
    notFound();
  }

  const article = result.data;

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
      
      <Link href="/dashboard/siswa/edukasi">
        <Button variant="ghost" className="text-body hover:text-ink -ml-4">
          <ChevronLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Edukasi
        </Button>
      </Link>

      <article className="bg-white border-hairline rounded-[10px] overflow-hidden shadow-sm">
        {article.gambarUrl && (
          <div className="w-full h-64 sm:h-80 md:h-96 relative">
            <img 
              src={article.gambarUrl} 
              alt={article.judul} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        <div className={`p-6 md:p-10 ${!article.gambarUrl ? "pt-10" : "-mt-20 relative z-10"}`}>
          <Badge className="bg-indigo-50 text-indigo-600 border-indigo-200 mb-4 backdrop-blur-sm">
            {article.kategori}
          </Badge>
          
          <h1 className="text-[32px] md:text-[40px] font-normal text-ink mb-6 leading-tight tracking-tight">
            {article.judul}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-body mb-10 pb-6 border-b border-hairline">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              {new Date(article.createdAt).toLocaleDateString("id-ID", {
                weekday: 'long',
                day: "numeric",
                month: "long",
                year: "numeric"
              })}
            </div>
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              {article.author.name}
            </div>
          </div>

          <div className="text-ink">
            <MarkdownViewer content={article.konten} />
          </div>
        </div>
      </article>
      
    </div>
  );
}
