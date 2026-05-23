# Hoja de Ruta (Tramo 1) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a printable road sheet page at `/hoja-de-ruta` for trip Day 1 (Ámsterdam → Rothenburg, 25 May 2026, 06:00 departure) with stop-by-stop times, hotel info, and a fill-by-hand weather box.

**Architecture:** A standalone Next.js App Router page that consumes leg data from `src/data/driving.ts` (extended with optional fields and a `DrivingStop` interface). A small CSS-only print mode hides nav/footer and forces an A4-friendly layout via `@media print`. Two discreet entry-point links (in `DayCard` for Day 1 and `DrivingInfo` for leg 1) link to the page. No automated tests — verification is visual (dev server + browser print preview), consistent with the spec.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, lucide-react icons. No new dependencies.

**Spec:** [docs/superpowers/specs/2026-05-23-hoja-de-ruta-design.md](../specs/2026-05-23-hoja-de-ruta-design.md)

**Note on TDD:** The spec explicitly excludes automated tests for this feature and the project has no test runner configured. Per user instructions (CLAUDE.md + spec), each task ends with a manual browser check instead of a unit test. This is a documented deviation from the default TDD workflow.

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `src/data/driving.ts` | Modify | Add `DrivingStop` interface, extend `DrivingLeg` with optional fields, populate leg 1 with departure/stops data |
| `src/app/globals.css` | Modify | Add `@media print` rules (hide nav/footer/.print-hidden, white bg, A4 page) |
| `src/app/hoja-de-ruta/page.tsx` | Create | The printable page (server component shell + small client print button) |
| `src/app/hoja-de-ruta/PrintButton.tsx` | Create | Client component that calls `window.print()` |
| `src/components/DayCard.tsx` | Modify | Add "Imprimir hoja de ruta" link for Day 1 only |
| `src/components/DrivingInfo.tsx` | Modify | Add "Imprimir hoja de ruta" link on the first leg row |

---

## Task 1: Extend the driving data model and populate leg 1

**Files:**
- Modify: `src/data/driving.ts`

- [ ] **Step 1: Add `DrivingStop` interface and extend `DrivingLeg`**

Replace the contents of `src/data/driving.ts` (preserve the rest, only modify the two interfaces and leg 1):

```ts
export interface DrivingStop {
  name: string;
  region: string;
  distanceFromStartKm: number;
  estimatedArrival: string; // "HH:MM"
  durationMin: number;
  purpose: string;
  mapsUrl?: string;
}

export interface DrivingLeg {
  from: string;
  to: string;
  distanceKm: number;
  estimatedHours: string;
  tollInfo: string;
  notes: string;
  // Optional fields for printable road sheet
  date?: string;            // "25 mayo 2026"
  weekday?: string;         // "Lunes"
  departureTime?: string;   // "06:00"
  startAddress?: string;    // "Orcastraat 3, Ámsterdam"
  routeMapsUrl?: string;
  stops?: DrivingStop[];
}
```

- [ ] **Step 2: Populate leg 1 (Ámsterdam → Rothenburg) with the new fields**

In the same file, replace the first element of `drivingLegs` (currently lines 11–18) with:

```ts
  {
    from: "Ámsterdam",
    to: "Rothenburg ob der Tauber",
    distanceKm: 600,
    estimatedHours: "5h30 – 6h",
    tollInfo: "Sin peaje. Posible zona ambiental (Umweltplakette) si entran a ciudades alemanas.",
    notes: "2 paradas recomendadas: zona Colonia y zona Frankfurt/Würzburg.",
    date: "25 mayo 2026",
    weekday: "Lunes",
    departureTime: "06:00",
    startAddress: "Orcastraat 3, Ámsterdam",
    routeMapsUrl:
      "https://www.google.com/maps/dir/Orcastraat+3,+Amsterdam,+Netherlands/Rastst%C3%A4tte+Ohligser+Heide+West,+Germany/Rastst%C3%A4tte+Spessart+S%C3%BCd,+Germany/Rothenburg+ob+der+Tauber,+Germany/",
    stops: [
      {
        name: "Rastätte Ohligser Heide West",
        region: "Alemania, A3",
        distanceFromStartKm: 230,
        estimatedArrival: "08:15",
        durationMin: 20,
        purpose: "Café + baño",
        mapsUrl:
          "https://www.google.com/maps/search/Rastst%C3%A4tte+Ohligser+Heide+West",
      },
      {
        name: "Rastätte Spessart Süd",
        region: "Alemania, A3",
        distanceFromStartKm: 440,
        estimatedArrival: "10:50",
        durationMin: 45,
        purpose: "Almuerzo",
        mapsUrl:
          "https://www.google.com/maps/search/Rastst%C3%A4tte+Spessart+S%C3%BCd",
      },
    ],
  },
```

