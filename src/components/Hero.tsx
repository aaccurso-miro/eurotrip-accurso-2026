"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, Calendar } from "lucide-react";
import { CITY_COLORS } from "@/lib/constants";

const SLIDE_DURATION = 5000; // ms per slide

const slides = [
  {
    url: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1920&q=80",
    city: "Ámsterdam",
    color: CITY_COLORS.amsterdam,
  },
  {
    url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1920&q=80",
    city: "Rothenburg",
    color: CITY_COLORS.rothenburg,
  },
  {
    url: "https://images.unsplash.com/photo-1595867818082-083862f3d630?w=1920&q=80",
    city: "Salzburgo",
    color: CITY_COLORS.salzburg,
  },
  {
    url: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1920&q=80",
    city: "Viena",
    color: CITY_COLORS.viena,
  },
  {
    url: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1920&q=80",
    city: "Praga",
    color: CITY_COLORS.praga,
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Wilhelmshoehe_-_Herkules_mit_Kaskaden.jpg/1280px-Wilhelmshoehe_-_Herkules_mit_Kaskaden.jpg",
    city: "Kassel",
    color: CITY_COLORS.kassel,
  },
];

function useCountUp(target: number, duration = 1400, delay = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const start = Date.now();
      const timer = setInterval(() => {
        const progress = Math.min((Date.now() - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setCount(Math.round(target * eased));
        if (progress >= 1) clearInterval(timer);
      }, 16);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay]);
  return count;
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const days = useCountUp(11, 1000, 1400);
  const km = useCountUp(2540, 1400, 1400);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Ken Burns slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.12 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: (SLIDE_DURATION + 2000) / 1000, ease: "linear" },
            }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slides[currentSlide].url}')` }}
          />
        </AnimatePresence>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a5f]/70 via-[#1e3a5f]/50 to-[#1e3a5f]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
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
            className="flex flex-wrap items-center justify-center gap-3 text-white/70 mb-10"
          >
            <Calendar size={18} />
            <span className="text-lg">25 mayo — 4 junio 2026</span>
            <span className="text-[#e8c96a]">•</span>
            <span className="text-lg tabular-nums">{days} días</span>
            <span className="text-[#e8c96a]">•</span>
            <span className="text-lg tabular-nums">~{km} km</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-xl sm:text-2xl text-white/60 font-[family-name:var(--font-playfair)] italic mb-10"
          >
            Un viaje en auto por el corazón de Europa
          </motion.p>

          {/* Slide dots + city label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex items-center justify-center gap-3"
          >
            {slides.map((slide, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                title={slide.city}
                className={`transition-all duration-400 rounded-full cursor-pointer ${
                  i === currentSlide
                    ? "w-5 h-2 bg-white"
                    : "w-2 h-2 bg-white/35 hover:bg-white/60"
                }`}
                style={i === currentSlide ? { background: slide.color } : {}}
              />
            ))}
            <AnimatePresence mode="wait">
              <motion.span
                key={currentSlide}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.4 }}
                className="text-white/60 text-sm ml-1"
              >
                {slides[currentSlide].city}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#countdown"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-white/50 hover:text-white/80 transition-colors cursor-pointer"
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.a>
    </section>
  );
}
