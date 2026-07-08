import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LodgeCard } from "@/components/lodge/LodgeCard";
import { PlanWhen } from "@/components/plan/PlanWhen";
import { PlanRoute } from "@/components/plan/PlanRoute";
import { LeadSection } from "@/components/sections/LeadSection";
import { lodges } from "@/content/lodges";

export const metadata: Metadata = {
  title: "Plan your trip",
  description:
    "When to come, which lodge fits you, and how to get to Córdoba. Everything you need to plan a FlyWays dove hunting trip.",
};

export default function PlanYourTripPage() {
  const doveLodges = lodges.filter((l) => l.category === "Dove hunting");

  return (
    <>
      <PageHero
        eyebrow="Plan your trip"
        title="Three questions, and you're most of the way there"
        subhead="When should you come, which lodge fits you, and how do you get here? Work through these — then book a call and we'll handle the rest."
      />

      {/* 1 — When should I come */}
      <Section tone="paper" id="when">
        <Reveal>
          <Eyebrow>01 — When should I come?</Eyebrow>
          <h2 className="font-display mt-3 max-w-2xl text-3xl sm:text-4xl">
            Córdoba shoots all year
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/75">
            Two seasons, both exceptional. Pick a month to see what to expect.
          </p>
        </Reveal>
        <div className="mt-10">
          <PlanWhen />
        </div>
      </Section>

      {/* 2 — Which lodge fits me */}
      <Section tone="paperDim" id="lodge">
        <Reveal>
          <Eyebrow>02 — Which lodge fits me?</Eyebrow>
          <h2 className="font-display mt-3 max-w-2xl text-3xl sm:text-4xl">
            Same standard, different setting
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/75">
            Both dove lodges hold the same level of service, food and field
            quality. The choice comes down to group size and the kind of stay you
            want.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {doveLodges.map((lodge, i) => (
            <Reveal key={lodge.slug} delay={i * 0.08}>
              <LodgeCard lodge={lodge} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3 — How do I get there */}
      <Section tone="teal" id="getting-here">
        <Reveal>
          <Eyebrow className="text-sky">03 — How do I get there?</Eyebrow>
          <h2 className="font-display mt-3 max-w-2xl text-3xl sm:text-4xl">
            Easier than you&apos;d think
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-paper/75">
            Most guests route through Buenos Aires and connect to Córdoba. Pick
            your departure city for a suggested routing.
          </p>
        </Reveal>
        <div className="mt-10">
          <PlanRoute />
        </div>
      </Section>

      <LeadSection
        heading="Ready when you are"
        body="Tell us your rough dates and group size, and we'll put together a plan — or book a call to talk it through."
      />
    </>
  );
}
