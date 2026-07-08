"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { mainNav, siteConfig } from "@/data/site";
import { trackBookCallClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  // Transparent over the full-bleed hero on the home page only.
  const overlay = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Solid (paper) header on inner pages or after scrolling; transparent over a hero.
  const solid = !overlay || scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        solid
          ? "bg-paper/90 text-ink shadow-[0_1px_0_rgba(18,18,18,0.08)] backdrop-blur-md"
          : "bg-transparent text-paper",
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="/" aria-label="FlyWays Argentina — home" className="shrink-0">
          <Logo variant={solid ? "green" : "offwhite"} height={42} priority />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {mainNav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative text-sm font-medium tracking-wide transition-opacity hover:opacity-100",
                  active ? "opacity-100" : "opacity-80",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    active ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink
            href={siteConfig.bookingUrl}
            external
            variant={solid ? "primary" : "onDark"}
            size="md"
            className="hidden sm:inline-flex"
            onClick={() => trackBookCallClick({ location: "header" })}
          >
            Book a call →
          </ButtonLink>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center lg:hidden"
          >
            <span className="relative block h-3.5 w-6">
              <span className="absolute left-0 top-0 h-0.5 w-full bg-current" />
              <span className="absolute left-0 top-1.5 h-0.5 w-full bg-current" />
              <span className="absolute left-0 top-3 h-0.5 w-full bg-current" />
            </span>
          </button>
        </div>
      </Container>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-teal text-paper lg:hidden"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <div className="flex h-20 items-center justify-between px-6">
            <Logo variant="offwhite" height={40} />
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center text-2xl"
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
            {mainNav.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.08 + i * 0.06 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="font-display block py-3 text-3xl tracking-wide"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="px-8 pb-12">
            <ButtonLink
              href={siteConfig.bookingUrl}
              external
              variant="onDark"
              size="lg"
              className="w-full"
              onClick={() => trackBookCallClick({ location: "mobile-nav" })}
            >
              Book a call →
            </ButtonLink>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
