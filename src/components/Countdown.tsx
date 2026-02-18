"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { TRIP_START_DATE } from "@/lib/constants";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(): TimeLeft | null {
  const diff = TRIP_START_DATE.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-lg w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center"
      >
        <span className="text-3xl sm:text-4xl font-bold text-[#1e3a5f]">
          {String(value).padStart(2, "0")}
        </span>
      </motion.div>
      <span className="mt-2 text-sm text-gray-500 font-medium">{label}</span>
    </div>
  );
}

export default function Countdown() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const update = () => setTick((t) => t + 1);
    // Immediate first tick via timeout callback (avoids sync setState in effect)
    const init = setTimeout(update, 0);
    const timer = setInterval(update, 1000);
    return () => {
      clearTimeout(init);
      clearInterval(timer);
    };
  }, []);

  const mounted = tick > 0;
  const timeLeft = mounted ? calcTimeLeft() : null;

  if (!mounted) {
    return (
      <section id="countdown" className="py-16 bg-gradient-to-b from-[#faf5eb] to-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="h-32" />
        </div>
      </section>
    );
  }

  return (
    <section
      id="countdown"
      className="py-16 bg-gradient-to-b from-[#faf5eb] to-white"
    >
      <div className="max-w-4xl mx-auto text-center px-4">
        {timeLeft ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 mb-8"
            >
              <Clock className="text-[#d4a843]" size={24} />
              <h2 className="text-2xl sm:text-3xl font-[family-name:var(--font-playfair)] text-[#1e3a5f]">
                Faltan...
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex justify-center gap-4 sm:gap-6"
            >
              <CountdownUnit value={timeLeft.days} label="días" />
              <CountdownUnit value={timeLeft.hours} label="horas" />
              <CountdownUnit value={timeLeft.minutes} label="minutos" />
              <CountdownUnit value={timeLeft.seconds} label="segundos" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-gray-500 text-lg"
            >
              para arrancar la aventura 🇦🇷 ✈️ 🇳🇱 🚗 🇪🇺
            </motion.p>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8"
          >
            <span className="text-5xl mb-4 block">🚗💨</span>
            <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] text-[#1e3a5f] mb-2">
              ¡Buen viaje, familia!
            </h2>
            <p className="text-xl text-gray-500">
              La aventura ya comenzó
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
