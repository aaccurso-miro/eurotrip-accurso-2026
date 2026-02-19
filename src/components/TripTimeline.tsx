"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Car, Route } from "lucide-react";
import { cities } from "@/data/cities";
import { drivingLegs } from "@/data/driving";
import { CITY_COLORS, TOTAL_DISTANCE_KM } from "@/lib/constants";
import { getTripDayInfo } from "@/lib/tripDay";

type TimelineStop = {
  cityId: string;
  label: string;
  flag: string;
  nights: number;
  isStop: boolean;
  kmToNext?: number;
  hToNext?: string;
  dateLabel: string;
};

// Map driving leg "from" display names → city id
const nameToId: Record<string, string> = {
  "Ámsterdam": "amsterdam",
  "Rothenburg ob der Tauber": "rothenburg",
  "Salzburgo": "salzburg",
  "Admont (Stift Admont)": "admont",
  "Admont": "admont",
  "Viena": "viena",
  "Praga": "praga",
  "Kassel": "kassel",
};

const legFromCity: Record<string, (typeof drivingLegs)[0]> = {};
drivingLegs.forEach((leg) => {
  const id = nameToId[leg.from];
  if (id) legFromCity[id] = leg;
});

const MONTHS_ES = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
];

function formatDate(d: Date): string {
  return `${d.getDate()} ${MONTHS_ES[d.getMonth()]}`;
}

function buildTimeline(): TimelineStop[] {
  const cursor = new Date(2026, 4, 25); // May 25
  const stops: TimelineStop[] = [];

  cities.forEach((city) => {
    const leg = legFromCity[city.id];
    const arrival = new Date(cursor);
    const isStop = city.nights === 0 && city.id !== "amsterdam";

    let dateLabel: string;
    if (city.nights > 1) {
      const dep = new Date(cursor);
      dep.setDate(dep.getDate() + city.nights);
      dateLabel = `${formatDate(arrival)} – ${formatDate(dep)}`;
    } else if (city.nights === 1) {
      const next = new Date(cursor);
      next.setDate(next.getDate() + 1);
      dateLabel = `${formatDate(arrival)} – ${formatDate(next)}`;
    } else {
      dateLabel = formatDate(arrival);
    }

    cursor.setDate(cursor.getDate() + city.nights);

    stops.push({
      cityId: city.id,
      label: city.name,
      flag: city.flag,
      nights: city.nights,
      isStop,
      kmToNext: leg?.distanceKm,
      hToNext: leg?.estimatedHours,
      dateLabel,
    });
  });

  // Synthetic return to Amsterdam (Jun 4)
  stops.push({
    cityId: "amsterdam",
    label: "Ámsterdam",
    flag: "🇳🇱",
    nights: 0,
    isStop: false,
    dateLabel: "4 jun",
  });

  return stops;
}

const timelineStops = buildTimeline();

export default function TripTimeline() {
  const [activeCityId, setActiveCityId] = useState<string | null>(null);

  useEffect(() => {
    const state = getTripDayInfo(new Date());
    if (state.phase === "during") {
      setActiveCityId(state.day.cityId);
    }
  }, []);

  return (
    <section
      id="resumen"
      className="py-20 bg-[#faf5eb] dark:bg-[#0f172a] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Route className="text-[#d4a843]" size={28} />
            <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] text-[#1e3a5f] dark:text-[#93c5fd]">
              Resumen de Ruta
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            El recorrido completo de un vistazo: 7 paradas, 4 países,{" "}
            ~{TOTAL_DISTANCE_KM} km.
          </p>
        </motion.div>

        {/* Scrollable timeline rail */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex items-center min-w-max">
            {timelineStops.map((stop, index) => {
              const isLast = index === timelineStops.length - 1;
              const isFirst = index === 0;
              const color = CITY_COLORS[stop.cityId] || "#1e3a5f";
              const isActive = stop.cityId === activeCityId && !isFirst && !isLast;

              return (
                <div key={`${stop.cityId}-${index}`} className="flex items-center">
                  {/* City node */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                    className="flex flex-col items-center w-[110px] sm:w-[130px]"
                  >
                    {/* Circle */}
                    <div className="relative mb-2 flex items-center justify-center">
                      {isActive && (
                        <motion.div
                          animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
                          className="absolute inset-0 rounded-full"
                          style={{ background: color }}
                        />
                      )}
                      <motion.div
                        animate={isActive ? { scale: [1, 1.08, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl shadow-lg border-4 border-white dark:border-gray-800 relative z-10"
                        style={{ background: color }}
                      >
                        {stop.flag}
                      </motion.div>
                    </div>

                    {/* City name */}
                    <p className="text-xs sm:text-sm font-bold text-center text-[#1e3a5f] dark:text-[#93c5fd] leading-tight px-1 mb-1.5">
                      {stop.label}
                    </p>

                    {/* Badge */}
                    {isFirst ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#1e3a5f] dark:bg-[#1e3a5f]/80 text-white font-medium mb-1">
                        Inicio
                      </span>
                    ) : isLast ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#1e3a5f] dark:bg-[#1e3a5f]/80 text-white font-medium mb-1">
                        Fin
                      </span>
                    ) : stop.isStop ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-medium mb-1">
                        Parada
                      </span>
                    ) : (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full text-white font-medium mb-1"
                        style={{ background: color }}
                      >
                        {stop.nights} noche{stop.nights !== 1 ? "s" : ""}
                      </span>
                    )}

                    {/* Date */}
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center leading-tight px-1">
                      {stop.dateLabel}
                    </p>
                  </motion.div>

                  {/* Connector */}
                  {!isLast && (
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      whileInView={{ opacity: 1, scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 + 0.1, duration: 0.4 }}
                      className="flex flex-col items-center origin-left w-[80px] sm:w-[100px] shrink-0"
                    >
                      <p className="text-xs font-semibold text-[#d4a843] mb-1 whitespace-nowrap">
                        {stop.kmToNext ? `${stop.kmToNext} km` : ""}
                      </p>
                      <div className="relative w-full flex items-center">
                        <div className="flex-1 h-0.5 bg-[#d4a843] dark:bg-[#d4a843]/60" />
                        <Car
                          size={16}
                          className="mx-1 text-[#d4a843] dark:text-[#d4a843]/80 shrink-0"
                        />
                        <div className="flex-1 h-0.5 bg-[#d4a843] dark:bg-[#d4a843]/60" />
                      </div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 whitespace-nowrap">
                        {stop.hToNext || ""}
                      </p>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Total */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2"
        >
          Total: ~{TOTAL_DISTANCE_KM} km · 11 días · 7 ciudades
        </motion.p>
      </div>
    </section>
  );
}
