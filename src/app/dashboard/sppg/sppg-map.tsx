"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function SppgMap({ sppg, sekolah }: { sppg: any, sekolah: any[] }) {
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

    // Marker Sekolah
    const bounds = L.latLngBounds([[sppg.latitude, sppg.longitude]]);
    
    sekolah.forEach((s) => {
      const lat = s.latitude || s.lat; // menyesuaikan field name dari db/api
      const lng = s.longitude || s.lng;
      if (!lat || !lng) return;
      
      bounds.extend([lat, lng]);
      
      L.circleMarker([lat, lng], {
        radius: 6,
        fillColor: "#124f97",
        fillOpacity: 0.8,
        color: "#ffffff",
        weight: 1.5,
      }).bindPopup(`<b>${s.nama || s.name}</b><br>Sekolah Dilayani`).addTo(map);
    });

    if (sekolah.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [sppg, sekolah]);

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
