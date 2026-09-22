import { z } from "zod";

/**
 * Three lead form shapes, one pipeline. `variant` selects which one a
 * submission is:
 *  - "compact": name/email/phone, low friction, for tight placements.
 *  - "full": the CRM-style Schedule a Call form (contact details, trip
 *    context, consent) — used on /schedule-a-call, the header/hero CTAs
 *    and end-of-page CTAs.
 *  - "newsletter": the top-of-funnel pop-up (First/Last/Email only).
 *
 * All three share a honeypot (`company`) and `source` (the page path), and
 * all funnel into `normalizeLead` below so the API route and the Odoo
 * client don't need to know which variant they're handling.
 */

const shared = {
  email: z.string().email("Please enter a valid email"),
  // Honeypot — must stay empty. Bots fill it; humans don't see it.
  company: z.string().max(0).optional().or(z.literal("")),
  // Where the lead came from (page path), for routing/analytics.
  source: z.string().optional(),
  // reCAPTCHA v3 token — verified server-side when keys are configured;
  // absent/unverifiable tokens are logged but don't block submission while
  // NEXT_PUBLIC_RECAPTCHA_SITE_KEY is unset (see /api/lead).
  recaptchaToken: z.string().optional(),
};

export const leadCompactSchema = z.object({
  variant: z.literal("compact"),
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(1, "Please enter a phone number"),
  preferPhoneCall: z.boolean().optional(),
  subscribeNewsletter: z.boolean().optional(),
  ...shared,
});

/** Experience of Interest — matches the client's document verbatim. */
export const experienceOfInterestOptions = [
  "Dove Hunting",
  "Mixed Bag",
  "Big Game",
  "Fly Fishing",
  "Beyond the Hunt",
  "Not sure yet",
] as const;

export const leadFullSchema = z.object({
  variant: z.literal("full"),
  firstName: z.string().min(1, "Please enter your first name"),
  lastName: z.string().min(1, "Please enter your last name"),
  phone: z.string().min(1, "Please enter a phone number"),
  // ISO 3166-1 alpha-2 code (or "OTHER") — see src/data/countries.ts.
  country: z.string().min(1, "Please select a country"),
  // Subdivision code when the country has one in src/data/subdivisions.ts,
  // otherwise free text (Country → State is a dependent dropdown in the UI).
  state: z.string().min(1, "Please select a state/province"),
  experienceOfInterest: z.enum(experienceOfInterestOptions, {
    error: "Please select an experience",
  }),
  message: z.string().max(2000).optional(),
  preferPhoneCall: z.boolean().optional(),
  subscribeNewsletter: z.boolean().optional(),
  // Opt-in, not a submit gate — the client's document lists this as an
  // optional checkbox that only controls whether we email the lead.
  agreeContact: z.boolean().optional(),
  ...shared,
});

export const leadNewsletterSchema = z.object({
  variant: z.literal("newsletter"),
  firstName: z.string().min(1, "Please enter your first name"),
  lastName: z.string().min(1, "Please enter your last name"),
  ...shared,
});

export const leadSchema = z.discriminatedUnion("variant", [
  leadCompactSchema,
  leadFullSchema,
  leadNewsletterSchema,
]);

export type LeadCompactInput = z.infer<typeof leadCompactSchema>;
export type LeadFullInput = z.infer<typeof leadFullSchema>;
export type LeadNewsletterInput = z.infer<typeof leadNewsletterSchema>;
export type LeadInput = z.infer<typeof leadSchema>;

/** A lead in the shape both the API route and the Odoo client want. */
export type NormalizedLead = {
  contactName: string;
  email: string;
  phone?: string;
  variant: LeadInput["variant"];
  source?: string;
  /** ISO country code, when the submission has one (full variant). */
  countryCode?: string;
  /** State/subdivision code or free text, when the submission has one. */
  stateCode?: string;
  experienceOfInterest?: string;
  /** True for the newsletter pop-up — tags the CRM lead accordingly. */
  isNewsletterSignup?: boolean;
  /** Human-readable free text — trip context, consent, everything that
   *  doesn't map to a first-class CRM field. */
  description: string;
};

/** Collapse any variant into one shape for delivery (Odoo / logs). */
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

  if (lead.variant === "newsletter") {
    return {
      contactName: `${lead.firstName} ${lead.lastName}`.trim(),
      email: lead.email,
      variant: lead.variant,
      source: lead.source,
      isNewsletterSignup: true,
      description: "Subscribed via the \"Join the FlyWays Community\" pop-up.",
    };
  }

  const lines = [
    `Experience of interest: ${lead.experienceOfInterest}`,
    `Country: ${lead.country}`,
    `State/Province: ${lead.state}`,
    lead.message ? `Message: ${lead.message}` : null,
    lead.preferPhoneCall ? "Prefers a phone call." : null,
    `Newsletter: ${lead.subscribeNewsletter ? "Yes" : "No"}`,
    lead.agreeContact
      ? "Agreed to be contacted by FlyWays via email."
      : "Did NOT check the email-contact opt-in.",
  ].filter((line): line is string => Boolean(line));

  return {
    contactName: `${lead.firstName} ${lead.lastName}`.trim(),
    email: lead.email,
    phone: lead.phone,
    variant: lead.variant,
    source: lead.source,
    countryCode: lead.country,
    stateCode: lead.state,
    experienceOfInterest: lead.experienceOfInterest,
    description: lines.join("\n"),
  };
}
