"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Map as MapIcon,
  Layers,
  ChevronLeft,
  ChevronRight,
  School,
  Building2,
  Sparkles,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  Loader2,
  Filter,
  Eye,
  EyeOff,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ComponentType } from "react";

// ─── Tipe Data ──────────────────────────────────────────
type SchoolPoint = {
  lng: number;
  lat: number;
  name: string;
  province: string;
  stage: string;
  dist_km: number;
  risk_label: string;
};

type SppgPoint = {
  lng: number;
  lat: number;
  nama_sppg: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
};

type RekomenPoint = {
  lng: number;
  lat: number;
  province: string;
  n_schools: number;
};

// Tipe props untuk komponen peta (harus cocok dengan peta-map.tsx)
type PetaMapProps = {
  schools: SchoolPoint[];
  sppg: SppgPoint[];
  rekomen: RekomenPoint[];
  loading: boolean;
};

// Dynamic import peta (Leaflet) — SSR: false wajib untuk react-leaflet
// @ts-expect-error -- peta-map.tsx ada di direktori yang sama, TS server kadang gagal resolve file baru
const MapView = dynamic<PetaMapProps>(() => import("./peta-map") as any, {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-surface-soft animate-pulse">
      <MapIcon className="w-10 h-10 text-body mb-4 animate-bounce" />
      <div className="text-body font-medium">Memuat Peta Geospasial...</div>
    </div>
  ),
});



type Stats = {
  totalSekolah: number;
  totalSppg: number;
  totalRekomen: number;
  riskCounts: { Bahaya: number; Waspada: number; Aman: number };
  provinces: string[];
  provinceCounts: Record<string, { total: number; bahaya: number; waspada: number; aman: number }>;
};

type LayerVisibility = {
  schools: boolean;
  sppg: boolean;
  rekomen: boolean;
};

