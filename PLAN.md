
---

## Steps

### 1. Scaffolding del proyecto

- Inicializar: `npx create-next-app@latest . --typescript --tailwind --app --src-dir`
- Instalar dependencias: `react-leaflet leaflet @types/leaflet framer-motion lucide-react`
- Configurar fuentes Google: Playfair Display (headings) + Inter (body)
- Paleta de colores: deep blue (`#1e3a5f`), amber (`#d4a843`), cream (`#faf5eb`), soft white

### 2. Data layer (`src/data/`)

**`itinerary.ts`** — array de 11 días, cada uno con:
- `dayNumber`, `date` (string), `weekday`
- `from`, `to` (ciudad origen/destino)
- `overnightCity`
- `activities`: `{ morning, afternoon, evening }` con `title`, `description`, `type` (driving/sightseeing/food/music/rest)
- `meals`: `{ lunch?, merienda?, dinner }` con nombre del restaurante/café y descripción
- `tips`: string[] con consejos del día

Datos específicos del itinerario:
- **Día 1:** Paradas en Colonia y zona Frankfurt/Würzburg. Tarde: Plönlein + Marktplatz. Merienda: Schneeballen. Cena: Ratsstube o Gasthof Rödertor.
- **Día 2:** Parada en ruta. Tarde: Altstadt + Getreidegasse. Merienda: Café Tomaselli o Café Bazar. Cena: Augustiner Bräu Mülln o Stiegl-Keller.
- **Día 3:** Mañana: Fortaleza Hohensalzburg. Tarde: Mirabell Gardens + río Salzach. Alt lluvia: Mozart's Birthplace. Cena: rotar Stiegl-Keller / Augustiner.
- **Día 4:** Stift Admont Library (2-3h). Almuerzo en Admont o al llegar a Viena. Tarde: descanso. Cena: Gasthaus cerca del hotel.
- **Día 5:** Mañana: Schönbrunn (jardines o palacio+jardines). Tarde: Stephansdom + calles peatonales + Café Sperl. Cena: Schnitzelwirt o Plachutta Wollzeile. Opcional: concierto Musikverein/Konzerthaus.
- **Día 6 (NUEVO):** Mañana: Belvedere Palace (El Beso de Klimt). Tarde: café vienés clásico + paseo relajado. Cena: Gasthaus en el barrio.
- **Día 7:** Mañana: Haus der Musik (1h30-2h30). Tarde: viaje a Praga + check-in. Merienda: Café Louvre. Cena: Lokál Dlouhááá.
- **Día 8:** Mañana: Old Town Square + caminata. Tarde: paseo por el río. Alt lluvia: Café Savoy. Cena: U Fleků o Lokál.
- **Día 9:** Mañana: Prague Castle (ir temprano, elegir 2-3 puntos). Tarde: descanso + Puente de Carlos al atardecer. Opcional: Prague Spring concierto en Rudolfinum. Cena: Kantýna.
- **Día 10:** Manejo a Leipzig (~2h45-3h30). Tarde: paseo centro compacto. Merienda: Kaffeehaus Riquet. Cena: Auerbachs Keller.
- **Día 11:** Manejo a Amsterdam (~5h30-6h30). Paradas: Osnabrück + zona Utrecht/Amersfoort.

**`cities.ts`** — 7 entradas (Amsterdam, Rothenburg ob der Tauber, Salzburg, Admont, Viena, Praga, Leipzig):
- `name`, `country`, `flag` emoji, `coords` [lat, lng]
- `intro`: 2-3 oraciones en español describiéndola
- `photos`: paths a imágenes en `public/images/cities/`
- `nights`: cantidad de noches
- `weather`: { avgHighC, avgLowC, rainProbability, sunriseTime, sunsetTime } para mayo/junio
- `currency`: EUR o CZK
- `language`: idioma local

