"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Car,
  Bed,
  Sun,
  Sunset,
  Moon,
  Coffee,
  ChevronDown,
  Trophy,
  MapPin,
} from "lucide-react";
import { getTripDayInfo } from "@/lib/tripDay";
import { CITY_COLORS, TOTAL_DAYS, TOTAL_DISTANCE_KM } from "@/lib/constants";
import type { DayData, Activity } from "@/data/itinerary";

function ActivitySummary({
  icon,
  label,
  activities,
}: {
  icon: React.ReactNode;
  label: string;
  activities: Activity[];
}) {
  if (activities.length === 0) return null;
  return (
    <div className="flex items-start gap-2">
      <span className="text-[#d4a843] shrink-0 mt-0.5">{icon}</span>
      <div>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {label}
        </span>
        <p className="text-sm text-gray-700">
          {activities.map((a) => a.title).join(" · ")}
        </p>
      </div>
    </div>
  );
}

function TodayCard({ day }: { day: DayData }) {
  const color = CITY_COLORS[day.cityId] || "#1e3a5f";
  const hasDriving = day.from !== day.to;

  return (
    <motion.section
      id="hoy"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-12 bg-gradient-to-b from-white to-[#faf5eb]"
    >
      <div className="max-w-3xl mx-auto px-4">
        {/* Section label */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <MapPin className="text-[#d4a843]" size={22} />
          <span className="text-sm font-semibold text-[#1e3a5f] uppercase tracking-widest">
            Hoy en ruta
          </span>
        </div>

        {/* Main card */}
        <div
          className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-[#e8c96a] ring-2 ring-[#e8c96a]/20 border-l-4"
          style={{ borderLeftColor: color }}
        >
          {/* Header */}
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#e8c96a] text-[#1e3a5f] shadow-sm"
              >
                HOY
              </motion.span>
              <h2 className="text-xl sm:text-2xl font-[family-name:var(--font-playfair)] text-[#1e3a5f]">
                Día {day.dayNumber} — {day.weekday} {day.date}
              </h2>
            </div>

            {/* Route */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <MapPin size={14} className="text-[#d4a843] shrink-0" />
              {hasDriving ? (
                <>
                  <span>{day.from}</span>
                  <Car size={14} className="text-[#d4a843] shrink-0" />
                  <span>{day.to}</span>
                </>
              ) : (
                <span>{day.from} (día completo)</span>
              )}
            </div>

            {/* Overnight */}
            {day.overnightCity && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Bed size={14} className="text-gray-400 shrink-0" />
                <span>Noche en {day.overnightCity}</span>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-[#e8c96a]/30" />

          {/* Activities */}
          <div className="p-5 sm:p-6 space-y-3">
            <ActivitySummary
              icon={<Sun size={16} />}
              label="Mañana"
              activities={day.activities.morning || []}
            />
            <ActivitySummary
              icon={<Sunset size={16} />}
              label="Tarde"
              activities={day.activities.afternoon || []}
            />
            <ActivitySummary
              icon={<Moon size={16} />}
              label="Noche"
              activities={day.activities.evening || []}
            />
          </div>

          {/* Meals */}
          {(day.meals.lunch || day.meals.merienda || day.meals.dinner) && (
            <>
              <div className="border-t border-[#e8c96a]/30" />
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Coffee size={16} className="text-[#d4a843]" />
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Dónde comer
                  </span>
                </div>
                <div className="space-y-2">
                  {day.meals.lunch && (
                    <p className="text-sm text-gray-700">
                      <span className="font-medium text-[#1e3a5f]">
                        Almuerzo:
                      </span>{" "}
                      {day.meals.lunch.name}
                    </p>
                  )}
                  {day.meals.merienda && (
                    <p className="text-sm text-gray-700">
                      <span className="font-medium text-[#1e3a5f]">
                        Merienda:
                      </span>{" "}
                      {day.meals.merienda.name}
                    </p>
                  )}
                  {day.meals.dinner && (
                    <p className="text-sm text-gray-700">
                      <span className="font-medium text-[#1e3a5f]">
                        Cena:
                      </span>{" "}
                      {day.meals.dinner.name}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Footer link */}
          <div className="border-t border-[#e8c96a]/30" />
          <a
            href="#itinerario"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("itinerario")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center justify-center gap-2 p-4 text-sm font-medium text-[#1e3a5f] hover:bg-[#faf5eb] transition-colors cursor-pointer"
          >
            <ChevronDown size={14} />
            Ver detalles completos en el itinerario
          </a>
        </div>
      </div>
    </motion.section>
  );
}

function ViajeCompletado() {
  return (
    <motion.section
      id="hoy"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-12 bg-gradient-to-b from-white to-[#faf5eb]"
    >
      <div className="max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Trophy className="text-[#e8c96a] mx-auto mb-4" size={48} />
          <h2 className="text-3xl font-[family-name:var(--font-playfair)] text-[#1e3a5f] mb-2">
            ¡Viaje completado!
          </h2>
          <p className="text-gray-500">
            {TOTAL_DAYS} días · 7 ciudades · ~{TOTAL_DISTANCE_KM} km ·
            ¡Familia Accurso lo logró!
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default function VistaHoy() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const tripState = getTripDayInfo(new Date());

  if (tripState.phase === "before") return null;
  if (tripState.phase === "after") return <ViajeCompletado />;

  return <TodayCard day={tripState.day} />;
}
