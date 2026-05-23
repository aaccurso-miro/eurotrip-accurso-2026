interface CityDot {
  id: string;
  label: string;
  x: number;
  y: number;
}

// Approximate positions in a 280×200 viewBox, loosely faithful to actual geography
// (Amsterdam NW, Kassel central, Rothenburg / Salzburg / Vienna eastward, Prague NE).
// The polyline below traces the actual driving route: AMS → ROT → SAL → VIE → PRA → KAS → AMS.
const cities: CityDot[] = [
  { id: "amsterdam", label: "Ámsterdam", x: 40, y: 40 },
  { id: "rothenburg", label: "Rothenburg", x: 130, y: 115 },
  { id: "salzburg", label: "Salzburgo", x: 175, y: 175 },
  { id: "viena", label: "Viena", x: 245, y: 155 },
  { id: "praga", label: "Praga", x: 215, y: 95 },
  { id: "kassel", label: "Kassel", x: 100, y: 60 },
];

// Loop in route order, closing back to Amsterdam
const routeOrder = ["amsterdam", "rothenburg", "salzburg", "viena", "praga", "kassel", "amsterdam"];

interface Props {
  /** Compact variant for back cover — smaller labels, no inner gradient backdrop */
  compact?: boolean;
}

export default function RouteMapSVG({ compact = false }: Props) {
  const dotMap = new Map(cities.map((c) => [c.id, c]));
  const pathPoints = routeOrder
    .map((id) => dotMap.get(id))
    .filter((c): c is CityDot => Boolean(c))
    .map((c) => `${c.x},${c.y}`)
    .join(" ");

  const labelFontSize = compact ? 9 : 11;
  const dotRadius = compact ? 4 : 5;

  return (
    <svg
      viewBox="0 0 290 220"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mapa esquemático de la ruta del viaje"
      className="w-full h-auto text-gray-800 dark:text-gray-100"
    >
      {/* Route polyline (closed loop) */}
      <polyline
        points={pathPoints}
        fill="none"
        stroke="#d4a843"
        strokeWidth={compact ? 1.5 : 2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Dots + labels */}
      {cities.map((city) => {
        const isAnchor = city.id === "amsterdam";
        // Label placement: above or below the dot to avoid the polyline path
        const labelAbove =
          city.id === "amsterdam" ||
          city.id === "kassel" ||
          city.id === "praga";
        return (
          <g key={city.id}>
            <circle
              cx={city.x}
              cy={city.y}
              r={dotRadius}
              fill={isAnchor ? "#1e3a5f" : "#d4a843"}
              stroke="#fff"
              strokeWidth="1.5"
            />
            <text
              x={city.x}
              y={labelAbove ? city.y - dotRadius - 4 : city.y + dotRadius + labelFontSize + 1}
              textAnchor="middle"
              fontSize={labelFontSize}
              fontFamily="var(--font-inter), system-ui, sans-serif"
              fill="currentColor"
              fontWeight="500"
            >
              {city.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
