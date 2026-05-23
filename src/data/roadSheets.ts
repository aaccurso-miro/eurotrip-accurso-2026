export interface DrivingStop {
  name: string;
  region: string;
  distanceFromStartKm: number;
  estimatedArrival: string; // "HH:MM"
  durationMin: number;
  purpose: string;
  mapsUrl?: string;
}

export interface WeatherSnapshot {
  summary: string;
  highC: number;
  lowC: number;
  rainPct?: number;
}

/** A waypoint in the high-level route overview shown above the timeline. */
export interface RouteWaypoint {
  label: string;          // "Colonia"
  /** Highway(s) used to get FROM the previous waypoint TO this one. Omit for the first waypoint. */
  via?: string;
}

export interface RoadSheet {
  slug: string;           // "dia-1", "dia-2", ...
  dayNumber: number;
  date: string;           // "25 mayo 2026"
  weekday: string;        // "Lunes"
  from: string;
  to: string;
  destCityId?: string;    // matches City.id (used to look up hotel)
  totalKm: number;
  estimatedHours: string;
  departureTime: string;  // "06:00"
  startAddress: string;
  arrivalEstimate: string; // "~13:00"
  routeMapsUrl?: string;
  stops: DrivingStop[];
  /** Sequential waypoints from start to end, with highway labels between them. */
  routeOverview?: RouteWaypoint[];
  weatherForecast?: {
    fetchedOn: string;
    departure: WeatherSnapshot;
    arrival: WeatherSnapshot;
  };
  /** Optional caveat shown below the weather block (e.g. seasonal average vs forecast). */
  weatherNote?: string;
}