**`driving.ts`** — 7 tramos:
| Tramo | Distancia | Tiempo est. | Peajes/notas |
|-------|-----------|-------------|--------------|
| Amsterdam → Rothenburg | ~600 km | 5h30-6h | Zona ambiental Alemania (sticker) |
| Rothenburg → Salzburg | ~350 km | 3h40-4h | — |
| Salzburg → Admont | ~160 km | 2h | Vignette Austria (ASFINAG) |
| Admont → Viena | ~260 km | 2h45 | Vignette Austria |
| Viena → Praga | ~330 km | 3h30-4h | e-Vignette Chequia (eDalnice) |
| Praga → Leipzig | ~290 km | 2h45-3h30 | — |
| Leipzig → Amsterdam | ~650 km | 5h30-6h30 | — |
| **Total** | **~2640 km** | | |

**`packing.ts`** — categorías:
- **Documentos:** pasaportes, seguro médico, licencia de conducir, reservas impresas, tarjetas
- **Ropa:** capas (mayo variable), campera liviana impermeable, calzado cómodo para caminar, algo semi-formal para cenas
- **Tecnología:** adaptador enchufe EU (tipo C/F), cargadores, power bank, cable aux auto
- **Botiquín:** medicamentos personales, ibuprofeno, venditas, antiácidos
- **Auto:** triángulo reflectivo, chaleco reflectante, botiquín auto (obligatorio Austria), vignettes digitales compradas

### 3. Hero section (`Hero.tsx`)

- Banner full-viewport con foto de ruta europea como background (gradient overlay)
- Título: "Eurotrip Accurso 2026" — fuente Playfair Display
- Subtítulo: "Ámsterdam → Rothenburg → Salzburgo → Viena → Praga → Leipzig"
- Fechas: "25 mayo — 4 junio 2026"
- Flecha animada scroll-down
- Efecto parallax sutil con CSS

### 4. Countdown timer (`Countdown.tsx`)

- Client component con `useEffect` + `setInterval` (cada segundo)
- Cuenta regresiva a 25 mayo 2026 mostrando: días, horas, minutos, segundos
- Animación flip/fade en cada tick (Framer Motion)
- Post-inicio del viaje: mostrar "¡Buen viaje, familia!" con emoji 🚗

### 5. Mapa interactivo (`Map.tsx`)

- Dynamic import con `ssr: false` (evitar hydration issues de Leaflet)
- Tiles OpenStreetMap
- 7 markers (ciudades) con pins numerados y colores por país
- Polyline conectando la ruta: Amsterdam → Rothenburg → Salzburg → Admont → Viena → Praga → Leipzig → Amsterdam
- Popup en cada marker: nombre, fechas, thumbnail, noches
- `fitBounds()` al cargar para mostrar toda la ruta
- Click en marker → smooth scroll a la sección de esa ciudad

### 6. Itinerario día a día (`Itinerary.tsx` + `DayCard.tsx`)

- Layout timeline vertical con línea conectora
- Cada `DayCard`:
  - Badge con número de día + fecha + día de la semana
  - Ruta (from → to) con iconos de auto/caminata
  - Secciones mañana/tarde/noche con actividades
  - Recomendaciones de restaurantes/cafés con descripción
  - Tips del día colapsables
  - Color de borde/acento según ciudad
- Iconos Lucide: Castle, Utensils, Music, Car, Coffee, Camera, Footprints
- Animación fade-in al scroll (Framer Motion `whileInView`)
- Responsive: stack en mobile, alternating en desktop

### 7. Ciudades (`CityIntro.tsx` + `CityCard.tsx`)

- Grid de cards (responsive: 1 col mobile, 2-3 cols desktop)
- Cada card: foto hero curada, nombre, bandera emoji, país, noches
- Intro de 2-3 oraciones en español
- Highlights principales en bullet
- Expand/click para ver: clima, moneda, frases útiles, fotos adicionales

### 8. Clima (`WeatherInfo.tsx`)

