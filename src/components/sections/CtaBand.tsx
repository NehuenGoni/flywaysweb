import { Section, Eyebrow } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site";

/**
 * "Book a call" CTA band. Primary conversion action — used at the end of
 * lodge pages and anywhere a single, low-friction call to action fits.
 */
export function CtaBand({
  heading = "Ready to talk through your trip?",
  body = "Book a call and a real person at FlyWays picks up — no bots, no queues. We'll help you choose your dates, your experience and your lodge.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <Section tone="teal" className="text-center">
      <Reveal>
        <Eyebrow className="text-sky">Plan your trip</Eyebrow>
        <h2 className="font-display mx-auto mt-4 max-w-2xl text-3xl sm:text-5xl">
          {heading}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-paper/75">{body}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={siteConfig.bookingUrl} external variant="onDark" size="lg">
            Book a call →
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost" size="lg" className="text-paper/80 hover:text-paper">
            Or send a message
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
