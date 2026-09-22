import type { WhenToCome } from "@/content/types";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Renders the client's "When to Come" table — a transposed matrix (seasons
 * as columns, attributes as rows). A real <table> on desktop; a stack of
 * per-season cards on mobile, since a wide matrix doesn't fit a phone.
 */
export function WhenToComeTable({ table }: { table: WhenToCome }) {
  return (
    <div>
      <Eyebrow>When to come</Eyebrow>
      <h2 className="font-display mt-3 text-3xl sm:text-4xl">{table.heading}</h2>
      {table.intro && (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/75">{table.intro}</p>
      )}

      {/* Desktop: real table */}
      <div className="mt-10 hidden overflow-hidden rounded-2xl border border-ink/10 sm:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-paper-dim">
              <th className="px-5 py-4 text-left font-medium text-ink/60" scope="col">
                &nbsp;
              </th>
              {table.columns.map((col) => (
                <th key={col.id} className="px-5 py-4 text-left" scope="col">
                  <span className="font-display block text-lg">{col.name}</span>
                  <span className="block text-xs font-normal uppercase tracking-[0.1em] text-olive">
                    {col.window}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {table.rows.map((row) => (
              <tr key={row.label} className="odd:bg-paper even:bg-paper-dim/40">
                <th
                  scope="row"
                  className="px-5 py-3.5 text-left font-medium text-ink/70"
                >
                  {row.label}
                </th>
                {row.values.map((value, i) => (
                  <td key={table.columns[i]?.id ?? i} className="px-5 py-3.5 text-ink/85">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: one card per season */}
      <div className="mt-10 grid gap-5 sm:hidden">
        {table.columns.map((col, ci) => (
          <Reveal key={col.id} delay={ci * 0.08}>
            <div className="h-full rounded-2xl border border-ink/10 bg-paper p-7">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl">{col.name}</h3>
                <span className="text-xs uppercase tracking-[0.14em] text-olive">
                  {col.window}
                </span>
              </div>
              {col.summary && (
                <p className="mt-2 text-sm text-ink/60">{col.summary}</p>
              )}
              <dl className="mt-4 space-y-2">
                {table.rows.map((row) => (
                  <div key={row.label} className="flex justify-between gap-3 text-sm">
                    <dt className="text-ink/55">{row.label}</dt>
                    <dd className="text-right text-ink/80">{row.values[ci]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        ))}
      </div>

      {table.note && (
        <p className="mt-6 max-w-2xl text-sm italic text-ink/55">{table.note}</p>
      )}
    </div>
  );
}
