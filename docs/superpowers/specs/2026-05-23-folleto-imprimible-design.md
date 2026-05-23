# Folleto imprimible — PDF completo del viaje

**Fecha:** 2026-05-23
**Estado:** Aprobado, listo para plan de implementación
**Alcance:** Página única que consolida portada, hojas de ruta y contenido de referencia en un PDF de 12 páginas, listo para imprimir como folleto.

## Contexto

Ya existen 6 hojas de ruta impresas individualmente desde `/hoja-de-ruta/[slug]` ([spec original](./2026-05-23-hoja-de-ruta-design.md)). Cada hoja se imprime por separado con `Cmd+P`. Para el viaje queremos un único folleto físico que reúna todo el material de referencia — portada con datos del viaje, info práctica, las 6 hojas de ruta y contactos — encuadernado como librito.

Para imprimir como folleto, el archivo PDF debe tener **un número de páginas múltiplo de 4** (cada hoja de papel doblada al medio = 4 páginas). Con 6 hojas de ruta + portada (= 7) llegamos al múltiplo más cercano (8) o aprovechamos para sumar contenido útil hasta 12.

## Objetivo

Crear `/hoja-de-ruta/folleto`, una página que renderiza secuencialmente las 12 páginas del folleto con saltos de página CSS. El usuario abre la página, hace `Cmd+P → Guardar como PDF`, y luego imprime el PDF en modo "Folleto / Booklet" desde su impresora o desde Vista Previa / Adobe Reader.

## Decisiones de alcance

- **Sin dependencias nuevas.** Reusa el CSS de impresión existente (`@media print`, A4 1.5cm márgenes en [globals.css:79-113](../../../src/app/globals.css)) y el flujo `window.print()` ya probado.
- **12 páginas fijas** (múltiplo de 4). No se hace dinámico según contenido — la estructura es estática.
- **Reutilización de componentes.** El JSX de cada hoja de ruta se extrae a `<RoadSheetArticle />` para usarlo desde `[slug]/page.tsx` (página individual existente) y desde el folleto.
- **Portada tipográfica con mapa SVG.** SVG inline, sin Leaflet, sin imágenes externas — imprime nítido y no depende de la red.
- **Sin selector de cantidad de páginas.** El folleto es de 12 páginas, punto.
- **Acceso desde el índice.** Se agrega un CTA "Imprimir folleto completo" arriba de la lista en `/hoja-de-ruta`.

## Estructura de las 12 páginas

| Pág. | Contenido | Origen de datos |
|------|-----------|-----------------|
| **1** | Portada: título "Eurotrip 2026", fechas, 4 nombres, mapa SVG de ruta | hardcoded + SVG inline |
| **2** | Resumen del viaje: 11 días · 10 noches · ~2,540 km · grid de 6 ciudades con noches y banderas | `cities.ts` |
| **3** | Hoteles por ciudad: 5 hoteles (Rothenburg, Salzburg, Viena, Praga, Kassel) — nombre, dirección, teléfono, fechas | `cities.ts` (`hotel`) |
| **4** | Info práctica: tabla por país con moneda, idioma, clima promedio (max/min), prob. de lluvia | `cities.ts` (`currency`, `language`, `weather`) |
| **5** | Hoja de ruta — Día 1: Ámsterdam → Rothenburg | `roadSheets.ts` `dia-1` |
| **6** | Hoja de ruta — Día 2: Rothenburg → Salzburgo | `roadSheets.ts` `dia-2` |
| **7** | Hoja de ruta — Día 4: Salzburgo → Viena | `roadSheets.ts` `dia-4` |
| **8** | Hoja de ruta — Día 7: Viena → Praga | `roadSheets.ts` `dia-7` |
| **9** | Hoja de ruta — Día 10: Praga → Kassel | `roadSheets.ts` `dia-10` |
| **10** | Hoja de ruta — Día 11: Kassel → Ámsterdam | `roadSheets.ts` `dia-11` |
| **11** | Contactos útiles: 112 (emergencia UE), teléfonos de los 5 hoteles, espacio para anotar embajada/consulado del país de origen, asistencia al viajero | hardcoded + `cities.ts` |
| **12** | Contraportada: cita de cierre + mini mapa SVG repetido + "¡Buen viaje!" | hardcoded |

