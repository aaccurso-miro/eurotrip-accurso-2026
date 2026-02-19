"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Map as MapIcon } from "lucide-react";

const MapLeaflet = dynamic(() => import("./MapLeaflet"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center">
      <span className="text-gray-400">Cargando mapa...</span>
    </div>
  ),
});

export default function MapSection() {
  return (
    <section id="mapa" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapIcon className="text-[#d4a843]" size={28} />
            <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] text-[#1e3a5f]">
              Nuestra Ruta
            </h2>
          </div>
          <p className="text-gray-500 max-w-2xl mx-auto">
            7 ciudades, 4 países, ~2540 km de aventura por el corazón de Europa.
            Tocá cada marcador para ver los detalles.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl overflow-hidden shadow-xl border border-gray-100"
          style={{ height: "500px" }}
        >
          <MapLeaflet />
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500"
        >
          <span>🇳🇱 Países Bajos</span>
          <span>•</span>
          <span>🇩🇪 Alemania</span>
          <span>•</span>
          <span>🇦🇹 Austria</span>
          <span>•</span>
          <span>🇨🇿 República Checa</span>
        </motion.div>
      </div>
    </section>
  );
}
