import type { Metadata } from "next";
import { ComingSoonShell } from "@/components/ui/ComingSoonShell";

export const metadata: Metadata = {
  title: "How To Get There",
  robots: { index: false, follow: true },
};

export default function HowToGetThere() {
  return (
    <ComingSoonShell
      eyebrow="Plan your trip"
      title="How To Get There"
      body="Detailed routing by departure city is on the way. See the suggested routes on /plan-your-trip in the meantime."
      backHref="/plan-your-trip#getting-here"
      backLabel="See routing"
    />
  );
}
