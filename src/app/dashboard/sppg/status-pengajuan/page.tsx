"use client";

import { AlertTriangle, Clock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { signOut } from "next-auth/react";

export default function StatusPengajuanPage() {
  return (
    <div className="w-full max-w-lg mx-auto animate-in fade-in zoom-in-95 duration-500">
      <Card className="bg-[#fffbf7] border-hairline shadow-sm relative overflow-hidden rounded-[10px]">
        {/* Accent Top Border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-warning" />
        
        <CardHeader className="text-center pt-10 pb-2">
          <div className="mx-auto w-20 h-20 bg-warning/10 rounded-full flex items-center justify-center mb-6">
            <Clock className="w-10 h-10 text-warning" />
          </div>
          <CardTitle className="text-2xl font-bold text-ink mb-2">Menunggu Persetujuan</CardTitle>
          <CardDescription className="text-body text-base">
            Akun Dapur Anda sedang dalam tahap verifikasi oleh Pemerintah.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6 pb-8 px-8">
          <div className="bg-surface-soft border border-hairline rounded-[8px] p-5 mb-2">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-5 h-5 text-body shrink-0 mt-0.5" />
              <div className="text-sm text-body leading-relaxed">
                <span className="text-ink font-medium block mb-1">Kenapa saya melihat halaman ini?</span>
                Proses verifikasi ini diperlukan untuk memastikan standar kualitas dan keamanan operasional dapur untuk Program Makan Bergizi Gratis (MBG). Tim dari pemerintah akan meninjau kelengkapan dokumen dan fasilitas Anda.
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center border-t border-hairline pt-6 pb-6 bg-surface-soft">
          <Button 
            variant="outline" 
            className="border-hairline bg-[#fffbf7] text-ink hover:bg-surface-soft hover:text-ink"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Kembali ke Halaman Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