## Arquitectura

### Archivos nuevos

```
src/app/hoja-de-ruta/folleto/
  page.tsx                     # Renderiza las 12 páginas
  CoverPage.tsx                # Página 1
  TripSummaryPage.tsx          # Página 2
  HotelsPage.tsx               # Página 3
  PracticalInfoPage.tsx        # Página 4
  ContactsPage.tsx             # Página 11
  BackCoverPage.tsx            # Página 12
  RouteMapSVG.tsx              # SVG reutilizado en portada y contraportada
  FolletoPrintButton.tsx       # Variante del PrintButton con texto "Imprimir folleto"
```

### Archivo extraído (refactor)

`src/app/hoja-de-ruta/RoadSheetArticle.tsx` — extrae el `<article>` actualmente inline en [src/app/hoja-de-ruta/[slug]/page.tsx:101-329](../../../src/app/hoja-de-ruta/[slug]/page.tsx#L101-L329) (incluyendo `RouteOverview` helper). El componente recibe `sheet: RoadSheet` como prop. Se consume desde:
- `[slug]/page.tsx` (página individual existente — sin cambio funcional)
- `folleto/page.tsx` (nueva, llamado 6 veces, una por hoja)

### Archivos modificados

- **`src/app/globals.css`** — agregar reglas para `.print-page` (un wrapper por página del folleto):
  ```css
  .print-page {
    page-break-after: always;
    break-after: page;
  }
  .print-page:last-child {
    page-break-after: auto;
    break-after: auto;
  }

  @media screen {
    /* Preview tipo A4 en pantalla — el usuario ve cada página como una hoja real */
    .print-page {
      width: 21cm;
      min-height: 29.7cm;
      padding: 1.5cm;
      box-sizing: border-box;
      background: white;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
      margin: 1rem auto;
    }
  }

  @media print {
    .print-page {
      width: auto;
      min-height: auto;
      padding: 0;
      margin: 0;
      box-shadow: none;
    }
  }
  ```
  Los márgenes de 1.5cm ya están en `@page` (línea 105), así que en print los `.print-page` no agregan padding propio.

- **`src/app/hoja-de-ruta/page.tsx`** — agregar al principio (antes del `<ul>`) un CTA destacado linkeando a `/hoja-de-ruta/folleto`. Texto: "Imprimir folleto completo (12 páginas)".

## Diseño de la portada (página 1)

```
+---------------------------------+
|                                 |
|         EUROTRIP 2026           |   ← Playfair Display, 48pt, deep blue
|         ~~~~~~~~~~              |
|                                 |
|     25 mayo – 4 junio 2026      |   ← Playfair italic, 18pt, amber
|       11 días · 10 noches       |
|                                 |
|                                 |
|         [Mapa SVG ruta]         |   ← SVG inline, 6 puntos conectados
|                                 |     en loop (Ams → Rot → Sal → Vie
|                                 |      → Pra → Kas → Ams)
|                                 |
|                                 |
|     Papá · Mamá · Alan · [...]  |   ← Inter, 14pt, gray
|                                 |
+---------------------------------+
```

**Mapa SVG:** 6 dots con labels conectados por una polyline cerrada. Posiciones aproximadas según geografía relativa (no es un mapa real, es esquemático). Colores: dots en deep blue, polyline en amber, labels en Inter.

> Nota: el nombre de la pareja (cuarto pasajero) no está hardcodeado actualmente en el proyecto — usar placeholder "[Pareja]" o pedir el dato al ejecutar el plan.

## Flujo del usuario

1. Usuario va a `/hoja-de-ruta` desde el sitio.
2. Ve un CTA grande arriba: **"Imprimir folleto completo (12 páginas)"** → click.
3. Aterriza en `/hoja-de-ruta/folleto`. Ve un preview de las 12 páginas estilo A4 (apiladas verticalmente, fondo blanco con sombra). Arriba: botón "Imprimir folleto" + instrucciones cortas.
4. Click en "Imprimir folleto" → dispara `window.print()`.
5. Diálogo del navegador: usuario elige **"Guardar como PDF"** y baja el archivo.
6. Abre el PDF en Vista Previa / Adobe Reader.
7. Imprime desde ahí con la opción **"Imprimir como folleto"** (Layout → Booklet en Adobe, o Layout custom en Vista Previa).
8. La impresora hace la imposición (acomoda las páginas) y entrega el folleto plegado en A5.

**Instrucciones cortas en la página del folleto** (visibles en pantalla, ocultas en impresión):
- "Guardá como PDF (Cmd+P → Guardar como PDF)."
- "Después imprimí ese PDF eligiendo 'Folleto' o 'Booklet' en tu impresora."

## Manejo de modo oscuro durante la impresión

El componente `PrintButton` existente ([src/app/hoja-de-ruta/PrintButton.tsx](../../../src/app/hoja-de-ruta/PrintButton.tsx)) ya hookea `beforeprint`/`afterprint` para sacar el atributo `data-theme="dark"` y restaurarlo después. **El nuevo `FolletoPrintButton` reusa exactamente este mismo patrón.** No hay que reinventarlo.

## Trade-offs considerados

- **Generación server-side con Puppeteer:** descartado — agrega ~170MB de deps, complica el deploy en Vercel (necesita `chromium-min`), y no aporta UX significativamente mejor para este caso (1 usuario, 1 PDF cada tanto).
- **PDF pre-generado en build:** descartado — los datos pueden cambiar (pronóstico del clima, info de hoteles) y tener que rebuildear cada vez es fricción.
- **Imposición de booklet del lado de la web (acomodar páginas 1, 12, 2, 11... en orden de impresión):** descartado — las impresoras y lectores de PDF modernos ya hacen esta imposición automáticamente con la opción "Folleto". Implementarlo en CSS sería frágil.

## Verificación end-to-end

1. **Visual on-screen:**
   - `npm run dev`, abrir `http://localhost:3000/hoja-de-ruta/folleto`.
   - Confirmar que se ven 12 páginas tipo A4, una abajo de la otra, con sombra.
   - Scroll desde arriba: portada → resumen → hoteles → info práctica → 6 hojas de ruta → contactos → contraportada.
   - El botón "Imprimir folleto" e instrucciones son visibles en pantalla.

2. **Preview de impresión:**
   - `Cmd+P` en la página.
   - Confirmar **exactamente 12 páginas** en el preview del navegador (Chrome muestra "1 de 12" al pie).
   - Confirmar que cada página rompe en el lugar correcto (no hay una hoja de ruta partida entre dos páginas).
   - Confirmar que los elementos `.print-hidden` (botones, breadcrumbs, instrucciones) no aparecen en el preview.

3. **PDF:**
   - Guardar como PDF desde el diálogo de impresión.
   - Abrir el PDF y confirmar 12 páginas, layout limpio, colores correctos.

4. **Impresión booklet (opcional, validación física):**
   - Desde Adobe Reader o Vista Previa, imprimir el PDF con opción "Folleto".
   - Confirmar que sale plegable a A5 con la portada por fuera y la contraportada al dorso.

5. **Regresión de la hoja individual:**
   - Verificar que `/hoja-de-ruta/dia-1` (y las demás) siguen funcionando idéntico después del refactor a `RoadSheetArticle`.
   - `Cmd+P` en una hoja individual sigue dando 1 página A4 sin cambios visuales.

## No hay tests automatizados

El proyecto no tiene infraestructura de tests. La verificación es visual y manual, igual que para la spec original de hojas de ruta.
