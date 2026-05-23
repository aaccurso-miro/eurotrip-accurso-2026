import { cities } from "@/data/cities";

const ROUTE_ORDER = ["amsterdam", "rothenburg", "salzburg", "viena", "praga", "kassel"];

export default function TripSummaryPage() {
  const orderedCities = ROUTE_ORDER.map((id) => cities.find((c) => c.id === id)).filter(
    (c): c is NonNullable<typeof c> => Boolean(c)
  );

  return (
    <div className="h-full flex flex-col">
      <header className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
        <p className="text-xs uppercase tracking-widest text-[#d4a843] font-semibold mb-1">
          Resumen del viaje
        </p>
        <h1 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] text-[#1e3a5f] dark:text-[#93c5fd]">
          El viaje en una página
        </h1>
      </header>

      <section className="grid grid-cols-3 gap-4 mb-8" aria-label="Estadísticas del viaje">
        <div className="text-center rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-3xl font-[family-name:var(--font-playfair)] text-[#1e3a5f] dark:text-[#93c5fd]">11</p>
          <p className="text-[11px] uppercase tracking-widest text-gray-500 dark:text-gray-400 mt-1">días</p>
        </div>
        <div className="text-center rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-3xl font-[family-name:var(--font-playfair)] text-[#1e3a5f] dark:text-[#93c5fd]">10</p>
          <p className="text-[11px] uppercase tracking-widest text-gray-500 dark:text-gray-400 mt-1">noches</p>
        </div>
        <div className="text-center rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-3xl font-[family-name:var(--font-playfair)] text-[#1e3a5f] dark:text-[#93c5fd]">~2.540</p>
          <p className="text-[11px] uppercase tracking-widest text-gray-500 dark:text-gray-400 mt-1">km</p>
        </div>
      </section>

      <section aria-labelledby="ciudades-heading">
        <h2 id="ciudades-heading" className="text-[11px] uppercase tracking-widest font-semibold text-gray-700 dark:text-gray-200 mb-3">
          Ciudades de la ruta
        </h2>
        <ol className="space-y-3">
          {orderedCities.map((city, idx) => (
            <li
              key={city.id}
              className="flex items-start gap-3 rounded-lg border border-gray-200 dark:border-gray-700 p-3"
            >
              <span className="shrink-0 w-7 h-7 rounded-full bg-[#1e3a5f] text-white text-xs font-bold flex items-center justify-center font-mono">
                {idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-base font-medium text-gray-800 dark:text-gray-100">
                    <span aria-hidden="true">{city.flag}</span> {city.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">· {city.country}</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#d4a843] font-semibold ml-auto">
                    {city.nights === 0
                      ? "Paso · sin noche"
                      : `${city.nights} noche${city.nights === 1 ? "" : "s"}`}
                  </span>
                </div>
                {city.highlights.length > 0 && (
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-snug">
                    {city.highlights.slice(0, 3).join(" · ")}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <footer className="mt-auto pt-6 text-[10px] text-gray-500 dark:text-gray-400 italic text-center border-t border-gray-200 dark:border-gray-700">
        Loop de 6 días en ruta + 5 días explorando ciudades.
      </footer>
    </div>
  );
}
