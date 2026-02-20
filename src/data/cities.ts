export interface HotelBooking {
  name: string;
  checkIn: string;  // e.g. "25 may"
  checkOut: string; // e.g. "26 may"
  rooms: string;    // "—" or "2 habitaciones"
  website: string;
}

export interface City {
  id: string;
  name: string;
  country: string;
  flag: string;
  coords: [number, number]; // [lat, lng]
  intro: string;
  photos: string[];
  nights: number;
  hotel?: HotelBooking;
  weather: {
    avgHighC: number;
    avgLowC: number;
    rainProbability: number; // percentage
    sunriseTime: string;
    sunsetTime: string;
  };
  currency: string;
  currencyCode: string;
  language: string;
  highlights: string[];
}

export const cities: City[] = [
  {
    id: "amsterdam",
    name: "Ámsterdam",
    country: "Países Bajos",
    flag: "🇳🇱",
    coords: [52.3676, 4.9041],
    intro:
      "Punto de partida y llegada del viaje. La ciudad de los canales, bicicletas y museos de clase mundial. Desde acá arrancamos nuestro recorrido en auto hacia el corazón de Europa.",
    photos: ["/images/cities/amsterdam-01.jpg"],
    nights: 0,
    weather: {
      avgHighC: 17,
      avgLowC: 9,
      rainProbability: 40,
      sunriseTime: "05:40",
      sunsetTime: "21:40",
    },
    currency: "Euro",
    currencyCode: "EUR",
    language: "Neerlandés",
    highlights: ["Canales", "Punto de partida", "Casa"],
  },
  {
    id: "rothenburg",
    name: "Rothenburg ob der Tauber",
    country: "Alemania",
    flag: "🇩🇪",
    coords: [49.3769, 10.1789],
    intro:
      "Un pueblo medieval sacado de un cuento de hadas. Calles empedradas, casas con entramado de madera y murallas que se pueden recorrer a pie. El famoso Plönlein es la postal perfecta.",
    photos: ["/images/cities/rothenburg-01.jpg"],
    nights: 1,
    hotel: {
      name: "Gästehaus Eberlein",
      checkIn: "25 may",
      checkOut: "26 may",
      rooms: "—",
      website: "https://www.hotel-eberlein.de/",
    },
    weather: {
      avgHighC: 19,
      avgLowC: 8,
      rainProbability: 35,
      sunriseTime: "05:35",
      sunsetTime: "21:05",
    },
    currency: "Euro",
    currencyCode: "EUR",
    language: "Alemán",
    highlights: [
      "Plönlein",
      "Murallas medievales",
      "Schneeballen (dulce típico)",
      "Marktplatz",
    ],
  },
  {
    id: "salzburg",
    name: "Salzburgo",
    country: "Austria",
    flag: "🇦🇹",
    coords: [47.8095, 13.055],
    intro:
      "La ciudad natal de Mozart, rodeada por los Alpes. Su centro histórico es Patrimonio de la Humanidad, con la imponente Fortaleza Hohensalzburg dominando el horizonte y jardines barrocos espectaculares.",
    photos: ["/images/cities/salzburg-01.jpg"],
    nights: 2,
    hotel: {
      name: "Hotel Turnerwirt",
      checkIn: "26 may",
      checkOut: "28 may",
      rooms: "2 habitaciones",
      website: "https://turnerwirt.at/",
    },
    weather: {
      avgHighC: 19,
      avgLowC: 8,
      rainProbability: 45,
      sunriseTime: "05:25",
      sunsetTime: "20:50",
    },
    currency: "Euro",
    currencyCode: "EUR",
    language: "Alemán",
    highlights: [
      "Fortaleza Hohensalzburg",
      "Jardines Mirabell",
      "Getreidegasse",
      "Café Tomaselli",
    ],
  },
  {
    id: "admont",
    name: "Admont",
    country: "Austria",
    flag: "🇦🇹",
    coords: [47.5744, 14.4611],
    intro:
      "Hogar de la biblioteca monástica más grande del mundo, en la Abadía de Admont (Stift Admont). Sus frescos barrocos en el techo y las estanterías doradas son un espectáculo visual único.",
    photos: ["/images/cities/admont-01.jpg"],
    nights: 0,
    weather: {
      avgHighC: 18,
      avgLowC: 7,
      rainProbability: 40,
      sunriseTime: "05:20",
      sunsetTime: "20:45",
    },
    currency: "Euro",
    currencyCode: "EUR",
    language: "Alemán",
    highlights: ["Biblioteca Stift Admont", "Frescos barrocos"],
  },
  {
    id: "viena",
    name: "Viena",
    country: "Austria",
    flag: "🇦🇹",
    coords: [48.2082, 16.3738],
    intro:
      "La capital imperial de la música clásica. Palacios grandiosos como Schönbrunn y Belvedere, cafés históricos con la mejor torta del mundo, y una elegancia que se respira en cada esquina.",
    photos: ["/images/cities/viena-01.jpg"],
    nights: 3,
    hotel: {
      name: "Leonardo Hotel Vienna Schönbrunn",
      checkIn: "28 may",
      checkOut: "31 may",
      rooms: "2 habitaciones",
      website: "https://www.leonardo-hotels.com/vienna/leonardo-hotel-vienna-schonbrunn",
    },
    weather: {
      avgHighC: 21,
      avgLowC: 11,
      rainProbability: 35,
      sunriseTime: "05:15",
      sunsetTime: "20:40",
    },
    currency: "Euro",
    currencyCode: "EUR",
    language: "Alemán",
    highlights: [
      "Palacio Schönbrunn",
      "Belvedere (El Beso de Klimt)",
      "Haus der Musik",
      "Café Sperl",
      "Stephansdom",
    ],
  },
  {
    id: "praga",
    name: "Praga",
    country: "República Checa",
    flag: "🇨🇿",
    coords: [50.0755, 14.4378],
    intro:
      "La ciudad de las cien torres, con uno de los centros históricos mejor conservados de Europa. El Castillo de Praga, el Puente de Carlos al atardecer y la cerveza más barata del continente los esperan.",
    photos: ["/images/cities/praga-01.jpg"],
    nights: 3,
    hotel: {
      name: "Grand Hotel International - Czech Leading Hotels",
      checkIn: "31 may",
      checkOut: "3 jun",
      rooms: "2 habitaciones",
      website: "https://www.hotelint.cz/en/",
    },
    weather: {
      avgHighC: 20,
      avgLowC: 10,
      rainProbability: 40,
      sunriseTime: "05:05",
      sunsetTime: "20:50",
    },
    currency: "Corona checa",
    currencyCode: "CZK",
    language: "Checo",
    highlights: [
      "Castillo de Praga",
      "Puente de Carlos",
      "Old Town Square",
      "Reloj Astronómico",
      "Prague Spring Festival",
    ],
  },
  {
    id: "kassel",
    name: "Kassel",
    country: "Alemania",
    flag: "🇩🇪",
    coords: [51.3127, 9.4797],
    intro:
      "Ciudad de Hesse famosa por el espectacular Bergpark Wilhelmshöhe, el parque de ladera más grande de Europa y Patrimonio de la Humanidad UNESCO. El Palacio de Wilhelmshöhe y la estatua de Hércules dominan las colinas.",
    photos: ["https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Wilhelmshoehe_-_Herkules_mit_Kaskaden.jpg/1280px-Wilhelmshoehe_-_Herkules_mit_Kaskaden.jpg"],
    nights: 1,
    hotel: {
      name: "MountainPark | Event- und Tagungshotel",
      checkIn: "3 jun",
      checkOut: "4 jun",
      rooms: "2 habitaciones",
      website: "https://www.mountainparkhotel.de/",
    },
    weather: {
      avgHighC: 19,
      avgLowC: 9,
      rainProbability: 35,
      sunriseTime: "05:10",
      sunsetTime: "21:05",
    },
    currency: "Euro",
    currencyCode: "EUR",
    language: "Alemán",
    highlights: [
      "Bergpark Wilhelmshöhe",
      "Palacio de Wilhelmshöhe",
      "Centro compacto y caminable",
    ],
  },
];
