import type { Program } from "@/content/types";
import { Eyebrow } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";

export function ProgramItinerary({ program }: { program: Program }) {
  return (
    <div id={program.slug}>
      <Reveal>
        <Eyebrow>{program.durationLabel}</Eyebrow>
        <h3 className="font-display mt-3 text-2xl sm:text-3xl">{program.name}</h3>
        {program.location && (
          <p className="mt-1 text-sm uppercase tracking-[0.1em] text-olive">{program.location}</p>
        )}
        <Prose paragraphs={program.intro} className="mt-4" />
      </Reveal>

      <ol className="mt-8 space-y-6 border-l border-ink/10 pl-6">
        {program.itinerary.map((day, i) => (
          <Reveal key={day.label} as="li" delay={i * 0.06} className="relative">
            <span
              aria-hidden
              className="absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full bg-olive"
            />
            <div className="font-display text-sm uppercase tracking-[0.14em] text-olive">
              {day.label}
            </div>
            {day.title && <h4 className="font-display mt-1 text-lg">{day.title}</h4>}
            <Prose paragraphs={day.body} className="mt-2 text-sm" />
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
