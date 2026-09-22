import type { FishingZonesBlock } from "@/content/types";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function FishingZones({ block }: { block: FishingZonesBlock }) {
  return (
    <div>
      <Eyebrow>Where we fish</Eyebrow>
      <h2 className="font-display mt-3 text-3xl sm:text-4xl">{block.heading}</h2>
      {block.intro && (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/75">{block.intro}</p>
      )}

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {block.zones.map((zone, i) => (
          <Reveal key={zone.name} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-ink/10 bg-paper p-7">
              <h3 className="font-display text-lg">{zone.name}</h3>
              {zone.description && (
                <p className="mt-2 text-sm text-ink/65">{zone.description}</p>
              )}
              <ul className="mt-4 space-y-2.5">
                {zone.waters.map((water) => (
                  <li key={water.name} className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="text-ink/80">{water.name}</span>
                    {water.methods.map((m) => (
                      <span
                        key={m}
                        className="rounded-full border border-ink/12 bg-paper-dim px-2.5 py-0.5 text-xs text-ink/60"
                      >
                        {m}
                      </span>
                    ))}
                    {water.note && <span className="text-xs text-ink/45">({water.note})</span>}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {block.note && (
        <p className="mt-6 max-w-2xl text-sm italic text-ink/55">{block.note}</p>
      )}
    </div>
  );
}
