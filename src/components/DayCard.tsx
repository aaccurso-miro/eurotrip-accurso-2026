"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Castle,
  Coffee,
  Music,
  Footprints,
  Utensils,
  Bed,
  BookOpen,
  ChevronDown,
  Lightbulb,
  Sun,
  Sunset,
  Moon,
  MapPin,
} from "lucide-react";
import type { DayData, ActivityType } from "@/data/itinerary";
import { CITY_COLORS } from "@/lib/constants";

const typeIcons: Record<ActivityType, React.ReactNode> = {
  driving: <Car size={16} />,
  sightseeing: <Castle size={16} />,
  food: <Utensils size={16} />,
  music: <Music size={16} />,
  rest: <Bed size={16} />,
  walking: <Footprints size={16} />,
  culture: <BookOpen size={16} />,
};

const typeLabels: Record<ActivityType, string> = {
  driving: "Manejo",
  sightseeing: "Imperdible",
  food: "Comida",
  music: "Música",
  rest: "Descanso",
  walking: "Paseo",
  culture: "Cultura",
};

const MAPPABLE_TYPES: ActivityType[] = ["sightseeing", "culture", "walking", "food", "music"];

function mapsUrl(title: string, city: string) {
  return `https://www.google.com/maps/search/${encodeURIComponent(`${title}, ${city}`)}`;
}

export default function DayCard({
  day,
  isToday = false,
  defaultExpanded = false,
}: {
  day: DayData;
  isToday?: boolean;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const cardRef = useRef<HTMLDivElement>(null);
  const color = CITY_COLORS[day.cityId] || "#1e3a5f";

  const hasDriving = day.from !== day.to;

  useEffect(() => {
    if (isToday && cardRef.current) {
      const timeout = setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [isToday]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div
        className={`bg-white dark:bg-[#1e293b] rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border-l-4 ${
          isToday ? "ring-2 ring-[#e8c96a]/50 ring-offset-1" : ""
        }`}
        style={{ borderLeftColor: color }}
      >
        {/* Header */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left p-5 sm:p-6 cursor-pointer"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {/* Day badge */}
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white text-sm font-bold shrink-0"
                  style={{ background: color }}
                >
                  {day.dayNumber}
                </span>
                {isToday && (
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                      ease: "easeInOut",
                    }}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#e8c96a] text-[#1e3a5f] shadow-sm"
                  >
                    HOY
                  </motion.span>
                )}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    Día {day.dayNumber} — {day.weekday} {day.date}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-0.5 flex-wrap">
                    {hasDriving ? (
                      <>
                        <span className="truncate max-w-[100px] sm:max-w-none" title={day.from}>{day.from}</span>
                        <Car size={14} className="text-[#d4a843] shrink-0" />
                        <span className="truncate max-w-[100px] sm:max-w-none" title={day.to}>{day.to}</span>
                      </>
                    ) : (
                      <span className="truncate" title={`${day.from} (día completo)`}>{day.from} (día completo)</span>
                    )}
                    {day.overnightCity && (
                      <>
                        <span className="text-gray-300 dark:text-gray-600">|</span>
                        <Bed size={14} className="text-gray-400 shrink-0" />
                        <span className="text-gray-400 truncate max-w-[100px] sm:max-w-none" title={day.overnightCity}>
                          {day.overnightCity}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Activity summary */}
              <div className="flex flex-wrap gap-2 mt-3">
                {[
                  ...(day.activities.morning || []),
                  ...(day.activities.afternoon || []),
                  ...(day.activities.evening || []),
                ].map((act, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-600"
                  >
                    {typeIcons[act.type]}
                    {typeLabels[act.type]}
                  </span>
                ))}
              </div>
            </div>

            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-gray-400 shrink-0 mt-1"
            >
              <ChevronDown size={20} />
            </motion.div>
          </div>
        </button>

        {/* Expandable content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-5 sm:px-6 pb-6 border-t border-gray-50 dark:border-gray-700">
                {/* Activities by time of day */}
                <div className="mt-4 space-y-5">
                  {day.activities.morning && day.activities.morning.length > 0 && (
                    <TimeBlock
                      icon={<Sun size={16} />}
                      label="Mañana"
                      activities={day.activities.morning}
                      color={color}
                      city={day.overnightCity}
                    />
                  )}
                  {day.activities.afternoon && day.activities.afternoon.length > 0 && (
                    <TimeBlock
                      icon={<Sunset size={16} />}
                      label="Tarde"
                      activities={day.activities.afternoon}
                      color={color}
                      city={day.overnightCity}
                    />
                  )}
                  {day.activities.evening && day.activities.evening.length > 0 && (
                    <TimeBlock
                      icon={<Moon size={16} />}
                      label="Noche"
                      activities={day.activities.evening}
                      color={color}
                      city={day.overnightCity}
                    />
                  )}
                </div>

                {/* Meals */}
                {(day.meals.lunch || day.meals.merienda || day.meals.dinner) && (
                  <div className="mt-5 pt-4 border-t border-gray-50 dark:border-gray-700">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2 mb-3">
                      <Coffee size={16} className="text-[#d4a843]" />
                      Dónde comer
                    </h4>
                    <div className="space-y-2">
                      {day.meals.lunch && (
                        <MealItem label="Almuerzo" meal={day.meals.lunch} />
                      )}
                      {day.meals.merienda && (
                        <MealItem label="Merienda" meal={day.meals.merienda} />
                      )}
                      {day.meals.dinner && (
                        <MealItem label="Cena" meal={day.meals.dinner} />
                      )}
                    </div>
                  </div>
                )}

                {/* Tips */}
                {day.tips.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-gray-50 dark:border-gray-700">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2 mb-3">
                      <Lightbulb size={16} className="text-[#d4a843]" />
                      Tips del día
                    </h4>
                    <ul className="space-y-1.5">
                      {day.tips.map((tip, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-500 dark:text-gray-400 flex items-start gap-2"
                        >
                          <span className="text-[#d4a843] shrink-0 mt-0.5">
                            •
                          </span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function TimeBlock({
  icon,
  label,
  activities,
  color,
  city,
}: {
  icon: React.ReactNode;
  label: string;
  activities: DayData["activities"]["morning"];
  color: string;
  city: string;
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-2 mb-2">
        <span style={{ color }}>{icon}</span>
        {label}
      </h4>
      <div className="space-y-2 ml-6">
        {activities?.map((act, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-gray-400 mt-0.5 shrink-0">
              {typeIcons[act.type]}
            </span>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-1.5 flex-wrap">
                {act.title}
                {act.optional && (
                  <span className="text-xs text-[#d4a843] bg-[#d4a843]/10 px-2 py-0.5 rounded-full">
                    Opcional
                  </span>
                )}
                {MAPPABLE_TYPES.includes(act.type) && (
                  <a
                    href={mapsUrl(act.title, city)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Ver en Google Maps"
                    onClick={(e) => e.stopPropagation()}
                    className="text-gray-300 dark:text-gray-600 hover:text-[#d4a843] dark:hover:text-[#d4a843] transition-colors"
                  >
                    <MapPin size={12} />
                  </a>
                )}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{act.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MealItem({
  label,
  meal,
}: {
  label: string;
  meal: { name: string; description: string };
}) {
  return (
    <div className="bg-[#faf5eb]/50 dark:bg-gray-800/50 rounded-lg p-3">
      <p className="text-sm">
        <span className="font-medium text-gray-700 dark:text-gray-200">{label}:</span>{" "}
        <span className="text-[#1e3a5f] dark:text-[#93c5fd] font-medium">{meal.name}</span>
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{meal.description}</p>
    </div>
  );
}
