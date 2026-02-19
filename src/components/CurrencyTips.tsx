"use client";

import { motion } from "framer-motion";
import { Banknote, MessageCircle, Phone } from "lucide-react";

const currencies = [
  {
    zone: "Zona Euro",
    countries: "🇳🇱 Países Bajos, 🇩🇪 Alemania, 🇦🇹 Austria",
    currency: "Euro (EUR) €",
    tipping: "5–10% en restaurantes (incluido en muchos casos). Redondear la cuenta.",
    flag: "💶",
  },
  {
    zone: "República Checa",
    countries: "🇨🇿 República Checa (Praga)",
    currency: "Corona Checa (CZK) Kč",
    tipping: "~10% en restaurantes. Algunos aceptan EUR pero el cambio es malo.",
    flag: "🪙",
  },
];

const phrases = [
  {
    language: "Alemán",
    flag: "🇩🇪🇦🇹",
    phrases: [
      { spanish: "Hola", local: "Hallo" },
      { spanish: "Gracias", local: "Danke" },
      { spanish: "Por favor", local: "Bitte" },
      { spanish: "Sí / No", local: "Ja / Nein" },
      { spanish: "La cuenta, por favor", local: "Die Rechnung, bitte" },
      { spanish: "¿Dónde está...?", local: "Wo ist...?" },
      { spanish: "¿Cuánto cuesta?", local: "Was kostet das?" },
      { spanish: "Buenos días", local: "Guten Morgen" },
      { spanish: "Adiós", local: "Tschüss" },
    ],
  },
  {
    language: "Checo",
    flag: "🇨🇿",
    phrases: [
      { spanish: "Hola", local: "Ahoj / Dobrý den" },
      { spanish: "Gracias", local: "Děkuji" },
      { spanish: "Por favor", local: "Prosím" },
      { spanish: "Sí / No", local: "Ano / Ne" },
      { spanish: "La cuenta, por favor", local: "Účet, prosím" },
      { spanish: "¿Dónde está...?", local: "Kde je...?" },
      { spanish: "¿Cuánto cuesta?", local: "Kolik to stojí?" },
      { spanish: "Buenos días", local: "Dobré ráno" },
      { spanish: "Adiós", local: "Na shledanou" },
    ],
  },
];

export default function CurrencyTips() {
  return (
    <section id="moneda" className="py-20 bg-white dark:bg-[#1e293b]">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Banknote className="text-[#d4a843]" size={28} />
            <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] text-[#1e3a5f] dark:text-[#93c5fd]">
              Moneda y Frases Útiles
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Dos zonas monetarias en el viaje. La mayoría acepta tarjeta, pero
            llevar algo de efectivo siempre ayuda.
          </p>
        </motion.div>

        {/* Currency cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {currencies.map((cur, index) => (
            <motion.div
              key={cur.zone}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#faf5eb] dark:bg-gray-800 rounded-xl p-6 border border-[#d4a843]/20 dark:border-[#d4a843]/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{cur.flag}</span>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">
                    {cur.zone}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{cur.countries}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Banknote size={16} className="text-[#d4a843] mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-gray-200">
                    <strong>Moneda:</strong> {cur.currency}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Banknote size={16} className="text-[#d4a843] mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-gray-200">
                    <strong>Propina:</strong> {cur.tipping}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Phrases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-[family-name:var(--font-playfair)] text-[#1e3a5f] dark:text-[#93c5fd] mb-6 text-center flex items-center justify-center gap-2">
            <MessageCircle size={22} className="text-[#d4a843]" />
            Frases útiles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {phrases.map((lang, index) => (
              <motion.div
                key={lang.language}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-[#0f172a] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden"
              >
                <div className="bg-[#1e3a5f] text-white px-5 py-3 flex items-center gap-2">
                  <span className="text-lg">{lang.flag}</span>
                  <h4 className="font-medium">{lang.language}</h4>
                </div>
                <div className="divide-y divide-gray-50 dark:divide-gray-800">
                  {lang.phrases.map((phrase, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-2 gap-3 px-5 py-2.5 text-sm"
                    >
                      <span className="text-gray-500 dark:text-gray-400">{phrase.spanish}</span>
                      <span className="text-[#1e3a5f] dark:text-[#93c5fd] font-medium">
                        {phrase.local}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Emergency */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-5 py-3 rounded-full text-sm font-medium">
            <Phone size={16} />
            Emergencias en toda la UE: <strong>112</strong>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
