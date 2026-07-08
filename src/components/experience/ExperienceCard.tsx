import Link from "next/link";
import type { Experience } from "@/content/types";
import { experienceIcons } from "@/components/brand/icons";
import { cn } from "@/lib/utils";

export function ExperienceCard({
  experience,
  tone = "light",
}: {
  experience: Experience;
  tone?: "light" | "dark";
}) {
  const Icon = experienceIcons[experience.icon];
  const dark = tone === "dark";

  return (
    <Link
      href={`/experiences/${experience.slug}`}
      className={cn(
        "group relative flex flex-col rounded-2xl border p-7 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1",
        dark
          ? "border-paper/15 bg-paper/[0.04] hover:bg-paper/[0.08]"
          : "border-ink/10 bg-paper hover:shadow-xl",
      )}
    >
      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110",
          dark ? "bg-sky/15 text-sky" : "bg-teal/8 text-teal",
        )}
      >
        <Icon className="h-6 w-6" />
      </span>

      <h3 className="font-display mt-5 text-2xl">{experience.title}</h3>
      <p className={cn("mt-2 flex-1 text-sm leading-relaxed", dark ? "text-paper/75" : "text-ink/70")}>
        {experience.cardSummary}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <span className={cn("inline-flex items-center gap-1.5 text-sm font-medium", dark ? "text-sky" : "text-teal")}>
          Explore
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </span>
        {experience.priceFrom && (
          <span className={cn("text-xs uppercase tracking-[0.12em]", dark ? "text-paper/50" : "text-ink/45")}>
            {experience.priceFrom}
          </span>
        )}
      </div>

      {experience.status === "placeholder" && (
        <span className="absolute right-5 top-5 text-[0.65rem] uppercase tracking-[0.16em] text-olive/70">
          Coming soon
        </span>
      )}
    </Link>
  );
}
