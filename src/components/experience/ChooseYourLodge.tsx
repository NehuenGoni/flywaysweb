import type { Lodge } from "@/content/types";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LodgeCard } from "@/components/lodge/LodgeCard";

export function ChooseYourLodge({
  lodges,
  title = "Choose your lodge",
  intro,
}: {
  lodges: Lodge[];
  title?: string;
  intro?: string;
}) {
  if (lodges.length === 0) return null;

  return (
    <div>
      <Reveal>
        <Eyebrow>Where you'll stay</Eyebrow>
        <h2 className="font-display mt-3 text-3xl sm:text-4xl">{title}</h2>
        {intro && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/75">{intro}</p>
        )}
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {lodges.map((lodge, i) => (
          <Reveal key={lodge.slug} delay={i * 0.08}>
            <LodgeCard lodge={lodge} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
