import { Hero } from "@/components/home/Hero";
import { StatsStrip } from "@/components/home/StatsStrip";
import { Endorsements } from "@/components/home/Endorsements";
import { FeaturedPicks } from "@/components/home/FeaturedPicks";
import { Testimonials } from "@/components/home/Testimonials";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Prose } from "@/components/ui/Prose";
import { LeadSection } from "@/components/sections/LeadSection";

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero */}
      <Hero />
      <StatsStrip />
      <Endorsements />

      {/* Institutional copy */}
      <Section tone="paper" containerClassName="max-w-3xl text-center">
        <Reveal>
          <Prose
            size="lg"
            className="mx-auto"
            paragraphs={[
              "For more than 20 years, FlyWays has set the standard for premium hunting and fishing experiences in Argentina. What began in the legendary dove fields of Córdoba has grown into a portfolio of world-class wingshooting, fly fishing and big game adventures. Orvis Endorsed, Beretta Trident Certified, and still owner-operated.",
            ]}
          />
        </Reveal>
      </Section>

      {/* 2 — The experiences (entry point to the site) */}
      <Section tone="paper">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>Start here</Eyebrow>
              <h2 className="font-display mt-3 max-w-xl text-3xl sm:text-5xl">
                Choose your experience
              </h2>
            </div>
            <p className="max-w-sm text-ink/70">
              Most hunters arrive knowing the bird before the lodge. Pick the
              experience — we&apos;ll match you to the right place to stay.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-12">
            <FeaturedPicks />
          </div>
        </Reveal>
      </Section>

      {/* 3 — Testimonials + Google reviews */}
      <Testimonials />

      {/* 4 — Final CTA: schedule a call / lead form */}
      <LeadSection
        heading="Let's plan your trip"
        body="Tell us roughly when you'd like to come and who's traveling — or schedule a call and talk it through with a real person at FlyWays."
      />
    </>
  );
}
