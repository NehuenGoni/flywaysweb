import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Prose } from "@/components/ui/Prose";
import { TeamSection } from "@/components/team/TeamSection";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Why Flyways",
  description:
    "Twenty years, owner-run, Orvis Endorsed and Beretta certified. Why hunters choose FlyWays over the bigger operators — and book again before they leave.",
};

export default function WhyFlywaysPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Flyways"
        title="The reputation is real. Now the story behind it."
        subhead="For twenty years we've quietly run the best dove hunting in Argentina. Here's what sets us apart — and why our guests keep coming back."
        tone="olive"
      />

      <Section tone="paper">
        <Reveal>
          <Eyebrow>About Us</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <Prose
            size="lg"
            className="mt-4 max-w-3xl"
            paragraphs={[
              "It all began with dove hunting in the legendary fields of Córdoba, where FlyWays built its reputation season after season. Today, that same standard extends across Argentina's finest hunting and fishing destinations, with strategically located lodges and carefully selected hunting grounds that maximize time in the field and minimize time on the road.",
              "A team built over two decades, present at every experience, close enough to know that no two hunters are the same, and no two itineraries should be either. Attention to detail, logistics, daily pace, meals, non-hunting days — all built around our guests.",
              "That standard has earned FlyWays its place: Orvis Endorsed, Beretta certified, and a repeat rate that speaks louder than either. It's also why the hunt is only part of the story. Horseback riding and polo, wine tastings, cooking classes, spa days, evenings with tango under the open sky — Argentina has as much to offer off the field as on it, and FlyWays brings all of it together with the same attention to detail.",
              "This is more than a hunting trip. It's a once-in-a-lifetime experience. One you'll want to repeat, every year.",
            ]}
          />
        </Reveal>
      </Section>

      <TeamSection />

      <Testimonials />

      <CtaBand />
    </>
  );
}
