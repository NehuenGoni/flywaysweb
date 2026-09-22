import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ScheduleCallButton } from "@/components/ui/ScheduleCallButton";
import { ContactChannelLink } from "@/components/ui/ContactChannelLink";
import { LeadForm } from "@/components/contact/LeadForm";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Schedule a call, send a message, or email FlyWays Argentina. A real person replies — no bots, no queues.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Let's plan your trip"
        subhead="The fastest way to start is a call — a real person at FlyWays picks up. Prefer to write? Send a message or email and we'll reply personally."
      />

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Primary: schedule a call + contact channels */}
          <Reveal>
            <div className="rounded-3xl border border-ink/10 bg-paper-dim p-8">
              <div className="font-display text-xs uppercase tracking-[0.2em] text-olive">
                The fastest way
              </div>
              <h2 className="font-display mt-2 text-3xl">Schedule a call</h2>
              <p className="mt-3 text-ink/70">
                Pick a time that works for you. We&apos;ll talk through dates,
                experience and lodge — no obligation.
              </p>
              <ScheduleCallButton placement="page" variant="primary" size="lg" className="mt-6" />
            </div>

            <dl className="mt-8 space-y-5">
              <ContactRow label="Email">
                <ContactChannelLink
                  method="email"
                  href={siteConfig.contact.emailHref}
                  className="hover:text-teal"
                >
                  {siteConfig.contact.email}
                </ContactChannelLink>
              </ContactRow>
              <ContactRow label="Phone">
                <ContactChannelLink
                  method="phone"
                  href={siteConfig.contact.phoneHref}
                  className="hover:text-teal"
                >
                  {siteConfig.contact.phone}
                </ContactChannelLink>
              </ContactRow>
              <ContactRow label="WhatsApp (in Argentina / EU / LatAm)">
                <ContactChannelLink
                  method="whatsapp"
                  href={siteConfig.contact.whatsappHref}
                  external
                  className="hover:text-teal"
                >
                  {siteConfig.contact.whatsapp}
                </ContactChannelLink>
              </ContactRow>
            </dl>
          </Reveal>

          {/* Secondary: the standard lead form */}
          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl">Or send a message</h2>
            <p className="mt-2 text-ink/70">
              Tell us roughly when and who&apos;s traveling. We&apos;ll reply
              personally.
            </p>
            <div className="mt-6">
              <LeadForm tone="light" />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

function ContactRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-[0.16em] text-ink/50">
        {label}
      </dt>
      <dd className="mt-1 text-lg text-ink">{children}</dd>
    </div>
  );
}