// ─── Komponen Utama ─────────────────────────────────────
export default function PetaClient() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [schools, setSchools] = useState<SchoolPoint[]>([]);
  const [sppg, setSppg] = useState<SppgPoint[]>([]);
  const [rekomen, setRekomen] = useState<RekomenPoint[]>([]);

  const [selectedProvince, setSelectedProvince] = useState("Semua");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [layerVisibility, setLayerVisibility] = useState<LayerVisibility>({
    schools: true,
    sppg: true,
    rekomen: true,
  });

  // Ref untuk tracking apakah stats sudah di-load
  const statsLoaded = useRef(false);

  // Fetch stats (sekali saja saat mount)
  useEffect(() => {
    if (statsLoaded.current) return;
    statsLoaded.current = true;

    fetch("/api/pemerintah/geojson/stats")
      .then((r) => r.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Gagal memuat stats:", err));
  }, []);

  // Fetch data saat provinsi berubah
  const fetchData = useCallback(async (province: string) => {
    setLoading(true);
    const query = province !== "Semua" ? `?province=${encodeURIComponent(province)}` : "";

    try {
      const [schoolsRes, sppgRes, rekomenRes] = await Promise.all([
        fetch(`/api/pemerintah/geojson/schools${query}`),
        fetch(`/api/pemerintah/geojson/sppg${query}`),
        fetch(`/api/pemerintah/geojson/rekomen${query}`),
      ]);

      const [schoolsData, sppgData, rekomenData] = await Promise.all([
        schoolsRes.json(),
        sppgRes.json(),
        rekomenRes.json(),
      ]);

      setSchools(schoolsData);
      setSppg(sppgData);
      setRekomen(rekomenData);
    } catch (err) {
      console.error("Gagal memuat data peta:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(selectedProvince);
  }, [selectedProvince, fetchData]);

  const toggleLayer = (layer: keyof LayerVisibility) => {
    setLayerVisibility((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  // Hitung stats untuk provinsi terpilih
  const currentStats =
    selectedProvince === "Semua"
      ? {
          sekolah: stats?.totalSekolah ?? 0,
          bahaya: stats?.riskCounts?.Bahaya ?? 0,
          waspada: stats?.riskCounts?.Waspada ?? 0,
          aman: stats?.riskCounts?.Aman ?? 0,
          sppg: stats?.totalSppg ?? 0,
          rekomen: stats?.totalRekomen ?? 0,
        }
      : {
          sekolah: stats?.provinceCounts?.[selectedProvince]?.total ?? schools.length,
          bahaya: stats?.provinceCounts?.[selectedProvince]?.bahaya ?? 0,
          waspada: stats?.provinceCounts?.[selectedProvince]?.waspada ?? 0,
          aman: stats?.provinceCounts?.[selectedProvince]?.aman ?? 0,
          sppg: sppg.length,
          rekomen: rekomen.length,
        };

  return (
    <div className="flex h-[calc(100vh-8rem)] animate-in fade-in duration-300 relative">
      {/* ── SIDEBAR PANEL ──────────────────────────── */}
      <div
        className={`
          absolute top-0 left-0 z-[1000] h-full
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? "w-[340px]" : "w-0"}
          overflow-hidden
        `}
      >
        <div className="w-[340px] h-full bg-white/95 backdrop-blur-xl border-r border-hairline shadow-xl flex flex-col">
          {/* Sidebar Header */}
          <div className="px-5 py-4 border-b border-hairline bg-white shrink-0">
            <div className="flex items-center gap-2 mb-1">
              <MapIcon className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-ink">Peta Geospasial</h2>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Visualisasi 213K+ sekolah, dapur SPPG, dan rekomendasi lokasi baru.
            </p>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {/* Filter Provinsi */}
            <div>
              <label className="text-xs font-medium text-body uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Filter className="w-3.5 h-3.5" />
                Filter Provinsi
              </label>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-hairline bg-surface-soft text-sm text-ink 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500
                           transition-all cursor-pointer"
              >
                <option value="Semua">Semua Provinsi (Nasional)</option>
                {stats?.provinces?.map((prov) => (
                  <option key={prov} value={prov}>
                    {prov}
                  </option>
                ))}
              </select>
            </div>

            {/* Loading indicator */}
            {loading && (
              <div className="flex items-center gap-2 text-sm text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg">
                <Loader2 className="w-4 h-4 animate-spin" />
                Memuat data peta...
              </div>
            )}

            {/* Statistik Ringkas */}
            <div>
              <div className="text-xs font-medium text-body uppercase tracking-wider mb-2">Statistik</div>
              <div className="grid grid-cols-2 gap-2">
                <StatCard
                  icon={<School className="w-4 h-4 text-indigo-600" />}
                  label="Total Sekolah"
                  value={currentStats.sekolah.toLocaleString("id-ID")}
                />
                <StatCard
                  icon={<Building2 className="w-4 h-4 text-blue-600" />}
                  label="Dapur SPPG"
                  value={currentStats.sppg.toLocaleString("id-ID")}
                />
                <StatCard
                  icon={<Sparkles className="w-4 h-4 text-purple-600" />}
                  label="Rekomendasi"
                  value={currentStats.rekomen.toLocaleString("id-ID")}
                />
                <StatCard
                  icon={<AlertTriangle className="w-4 h-4 text-red-500" />}
                  label="Sekolah Bahaya"
                  value={currentStats.bahaya.toLocaleString("id-ID")}
                  highlight="red"
                />
              </div>
            </div>

            {/* Breakdown Risiko */}
            <div>
              <div className="text-xs font-medium text-body uppercase tracking-wider mb-2">Distribusi Risiko</div>
              <div className="space-y-2">
                <RiskBar label="Bahaya" count={currentStats.bahaya} total={currentStats.sekolah} color="bg-red-500" />
                <RiskBar label="Waspada" count={currentStats.waspada} total={currentStats.sekolah} color="bg-amber-500" />
                <RiskBar label="Aman" count={currentStats.aman} total={currentStats.sekolah} color="bg-emerald-500" />
              </div>
            </div>

            {/* Layer Toggle */}
            <div>
              <div className="text-xs font-medium text-body uppercase tracking-wider mb-2">Layer Peta</div>
              <div className="space-y-1.5">
                <LayerToggle
                  active={layerVisibility.schools}
                  onClick={() => toggleLayer("schools")}
                  icon={<School className="w-4 h-4" />}
                  label="Sekolah"
                  sublabel={`${schools.length.toLocaleString("id-ID")} titik`}
                  colors={["bg-red-500", "bg-amber-500", "bg-emerald-500"]}
                />
                <LayerToggle
                  active={layerVisibility.sppg}
                  onClick={() => toggleLayer("sppg")}
                  icon={<Building2 className="w-4 h-4" />}
                  label="Dapur SPPG"
                  sublabel={`${sppg.length.toLocaleString("id-ID")} titik`}
                  colors={["bg-blue-500"]}
                />
                <LayerToggle
                  active={layerVisibility.rekomen}
                  onClick={() => toggleLayer("rekomen")}
                  icon={<Sparkles className="w-4 h-4" />}
                  label="Rekomendasi Baru"
                  sublabel={`${rekomen.length.toLocaleString("id-ID")} titik`}
                  colors={["bg-purple-500"]}
                />
              </div>
            </div>

            {/* Legenda */}
            <Card className="bg-surface-soft border-hairline rounded-lg">
              <CardContent className="p-3 flex gap-2.5 items-start">
                <Info className="w-4 h-4 text-muted shrink-0 mt-0.5" />
                <div className="text-xs text-body leading-relaxed">
                  <strong className="text-ink block mb-1">Tips Navigasi</strong>
                  Scroll untuk zoom. Klik marker untuk detail. Gunakan toggle di atas untuk menampilkan/menyembunyikan layer.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* ── TOMBOL TOGGLE SIDEBAR ─────────────────── */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`
          absolute z-[1001] top-4 
          ${sidebarOpen ? "left-[348px]" : "left-4"}
          transition-all duration-300 ease-in-out
          w-8 h-8 rounded-lg bg-white border border-hairline shadow-lg
          flex items-center justify-center
          hover:bg-surface-soft
        `}
        aria-label={sidebarOpen ? "Tutup sidebar" : "Buka sidebar"}
      >
        {sidebarOpen ? (
          <ChevronLeft className="w-4 h-4 text-ink" />
        ) : (
          <ChevronRight className="w-4 h-4 text-ink" />
        )}
      </button>

      {/* ── PETA UTAMA ────────────────────────────── */}
      <div className="flex-1 h-full relative">
        <MapView
          schools={layerVisibility.schools ? schools : []}
          sppg={layerVisibility.sppg ? sppg : []}
          rekomen={layerVisibility.rekomen ? rekomen : []}
          loading={loading}
        />

        {/* Badge jumlah titik di pojok kanan bawah */}
        {!loading && (
          <div className="absolute bottom-4 right-4 z-10 flex gap-2">
            {layerVisibility.schools && (
              <Badge className="bg-white/90 backdrop-blur-sm text-ink border border-hairline shadow-md text-xs px-2.5 py-1 hover:bg-white">
                <School className="w-3 h-3 mr-1.5 text-indigo-600" />
                {schools.length.toLocaleString("id-ID")} sekolah
              </Badge>
            )}
            {layerVisibility.sppg && (
              <Badge className="bg-white/90 backdrop-blur-sm text-ink border border-hairline shadow-md text-xs px-2.5 py-1 hover:bg-white">
                <Building2 className="w-3 h-3 mr-1.5 text-blue-600" />
                {sppg.length.toLocaleString("id-ID")} SPPG
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sub-Komponen ────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: "red" | "green";
}) {
  return (
    <div
      className={`
        p-3 rounded-lg border border-hairline bg-white
        ${highlight === "red" ? "ring-1 ring-red-200 bg-red-50/50" : ""}
      `}
    >
      <div className="flex items-center gap-1.5 mb-1">{icon}</div>
      <div className="text-lg font-semibold text-ink leading-tight">{value}</div>
      <div className="text-[11px] text-muted">{label}</div>
    </div>
  );
}

function RiskBar({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="w-16 text-xs text-body font-medium">{label}</div>
      <div className="flex-1 h-2 bg-surface-soft rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="w-16 text-xs text-right text-muted tabular-nums">
        {pct.toFixed(1)}%
      </div>
    </div>
  );
}

function LayerToggle({
  active,
  onClick,
  icon,
  label,
  sublabel,
  colors,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  colors: string[];
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all
        ${active 
          ? "bg-white border border-hairline shadow-sm" 
          : "bg-surface-soft/50 border border-transparent opacity-60 hover:opacity-80"
        }
      `}
    >
      <div className="shrink-0 text-ink">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-ink">{label}</div>
        <div className="text-[11px] text-muted">{sublabel}</div>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        {colors.map((c, i) => (
          <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
        ))}
        {active ? (
          <Eye className="w-3.5 h-3.5 text-indigo-600 ml-1" />
        ) : (
          <EyeOff className="w-3.5 h-3.5 text-muted ml-1" />
        )}
      </div>
    </button>
  );
}
