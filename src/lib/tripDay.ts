import { itinerary } from "@/data/itinerary";
import type { DayData } from "@/data/itinerary";

export type TripState =
  | { phase: "before" }
  | { phase: "during"; dayNumber: number; day: DayData }
  | { phase: "after" };

// Trip runs May 25 - June 4 2026, entirely in CEST (UTC+2). No DST transition.
const CEST_OFFSET_MS = 2 * 60 * 60 * 1000;

function toCESTDayIndex(date: Date): number {
  return Math.floor((date.getTime() + CEST_OFFSET_MS) / (24 * 60 * 60 * 1000));
}

// Midnight CET boundaries for the trip
const DAY1_MIDNIGHT = new Date("2026-05-25T00:00:00+02:00");
const TRIP_END_MIDNIGHT = new Date("2026-06-05T00:00:00+02:00");

export function getTripDayInfo(now: Date): TripState {
  if (now < DAY1_MIDNIGHT) return { phase: "before" };
  if (now >= TRIP_END_MIDNIGHT) return { phase: "after" };

  const dayNumber = toCESTDayIndex(now) - toCESTDayIndex(DAY1_MIDNIGHT) + 1;
  const day = itinerary.find((d) => d.dayNumber === dayNumber);

  if (!day) return { phase: "after" };

  return { phase: "during", dayNumber, day };
}
