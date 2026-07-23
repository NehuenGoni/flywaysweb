import { z } from "zod";

/**
 * Two lead form shapes, one pipeline. `variant` selects which one a
 * submission is: "compact" (name/email/phone, low friction) or "full"
 * (the CRM-style form: contact details + trip context + consent).
 *
 * Both share a honeypot (`company`) and `source` (the page path), and
 * both funnel into `normalizeLead` below so the API route and the Odoo
 * client don't need to know which variant they're handling.
 */

const shared = {
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(1, "Please enter a phone number"),
  // Prefers a phone call over email — offered on both variants.
  preferPhoneCall: z.boolean().optional(),
  // Newsletter opt-in — pre-checked in the UI, offered on both variants.
  subscribeNewsletter: z.boolean().optional(),
  // Honeypot — must stay empty. Bots fill it; humans don't see it.
  company: z.string().max(0).optional().or(z.literal("")),
  // Where the lead came from (page path), for routing/analytics.
  source: z.string().optional(),
};

export const leadCompactSchema = z.object({
  variant: z.literal("compact"),
  name: z.string().min(2, "Please enter your name"),
  ...shared,
});

export const leadFullSchema = z.object({
  variant: z.literal("full"),
  firstName: z.string().min(1, "Please enter your first name"),
  lastName: z.string().min(1, "Please enter your last name"),
  ...shared,
  country: z.string().min(1, "Please select a country"),
  state: z.string().min(1, "Please enter your state/province"),
  dates: z.string().min(2, "Roughly when are you thinking?"),
  party: z.string().min(1, "How many in your party?"),
  message: z.string().max(2000).min(2, "Tell us a little about your trip"),
  agreeContact: z.literal(true, {
    error: "Please agree to be contacted to send this form",
  }),
});

export const leadSchema = z.discriminatedUnion("variant", [
  leadCompactSchema,
  leadFullSchema,
]);

export type LeadCompactInput = z.infer<typeof leadCompactSchema>;
export type LeadFullInput = z.infer<typeof leadFullSchema>;
export type LeadInput = z.infer<typeof leadSchema>;

/** A lead in the shape both the API route and the Odoo client want. */
export type NormalizedLead = {
  contactName: string;
  email: string;
  phone: string;
  variant: LeadInput["variant"];
  source?: string;
  /** Human-readable free text — trip context, consent, everything that
   *  doesn't map to a first-class CRM field. */
  description: string;
};

/** Collapse either variant into one shape for delivery (Odoo / logs). */
export function normalizeLead(lead: LeadInput): NormalizedLead {
  if (lead.variant === "compact") {
    const lines = [
      "Submitted via the short contact form.",
      lead.preferPhoneCall ? "Prefers a phone call." : null,
      `Newsletter: ${lead.subscribeNewsletter ? "Yes" : "No"}`,
    ].filter((line): line is string => Boolean(line));

    return {
      contactName: lead.name,
      email: lead.email,
      phone: lead.phone,
      variant: lead.variant,
      source: lead.source,
      description: lines.join("\n"),
    };
  }

  const lines = [
    `Tentative dates: ${lead.dates}`,
    `Party size: ${lead.party}`,
    `Country: ${lead.country}`,
    `State/Province: ${lead.state}`,
    lead.message ? `Message: ${lead.message}` : null,
    lead.preferPhoneCall ? "Prefers a phone call." : null,
    `Newsletter: ${lead.subscribeNewsletter ? "Yes" : "No"}`,
    "Agreed to be contacted by FlyWays via email.",
  ].filter((line): line is string => Boolean(line));

  return {
    contactName: `${lead.firstName} ${lead.lastName}`.trim(),
    email: lead.email,
    phone: lead.phone,
    variant: lead.variant,
    source: lead.source,
    description: lines.join("\n"),
  };
}
