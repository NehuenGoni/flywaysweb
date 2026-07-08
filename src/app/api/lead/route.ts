import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead";

/**
 * Single lead endpoint for the standard site-wide form.
 *
 * TODO(client): wire an email/CRM provider here (e.g. Resend, Postmark,
 * or a webhook to the booking inbox). For now we validate, drop bot
 * submissions, log server-side, and return success so the UX is complete.
 */
export async function POST(request: Request) {
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

  const { company, ...lead } = parsed.data;

  // Honeypot tripped → pretend success, do nothing.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  // Replace with real delivery (email/CRM).
  console.info("[lead] new enquiry", {
    name: lead.name,
    email: lead.email,
    dates: lead.dates,
    party: lead.party,
    source: lead.source,
  });

  return NextResponse.json({ ok: true });
}
