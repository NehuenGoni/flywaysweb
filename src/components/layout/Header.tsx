"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/brand/Logo";
import { experienceIcons } from "@/components/brand/icons";
import { ScheduleCallButton } from "@/components/ui/ScheduleCallButton";
import { Container } from "@/components/ui/Container";
import { mainNav, type NavChild, type NavItem } from "@/data/site";
import {
  businessUnitForExperienceIcon,
  pageTypeFromPathname,
  trackNavClick,
  type BusinessUnit,
} from "@/lib/analytics";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

// Only "Experiences" and "The Lodges" carry a submenu today; the cast below
// is safe because `navChildContext` is only ever called for those two items.
type NavGroup = "Experiences" | "The Lodges";

/** Derives the analytics context (business_unit/experience) for a submenu child. */
function navChildContext(group: NavGroup, child: NavChild) {
  if (child.icon) {
    return {
      businessUnit: businessUnitForExperienceIcon(child.icon) as BusinessUnit | undefined,
      experience: child.label,
    };
  }
  if (group === "The Lodges" && child.href !== "/lodges") {
    return { businessUnit: "Hunting" as BusinessUnit | undefined, experience: undefined };
  }
  return { businessUnit: undefined, experience: undefined };
}

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
          {mainNav.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ScheduleCallButton
            placement="header"
            variant={solid ? "primary" : "onDark"}
            size="md"
            className="hidden sm:inline-flex"
          />

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

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </header>
  );
}

/** Desktop nav item. Renders a submenu panel on hover/focus when the item has children. */
function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const active = pathname.startsWith(item.href);

  useEffect(() => () => clearTimeout(closeTimeout.current), []);

  if (!item.children) {
    return (
      <Link
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
  }

  const group = item.label as NavGroup;

  const openNow = () => {
    clearTimeout(closeTimeout.current);
    setOpen(true);
  };
  const closeSoon = () => {
    closeTimeout.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocus={openNow}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <Link
        href={item.href}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          "group relative flex items-center gap-1 text-sm font-medium tracking-wide transition-opacity hover:opacity-100",
          active ? "opacity-100" : "opacity-80",
        )}
      >
        {item.label}
        <span
          aria-hidden
          className={cn(
            "text-[0.6rem] transition-transform duration-200",
            open && "-rotate-180",
          )}
        >
          ▾
        </span>
        <span
          className={cn(
            "absolute -bottom-1.5 left-0 h-px bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            active ? "w-full" : "w-0 group-hover:w-full",
          )}
        />
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="absolute left-1/2 top-full z-10 mt-3 w-72 -translate-x-1/2 rounded-2xl border border-ink/10 bg-paper p-2 text-ink shadow-xl"
          >
            {item.children.map((child) => (
              <NavMenuChild key={child.href} child={child} group={group} pathname={pathname} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavMenuChild({
  child,
  group,
  pathname,
}: {
  child: NavChild;
  group: NavGroup;
  pathname: string;
}) {
  const Icon = child.icon ? experienceIcons[child.icon] : null;

  return (
    <Link
      href={child.href}
      role="menuitem"
      onClick={() =>
        trackNavClick({
          item: child.label,
          group,
          placement: "header",
          ...navChildContext(group, child),
          context: { pageType: pageTypeFromPathname(pathname) },
        })
      }
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-ink/5"
    >
      {Icon && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal/8 text-teal">
          <Icon className="h-4 w-4" />
        </span>
      )}
      <span className="flex-1">
        <span className="block font-medium">{child.label}</span>
        {child.sublabel && (
          <span className="block text-xs text-ink/55">{child.sublabel}</span>
        )}
      </span>
    </Link>
  );
}

function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
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
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-teal text-paper lg:hidden"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <div className="flex h-20 shrink-0 items-center justify-between px-6">
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

          <nav className="flex flex-1 flex-col justify-center gap-1 px-8 py-8">
            {mainNav.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.08 + i * 0.06 }}
              >
                {item.children ? (
                  <MobileNavGroup item={item} pathname={pathname} onNavigate={onClose} />
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="font-display block py-3 text-3xl tracking-wide"
                  >
                    {item.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>

          <div className="px-8 pb-12">
            <ScheduleCallButton
              placement="mobile-nav"
              variant="onDark"
              size="lg"
              className="w-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Mobile accordion for a nav item with children: label still links out, caret toggles the list. */
function MobileNavGroup({
  item,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const group = item.label as NavGroup;

  return (
    <div className="border-b border-paper/10">
      <div className="flex items-center justify-between gap-2">
        <Link
          href={item.href}
          onClick={onNavigate}
          className="font-display block flex-1 py-3 text-3xl tracking-wide"
        >
          {item.label}
        </Link>
        <button
          type="button"
          aria-expanded={expanded}
          aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label}`}
          onClick={() => setExpanded((v) => !v)}
          className="flex h-11 w-11 shrink-0 items-center justify-center text-lg"
        >
          <span
            className={cn(
              "block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              expanded && "-rotate-180",
            )}
          >
            ▾
          </span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-0.5 pb-3 pl-1">
              {item.children!.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={() => {
                    trackNavClick({
                      item: child.label,
                      group,
                      placement: "mobile-nav",
                      ...navChildContext(group, child),
                      context: { pageType: pageTypeFromPathname(pathname) },
                    });
                    onNavigate();
                  }}
                  className="flex items-center py-2.5 text-lg text-paper/85"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
