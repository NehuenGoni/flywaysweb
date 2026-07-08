import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Prose } from "@/components/ui/Prose";
import { WhyFlyways } from "@/components/home/WhyFlyways";
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
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <Eyebrow>Owner-run, since day one</Eyebrow>
            <h2 className="font-display mt-3 text-3xl sm:text-4xl">
              Not managed from a distance — run
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Prose
              size="lg"
              paragraphs={[
                "Flyways has operated in the fields of Córdoba for over two decades. Every season, every field rotation, every detail of how a day unfolds is handled by the people who own the company — and who are there when you arrive.",
                "That's the difference between a company that sells a hunt and one that has spent twenty years perfecting it. The bigger operators can match our scale. They can't put the owner in the field next to you.",
                "When you book with Flyways, you're not filling out a form into a system. You're starting a conversation with people who will remember you when you come back.",
              ]}
            />
          </Reveal>
        </div>
      </Section>

      {/* Reuse the four-pillar credentials block */}
      <WhyFlyways />

      {/* Team — placeholder until bios/photos are supplied */}
      <Section tone="paper">
        <Reveal>
          <Eyebrow>Our team</Eyebrow>
          <h2 className="font-display mt-3 max-w-2xl text-3xl sm:text-4xl">
            The people you&apos;ll actually meet
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/75">
            Owners, guides and lodge staff who have been doing this for years —
            most of them, for as long as Flyways has existed. Full team profiles
            and photos are coming soon.
          </p>
        </Reveal>
      </Section>

      <Testimonials />

      <CtaBand />
    </>
  );
}
