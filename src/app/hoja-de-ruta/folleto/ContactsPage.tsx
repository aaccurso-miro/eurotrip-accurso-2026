import { Phone, ShieldAlert, Building2 } from "lucide-react";
import { cities } from "@/data/cities";

const HOTEL_CITY_ORDER = ["rothenburg", "salzburg", "viena", "praga", "kassel"];

export default function ContactsPage() {
  const hotelCities = HOTEL_CITY_ORDER.map((id) => cities.find((c) => c.id === id)).filter(
    (c): c is NonNullable<typeof c> => Boolean(c && c.hotel && c.hotel.phone)
  );

  return (
    <div className="h-full flex flex-col">
      <header className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
        <p className="text-xs uppercase tracking-widest text-[#d4a843] font-semibold mb-1">
          Por las dudas
        </p>
        <h1 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] text-[#1e3a5f] dark:text-[#93c5fd]">
          Contactos útiles
        </h1>
      </header>

      {/* Emergency */}
      <section className="print-keep rounded-xl border-2 border-[#1e3a5f] dark:border-[#93c5fd] p-4 mb-5 bg-[#faf5eb] dark:bg-transparent">
        <div className="flex items-center gap-3">
          <ShieldAlert size={28} className="text-[#1e3a5f] dark:text-[#93c5fd] shrink-0" aria-hidden="true" />
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-widest text-gray-600 dark:text-gray-300 font-semibold">
              Emergencia · funciona en toda la UE
            </p>
            <p className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-[#1e3a5f] dark:text-[#93c5fd] leading-none mt-0.5">
              112
            </p>
            <p className="text-[10px] text-gray-600 dark:text-gray-300 mt-1">
              Policía · Ambulancia · Bomberos · Sin tarjeta SIM · operador habla inglés
            </p>
          </div>
        </div>
      </section>

      {/* Hotel phones */}
      <section aria-labelledby="hotel-phones-heading" className="mb-5">
        <h2
          id="hotel-phones-heading"
          className="text-[11px] uppercase tracking-widest font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2"
        >
          <Phone size={12} className="text-[#d4a843]" aria-hidden="true" />
          Hoteles del recorrido
        </h2>
        <ul className="space-y-1.5">
          {hotelCities.map((city) => (
            <li key={city.id} className="flex items-baseline justify-between gap-3 text-xs">
              <span className="text-gray-700 dark:text-gray-200 truncate">
                <span aria-hidden="true">{city.flag}</span> {city.name}
                <span className="text-gray-500 dark:text-gray-400"> · {city.hotel!.name}</span>
              </span>
              <a
                href={`tel:${city.hotel!.phone!.replace(/\s+/g, "")}`}
                className="font-mono text-[#1e3a5f] dark:text-[#93c5fd] underline decoration-dotted whitespace-nowrap"
              >
                {city.hotel!.phone}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Write-in slots */}
      <section className="space-y-3 mb-5">
        <h2 className="text-[11px] uppercase tracking-widest font-semibold text-gray-700 dark:text-gray-200 mb-1 flex items-center gap-2">
          <Building2 size={12} className="text-[#d4a843]" aria-hidden="true" />
          Para completar antes de viajar
        </h2>
        {["Embajada / Consulado", "Seguro de viaje (asistencia)", "Tarjeta de crédito (cancelación 24h)", "Contacto en casa (emergencias)"].map((label) => (
          <div key={label} className="text-xs">
            <p className="text-gray-600 dark:text-gray-300 mb-1">{label}</p>
            <div className="border-b border-dotted border-gray-300 dark:border-gray-600 h-4" />
          </div>
        ))}
      </section>

      <footer className="mt-auto pt-4 text-[10px] text-gray-500 dark:text-gray-400 italic text-center border-t border-gray-200 dark:border-gray-700">
        Anotá los teléfonos a mano antes de salir — si el celular se queda sin batería igual los tenés acá.
      </footer>
    </div>
  );
}
