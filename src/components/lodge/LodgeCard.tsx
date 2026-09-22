import Link from "next/link";
import type { Lodge } from "@/content/types";
import { experienceForLodge } from "@/content/index";
import { Placeholder } from "@/components/media/Placeholder";
import { toneByIcon } from "@/lib/tone";

export function LodgeCard({ lodge }: { lodge: Lodge }) {
  const experience = experienceForLodge(lodge.slug);
  const tone = experience ? toneByIcon[experience.icon] : "teal";
  const icon = experience?.icon;

  return (
    <Link
      href={`/lodges/${lodge.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative">
        <Placeholder
          tone={tone}
          icon={icon}
          rounded={false}
          className="aspect-[4/3] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
        {experience && (
          <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-xs font-medium uppercase tracking-wide text-ink">
            {experience.navLabel}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl">{lodge.name}</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-olive">
          {[lodge.location, lodge.capacity].filter(Boolean).join(" · ")}
        </p>
        {lodge.species.length > 0 && (
          <p className="mt-1 text-xs text-ink/50">{lodge.species.join(" · ")}</p>
        )}
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">
          {lodge.cardSummary}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-teal">
          See {lodge.name}
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
