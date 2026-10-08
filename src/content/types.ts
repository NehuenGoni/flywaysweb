import type { ExperienceIconName } from "@/components/brand/icons";

export type ContentStatus = "complete" | "placeholder";

/** Reference to a photo/video asset. Omitted fields fall back to <Placeholder />. */
export interface MediaRef {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  credit?: string;
}

/** A titled block of prose (heading + paragraphs), optionally with bullets/media. */
export interface ProseSection {
  eyebrow?: string;
  heading: string;
  body: string[];
  /** Bullet list rendered under the prose (e.g. lodge highlights). */
  bullets?: string[];
  /** Short caveat rendered under the section. */
  note?: string;
  image?: MediaRef;
}

/** A titled group of bullet lists (e.g. "Truck and Camp Highlights"). */
export interface LabeledList {
  name: string;
  items: string[];
}

export interface ListBlock {
  eyebrow?: string;
  heading: string;
  intro?: string;
  groups: LabeledList[];
  note?: string;
}

/* ────────────────────────── When to come (season matrix) ────────────── */

/**
 * The client's "When to Come" table is a transposed matrix: seasons are
 * columns, attributes (temperature, rainfall, shooting type, price) are
 * rows. `columns[i]` corresponds by index to `row.values[i]` for every row.
 */
export interface SeasonColumn {
  /** Stable key to cross-reference with RateRow.seasonId. e.g. "summer". */
  id: string;
  name: string;
  /** e.g. "Jan 1 – Mar 31" — the single source of truth for the date range. */
  window: string;
  /** One-line summary; feeds the mobile/card layout. */
  summary?: string;
}

export interface SeasonAttributeRow {
  /** "Temperature" | "Rainfall" | "Hunting" | "Rate" … */
  label: string;
  /** One value per column, same length/order as `columns`. */
  values: string[];
}

export interface WhenToCome {
  heading: string;
  intro?: string;
  columns: SeasonColumn[];
  rows: SeasonAttributeRow[];
  note?: string;
}

/* ──────────────────────────────── Rates ──────────────────────────────── */

export interface RateRow {
  label: string;
  value: string;
  emphasis?: boolean;
  /** Cross-references SeasonColumn.id; avoids repeating the date window. */
  seasonId?: string;
}

interface RatesBase {
  seasonLabel: string;
  /** Accessory costs with a price: shells, license, rental, transfer. */
  extras?: RateRow[];
  included?: string[];
  notIncluded?: string[];
  payment?: string[];
  occupancyNote?: string;
}

/** A published price table (today: only Estancia Los Chañares). */
export interface PublishedRates extends RatesBase {
  kind: "published";
  rows: RateRow[];
}

/**
 * "Rates vary — contact our team" (Posta del Norte): there's copy and
 * accessory costs, but no table. A distinct render variant, not an empty
 * `rows: []`.
 */
export interface OnRequestRates extends RatesBase {
  kind: "onRequest";
  body: string[];
}

export type Rates = PublishedRates | OnRequestRates;

/* ──────────────────────────────── Lodge ──────────────────────────────── */

export interface Lodge {
  slug: string;
  status: ContentStatus;
  name: string;
  /** e.g. "Buenos Aires" | "Northern Córdoba · On Route 9" */
  location: string;
  /** The "Animal type" row of the lodge fact sheet, e.g. ["Duck", "Pigeon", "Perdiz", "Dove"]. */
  species: string[];
  capacity?: string;
  heroSubhead: string;
  cardSummary: string;
  /** "About" block. */
  intro: string[];
  /** The Lodging / The Shooting|The Hunting / The Service, in render order. */
  sections: ProseSection[];
  amenities?: string[];
  amenitiesNote?: string[];
  recognition?: { orvis: boolean; beretta: boolean };
  whenToCome?: WhenToCome;
  rates?: Rates;
  hero?: MediaRef;
  gallery?: MediaRef[];
}

/* ─────────────────────── Fly fishing programs ─────────────────────────── */

export interface ItineraryDay {
  /** As grouped by the client's copy, e.g. "Day 1" | "Days 3–5". */
  label: string;
  title?: string;
  body: string[];
  bullets?: string[];
}

