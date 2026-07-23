"use client";

import { useEffect } from "react";
import { trackViewExperience, type BusinessUnit } from "@/lib/analytics";

/**
 * Fires view_experience once when an experience page mounts. Rendered as an
 * invisible child of the (server) experience page — see
 * src/app/experiences/[slug]/page.tsx.
 */
export function ViewExperienceTracker({
  experience,
  businessUnit,
}: {
  experience: string;
  businessUnit: BusinessUnit;
}) {
  useEffect(() => {
    trackViewExperience({ experience, businessUnit });
  }, [experience, businessUnit]);

  return null;
}
