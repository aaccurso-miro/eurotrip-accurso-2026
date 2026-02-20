"use client";

import { motion } from "framer-motion";
import { MapPin, Moon, Star, CircleDot, ExternalLink, BedDouble } from "lucide-react";
import { cities, City } from "@/data/cities";
import { CITY_COLORS } from "@/lib/constants";

const cityImages: Record<string, string> = {
  amsterdam:
    "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80",
  rothenburg:
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
  salzburg:
    "https://images.unsplash.com/photo-1595867818082-083862f3d630?w=800&q=80",
  admont:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Austria_-_Admont_Abbey_Library_-_1307.jpg/3840px-Austria_-_Admont_Abbey_Library_-_1307.jpg",
  viena:
    "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80",
  praga:
    "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80",
  kassel:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Wilhelmshoehe_-_Herkules_mit_Kaskaden.jpg/1280px-Wilhelmshoehe_-_Herkules_mit_Kaskaden.jpg",
};

const wikiLinks: Record<string, string> = {
  amsterdam: "https://es.wikipedia.org/wiki/%C3%81msterdam",
  rothenburg: "https://es.wikipedia.org/wiki/Rothenburg_ob_der_Tauber",
  salzburg: "https://es.wikipedia.org/wiki/Salzburgo",
  admont: "https://es.wikipedia.org/wiki/Abadía_de_Admont",
  viena: "https://es.wikipedia.org/wiki/Viena",
  praga: "https://es.wikipedia.org/wiki/Praga",
  kassel: "https://es.wikipedia.org/wiki/Kassel",
};

function CityCard({ city, index }: { city: City; index: number }) {
  const color = CITY_COLORS[city.id] || "#1e3a5f";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-[#0f172a] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      {/* City image */}
      <div className="relative h-56 overflow-hidden group">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url('${cityImages[city.id] || ""}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* City name overlay */}
        <div className="absolute bottom-3 left-4 right-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{city.flag}</span>
            <h3
              className="text-xl font-bold text-white font-[family-name:var(--font-playfair)] truncate"
              title={city.name}
            >
              {city.name}
            </h3>
          </div>
          <p className="text-white/70 text-sm truncate" title={city.country}>
            {city.country}
          </p>
        </div>

        {/* Nights / status badge */}
        {city.nights > 0 ? (
          <div
            className="absolute top-3 right-3 flex items-center gap-1 text-white text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: color }}
          >
            <Moon size={12} />
            {city.nights} noche{city.nights > 1 ? "s" : ""}
          </div>
        ) : (
          <div className="absolute top-3 right-3 flex items-center gap-1 text-white text-xs font-medium px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm">
            <CircleDot size={12} />
            {city.id === "amsterdam" ? "Inicio / Fin" : "Parada"}
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-5">
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          {city.intro}
        </p>

        {/* Hotel block */}
        {city.hotel && (
          <a
            href={city.hotel.website}
            target="_blank"
            rel="noopener noreferrer"
            className="group/hotel mb-4 flex items-center gap-2 pl-3 py-2.5 pr-3 rounded-lg bg-[#faf5eb] dark:bg-gray-800/60 border-l-4 hover:brightness-95 dark:hover:brightness-110 transition-all"
            style={{ borderLeftColor: color }}
          >
            <BedDouble size={15} className="shrink-0 mt-0.5" style={{ color }} />
            <div className="min-w-0 flex-1">
              <p
                className="text-xs font-semibold text-[#1e3a5f] dark:text-[#93c5fd] leading-snug truncate group-hover/hotel:underline"
                title={city.hotel.name}
              >
                {city.hotel.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {city.hotel.checkIn} → {city.hotel.checkOut}
                {city.hotel.rooms !== "—" && (
                  <span className="ml-2 text-gray-400 dark:text-gray-500">
                    · {city.hotel.rooms}
                  </span>
                )}
              </p>
            </div>
            <ExternalLink
              size={13}
              className="shrink-0 text-gray-400 group-hover/hotel:text-[#d4a843] transition-colors"
            />
          </a>
        )}

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5">
          {city.highlights.map((h, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-[#faf5eb] dark:bg-gray-800 text-[#1e3a5f] dark:text-[#93c5fd]"
            >
              <Star size={10} className="text-[#d4a843]" />
              {h}
            </span>
          ))}
        </div>

        {/* Wikipedia link */}
        <a
          href={wikiLinks[city.id] || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 pt-3 border-t border-gray-50 dark:border-gray-700 flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#d4a843] transition-colors"
        >
          <ExternalLink size={12} />
          <span>Más info en Wikipedia</span>
        </a>
      </div>
    </motion.div>
  );
}

export default function CityIntro() {
  return (
    <section id="ciudades" className="py-20 bg-white dark:bg-[#1e293b]">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="text-[#d4a843]" size={28} />
            <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] text-[#1e3a5f] dark:text-[#93c5fd]">
              Nuestras Ciudades
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            De canales holandeses a torres checas, pasando por palacios imperiales
            y pueblos medievales. Cada parada tiene su magia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cities.map((city, index) => (
            <CityCard key={city.id} city={city} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
