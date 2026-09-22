/**
 * Relationship / query layer between experiences and lodges. Lives in its
 * own file (rather than in experiences.ts or lodges.ts) to avoid a circular
 * import: experiences own the relationship (offering.lodgeSlugs), and both
 * content files need to be loaded before these can run.
 */
import { experiences } from "./experiences";
import { lodges } from "./lodges";
import { hasLodges, type Experience, type Lodge } from "./types";

export * from "./experiences";
export * from "./lodges";
export * from "./types";

/** The experience a lodge belongs to. First match wins. */
export function experienceForLodge(lodgeSlug: string): Experience | undefined {
  return experiences.find(
    (e) => hasLodges(e) && e.offering.lodgeSlugs.includes(lodgeSlug),
  );
}

/** Lodges for an experience, in the order declared on offering.lodgeSlugs. */
export function lodgesForExperience(experience: Experience): Lodge[] {
  if (!hasLodges(experience)) return [];
  return experience.offering.lodgeSlugs
    .map((slug) => lodges.find((l) => l.slug === slug))
    .filter((l): l is Lodge => Boolean(l));
}

/**
 * Replaces the old lodgesByCategory(): groups lodges by the experience they
 * belong to, in experience order, skipping experiences with no lodges.
 */
export function lodgeGroups(): { experience: Experience; lodges: Lodge[] }[] {
  return experiences
    .map((experience) => ({ experience, lodges: lodgesForExperience(experience) }))
    .filter((group) => group.lodges.length > 0);
}

export const publishedExperienceSlugs = experiences
  .filter((e) => e.status === "complete")
  .map((e) => e.slug);

export const publishedLodgeSlugs = lodges
  .filter((l) => l.status === "complete")
  .map((l) => l.slug);

if (process.env.NODE_ENV === "development") {
  const referenced = experiences.flatMap((e) => (hasLodges(e) ? e.offering.lodgeSlugs : []));

  for (const slug of referenced) {
    if (!lodges.some((l) => l.slug === slug)) {
      console.warn(`[content] experience references a lodge that doesn't exist: ${slug}`);
    }
  }

  for (const lodge of lodges) {
    if (!referenced.includes(lodge.slug)) {
      console.warn(`[content] lodge has no experience pointing to it: ${lodge.slug}`);
    }
  }

  const tables = [
    ...experiences.map((e) => e.whenToCome),
    ...lodges.map((l) => l.whenToCome),
  ].filter((t): t is NonNullable<typeof t> => Boolean(t));

  for (const table of tables) {
    for (const row of table.rows) {
      if (row.values.length !== table.columns.length) {
        console.warn(
          `[content] WhenToCome "${table.heading}": row "${row.label}" has ${row.values.length} values, expected ${table.columns.length}`,
        );
      }
    }
  }
}
