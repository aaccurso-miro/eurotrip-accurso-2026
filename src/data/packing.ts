export interface PackingCategory {
  name: string;
  icon: string;
  items: string[];
}

export const packingList: PackingCategory[] = [
  {
    name: "Documentos",
    icon: "file-text",
    items: [
      "Pasaportes (verificar vigencia)",
      "Seguro médico / de viaje",
      "Licencia de conducir (internacional si aplica)",
      "Reservas de hotel impresas / en celular",
      "Tarjetas de crédito / débito (avisar al banco)",
      "Copia digital de documentos en la nube",
      "Confirmaciones de vignettes (Austria + Chequia)",
    ],
  },
  {
    name: "Ropa",
    icon: "shirt",
    items: [
      "Campera liviana impermeable (mayo es variable)",
      "Capas: remera + buzo + campera",
      "Calzado cómodo para caminar (¡pies felices!)",
      "Ropa informal para el día",
      "Algo semi-formal para cenas lindas",
      "Medias cómodas extra",
      "Bufanda liviana (mañanas frescas)",
      "Gorro / gorra para sol",
    ],
  },
  {
    name: "Tecnología",
    icon: "smartphone",
    items: [
      "Adaptador de enchufe EU (tipo C/F)",
      "Cargadores de celular",
      "Power bank",
      "Cable aux / Bluetooth para auto",
      "Auriculares",
      "Cámara de fotos (opcional)",
      "Soporte celular para auto (GPS)",
    ],
  },
  {
    name: "Botiquín",
    icon: "heart-pulse",
    items: [
      "Medicamentos personales (recetas si aplica)",
      "Ibuprofeno / paracetamol",
      "Venditas / curitas",
      "Antiácidos",
      "Protector solar",
      "Repelente de insectos (opcional)",
      "Pastillas para mareos (por si acaso)",
    ],
  },
  {
    name: "Auto",
    icon: "car",
    items: [
      "Triángulo reflectivo (obligatorio Austria)",
      "Chaleco reflectante (obligatorio Austria)",
      "Botiquín de primeros auxilios para auto",
      "Vignettes digitales compradas (ASFINAG + eDalnice)",
      "GPS / Maps offline descargados",
      "Snacks y agua para la ruta",
      "Bolsas de basura",
      "Paraguas en el auto",
    ],
  },
];
