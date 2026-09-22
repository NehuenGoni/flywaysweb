import type { Metadata } from "next";
import { ComingSoonShell } from "@/components/ui/ComingSoonShell";

export const metadata: Metadata = {
  title: "Blog",
  robots: { index: false, follow: true },
};

/**
 * Shell only. No CMS/MDX infrastructure yet — that's a call to make once we
 * know who at FlyWays writes and how often, not before.
 */
export default function BlogPage() {
  return (
    <ComingSoonShell
      eyebrow="The FlyWays Standard"
      title="Blog"
      body="The FlyWays blog is coming soon."
      backHref="/why-flyways"
      backLabel="Back to Why FlyWays"
    />
  );
}
