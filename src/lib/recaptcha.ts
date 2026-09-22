/**
 * reCAPTCHA v3 server-side verification. Degrades the same way Odoo does:
 * without RECAPTCHA_SECRET_KEY configured, verification is skipped (logged,
 * not blocked) so the form works end-to-end before the client hands over
 * keys. The only anti-spam that's active today is the honeypot in
 * src/lib/lead.ts.
 */

export function isRecaptchaConfigured(): boolean {
  return Boolean(process.env.RECAPTCHA_SECRET_KEY);
}

/** Verifies a token against Google's siteverify endpoint. Never throws. */
export async function verifyRecaptcha(token: string | undefined): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return true; // not configured — degrade open, same as Odoo.
  if (!token) return false;

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return false;
    const body = (await res.json()) as { success: boolean; score?: number };
    // v3 returns a 0–1 score; 0.5 is Google's own suggested default threshold.
    return body.success && (body.score ?? 1) >= 0.5;
  } catch {
    // Network/timeout failure shouldn't block a genuine lead.
    return true;
  }
}
