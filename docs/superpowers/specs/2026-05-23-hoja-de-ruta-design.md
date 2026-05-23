# Hoja de ruta imprimible — Tramo 1 (Ámsterdam → Rothenburg)

**Fecha:** 2026-05-23
**Estado:** Aprobado, listo para plan de implementación
**Alcance:** Una hoja de ruta imprimible para el primer tramo del viaje (25 mayo 2026, salida 6:00 AM).

## Objetivo

Crear una página dedicada `/hoja-de-ruta` que muestra un cronograma de alto nivel del tramo Ámsterdam → Rothenburg, con horarios estimados de salida, paradas y llegada. Está pensada para ser impresa en A4 vertical y llevada en el auto como referencia rápida.

## Decisiones de alcance

- **Solo el tramo 1.** Los otros 6 tramos quedan fuera. El modelo de datos se diseña para soportarlos más adelante (campos opcionales), pero no se cargan ahora.
- **Acceso por URL directa** (`/hoja-de-ruta`). No se agrega al nav principal — es una herramienta puntual.
- **Imprimir desde el browser** (`Cmd+P`). No se genera PDF descargable.
- **Sin clima en tiempo real.** Campos vacíos para completar a mano la mañana del viaje (más confiable que promedios mensuales).
- **Sin mapa estático.** El link a Google Maps de la ruta completa va como anchor en la página (oculto al imprimir).

## Modelo de datos

Se extiende `DrivingLeg` en [src/data/driving.ts](../../../src/data/driving.ts) con campos **opcionales**, para no romper los otros 6 tramos:

```ts
export interface DrivingStop {
  name: string;              // "Rastätte Ohligser Heide West"
  region: string;            // "Alemania, A3"
  distanceFromStartKm: number;
  estimatedArrival: string;  // "08:15"
  durationMin: number;       // 20
  purpose: string;           // "Café + baño"
  mapsUrl?: string;
}

export interface DrivingLeg {
  // ...campos existentes (from, to, distanceKm, estimatedHours, tollInfo, notes)...
  date?: string;             // "25 mayo 2026"
  weekday?: string;          // "Lunes"
  departureTime?: string;    // "06:00"
  startAddress?: string;     // "Orcastraat 3, Ámsterdam"
  routeMapsUrl?: string;
  stops?: DrivingStop[];
}
```

Solo el tramo 1 carga estos campos. La página renderiza únicamente tramos que tengan `stops` definidos.

### Datos del tramo 1

| Hora | Hito | Km acum. | Detalle |
|---|---|---|---|
| **06:00** | Salida | 0 | Orcastraat 3, Ámsterdam |
| ~08:15 | Parada 1 | 230 | Rastätte Ohligser Heide West (Alemania, A3) · 20 min · café + baño |
| ~10:50 | Parada 2 | 440 | Rastätte Spessart Süd (Alemania, A3) · 45 min · almuerzo |
| ~13:00 | Llegada | 600 | Rothenburg ob der Tauber · Gästehaus Eberlein |

**Total:** ~7h (5h55 manejo + 1h05 paradas).
**Estimaciones:** promedios de Autobahn ~105 km/h efectivos con tráfico. El usuario puede ajustar tiempos en el data file si la realidad cambia.

## Arquitectura

### Ruta nueva
- `src/app/hoja-de-ruta/page.tsx` — server component que importa la data de `driving.ts` y renderiza la hoja.
- No usa Navbar ni Footer cuando se imprime (CSS `@media print` los oculta).
- En pantalla, conserva el theming del sitio (modo claro/oscuro, fondo crema).

### Componentes (todo en el mismo archivo, por simplicidad)

| Componente | Función |
|---|---|
| `<RoadSheetHeader>` | Día, fecha, ruta, total km, total tiempo |
| `<RoadSheetTimeline>` | Los 4 hitos en línea vertical con dots conectores |
| `<HotelDestinationCard>` | Gästehaus Eberlein con link web (de [src/data/cities.ts](../../../src/data/cities.ts)). Dirección/teléfono se completan a mano por ahora |
| `<WeatherBox>` | Dos líneas vacías: "Ámsterdam salida: ___ / Rothenburg llegada: ___" |
| `<PrintButton>` | Botón visible en pantalla, oculto al imprimir, llama `window.print()` (client component) |

