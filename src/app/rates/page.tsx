import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { RatesTable } from "@/components/lodge/RatesTable";
import { CtaBand } from "@/components/sections/CtaBand";
import { lodges, experienceForLodge } from "@/content/index";
import { businessUnitForExperienceIcon } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Rates",
  description:
    "FlyWays rates by lodge — published pricing where available, and a quote on request for the rest.",
};

/**
 * Derived entirely from lodge content already in the repo — no new client
 * copy required. Grows on its own as more lodges get published rates.
 */
export default function RatesPage() {
  const withRates = lodges.filter((l) => l.rates);

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Rates"
        subhead="Clear pricing where we can publish it, and a personal quote everywhere else. Every rate includes accommodations, meals and professional guides."
      />

      {withRates.map((lodge, i) => {
        const experience = experienceForLodge(lodge.slug);
        const businessUnit = experience ? businessUnitForExperienceIcon(experience.icon) : undefined;
        return (
          <Section key={lodge.slug} tone={i % 2 === 0 ? "teal" : "ink"}>
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <Reveal>
                <Eyebrow className="text-sky">{experience?.navLabel}</Eyebrow>
                <h2 className="font-display mt-3 text-3xl text-paper sm:text-4xl">{lodge.name}</h2>
                <p className="mt-4 text-paper/70">{lodge.location}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <RatesTable
                  rates={lodge.rates!}
                  lodgeName={lodge.name}
                  businessUnit={businessUnit}
                  experience={experience?.navLabel}
                />
              </Reveal>
            </div>
          </Section>
        );
      })}

      <CtaBand
        heading="Rates for Mixed Bag and Big Game?"
        body="Those programs are quoted per group, dates and species — schedule a call and we'll put a number to it."
      />
    </>
  );
}
