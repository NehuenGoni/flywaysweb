import type { ProseSection } from "@/content/types";
import type { ExperienceIconName } from "@/components/brand/icons";
import { Eyebrow } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/media/Placeholder";
import { cn } from "@/lib/utils";

/** A prose section paired with an editorial media panel. */
export function ProseFeature({
  section,
  mediaTone = "teal",
  mediaIcon,
  mediaLabel,
  reverse = false,
}: {
  section: ProseSection;
  mediaTone?: "teal" | "olive" | "bark" | "ink";
  mediaIcon?: ExperienceIconName;
  mediaLabel?: string;
  reverse?: boolean;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className={cn(reverse && "lg:order-2")}>
        {section.eyebrow && <Eyebrow>{section.eyebrow}</Eyebrow>}
        <h2 className="font-display mt-3 text-3xl sm:text-4xl">{section.heading}</h2>
        <Prose paragraphs={section.body} className="mt-5" />
      </Reveal>
      <Reveal delay={0.1} className={cn(reverse && "lg:order-1")}>
        <Placeholder
          tone={mediaTone}
          icon={mediaIcon}
          label={mediaLabel}
          className="aspect-[4/5] w-full"
        />
      </Reveal>
    </div>
  );
}
