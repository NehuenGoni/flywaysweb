import type { Metadata } from "next";
import { ComingSoonShell } from "@/components/ui/ComingSoonShell";

export const metadata: Metadata = {
  title: "Articles, Reviews & Endorsements",
  robots: { index: false, follow: true },
};

export default function ArticlesPage() {
  return (
    <ComingSoonShell
      eyebrow="The FlyWays Standard"
      title="Articles, Reviews & Endorsements"
      body="Press coverage and third-party endorsements are being compiled."
      backHref="/why-flyways"
      backLabel="Back to Why FlyWays"
    />
  );
}
