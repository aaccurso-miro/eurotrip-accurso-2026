import { Fragment } from "react";
import { Coffee, Hotel, Cloud, MapPin } from "lucide-react";
import type { RoadSheet } from "@/data/roadSheets";
import { cities } from "@/data/cities";

function RouteOverview({ waypoints }: { waypoints: RoadSheet["routeOverview"] }) {
  if (!waypoints || waypoints.length === 0) return null;
  return (
    <section className="print-keep mb-5" aria-labelledby="route-overview-heading">
      <h2 id="route-overview-heading" className="sr-only">
        Resumen visual de la ruta
      </h2>
      <div className="flex items-start">
        {waypoints.map((wp, i) => (
          <Fragment key={`${wp.label}-${i}`}>
            {i > 0 && (
              <div className="flex-1 flex flex-col items-center min-w-0 pt-3 px-0.5">
                <div className="w-full h-px bg-gray-300 dark:bg-gray-600" />
                {wp.via && (
                  <span className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 whitespace-nowrap mt-0.5">
                    {wp.via}
                  </span>
                )}
              </div>
            )}
            <div className="flex flex-col items-center shrink-0 max-w-[72px] sm:max-w-[90px]">
              <span className="text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-200 mb-1 text-center leading-tight">
                {wp.label}
              </span>
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  i === 0 || i === waypoints.length - 1
                    ? "bg-[#1e3a5f] dark:bg-[#93c5fd]"
                    : "bg-[#d4a843]"
                }`}
                aria-hidden="true"
              />
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}

export default function RoadSheetArticle({ sheet }: { sheet: RoadSheet }) {
  const destCity = sheet.destCityId
    ? cities.find((c) => c.id === sheet.destCityId)
    : undefined;
  const totalStopMin = sheet.stops.reduce((sum, s) => sum + s.durationMin, 0);
  const headerTotal = `${sheet.estimatedHours} · ${totalStopMin} min en paradas`;

  return (
    <article>
      <header className="print-keep border-b border-gray-200 dark:border-gray-700 pb-4 mb-5">
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

      <RouteOverview waypoints={sheet.routeOverview} />

      <section className="print-keep mb-6" aria-labelledby={`timeline-heading-${sheet.slug}`}>
        <h2 id={`timeline-heading-${sheet.slug}`} className="sr-only">
          Itinerario del tramo
        </h2>
        <ol className="relative space-y-5">
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

          {sheet.stops.map((stop) => (
            <li
              key={`${stop.name}-${stop.distanceFromStartKm}`}
              className="flex gap-4"
            >
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 print:grid-cols-2 print:gap-3">
        {destCity?.hotel && (
          <section className="print-keep rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <Hotel size={14} className="text-[#d4a843]" aria-hidden="true" />
              <h2 className="text-[11px] uppercase tracking-widest font-semibold text-gray-700 dark:text-gray-200">
                Hotel destino
              </h2>
            </div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100 leading-tight">
              {destCity.hotel.name}
            </p>
            <a
              href={destCity.hotel.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-[#1e3a5f] dark:text-[#93c5fd] underline break-all leading-tight inline-block mb-2"
            >
              {destCity.hotel.website.replace(/^https?:\/\//, "")}
            </a>
            {destCity.hotel.address && (
              <p className="text-xs text-gray-700 dark:text-gray-300 leading-snug mb-1">
                {destCity.hotel.address}
              </p>
            )}
            {destCity.hotel.phone && (
              <p className="text-xs text-gray-700 dark:text-gray-300">
                <span className="text-gray-500 dark:text-gray-400">Tel: </span>
                <a
                  href={`tel:${destCity.hotel.phone.replace(/\s+/g, "")}`}
                  className="underline decoration-dotted"
                >
                  {destCity.hotel.phone}
                </a>
              </p>
            )}
          </section>
        )}

        <section className="print-keep rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <Cloud size={14} className="text-[#d4a843]" aria-hidden="true" />
            <h2 className="text-[11px] uppercase tracking-widest font-semibold text-gray-700 dark:text-gray-200">
              Clima previsto
            </h2>
          </div>
          {sheet.weatherForecast ? (
            <dl className="space-y-1.5 text-xs">
              <div>
                <dt className="text-gray-500 dark:text-gray-400">
                  {sheet.from} (salida):
                </dt>
                <dd className="text-gray-700 dark:text-gray-300 leading-snug">
                  {sheet.weatherForecast.departure.summary}
                  <span className="font-mono">
                    {" · "}
                    {sheet.weatherForecast.departure.highC}° /{" "}
                    {sheet.weatherForecast.departure.lowC}°
                  </span>
                  {typeof sheet.weatherForecast.departure.rainPct === "number" && (
                    <span className="text-gray-500 dark:text-gray-400">
                      {" · "}lluvia {sheet.weatherForecast.departure.rainPct}%
                    </span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500 dark:text-gray-400">
                  {sheet.to} (llegada):
                </dt>
                <dd className="text-gray-700 dark:text-gray-300 leading-snug">
                  {sheet.weatherForecast.arrival.summary}
                  <span className="font-mono">
                    {" · "}
                    {sheet.weatherForecast.arrival.highC}° /{" "}
                    {sheet.weatherForecast.arrival.lowC}°
                  </span>
                  {typeof sheet.weatherForecast.arrival.rainPct === "number" && (
                    <span className="text-gray-500 dark:text-gray-400">
                      {" · "}lluvia {sheet.weatherForecast.arrival.rainPct}%
                    </span>
                  )}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
              Sin pronóstico cargado.
            </p>
          )}
          {sheet.weatherNote && (
            <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-2 italic leading-snug">
              {sheet.weatherNote}
            </p>
          )}
        </section>
      </div>

      {sheet.weatherForecast && (
        <p className="print-hidden text-[10px] text-gray-400 dark:text-gray-500 mt-3 italic text-center">
          Pronóstico cargado el {sheet.weatherForecast.fetchedOn}. Revisá la mañana del viaje y reimprimí si cambió.
        </p>
      )}
    </article>
  );
}
