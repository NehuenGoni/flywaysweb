import { NextResponse } from "next/server";
import { leadSchema, normalizeLead } from "@/lib/lead";
import { createOdooLead, isOdooConfigured } from "@/lib/odoo";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { isRateLimited, clientIp } from "@/lib/rate-limit";

/**
 * Single lead endpoint for all form variants (compact, full, newsletter).
 *
 * Validates, rate-limits, drops bot submissions (honeypot + reCAPTCHA when
 * configured), then delivers the lead to Odoo (crm.lead) when ODOO_* env
 * vars are configured. Without them it just logs server-side, so the site
 * works end-to-end in dev/preview before the client hands over credentials.
 */
export async function POST(request: Request) {
  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  // Honeypot tripped → pretend success, do nothing.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const recaptchaOk = await verifyRecaptcha(parsed.data.recaptchaToken);
  if (!recaptchaOk) {
    console.warn("[lead] reCAPTCHA verification failed", { ip });
    return NextResponse.json({ error: "Verification failed" }, { status: 422 });
  }

  const lead = normalizeLead(parsed.data);

  if (!isOdooConfigured()) {
    console.info("[lead] new enquiry (Odoo not configured, logging only)", lead);
    return NextResponse.json({ ok: true });
  }

  try {
    await createOdooLead(lead);
  } catch (err) {
    console.error("[lead] failed to create Odoo lead", err);
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
