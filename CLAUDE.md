# Claude AI Preferences

## Language
**Spanish** - All UI text, messages, and user-facing content should be in Spanish.

## Project Context
This is a personal trip planning website for a Euro road trip in May-June 2026. The site includes:
- Trip itinerary with daily plans
- Interactive map
- Packing checklist
- Currency and weather information
- Driving details
- Hotel bookings per city

### Who's Traveling
4 people: parents (~60 years old) + their child and fiancé (~30 years old).
Keep activity descriptions accessible — note when something involves steep climbs or long walks that may be challenging. Tone should feel inclusive and multigenerational.
No mobility concerns for this trip's specific activities.
Dad is diabetic (well-managed) — when suggesting meals or restaurants, quietly favor options with balanced/varied menus. No need to highlight this in the UI.

### Trip Dates
May 25 – June 4, 2026 (11 days, 10 nights)

## Security
The site is protected with password authentication to prevent public access while the owner is traveling. This is a privacy feature to avoid broadcasting travel dates publicly.

## Technical Stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion (animations)
- Leaflet (maps)

## Deployment
- Hosting: Vercel
- Pushing to `main` triggers an automatic Vercel deployment — no manual step needed
- Environment variables required: `SITE_PASSWORD`

## Data Files
| File | Purpose | Key export |
|------|---------|------------|
| `src/data/itinerary.ts` | 11-day itinerary with activities, meals, tips | `itinerary: DayData[]` |
| `src/data/cities.ts` | City info, weather, highlights, hotel bookings | `cities: City[]` |
| `src/data/driving.ts` | Driving legs + tips | `drivingLegs: DrivingLeg[]` |
| `src/data/packing.ts` | Packing checklist by category | `packingList: PackingCategory[]` |
| `src/lib/constants.ts` | `CITY_COLORS`, `NAV_ITEMS`, trip dates | — |
| `src/lib/tripDay.ts` | Detects trip phase (before/during/after) | `getTripDayInfo()` |

## City IDs
Use these exact IDs throughout the codebase (keys in `CITY_COLORS`, `cityId` in `DayData`, etc.):

| City | ID | Nights | Notes |
|------|----|--------|-------|
| Ámsterdam | `amsterdam` | 0 | Start/end point |
| Rothenburg ob der Tauber | `rothenburg` | 1 | |
| Salzburgo | `salzburg` | 2 | |
| Admont | `admont` | 0 | Pass-through stop only |
| Viena | `viena` | 3 | NOT "vienna" |
| Praga | `praga` | 3 | NOT "prague" |
| Kassel | `kassel` | 1 | |

## Page Sections & Nav
All sections live in `src/app/page.tsx`. Nav items are defined in `src/lib/constants.ts` (`NAV_ITEMS`).

| Section | Hash ID | Component | Background |
|---------|---------|-----------|------------|
| Hero | `#hero` | `Hero` | gradient |
| Mapa | `#mapa` | `MapSection` | white |
| Ruta | `#resumen` | `TripTimeline` | cream |
| Itinerario | `#itinerario` | `Itinerary` | cream |
| Ciudades | `#ciudades` | `CityIntro` | white |
| Manejo | `#manejo` | `DrivingInfo` | white |
| Clima | `#clima` | `WeatherInfo` | cream |
| Moneda | `#moneda` | `CurrencyTips` | white |
| Equipaje | `#equipaje` | `PackingChecklist` | cream |

## UI Patterns
- **Section backgrounds alternate** between `bg-white dark:bg-[#1e293b]` and `bg-[#faf5eb] dark:bg-[#0f172a]`
- **Section animations**: use Framer Motion `whileInView` + `viewport={{ once: true }}` (not `useEffect`)
- **City accent colors**: always look up `CITY_COLORS[city.id]` from `src/lib/constants.ts`
- **Images**: Unsplash direct URLs — `https://images.unsplash.com/photo-{ID}?w=800&q=80`
- **Headings**: `font-[family-name:var(--font-playfair)]` for Playfair Display

## Style Guidelines
- Font: Playfair Display for headings
- Color scheme: Blue (#1e3a5f), Gold (#e8c96a), Cream (#faf5eb)
- Tone: Warm, personal, and exciting (it's a family trip)
- Emoji usage: Occasional use for visual appeal (🚗, 🗺️, etc.)

## Code Preferences
- Use ES6+ modern JavaScript/TypeScript
- Prefer functional components with hooks
- Use Tailwind CSS for styling
- Client components when using interactivity/animations
- Follow existing code patterns in the project
