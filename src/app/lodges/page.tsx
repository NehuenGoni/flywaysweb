import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LodgeCard } from "@/components/lodge/LodgeCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { lodgesByCategory } from "@/content/lodges";

export const metadata: Metadata = {
  title: "The Lodges",
  description:
    "FlyWays lodges, organized by experience: dove hunting in Córdoba (Los Chañares, Posta del Norte) and fly fishing in Patagonia.",
};

export default function LodgesPage() {
  const groups = lodgesByCategory();

  return (
    <>
      <PageHero
        eyebrow="Where you'll stay"
        title="The Lodges"
        subhead="Once you've chosen your experience, this is where you choose your base. Every FlyWays lodge holds the same standard of service, food and field quality."
      />

      {groups.map((group, gi) => (
        <Section key={group.category} tone={gi % 2 === 0 ? "paper" : "paperDim"}>
          <Reveal>
            <Eyebrow>{group.category}</Eyebrow>
            <h2 className="font-display mt-3 text-3xl sm:text-4xl">
              {group.category} lodges
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((lodge, i) => (
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
