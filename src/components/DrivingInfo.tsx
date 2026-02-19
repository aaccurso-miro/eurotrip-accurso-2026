"use client";

import { motion } from "framer-motion";
import {
  Car,
  Route,
  AlertTriangle,
  Gauge,
  Coffee,
  Shield,
  BadgeCheck,
} from "lucide-react";
import { drivingLegs, drivingTips } from "@/data/driving";

const tipIcons: Record<string, React.ReactNode> = {
  badge: <BadgeCheck size={20} />,
  alert: <AlertTriangle size={20} />,
  speed: <Gauge size={20} />,
  coffee: <Coffee size={20} />,
  car: <Shield size={20} />,
};

export default function DrivingInfo() {
  const totalKm = drivingLegs.reduce((sum, leg) => sum + leg.distanceKm, 0);

  return (
    <section id="manejo" className="py-20 bg-white dark:bg-[#1e293b]">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Car className="text-[#d4a843]" size={28} />
            <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] text-[#1e3a5f] dark:text-[#93c5fd]">
              Info de Manejo
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Distancias, tiempos estimados y peajes entre cada tramo.
            Total del viaje: <strong className="text-[#1e3a5f] dark:text-[#93c5fd]">~{totalKm} km</strong>.
          </p>
        </motion.div>

        {/* Driving legs table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto mb-12"
        >
          <div className="min-w-[600px]">
            {/* Header */}
            <div className="grid grid-cols-12 gap-3 px-4 py-3 bg-[#1e3a5f] text-white rounded-t-xl text-sm font-medium">
              <div className="col-span-4">Tramo</div>
              <div className="col-span-2 text-center">Distancia</div>
              <div className="col-span-2 text-center">Tiempo</div>
              <div className="col-span-4">Peajes / Notas</div>
            </div>

            {/* Rows */}
            {drivingLegs.map((leg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`grid grid-cols-12 gap-3 px-4 py-4 text-sm items-center ${
                  index % 2 === 0
                    ? "bg-white dark:bg-[#1e293b]"
                    : "bg-[#faf5eb]/50 dark:bg-gray-800/30"
                } ${
                  index === drivingLegs.length - 1
                    ? "rounded-b-xl"
                    : "border-b border-gray-100 dark:border-gray-700"
                }`}
              >
                <div className="col-span-4 flex items-center gap-2">
                  <Route size={14} className="text-[#d4a843] shrink-0" />
                  <span className="font-medium text-gray-800 dark:text-gray-100">
                    {leg.from} → {leg.to}
                  </span>
                </div>
                <div className="col-span-2 text-center font-medium text-[#1e3a5f] dark:text-[#93c5fd]">
                  {leg.distanceKm} km
                </div>
                <div className="col-span-2 text-center text-gray-600 dark:text-gray-300">
                  {leg.estimatedHours}
                </div>
                <div className="col-span-4 text-gray-500 dark:text-gray-400 text-xs">
                  {leg.tollInfo}
                </div>
              </motion.div>
            ))}

            {/* Total row */}
            <div className="grid grid-cols-12 gap-3 px-4 py-3 bg-[#1e3a5f]/5 dark:bg-[#1e3a5f]/20 rounded-b-xl text-sm font-bold border-t-2 border-[#1e3a5f]">
              <div className="col-span-4 text-[#1e3a5f] dark:text-[#93c5fd]">TOTAL</div>
              <div className="col-span-2 text-center text-[#1e3a5f] dark:text-[#93c5fd]">
                ~{totalKm} km
              </div>
              <div className="col-span-6"></div>
            </div>
          </div>
        </motion.div>

        {/* Tips grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-[family-name:var(--font-playfair)] text-[#1e3a5f] dark:text-[#93c5fd] mb-6 text-center">
            Consejos para la ruta
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {drivingTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-[#faf5eb] dark:bg-gray-800 rounded-xl p-4 border border-[#d4a843]/20 dark:border-[#d4a843]/30"
              >
                <div className="flex items-start gap-3">
                  <span className="text-[#d4a843] mt-0.5 shrink-0">
                    {tipIcons[tip.icon] || <Car size={20} />}
                  </span>
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-100 text-sm mb-1">
                      {tip.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
