"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CheckCircle2, Truck, Plus, History } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { submitDistribusi } from "@/app/actions/sppg";

const formSchema = z.object({
  sekolah: z.string().min(1, { message: "Pilih sekolah tujuan." }),
  porsi: z.string().min(1, { message: "Jumlah porsi wajib diisi." }),
  keterangan: z.string().optional(),
});

type DistribusiClientProps = {
  sekolahSasaran: any[];
  riwayatDistribusi: any[];
};

export default function DistribusiClient({ sekolahSasaran, riwayatDistribusi }: DistribusiClientProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sekolah: "",
      porsi: "",
      keterangan: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const res = await submitDistribusi({
        sekolahId: values.sekolah,
        jumlahPorsi: parseInt(values.porsi, 10),
        keterangan: values.keterangan,
      });

      if (res.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          form.reset({
            ...form.getValues(),
            porsi: "",
            keterangan: "",
          });
        }, 2500);
      } else {
        alert("Gagal menyimpan data: " + res.error);
      }
    });
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      <div>
        <h2 className="text-[32px] md:text-[40px] font-normal text-ink mb-2 flex items-center gap-2 tracking-tight">
          <Truck className="h-7 w-7 text-indigo-600" />
          Distribusi Harian
        </h2>
        <p className="text-body">
          Catat pengiriman porsi Makanan Bergizi Gratis (MBG) harian ke sekolah yang Anda layani.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-5">
          <Card className="bg-white border-hairline sticky top-24 shadow-sm rounded-[10px]">
            <CardHeader className="border-b border-hairline pb-4">
              <CardTitle className="text-ink text-lg flex items-center gap-2 font-medium">
                <Plus className="w-5 h-5 text-indigo-600" />
                Input Distribusi Hari Ini
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center animate-in zoom-in-95 duration-300">
                  <div className="h-16 w-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="text-lg font-medium text-ink mb-1">Berhasil Disimpan!</h3>
                  <p className="text-sm text-body">Data distribusi hari ini telah tercatat.</p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    
                    <FormField
                      control={form.control}
                      name="sekolah"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-ink font-medium">Sekolah Tujuan</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white border-hairline text-ink focus:ring-indigo-600/20">
                                <SelectValue placeholder="Pilih sekolah" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border-hairline text-ink">
                              {sekolahSasaran.map((sk) => (
                                <SelectItem key={sk.id} value={sk.id} className="hover:bg-surface-soft cursor-pointer">{sk.nama}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-destructive text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="porsi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-ink font-medium">Jumlah Porsi</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              className="bg-white border-hairline text-ink focus-visible:ring-indigo-600/20"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-destructive text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="keterangan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-ink font-medium">Keterangan (Opsional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Catatan tambahan jika ada..." 
                              className="bg-white border-hairline text-ink focus-visible:ring-indigo-600/20 resize-none h-20"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-destructive text-xs" />
                        </FormItem>
                      )}
                    />

                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-pill"
                        disabled={isPending}
                      >
                        {isPending ? "Menyimpan..." : "Simpan Data Distribusi"}
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tabel Section */}
        <div className="lg:col-span-7">
          <Card className="bg-white border-hairline h-full shadow-sm rounded-[10px]">
            <CardHeader className="border-b border-hairline pb-4">
              <CardTitle className="text-ink text-lg flex items-center gap-2 font-medium">
                <History className="w-5 h-5 text-body" />
                Riwayat Distribusi (Terbaru)
              </CardTitle>
              <CardDescription className="text-body">
                Daftar pengiriman terakhir yang tercatat di sistem.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 sm:pt-4">
              <div className="border border-hairline rounded-[8px] overflow-hidden bg-white">
                <Table>
                  <TableHeader className="bg-surface-soft">
                    <TableRow className="border-hairline hover:bg-transparent">
                      <TableHead className="text-ink font-medium pl-4 w-[120px]">Tanggal</TableHead>
                      <TableHead className="text-ink font-medium">Sekolah</TableHead>
                      <TableHead className="text-ink font-medium text-right">Porsi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {riwayatDistribusi.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-body py-8">
                          Belum ada riwayat distribusi
                        </TableCell>
                      </TableRow>
                    ) : (
                      riwayatDistribusi.map((item) => (
                        <TableRow key={item.id} className="border-hairline hover:bg-surface-soft/50">
                          <TableCell className="font-medium text-body pl-4">
                            {new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </TableCell>
                          <TableCell className="text-ink font-medium">{item.sekolah.nama}</TableCell>
                          <TableCell className="text-right font-medium text-success">
                            {item.jumlahPorsi}
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

      </div>
    </div>
  );
}
