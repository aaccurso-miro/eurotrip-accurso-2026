"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { cities } from "@/data/cities";
import { CITY_COLORS } from "@/lib/constants";

const ROUTE_CITY_IDS = [
  "amsterdam",
  "rothenburg",
  "salzburg",
  "admont",
  "viena",
  "praga",
  "kassel",
  "amsterdam",
];

export default function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
      zoomControl: true,
    });

    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    // Add markers
    const markers: L.LatLng[] = [];
    const routeOrder = ["amsterdam", "rothenburg", "salzburg", "admont", "viena", "praga", "kassel"];

    routeOrder.forEach((cityId, index) => {
      const city = cities.find((c) => c.id === cityId);
      if (!city) return;

      const color = CITY_COLORS[cityId] || "#1e3a5f";
      const latLng = L.latLng(city.coords[0], city.coords[1]);
      markers.push(latLng);

      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div style="
          background: ${color};
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          font-family: system-ui;
        ">${index + 1}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -20],
      });

      const nightsText = city.nights > 0
        ? `${city.nights} noche${city.nights > 1 ? "s" : ""}`
        : city.id === "amsterdam"
        ? "Inicio y fin"
        : "Parada";

      L.marker(latLng, { icon })
        .addTo(map)
        .bindPopup(
          `<div style="text-align:center;font-family:system-ui;min-width:120px;">
            <strong style="font-size:14px;">${city.flag} ${city.name}</strong><br/>
            <span style="color:#666;font-size:12px;">${city.country}</span><br/>
            <span style="background:${color};color:white;padding:2px 8px;border-radius:10px;font-size:11px;display:inline-block;margin-top:4px;">
              ${nightsText}
            </span>
          </div>`
        );
    });

    // Draw route polyline
    const routeCoords = ROUTE_CITY_IDS.map((id) => {
      const city = cities.find((c) => c.id === id)!;
      return L.latLng(city.coords[0], city.coords[1]);
    });

    L.polyline(routeCoords, {
      color: "#1e3a5f",
      weight: 3,
      opacity: 0.7,
      dashArray: "10, 8",
      smoothFactor: 1,
    }).addTo(map);

    // Fit bounds
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers);
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-2xl"
      style={{ minHeight: "400px" }}
    />
  );
}
