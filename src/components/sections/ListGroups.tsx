import type { ListBlock } from "@/content/types";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Grid of labeled bullet lists. Serves both "Truck and Camp Highlights"
 * (fly fishing) and the "Beyond the Hunt" add-on grid — one component, two
 * uses, instead of hardcoded content per section.
 */
export function ListGroups({ block }: { block: ListBlock }) {
  return (
    <div>
      {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
      <h2 className="font-display mt-3 text-3xl sm:text-4xl">{block.heading}</h2>
      {block.intro && (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-current/75">{block.intro}</p>
      )}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {block.groups.map((group, i) => (
          <Reveal key={group.name} delay={i * 0.06}>
            <div className="h-full rounded-2xl border border-current/10 p-6">
              <h3 className="font-display text-lg">{group.name}</h3>
              <ul className="mt-3 space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-current/70">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {block.note && (
        <p className="mt-6 max-w-2xl text-sm italic text-current/55">{block.note}</p>
      )}
    </div>
  );
}
