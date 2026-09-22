/**
 * Minimal in-memory, per-IP rate limit for /api/lead — no dependency, no
 * external store. Resets on deploy/restart, and doesn't share state across
 * serverless instances; good enough to blunt a script hammering the form,
 * not a substitute for a real WAF.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

const hits = new Map<string, { count: number; windowStart: number }>();

// Bound memory growth: drop stale entries once in a while instead of never.
function sweep(now: number) {
  for (const [key, entry] of hits) {
    if (now - entry.windowStart > WINDOW_MS) hits.delete(key);
  }
}

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 5000) sweep(now);

  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

/** Best-effort client IP from standard proxy headers. */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
