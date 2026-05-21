"use client";

import { LineChart as LineChartIcon, Download, Filter } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const trendData = [
  { minggu: "Minggu 1", porsi: 85000, target: 88000 },
  { minggu: "Minggu 2", porsi: 89000, target: 88000 },
  { minggu: "Minggu 3", porsi: 92000, target: 90000 },
  { minggu: "Minggu 4", porsi: 94500, target: 92000 },
];

const rasioKandunganData = [
  { wilayah: "Bojongsoang", karbo: 45, protein: 35, serat: 20 },
  { wilayah: "Dayeuhkolot", karbo: 50, protein: 30, serat: 20 },
  { wilayah: "Baleendah", karbo: 40, protein: 40, serat: 20 },
];

const tableDetailData = [
  { kecamatan: "Bojongsoang", totalPorsi: "14,500", dapurAktif: 2, rasioKeterlambatan: "1.2%", statusGizi: "Sesuai Standar" },
  { kecamatan: "Dayeuhkolot", totalPorsi: "12,200", dapurAktif: 2, rasioKeterlambatan: "3.5%", statusGizi: "Sesuai Standar" },
  { kecamatan: "Baleendah", totalPorsi: "18,400", dapurAktif: 3, rasioKeterlambatan: "0.8%", statusGizi: "Sangat Baik" },
  { kecamatan: "Ciparay", totalPorsi: "8,100", dapurAktif: 1, rasioKeterlambatan: "8.4%", statusGizi: "Batas Bawah" },
  { kecamatan: "Banjaran", totalPorsi: "11,000", dapurAktif: 1, rasioKeterlambatan: "6.2%", statusGizi: "Sesuai Standar" },
];

const trendConfig = {
  porsi: {
    label: "Realisasi Porsi",
    color: "#6366f1",
  },
  target: {
    label: "Target Minimum",
    color: "#a1a1aa",
  }
};

const rasioConfig = {
  karbo: { label: "Karbohidrat (%)", color: "#eab308" }, // yellow
  protein: { label: "Protein (%)", color: "#f43f5e" }, // rose
  serat: { label: "Serat/Vitamin (%)", color: "#10b981" }, // emerald
};

export default function AnalitikPemerintahPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-[32px] font-normal text-ink tracking-tight flex items-center gap-2">
            <LineChartIcon className="h-7 w-7 text-ink" />
            Analitik Lanjutan
          </h2>
          <p className="text-body mt-1">
            Laporan mendalam terkait efektivitas distribusi dan kualitas gizi.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="airtable-secondary" className="h-10 py-2 px-4 rounded-[8px] text-[14px]">
            <Filter className="w-4 h-4 mr-2" />
            Filter Area
          </Button>
          <Button variant="airtable-primary" className="h-10 py-2 px-4 rounded-[8px] text-[14px]">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Tren Pencapaian Target */}
        <Card className="bg-white border-hairline shadow-sm rounded-[10px]">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-ink">Tren Distribusi Bulanan</CardTitle>
            <CardDescription className="text-body">Komparasi realisasi penyaluran MBG terhadap target minimum pemerintah.</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <ChartContainer config={trendConfig} className="h-[300px] w-full">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillPorsi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1b61c9" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#1b61c9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e2e6" />
                <XAxis dataKey="minggu" tickLine={false} axisLine={false} tickMargin={10} stroke="#9297a0" fontSize={12} />
                <YAxis tickLine={false} axisLine={false} tickMargin={10} stroke="#9297a0" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} cursor={{ stroke: '#1b61c9', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area type="monotone" dataKey="target" stroke="#9297a0" strokeDasharray="5 5" fill="none" strokeWidth={2} />
                <Area type="monotone" dataKey="porsi" stroke="#1b61c9" fillOpacity={1} fill="url(#fillPorsi)" strokeWidth={3} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Chart 2: Komposisi Gizi */}
        <Card className="bg-white border-hairline shadow-sm rounded-[10px]">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-ink">Rata-rata Komposisi Gizi</CardTitle>
            <CardDescription className="text-body">Proporsi kandungan gizi makanan per wilayah (Sample Data).</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <ChartContainer config={rasioConfig} className="h-[300px] w-full">
              <BarChart data={rasioKandunganData} layout="vertical" margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid horizontal={false} stroke="#e0e2e6" strokeDasharray="3 3" />
                <XAxis type="number" tickLine={false} axisLine={false} tickMargin={10} stroke="#9297a0" fontSize={12} hide />
                <YAxis dataKey="wilayah" type="category" tickLine={false} axisLine={false} tickMargin={10} stroke="#9297a0" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: '#e0e2e6', opacity: 0.4 }} />
                <Bar dataKey="karbo" stackId="a" fill="#d97706" radius={[0, 0, 0, 0]} />
                <Bar dataKey="protein" stackId="a" fill="#e11d48" radius={[0, 0, 0, 0]} />
                <Bar dataKey="serat" stackId="a" fill="#059669" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabel Detail Metrik Wilayah */}
      <Card className="bg-white border-hairline shadow-sm rounded-[10px]">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-ink">Laporan Rinci Per Kecamatan</CardTitle>
          <CardDescription className="text-body">
            Metrik operasional dan kualitas per area pengawasan.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          <div className="border border-hairline rounded-md overflow-hidden bg-white">
            <Table>
              <TableHeader className="bg-surface-soft">
                <TableRow className="border-hairline hover:bg-transparent">
                  <TableHead className="text-ink font-medium pl-4">Kecamatan</TableHead>
                  <TableHead className="text-ink font-medium text-right">Dapur Aktif</TableHead>
                  <TableHead className="text-ink font-medium text-right">Porsi Mingguan</TableHead>
                  <TableHead className="text-ink font-medium text-right">Tingkat Keterlambatan</TableHead>
                  <TableHead className="text-ink font-medium text-right pr-4">Evaluasi Gizi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableDetailData.map((row) => (
                  <TableRow key={row.kecamatan} className="border-hairline hover:bg-surface-soft/50">
                    <TableCell className="pl-4 font-medium text-ink">{row.kecamatan}</TableCell>
                    <TableCell className="text-right text-body">{row.dapurAktif}</TableCell>
                    <TableCell className="text-right text-body font-mono">{row.totalPorsi}</TableCell>
                    <TableCell className="text-right">
                      <span className={`text-sm ${parseFloat(row.rasioKeterlambatan) > 5 ? 'text-destructive font-bold' : 'text-success'}`}>
                        {row.rasioKeterlambatan}
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      {row.statusGizi === "Sangat Baik" && <Badge variant="secondary" className="bg-surface-soft text-ink hover:bg-surface-soft">Sangat Baik</Badge>}
                      {row.statusGizi === "Sesuai Standar" && <Badge variant="outline" className="border-hairline text-ink">Sesuai Standar</Badge>}
                      {row.statusGizi === "Batas Bawah" && <Badge variant="outline" className="border-hairline text-warning">Batas Bawah</Badge>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
