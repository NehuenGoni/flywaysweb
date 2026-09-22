import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

/**
 * Placeholder copy — the client's legal team needs to review and provide
 * final terms (booking, cancellation and payment policy in particular)
 * before launch.
 */
export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" />
      <Section tone="paper">
        <Reveal>
          <div className="max-w-2xl">
            <Prose
              paragraphs={[
                `This page is a placeholder pending final legal review. It will cover the terms of using ${siteConfig.name}'s website and booking a trip with us, including deposit, cancellation and payment policy.`,
                `Questions in the meantime can be sent to ${siteConfig.contact.email}.`,
              ]}
              size="lg"
            />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
