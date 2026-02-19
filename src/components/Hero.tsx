"use client";

import { motion } from "framer-motion";
import { ChevronDown, MapPin, Calendar } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a5f]/70 via-[#1e3a5f]/50 to-[#1e3a5f]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block text-6xl sm:text-7xl mb-4">🚗</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)] leading-tight">
            Eurotrip Accurso
            <span className="block text-[#e8c96a] mt-2">2026</span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-2 text-white/80 text-sm sm:text-base mb-6"
          >
            <MapPin size={16} className="text-[#e8c96a]" />
            <span>Ámsterdam</span>
            <span className="text-[#e8c96a]">→</span>
            <span>Rothenburg</span>
            <span className="text-[#e8c96a]">→</span>
            <span>Salzburgo</span>
            <span className="text-[#e8c96a]">→</span>
            <span>Viena</span>
            <span className="text-[#e8c96a]">→</span>
            <span>Praga</span>
            <span className="text-[#e8c96a]">→</span>
            <span>Kassel</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex items-center justify-center gap-3 text-white/70 mb-10"
          >
            <Calendar size={18} />
            <span className="text-lg">25 mayo — 4 junio 2026</span>
            <span className="text-[#e8c96a]">•</span>
            <span className="text-lg">11 días</span>
            <span className="text-[#e8c96a]">•</span>
            <span className="text-lg">~2540 km</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-xl sm:text-2xl text-white/60 font-[family-name:var(--font-playfair)] italic"
          >
            Un viaje en auto por el corazón de Europa
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#countdown"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-white/50 hover:text-white/80 transition-colors cursor-pointer"
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
}
