import { cn } from "@/lib/utils";

/** Renders an array of paragraphs with comfortable reading measure. */
export function Prose({
  paragraphs,
  className,
  size = "base",
}: {
  paragraphs: string[];
  className?: string;
  size?: "base" | "lg";
}) {
  return (
    <div
      className={cn(
        "max-w-prose space-y-5 leading-relaxed text-current/85",
        size === "lg" ? "text-lg" : "text-base",
        className,
      )}
    >
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
