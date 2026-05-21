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
        <div className="flex gap-3">
          <Button className="h-11 px-6 rounded-xl text-sm font-medium bg-[#fffbf7] text-[#124f97] border border-gray-200 hover:bg-gray-50 shadow-sm transition-all">
            Unduh Laporan
          </Button>
          <Link href="/dashboard/pemerintah/peta">
            <Button className="h-11 px-6 rounded-xl text-sm font-bold bg-[#124f97] text-white hover:bg-[#124f97]/90 shadow-lg shadow-[#124f97]/20 transition-all">
              Lihat Peta Geospasial
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Primary KPI */}
        <div className="bg-[#124f97] rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#dbda16] rounded-bl-full -mr-4 -mt-4 opacity-90 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10 flex flex-col h-full justify-between gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white/80 uppercase tracking-wider">Total Porsi Disalurkan</span>
              <Utensils className="h-5 w-5 text-[#dbda16]" />
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">{makro?.totalPorsiDisalurkan?.toLocaleString('id-ID') || '0'}</div>
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-white">
                <TrendingUp className="w-3.5 h-3.5" /> +12% minggu ini
              </div>
            </div>
          </div>
        </div>

        {/* Secondary KPI 1 */}
        <div className="bg-[#fffbf7] border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex flex-col h-full justify-between gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Sekolah Tercakup</span>
              <div className="w-10 h-10 rounded-full bg-[#124f97]/10 flex items-center justify-center group-hover:bg-[#124f97] transition-colors">
                <School className="h-5 w-5 text-[#124f97] group-hover:text-white transition-colors" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#124f97] mb-1">{makro?.totalSekolah || 0}</div>
              <p className="text-xs font-medium text-gray-400">Dalam jaringan distribusi</p>
            </div>
          </div>
        </div>

        {/* Secondary KPI 2 */}
        <div className="bg-[#fffbf7] border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex flex-col h-full justify-between gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Dapur Sentral Aktif</span>
              <div className="w-10 h-10 rounded-full bg-[#124f97]/10 flex items-center justify-center group-hover:bg-[#124f97] transition-colors">
                <Building2 className="h-5 w-5 text-[#124f97] group-hover:text-white transition-colors" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#124f97] mb-1">{makro?.totalDapur || 0}</div>
              <p className="text-xs font-medium text-gray-400">Akumulasi seluruh SPPG</p>
            </div>
          </div>
        </div>

        {/* Secondary KPI 3 (Status) */}
        <div className="bg-white border-2 border-[#124f97]/10 rounded-3xl p-6 shadow-sm hover:border-[#dbda16]/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
          <div className="absolute inset-0 bg-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 flex flex-col h-full justify-between gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Status Operasional</span>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-1">AMAN</div>
              <p className="text-xs font-medium text-green-700/70">Tidak ada anomali terdeteksi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Next sections with dummy charts since there are no actual APIs yet for complex aggregates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribusi per Kecamatan (Bar Chart) */}
        <div className="bg-[#fffbf7] border border-gray-100 shadow-sm rounded-3xl p-6 lg:p-8 flex flex-col transition-shadow hover:shadow-md">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#124f97]">Distribusi per Kecamatan</h3>
            <p className="text-gray-500 text-sm mt-1">Jumlah porsi MBG berdasarkan wilayah administratif.</p>
          </div>
          <div className="flex-1 w-full h-[250px]">
            <ChartContainer config={barChartConfig} className="h-full w-full">
              {/* @ts-ignore */}
              <BarChart accessibilityLayer data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                <CartesianGrid horizontal={false} stroke="#f3f4f6" strokeDasharray="4 4" />
                <XAxis 
                  type="number"
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={10} 
                  stroke="#9ca3af" 
                  fontSize={12}
                />
                <YAxis 
                  type="category"
                  dataKey="kecamatan"
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={10} 
                  stroke="#9ca3af" 
                  fontSize={12}
                />
                <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: '#f3f4f6', opacity: 0.8 }} />
                <Bar 
                  dataKey="porsi" 
                  fill="#124f97" 
                  radius={[0, 8, 8, 0]} 
                  barSize={28}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </div>

        {/* Tren Agregat (Area Chart) */}
        <div className="bg-[#fffbf7] border border-gray-100 shadow-sm rounded-3xl p-6 lg:p-8 flex flex-col transition-shadow hover:shadow-md">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#124f97]">Tren Distribusi Nasional</h3>
            <p className="text-gray-500 text-sm mt-1">Total agregat penyaluran dari seluruh dapur minggu ini.</p>
          </div>
          <div className="flex-1 w-full h-[250px]">
            <ChartContainer config={areaChartConfig} className="h-full w-full">
              {/* @ts-ignore */}
              <AreaChart accessibilityLayer data={areaChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dbda16" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#dbda16" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#f3f4f6" strokeDasharray="4 4" />
                <XAxis 
                  dataKey="hari" 
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={10} 
                  stroke="#9ca3af" 
                  fontSize={12}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={10} 
                  stroke="#9ca3af" 
                  fontSize={12}
                />
                <ChartTooltip content={<ChartTooltipContent />} cursor={{ stroke: '#124f97', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area 
                  type="monotone"
                  dataKey="total" 
                  stroke="#124f97" 
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#fillTotal)"
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </div>
      </div>

    </div>
  );
}
