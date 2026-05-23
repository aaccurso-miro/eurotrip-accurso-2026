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
      departure: { summary: "Soleado y cálido", highC: 22, lowC: 13, rainPct: 10 },
      arrival: { summary: "Nublado, posible llovizna", highC: 15, lowC: 7, rainPct: 40 },
    },
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
      departure: {
        summary: "Soleado de mañana, nubes por la tarde",
        highC: 21,
        lowC: 10,
        rainPct: 30,
      },
      arrival: { summary: "Parcialmente nublado, agradable", highC: 19, lowC: 8, rainPct: 25 },
    },
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
      departure: { summary: "Mayormente soleado, tarde cálida", highC: 19, lowC: 8, rainPct: 20 },
      arrival: { summary: "Soleado y cálido", highC: 26, lowC: 13, rainPct: 15 },
    },
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
      departure: { summary: "Parcialmente nublado, templado", highC: 21, lowC: 10, rainPct: 30 },
      arrival: {
        summary: "Parcialmente nublado, posible lluvia leve",
        highC: 19,
        lowC: 9,
        rainPct: 35,
      },
    },
    weatherNote: "Pronóstico a 8 días: confiabilidad reducida, revisar más cerca del viaje.",
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
      departure: {
        summary: "Parcialmente nublado, inicio de verano",
        highC: 20,
        lowC: 10,
        rainPct: 35,
      },
      arrival: { summary: "Nublado, posible llovizna", highC: 21, lowC: 11, rainPct: 35 },
    },
    weatherNote:
      "Promedio estacional (pronóstico real disponible más cerca del viaje). Si llueve fuerte, los Wasserspiele igual se hacen.",
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
      departure: { summary: "Parcialmente nublado, agradable", highC: 21, lowC: 11, rainPct: 30 },
      arrival: { summary: "Nublado, posible lluvia leve", highC: 19, lowC: 10, rainPct: 40 },
    },
    weatherNote: "Promedio estacional (pronóstico real disponible más cerca del viaje).",
  },
];

export function getRoadSheetBySlug(slug: string): RoadSheet | undefined {
  return roadSheets.find((s) => s.slug === slug);
}
