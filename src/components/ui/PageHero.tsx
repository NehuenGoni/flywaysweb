import { Container } from "./Container";
import { Eyebrow } from "./Section";
import { Reveal } from "./Reveal";
import { experienceIcons, type ExperienceIconName } from "@/components/brand/icons";
import { cn } from "@/lib/utils";

type Tone = "teal" | "ink" | "olive";

const tones: Record<Tone, string> = {
  teal: "from-teal-700 via-teal to-[#13434f]",
  ink: "from-black via-ink to-teal-700",
  olive: "from-[#3f3f2c] via-olive to-[#6f6f50]",
};

/** Inner-page hero. Clears the fixed header and sets the page's tone. */
export function PageHero({
  eyebrow,
  title,
  subhead,
  tone = "teal",
  icon,
  children,
}: {
  eyebrow?: string;
  title: string;
  subhead?: string;
  tone?: Tone;
  icon?: ExperienceIconName;
  children?: React.ReactNode;
}) {
  const Icon = icon ? experienceIcons[icon] : null;
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-gradient-to-br pt-36 pb-20 text-paper sm:pt-44 sm:pb-28",
        tones[tone],
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_75%_0%,rgba(255,255,255,0.1),transparent_55%)]" />
      {Icon && (
        <Icon className="pointer-events-none absolute -right-10 top-24 h-72 w-72 text-paper/[0.06]" />
      )}
      <Container className="relative">
        <Reveal>
          {eyebrow && <Eyebrow className="text-sky">{eyebrow}</Eyebrow>}
          <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.05] sm:text-6xl">
            {title}
          </h1>
          {subhead && (
            <p className="mt-6 max-w-2xl text-lg text-paper/80 sm:text-xl">
              {subhead}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </Container>
    </section>
  );
}
