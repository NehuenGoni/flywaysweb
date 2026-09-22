import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

/**
 * Placeholder copy — the client's legal team needs to review and provide
 * the final policy text before launch. Linked from the lead form's consent
 * copy and the footer, so the route needs to exist even before that text
 * lands.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <Section tone="paper">
        <Reveal>
          <div className="max-w-2xl">
            <Prose
              paragraphs={[
                `This page is a placeholder pending final legal review. It will describe what information ${siteConfig.name} collects through this site (contact forms, newsletter sign-ups, analytics), how it's used, and how to request its deletion.`,
                "FlyWays does not sell personal information. Data submitted through our forms is used to respond to your inquiry and, where you've opted in, to send trip updates and offers. You can unsubscribe from marketing emails and text messages at any time.",
                `Questions about this policy can be sent to ${siteConfig.contact.email}.`,
              ]}
              size="lg"
            />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
