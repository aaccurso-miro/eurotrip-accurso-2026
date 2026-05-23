import RouteMapSVG from "./RouteMapSVG";

export default function BackCoverPage() {
  return (
    <div className="flex flex-col items-center text-center pt-20">
      <p className="text-[11px] uppercase tracking-[0.4em] text-[#d4a843] font-semibold mb-4">
        Hasta acá llegamos
      </p>
      <h1 className="font-[family-name:var(--font-playfair)] text-6xl sm:text-7xl text-[#1e3a5f] dark:text-[#93c5fd] leading-none">
        ¡Buen viaje!
      </h1>

      <div className="w-full max-w-sm px-4 mt-10 mb-10">
        <RouteMapSVG compact />
      </div>

      <p className="font-[family-name:var(--font-playfair)] italic text-base text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
        &ldquo;El verdadero viaje de descubrimiento no consiste en buscar nuevos paisajes,
        sino en mirar con nuevos ojos.&rdquo;
      </p>
      <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1.5 tracking-wide">
        — Marcel Proust
      </p>

      <div className="mt-12 pt-4 border-t border-gray-200 dark:border-gray-700 max-w-xs mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">
          Familia Accurso · mayo–junio 2026
        </p>
      </div>
    </div>
  );
}
