import type { Metadata } from "next";
import { ComingSoonShell } from "@/components/ui/ComingSoonShell";

export const metadata: Metadata = {
  title: "Video Gallery",
  robots: { index: false, follow: true },
};

export default function GalleryVideoPage() {
  return (
    <ComingSoonShell
      eyebrow="Gallery"
      title="Video Gallery"
      body="Field footage from FlyWays trips is on the way. In the meantime, schedule a call and we'll walk you through it."
    />
  );
}
