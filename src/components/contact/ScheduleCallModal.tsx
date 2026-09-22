"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useScheduleCall } from "@/components/contact/ScheduleCallContext";
import { LeadForm } from "@/components/contact/LeadForm";

const EASE = [0.16, 1, 0.3, 1] as const;
const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * "Schedule a Call" as a modal, opened by every ScheduleCallButton on the
 * site. Mounted once in the root layout, next to LeadPopup. Follows the
 * same dialog pattern LeadPopup used to (role="dialog", Escape, scroll
 * lock), plus a focus trap and autofocus that popup never had.
 */
export function ScheduleCallModal() {
  const { open, context, closeModal } = useScheduleCall();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const firstField = panel?.querySelector<HTMLElement>(FOCUSABLE);
    firstField?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, closeModal]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="schedule-call-heading"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-paper p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              ✕
            </button>

            <div className="font-display text-xs uppercase tracking-[0.2em] text-olive">
              Schedule a call
            </div>
            <h2 id="schedule-call-heading" className="font-display mt-1.5 text-2xl">
              Let&apos;s plan your trip
            </h2>
            <p className="mt-1.5 text-sm text-ink/70">
              Tell us a bit about what you&apos;re after — a real person at
              FlyWays will reach out to talk it through.
            </p>

            <div className="mt-6">
              <LeadForm
                tone="light"
                variant="full"
                businessUnit={context.businessUnit}
                experience={context.experience}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
