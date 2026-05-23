import RouteMapSVG from "./RouteMapSVG";

export default function CoverPage() {
  return (
    <div className="flex flex-col items-center text-center pt-16">
      <p className="text-xs uppercase tracking-[0.4em] text-[#d4a843] font-semibold mb-6">
        Diario de ruta
      </p>
      <h1 className="font-[family-name:var(--font-playfair)] text-[#1e3a5f] dark:text-[#93c5fd] leading-[0.95] tracking-tight">
        <span className="block text-5xl sm:text-6xl">Eurotrip</span>
        <span className="block text-5xl sm:text-6xl mt-2">Accurso</span>
        <span className="block text-7xl sm:text-8xl mt-3 text-[#d4a843]">2026</span>
      </h1>

      <div className="w-full max-w-md px-4 mt-16 mb-12">
        <RouteMapSVG />
      </div>

      <p className="font-[family-name:var(--font-playfair)] italic text-xl text-gray-700 dark:text-gray-200 mb-2">
        25 de mayo – 4 de junio de 2026
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300 tracking-wide mb-8">
        11 días · 10 noches · ~2.540 km
      </p>
      <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">
        Países Bajos · Alemania · Austria · República Checa
      </p>
    </div>
  );
}
