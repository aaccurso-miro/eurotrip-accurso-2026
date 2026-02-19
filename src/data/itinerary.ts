export type ActivityType =
  | "driving"
  | "sightseeing"
  | "food"
  | "music"
  | "rest"
  | "walking"
  | "culture";

export interface Activity {
  title: string;
  description: string;
  type: ActivityType;
  optional?: boolean;
}

export interface Meal {
  name: string;
  description: string;
}

export interface DayData {
  dayNumber: number;
  date: string;
  weekday: string;
  from: string;
  to: string;
  overnightCity: string;
  cityId: string;
  activities: {
    morning?: Activity[];
    afternoon?: Activity[];
    evening?: Activity[];
  };
  meals: {
    lunch?: Meal;
    merienda?: Meal;
    dinner?: Meal;
  };
  tips: string[];
}

export const itinerary: DayData[] = [
  {
    dayNumber: 1,
    date: "25 mayo",
    weekday: "Lunes",
    from: "Ámsterdam",
    to: "Rothenburg ob der Tauber",
    overnightCity: "Rothenburg",
    cityId: "rothenburg",
    activities: {
      morning: [
        {
          title: "Viaje Ámsterdam → Rothenburg",
          description:
            "~5h30-6h de manejo con 2 paradas cortas. Parada recomendada en zona Colonia (café) y zona Frankfurt/Würzburg (baño + estirar).",
          type: "driving",
        },
      ],
      afternoon: [
        {
          title: "Plönlein y casco histórico",
          description:
            "Paseo corto por el casco medieval. Foto clásica en Plönlein, la esquina más fotografiada de Alemania.",
          type: "sightseeing",
        },
        {
          title: "Marktplatz y ayuntamiento",
          description:
            "Mini vuelta por la plaza del mercado y exteriores del ayuntamiento.",
          type: "walking",
        },
      ],
      evening: [
        {
          title: "Cena en el centro",
          description: "Cenar en la plaza y volver caminando sin mover el auto.",
          type: "food",
        },
      ],
    },
    meals: {
      merienda: {
        name: "Schneeballen",
        description:
          "Dulce típico de Rothenburg: probá uno clásico con azúcar impalpable y compartan.",
      },
      dinner: {
        name: "Ratsstube o Gasthof Rödertor",
        description:
          "Ratsstube: plaza principal, cocina francona/alemana clásica. Alternativa: Gasthof Rödertor, platos contundentes estilo taberna.",
      },
    },
    tips: [
      "Si llegan cansados, coman en el centro y vuelvan caminando sin mover el auto.",
      "Las murallas, la plaza del mercado y los jardines del castillo son todo muy caminable.",
    ],
  },
  {
    dayNumber: 2,
    date: "26 mayo",
    weekday: "Martes",
    from: "Rothenburg",
    to: "Salzburgo",
    overnightCity: "Salzburgo",
    cityId: "salzburg",
    activities: {
      morning: [
        {
          title: "Viaje Rothenburg → Salzburgo",
          description:
            "Check-out temprano. ~3h40-4h de manejo con 1 parada de 30-45 min para café y estirar.",
          type: "driving",
        },
      ],
      afternoon: [
        {
          title: "Paseo por el Altstadt",
          description:
            "Primera toma de Salzburgo: centro histórico y calle Getreidegasse (tiendas y arquitectura).",
          type: "walking",
        },
      ],
      evening: [
        {
          title: "Cena típica austriaca",
          description:
            "Ambiente local con cerveza y comida contundente.",
          type: "food",
        },
      ],
    },
    meals: {
      merienda: {
        name: "Café Tomaselli o Café Bazar",
        description:
          "Café Tomaselli: clásico, lindo para sentarse. Café Bazar: vistas al río, ideal si hace buen tiempo.",
      },
      dinner: {
        name: "Augustiner Bräu Mülln o Stiegl-Keller",
        description:
          "Augustiner: beer hall/garden con ambiente local y comida simple. Stiegl-Keller: buenas vistas, cocina austriaca sin pretensión.",
      },
    },
    tips: [
      "La zona Getreidegasse tiene los famosos carteles de hierro forjado de las tiendas.",
    ],
  },
  {
    dayNumber: 3,
    date: "27 mayo",
    weekday: "Miércoles",
    from: "Salzburgo",
    to: "Salzburgo",
    overnightCity: "Salzburgo",
    cityId: "salzburg",
    activities: {
      morning: [
        {
          title: "Fortaleza Hohensalzburg",
          description:
            "Subir temprano para evitar multitudes. Plan: 2-3 horas entre vistas panorámicas y paseo por la fortaleza. Complejo 8:30-20:00, museos 9:00-19:00.",
          type: "sightseeing",
        },
      ],
      afternoon: [
        {
          title: "Jardines Mirabell + río Salzach",
          description:
            "Paseo relajado por los jardines barrocos y la ribera del río. Si llueve: Mozart's Birthplace (más corto, bajo techo).",
          type: "walking",
        },
      ],
      evening: [
        {
          title: "Cena en Salzburgo",
          description:
            "Rotar entre las opciones del día anterior.",
          type: "food",
        },
      ],
    },
    meals: {
      merienda: {
        name: "Repetir café o helado",
        description:
          "Café Tomaselli/Bazar nuevamente, o helado en el centro histórico.",
      },
      dinner: {
        name: "Stiegl-Keller o Augustiner Bräu Mülln",
        description:
          "Si quieren 'Salzburg clásico': Stiegl-Keller. Si quieren 'ambiente local y simple': Augustiner.",
      },
    },
    tips: [
      "Una sola entrada con horario fijo: la Fortaleza. El resto, libre.",
      "Palacio/Escalera del Ángel en Mirabell: lun-sáb aprox. 8:00-18:00 (gratis).",
    ],
  },
  {
    dayNumber: 4,
    date: "28 mayo",
    weekday: "Jueves",
    from: "Salzburgo",
    to: "Viena",
    overnightCity: "Viena",
    cityId: "viena",
    activities: {
      morning: [
        {
          title: "Viaje a Stift Admont",
          description:
            "Salida temprano. Salzburgo → Admont ~2h de manejo.",
          type: "driving",
        },
        {
          title: "Biblioteca Stift Admont",
          description:
            "2-3 horas: la biblioteca monástica más grande del mundo. Frescos barrocos impresionantes. En jueves debería estar abierta, pero verificar horario 2026.",
          type: "culture",
        },
      ],
      afternoon: [
        {
          title: "Viaje Admont → Viena",
          description:
            "~2h45 de manejo. Llegada a Viena, check-in y descanso largo.",
          type: "driving",
        },
        {
          title: "Descanso en hotel",
          description:
            "Tarde libre para recuperar energía después de la mañana cultural y el viaje.",
          type: "rest",
        },
      ],
      evening: [
        {
          title: "Cena cerca del hotel",
          description:
            "Gasthaus del barrio para no cruzar media ciudad el primer día.",
          type: "food",
        },
      ],
    },
    meals: {
      lunch: {
        name: "Almuerzo en Admont",
        description:
          "Opción 1: comer en un Gasthaus cerca del monasterio. Opción 2: snack + almorzar al llegar a Viena.",
      },
      dinner: {
        name: "Gasthaus cercano al hotel",
        description:
          "Si se hospedan por 6°/7° distrito, abundan opciones casuales y caminables.",
      },
    },
    tips: [
      "Verificar horario de Stift Admont antes del viaje — en mayo suele funcionar con días limitados.",
      "Para Viena, prioricen hotel caminable + ascensor + buena ubicación.",
    ],
  },
  {
    dayNumber: 5,
    date: "29 mayo",
    weekday: "Viernes",
    from: "Viena",
    to: "Viena",
    overnightCity: "Viena",
    cityId: "viena",
    activities: {
      morning: [
        {
          title: "Palacio Schönbrunn",
          description:
            "Gran clásico sin correr. Dos versiones: 1) Soft: solo jardines + exteriores (cero estrés, gratis). 2) Completo: palacio por dentro + jardines (reservar entrada).",
          type: "sightseeing",
        },
      ],
      afternoon: [
        {
          title: "Centro histórico + café vienés",
          description:
            "Paseo por Stephansdom (por fuera), calles peatonales. Merienda en Café Sperl, un clásico vienés sin apuro.",
          type: "walking",
        },
      ],
      evening: [
        {
          title: "Cena vienesa",
          description:
            "Schnitzel o Tafelspitz, los platos insignia de Viena.",
          type: "food",
        },
        {
          title: "Concierto clásico",
          description:
            "Si coincide algo lindo en Musikverein o Konzerthaus. Solo si les entusiasma, no obligatorio.",
          type: "music",
          optional: true,
        },
      ],
    },
    meals: {
      merienda: {
        name: "Café Sperl",
        description:
          "Merienda 'vienesa' sentados, sin apuro. Café clásico con pastelería.",
      },
      dinner: {
        name: "Schnitzelwirt o Plachutta Wollzeile",
        description:
          "Schnitzelwirt: popular, contundente, precio razonable (suele haber fila). Plachutta: Tafelspitz clásico, un poco más caro pero familiar.",
      },
    },
    tips: [
      "Para Schönbrunn: el parque abre temprano y es gratis. Atracciones internas requieren ticket.",
      "Las casas-museo de compositores en Viena han tenido cierres/horarios recortados, mejor no depender de ellas.",
    ],
  },
  {
    dayNumber: 6,
    date: "30 mayo",
    weekday: "Sábado",
    from: "Viena",
    to: "Viena",
    overnightCity: "Viena",
    cityId: "viena",
    activities: {
      morning: [
        {
          title: "Palacio Belvedere",
          description:
            "Hogar de 'El Beso' de Gustav Klimt y una colección espectacular de arte austriaco. Los jardines con vista a Viena son imperdibles.",
          type: "sightseeing",
        },
      ],
      afternoon: [
        {
          title: "Paseo relajado + café vienés",
          description:
            "Tarde sin agenda: explorar barrios cercanos al hotel, sentarse en un café vienés clásico con torta y melange.",
          type: "walking",
        },
      ],
      evening: [
        {
          title: "Cena en el barrio",
          description:
            "Gasthaus del barrio, probando algo que no hayan comido aún.",
          type: "food",
        },
      ],
    },
    meals: {
      merienda: {
        name: "Café vienés clásico",
        description:
          "Cualquier café del barrio: Sachertorte, Apfelstrudel, o Palatschinken con un buen Melange.",
      },
      dinner: {
        name: "Gasthaus del barrio",
        description:
          "Opción cercana al hotel, cocina casera austriaca. Probar Goulash o Kaiserschmarrn de postre.",
      },
    },
    tips: [
      "Belvedere: vale la pena tanto por el arte como por los jardines con vista panorámica.",
      "Día sábado: los cafés y tiendas del centro están abiertos y con vida.",
    ],
  },
  {
    dayNumber: 7,
    date: "31 mayo",
    weekday: "Domingo",
    from: "Viena",
    to: "Praga",
    overnightCity: "Praga",
    cityId: "praga",
    activities: {
      morning: [
        {
          title: "Haus der Musik",
          description:
            "Museo interactivo de la música, divertido para todos (no solo melómanos). Duración típica: 1h30-2h30.",
          type: "culture",
        },
      ],
      afternoon: [
        {
          title: "Viaje Viena → Praga",
          description:
            "~3h30-4h de manejo con parada. Check-in y descanso en Praga.",
          type: "driving",
        },
      ],
      evening: [
        {
          title: "Primera cena en Praga",
          description:
            "Cocina checa moderna en ambiente de taberna. Muy buena cerveza.",
          type: "food",
        },
      ],
    },
    meals: {
      merienda: {
        name: "Café Louvre",
        description:
          "Si llegan con hambre a Praga: también sirven comidas simples. Buen lugar para 'descanso con torta'.",
      },
      dinner: {
        name: "Lokál Dlouhááá",
        description:
          "Cocina checa moderna estilo taberna, muy buena cerveza. Si hay cola, ir temprano o reservar.",
      },
    },
    tips: [
      "Haus der Musik es liviano y entretenido — perfecto para la mañana antes de un viaje largo.",
      "Para Praga, prioricen ubicación caminable + ascensor + aire antes que hotel barato lejos.",
    ],
  },
  {
    dayNumber: 8,
    date: "1 junio",
    weekday: "Lunes",
    from: "Praga",
    to: "Praga",
    overnightCity: "Praga",
    cityId: "praga",
    activities: {
      morning: [
        {
          title: "Old Town Square",
          description:
            "Caminata suave por el centro histórico, calles y plazas. Si tienen energía: subir a una torre/mirador (elegir 1 sola).",
          type: "walking",
        },
      ],
      afternoon: [
        {
          title: "Paseo por el río",
          description:
            "Ribera del Moldava + descanso. Si llueve: café largo en Café Savoy (gran clásico).",
          type: "walking",
        },
      ],
      evening: [
        {
          title: "Cena checa tradicional",
          description:
            "Ambiente histórico con cerveza y comida checa clásica.",
          type: "food",
        },
      ],
    },
    meals: {
      dinner: {
        name: "U Fleků o Lokál",
        description:
          "U Fleků: histórico, comida checa + cerveza, ambiente tradicional. Alternativa menos turística: repetir Lokál.",
      },
    },
    tips: [
      "Old Town Hall con Reloj Astronómico: subir a la torre si les copa (buenas vistas).",
    ],
  },
  {
    dayNumber: 9,
    date: "2 junio",
    weekday: "Martes",
    from: "Praga",
    to: "Praga",
    overnightCity: "Praga",
    cityId: "praga",
    activities: {
      morning: [
        {
          title: "Castillo de Praga",
          description:
            "Ir temprano. En vez de 'ver todo', elegir 2-3 puntos y listo. Complejo 6:00-22:00; edificios históricos 9:00-16:00.",
          type: "sightseeing",
        },
      ],
      afternoon: [
        {
          title: "Descanso + Puente de Carlos",
          description:
            "Descanso en hotel. Paseo por el Puente de Carlos al atardecer (mucho más lindo que al mediodía).",
          type: "walking",
        },
      ],
      evening: [
        {
          title: "Concierto del Prague Spring",
          description:
            "Si están dentro del festival (12/5-4/6), elegir 1 concierto (ideal en Rudolfinum).",
          type: "music",
          optional: true,
        },
        {
          title: "Cena",
          description: "Carne/charcutería + platos simples en ambiente popular.",
          type: "food",
        },
      ],
    },
    meals: {
      dinner: {
        name: "Kantýna",
        description:
          "Carne/charcutería + platos simples, muy popular. Buen ambiente.",
      },
    },
    tips: [
      "Prague Castle: una sola cosa con horario fijo. El resto flexible.",
      "Jazz Dock es una opción nocturna si tienen ganas (no exige ser fan del jazz).",
      "Puente de Carlos: si pueden, ir temprano a la mañana o al atardecer para evitar multitudes.",
    ],
  },
  {
    dayNumber: 10,
    date: "3 junio",
    weekday: "Miércoles",
    from: "Praga",
    to: "Kassel",
    overnightCity: "Kassel",
    cityId: "kassel",
    activities: {
      morning: [
        {
          title: "Viaje Praga → Kassel",
          description:
            "Check-out tranquilo. ~4h30-5h de manejo con parada para café en ruta.",
          type: "driving",
        },
      ],
      afternoon: [
        {
          title: "Bergpark Wilhelmshöhe",
          description:
            "Visita al parque de ladera más grande de Europa (UNESCO). Estatua de Hércules, cascadas y Palacio Wilhelmshöhe con vistas espectaculares.",
          type: "sightseeing",
        },
      ],
      evening: [
        {
          title: "Cena en Kassel",
          description:
            "Restaurante local con cocina alemana tradicional.",
          type: "food",
        },
      ],
    },
    meals: {
      merienda: {
        name: "Café en Bergpark",
        description:
          "Café con vistas en el área del Palacio Wilhelmshöhe.",
      },
      dinner: {
        name: "Restaurante local",
        description:
          "Cocina alemana tradicional en el centro de Kassel o cerca del alojamiento.",
      },
    },
    tips: [
      "El Bergpark es enorme: planificar al menos 2-3 horas para recorrerlo con calma.",
      "Las cascadas de agua se activan en horarios específicos (verificar en temporada).",
    ],
  },
  {
    dayNumber: 11,
    date: "4 junio",
    weekday: "Jueves",
    from: "Kassel",
    to: "Ámsterdam",
    overnightCity: "",
    cityId: "amsterdam",
    activities: {
      morning: [
        {
          title: "Viaje Kassel → Ámsterdam",
          description:
            "~3h45-4h30 de manejo con 1 parada. Recomendado: Osnabrück o zona Arnhem (café + baño).",
          type: "driving",
        },
      ],
      afternoon: [
        {
          title: "Llegada a casa",
          description:
            "Dejen el auto, ducha, y a descansar. ¡Fin de la aventura!",
          type: "rest",
        },
      ],
      evening: [
        {
          title: "Cena 'en casa'",
          description: "Cena tranquila cerca de casa para cerrar el viaje.",
          type: "food",
        },
      ],
    },
    meals: {
      dinner: {
        name: "Cena en casa",
        description:
          "Después de 10 días de ruta, una cena tranquila y merecida cerca de casa.",
      },
    },
    tips: [
      "Tramo final más corto que desde Leipzig: viaje más relajado de regreso.",
      "Parada recomendada: Osnabrück o zona Arnhem/Nijmegen.",
    ],
  },
];