The other six legs stay untouched.

- [ ] **Step 3: Verify the project still type-checks and builds**

Run: `npm run lint`
Expected: No errors related to `driving.ts`.

- [ ] **Step 4: Commit**

```bash
git add src/data/driving.ts
git commit -m "feat(data): add stops + departure metadata to leg 1 (Ámsterdam → Rothenburg)"
```

---

## Task 2: Add global print CSS rules

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Append `@media print` block at the end of `globals.css`**

Add the following block at the bottom of `src/app/globals.css` (after the existing dark-mode overrides, around line 77):

```css
/* Print mode — used by /hoja-de-ruta */
@media print {
  /* Hide site chrome + any element marked .print-hidden */
  nav,
  footer,
  .print-hidden {
    display: none !important;
  }

  /* Reset to print-friendly colors regardless of dark mode */
  html[data-theme="dark"],
  html {
    background: white !important;
    color: black !important;
  }
  body {
    background: white !important;
    color: black !important;
  }

  /* A4 portrait with comfortable margins */
  @page {
    size: A4 portrait;
    margin: 1.5cm;
  }

  /* Avoid awkward breaks inside grouped sections */
  .print-keep {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
```

- [ ] **Step 2: Verify dev server still compiles**

Run: `npm run dev`
Expected: starts cleanly. Open any page (e.g. `/`) and confirm screen rendering is unchanged. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(styles): add @media print rules for printable road sheet"
```

---

## Task 3: Create the `/hoja-de-ruta` page

**Files:**
- Create: `src/app/hoja-de-ruta/PrintButton.tsx`
- Create: `src/app/hoja-de-ruta/page.tsx`

- [ ] **Step 1: Create the `PrintButton` client component**

Create `src/app/hoja-de-ruta/PrintButton.tsx`:

```tsx
"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print-hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1e3a5f] hover:bg-[#1e3a5f]/90 text-white text-sm font-medium transition-colors cursor-pointer"
    >
      <Printer size={16} />
      Imprimir hoja
    </button>
  );
}
```

- [ ] **Step 2: Create the page component**

Create `src/app/hoja-de-ruta/page.tsx`:

```tsx
import Link from "next/link";
import { ArrowLeft, Coffee, Hotel, Cloud } from "lucide-react";
import { drivingLegs } from "@/data/driving";
import { cities } from "@/data/cities";
import PrintButton from "./PrintButton";

export const metadata = {
  title: "Hoja de Ruta — Tramo 1 · Eurotrip Accurso 2026",
};

