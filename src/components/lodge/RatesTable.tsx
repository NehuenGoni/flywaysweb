import type { Rates } from "@/content/types";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Published rates card. FlyWays' competitive edge is transparent pricing —
 * this presents it clearly: headline season prices, then the fine print.
 */
export function RatesTable({ rates, lodgeName }: { rates: Rates; lodgeName: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-paper/15 bg-paper/[0.04]">
      <div className="border-b border-paper/15 px-7 py-5">
        <div className="font-display text-xs uppercase tracking-[0.22em] text-sky">
          Rates · {lodgeName}
        </div>
        <div className="mt-1 text-sm text-paper/70">{rates.seasonLabel}</div>
      </div>

      <dl className="divide-y divide-paper/10">
        {rates.rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-6 px-7 py-4"
          >
            <dt className={cn("text-sm", row.emphasis ? "font-medium text-paper" : "text-paper/75")}>
              {row.label}
            </dt>
            <dd
              className={cn(
                "shrink-0 text-right",
                row.emphasis
                  ? "font-display text-lg text-paper"
                  : "text-sm text-paper/80",
              )}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      {rates.occupancyNote && (
        <p className="px-7 pt-4 text-xs uppercase tracking-[0.14em] text-paper/55">
          {rates.occupancyNote}
        </p>
      )}

      <div className="grid gap-6 px-7 py-6 sm:grid-cols-2">
        <RateList title="What's included" items={rates.included} />
        <RateList title="Not included" items={rates.notIncluded} muted />
      </div>

      <div className="border-t border-paper/10 px-7 py-5">
        <div className="font-display text-xs uppercase tracking-[0.18em] text-paper/55">
          Payment
        </div>
        <ul className="mt-2 space-y-1 text-xs text-paper/65">
          {rates.payment.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>

      <div className="border-t border-paper/10 px-7 py-6">
        <ButtonLink href={siteConfig.bookingUrl} external variant="onDark" className="w-full">
          Book a call →
        </ButtonLink>
      </div>
    </div>
  );
}

function RateList({
  title,
  items,
  muted,
}: {
  title: string;
  items: string[];
  muted?: boolean;
}) {
  return (
    <div>
      <div className="font-display text-xs uppercase tracking-[0.18em] text-paper/55">
        {title}
      </div>
      <ul className="mt-3 space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className={cn(
              "flex gap-2 text-sm",
              muted ? "text-paper/55" : "text-paper/80",
            )}
          >
            <span className={muted ? "text-paper/30" : "text-sky"}>
              {muted ? "–" : "✓"}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
