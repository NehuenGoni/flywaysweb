import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <Section tone="paper">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Reviews</Eyebrow>
            <h2 className="font-display mt-3 max-w-xl text-3xl sm:text-5xl">
              The kind of trip people book again before they leave.
            </h2>
          </div>
          <div className="shrink-0">
            <div className="text-sky">★★★★★</div>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ink/55">
              Rated on Google Reviews
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <figure className="flex h-full flex-col rounded-2xl border border-ink/10 bg-paper-dim p-7">
              <div className="text-sky">★★★★★</div>
              <blockquote className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-ink/85">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-ink/10 pt-4">
                <div className="font-medium text-ink">{t.author}</div>
                <div className="text-xs uppercase tracking-[0.12em] text-ink/50">
                  {t.detail}
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
