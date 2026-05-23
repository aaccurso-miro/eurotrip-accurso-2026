import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Coffee, Hotel, Cloud, MapPin } from "lucide-react";
import { getRoadSheetBySlug, roadSheets } from "@/data/roadSheets";
import { cities } from "@/data/cities";
import PrintButton from "../PrintButton";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return roadSheets.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const sheet = getRoadSheetBySlug(slug);
  if (!sheet) return { title: "Hoja de Ruta · Eurotrip Accurso 2026" };
  return {
    title: `Día ${sheet.dayNumber}: ${sheet.from} → ${sheet.to} · Hoja de Ruta`,
  };
}

export default async function HojaDeRutaSlugPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const sheet = getRoadSheetBySlug(slug);
  if (!sheet) notFound();

  const destCity = sheet.destCityId
    ? cities.find((c) => c.id === sheet.destCityId)
    : undefined;
  const totalStopMin = sheet.stops.reduce((sum, s) => sum + s.durationMin, 0);
  const headerTotal = `${sheet.estimatedHours} · ${totalStopMin} min en paradas`;

  return (
    <main className="min-h-screen bg-[#faf5eb] dark:bg-[#0f172a] py-10 px-4 print:bg-white print:py-0">
      <div className="max-w-2xl mx-auto">
        {/* On-screen-only top bar */}
        <div className="print-hidden mb-6 flex items-center justify-between gap-3">
          <Link
            href="/hoja-de-ruta"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-[#1e3a5f] dark:hover:text-[#93c5fd]"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Todas las hojas
          </Link>
          <PrintButton />
        </div>

        {/* The printable sheet */}
        <article className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-md print:shadow-none print:rounded-none p-8 sm:p-10 print:p-0">
          {/* Header */}
          <header className="print-keep border-b border-gray-200 dark:border-gray-700 pb-5 mb-6">
            <p className="text-xs uppercase tracking-widest text-[#d4a843] font-semibold mb-1">
              Día {sheet.dayNumber} · {sheet.weekday} {sheet.date}
            </p>
            <h1 className="text-2xl sm:text-3xl font-[family-name:var(--font-playfair)] text-[#1e3a5f] dark:text-[#93c5fd] mb-2">
              {sheet.from} → {sheet.to}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {sheet.totalKm} km · {headerTotal}
            </p>
            {sheet.routeMapsUrl && (
              <a
                href={sheet.routeMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="print-hidden mt-2 inline-block text-xs text-[#1e3a5f] dark:text-[#93c5fd] underline"
              >
                Abrir ruta completa en Google Maps
              </a>
            )}
          </header>

          {/* Timeline */}
          <section className="print-keep mb-8" aria-labelledby="timeline-heading">
            <h2 id="timeline-heading" className="sr-only">
              Itinerario del tramo
            </h2>
            <ol className="relative space-y-6">
              {/* Departure */}
              <li className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="w-3 h-3 rounded-full bg-[#1e3a5f] dark:bg-[#93c5fd] mt-1.5" />
                  <span className="flex-1 w-px bg-gray-300 dark:bg-gray-600 mt-1" />
                </div>
                <div className="flex-1 pb-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-lg font-bold text-[#1e3a5f] dark:text-[#93c5fd] font-mono">
                      {sheet.departureTime}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Salida
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 dark:text-gray-100 mt-0.5">
                    {sheet.startAddress}
                  </p>
                </div>
              </li>

              {/* Stops */}
              {sheet.stops.map((stop) => (
                <li key={`${stop.name}-${stop.distanceFromStartKm}`} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="w-3 h-3 rounded-full bg-[#d4a843] mt-1.5" />
                    <span className="flex-1 w-px bg-gray-300 dark:bg-gray-600 mt-1" />
                  </div>
                  <div className="flex-1 pb-1">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="text-lg font-bold text-[#1e3a5f] dark:text-[#93c5fd] font-mono">
                        ~{stop.estimatedArrival}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Parada · km {stop.distanceFromStartKm}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100 mt-0.5">
                      {stop.mapsUrl ? (
                        <a
                          href={stop.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {stop.name}
                        </a>
                      ) : (
                        stop.name
                      )}
                      <span className="font-normal text-gray-500 dark:text-gray-400">
                        {" "}
                        — {stop.region}
                      </span>
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5 flex items-center gap-1.5">
                      <Coffee size={12} className="text-[#d4a843]" aria-hidden="true" />
                      {stop.durationMin} min · {stop.purpose}
                    </p>
                  </div>
                </li>
              ))}

              {/* Arrival */}
              <li className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="w-3 h-3 rounded-full bg-[#1e3a5f] dark:bg-[#93c5fd] mt-1.5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-lg font-bold text-[#1e3a5f] dark:text-[#93c5fd] font-mono">
                      {sheet.arrivalEstimate}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Llegada · km {sheet.totalKm}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100 mt-0.5 flex items-center gap-1.5">
                    <MapPin size={12} className="text-[#d4a843]" aria-hidden="true" />
                    {sheet.to}
                  </p>
                </div>
              </li>
            </ol>
          </section>

          {/* Hotel destination */}
          {destCity?.hotel && (
            <section className="print-keep mb-6 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Hotel size={16} className="text-[#d4a843]" aria-hidden="true" />
                <h2 className="text-sm uppercase tracking-widest font-semibold text-gray-700 dark:text-gray-200">
                  Hotel destino
                </h2>
              </div>
              <p className="text-base font-medium text-gray-800 dark:text-gray-100">
                {destCity.hotel.name}
              </p>
              <a
                href={destCity.hotel.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#1e3a5f] dark:text-[#93c5fd] underline break-all"
              >
                {destCity.hotel.website}
              </a>
              <dl className="mt-3 space-y-1.5 text-sm">
                <div className="flex gap-2">
                  <dt className="text-gray-500 dark:text-gray-400 w-24 shrink-0">
                    Dirección:
                  </dt>
                  <dd className="text-gray-700 dark:text-gray-300 flex-1">
                    {destCity.hotel.address ?? (
                      <span className="inline-block w-full border-b border-dashed border-gray-300 dark:border-gray-600 h-4" />
                    )}
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-gray-500 dark:text-gray-400 w-24 shrink-0">
                    Teléfono:
                  </dt>
                  <dd className="text-gray-700 dark:text-gray-300 flex-1">
                    {destCity.hotel.phone ? (
                      <a
                        href={`tel:${destCity.hotel.phone.replace(/\s+/g, "")}`}
                        className="underline decoration-dotted"
                      >
                        {destCity.hotel.phone}
                      </a>
                    ) : (
                      <span className="inline-block w-full border-b border-dashed border-gray-300 dark:border-gray-600 h-4" />
                    )}
                  </dd>
                </div>
              </dl>
            </section>
          )}

          {/* Weather box */}
          <section className="print-keep rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Cloud size={16} className="text-[#d4a843]" aria-hidden="true" />
              <h2 className="text-sm uppercase tracking-widest font-semibold text-gray-700 dark:text-gray-200">
                Clima previsto
              </h2>
            </div>
            <dl className="space-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="text-gray-500 dark:text-gray-400 w-40 shrink-0">
                  {sheet.from} (salida):
                </dt>
                <dd className="text-gray-700 dark:text-gray-300 flex-1">
                  {sheet.weatherForecast ? (
                    <>
                      {sheet.weatherForecast.departure.summary} ·{" "}
                      <span className="font-mono">
                        {sheet.weatherForecast.departure.highC}° /{" "}
                        {sheet.weatherForecast.departure.lowC}°
                      </span>
                      {typeof sheet.weatherForecast.departure.rainPct === "number" && (
                        <span className="text-gray-500 dark:text-gray-400">
                          {" · lluvia "}
                          {sheet.weatherForecast.departure.rainPct}%
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="inline-block w-full border-b border-dashed border-gray-300 dark:border-gray-600 h-4" />
                  )}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-500 dark:text-gray-400 w-40 shrink-0">
                  {sheet.to} (llegada):
                </dt>
                <dd className="text-gray-700 dark:text-gray-300 flex-1">
                  {sheet.weatherForecast ? (
                    <>
                      {sheet.weatherForecast.arrival.summary} ·{" "}
                      <span className="font-mono">
                        {sheet.weatherForecast.arrival.highC}° /{" "}
                        {sheet.weatherForecast.arrival.lowC}°
                      </span>
                      {typeof sheet.weatherForecast.arrival.rainPct === "number" && (
                        <span className="text-gray-500 dark:text-gray-400">
                          {" · lluvia "}
                          {sheet.weatherForecast.arrival.rainPct}%
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="inline-block w-full border-b border-dashed border-gray-300 dark:border-gray-600 h-4" />
                  )}
                </dd>
              </div>
            </dl>
            {sheet.weatherNote && (
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-2 italic">
                {sheet.weatherNote}
              </p>
            )}
            {sheet.weatherForecast && (
              <p className="print-hidden text-[10px] text-gray-400 dark:text-gray-500 mt-3 italic">
                Pronóstico cargado el {sheet.weatherForecast.fetchedOn}. Revisá la mañana del viaje y reimprimí si cambió.
              </p>
            )}
          </section>
        </article>
      </div>
    </main>
  );
}
