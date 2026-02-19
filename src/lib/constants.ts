export const TRIP_START_DATE = new Date("2026-05-25T08:00:00+02:00");
export const TRIP_END_DATE = new Date("2026-06-04T20:00:00+02:00");

export const TOTAL_DAYS = 11;
export const TOTAL_NIGHTS = 10;
export const TOTAL_DISTANCE_KM = 2540;

export const COLORS = {
  deepBlue: "#1e3a5f",
  amber: "#d4a843",
  amberLight: "#e8c96a",
  cream: "#faf5eb",
  softWhite: "#fefdfb",
  warmGray: "#6b7280",
} as const;

export const CITY_COLORS: Record<string, string> = {
  amsterdam: "#FF6B35",
  rothenburg: "#8B4513",
  salzburg: "#2E8B57",
  admont: "#6A5ACD",
  viena: "#DC143C",
  praga: "#DAA520",
  kassel: "#4169E1",
} as const;

export const NAV_ITEMS = [
  { label: "Inicio", href: "#hero" },
  { label: "Mapa", href: "#mapa" },
  { label: "Itinerario", href: "#itinerario" },
  { label: "Ciudades", href: "#ciudades" },
  { label: "Manejo", href: "#manejo" },
  { label: "Clima", href: "#clima" },
  { label: "Moneda", href: "#moneda" },
  { label: "Equipaje", href: "#equipaje" },
] as const;
