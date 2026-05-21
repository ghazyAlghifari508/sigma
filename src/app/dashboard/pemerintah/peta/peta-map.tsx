"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

type PetaMapProps = {
  schools: SchoolPoint[];
  sppg: SppgPoint[];
  rekomen: RekomenPoint[];
  loading: boolean;
};

// ─── Warna risiko ───────────────────────────────────────
const RISK_COLORS: Record<string, string> = {
  Bahaya: "#ef4444",
  Waspada: "#f59e0b",
  Aman: "#22c55e",
};

const SPPG_COLOR = "#3b82f6";
const REKOMEN_COLOR = "#a855f7";

export default function PetaMap({ schools, sppg, rekomen, loading }: PetaMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const schoolLayerRef = useRef<L.LayerGroup | null>(null);
  const sppgLayerRef = useRef<L.LayerGroup | null>(null);
  const rekomenLayerRef = useRef<L.LayerGroup | null>(null);
  const canvasRendererRef = useRef<L.Canvas | null>(null);

  // Inisialisasi peta (sekali)
  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    const canvas = L.canvas({ padding: 0.5 });
    canvasRendererRef.current = canvas;

    const map = L.map(mapContainerRef.current, {
      center: [-2.5, 118],
      zoom: 5,
      zoomControl: false,
      preferCanvas: true,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: "topright" }).addTo(map);

    // Buat layer group kosong — urutan penting: yang terakhir = paling atas
    rekomenLayerRef.current = L.layerGroup().addTo(map);
    sppgLayerRef.current = L.layerGroup().addTo(map);
    schoolLayerRef.current = L.layerGroup().addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update layer sekolah
  useEffect(() => {
    const layer = schoolLayerRef.current;
    const renderer = canvasRendererRef.current;
    if (!layer || !renderer) return;

    layer.clearLayers();

    for (let i = 0; i < schools.length; i++) {
      const s = schools[i];
      const color = RISK_COLORS[s.risk_label] || "#6b7280";

      const marker = L.circleMarker([s.lat, s.lng], {
        renderer,
        radius: 3,
        fillColor: color,
        fillOpacity: 0.7,
        color: color,
        weight: 0.5,
        opacity: 0.9,
      });

      marker.bindPopup(() => {
        const riskBadge =
          s.risk_label === "Bahaya"
            ? '<span style="background:#fef2f2;color:#dc2626;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;">⚠ Bahaya</span>'
            : s.risk_label === "Waspada"
              ? '<span style="background:#fffbeb;color:#d97706;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;">⚡ Waspada</span>'
              : '<span style="background:#f0fdf4;color:#16a34a;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;">✓ Aman</span>';

        return `
          <div style="font-family:system-ui;min-width:200px;">
            <div style="font-weight:700;font-size:13px;margin-bottom:6px;color:#181d26;">${s.name}</div>
            <div style="margin-bottom:8px;">${riskBadge}</div>
            <table style="font-size:12px;color:#41454d;width:100%;border-collapse:collapse;">
              <tr><td style="padding:2px 0;">Provinsi</td><td style="text-align:right;font-weight:500;color:#181d26;">${s.province}</td></tr>
              <tr><td style="padding:2px 0;">Jenjang</td><td style="text-align:right;font-weight:500;color:#181d26;">${s.stage}</td></tr>
              <tr><td style="padding:2px 0;">Jarak ke SPPG</td><td style="text-align:right;font-weight:500;color:#181d26;">${s.dist_km.toFixed(1)} km</td></tr>
            </table>
          </div>
        `;
      }, { maxWidth: 280 });

      marker.addTo(layer);
    }
  }, [schools]);

  // Update layer SPPG
  useEffect(() => {
    const layer = sppgLayerRef.current;
    const renderer = canvasRendererRef.current;
    if (!layer || !renderer) return;

    layer.clearLayers();

    for (let i = 0; i < sppg.length; i++) {
      const s = sppg[i];

      // Marker kotak (square) — pakai circleMarker dengan style tebal
      const marker = L.circleMarker([s.lat, s.lng], {
        renderer,
        radius: 4,
        fillColor: SPPG_COLOR,
        fillOpacity: 0.8,
        color: "#1e40af",
        weight: 1.5,
        opacity: 1,
      });

      marker.bindPopup(() => {
        return `
          <div style="font-family:system-ui;min-width:200px;">
            <div style="font-weight:700;font-size:13px;margin-bottom:4px;color:#181d26;">🏭 Dapur SPPG</div>
            <div style="font-size:11px;color:#41454d;margin-bottom:8px;line-height:1.4;">${s.nama_sppg}</div>
            <table style="font-size:12px;color:#41454d;width:100%;border-collapse:collapse;">
              <tr><td style="padding:2px 0;">Provinsi</td><td style="text-align:right;font-weight:500;color:#181d26;">${s.provinsi}</td></tr>
              <tr><td style="padding:2px 0;">Kabupaten</td><td style="text-align:right;font-weight:500;color:#181d26;">${s.kabupaten}</td></tr>
              <tr><td style="padding:2px 0;">Kecamatan</td><td style="text-align:right;font-weight:500;color:#181d26;">${s.kecamatan}</td></tr>
            </table>
          </div>
        `;
      }, { maxWidth: 300 });

      marker.addTo(layer);
    }
  }, [sppg]);

  // Update layer rekomendasi
  useEffect(() => {
    const layer = rekomenLayerRef.current;
    const renderer = canvasRendererRef.current;
    if (!layer || !renderer) return;

    layer.clearLayers();

    for (let i = 0; i < rekomen.length; i++) {
      const r = rekomen[i];

      const marker = L.circleMarker([r.lat, r.lng], {
        renderer,
        radius: 5,
        fillColor: REKOMEN_COLOR,
        fillOpacity: 0.6,
        color: "#7c3aed",
        weight: 1.5,
        opacity: 0.9,
      });

      marker.bindPopup(() => {
        return `
          <div style="font-family:system-ui;min-width:180px;">
            <div style="font-weight:700;font-size:13px;margin-bottom:4px;color:#181d26;">💎 Rekomendasi SPPG Baru</div>
            <table style="font-size:12px;color:#41454d;width:100%;border-collapse:collapse;">
              <tr><td style="padding:2px 0;">Provinsi</td><td style="text-align:right;font-weight:500;color:#181d26;">${r.province}</td></tr>
              <tr><td style="padding:2px 0;">Sekolah Tercakup</td><td style="text-align:right;font-weight:500;color:#181d26;">${r.n_schools} sekolah</td></tr>
            </table>
          </div>
        `;
      }, { maxWidth: 260 });

      marker.addTo(layer);
    }
  }, [rekomen]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Overlay loading */}
      {loading && (
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center z-10 pointer-events-none">
          <div className="bg-white rounded-xl px-6 py-4 shadow-lg border border-hairline flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-ink font-medium">Memuat titik data...</span>
          </div>
        </div>
      )}

      {/* Leaflet style overrides */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .leaflet-container {
            background-color: #f8fafc !important;
            font-family: inherit;
          }
          .leaflet-popup-content-wrapper {
            background-color: #ffffff;
            color: #181d26;
            border: 1px solid #dddddd;
            border-radius: 10px;
            box-shadow: 0 8px 25px -5px rgba(0,0,0,0.1), 0 4px 10px -6px rgba(0,0,0,0.08);
            padding: 0;
          }
          .leaflet-popup-content {
            margin: 12px 14px;
            line-height: 1.5;
          }
          .leaflet-popup-tip {
            background-color: #ffffff;
            border-right: 1px solid #dddddd;
            border-bottom: 1px solid #dddddd;
          }
          .leaflet-bar a {
            background-color: #ffffff !important;
            color: #181d26 !important;
            border-color: #dddddd !important;
            width: 34px;
            height: 34px;
            line-height: 34px;
            font-size: 16px;
          }
          .leaflet-bar a:hover {
            background-color: #f8fafc !important;
          }
          .leaflet-bar {
            border-radius: 10px !important;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .leaflet-control-attribution {
            background-color: rgba(255,255,255,0.85) !important;
            backdrop-filter: blur(4px);
            font-size: 10px;
          }
        `,
      }} />
    </div>
  );
}
