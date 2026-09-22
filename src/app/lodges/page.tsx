import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LodgeCard } from "@/components/lodge/LodgeCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { lodgeGroups } from "@/content/index";

export const metadata: Metadata = {
  title: "The Lodges",
  description:
    "Every FlyWays lodge, grouped by experience: dove hunting in Córdoba, mixed bag in Buenos Aires, big game in the Córdoba hills.",
};

export default function LodgesPage() {
  const groups = lodgeGroups();

  return (
    <>
      <PageHero
        eyebrow="Where you'll stay"
        title="The Lodges"
        subhead="Once you've chosen your experience, this is where you choose your base. Every FlyWays lodge holds the same standard of service, food and field quality."
      />

      {groups.map((group, gi) => (
        <Section key={group.experience.slug} tone={gi % 2 === 0 ? "paper" : "paperDim"}>
          <Reveal>
            <Eyebrow>{group.experience.navLabel}</Eyebrow>
            <h2 className="font-display mt-3 text-3xl sm:text-4xl">
              {group.experience.navLabel} lodges
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {group.lodges.map((lodge, i) => (
              <Reveal key={lodge.slug} delay={i * 0.06}>
                <LodgeCard lodge={lodge} />
              </Reveal>
            ))}
          </div>
        </Section>
      ))}

      <CtaBand />
    </>
  );
}
