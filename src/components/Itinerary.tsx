"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { itinerary } from "@/data/itinerary";
import { getTripDayInfo } from "@/lib/tripDay";
import DayCard from "./DayCard";

export default function Itinerary() {
  const [todayDayNumber, setTodayDayNumber] = useState<number | null>(null);

  useEffect(() => {
    const tripState = getTripDayInfo(new Date());
    if (tripState.phase === "during") {
      setTodayDayNumber(tripState.dayNumber);
    }
  }, []);
  return (
    <section id="itinerario" className="py-20 bg-[#faf5eb] dark:bg-[#0f172a]">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <CalendarDays className="text-[#d4a843]" size={28} />
            <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] text-[#1e3a5f] dark:text-[#93c5fd]">
              Día por Día
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            11 días de travesía, ritmo relajado: una actividad principal por
            la mañana, algo liviano a la tarde, y buena cena. Tocá cada día para
            ver los detalles.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#d4a843] via-[#1e3a5f] to-[#d4a843] hidden sm:block" />

          <div className="space-y-6 sm:pl-14">
            {itinerary.map((day) => (
              <DayCard
                key={day.dayNumber}
                day={day}
                isToday={day.dayNumber === todayDayNumber}
                defaultExpanded={day.dayNumber === todayDayNumber}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