export interface Program {
  slug: string;
  status: ContentStatus;
  name: string;
  /** e.g. "8 days / 7 nights" */
  durationLabel: string;
  location?: string;
  cardSummary?: string;
  intro: string[];
  itinerary: ItineraryDay[];
  included?: string[];
  notIncluded?: string[];
  rates?: Rates;
  hero?: MediaRef;
}

export type FishingMethod = "Float" | "Wade" | "Motorboat";

export interface Water {
  name: string;
  /** A water can be both float and wade, hence an array. */
  methods: FishingMethod[];
  note?: string;
}

export interface FishingZone {
  name: string;
  description?: string;
  waters: Water[];
}

export interface FishingZonesBlock {
  heading: string;
  intro?: string;
  zones: FishingZone[];
  note?: string;
}

/* ────────────────────────── Beyond the Hunt ───────────────────────────── */

export interface Activity {
  slug: string;
  status: ContentStatus;
  name: string;
  body: string[];
  /** e.g. "October only" — the Tulip Experience's seasonality. */
  availability?: string;
  /** e.g. "Córdoba" | "Patagonia" */
  region?: string;
  image?: MediaRef;
}

export interface ActivityGroup {
  heading: string;
  intro?: string;
  items: Activity[];
}

/** Side trips: destination names only, no dedicated copy per destination. */
export interface DestinationList {
  heading: string;
  intro?: string;
  destinations: string[];
  note?: string;
}

/* ──────────────────────── Experience ↔ offering ───────────────────────── */

/**
 * What an experience offers. A discriminated union rather than optional
 * fields: the relationship used to be duplicated (Experience.lodgeSlugs +
 * Lodge.experienceSlug) and already inconsistent. Each variant carries only
 * what is valid for it, and pages branch on `kind` to render blocks in the
 * order each experience actually needs.
 */
export type ExperienceOffering =
  | {
      kind: "lodges";
      heading?: string;
      intro?: string;
      /** Display order — the single source of truth for this relationship. */
      lodgeSlugs: string[];
    }
  | {
      kind: "programs";
      heading?: string;
      intro?: string;
      zones?: FishingZonesBlock;
      highlights?: ListBlock;
      programs: Program[];
    }
  | {
      kind: "activities";
      groups: ActivityGroup[];
      /** Standalone long-form blocks, e.g. the Tulip Experience. */
      features?: ProseSection[];
      sideTrips?: DestinationList;
    }
  | { kind: "none" };

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
  /** "What a day looks like" / "On the water". Not every experience has one. */
  field?: ProseSection;
  whenToCome?: WhenToCome;
  whyFlyways?: ProseSection;
  offering: ExperienceOffering;
  priceFrom?: string;
  hero?: MediaRef;
}

/* ──────────────────────── narrowing helpers ───────────────────────────── */

export type LodgeOffering = Extract<ExperienceOffering, { kind: "lodges" }>;
export type ProgramOffering = Extract<ExperienceOffering, { kind: "programs" }>;
export type ActivitiesOffering = Extract<ExperienceOffering, { kind: "activities" }>;

export function hasLodges(
  e: Experience,
): e is Experience & { offering: LodgeOffering } {
  return e.offering.kind === "lodges";
}

export function hasPrograms(
  e: Experience,
): e is Experience & { offering: ProgramOffering } {
  return e.offering.kind === "programs";
}

export function hasActivities(
  e: Experience,
): e is Experience & { offering: ActivitiesOffering } {
  return e.offering.kind === "activities";
}

/* ──────────────────────── shared copy / constants ─────────────────────── */

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

/**
 * Accessory costs repeated verbatim across dove-hunting lodges in the
 * client's document. Centralized here so each lodge references it instead
 * of copy-pasting a set of numbers that will need updating together.
 */
export const RATE_EXTRAS: RateRow[] = [
  { label: "Shells", value: "$22.75 / box of 25" },
  { label: "Hunting license", value: "$75 / day" },
  { label: "Gun rental", value: "$85 / day" },
  { label: "Field transfer (one-time)", value: "$120" },
];

export const PAYMENT_TERMS: string[] = [
  "50% deposit to confirm dates (non-refundable)",
  "Balance due 60 days prior",
  "Trip insurance available upon request",
  "Credit card surcharge: 3.95%",
];
