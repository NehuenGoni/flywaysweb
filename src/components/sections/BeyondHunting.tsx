import Link from "next/link";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { getExperience, hasActivities } from "@/content/index";

type Tone = "paper" | "paperDim" | "teal";

/**
 * Teaser for the "Beyond the Hunt" experience: a handful of Discover Córdoba
 * activities plus the side-trip destinations, both sourced from
 * src/content/activities.ts via the beyond-the-hunt experience — not
 * hardcoded here. Rendered on the home page and on /experiences.
 */
export function BeyondHunting({ tone = "paperDim" }: { tone?: Tone }) {
  const onDark = tone === "teal";
  const experience = getExperience("beyond-the-hunt");
  if (!experience || !hasActivities(experience)) return null;

  const items = experience.offering.groups
    .flatMap((g) => g.items)
    .filter((a) => a.body.length > 0)
    .slice(0, 4);
  const destinations = experience.offering.sideTrips?.destinations.slice(0, 4) ?? [];

  return (
    <Section tone={tone}>
      <Reveal>
        <Eyebrow className={onDark ? "text-sky" : undefined}>Beyond the Hunt</Eyebrow>
        <h2 className="font-display mt-3 max-w-2xl text-3xl sm:text-5xl">
          You&apos;re already in Argentina. Make the most of it.
        </h2>
        <p
          className={
            "mt-5 max-w-2xl text-lg leading-relaxed " +
            (onDark ? "text-paper/80" : "text-ink/75")
          }
        >
          {experience.cardSummary} Every trip is built to measure — we handle the
          logistics, the guides and the details end to end.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal key={item.slug} delay={i * 0.07}>
            <div className="h-full rounded-2xl border border-ink/10 bg-paper p-7">
              <h3 className="font-display text-lg text-ink">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {item.body[0]}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {destinations.length > 0 && (
        <p
          className={
            "mt-8 text-sm " + (onDark ? "text-paper/70" : "text-ink/60")
          }
        >
          Side trips: {destinations.join(" · ")}
        </p>
      )}

      <Reveal delay={0.2}>
        <Link
          href={`/experiences/${experience.slug}`}
          className={
            "mt-6 inline-flex items-center gap-1.5 text-sm font-medium " +
            (onDark ? "text-sky" : "text-teal")
          }
        >
          Explore Beyond the Hunt
          <span aria-hidden>→</span>
        </Link>
      </Reveal>
    </Section>
  );
}
