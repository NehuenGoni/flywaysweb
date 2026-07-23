import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

type Tone = "paper" | "paperDim" | "teal";

/**
 * A bespoke add-on section: the hunt you choose is the starting point, and the
 * rest of Argentina's nature — wine country, wetlands, Patagonia — can be
 * layered on top, all-inclusive. Rendered on the home page and on /experiences.
 */
const addOns = [
  {
    name: "Wine & vineyards",
    detail: "Mendoza: private tastings and unhurried days across the vineyards.",
  },
  {
    name: "Wetlands & wildlife",
    detail: "Esteros del Iberá: boat safaris among caimans, capybaras and birdlife.",
  },
  {
    name: "Wild landscapes",
    detail: "Iguazú Falls, Patagonia's glaciers and lakes.",
  },
  {
    name: "Downtime, done right",
    detail: "Estancia days, riding, spa and slow Argentine afternoons.",
  },
];

export function BeyondHunting({ tone = "paperDim" }: { tone?: Tone }) {
  const onDark = tone === "teal";

  return (
    <Section tone={tone}>
      <Reveal>
        <Eyebrow className={onDark ? "text-sky" : undefined}>Beyond Hunting</Eyebrow>
        <h2 className="font-display mt-3 max-w-2xl text-3xl sm:text-5xl">
          You&apos;re already in Argentina. Make the most of it.
        </h2>
        <p
          className={
            "mt-5 max-w-2xl text-lg leading-relaxed " +
            (onDark ? "text-paper/80" : "text-ink/75")
          }
        >
          Every trip is built to measure. Add wine country, wetlands, or
          Patagonia to the hunt you&apos;ve chosen — distances that feel long
          from home are short domestic flights here, and everything stays
          all-inclusive: we handle the logistics, the guides and the details end
          to end.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {addOns.map((item, i) => (
          <Reveal key={item.name} delay={i * 0.07}>
            <div className="h-full rounded-2xl border border-ink/10 bg-paper p-7">
              <h3 className="font-display text-lg text-ink">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {item.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
