"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { leadSchema, type LeadInput } from "@/lib/lead";
import { trackLead } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function LeadForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const pathname = usePathname();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LeadInput>({ resolver: zodResolver(leadSchema) });

  const onSubmit = async (data: LeadInput) => {
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: pathname }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
      trackLead({ source: pathname });
    } catch {
      setError("root", {
        message: "Something went wrong. Please email us — we'll get right back to you.",
      });
    }
  };

  const dark = tone === "dark";
  const labelCls = cn(
    "block text-xs font-medium uppercase tracking-[0.15em]",
    dark ? "text-paper/70" : "text-ink/60",
  );
  const inputCls = cn(
    "mt-2 w-full rounded-lg border bg-transparent px-4 py-3 text-sm outline-none transition-colors",
    dark
      ? "border-paper/25 text-paper placeholder:text-paper/40 focus:border-sky"
      : "border-ink/15 text-ink placeholder:text-ink/35 focus:border-olive",
  );
  const errorCls = dark ? "text-sky" : "text-bark";

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: EASE }}
            className={cn(
              "flex flex-col items-start gap-3 rounded-2xl p-8",
              dark ? "bg-paper/[0.06]" : "bg-paper-dim",
            )}
          >
            <motion.span
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-olive text-2xl text-paper"
            >
              ✓
            </motion.span>
            <h3 className="font-display text-2xl">Thank you — message received.</h3>
            <p className={cn("text-sm", dark ? "text-paper/75" : "text-ink/70")}>
              A real person at FlyWays will be in touch shortly. No bots, no queues.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid gap-5 sm:grid-cols-2"
            noValidate
          >
            <Field label="Name" error={errors.name?.message} labelCls={labelCls} errorCls={errorCls}>
              <input
                type="text"
                autoComplete="name"
                placeholder="Your name"
                className={inputCls}
                {...register("name")}
              />
            </Field>

            <Field label="Email" error={errors.email?.message} labelCls={labelCls} errorCls={errorCls}>
              <input
                type="email"
                autoComplete="email"
                placeholder="you@email.com"
                className={inputCls}
                {...register("email")}
              />
            </Field>

            <Field label="Tentative dates" error={errors.dates?.message} labelCls={labelCls} errorCls={errorCls}>
              <input
                type="text"
                placeholder="e.g. October 2026"
                className={inputCls}
                {...register("dates")}
              />
            </Field>

            <Field label="Party size" error={errors.party?.message} labelCls={labelCls} errorCls={errorCls}>
              <input
                type="text"
                placeholder="e.g. 4 hunters"
                className={inputCls}
                {...register("party")}
              />
            </Field>

            <div className="sm:col-span-2">
              <Field label="Anything else? (optional)" error={errors.message?.message} labelCls={labelCls} errorCls={errorCls}>
                <textarea
                  rows={3}
                  placeholder="Questions, preferences, who's coming along…"
                  className={cn(inputCls, "resize-none")}
                  {...register("message")}
                />
              </Field>
            </div>

            {/* Honeypot — visually hidden, not for humans */}
            <div aria-hidden className="hidden">
              <label>
                Company
                <input tabIndex={-1} autoComplete="off" {...register("company")} />
              </label>
            </div>

            <div className="sm:col-span-2">
              {errors.root && (
                <p className={cn("mb-3 text-sm", errorCls)}>{errors.root.message}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-150 active:scale-[0.98] disabled:opacity-60 sm:w-auto",
                  dark
                    ? "bg-sky text-teal hover:bg-paper"
                    : "bg-olive text-paper hover:bg-bark hover:-translate-y-0.5",
                )}
              >
                {isSubmitting ? "Sending…" : "Send & get a reply →"}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  error,
  labelCls,
  errorCls,
  children,
}: {
  label: string;
  error?: string;
  labelCls: string;
  errorCls: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      {children}
      {error && <span className={cn("mt-1.5 block text-xs", errorCls)}>{error}</span>}
    </label>
  );
}
