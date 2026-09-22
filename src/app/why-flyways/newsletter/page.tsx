import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LeadForm } from "@/components/contact/LeadForm";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Subscribe to receive exclusive deals, seasonal promotions, trip availability, and the latest news from FlyWays Argentina.",
};

export default function NewsletterPage() {
  return (
    <>
      <PageHero
        eyebrow="Join the FlyWays Community"
        title="Newsletter"
        subhead="Subscribe to receive exclusive deals, seasonal promotions, trip availability, and the latest news from FlyWays Argentina. Don't miss out on special opportunities available only to our subscribers."
      />
      <Section tone="paper">
        <Reveal>
          <div className="mx-auto max-w-sm">
            <LeadForm tone="light" variant="newsletter" />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
