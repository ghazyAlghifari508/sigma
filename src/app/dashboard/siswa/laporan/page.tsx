"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CheckCircle2, FileWarning, Send } from "lucide-react";
import { submitLaporan } from "@/app/actions/siswa";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  judul: z.string().min(5, {
    message: "Judul laporan minimal 5 karakter.",
  }),
  kategori: z.string().min(1, {
    message: "Silakan pilih kategori laporan.",
  }),
  deskripsi: z.string().min(10, {
    message: "Deskripsi keluhan minimal 10 karakter.",
  }),
});

export default function BuatLaporanPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      judul: "",
      deskripsi: "",
    },
  });

  // 2. Define a submit handler.
  const [isPending, startTransition] = useTransition();

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const res = await submitLaporan({
        judul: values.judul,
        isi: values.deskripsi,
        kategori: values.kategori,
      });

      if (res.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          form.reset();
        }, 3000);
      } else {
        alert("Gagal mengirim laporan: " + res.error);
      }
    });
  }

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="mb-8">
        <h2 className="text-[32px] md:text-[40px] font-normal text-ink mb-2 flex items-center gap-2">
          <FileWarning className="h-8 w-8 text-indigo-600" />
          Form Keluhan Siswa
        </h2>
        <p className="text-body">
          Sampaikan keluhan atau masukan kamu terkait program Makan Bergizi Gratis (MBG). Laporan akan diteruskan ke petugas dapur atau pemerintah.
        </p>
      </div>

      <Card className="bg-white border-hairline shadow-sm rounded-[10px]">
        <CardHeader>
          <CardTitle className="text-ink text-xl font-medium">Detail Laporan</CardTitle>
          <CardDescription className="text-body">
            Pastikan kamu mengisi data dengan jelas dan benar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in-95 duration-300">
              <div className="h-20 w-20 bg-success/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-10 w-10 text-success" />
              </div>
              <h3 className="text-xl font-medium text-ink mb-2">Laporan Berhasil Terkirim!</h3>
              <p className="text-body max-w-sm">
                Terima kasih atas laporan kamu. Petugas akan segera memproses keluhan ini.
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <FormField
                  control={form.control}
                  name="judul"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ink">Judul Laporan</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Misal: Makanan belum datang hari ini" 
                          className="bg-surface-soft border-hairline text-ink focus-visible:ring-indigo-600"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription className="text-body">
                        Tuliskan inti dari keluhan kamu secara singkat.
                      </FormDescription>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="kategori"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ink">Kategori</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-surface-soft border-hairline text-ink focus:ring-indigo-600">
                            <SelectValue placeholder="Pilih jenis keluhan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white border-hairline text-ink">
                          <SelectItem value="Keterlambatan">Keterlambatan Distribusi</SelectItem>
                          <SelectItem value="Kualitas">Kualitas Makanan</SelectItem>
                          <SelectItem value="Porsi">Porsi Tidak Sesuai</SelectItem>
                          <SelectItem value="Lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deskripsi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ink">Deskripsi Detail</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Jelaskan detail kronologi keluhan di sini..." 
                          className="min-h-[120px] bg-surface-soft border-hairline text-ink focus-visible:ring-indigo-600 resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />

                <div className="pt-4 border-t border-hairline flex justify-end">
                  <Button 
                    type="submit" 
                    variant="airtable-primary"
                    disabled={isPending}
                  >
                    {isPending ? "Mengirim Laporan..." : (
                      <>
                        Kirim Laporan <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
