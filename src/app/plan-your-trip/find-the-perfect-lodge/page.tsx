import type { Metadata } from "next";
import { ComingSoonShell } from "@/components/ui/ComingSoonShell";

export const metadata: Metadata = {
  title: "Find The Perfect Lodge",
  robots: { index: false, follow: true },
};

export default function FindThePerfectLodge() {
  return (
    <ComingSoonShell
      eyebrow="Plan your trip"
      title="Find The Perfect Lodge"
      body="A guided way to match your group to the right lodge is on the way. Browse every lodge in the meantime."
      backHref="/lodges"
      backLabel="See all lodges"
    />
  );
}
