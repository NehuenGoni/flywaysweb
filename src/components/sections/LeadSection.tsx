import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { LeadForm } from "@/components/contact/LeadForm";
import { siteConfig } from "@/data/site";

/**
 * The standard lead block: short pitch + the one site-wide form, with
 * "Book a call" as the primary alternative. Used at the end of experience
 * pages and on the home page's final section.
 */
export function LeadSection({
  id,
  eyebrow = "Plan your trip",
  heading = "Start the conversation",
  body = "Tell us roughly when you'd like to come and who's traveling. We'll reply personally — or book a call and skip straight to talking it through.",
  variant = "full",
}: {
  id?: string;
  eyebrow?: string;
  heading?: string;
  body?: string;
  variant?: "compact" | "full";
}) {
  return (
    <Section tone="ink" id={id}>
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <Eyebrow className="text-sky">{eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 text-3xl sm:text-5xl">{heading}</h2>
          <p className="mt-5 max-w-md text-paper/75">{body}</p>
          <div className="mt-8">
            <ButtonLink href={siteConfig.bookingUrl} external variant="onDark" size="lg">
              Book a call →
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-paper/55">
            Prefer email?{" "}
            <a href={siteConfig.contact.emailHref} className="text-sky hover:underline">
              {siteConfig.contact.email}
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <LeadForm tone="dark" variant={variant} />
        </Reveal>
      </div>
    </Section>
  );
}
