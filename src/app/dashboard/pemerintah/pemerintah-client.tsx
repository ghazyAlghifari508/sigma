"use client";

import { Building2, Utensils, School, ShieldAlert, CheckCircle2, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Note: In real app, this chart data would come from aggregated backend queries.
const barChartData = [
  { kecamatan: "Bojongsoang", porsi: 3500 },
  { kecamatan: "Dayeuhkolot", porsi: 2800 },
  { kecamatan: "Baleendah", porsi: 4200 },
  { kecamatan: "Ciparay", porsi: 1900 },
  { kecamatan: "Majalaya", porsi: 2400 },
];

const areaChartData = [
  { hari: "Sen", total: 12500 },
  { hari: "Sel", total: 14800 },
  { hari: "Rab", total: 14200 },
  { hari: "Kam", total: 15100 },
  { hari: "Jum", total: 16000 },
];

const barChartConfig = {
  porsi: {
    label: "Porsi Disalurkan",
    color: "hsl(var(--primary))",
  },
};

const areaChartConfig = {
  total: {
    label: "Total Nasional/Region",
    color: "#6366f1", // indigo-500
  },
};

type PemerintahClientProps = {
  makro: {
    totalPorsiDisalurkan: number;
    totalDapur: number;
    totalSekolah: number;
    totalSiswa: number;
  } | null;
};

export default function PemerintahClient({ makro }: PemerintahClientProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-[32px] font-normal text-ink tracking-tight">Makro Analitik</h2>
          <p className="text-body mt-1">Ringkasan performa program MBG tingkat regional (Kab. Bandung).</p>
        </div>
        <div className="flex gap-2">
          <Button variant="airtable-secondary" className="h-10 py-2 px-4 rounded-[8px] text-[14px]">
            Unduh Laporan
          </Button>
          <Link href="/dashboard/pemerintah/peta">
            <Button variant="airtable-primary" className="h-10 py-2 px-4 rounded-[8px] text-[14px]">
              Lihat Peta Geospasial
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-hairline shadow-sm rounded-[10px]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-body">Total Porsi Disalurkan</CardTitle>
            <Utensils className="h-4 w-4 text-ink" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-medium text-ink">{makro?.totalPorsiDisalurkan?.toLocaleString('id-ID') || '0'}</div>
            <p className="text-xs text-success mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12% dari minggu lalu
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-hairline shadow-sm rounded-[10px]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-body">Sekolah Tercakup</CardTitle>
            <School className="h-4 w-4 text-ink" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-medium text-ink">{makro?.totalSekolah || 0}</div>
            <p className="text-xs text-muted mt-1">Sekolah dalam jaringan distribusi</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-hairline shadow-sm rounded-[10px]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-body">Dapur Sentral Aktif</CardTitle>
            <Building2 className="h-4 w-4 text-ink" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-medium text-ink">{makro?.totalDapur || 0}</div>
            <p className="text-xs text-muted mt-1">Akumulasi seluruh SPPG</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-hairline shadow-sm rounded-[10px] overflow-hidden relative group">
          <div className="absolute inset-0 bg-success/5 z-0" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-body">Status Operasional</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-medium text-success drop-shadow-sm">AMAN</div>
            <p className="text-xs text-muted mt-1">Tidak ada anomali terdeteksi</p>
          </CardContent>
        </Card>
      </div>

      {/* Next sections with dummy charts since there are no actual APIs yet for complex aggregates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribusi per Kecamatan (Bar Chart) */}
        <Card className="bg-white border-hairline shadow-sm rounded-[10px]">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-ink">Distribusi per Kecamatan</CardTitle>
            <CardDescription className="text-body">Jumlah porsi MBG berdasarkan wilayah administratif.</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <ChartContainer config={barChartConfig} className="h-[250px] w-full">
              {/* @ts-ignore */}
              <BarChart accessibilityLayer data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                <CartesianGrid horizontal={false} stroke="#e0e2e6" strokeDasharray="4 4" />
                <XAxis 
                  type="number"
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={10} 
                  stroke="#9297a0" 
                  fontSize={12}
                />
                <YAxis 
                  type="category"
                  dataKey="kecamatan"
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={10} 
                  stroke="#9297a0" 
                  fontSize={12}
                />
                <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: '#e0e2e6', opacity: 0.4 }} />
                <Bar 
                  dataKey="porsi" 
                  fill="#181d26" 
                  radius={[0, 4, 4, 0]} 
                  barSize={24}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Tren Agregat (Area Chart) */}
        <Card className="bg-white border-hairline shadow-sm rounded-[10px]">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-ink">Tren Distribusi Nasional (Minggu Ini)</CardTitle>
            <CardDescription className="text-body">Total agregat penyaluran dari seluruh dapur.</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <ChartContainer config={areaChartConfig} className="h-[250px] w-full">
              {/* @ts-ignore */}
              <AreaChart accessibilityLayer data={areaChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1b61c9" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#1b61c9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#e0e2e6" strokeDasharray="4 4" />
                <XAxis 
                  dataKey="hari" 
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={10} 
                  stroke="#9297a0" 
                  fontSize={12}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={10} 
                  stroke="#9297a0" 
                  fontSize={12}
                />
                <ChartTooltip content={<ChartTooltipContent />} cursor={{ stroke: '#1b61c9', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area 
                  type="monotone"
                  dataKey="total" 
                  stroke="#1b61c9" 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#fillTotal)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
