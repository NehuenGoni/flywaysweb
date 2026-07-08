import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO_RATIO = 2179 / 1231;

/**
 * FlyWays wordmark. `green` for light surfaces, `offwhite` for dark ones.
 * `height` drives the rendered size; width is derived from the asset ratio.
 */
export function Logo({
  variant = "green",
  height = 44,
  className,
  priority = false,
}: {
  variant?: "green" | "offwhite";
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  const src =
    variant === "green" ? "/brand/flyways-green.png" : "/brand/flyways-offwhite.png";
  return (
    <Image
      src={src}
      alt="FlyWays Argentina"
      width={Math.round(height * LOGO_RATIO)}
      height={height}
      priority={priority}
      className={cn("h-auto w-auto select-none", className)}
      style={{ height }}
    />
  );
}
