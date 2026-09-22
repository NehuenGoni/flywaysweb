import type { Metadata } from "next";
import { ComingSoonShell } from "@/components/ui/ComingSoonShell";

export const metadata: Metadata = {
  title: "When Should I Come?",
  robots: { index: false, follow: true },
};

export default function WhenShouldICome() {
  return (
    <ComingSoonShell
      eyebrow="Plan your trip"
      title="When Should I Come?"
      body="A season-by-season breakdown for every FlyWays experience is on the way. For dove hunting, see the When to Come section on /plan-your-trip in the meantime."
      backHref="/plan-your-trip#when"
      backLabel="See dove hunting seasons"
    />
  );
}
