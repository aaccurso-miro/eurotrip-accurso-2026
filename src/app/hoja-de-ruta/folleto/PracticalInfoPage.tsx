import { Coins, Languages, Cloud, Car } from "lucide-react";

interface CountryInfo {
  flag: string;
  name: string;
  currency: string;
  currencyCode: string;
  language: string;
  cities: string;
  avgHighC: number;
  avgLowC: number;
  rainPct: number;
  tip: string;
}

const COUNTRIES: CountryInfo[] = [
  {
    flag: "🇳🇱",
    name: "Países Bajos",
    currency: "Euro",
    currencyCode: "EUR",
    language: "Neerlandés (inglés universal)",
    cities: "Ámsterdam",
    avgHighC: 17,
    avgLowC: 9,
    rainPct: 40,
    tip: "Sin viñeta de autopista. Tarjeta de crédito aceptada en casi todos lados.",
  },
  {
    flag: "🇩🇪",
    name: "Alemania",
    currency: "Euro",
    currencyCode: "EUR",
    language: "Alemán",
    cities: "Rothenburg · Kassel",
    avgHighC: 19,
    avgLowC: 9,
    rainPct: 35,
    tip: "Autobahn sin peajes ni viñeta. Llevar efectivo para Gasthäuser pequeños.",
  },
  {
    flag: "🇦🇹",
    name: "Austria",
    currency: "Euro",
    currencyCode: "EUR",
    language: "Alemán",
    cities: "Salzburgo · Viena",
    avgHighC: 20,
    avgLowC: 10,
    rainPct: 40,
    tip: "Necesita viñeta digital (Vignette) para autopistas — comprar antes de entrar.",
  },
  {
    flag: "🇨🇿",
    name: "República Checa",
    currency: "Corona checa",
    currencyCode: "CZK",
    language: "Checo",
    cities: "Praga",
    avgHighC: 20,
    avgLowC: 10,
    rainPct: 40,
    tip: "Viñeta digital obligatoria. Muchos lugares aceptan euros, pero el cambio es peor — preferir CZK.",
  },
];

export default function PracticalInfoPage() {
  return (
    <div className="h-full flex flex-col">
      <header className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
        <p className="text-xs uppercase tracking-widest text-[#d4a843] font-semibold mb-1">
          De referencia
        </p>
        <h1 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] text-[#1e3a5f] dark:text-[#93c5fd]">
          Información práctica
        </h1>
      </header>

      <ol className="space-y-3">
        {COUNTRIES.map((country) => (
          <li
            key={country.name}
            className="print-keep rounded-xl border border-gray-200 dark:border-gray-700 p-3.5"
          >
            <div className="flex items-baseline justify-between gap-3 mb-2">
              <h2 className="text-base font-medium text-gray-800 dark:text-gray-100">
                <span aria-hidden="true">{country.flag}</span> {country.name}
              </h2>
              <span className="text-[10px] text-gray-500 dark:text-gray-400">{country.cities}</span>
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
              <div className="flex items-start gap-2">
                <Coins size={12} className="text-[#d4a843] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Moneda:</span>{" "}
                  <span className="text-gray-700 dark:text-gray-200">
                    {country.currency} ({country.currencyCode})
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Languages size={12} className="text-[#d4a843] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Idioma:</span>{" "}
                  <span className="text-gray-700 dark:text-gray-200">{country.language}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Cloud size={12} className="text-[#d4a843] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Clima may–jun:</span>{" "}
                  <span className="text-gray-700 dark:text-gray-200 font-mono">
                    {country.avgHighC}° / {country.avgLowC}°
                  </span>
                  <span className="text-gray-500 dark:text-gray-400"> · lluvia {country.rainPct}%</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Car size={12} className="text-[#d4a843] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-gray-700 dark:text-gray-200 leading-snug">{country.tip}</div>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <footer className="mt-auto pt-6 text-[10px] text-gray-500 dark:text-gray-400 italic text-center border-t border-gray-200 dark:border-gray-700">
        Toma corriente tipo F en los 4 países · cargar siempre adaptador europeo.
      </footer>
    </div>
  );
}
