import { experienceIcons, type ExperienceIconName } from "@/components/brand/icons";
import { cn } from "@/lib/utils";

type Tone = "teal" | "olive" | "bark" | "ink";

const gradients: Record<Tone, string> = {
  teal: "from-teal-700 via-teal to-[#16505f]",
  olive: "from-[#3f3f2c] via-olive to-[#7a7a59]",
  bark: "from-[#2c1a0d] via-bark to-[#6b4226]",
  ink: "from-black via-ink to-teal-700",
};

/**
 * Editorial image placeholder. Renders a layered brand gradient with a
 * faint motif watermark — intentional-looking until real photography is
 * supplied. Swap for <Image> once assets arrive (same aspect container).
 */
export function Placeholder({
  tone = "teal",
  icon,
  label,
  className,
  rounded = true,
}: {
  tone?: Tone;
  icon?: ExperienceIconName;
  label?: string;
  className?: string;
  rounded?: boolean;
}) {
  const Icon = icon ? experienceIcons[icon] : null;
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-gradient-to-br text-paper",
        gradients[tone],
        rounded && "rounded-2xl",
        className,
      )}
    >
      {/* soft vignette + grain-ish radial for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_10%,rgba(255,255,255,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_120%,rgba(0,0,0,0.45),transparent_60%)]" />
      {Icon && (
        <Icon className="pointer-events-none absolute -right-6 -top-6 h-44 w-44 text-paper/10" />
      )}
      {label && (
        <span className="absolute bottom-4 left-5 font-display text-xs uppercase tracking-[0.22em] text-paper/60">
          {label}
        </span>
      )}
    </div>
  );
}