- Cards por ciudad: temp máx/mín mayo (°C), probabilidad lluvia, horas de sol
- Iconos sol/nube/lluvia (Lucide)
- Sugerencia de ropa: "Llevar campera liviana" / "Protección solar"
- Datos hardcoded (promedios mayo confiables)

### 9. Info de manejo (`DrivingInfo.tsx`)

- Tabla/cards por tramo: origen → destino, km, tiempo, peajes
- Resumen total: ~2640 km
- Alertas destacadas:
  - Vignette Austria (ASFINAG digital)
  - e-Vignette Chequia (eDalnice)
  - Zona ambiental Alemania (Umweltplakette)
  - Velocidades máximas por país
  - Paradas sugeridas para descanso
- Tips "modo padres": pausa café cada 2-2.5h

### 10. Moneda y tips (`CurrencyTips.tsx`)

- Dos zonas monetarias: EUR (Alemania, Austria, Países Bajos) y CZK (Chequia)
- Tipo de cambio aproximado vs ARS
- Propinas por país (Alemania ~5-10%, Austria ~5-10%, Chequia ~10%)
- Frases útiles en alemán y checo (saludo, gracias, por favor, la cuenta, ¿dónde está...?)
- Número emergencia: 112 (toda la UE)

### 11. Checklist de equipaje (`PackingChecklist.tsx`)

- Client component con `localStorage` para persistir checks
- Categorías expandibles/colapsables
- Checkbox interactivo por ítem
- Barra de progreso: "X% preparado"
- Botón reset

### 12. Footer (`Footer.tsx`)

- "Hecho con amor para la familia Accurso 🇦🇷❤️🇳🇱"
- Quick links a cada sección
- Fechas del viaje

### 13. Responsive & polish

- Mobile-first con breakpoints Tailwind (`sm`, `md`, `lg`)
- Smooth scroll behavior (`scroll-behavior: smooth`)
- Paleta: deep blue `#1e3a5f`, amber `#d4a843`, cream `#faf5eb`
- Fuentes: Playfair Display (títulos) + Inter (cuerpo)
- Favicon custom (auto/ruta)
- Transiciones suaves entre secciones

### 14. Imágenes estáticas

- 2-3 fotos royalty-free por ciudad (Unsplash/Pexels, descargadas)
- Nomenclatura: `amsterdam-01.jpg`, `rothenburg-01.jpg`, `salzburg-01.jpg`, `admont-01.jpg`, `viena-01.jpg`, `praga-01.jpg`, `leipzig-01.jpg`
- Next.js `<Image>` con optimización automática
- Hero banner: foto panorámica de ruta europea

### 15. Deploy a Vercel

- Crear repo GitHub, push inicial
- Conectar repo en Vercel → auto-deploy
- Sin variables de entorno (Leaflet + OSM = gratis, sin API keys)
- Dominio custom si se desea

---

## Verificación

- `npm run dev` → verificar que todas las secciones rendericen, mapa cargue con markers, countdown funcione, checklist persista en localStorage
- Test viewport mobile (Chrome DevTools) → todo legible, mapa interactivo, cards apiladas
- Lighthouse audit: objetivo 90+ en performance
- Deploy preview en Vercel antes de compartir con los padres

---

## Decisiones tomadas

- **Next.js App Router** sobre Pages Router — moderno, mejor para layouts y server components
- **Leaflet** sobre Google Maps — sin API key, gratis, suficiente para visualizar ruta
- **Imágenes estáticas** sobre Unsplash API — sin dependencia runtime, más rápido, calidad curada
- **localStorage** para checklist — simple, sin auth, uso personal
- **Single-page scrolling** sobre múltiples páginas — mejor narrativa para el viaje
- **Solo español** — audiencia principal: padres argentinos
- **11 días / 10 noches** — se agregó un día extra en Viena (Belvedere + café)
- **Belvedere** como actividad del día extra — El Beso de Klimt + paseo relajado
- **Haus der Musik** se movió al día de viaje Viena → Praga (mañana liviana antes de manejar)