export const roadSheets: RoadSheet[] = [
  // ============================================================
  // Día 1 — Lunes 25 mayo · Ámsterdam → Rothenburg ob der Tauber
  // ============================================================
  {
    slug: "dia-1",
    dayNumber: 1,
    date: "25 mayo 2026",
    weekday: "Lunes",
    from: "Ámsterdam",
    to: "Rothenburg ob der Tauber",
    destCityId: "rothenburg",
    totalKm: 600,
    estimatedHours: "5h30 – 6h",
    departureTime: "06:00",
    startAddress: "Orcastraat 3, Ámsterdam",
    arrivalEstimate: "~13:00",
    routeMapsUrl:
      "https://www.google.com/maps/dir/Orcastraat+3,+Amsterdam,+Netherlands/Rastst%C3%A4tte+Ohligser+Heide+West,+Germany/Rastst%C3%A4tte+Spessart+S%C3%BCd,+Germany/Rothenburg+ob+der+Tauber,+Germany/",
    routeOverview: [
      { label: "Ámsterdam" },
      { label: "Colonia", via: "A2 → A3" },
      { label: "Frankfurt", via: "A3" },
      { label: "Würzburg", via: "A3" },
      { label: "Rothenburg", via: "A7/A6" },
    ],
    stops: [
      {
        name: "Raststätte Ohligser Heide West",
        region: "Alemania, A3",
        distanceFromStartKm: 230,
        estimatedArrival: "08:15",
        durationMin: 20,
        purpose: "Café + baño",
        mapsUrl:
          "https://www.google.com/maps/search/Rastst%C3%A4tte+Ohligser+Heide+West",
      },
      {
        name: "Raststätte Spessart Süd",
        region: "Alemania, A3",
        distanceFromStartKm: 440,
        estimatedArrival: "10:50",
        durationMin: 45,
        purpose: "Almuerzo",
        mapsUrl:
          "https://www.google.com/maps/search/Rastst%C3%A4tte+Spessart+S%C3%BCd",
      },
    ],
    weatherForecast: {
      fetchedOn: "23 mayo 2026",
      departure: { summary: "Soleado y cálido", highC: 24, lowC: 14, rainPct: 5 },
      arrival: { summary: "Soleado y cálido", highC: 25, lowC: 13, rainPct: 5 },
    },
    weatherNote:
      "Pronóstico real a 2 días. Las fuentes divergen para Rothenburg (rango 20-30°C); revisar la mañana del viaje.",
  },

  // ============================================================
  // Día 2 — Martes 26 mayo · Rothenburg → Salzburgo
  // ============================================================
  {
    slug: "dia-2",
    dayNumber: 2,
    date: "26 mayo 2026",
    weekday: "Martes",
    from: "Rothenburg ob der Tauber",
    to: "Salzburgo",
    destCityId: "salzburg",
    totalKm: 350,
    estimatedHours: "3h40 – 4h",
    departureTime: "08:30",
    startAddress: "Winterbachstraße 4, 91541 Rothenburg o.T. (Gästehaus Eberlein)",
    arrivalEstimate: "~13:30",
    routeMapsUrl:
      "https://www.google.com/maps/dir/Rothenburg+ob+der+Tauber,+Germany/Rastst%C3%A4tte+Chiemsee+Nord/Salzburg,+Austria/",
    routeOverview: [
      { label: "Rothenburg" },
      { label: "Núremberg", via: "A6" },
      { label: "Múnich", via: "A9" },
      { label: "Chiemsee", via: "A8" },
      { label: "Salzburgo", via: "A8" },
    ],
    stops: [
      {
        name: "Raststätte Chiemsee Nord",
        region: "Alemania, A8 · Bernau am Chiemsee",
        distanceFromStartKm: 270,
        estimatedArrival: "11:45",
        durationMin: 35,
        purpose: "Café + baño · vista al lago",
        mapsUrl:
          "https://www.google.com/maps/search/Rastst%C3%A4tte+Chiemsee+Nord+A8+Bernau",
      },
    ],
    weatherForecast: {
      fetchedOn: "23 mayo 2026",
      departure: { summary: "Soleado y cálido", highC: 26, lowC: 14, rainPct: 10 },
      arrival: { summary: "Lluvia probable, llevar paraguas", highC: 19, lowC: 8, rainPct: 60 },
    },
    weatherNote:
      "Pronóstico a 3 días. Los modelos muestran patrón lluvioso en la zona alpina al llegar a Salzburgo — paraguas/chaquetón a mano.",
  },

  // ============================================================
  // Día 4 — Jueves 28 mayo · Salzburgo → Admont → Viena
  // ============================================================
  {
    slug: "dia-4",
    dayNumber: 4,
    date: "28 mayo 2026",
    weekday: "Jueves",
    from: "Salzburgo",
    to: "Viena",
    destCityId: "viena",
    totalKm: 420,
    estimatedHours: "~4h45 de manejo (sin contar la visita a Admont)",
    departureTime: "07:30",
    startAddress: "Linzer Bundesstraße 54, 5023 Salzburg (Hotel Turnerwirt)",
    arrivalEstimate: "~16:30",
    routeMapsUrl:
      "https://www.google.com/maps/dir/Hotel+Turnerwirt,+Linzer+Bundesstra%C3%9Fe+54,+5023+Salzburg/Stift+Admont,+Austria/Landzeit+St.+P%C3%B6lten,+Austria/Linke+Wienzeile+224,+1150+Wien/",
    routeOverview: [
      { label: "Salzburgo" },
      { label: "Admont", via: "A10 → A9 → B146" },
      { label: "Linz (cerca)", via: "A9 → A1" },
      { label: "St. Pölten", via: "A1" },
      { label: "Viena", via: "A1" },
    ],
    stops: [
      {
        name: "Stift Admont (visita a la biblioteca)",
        region: "Austria, Estiria",
        distanceFromStartKm: 160,
        estimatedArrival: "09:30",
        durationMin: 180,
        purpose: "Biblioteca monástica + almuerzo en Gasthaus cercano",
        mapsUrl: "https://www.google.com/maps/search/Stift+Admont+Austria",
      },
      {
        name: "Landzeit St. Pölten",
        region: "Austria, A1 Westautobahn",
        distanceFromStartKm: 290,
        estimatedArrival: "14:00",
        durationMin: 30,
        purpose: "Café + baño",
        mapsUrl: "https://www.google.com/maps/search/Landzeit+St.+P%C3%B6lten+A1",
      },
    ],
    weatherForecast: {
      fetchedOn: "23 mayo 2026",
      departure: { summary: "Nublado con chubascos probables", highC: 19, lowC: 8, rainPct: 65 },
      arrival: { summary: "Soleado y agradable", highC: 26, lowC: 13, rainPct: 15 },
    },
    weatherNote:
      "Pronóstico a 5 días. Salzburgo a la salida puede estar lluvioso; Viena se proyecta estable. Modelos divergen — confirmar pocos días antes.",
  },

  // ============================================================
  // Día 7 — Domingo 31 mayo · Viena → Praga
  // ============================================================
  {
    slug: "dia-7",
    dayNumber: 7,
    date: "31 mayo 2026",
    weekday: "Domingo",
    from: "Viena",
    to: "Praga",
    destCityId: "praga",
    totalKm: 330,
    estimatedHours: "3h30 – 4h",
    departureTime: "13:30",
    startAddress: "Linke Wienzeile 224, 1150 Wien (Leonardo Hotel Schönbrunn)",
    arrivalEstimate: "~17:30",
    routeMapsUrl:
      "https://www.google.com/maps/dir/Linke+Wienzeile+224,+1150+Wien/Rastst%C3%A4tte+Hochleithen+A5+Austria/Prague,+Czechia/",
    routeOverview: [
      { label: "Viena" },
      { label: "Hochleithen", via: "A5" },
      { label: "Brno (cerca)", via: "D2/D1" },
      { label: "Praga", via: "D1" },
    ],
    stops: [
      {
        name: "Raststätte Hochleithen",
        region: "Austria, A5 Nordautobahn",
        distanceFromStartKm: 40,
        estimatedArrival: "14:15",
        durationMin: 25,
        purpose: "Café + baño · última parada antes de cruzar a Chequia",
        mapsUrl: "https://www.google.com/maps/search/Rastst%C3%A4tte+Hochleithen+A5",
      },
    ],
    weatherForecast: {
      fetchedOn: "23 mayo 2026",
      departure: { summary: "Parcialmente nublado, templado", highC: 21, lowC: 10, rainPct: 25 },
      arrival: { summary: "Parcialmente nublado, fresco", highC: 19, lowC: 8, rainPct: 25 },
    },
    weatherNote:
      "Promedio climatológico — no es pronóstico real a 8 días vista. Revisar pocos días antes del viaje.",
  },

  // ============================================================
  // Día 10 — Miércoles 3 junio · Praga → Kassel (Wasserspiele 14:30!)
  // ============================================================
  {
    slug: "dia-10",
    dayNumber: 10,
    date: "3 junio 2026",
    weekday: "Miércoles",
    from: "Praga",
    to: "Kassel",
    destCityId: "kassel",
    totalKm: 450,
    estimatedHours: "4h30 – 5h",
    departureTime: "09:00",
    startAddress: "Koulova 15, 160 00 Praga 6 (Grand Hotel International)",
    arrivalEstimate: "~13:30 (a tiempo para los Wasserspiele 14:30)",
    routeMapsUrl:
      "https://www.google.com/maps/dir/Grand+Hotel+International+Prague/Rastst%C3%A4tte+Rozvadov+D5/Serways+Rastst%C3%A4tte+N%C3%BCrnberg-Feucht+Ost/Kassel,+Germany/",
    routeOverview: [
      { label: "Praga" },
      { label: "Pilsen", via: "D5" },
      { label: "Núremberg", via: "A6/A93" },
      { label: "Würzburg", via: "A3/A7" },
      { label: "Kassel", via: "A7" },
    ],
    stops: [
      {
        name: "Raststätte Rozvadov",
        region: "República Checa, D5 · frontera CZ/DE",
        distanceFromStartKm: 150,
        estimatedArrival: "10:45",
        durationMin: 20,
        purpose: "Café + baño · última parada con CZK",
        mapsUrl:
          "https://www.google.com/maps/search/Rastst%C3%A4tte+Rozvadov+D5",
      },
      {
        name: "Serways Nürnberg-Feucht Ost",
        region: "Alemania, A9 · sur de Núremberg",
        distanceFromStartKm: 280,
        estimatedArrival: "12:15",
        durationMin: 35,
        purpose: "Almuerzo rápido (ojo: hay que llegar a Kassel ~13:30)",
        mapsUrl:
          "https://www.google.com/maps/search/Serways+N%C3%BCrnberg-Feucht+Ost",
      },
    ],
    weatherForecast: {
      fetchedOn: "23 mayo 2026",
      departure: { summary: "Parcialmente nublado", highC: 19, lowC: 9, rainPct: 30 },
      arrival: { summary: "Templado, cielos variables", highC: 22, lowC: 13, rainPct: 35 },
    },
    weatherNote:
      "Promedio climatológico de junio — no es pronóstico real a 11 días. Si llueve fuerte, los Wasserspiele igual se hacen.",
  },

  // ============================================================
  // Día 11 — Jueves 4 junio · Kassel → Ámsterdam
  // ============================================================
  {
    slug: "dia-11",
    dayNumber: 11,
    date: "4 junio 2026",
    weekday: "Jueves",
    from: "Kassel",
    to: "Ámsterdam",
    totalKm: 390,
    estimatedHours: "3h45 – 4h30",
    departureTime: "10:00",
    startAddress: "Im Druseltal 93, 34131 Kassel (MountainPark Hotel)",
    arrivalEstimate: "~14:30",
    routeMapsUrl:
      "https://www.google.com/maps/dir/MountainPark+Hotel,+Kassel/Rastst%C3%A4tte+Bentheimer+Wald+S%C3%BCd/Amsterdam,+Netherlands/",
    routeOverview: [
      { label: "Kassel" },
      { label: "Dortmund (norte)", via: "A44" },
      { label: "Osnabrück", via: "A1/A30" },
      { label: "Bad Bentheim", via: "A30" },
      { label: "Ámsterdam", via: "A1 NL → A2" },
    ],
    stops: [
      {
        name: "Raststätte Bentheimer Wald Süd",
        region: "Alemania, A30 · Bad Bentheim (última antes de NL)",
        distanceFromStartKm: 355,
        estimatedArrival: "13:30",
        durationMin: 25,
        purpose: "Café + baño · última parada en Alemania",
        mapsUrl:
          "https://www.google.com/maps/search/Rastst%C3%A4tte+Bentheimer+Wald+S%C3%BCd",
      },
    ],
    weatherForecast: {
      fetchedOn: "23 mayo 2026",
      departure: { summary: "Templado, posible llovizna", highC: 22, lowC: 13, rainPct: 35 },
      arrival: { summary: "Nublado, llovizna posible", highC: 19, lowC: 12, rainPct: 40 },
    },
    weatherNote:
      "Promedio climatológico de junio — no es pronóstico real a 12 días.",
  },
];

export function getRoadSheetBySlug(slug: string): RoadSheet | undefined {
  return roadSheets.find((s) => s.slug === slug);
}
