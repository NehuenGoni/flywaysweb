import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";
import { ScheduleCallButton } from "@/components/ui/ScheduleCallButton";
import { ProseFeature } from "@/components/sections/ProseFeature";
import { WhenToComeTable } from "@/components/experience/WhenToComeTable";
import { ChooseYourLodge } from "@/components/experience/ChooseYourLodge";
import { ProgramItinerary } from "@/components/experience/ProgramItinerary";
import { FishingZones } from "@/components/experience/FishingZones";
import { ActivityGrid, visibleActivities } from "@/components/experience/ActivityGrid";
import { ListGroups } from "@/components/sections/ListGroups";
import { ViewExperienceTracker } from "@/components/experience/ViewExperienceTracker";
import { LeadSection } from "@/components/sections/LeadSection";
import { experienceSlugs, getExperience, lodgesForExperience } from "@/content/index";
import { businessUnitForExperienceIcon } from "@/lib/analytics";
import { toneByIcon } from "@/lib/tone";

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
    ...(experience.status === "placeholder" && { robots: { index: false, follow: true } }),
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

  const mediaTone = toneByIcon[experience.icon];
  const businessUnit = businessUnitForExperienceIcon(experience.icon);
  const lodges = lodgesForExperience(experience);
  const offering = experience.offering;

  return (
    <>
      <ViewExperienceTracker experience={experience.navLabel} businessUnit={businessUnit} />

      <PageHero
        eyebrow={experience.navLabel}
        title={experience.heroHeadline}
        subhead={experience.heroSubhead}
        icon={experience.icon}
      >
        <ScheduleCallButton
          placement="page"
          variant="onDark"
          size="lg"
          businessUnit={businessUnit}
          experience={experience.navLabel}
        />
      </PageHero>

      {/* Intro */}
      <Section tone="paper">
        <Reveal>
          <Prose paragraphs={experience.intro} size="lg" className="max-w-3xl" />
        </Reveal>
      </Section>

      {/* What a day looks like / on the water */}
      {experience.field && (
        <Section tone="paperDim">
          <ProseFeature
            section={experience.field}
            mediaTone={mediaTone}
            mediaIcon={experience.icon}
            mediaLabel={experience.navLabel}
          />
        </Section>
      )}

      {/* When to come */}
      {experience.whenToCome && (
        <Section tone="paper">
          <WhenToComeTable table={experience.whenToCome} />
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

      {/* Offering: lodges, programs, or activities */}
      {offering.kind === "lodges" && lodges.length > 0 && (
        <Section tone="paper">
          <ChooseYourLodge
            lodges={lodges}
            title={offering.heading ?? (lodges.length === 2 ? "Two lodges. One standard." : "Choose your lodge")}
            intro={offering.intro}
          />
        </Section>
      )}

      {offering.kind === "programs" && (
        <>
          {offering.programs.length > 0 && (
            <Section tone="paper">
              {offering.intro && (
                <Reveal>
                  <Prose paragraphs={[offering.intro]} size="lg" className="max-w-3xl" />
                </Reveal>
              )}
              <div className="mt-10 grid gap-14 lg:grid-cols-2">
                {offering.programs.map((program) => (
                  <ProgramItinerary key={program.slug} program={program} />
                ))}
              </div>
            </Section>
          )}
          {offering.zones && (
            <Section tone="paperDim">
              <FishingZones block={offering.zones} />
            </Section>
          )}
          {offering.highlights && (
            <Section tone="paper">
              <ListGroups block={offering.highlights} />
            </Section>
          )}
        </>
      )}

      {offering.kind === "activities" && (
        <>
          {offering.groups
            .filter((group) => visibleActivities(group).length > 0)
            .map((group, i) => (
              <Section key={group.heading} tone={i % 2 === 0 ? "paper" : "paperDim"}>
                <ActivityGrid group={group} />
              </Section>
            ))}
          {offering.features?.map((feature, i) => (
            <Section key={feature.heading} tone={i % 2 === 0 ? "teal" : "paper"}>
              <div className="mx-auto max-w-3xl text-center">
                <ProseFeature section={feature} mediaTone={mediaTone} mediaIcon={experience.icon} />
              </div>
            </Section>
          ))}
          {offering.sideTrips && (
            <Section tone="paperDim">
              <div className="max-w-2xl">
                <h2 className="font-display text-3xl sm:text-4xl">{offering.sideTrips.heading}</h2>
                {offering.sideTrips.intro && (
                  <p className="mt-4 text-lg leading-relaxed text-ink/75">{offering.sideTrips.intro}</p>
                )}
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {offering.sideTrips.destinations.map((d) => (
                    <li
                      key={d}
                      className="rounded-full border border-ink/12 bg-paper px-4 py-2 text-sm text-ink/80"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Section>
          )}
        </>
      )}

      {/* Lead form */}
      <LeadSection
        heading="Plan your trip"
        body={`Tell us roughly when you'd like to come for ${experience.title.toLowerCase()} and who's traveling. We'll reply personally.`}
        businessUnit={businessUnit}
        experience={experience.navLabel}
      />
    </>
  );
}
