import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ScheduleCallButton } from "@/components/ui/ScheduleCallButton";

/**
 * Shared shell for sitemap pages the client hasn't delivered copy for yet
 * (Gallery, Our Team, Articles, Blog, Newsletter, the Plan Your Trip
 * sub-pages). Keeps every route in the client's document navigable end to
 * end without inventing content — each page sets
 * `robots: { index: false, follow: true }` in its own metadata and stays
 * out of sitemap.ts until real copy lands.
 */
export function ComingSoonShell({
  eyebrow,
  title,
  body,
  backHref,
  backLabel,
}: {
  eyebrow: string;
  title: string;
  body: string;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} />
      <Section tone="paper">
        <Reveal>
          <div className="max-w-xl">
            <p className="text-lg leading-relaxed text-ink/75">{body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {backHref && backLabel && (
                <ButtonLink href={backHref} variant="outline">
                  {backLabel}
                </ButtonLink>
              )}
              <ScheduleCallButton placement="page" variant="primary" />
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
