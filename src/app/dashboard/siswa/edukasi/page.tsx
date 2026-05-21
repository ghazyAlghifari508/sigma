import { getEdukasiPublished } from "@/app/actions/edukasi";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ChevronRight } from "lucide-react";

export default async function SiswaEdukasiPage() {
  const result = await getEdukasiPublished();
  const edukasi = result.success && result.data ? result.data : [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div>
        <h2 className="text-[32px] md:text-[40px] font-normal text-ink mb-2 tracking-tight">Edukasi Gizi & Kesehatan</h2>
        <p className="text-body mt-1">Baca artikel dan panduan terbaru untuk hidup lebih sehat.</p>
      </div>

      {edukasi.length === 0 ? (
        <Card className="bg-surface-soft border-hairline text-center py-12 rounded-[10px]">
          <CardContent>
            <p className="text-body">Belum ada artikel edukasi yang diterbitkan saat ini.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {edukasi.map((item: any) => (
            <Link key={item.id} href={`/dashboard/siswa/edukasi/${item.id}`} className="group h-full">
              <Card className="bg-white border-hairline hover:border-indigo-600/50 shadow-sm rounded-[10px] transition-all duration-300 h-full flex flex-col overflow-hidden">
                {item.gambarUrl ? (
                  <div className="h-48 w-full overflow-hidden bg-surface-soft border-b border-hairline">
                    {/* Using standard img to avoid next/image domain config issues for MVP */}
                    <img 
                      src={item.gambarUrl} 
                      alt={item.judul} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                ) : (
                  <div className="h-48 w-full bg-gradient-to-br from-indigo-100 to-indigo-50 border-b border-hairline flex items-center justify-center">
                    <span className="text-indigo-300 text-4xl font-normal tracking-tight">SIGMA</span>
                  </div>
                )}
                <CardHeader className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-indigo-600 border-indigo-600/20 bg-indigo-50">
                      {item.kategori}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-medium text-ink group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {item.judul}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="flex justify-between items-center text-xs text-body border-t border-hairline pt-4">
                  <div className="flex items-center">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    {new Date(item.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}
                  </div>
                  <span className="flex items-center font-medium text-indigo-600 group-hover:translate-x-1 transition-transform">
                    Baca <ChevronRight className="h-3 w-3 ml-1" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
