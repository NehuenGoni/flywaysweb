import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LeadForm } from "@/components/contact/LeadForm";
import { ContactChannelLink } from "@/components/ui/ContactChannelLink";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Schedule a Call",
  description:
    "Tell us about your trip and a real person at FlyWays will call or email you back — no bots, no queues.",
};

/**
 * The linkable, indexable counterpart to the Schedule a Call modal (see
 * ScheduleCallContext/ScheduleCallModal). Destination for the /book-now.html
 * redirect and for anywhere the form needs a real URL — email, ads, etc.
 */
export default function ScheduleACallPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Schedule a call"
        subhead="Tell us a bit about what you're after — dates, group size, the experience you have in mind. A real person at FlyWays will reach out."
      />

      <Section tone="paper">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <LeadForm tone="light" variant="full" />
          </Reveal>
          <p className="mt-8 text-center text-sm text-ink/60">
            Prefer to call directly?{" "}
            <ContactChannelLink method="phone" href={siteConfig.contact.phoneHref} className="hover:text-teal">
              {siteConfig.contact.phone}
            </ContactChannelLink>
          </p>
        </div>
      </Section>
    </>
  );
}
