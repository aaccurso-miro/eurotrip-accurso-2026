"use client";

import { motion } from "framer-motion";
import { MapPin, Moon, Star, CircleDot, ExternalLink } from "lucide-react";
import { cities } from "@/data/cities";
import { CITY_COLORS } from "@/lib/constants";

// Unsplash direct URLs for city hero images (free, no API key needed)
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

// Spanish Wikipedia links for each city
const wikiLinks: Record<string, string> = {
  amsterdam: "https://es.wikipedia.org/wiki/%C3%81msterdam",
  rothenburg: "https://es.wikipedia.org/wiki/Rothenburg_ob_der_Tauber",
  salzburg: "https://es.wikipedia.org/wiki/Salzburgo",
  admont: "https://es.wikipedia.org/wiki/Abadía_de_Admont",
  viena: "https://es.wikipedia.org/wiki/Viena",
  praga: "https://es.wikipedia.org/wiki/Praga",
  kassel: "https://es.wikipedia.org/wiki/Kassel",
};

export default function CityIntro() {
  return (
    <section id="ciudades" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="text-[#d4a843]" size={28} />
            <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] text-[#1e3a5f]">
              Nuestras Ciudades
            </h2>
          </div>
          <p className="text-gray-500 max-w-xl mx-auto">
            De canales holandeses a torres checas, pasando por palacios imperiales
            y pueblos medievales. Cada parada tiene su magia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, index) => {
            const color = CITY_COLORS[city.id] || "#1e3a5f";
            return (
              <motion.a
                href={wikiLinks[city.id] || "#"}
                target="_blank"
                rel="noopener noreferrer"
                key={city.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer block"
              >
                {/* City image */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${cityImages[city.id] || ""}')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
                    <p className="text-white/70 text-sm truncate" title={city.country}>{city.country}</p>
                  </div>
                  {city.nights > 0 ? (
                    <div
                      className="absolute top-3 right-3 flex items-center gap-1 text-white text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ background: color }}
                    >
                      <Moon size={12} />
                      {city.nights} noche{city.nights > 1 ? "s" : ""}
                    </div>
                  ) : (
                    <div
                      className="absolute top-3 right-3 flex items-center gap-1 text-white text-xs font-medium px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm"
                    >
                      <CircleDot size={12} />
                      {city.id === "amsterdam" ? "Inicio / Fin" : "Parada"}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {city.intro}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1.5">
                    {city.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-[#faf5eb] text-[#1e3a5f]"
                      >
                        <Star size={10} className="text-[#d4a843]" />
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Wikipedia link hint */}
                  <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-1.5 text-xs text-gray-400 group-hover:text-[#d4a843] transition-colors">
                    <ExternalLink size={12} />
                    <span>Más info en Wikipedia</span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
