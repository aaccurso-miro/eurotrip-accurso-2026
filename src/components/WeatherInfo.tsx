"use client";

import { motion } from "framer-motion";
import { Thermometer, Droplets, Sunrise, CloudSun } from "lucide-react";
import { cities } from "@/data/cities";
import { CITY_COLORS } from "@/lib/constants";

export default function WeatherInfo() {
  // Filter out cities that are just stops (Amsterdam as start/end has 0 nights but still relevant)
  const weatherCities = cities.filter(
    (c) => c.nights > 0 || c.id === "amsterdam"
  );

  return (
    <section id="clima" className="py-20 bg-[#faf5eb]">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <CloudSun className="text-[#d4a843]" size={28} />
            <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] text-[#1e3a5f]">
              Clima en Mayo/Junio
            </h2>
          </div>
          <p className="text-gray-500 max-w-xl mx-auto">
            Temperaturas promedio para fin de mayo. Llevar capas y una campera
            liviana impermeable por las dudas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {weatherCities.map((city, index) => {
            const color = CITY_COLORS[city.id] || "#1e3a5f";
            return (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg shrink-0">{city.flag}</span>
                  <h3 className="font-bold text-gray-800 truncate" title={city.name}>{city.name}</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* High temp */}
                  <div className="flex items-center gap-2">
                    <Thermometer
                      size={18}
                      style={{ color }}
                      className="shrink-0"
                    />
                    <div>
                      <p className="text-xs text-gray-400">Máxima</p>
                      <p className="text-lg font-bold text-gray-800">
                        {city.weather.avgHighC}°C
                      </p>
                    </div>
                  </div>

                  {/* Low temp */}
                  <div className="flex items-center gap-2">
                    <Thermometer
                      size={18}
                      className="text-blue-400 shrink-0"
                    />
                    <div>
                      <p className="text-xs text-gray-400">Mínima</p>
                      <p className="text-lg font-bold text-gray-800">
                        {city.weather.avgLowC}°C
                      </p>
                    </div>
                  </div>

                  {/* Rain */}
                  <div className="flex items-center gap-2">
                    <Droplets size={18} className="text-blue-300 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400">Lluvia</p>
                      <p className="text-sm font-medium text-gray-700">
                        {city.weather.rainProbability}%
                      </p>
                    </div>
                  </div>

                  {/* Sun hours */}
                  <div className="flex items-center gap-2">
                    <Sunrise size={18} className="text-[#d4a843] shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400">Sol</p>
                      <p className="text-sm font-medium text-gray-700">
                        {city.weather.sunriseTime} – {city.weather.sunsetTime}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Advice */}
                <div className="mt-4 pt-3 border-t border-gray-50">
                  <p className="text-xs text-gray-400">
                    {city.weather.avgHighC >= 20
                      ? "☀️ Agradable, pero llevar protector solar"
                      : city.weather.rainProbability >= 40
                        ? "🌧️ Llevar paraguas y campera impermeable"
                        : "🧥 Llevar campera liviana por las mañanas"}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
