import Link from "next/link";
import { ArrowLeft, Printer, MapPin, Clock, BookOpen } from "lucide-react";
import { roadSheets } from "@/data/roadSheets";
import { CITY_COLORS } from "@/lib/constants";

export const metadata = {
  title: "Hojas de Ruta · Eurotrip Accurso 2026",
};

export default function HojaDeRutaIndexPage() {
  return (
    <main className="min-h-screen bg-[#faf5eb] dark:bg-[#0f172a] py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-[#1e3a5f] dark:hover:text-[#93c5fd]"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Volver al sitio
          </Link>
        </div>

        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] text-[#1e3a5f] dark:text-[#93c5fd] mb-2">
            Hojas de ruta
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Una hoja imprimible por cada día de manejo. Cada una incluye horarios estimados,
            paradas en ruta, hotel destino y pronóstico del clima.
          </p>
        </header>

        {/* CTA destacado: folleto completo */}
        <Link
          href="/hoja-de-ruta/folleto"
          className="group block mb-6 rounded-xl border-2 border-[#1e3a5f] dark:border-[#93c5fd] bg-[#1e3a5f] dark:bg-[#1e3a5f]/40 p-5 hover:bg-[#1e3a5f]/90 dark:hover:bg-[#1e3a5f]/60 transition-colors"
        >
          <div className="flex items-start gap-4">
            <BookOpen size={28} className="text-[#d4a843] shrink-0 mt-0.5" aria-hidden="true" />
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-widest text-[#d4a843] font-semibold mb-1">
                Para imprimir todo de una
              </p>
              <h2 className="text-lg sm:text-xl font-[family-name:var(--font-playfair)] text-white mb-1">
                Folleto completo del viaje
              </h2>
              <p className="text-xs text-white/80 leading-snug">
                12 páginas: portada + resumen + hoteles + info práctica + 6 hojas de ruta + contactos. Pensado para imprimir como librito A5.
              </p>
            </div>
            <span className="text-xs text-white/70 group-hover:text-white whitespace-nowrap shrink-0 hidden sm:inline">
              Ver folleto →
            </span>
          </div>
        </Link>

        <h2 className="text-[11px] uppercase tracking-widest font-semibold text-gray-700 dark:text-gray-200 mb-3">
          O imprimí hojas sueltas
        </h2>

        <ul className="space-y-3">
          {roadSheets.map((sheet) => {
            const color = sheet.destCityId ? CITY_COLORS[sheet.destCityId] : "#1e3a5f";
            return (
              <li key={sheet.slug}>
                <Link
                  href={`/hoja-de-ruta/${sheet.slug}`}
                  className="group block bg-white dark:bg-[#1e293b] rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 p-4 sm:p-5"
                  style={{ borderLeftColor: color }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs uppercase tracking-widest text-[#d4a843] font-semibold mb-1">
                        Día {sheet.dayNumber} · {sheet.weekday} {sheet.date}
                      </p>
                      <h2 className="text-lg sm:text-xl font-medium text-gray-800 dark:text-gray-100 mb-1.5">
                        {sheet.from} → {sheet.to}
                      </h2>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                        <span className="inline-flex items-center gap-1">
                          <Clock size={11} aria-hidden="true" />
                          {sheet.departureTime} → {sheet.arrivalEstimate}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={11} aria-hidden="true" />
                          {sheet.totalKm} km · {sheet.estimatedHours}
                        </span>
                        <span>
                          {sheet.stops.length} parada{sheet.stops.length === 1 ? "" : "s"} en ruta
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#1e3a5f] dark:text-[#93c5fd] shrink-0 group-hover:underline">
                      <Printer size={12} aria-hidden="true" />
                      Ver / imprimir
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-xs text-gray-500 dark:text-gray-400 italic">
          Los días 3, 5, 6, 8 y 9 son días dentro de una ciudad sin tramo de manejo — por eso
          no tienen hoja de ruta.
        </p>
      </div>
    </main>
  );
}
