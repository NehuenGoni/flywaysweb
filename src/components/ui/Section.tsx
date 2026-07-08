import { cn } from "@/lib/utils";
import { Container } from "./Container";

type Tone = "paper" | "paperDim" | "teal" | "ink" | "olive";

const toneClasses: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  paperDim: "bg-paper-dim text-ink",
  teal: "bg-teal text-paper",
  ink: "bg-ink text-paper",
  olive: "bg-olive text-paper",
};

export function Section({
  tone = "paper",
  className,
  containerClassName,
  contained = true,
  id,
  children,
}: {
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  contained?: boolean;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("py-20 sm:py-28", toneClasses[tone], className)}
    >
      {contained ? (
        <Container className={containerClassName}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}

/** Small tracked-out label that sits above a heading. */
export function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "font-display text-xs uppercase tracking-[0.28em] text-olive",
        className,
      )}
    >
      {children}
    </p>
  );
}
