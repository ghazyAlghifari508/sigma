"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function SppgMap({ sppg, sekolahSasaran, sekolahTersedia }: { sppg: any, sekolahSasaran: any[], sekolahTersedia: any[] }) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current || !sppg) return;

    const map = L.map(mapContainerRef.current, {
      center: [sppg.latitude, sppg.longitude],
      zoom: 12,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Marker SPPG
    const sppgMarker = L.circleMarker([sppg.latitude, sppg.longitude], {
      radius: 8,
      fillColor: "#3b82f6",
      fillOpacity: 0.9,
      color: "#1e40af",
      weight: 2,
    }).bindPopup(`<b>${sppg.namaDapur}</b><br>Dapur Anda`).addTo(map);

    // Marker Sekolah Tersedia (belum dilayani)
    const bounds = L.latLngBounds([[sppg.latitude, sppg.longitude]]);
    
    sekolahTersedia?.forEach((s) => {
      const lat = s.latitude || s.lat; 
      const lng = s.longitude || s.lng;
      if (!lat || !lng) return;
      
      bounds.extend([lat, lng]);
      
      // Jika sekolah ini sudah ada di sekolahSasaran, lewati agar tidak dobel
      if (sekolahSasaran?.some(ss => ss.id === s.id)) return;

      L.circleMarker([lat, lng], {
        radius: 5,
        fillColor: "#9ca3af", // Abu-abu
        fillOpacity: 0.6,
        color: "#ffffff",
        weight: 1,
      }).bindPopup(`<b>${s.nama || s.name}</b><br>Tersedia (${s.jarakKm} km)<br>Belum Dilayani`).addTo(map);
    });

    // Marker Sekolah Dilayani (Sasaran)
    sekolahSasaran?.forEach((s) => {
      const lat = s.latitude || s.lat;
      const lng = s.longitude || s.lng;
      if (!lat || !lng) return;
      
      bounds.extend([lat, lng]);
      
      L.circleMarker([lat, lng], {
        radius: 6,
        fillColor: "#124f97", // Biru SIGMA
        fillOpacity: 0.9,
        color: "#ffffff",
        weight: 1.5,
      }).bindPopup(`<b>${s.nama || s.name}</b><br>✅ Sekolah Dilayani`).addTo(map);
    });

    if (sekolahTersedia?.length > 0 || sekolahSasaran?.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [sppg, sekolahSasaran, sekolahTersedia]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainerRef} className="w-full h-full z-0" />
      <style dangerouslySetInnerHTML={{
        __html: `
          .leaflet-container { background-color: #f8fafc !important; }
        `,
      }} />
    </div>
  );
}
