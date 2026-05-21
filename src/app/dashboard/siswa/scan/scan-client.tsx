"use client";

import { useState, useRef, useTransition } from "react";
import { Camera, Upload, CheckCircle2, AlertTriangle, Loader2, History, ImageIcon, XCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { analyzeFoodImage } from "@/app/actions/scan-makanan";

type NutrisiData = {
  karbohidrat: number;
  protein: number;
  lemak: number;
  serat: number;
  vitamin: number;
};

type ScanResult = {
  id: string;
  isAman: boolean;
  analisis: string;
  layakDimakan: string;
  nutrisi: NutrisiData | null;
};

type ScanClientProps = {
  initialHistory: any[];
};

const NUTRISI_COLORS: Record<string, string> = {
  karbohidrat: "bg-amber-400",
  protein:     "bg-indigo-500",
  lemak:       "bg-rose-400",
  serat:       "bg-emerald-500",
  vitamin:     "bg-sky-400",
};

const NUTRISI_LABELS: Record<string, string> = {
  karbohidrat: "Karbohidrat",
  protein:     "Protein",
  lemak:       "Lemak",
  serat:       "Serat",
  vitamin:     "Vitamin",
};

function NutrisiBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm text-ink font-medium">{label}</span>
        <span className="text-sm font-bold text-ink">{Math.round(value)}%</span>
      </div>
      <div className="h-2 w-full bg-hairline rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );
}

function LayakBadge({ layak }: { layak: string }) {
  if (layak === "Layak") {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/30 rounded-lg">
        <CheckCircle2 className="w-5 h-5 text-success" />
        <span className="font-semibold text-success">Layak Dimakan</span>
      </div>
    );
  } else if (layak === "Tidak Layak") {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-destructive/10 border border-destructive/30 rounded-lg">
        <XCircle className="w-5 h-5 text-destructive" />
        <span className="font-semibold text-destructive">Tidak Layak Dimakan</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-warning/10 border border-warning/30 rounded-lg">
      <AlertTriangle className="w-5 h-5 text-warning" />
      <span className="font-semibold text-warning">Perlu Diperhatikan</span>
    </div>
  );
}

