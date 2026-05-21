"use client";

import { useState } from "react";
import { approveSppg, rejectSppg } from "@/app/actions/pemerintah";
import { toast } from "sonner";
import {
  ClipboardCheck,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Building2,
  Mail,
  Calendar,
  AlertTriangle,
  Search,
  Shield,
  Radar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type SppgItem = {
  id: string;
  namaDapur: string;
  alamat: string;
  latitude: number;
  longitude: number;
  kecamatan: string;
  kabupaten: string;
  kapasitasMax: number;
  status: string;
  alasanPenolakan: string | null;
  createdAt: string;
  user: { name: string | null; email: string | null };
  distance_km?: number;
  risk_label?: string;
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  PENDING: {
    label: "Menunggu Verifikasi",
    color: "text-amber-700",
    bg: "bg-amber-50 border-amber-200",
    icon: <Clock className="w-4 h-4 text-amber-500" />,
  },
  AKTIF: {
    label: "Aktif (Disetujui)",
    color: "text-green-700",
    bg: "bg-green-50 border-green-200",
    icon: <CheckCircle2 className="w-4 h-4 text-green-500" />,
  },
  DITOLAK: {
    label: "Ditolak",
    color: "text-red-700",
    bg: "bg-red-50 border-red-200",
    icon: <XCircle className="w-4 h-4 text-red-500" />,
  },
};

const RISK_CONFIG: Record<string, { label: string; color: string; bg: string; textColor: string }> = {
  Aman: { label: "Lokasi Strategis", color: "text-green-700", bg: "bg-green-100", textColor: "text-green-800" },
  Rawan: { label: "Perlu Pertimbangan", color: "text-amber-700", bg: "bg-amber-100", textColor: "text-amber-800" },
  Bahaya: { label: "Lokasi Tidak Strategis", color: "text-red-700", bg: "bg-red-100", textColor: "text-red-800" },
};

export default function VerifikasiClient({ sppgList: initialList }: { sppgList: SppgItem[] }) {
  const [sppgList, setSppgList] = useState(initialList);
  const [loading, setLoading] = useState<string | null>(null);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("SEMUA");
  const [searchQuery, setSearchQuery] = useState("");

  const handleApprove = async (id: string) => {
    setLoading(id);
    const res = await approveSppg(id);
    if (res.success) {
      toast.success("Dapur SPPG berhasil disetujui!");
      setSppgList((prev) => prev.map((s) => (s.id === id ? { ...s, status: "AKTIF", alasanPenolakan: null } : s)));
    } else {
      toast.error(res.error || "Gagal menyetujui");
    }
    setLoading(null);
  };

  const handleReject = async () => {
    if (!rejectId || !rejectReason.trim()) {
      toast.error("Alasan penolakan wajib diisi!");
      return;
    }
    setLoading(rejectId);
    const res = await rejectSppg(rejectId, rejectReason);
    if (res.success) {
      toast.success("Dapur SPPG berhasil ditolak.");
      setSppgList((prev) =>
        prev.map((s) => (s.id === rejectId ? { ...s, status: "DITOLAK", alasanPenolakan: rejectReason } : s))
      );
      setRejectId(null);
      setRejectReason("");
    } else {
      toast.error(res.error || "Gagal menolak");
    }
    setLoading(null);
  };

  const filtered = sppgList.filter((s) => {
    const matchStatus = filterStatus === "SEMUA" || s.status === filterStatus;
    const matchSearch =
      searchQuery === "" ||
      s.namaDapur.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.kabupaten.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const pendingCount = sppgList.filter((s) => s.status === "PENDING").length;
  const aktifCount = sppgList.filter((s) => s.status === "AKTIF").length;
  const ditolakCount = sppgList.filter((s) => s.status === "DITOLAK").length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-[#124f97] flex items-center justify-center">
            <ClipboardCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Verifikasi Dapur SPPG</h1>
            <p className="text-sm text-gray-500">
              Tinjau dan kelola persetujuan pendaftaran dapur SPPG di wilayah Anda.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-700">{pendingCount}</div>
              <div className="text-xs text-amber-600 font-medium">Menunggu Verifikasi</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-700">{aktifCount}</div>
              <div className="text-xs text-green-600 font-medium">Aktif (Disetujui)</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-red-700">{ditolakCount}</div>
              <div className="text-xs text-red-600 font-medium">Ditolak</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama dapur atau kabupaten..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#fffbf7] text-sm focus:outline-none focus:ring-2 focus:ring-[#124f97]/20 focus:border-[#124f97] transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {["SEMUA", "PENDING", "AKTIF", "DITOLAK"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === status
                  ? "bg-[#124f97] text-white shadow-md"
                  : "bg-[#fffbf7] text-gray-600 hover:bg-surface-strong"
              }`}
            >
              {status === "SEMUA" ? "Semua" : STATUS_CONFIG[status]?.label || status}
            </button>
          ))}
        </div>
      </div>

      {/* SPPG List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Tidak ada data dapur SPPG yang cocok.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((sppg) => {
            const cfg = STATUS_CONFIG[sppg.status] || STATUS_CONFIG.PENDING;
            const isExpanded = expandedId === sppg.id;

            return (
              <Card
                key={sppg.id}
                className={`border transition-all duration-200 ${
                  sppg.status === "PENDING" ? "border-amber-200 shadow-sm shadow-amber-100" : "border-gray-200"
                }`}
              >
                <CardContent className="p-0">
                  {/* Main Row */}
                  <div className="flex items-center gap-4 p-4">
                    {/* Status Icon */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        sppg.status === "PENDING"
                          ? "bg-amber-100"
                          : sppg.status === "AKTIF"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {cfg.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <h3 className="font-semibold text-gray-900 truncate">{sppg.namaDapur}</h3>
                        <Badge variant="outline" className={`text-[10px] shrink-0 ${cfg.bg} ${cfg.color} border`}>
                          {cfg.label}
                        </Badge>
                        {sppg.risk_label && (() => {
                          const rc = RISK_CONFIG[sppg.risk_label] || RISK_CONFIG.Rawan;
                          return (
                            <Badge className={`text-[10px] shrink-0 ${rc.bg} ${rc.textColor} border-none gap-1`}>
                              <Shield className="w-3 h-3" />
                              {rc.label} ({sppg.distance_km} km)
                            </Badge>
                          );
                        })()}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {sppg.kabupaten}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {sppg.user.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(sppg.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      {sppg.status === "PENDING" && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white h-8 text-xs px-3"
                            onClick={() => handleApprove(sppg.id)}
                            disabled={loading === sppg.id}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            Setujui
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-8 text-xs px-3"
                            onClick={() => {
                              setRejectId(sppg.id);
                              setExpandedId(sppg.id);
                            }}
                            disabled={loading === sppg.id}
                          >
                            <XCircle className="w-3.5 h-3.5 mr-1" />
                            Tolak
                          </Button>
                        </>
                      )}
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : sppg.id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-surface-strong transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Detail */}
                  {isExpanded && (
                    <div className="border-t border-hairline px-4 py-3 bg-[#fffbf7] space-y-3">
                      {/* Analisis Risiko Lokasi */}
                      {sppg.risk_label && (() => {
                        const rc = RISK_CONFIG[sppg.risk_label] || RISK_CONFIG.Rawan;
                        return (
                          <div className={`rounded-lg p-3 border ${rc.bg} ${sppg.risk_label === 'Aman' ? 'border-green-200' : sppg.risk_label === 'Rawan' ? 'border-amber-200' : 'border-red-200'}`}>
                            <div className="flex items-center gap-2 mb-1.5">
                              <Radar className={`w-4 h-4 ${rc.color}`} />
                              <span className={`text-xs font-bold uppercase tracking-wider ${rc.color}`}>Analisis Geospasial</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div>
                                <div className={`text-lg font-bold ${rc.color}`}>{sppg.distance_km} km</div>
                                <div className="text-[10px] text-gray-500">Ke titik rekomendasi terdekat</div>
                              </div>
                              <div className="flex-1">
                                <div className={`text-sm font-semibold ${rc.textColor}`}>{rc.label}</div>
                                <div className="text-[11px] text-gray-600 leading-relaxed">
                                  {sppg.risk_label === 'Aman' && 'Lokasi berdekatan dengan area yang membutuhkan layanan SPPG. Rekomendasi: SETUJUI.'}
                                  {sppg.risk_label === 'Rawan' && 'Lokasi agak jauh dari area prioritas. Pertimbangkan kapasitas dan kebutuhan wilayah sekitar.'}
                                  {sppg.risk_label === 'Bahaya' && 'Lokasi sangat jauh dari area yang membutuhkan. Rekomendasi: TOLAK atau minta relokasi.'}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div>
                          <div className="text-gray-400 font-medium mb-0.5">Alamat</div>
                          <div className="text-gray-700">{sppg.alamat}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 font-medium mb-0.5">Kecamatan</div>
                          <div className="text-gray-700">{sppg.kecamatan}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 font-medium mb-0.5">Kapasitas Max</div>
                          <div className="text-gray-700">{sppg.kapasitasMax.toLocaleString("id-ID")} porsi/hari</div>
                        </div>
                        <div>
                          <div className="text-gray-400 font-medium mb-0.5">Koordinat</div>
                          <div className="text-gray-700 font-mono text-[11px]">
                            {sppg.latitude.toFixed(4)}, {sppg.longitude.toFixed(4)}
                          </div>
                        </div>
                      </div>

                      {/* Rejection Reason Display */}
                      {sppg.status === "DITOLAK" && sppg.alasanPenolakan && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-red-800 mb-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Alasan Penolakan:
                          </div>
                          <p className="text-sm text-red-700">{sppg.alasanPenolakan}</p>
                        </div>
                      )}

                      {/* Reject Form */}
                      {rejectId === sppg.id && sppg.status === "PENDING" && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-red-800">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Tulis alasan penolakan:
                          </div>
                          <textarea
                            placeholder="Contoh: Lokasi kurang strategis, tidak berdekatan dengan sekolah yang membutuhkan..."
                            className="w-full px-3 py-2 rounded-lg border border-red-200 bg-[#fffbf7] text-sm focus:outline-none focus:ring-2 focus:ring-red-300 resize-none"
                            rows={3}
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            disabled={loading === sppg.id}
                          />
                          <div className="flex gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs"
                              onClick={() => {
                                setRejectId(null);
                                setRejectReason("");
                              }}
                              disabled={loading === sppg.id}
                            >
                              Batal
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-7 text-xs"
                              onClick={handleReject}
                              disabled={loading === sppg.id || !rejectReason.trim()}
                            >
                              Konfirmasi Penolakan
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

