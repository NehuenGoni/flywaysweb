"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LeadForm } from "@/components/contact/LeadForm";

const EASE = [0.16, 1, 0.3, 1] as const;
// One shot per browser tab/session — sessionStorage clears when the tab closes.
const SESSION_KEY = "flyways-lead-popup-shown";
const DELAY_MS = 5000;

/**
 * First-visit lead capture: shows the compact form as a dismissible modal
 * a few seconds into the session, once per tab. Mounted site-wide in the
 * root layout so it can fire from whichever page a visitor lands on.
 */
export function LeadPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const timer = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setOpen(true);
    }, DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-popup-heading"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-2xl bg-paper p-6 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              ✕
            </button>

            <div className="font-display text-xs uppercase tracking-[0.2em] text-olive">
              Plan your trip
            </div>
            <h2 id="lead-popup-heading" className="font-display mt-1.5 text-xl">
              Let&apos;s start the conversation
            </h2>
            <p className="mt-1.5 text-sm text-ink/70">
              Leave your details and a real person from FlyWays will reach out.
            </p>

            <div className="mt-5">
              <LeadForm tone="light" variant="compact" dense />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
