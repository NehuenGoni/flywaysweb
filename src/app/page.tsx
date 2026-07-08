import { Hero } from "@/components/home/Hero";
import { WhyFlyways } from "@/components/home/WhyFlyways";
import { Testimonials } from "@/components/home/Testimonials";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { LodgeCard } from "@/components/lodge/LodgeCard";
import { LeadSection } from "@/components/sections/LeadSection";
import { experiences } from "@/content/experiences";
import { lodges } from "@/content/lodges";

export default function HomePage() {
  const featuredLodges = lodges.filter((l) => l.category === "Dove hunting");

  return (
    <>
      {/* 1 — Hero */}
      <Hero />

      {/* 2 — The four experiences (entry point to the site) */}
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

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {experiences.map((experience, i) => (
            <Reveal key={experience.slug} delay={i * 0.06}>
              <ExperienceCard experience={experience} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3 — Why Flyways */}
      <WhyFlyways />

      {/* 4 — The lodges */}
      <Section tone="paper">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>The Lodges</Eyebrow>
              <h2 className="font-display mt-3 max-w-xl text-3xl sm:text-5xl">
                Where you&apos;ll stay
              </h2>
            </div>
            <ButtonLink href="/lodges" variant="outline">
              See all lodges →
            </ButtonLink>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {featuredLodges.map((lodge, i) => (
            <Reveal key={lodge.slug} delay={i * 0.07}>
              <LodgeCard lodge={lodge} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 5 — Testimonials + Google reviews */}
      <Testimonials />

      {/* 6 — Final CTA: book a call / lead form */}
      <LeadSection
        heading="Let's plan your trip"
        body="Tell us roughly when you'd like to come and who's traveling — or book a call and talk it through with a real person at FlyWays."
      />
    </>
  );
}
