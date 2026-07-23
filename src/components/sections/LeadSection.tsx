import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ScheduleCallButton } from "@/components/ui/ScheduleCallButton";
import { ContactChannelLink } from "@/components/ui/ContactChannelLink";
import { LeadForm } from "@/components/contact/LeadForm";
import { siteConfig } from "@/data/site";
import type { BusinessUnit } from "@/lib/analytics";

/**
 * The standard lead block: short pitch + the one site-wide form, with
 * "Schedule a Call" as the primary alternative. Used at the end of experience
 * pages and on the home page's final section.
 */
export function LeadSection({
  id,
  eyebrow = "Plan your trip",
  heading = "Start the conversation",
  body = "Tell us roughly when you'd like to come and who's traveling. We'll reply personally — or schedule a call and skip straight to talking it through.",
  variant = "full",
  businessUnit,
  experience,
}: {
  id?: string;
  eyebrow?: string;
  heading?: string;
  body?: string;
  variant?: "compact" | "full";
  businessUnit?: BusinessUnit;
  experience?: string;
}) {
  return (
    <Section tone="ink" id={id}>
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <Eyebrow className="text-sky">{eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 text-3xl sm:text-5xl">{heading}</h2>
          <p className="mt-5 max-w-md text-paper/75">{body}</p>
          <div className="mt-8">
            <ScheduleCallButton
              placement="page"
              variant="onDark"
              size="lg"
              businessUnit={businessUnit}
              experience={experience}
            />
          </div>
          <p className="mt-6 text-sm text-paper/55">
            Prefer email?{" "}
            <ContactChannelLink
              method="email"
              href={siteConfig.contact.emailHref}
              businessUnit={businessUnit}
              experience={experience}
              className="text-sky hover:underline"
            >
              {siteConfig.contact.email}
            </ContactChannelLink>
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <LeadForm tone="dark" variant={variant} businessUnit={businessUnit} experience={experience} />
        </Reveal>
      </div>
    </Section>
  );
}
