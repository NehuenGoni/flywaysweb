import type { ExperienceIconName } from "@/components/brand/icons";

export type ContentStatus = "complete" | "placeholder";

/** A titled block of prose (heading + paragraphs). */
export interface ProseSection {
  eyebrow?: string;
  heading: string;
  body: string[];
}

export interface SeasonRow {
  name: string;
  window: string;
  description: string;
}

export interface SeasonBlock {
  heading: string;
  intro?: string;
  rows: SeasonRow[];
  note?: string;
}

export type LodgeCategory = "Dove hunting" | "Fly fishing" | "Big game";

export interface Experience {
  slug: string;
  status: ContentStatus;
  navLabel: string;
  /** H1 / page title */
  title: string;
  metaTitle: string;
  metaDescription: string;
  icon: ExperienceIconName;
  heroHeadline: string;
  heroSubhead: string;
  /** short line used on home / index cards */
  cardSummary: string;
  intro: string[];
  field: ProseSection;
  seasons?: SeasonBlock;
  whyFlyways?: ProseSection;
  /** lodges to surface in the "Choose your lodge" block, in order */
  lodgeSlugs: string[];
  priceFrom?: string;
}

export interface RateRow {
  label: string;
  value: string;
  emphasis?: boolean;
}

export interface Rates {
  seasonLabel: string;
  rows: RateRow[];
  occupancyNote?: string;
  included: string[];
  notIncluded: string[];
  payment: string[];
}

export interface Lodge {
  slug: string;
  status: ContentStatus;
  name: string;
  category: LodgeCategory;
  /** experience slug this lodge belongs to */
  experienceSlug: string;
  location: string;
  capacity: string;
  heroSubhead: string;
  cardSummary: string;
  intro: string[];
  shooting: ProseSection;
  /** amenity line-items rendered as a pill list */
  amenities: string[];
  amenitiesNote?: string[];
  recognition: { orvis: boolean; beretta: boolean };
  rates?: Rates;
}

/** Shared recognition copy (Orvis Endorsed + Beretta Trident). */
export const RECOGNITION = {
  orvis: {
    title: "Orvis Endorsed Lodge",
    body: "One of a select group of international operations that meet Orvis's standards for guide quality, sustainable practices, and guest experience.",
  },
  beretta: {
    title: "Beretta Trident Lodge",
    body: "Certified by Beretta for meeting their criteria across shooting quality, accommodations, and service.",
  },
  footnote: "Both recognitions require ongoing performance. Neither is honorary.",
} as const;
