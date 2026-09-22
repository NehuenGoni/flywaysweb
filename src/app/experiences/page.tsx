import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { BeyondHunting } from "@/components/sections/BeyondHunting";
import { CtaBand } from "@/components/sections/CtaBand";
import { experiences } from "@/content/experiences";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Choose your experience: Córdoba dove hunting, Argentina mixed bag, Patagonia fly fishing or big game — all run to the FlyWays standard.",
};

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Where to begin"
        title="Choose your experience"
        subhead="Most hunters arrive knowing the bird before they know the lodge. Start here — pick the experience, and we'll match you to the right place to stay."
      />
      <Section tone="paper">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience, i) => (
            <Reveal key={experience.slug} delay={i * 0.06}>
              <ExperienceCard experience={experience} />
            </Reveal>
          ))}
        </div>
      </Section>
      <BeyondHunting tone="paperDim" />
      <CtaBand />
    </>
  );
}
