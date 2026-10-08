// Home stats strip figures. Both are pure functions of the date, so every
// visitor sees the same number and nothing has to be stored.

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

const BASE_CLIENTS = 22850;
// Monday of the week the 22850 figure was set (Thu 8 Oct 2026).
const BASE_MONDAY = Date.UTC(2026, 9, 5);

// TODO(client): confirm the exact founding day; April 2005 → 22nd year in April 2027.
const FOUNDED_YEAR = 2005;
const FOUNDED_MONTH = 3; // April, 0-indexed

// Clients added per week, by month (0-indexed). Based on the client's
// estimate of ~1230 new clients per year with seasonal variation.
const WEEKLY_BY_MONTH = [30, 30, 30, 20, 20, 20, 25, 25, 25] as const;

function weeklyIncrement(monday: number): number {
  const d = new Date(monday);
  const month = d.getUTCMonth();
  if (month < WEEKLY_BY_MONTH.length) return WEEKLY_BY_MONTH[month];
  // Oct–Dec: 110/month → weeks of 27, 27, 28, 28 (a 5th Monday counts as 27).
  const weekOfMonth = Math.floor((d.getUTCDate() - 1) / 7);
  return weekOfMonth % 4 < 2 ? 27 : 28;
}

function mondayOf(now: Date): number {
  const daysSinceMonday = (now.getUTCDay() + 6) % 7;
  return Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - daysSinceMonday,
  );
}

/** Running "Happy Clients" total; grows every Monday. */
export function getHappyClients(now: Date = new Date()): number {
  const currentMonday = mondayOf(now);
  let total = BASE_CLIENTS;
  for (let m = BASE_MONDAY + WEEK_MS; m <= currentMonday; m += WEEK_MS) {
    total += weeklyIncrement(m);
  }
  return total;
}

/** Full years since the company was founded. */
export function getYearsActive(now: Date = new Date()): number {
  const years = now.getUTCFullYear() - FOUNDED_YEAR;
  return now.getUTCMonth() < FOUNDED_MONTH ? years - 1 : years;
}
