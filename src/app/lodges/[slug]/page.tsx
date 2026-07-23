import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ScheduleCallButton } from "@/components/ui/ScheduleCallButton";
import { ProseFeature } from "@/components/sections/ProseFeature";
import { RatesTable } from "@/components/lodge/RatesTable";
import { Recognition } from "@/components/lodge/Recognition";
import { CtaBand } from "@/components/sections/CtaBand";
import { lodgeSlugs, getLodge } from "@/content/lodges";
import { getExperience } from "@/content/experiences";
import { businessUnitForLodgeCategory } from "@/lib/analytics";

export function generateStaticParams() {
  return lodgeSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lodge = getLodge(slug);
  if (!lodge) return {};
  const title = `${lodge.name} — ${lodge.category}`;
  const description = `${lodge.name}: ${lodge.heroSubhead}`;
  return {
    title,
    description,
    alternates: { canonical: `/lodges/${lodge.slug}` },
    openGraph: { title, description, url: `/lodges/${lodge.slug}` },
  };
}

const heroToneByCategory = {
  "Dove hunting": "teal",
  "Fly fishing": "ink",
  "Big game": "olive",
} as const;

const iconByCategory = {
  "Dove hunting": "dove",
  "Fly fishing": "fish",
  "Big game": "deer",
} as const;

export default async function LodgePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lodge = getLodge(slug);
  if (!lodge) notFound();

  const experience = getExperience(lodge.experienceSlug);
  const mediaTone = heroToneByCategory[lodge.category];
  const icon = iconByCategory[lodge.category];
  const businessUnit = businessUnitForLodgeCategory(lodge.category);

  return (
    <>
      <PageHero
        eyebrow={lodge.category}
        title={lodge.name}
        subhead={lodge.heroSubhead}
        tone={heroToneByCategory[lodge.category]}
        icon={icon}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-paper/80">
          <span>{lodge.location}</span>
          <span aria-hidden className="text-paper/30">·</span>
          <span>{lodge.capacity}</span>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <ScheduleCallButton
            placement="page"
            variant="onDark"
            size="lg"
            businessUnit={businessUnit}
            experience={experience?.navLabel}
          />
          {experience && (
            <ButtonLink
              href={`/experiences/${experience.slug}`}
              variant="ghost"
              size="lg"
              className="text-paper/80 hover:text-paper"
            >
              ← Back to {experience.navLabel}
            </ButtonLink>
          )}
        </div>
      </PageHero>

      {/* Intro */}
      <Section tone="paper">
        <Reveal>
          <Prose paragraphs={lodge.intro} size="lg" className="max-w-3xl" />
        </Reveal>
      </Section>

      {/* The shooting / the fishing */}
      <Section tone="paperDim">
        <ProseFeature
          section={lodge.shooting}
          mediaTone={mediaTone}
          mediaIcon={icon}
          mediaLabel={lodge.name}
        />
      </Section>

      {/* The lodge — amenities */}
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <Eyebrow>The lodge</Eyebrow>
            <h2 className="font-display mt-3 text-3xl sm:text-4xl">What to expect</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="flex flex-wrap gap-2.5">
              {lodge.amenities.map((a) => (
                <li
                  key={a}
                  className="rounded-full border border-ink/12 bg-paper-dim px-4 py-2 text-sm text-ink/80"
                >
                  {a}
                </li>
              ))}
            </ul>
            {lodge.amenitiesNote && (
              <Prose paragraphs={lodge.amenitiesNote} className="mt-6" />
            )}
          </Reveal>
        </div>
      </Section>

      {/* Recognition */}
      {(lodge.recognition.orvis || lodge.recognition.beretta) && (
        <Section tone="paperDim">
          <Reveal>
            <Eyebrow>Recognition</Eyebrow>
            <h2 className="font-display mt-3 mb-8 text-3xl sm:text-4xl">
              Earned, not given
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Recognition orvis={lodge.recognition.orvis} beretta={lodge.recognition.beretta} />
          </Reveal>
        </Section>
      )}

      {/* Rates */}
      {lodge.rates ? (
        <Section tone="teal">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <Eyebrow className="text-sky">Pricing</Eyebrow>
              <h2 className="font-display mt-3 text-3xl sm:text-4xl">
                Clear rates, published up front
              </h2>
              <p className="mt-5 max-w-sm text-paper/75">
                No hidden numbers, no surprises. Here is exactly what a stay at{" "}
                {lodge.name} costs.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <RatesTable
                rates={lodge.rates}
                lodgeName={lodge.name}
                businessUnit={businessUnit}
                experience={experience?.navLabel}
              />
            </Reveal>
          </div>
        </Section>
      ) : (
        <Section tone="teal" className="text-center">
          <Reveal>
            <Eyebrow className="text-sky">Pricing</Eyebrow>
            <h2 className="font-display mx-auto mt-3 max-w-xl text-3xl sm:text-4xl">
              Rates and full details coming soon
            </h2>
            <p className="mx-auto mt-4 max-w-md text-paper/75">
              We&apos;re finalizing this lodge. Schedule a call and we&apos;ll walk
              you through everything for your dates.
            </p>
            <div className="mt-8">
              <ScheduleCallButton
                placement="page"
                variant="onDark"
                size="lg"
                businessUnit={businessUnit}
                experience={experience?.navLabel}
              />
            </div>
          </Reveal>
        </Section>
      )}

      <CtaBand
        heading={`Ready to plan your stay at ${lodge.name}?`}
        businessUnit={businessUnit}
        experience={experience?.navLabel}
      />
    </>
  );
}
