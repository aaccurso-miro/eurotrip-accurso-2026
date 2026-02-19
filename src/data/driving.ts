export interface DrivingLeg {
  from: string;
  to: string;
  distanceKm: number;
  estimatedHours: string;
  tollInfo: string;
  notes: string;
}

export const drivingLegs: DrivingLeg[] = [
  {
    from: "Ámsterdam",
    to: "Rothenburg ob der Tauber",
    distanceKm: 600,
    estimatedHours: "5h30 – 6h",
    tollInfo: "Sin peaje. Posible zona ambiental (Umweltplakette) si entran a ciudades alemanas.",
    notes: "2 paradas recomendadas: zona Colonia y zona Frankfurt/Würzburg.",
  },
  {
    from: "Rothenburg ob der Tauber",
    to: "Salzburgo",
    distanceKm: 350,
    estimatedHours: "3h40 – 4h",
    tollInfo: "Sin peaje en Alemania. Al cruzar a Austria necesitan Vignette (viñeta).",
    notes: "1 parada de 30-45 min. Comprar Vignette ASFINAG antes de entrar a Austria.",
  },
  {
    from: "Salzburgo",
    to: "Admont (Stift Admont)",
    distanceKm: 160,
    estimatedHours: "~2h",
    tollInfo: "Vignette Austria (ASFINAG). Digital disponible.",
    notes: "Ruta por autopista austriaca. Paisaje alpino hermoso.",
  },
  {
    from: "Admont",
    to: "Viena",
    distanceKm: 260,
    estimatedHours: "2h45",
    tollInfo: "Vignette Austria.",
    notes: "Ruta por autopista directa a Viena.",
  },
  {
    from: "Viena",
    to: "Praga",
    distanceKm: 330,
    estimatedHours: "3h30 – 4h",
    tollInfo: "e-Vignette República Checa (eDalnice). Comprar online antes.",
    notes: "1 parada. Cruce de frontera austro-checa sin control (Schengen).",
  },
  {
    from: "Praga",
    to: "Kassel",
    distanceKm: 450,
    estimatedHours: "4h30 – 5h",
    tollInfo: "Sin peaje en Alemania desde la frontera checa.",
    notes: "Parada café en ruta. Tramo medio, más largo que a Leipzig pero directo.",
  },
  {
    from: "Kassel",
    to: "Ámsterdam",
    distanceKm: 390,
    estimatedHours: "3h45 – 4h30",
    tollInfo: "Sin peaje.",
    notes: "1 parada: Osnabrück o zona Arnhem. Tramo final más corto y cómodo.",
  },
];

export const drivingTips = [
  {
    title: "Vignette Austria (ASFINAG)",
    description:
      "Obligatoria para autopistas austriacas. Comprar la versión digital en asfinag.at antes del viaje. No comprar en sitios no oficiales.",
    icon: "badge" as const,
  },
  {
    title: "e-Vignette República Checa",
    description:
      "Obligatoria para autopistas checas. Comprar en edalnice.cz (sitio oficial). Se vincula a la patente.",
    icon: "badge" as const,
  },
  {
    title: "Zona ambiental Alemania",
    description:
      "Algunas ciudades alemanas requieren Umweltplakette (sticker ambiental) para circular por el centro. Verificar si aplica al auto.",
    icon: "alert" as const,
  },
  {
    title: "Velocidades máximas",
    description:
      "Alemania: 130 km/h recomendado (sin límite en algunos tramos). Austria: 130 km/h. Rep. Checa: 130 km/h. Países Bajos: 100-130 km/h.",
    icon: "speed" as const,
  },
  {
    title: "Pausa cada 2-2.5 horas",
    description:
      "Modo padres: parada de café y estiramiento cada 2-2.5h de manejo. ¡Los pies felices son clave!",
    icon: "coffee" as const,
  },
  {
    title: "Equipamiento obligatorio",
    description:
      "Austria: triángulo reflectivo, chaleco reflectante y botiquín de primeros auxilios son obligatorios en el auto.",
    icon: "car" as const,
  },
];
