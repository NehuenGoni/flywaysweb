import { z } from "zod";

/**
 * The single, standard lead form used across the whole site
 * (experiences, lodges, home, contact). One schema, one shape.
 */
export const leadSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  dates: z.string().min(2, "Roughly when are you thinking?"),
  party: z.string().min(1, "How many in your party?"),
  message: z.string().max(2000).optional().or(z.literal("")),
  // Honeypot — must stay empty. Bots fill it; humans don't see it.
  company: z.string().max(0).optional().or(z.literal("")),
  // Where the lead came from (page path), for routing/analytics.
  source: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
