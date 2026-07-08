import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ProseFeature } from "@/components/sections/ProseFeature";
import { SeasonTable } from "@/components/experience/SeasonTable";
import { ChooseYourLodge } from "@/components/experience/ChooseYourLodge";
import { LeadSection } from "@/components/sections/LeadSection";
import { experienceSlugs, getExperience } from "@/content/experiences";
import { getLodges } from "@/content/lodges";
import { siteConfig } from "@/data/site";

export function generateStaticParams() {
  return experienceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const experience = getExperience(slug);
  if (!experience) return {};
  return {
    title: experience.metaTitle,
    description: experience.metaDescription,
    alternates: { canonical: `/experiences/${experience.slug}` },
    openGraph: {
      title: experience.metaTitle,
      description: experience.metaDescription,
      url: `/experiences/${experience.slug}`,
    },
  };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experience = getExperience(slug);
  if (!experience) notFound();

  const lodges = getLodges(experience.lodgeSlugs);
  const mediaTone =
    experience.icon === "fish" ? "ink" : experience.icon === "deer" ? "bark" : "teal";

  return (
    <>
      <PageHero
        eyebrow={experience.navLabel}
        title={experience.heroHeadline}
        subhead={experience.heroSubhead}
        icon={experience.icon}
      >
        <ButtonLink href={siteConfig.bookingUrl} external variant="onDark" size="lg">
          Book a call →
        </ButtonLink>
      </PageHero>

      {/* Intro */}
      <Section tone="paper">
        <Reveal>
          <Prose paragraphs={experience.intro} size="lg" className="max-w-3xl" />
        </Reveal>
      </Section>

      {/* What a day looks like / on the water */}
      <Section tone="paperDim">
        <ProseFeature
          section={experience.field}
          mediaTone={mediaTone}
          mediaIcon={experience.icon}
          mediaLabel={experience.navLabel}
        />
      </Section>

      {/* Seasons */}
      {experience.seasons && (
        <Section tone="paper">
          <SeasonTable seasons={experience.seasons} />
        </Section>
      )}

      {/* Why Flyways (credentials) */}
      {experience.whyFlyways && (
        <Section tone="teal">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <p className="font-display text-xs uppercase tracking-[0.28em] text-sky">
                {experience.whyFlyways.eyebrow}
              </p>
              <h2 className="font-display mt-4 text-3xl sm:text-4xl">
                {experience.whyFlyways.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Prose paragraphs={experience.whyFlyways.body} size="lg" />
            </Reveal>
          </div>
        </Section>
      )}

      {/* Choose your lodge */}
      {lodges.length > 0 && (
        <Section tone="paper">
          <ChooseYourLodge
            lodges={lodges}
            title={lodges.length === 2 ? "Two lodges. One standard." : "Choose your lodge"}
            intro={
              experience.slug === "dove-hunting-cordoba"
                ? "Both Flyways dove hunting lodges operate to the same level of service, food, and field quality. The choice comes down to group size, setting, and what kind of experience you're after."
                : undefined
            }
          />
        </Section>
      )}

      {/* Lead form */}
      <LeadSection
        heading="Plan your trip"
        body={`Tell us roughly when you'd like to come for ${experience.title.toLowerCase()} and who's traveling. We'll reply personally.`}
      />
    </>
  );
}
