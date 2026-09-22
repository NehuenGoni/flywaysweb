import type { Metadata } from "next";
import { ComingSoonShell } from "@/components/ui/ComingSoonShell";

export const metadata: Metadata = {
  title: "Photo Gallery",
  robots: { index: false, follow: true },
};

export default function GalleryPhotoPage() {
  return (
    <ComingSoonShell
      eyebrow="Gallery"
      title="Photo Gallery"
      body="Our photo gallery is being put together — final photography from the lodges and the field is on the way. In the meantime, schedule a call and we'll send you a preview."
    />
  );
}
