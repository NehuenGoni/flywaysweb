import Image from "next/image";
import Link from "next/link";
import { experienceForLodge, lodges } from "@/content/index";
import { getProgram } from "@/content/programs";
import type { ExperienceIconName } from "@/components/brand/icons";
import { Placeholder } from "@/components/media/Placeholder";
import type { MediaRef } from "@/content/types";
import { toneByIcon } from "@/lib/tone";

// TODO(client): curated home picks, not the full experience/lodge catalog —
// swap these three slugs if the featured properties should change.
const LODGE_SLUGS = ["los-chanares", "posta-del-norte"];
const PROGRAM_SLUG = "echoes-of-patagonia";

type Pick = {
  key: string;
  title: string;
  summary: string;
  href: string;
  tag: string;
  icon: ExperienceIconName;
  image?: MediaRef;
};

function buildPicks(): Pick[] {
  const lodgePicks: Pick[] = LODGE_SLUGS.map((slug): Pick | null => {
    const lodge = lodges.find((l) => l.slug === slug);
    if (!lodge) return null;
    const experience = experienceForLodge(lodge.slug);
    return {
      key: lodge.slug,
      title: lodge.name,
      summary: lodge.cardSummary,
      href: `/lodges/${lodge.slug}`,
      tag: experience?.navLabel ?? lodge.location,
      icon: experience?.icon ?? "dove",
      image: lodge.hero,
    };
  }).filter((p): p is Pick => Boolean(p));

  const program = getProgram(PROGRAM_SLUG);
  const programPick: Pick[] = program
    ? [
        {
          key: program.slug,
          title: program.name,
          summary: program.cardSummary ?? program.intro[0],
          href: `/experiences/fly-fishing-patagonia#${program.slug}`,
          tag: "Fly Fishing",
          icon: "fish" as const,
          image: program.hero,
        },
      ]
    : [];

  return [...lodgePicks, ...programPick];
}

export function FeaturedPicks() {
  const picks = buildPicks();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {picks.map((pick) => (
        <Link
          key={pick.key}
          href={pick.href}
          className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="relative">
            {pick.image ? (
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={pick.image.src}
                  alt={pick.image.alt}
                  width={pick.image.width ?? 1600}
                  height={pick.image.height ?? 1200}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
              </div>
            ) : (
              <Placeholder
                tone={toneByIcon[pick.icon]}
                icon={pick.icon}
                rounded={false}
                className="aspect-[4/3] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            )}
            <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-xs font-medium uppercase tracking-wide text-ink">
              {pick.tag}
            </span>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="font-display text-2xl">{pick.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">{pick.summary}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-teal">
              Explore
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
