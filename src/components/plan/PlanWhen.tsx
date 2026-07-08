"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

type MonthInfo = { season: "Summer Season" | "Regular Season"; note: string };

const months: Record<string, MonthInfo> = {
  January: { season: "Summer Season", note: "Peak of summer. Sunflower fields in bloom, high bird activity, warm afternoons in the upper 80s°F. Spectacular to look at." },
  February: { season: "Summer Season", note: "High summer shooting continues over sunflowers and corn. Long, warm days and big volume." },
  March: { season: "Summer Season", note: "The tail of summer — still excellent action with slightly milder afternoons." },
  April: { season: "Regular Season", note: "Roost hunting begins across the eastern farmlands. Cooler, consistent, and a returning-client favorite." },
  May: { season: "Regular Season", note: "Crisp autumn shooting with steady volume and comfortable temperatures." },
  June: { season: "Regular Season", note: "Cool, clear days. Harvest concentrates birds on the big estancias near Posta del Norte." },
  July: { season: "Regular Season", note: "Mid-winter shooting — cold mornings, sunny afternoons, dependable action." },
  August: { season: "Regular Season", note: "Late winter. Consistent roost hunting and quieter on the international calendar." },
  September: { season: "Regular Season", note: "Spring opens up. Pleasant temperatures and strong, steady flights." },
  October: { season: "Regular Season", note: "A favorite: beautiful sunny, crisp days — and our best prices, with lighter North American demand." },
  November: { season: "Regular Season", note: "Warming up toward summer. Western hills and farms holding good numbers of birds." },
  December: { season: "Regular Season", note: "Early summer. Excellent shooting ahead of the holiday and sunflower season." },
};

const monthKeys = Object.keys(months);

export function PlanWhen() {
  const [month, setMonth] = useState("October");
  const info = months[month];

  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-[0.16em] text-ink/55">
        Pick a month
      </label>
      <div className="mt-3 flex flex-wrap gap-2">
        {monthKeys.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMonth(m)}
            className={
              "rounded-full px-4 py-2 text-sm transition-all duration-150 " +
              (m === month
                ? "bg-teal text-paper"
                : "border border-ink/15 text-ink/70 hover:border-ink/40")
            }
          >
            {m}
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-ink/10 bg-paper-dim p-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={month}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className="font-display text-xs uppercase tracking-[0.2em] text-olive">
              {info.season}
            </div>
            <h3 className="font-display mt-2 text-2xl">{month} in Córdoba</h3>
            <p className="mt-3 leading-relaxed text-ink/75">{info.note}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
