export interface City {
  id: string;
  name: string;
  country: string;
  flag: string;
  coords: [number, number]; // [lat, lng]
  intro: string;
  photos: string[];
  nights: number;
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
      "Punto de partida y llegada del viaje. La ciudad de los canales, bicicletas y museos de clase mundial. Desde acá arrancamos la aventura en auto hacia el corazón de Europa.",
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
    id: "leipzig",
    name: "Leipzig",
    country: "Alemania",
    flag: "🇩🇪",
    coords: [51.3397, 12.3731],
    intro:
      "Ciudad cultural de Sajonia, donde Bach fue director musical y se gestó la reunificación alemana. Un centro histórico compacto y encantador, perfecto para una parada de descanso antes de volver a casa.",
    photos: ["/images/cities/leipzig-01.jpg"],
    nights: 1,
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
      "Auerbachs Keller",
      "Kaffeehaus Riquet",
      "Centro compacto y caminable",
    ],
  },
];
