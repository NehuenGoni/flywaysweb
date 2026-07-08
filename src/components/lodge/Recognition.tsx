import { RECOGNITION } from "@/content/types";
import { cn } from "@/lib/utils";

/** Orvis Endorsed + Beretta Trident credential block. */
export function Recognition({
  orvis,
  beretta,
  tone = "light",
}: {
  orvis: boolean;
  beretta: boolean;
  tone?: "light" | "dark";
}) {
  const items = [
    orvis && RECOGNITION.orvis,
    beretta && RECOGNITION.beretta,
  ].filter(Boolean) as Array<{ title: string; body: string }>;

  if (items.length === 0) return null;
  const dark = tone === "dark";

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.title}
            className={cn(
              "rounded-2xl border p-6",
              dark ? "border-paper/15 bg-paper/[0.04]" : "border-ink/10 bg-paper-dim",
            )}
          >
            <div className="font-display text-xs uppercase tracking-[0.2em] text-olive">
              Certified
            </div>
            <h3 className="font-display mt-2 text-xl">{item.title}</h3>
            <p className={cn("mt-2 text-sm leading-relaxed", dark ? "text-paper/75" : "text-ink/70")}>
              {item.body}
            </p>
          </div>
        ))}
      </div>
      <p className={cn("mt-4 text-sm italic", dark ? "text-paper/60" : "text-ink/55")}>
        {RECOGNITION.footnote}
      </p>
    </div>
  );
}
