"use client";

import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup, ZoomControl } from "react-leaflet";

// Helper to create HTML string for icons
const createIconHtml = (type: 'dapur-aman' | 'dapur-rawan' | 'sekolah') => {
  let color = "bg-blue-500";
  let iconSvg = "";

  if (type === 'dapur-aman') {
    color = "bg-emerald-500 shadow-emerald-500/50 shadow-lg";
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`;
  } else if (type === 'dapur-rawan') {
    color = "bg-red-500 shadow-red-500/50 shadow-lg animate-pulse";
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`;
  } else {
    color = "bg-blue-500 shadow-blue-500/30 shadow-md";
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M14 22v-4a2 2 0 1 0-4 0v4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M18 5v17"/><path d="m4 6 8-4 8 4"/><path d="M6 5v17"/><circle cx="12" cy="9" r="2"/></svg>`;
  }

  return `
    <div class="relative flex items-center justify-center w-8 h-8 rounded-full ${color} border-2 border-white">
      ${iconSvg}
      <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 ${color.split(' ')[0]} rotate-45 border-r-2 border-b-2 border-white"></div>
    </div>
  `;
};

const dapurAmanIcon = L.divIcon({
  html: createIconHtml('dapur-aman'),
  className: 'custom-leaflet-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 36],
  popupAnchor: [0, -36],
});

const dapurRawanIcon = L.divIcon({
  html: createIconHtml('dapur-rawan'),
  className: 'custom-leaflet-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 36],
  popupAnchor: [0, -36],
});

const sekolahIcon = L.divIcon({
  html: createIconHtml('sekolah'),
  className: 'custom-leaflet-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 36],
  popupAnchor: [0, -36],
});

type MapClientProps = {
  dapurs?: any[];
  sekolahs?: any[];
};

export default function MapClient({ dapurs = [], sekolahs = [] }: MapClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Fix leaflet default icon issue completely
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-surface-soft rounded-xl border border-hairline animate-pulse">
        <div className="text-body font-medium">Memuat Peta Geospasial...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-hairline shadow-sm relative z-0">
      <MapContainer 
        center={[-6.995, 107.610]} // Pusat Kab Bandung (Kira-kira)
        zoom={12} 
        scrollWheelZoom={true}
        className="w-full h-full"
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        {/* Light Mode Map Layer via CartoDB */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        <LayersControl position="topright">
          {/* Layer Dapur Sentral */}
          <LayersControl.Overlay checked name="Dapur Sentral (SPPG)">
            <LayerGroup>
              {dapurs.map(dapur => (
                <Marker 
                  key={dapur.id} 
                  position={[dapur.latitude, dapur.longitude]}
                  icon={dapur.tingkatRisiko === 'AMAN' ? dapurAmanIcon : dapurRawanIcon}
                >
                  <Popup className="custom-popup">
                    <div className="p-1">
                      <div className="font-bold text-sm mb-1">{dapur.namaDapur}</div>
                      <div className="text-xs mb-2 text-zinc-500">{dapur.id}</div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Kapasitas:</span>
                        <span className="font-medium">{dapur.kapasitasMax} porsi</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Status:</span>
                        <span className={`font-bold ${dapur.status === 'AKTIF' ? 'text-emerald-500' : 'text-red-500'}`}>
                          {dapur.status}
                        </span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>

          {/* Layer Sekolah */}
          <LayersControl.Overlay checked name="Sekolah Dilayani">
            <LayerGroup>
              {sekolahs.map(sekolah => (
                <Marker 
                  key={sekolah.id} 
                  position={[sekolah.latitude, sekolah.longitude]}
                  icon={sekolahIcon}
                >
                  <Popup className="custom-popup">
                    <div className="p-1">
                      <div className="font-bold text-sm mb-1">{sekolah.nama}</div>
                      <div className="text-xs mb-2 text-zinc-500">{sekolah.id}</div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Siswa:</span>
                        <span className="font-medium">{sekolah.jumlahSiswa} anak</span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>

      {/* Global styles for Leaflet overrides inside this container */}
      <style dangerouslySetInnerHTML={{__html: `
        .leaflet-container {
          background-color: #09090b !important;
          font-family: inherit;
        }
        .custom-leaflet-icon {
          background: none;
          border: none;
        }
        .leaflet-popup-content-wrapper {
          background-color: #18181b;
          color: #f4f4f5;
          border: 1px solid #27272a;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.5);
        }
        .leaflet-popup-tip {
          background-color: #18181b;
          border-top: 1px solid #27272a;
          border-left: 1px solid #27272a;
        }
        .leaflet-control-layers {
          background-color: #18181b !important;
          color: #f4f4f5 !important;
          border: 1px solid #27272a !important;
          border-radius: 0.5rem !important;
        }
        .leaflet-control-layers-toggle {
          background-color: #18181b;
          border-radius: 0.5rem;
        }
        .leaflet-bar a {
          background-color: #18181b !important;
          color: #f4f4f5 !important;
          border-color: #27272a !important;
        }
        .leaflet-bar a:hover {
          background-color: #27272a !important;
        }
      `}} />
    </div>
  );
}
