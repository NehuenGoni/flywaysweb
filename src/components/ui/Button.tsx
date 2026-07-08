import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "onDark" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium tracking-wide transition-all duration-150 ease-[cubic-bezier(0.2,0,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-olive disabled:opacity-60 disabled:pointer-events-none active:scale-[0.98]";

const variants: Record<Variant, string> = {
  // Primary brand CTA — olive fill, lifts on hover.
  primary:
    "bg-olive text-paper hover:bg-bark shadow-sm hover:shadow-md hover:-translate-y-0.5",
  // Outline on light surfaces.
  outline:
    "border border-ink/20 text-ink hover:border-ink/60 hover:bg-ink/[0.03]",
  // CTA placed on dark (teal/ink) sections — sky accent.
  onDark:
    "bg-sky text-teal hover:bg-paper shadow-sm hover:shadow-md hover:-translate-y-0.5",
  // Quiet text-like action.
  ghost: "text-ink/70 hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[0.95rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  external,
  onClick,
  children,
}: CommonProps & {
  href: string;
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