export default function HojaDeRutaPage() {
  const leg = drivingLegs.find((l) => l.stops && l.stops.length > 0);

  if (!leg || !leg.stops || !leg.departureTime) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <p className="text-gray-600">No hay hoja de ruta cargada todavía.</p>
      </main>
    );
  }

  const destCity = cities.find((c) => c.name === leg.to);
  const totalDriveMin = leg.stops.reduce((sum, s) => sum + s.durationMin, 0);

  // Estimated arrival = last stop's estimatedArrival + duration + drive time to destination.
  // Kept implicit in the timeline; the destination row uses a simple "~HH:MM" hardcoded below.
  // We compute a rough total trip time string for the header.
  const headerTotal = `~${leg.estimatedHours} de manejo + ${totalDriveMin} min de paradas`;

  return (
    <main className="min-h-screen bg-[#faf5eb] dark:bg-[#0f172a] py-10 px-4 print:bg-white print:py-0">
      <div className="max-w-2xl mx-auto">
        {/* On-screen-only back link */}
        <div className="print-hidden mb-6 flex items-center justify-between">
          <Link
            href="/#manejo"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-[#1e3a5f] dark:hover:text-[#93c5fd]"
          >
            <ArrowLeft size={16} />
            Volver al sitio
          </Link>
          <PrintButton />
        </div>

        {/* The printable sheet */}
        <article className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-md print:shadow-none print:rounded-none p-8 sm:p-10 print:p-0">
          {/* Header */}
          <header className="print-keep border-b border-gray-200 dark:border-gray-700 pb-5 mb-6">
            <p className="text-xs uppercase tracking-widest text-[#d4a843] font-semibold mb-1">
              Día 1 · {leg.weekday} {leg.date}
            </p>
            <h1 className="text-2xl sm:text-3xl font-[family-name:var(--font-playfair)] text-[#1e3a5f] dark:text-[#93c5fd] mb-2">
              {leg.from} → {leg.to}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {leg.distanceKm} km · {headerTotal}
            </p>
            {leg.routeMapsUrl && (
              <a
                href={leg.routeMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="print-hidden mt-2 inline-block text-xs text-[#1e3a5f] dark:text-[#93c5fd] underline"
              >
                Abrir ruta completa en Google Maps
              </a>
            )}
          </header>

          {/* Timeline */}
          <section className="print-keep mb-8">
            <ol className="relative space-y-6">
              {/* Departure */}
              <li className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="w-3 h-3 rounded-full bg-[#1e3a5f] dark:bg-[#93c5fd] mt-1.5" />
                  <span className="flex-1 w-px bg-gray-300 dark:bg-gray-600 mt-1" />
                </div>
                <div className="flex-1 pb-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-lg font-bold text-[#1e3a5f] dark:text-[#93c5fd] font-mono">
                      {leg.departureTime}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Salida
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 dark:text-gray-100 mt-0.5">
                    {leg.startAddress}
                  </p>
                </div>
              </li>

              {/* Stops */}
              {leg.stops.map((stop, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="w-3 h-3 rounded-full bg-[#d4a843] mt-1.5" />
                    <span className="flex-1 w-px bg-gray-300 dark:bg-gray-600 mt-1" />
                  </div>
                  <div className="flex-1 pb-1">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="text-lg font-bold text-[#1e3a5f] dark:text-[#93c5fd] font-mono">
                        ~{stop.estimatedArrival}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Parada {i + 1} · km {stop.distanceFromStartKm}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100 mt-0.5">
                      {stop.name}
                      <span className="font-normal text-gray-500 dark:text-gray-400">
                        {" "}
                        — {stop.region}
                      </span>
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5 flex items-center gap-1.5">
                      <Coffee size={12} className="text-[#d4a843]" />
                      {stop.durationMin} min · {stop.purpose}
                    </p>
                  </div>
                </li>
              ))}

              {/* Arrival */}
              <li className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="w-3 h-3 rounded-full bg-[#1e3a5f] dark:bg-[#93c5fd] mt-1.5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-lg font-bold text-[#1e3a5f] dark:text-[#93c5fd] font-mono">
                      ~13:00
                    </span>
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Llegada · km {leg.distanceKm}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100 mt-0.5">
                    {leg.to}
                  </p>
                </div>
              </li>
            </ol>
          </section>

          {/* Hotel destination */}
          {destCity?.hotel && (
            <section className="print-keep mb-6 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Hotel size={16} className="text-[#d4a843]" />
                <h2 className="text-sm uppercase tracking-widest font-semibold text-gray-700 dark:text-gray-200">
                  Hotel destino
                </h2>
              </div>
              <p className="text-base font-medium text-gray-800 dark:text-gray-100">
                {destCity.hotel.name}
              </p>
              <a
                href={destCity.hotel.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#1e3a5f] dark:text-[#93c5fd] underline break-all"
              >
                {destCity.hotel.website}
              </a>
              <dl className="mt-3 space-y-1.5 text-sm">
                <div className="flex gap-2">
                  <dt className="text-gray-500 dark:text-gray-400 w-24 shrink-0">
                    Dirección:
                  </dt>
                  <dd className="text-gray-700 dark:text-gray-300 border-b border-dashed border-gray-300 dark:border-gray-600 flex-1" />
                </div>
                <div className="flex gap-2">
                  <dt className="text-gray-500 dark:text-gray-400 w-24 shrink-0">
                    Teléfono:
                  </dt>
                  <dd className="text-gray-700 dark:text-gray-300 border-b border-dashed border-gray-300 dark:border-gray-600 flex-1" />
                </div>
              </dl>
            </section>
          )}

          {/* Weather box — fill by hand */}
          <section className="print-keep rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Cloud size={16} className="text-[#d4a843]" />
              <h2 className="text-sm uppercase tracking-widest font-semibold text-gray-700 dark:text-gray-200">
                Clima previsto
              </h2>
            </div>
            <dl className="space-y-1.5 text-sm">
              <div className="flex gap-2">
                <dt className="text-gray-500 dark:text-gray-400 w-40 shrink-0">
                  {leg.from} (salida):
                </dt>
                <dd className="text-gray-700 dark:text-gray-300 border-b border-dashed border-gray-300 dark:border-gray-600 flex-1" />
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-500 dark:text-gray-400 w-40 shrink-0">
                  {leg.to} (llegada):
                </dt>
                <dd className="text-gray-700 dark:text-gray-300 border-b border-dashed border-gray-300 dark:border-gray-600 flex-1" />
              </div>
            </dl>
          </section>
        </article>
      </div>
    </main>
  );
}
```

Notes for the implementer:
- `~13:00` arrival is hardcoded in the JSX intentionally — it's derived from the spec table and there's no value worth computing for a one-leg sheet (YAGNI). If you later add more legs, compute it from `stops[last].estimatedArrival + durationMin + remaining drive time`.
- The page is a server component except for the `PrintButton` (which needs `window.print()`).

- [ ] **Step 3: Manually verify the page renders**

Run: `npm run dev`

Open in browser: `http://localhost:3000/hoja-de-ruta`

Expected:
- Sheet renders with header "Día 1 · Lunes 25 mayo 2026"
- Timeline shows 4 hitos: 06:00 Salida, ~08:15 Parada 1, ~10:50 Parada 2, ~13:00 Llegada
- Hotel card shows "Gästehaus Eberlein" with link
- Weather box shows two empty dotted lines
- "Imprimir hoja" and "Volver al sitio" links visible at top
- Toggle dark mode in another tab on `/` → reload `/hoja-de-ruta` → confirm dark colors apply

- [ ] **Step 4: Manually verify print preview**

In the browser on `/hoja-de-ruta`, hit `Cmd+P` (Mac) or `Ctrl+P`.

Expected:
- Print preview shows the sheet on white background
- No nav, no footer, no "Imprimir hoja" / "Volver al sitio" buttons
- Content fits on one A4 page
- No dark-mode colors in the preview even if dark mode was on

If any element overflows or appears that shouldn't, fix it (likely culprit: a `.print-hidden` class missing on something interactive).

- [ ] **Step 5: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/app/hoja-de-ruta/page.tsx src/app/hoja-de-ruta/PrintButton.tsx
git commit -m "feat: add printable road sheet page for leg 1"
```

---

## Task 4: Add print-sheet link inside Day 1's card

**Files:**
- Modify: `src/components/DayCard.tsx`

- [ ] **Step 1: Add a conditional link in `DayCard`**

At [src/components/DayCard.tsx:20](../../src/components/DayCard.tsx#L20), the lucide-react import already includes several icons. Add `Printer` to the import list:

```tsx
import {
  Car,
  Castle,
  Coffee,
  Music,
  Footprints,
  Utensils,
  Bed,
  BookOpen,
  ChevronDown,
  Lightbulb,
  Sun,
  Sunset,
  Moon,
  MapPin,
  Printer,
} from "lucide-react";
```

Also add this to the top of the file (after the existing imports):

```tsx
import Link from "next/link";
```

Then, find the activity-summary block in the header (around line 145, the `<div className="flex flex-wrap gap-2 mt-3">` that lists activity chips). Immediately *after* that closing `</div>`, insert:

```tsx
              {/* Print sheet link — only for Day 1 */}
              {day.dayNumber === 1 && (
                <Link
                  href="/hoja-de-ruta"
                  onClick={(e) => e.stopPropagation()}
                  className="print-hidden inline-flex items-center gap-1.5 mt-3 text-xs text-[#1e3a5f] dark:text-[#93c5fd] hover:underline"
                >
                  <Printer size={12} />
                  Imprimir hoja de ruta del tramo
                </Link>
              )}
```

The `onClick={(e) => e.stopPropagation()}` is required because the surrounding `<button>` toggles expansion when clicked; without `stopPropagation`, clicking the link would also collapse/expand the card.

- [ ] **Step 2: Manually verify in browser**

Run: `npm run dev`

Open: `http://localhost:3000/#itinerario`

Expected:
- Day 1 card shows a small "Imprimir hoja de ruta del tramo" link below the activity chips
- Days 2–11 do *not* show this link
- Clicking the link navigates to `/hoja-de-ruta` (without toggling expansion of the card)

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/DayCard.tsx
git commit -m "feat(itinerary): link to printable road sheet from Day 1 card"
```

---

## Task 5: Add print-sheet link in DrivingInfo first row

**Files:**
- Modify: `src/components/DrivingInfo.tsx`

- [ ] **Step 1: Add imports and link in the first leg row**

Add to the existing lucide-react import block at [src/components/DrivingInfo.tsx:4-12](../../src/components/DrivingInfo.tsx#L4-L12):

```tsx
import {
  Car,
  Route,
  AlertTriangle,
  Gauge,
  Coffee,
  Shield,
  BadgeCheck,
  Printer,
} from "lucide-react";
import Link from "next/link";
```

Then locate the leg row at [src/components/DrivingInfo.tsx:64-97](../../src/components/DrivingInfo.tsx#L64-L97) — the `drivingLegs.map(...)` block. Replace the `<div className="col-span-4 flex items-center gap-2">` (the "Tramo" cell) with:

```tsx
                <div className="col-span-4 flex items-center gap-2 flex-wrap">
                  <Route size={14} className="text-[#d4a843] shrink-0" />
                  <span className="font-medium text-gray-800 dark:text-gray-100">
                    {leg.from} → {leg.to}
                  </span>
                  {leg.stops && leg.stops.length > 0 && (
                    <Link
                      href="/hoja-de-ruta"
                      className="print-hidden inline-flex items-center gap-1 text-xs text-[#1e3a5f] dark:text-[#93c5fd] hover:underline ml-1"
                    >
                      <Printer size={11} />
                      Imprimir
                    </Link>
                  )}
                </div>
```

This shows the print link automatically for any leg that has `stops` defined — currently just leg 1, but it scales when more legs gain stop data.

- [ ] **Step 2: Manually verify in browser**

Run: `npm run dev`

Open: `http://localhost:3000/#manejo`

Expected:
- The first row "Ámsterdam → Rothenburg ob der Tauber" shows a small "Imprimir" link
- The other 6 leg rows do not show the link
- Clicking "Imprimir" navigates to `/hoja-de-ruta`

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/DrivingInfo.tsx
git commit -m "feat(manejo): link to printable road sheet from leg 1 row"
```

---

## Task 6: Final integration check

**Files:** none modified — verification only.

- [ ] **Step 1: Full manual check across both light and dark modes**

Run: `npm run dev`

Checklist:
- [ ] `/` loads with no visual regressions
- [ ] `/#itinerario` Day 1 has the print link; other days don't
- [ ] `/#manejo` first leg has the print link; others don't
- [ ] `/hoja-de-ruta` loads via both entry-point links
- [ ] `/hoja-de-ruta` renders correctly in light mode
- [ ] `/hoja-de-ruta` renders correctly in dark mode (toggle theme from `/`)
- [ ] `Cmd+P` on `/hoja-de-ruta`: white background, no nav/footer/buttons, one A4 page, content not clipped

- [ ] **Step 2: Production build sanity check**

Run: `npm run build`
Expected: build succeeds with no errors. Warnings about unused imports are acceptable but should be addressed if trivial.

- [ ] **Step 3: Stop dev server, push if all green**

```bash
git status   # confirm clean tree
git log --oneline -6
git push     # only if user explicitly approves — Vercel will auto-deploy
```

> Do NOT push without the user's explicit go-ahead. Vercel will auto-deploy from `main`.
