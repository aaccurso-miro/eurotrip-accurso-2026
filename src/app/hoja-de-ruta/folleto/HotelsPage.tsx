import { Hotel } from "lucide-react";
import { cities } from "@/data/cities";

const HOTEL_CITY_ORDER = ["rothenburg", "salzburg", "viena", "praga", "kassel"];

export default function HotelsPage() {
  const orderedCities = HOTEL_CITY_ORDER.map((id) => cities.find((c) => c.id === id)).filter(
    (c): c is NonNullable<typeof c> => Boolean(c && c.hotel)
  );

  return (
    <div className="h-full flex flex-col">
      <header className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
        <p className="text-xs uppercase tracking-widest text-[#d4a843] font-semibold mb-1">
          Alojamiento
        </p>
        <h1 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] text-[#1e3a5f] dark:text-[#93c5fd]">
          Hoteles por ciudad
        </h1>
      </header>

      <ol className="space-y-4">
        {orderedCities.map((city) => {
          const h = city.hotel!;
          return (
            <li
              key={city.id}
              className="print-keep rounded-xl border border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Hotel size={14} className="text-[#d4a843] shrink-0" aria-hidden="true" />
                  <h2 className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                    <span aria-hidden="true">{city.flag}</span> {city.name}
                  </h2>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#d4a843] font-semibold whitespace-nowrap">
                  {h.checkIn} → {h.checkOut}
                </span>
              </div>

              <p className="text-sm font-medium text-gray-800 dark:text-gray-100 leading-tight mb-1">
                {h.name}
              </p>
              {h.address && (
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-snug mb-1">
                  {h.address}
                </p>
              )}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-700 dark:text-gray-300 mt-1.5">
                {h.phone && (
                  <span>
                    <span className="text-gray-500 dark:text-gray-400">Tel: </span>
                    <a
                      href={`tel:${h.phone.replace(/\s+/g, "")}`}
                      className="underline decoration-dotted"
                    >
                      {h.phone}
                    </a>
                  </span>
                )}
                <span>
                  <span className="text-gray-500 dark:text-gray-400">Web: </span>
                  <a
                    href={h.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1e3a5f] dark:text-[#93c5fd] underline break-all"
                  >
                    {h.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </a>
                </span>
                {h.rooms && h.rooms !== "—" && (
                  <span className="text-gray-500 dark:text-gray-400">{h.rooms}</span>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <footer className="mt-auto pt-6 text-[10px] text-gray-500 dark:text-gray-400 italic text-center border-t border-gray-200 dark:border-gray-700">
        Ámsterdam no figura — es punto de partida y regreso (alojamiento propio).
      </footer>
    </div>
  );
}
