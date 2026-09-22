import type { ActivityGroup } from "@/content/types";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function visibleActivities(group: ActivityGroup) {
  return group.items.filter((a) => a.status === "complete" || a.body.length > 0);
}

export function ActivityGrid({ group }: { group: ActivityGroup }) {
  const items = visibleActivities(group);
  if (items.length === 0) return null;

  return (
    <div>
      <Eyebrow>{group.heading}</Eyebrow>
      {group.intro && (
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-current/75">{group.intro}</p>
      )}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((activity, i) => {
          const isLastAlone = i === items.length - 1;
          return (
            <Reveal
              key={activity.slug}
              delay={i * 0.06}
              className={cn(
                isLastAlone && items.length % 2 === 1 && "sm:col-start-2 sm:col-span-1 sm:mx-auto sm:w-full",
                isLastAlone && items.length % 3 === 1 && "lg:col-start-2",
              )}
            >
              <div className="h-full rounded-2xl border border-current/10 p-6">
                <h3 className="font-display text-lg">{activity.name}</h3>
                {activity.availability && (
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-olive">
                    {activity.availability}
                  </p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-current/70">
                  {activity.body.join(" ")}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
