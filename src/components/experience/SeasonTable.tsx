import type { SeasonBlock } from "@/content/types";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function SeasonTable({ seasons }: { seasons: SeasonBlock }) {
  return (
    <div>
      <Eyebrow>Seasons</Eyebrow>
      <h2 className="font-display mt-3 text-3xl sm:text-4xl">{seasons.heading}</h2>
      {seasons.intro && (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/75">
          {seasons.intro}
        </p>
      )}

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {seasons.rows.map((row, i) => (
          <Reveal key={row.name} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-ink/10 bg-paper p-7">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl">{row.name}</h3>
                <span className="text-xs uppercase tracking-[0.14em] text-olive">
                  {row.window}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                {row.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {seasons.note && (
        <p className="mt-6 max-w-2xl text-sm italic text-ink/55">{seasons.note}</p>
      )}
    </div>
  );
}