### Links de acceso (en pantalla, ocultos al imprimir)
- Link "🖨️ Imprimir hoja de ruta" dentro de [src/components/DayCard.tsx](../../../src/components/DayCard.tsx), renderizado **solo cuando `day.dayNumber === 1`** (próximamente: cuando exista `stops` para ese tramo).
- Link similar en [src/components/DrivingInfo.tsx](../../../src/components/DrivingInfo.tsx), asociado al primer tramo de la lista.

## CSS de impresión

```css
@media print {
  /* Ocultar UI no relevante */
  nav, footer, .print-hidden { display: none; }

  /* Fondo blanco, sin sombras */
  body { background: white; color: black; }

  /* Márgenes A4 */
  @page { size: A4 portrait; margin: 1.5cm; }
}
```

- Tipografía: Playfair Display en headings (ya cargada via `var(--font-playfair)`), sans para body.
- En pantalla: theming normal (crema + dark mode).

## Layout visual (en pantalla y al imprimir)

```
┌──────────────────────────────────────────┐
│  DÍA 1 · LUNES 25 MAY 2026               │
│  Ámsterdam → Rothenburg ob der Tauber    │
│  600 km · ~7h con paradas                │
├──────────────────────────────────────────┤
│                                          │
│  ●  06:00   SALIDA                       │
│  │          Orcastraat 3, Ámsterdam      │
│  │                                       │
│  ●  ~08:15  PARADA 1 (230 km)            │
│  │          Rastätte Ohligser Heide W.   │
│  │          20 min · café + baño         │
│  │                                       │
│  ●  ~10:50  PARADA 2 (440 km)            │
│  │          Rastätte Spessart Süd        │
│  │          45 min · almuerzo            │
│  │                                       │
│  ●  ~13:00  LLEGADA (600 km)             │
│             Rothenburg · G. Eberlein     │
│                                          │
├──────────────────────────────────────────┤
│  HOTEL DESTINO                           │
│  Gästehaus Eberlein                      │
│  hotel-eberlein.de                       │
│  Dirección: __________________           │
│  Teléfono:  __________________           │
├──────────────────────────────────────────┤
│  CLIMA PREVISTO                          │
│  Ámsterdam (salida):  ________           │
│  Rothenburg (llegada): ________          │
└──────────────────────────────────────────┘

[Botón Imprimir] (solo en pantalla)
```

## Fuera de alcance (YAGNI)

- Hojas de ruta para los otros 6 tramos
- Fetching de clima en tiempo real
- Generación de PDF descargable
- Imagen de mapa estático
- Carga de dirección/teléfono del hotel en el data file
- Entrada en el nav principal del sitio
- Tests automatizados

## Plan de testeo

- Abrir `/hoja-de-ruta` en navegador, verificar layout en pantalla (modo claro y oscuro)
- `Cmd+P` → verificar que el preview de impresión muestra:
  - Sin Navbar/Footer/botón
  - Fondo blanco
  - Layout limpio que entra en una sola hoja A4 vertical
- Verificar que el link "Imprimir hoja de ruta" en Itinerario y Manejo navegan correctamente

## Archivos afectados

| Archivo | Cambio |
|---|---|
| `src/data/driving.ts` | Agregar interfaces `DrivingStop`, extender `DrivingLeg`. Poblar tramo 1. |
| `src/app/hoja-de-ruta/page.tsx` | Nuevo. Página de la hoja de ruta. |
| `src/components/DayCard.tsx` | Agregar link condicional (solo para Día 1). |
| `src/components/DrivingInfo.tsx` | Agregar link asociado al primer tramo. |
| `src/app/globals.css` | Reglas `@media print` globales (ocultar nav/footer/`.print-hidden`, fondo blanco, `@page`). |