export default function ScanClient({ initialHistory }: ScanClientProps) {
  const [history, setHistory] = useState(initialHistory);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Silakan unggah file gambar yang valid.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran gambar terlalu besar. Maksimal 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target?.result as string);
      setResult(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = () => {
    if (!selectedImage) return;

    startTransition(async () => {
      const res = await analyzeFoodImage(selectedImage);
      if (res.success && res.data) {
        setResult(res.data as ScanResult);
        setHistory((prev) => [
          {
            id: res.data!.id,
            imageUrl: selectedImage,
            isAman: res.data!.isAman,
            analisis: res.data!.analisis,
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ]);
      } else {
        setError(res.error || "Gagal memproses gambar.");
      }
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div>
        <h2 className="text-[32px] md:text-[40px] font-normal text-ink mb-2 flex items-center gap-2 tracking-tight">
          <Camera className="h-7 w-7 text-indigo-600" />
          AI Scan Makanan
        </h2>
        <p className="text-body">
          Unggah foto makanan MBG kamu. AI kami akan menganalisis kandungan nutrisi dan memastikannya layak dikonsumsi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Scanner + Result Area */}
        <div className="lg:col-span-6 space-y-6">
          {/* Upload Card */}
          <Card className="bg-white border-hairline shadow-sm rounded-[10px] overflow-hidden">
            <CardHeader className="border-b border-hairline pb-4 bg-surface-soft">
              <CardTitle className="text-ink text-lg flex items-center gap-2 font-medium">
                <Upload className="w-5 h-5 text-indigo-600" />
                Unggah Foto Makanan
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {!selectedImage ? (
                <div
                  className="border-2 border-dashed border-hairline hover:border-indigo-400 bg-surface-soft rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <ImageIcon className="h-8 w-8 text-indigo-400" />
                  </div>
                  <h3 className="text-ink font-medium text-lg mb-1">Pilih Gambar atau Ambil Foto</h3>
                  <p className="text-body text-sm max-w-xs">Format: JPG, PNG, WEBP (Max 5MB)</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-hairline bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={selectedImage} alt="Food preview" className="w-full h-full object-contain" />
                  </div>

                  {!result && !isPending && (
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="flex-1 border-hairline"
                        onClick={() => { setSelectedImage(null); setError(null); }}
                      >
                        Batal
                      </Button>
                      <Button
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                        onClick={handleAnalyze}
                      >
                        Analisis Sekarang
                      </Button>
                    </div>
                  )}
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
              />

              {error && (
                <div className="mt-4 p-4 rounded-md bg-destructive/10 text-destructive text-sm border border-destructive/20 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              {isPending && (
                <div className="mt-6 flex flex-col items-center justify-center py-8">
                  <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                  <h3 className="text-ink font-medium">Menganalisis Makanan...</h3>
                  <p className="text-body text-sm mt-1">AI sedang memproses gambar Anda.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Result Card */}
          {result && (
            <Card className="bg-white border-hairline shadow-sm rounded-[10px] animate-in zoom-in-95 duration-300">
              <CardHeader className="border-b border-hairline bg-surface-soft pb-4">
                <CardTitle className="text-ink text-lg font-medium flex items-center gap-2">
                  <Info className="w-5 h-5 text-indigo-600" />
                  Hasil Analisis AI
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Status Layak */}
                <LayakBadge layak={result.layakDimakan} />

                {/* Analisis Teks */}
                <div>
                  <h4 className="text-sm font-semibold text-ink mb-2 uppercase tracking-wider">Analisis</h4>
                  <p className="text-body leading-relaxed text-sm">{result.analisis}</p>
                </div>

                {/* Nutrisi Bars */}
                {result.nutrisi && (
                  <div>
                    <h4 className="text-sm font-semibold text-ink mb-4 uppercase tracking-wider">Estimasi Kandungan Nutrisi</h4>
                    <div className="space-y-3">
                      {(Object.keys(result.nutrisi) as (keyof NutrisiData)[]).map((key) => (
                        <NutrisiBar
                          key={key}
                          label={NUTRISI_LABELS[key]}
                          value={result.nutrisi![key]}
                          color={NUTRISI_COLORS[key]}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-body/60 mt-3 flex items-center gap-1">
                      <Info className="w-3 h-3" /> Persentase merupakan estimasi visual dari AI, bukan nilai gizi pasti.
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-hairline">
                  <Button
                    variant="outline"
                    className="w-full border-hairline text-ink hover:bg-surface-soft"
                    onClick={() => { setSelectedImage(null); setResult(null); }}
                  >
                    Scan Gambar Lain
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* History Area */}
        <div className="lg:col-span-6">
          <Card className="bg-white border-hairline shadow-sm rounded-[10px] h-full">
            <CardHeader className="border-b border-hairline pb-4">
              <CardTitle className="text-ink text-lg flex items-center gap-2 font-medium">
                <History className="w-5 h-5 text-body" />
                Riwayat Pemindaian
              </CardTitle>
              <CardDescription className="text-body">Data analisis makanan yang pernah kamu lakukan.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 sm:pt-4">
              <div className="space-y-4">
                {history.length === 0 ? (
                  <div className="text-center py-12 text-body">Belum ada riwayat pemindaian.</div>
                ) : (
                  history.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-[8px] border border-hairline bg-surface-soft/50 hover:bg-surface-soft transition-colors">
                      <div className="w-20 h-20 shrink-0 rounded-md overflow-hidden bg-black border border-hairline">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.imageUrl} alt="Scanned food" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-1">
                          {item.isAman ? (
                            <span className="text-sm font-semibold text-success flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Layak
                            </span>
                          ) : (
                            <span className="text-sm font-semibold text-destructive flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5" /> Tidak Layak
                            </span>
                          )}
                          <span className="text-xs text-body/70">
                            {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-sm text-ink line-clamp-2 leading-relaxed">{item.analisis}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
