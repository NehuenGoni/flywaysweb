"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Route = { hub: string; note: string };

// Suggested routings into Córdoba (COR), almost always via Buenos Aires (EZE/AEP)
// or a regional hub. Final flights are arranged together when you book.
const routes: Record<string, Route> = {
  Miami: { hub: "Buenos Aires (EZE)", note: "Direct overnight to Buenos Aires, then a short connection to Córdoba. The easiest gateway from the US." },
  "New York": { hub: "Buenos Aires (EZE)", note: "Direct overnight to Buenos Aires, then connect to Córdoba." },
  Atlanta: { hub: "Buenos Aires (EZE)", note: "Direct overnight to Buenos Aires, then connect to Córdoba." },
  Houston: { hub: "Buenos Aires or Panama / Lima", note: "Overnight to Buenos Aires, or route via Panama City / Lima, then on to Córdoba." },
  Dallas: { hub: "Buenos Aires or Lima", note: "Overnight to Buenos Aires, or via Lima, then connect to Córdoba." },
  "Los Angeles": { hub: "Lima / Santiago / Buenos Aires", note: "Route via Lima, Santiago or Buenos Aires, then a short hop to Córdoba." },
  London: { hub: "São Paulo / Buenos Aires", note: "Via São Paulo or Buenos Aires, then connect to Córdoba. We'll help line up the schedule." },
};

const cities = Object.keys(routes);

export function PlanRoute() {
  const [city, setCity] = useState("Miami");
  const route = routes[city];

  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-[0.16em] text-paper/60">
        Flying from
      </label>
      <div className="mt-3 flex flex-wrap gap-2">
        {cities.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCity(c)}
            className={
              "rounded-full px-4 py-2 text-sm transition-all duration-150 " +
              (c === city
                ? "bg-sky text-teal"
                : "border border-paper/25 text-paper/75 hover:border-paper/60")
            }
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-paper/15 bg-paper/[0.05] p-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={city}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className="font-display text-xs uppercase tracking-[0.2em] text-sky">
              {city} → Córdoba (COR)
            </div>
            <h3 className="font-display mt-2 text-2xl text-paper">
              Connect via {route.hub}
            </h3>
            <p className="mt-3 leading-relaxed text-paper/75">{route.note}</p>
            <p className="mt-4 text-sm text-paper/55">
              Airport transfers from Córdoba are included — the lodges are about
              1h20 from the international airport.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
