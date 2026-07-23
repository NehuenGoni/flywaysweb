"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import {
  leadCompactSchema,
  leadFullSchema,
  type LeadCompactInput,
  type LeadFullInput,
} from "@/lib/lead";
import { trackLead, type BusinessUnit } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { countries } from "@/data/countries";

const EASE = [0.16, 1, 0.3, 1] as const;

type Tone = "light" | "dark";

/**
 * The site-wide lead form, in two variants:
 *  - "compact": name, email, phone — lowest friction, for tight placements.
 *  - "full": the standard CRM-style form (contact details, trip context,
 *    consent) — used on contact/plan-your-trip and end-of-page CTAs.
 *
 * Both post to the same /api/lead endpoint, tagged with their variant.
 */
export function LeadForm({
  tone = "light",
  variant = "full",
  dense = false,
  businessUnit,
  experience,
}: {
  tone?: Tone;
  variant?: "compact" | "full";
  /** Tighter spacing/sizing — for the compact variant in a modal. */
  dense?: boolean;
  businessUnit?: BusinessUnit;
  experience?: string;
}) {
  return variant === "compact" ? (
    <CompactForm tone={tone} dense={dense} businessUnit={businessUnit} experience={experience} />
  ) : (
    <FullForm tone={tone} businessUnit={businessUnit} experience={experience} />
  );
}

async function postLead(payload: unknown) {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Request failed");
}

function toneClasses(tone: Tone, dense = false) {
  const dark = tone === "dark";
  return {
    dark,
    labelCls: cn(
      "block text-xs font-medium uppercase tracking-[0.15em]",
      dark ? "text-paper/70" : "text-ink/60",
    ),
    inputCls: cn(
      "w-full rounded-lg border bg-transparent text-sm outline-none transition-colors",
      dense ? "mt-1.5 px-3.5 py-2.5" : "mt-2 px-4 py-3",
      dark
        ? "border-paper/25 text-paper placeholder:text-paper/40 focus:border-sky"
        : "border-ink/15 text-ink placeholder:text-ink/35 focus:border-olive",
    ),
    errorCls: dark ? "text-sky" : "text-bark",
    checkboxCls: cn(
      "mt-0.5 h-4 w-4 shrink-0 rounded border",
      dark ? "border-paper/40 accent-sky" : "border-ink/25 accent-olive",
    ),
    checkboxLabelCls: cn("text-sm", dark ? "text-paper/80" : "text-ink/70"),
  };
}

function submitButtonCls(dark: boolean, dense = false) {
  return cn(
    "inline-flex w-full items-center justify-center gap-2 rounded-full text-sm font-medium tracking-wide transition-all duration-150 active:scale-[0.98] disabled:opacity-60 sm:w-auto",
    dense ? "px-6 py-3" : "px-7 py-3.5",
    dark
      ? "bg-sky text-teal hover:bg-paper"
      : "bg-olive text-paper hover:bg-bark hover:-translate-y-0.5",
  );
}

function SuccessState({ dark, dense = false }: { dark: boolean; dense?: boolean }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={cn(
        "flex flex-col items-start gap-3 rounded-2xl",
        dense ? "p-6" : "p-8",
        dark ? "bg-paper/[0.06]" : "bg-paper-dim",
      )}
    >
      <motion.span
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
        className={cn(
          "flex items-center justify-center rounded-full bg-olive text-paper",
          dense ? "h-10 w-10 text-xl" : "h-12 w-12 text-2xl",
        )}
      >
        ✓
      </motion.span>
      <h3 className={cn("font-display", dense ? "text-xl" : "text-2xl")}>
        Thank you — message received.
      </h3>
      <p className={cn("text-sm", dark ? "text-paper/75" : "text-ink/70")}>
        A real person at FlyWays will be in touch shortly. No bots, no queues.
      </p>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- compact */

function CompactForm({
  tone,
  dense = false,
  businessUnit,
  experience,
}: {
  tone: Tone;
  dense?: boolean;
  businessUnit?: BusinessUnit;
  experience?: string;
}) {
  const pathname = usePathname();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LeadCompactInput>({
    resolver: zodResolver(leadCompactSchema),
    defaultValues: { variant: "compact", preferPhoneCall: false, subscribeNewsletter: true },
  });

  const { dark, labelCls, inputCls, errorCls, checkboxCls, checkboxLabelCls } = toneClasses(
    tone,
    dense,
  );

  const onSubmit = async (data: LeadCompactInput) => {
    try {
      await postLead({ ...data, source: pathname });
      setSubmitted(true);
      trackLead({
        source: pathname,
        variant: "compact",
        newsletterOptIn: data.subscribeNewsletter,
        businessUnit,
        experience,
      });
    } catch {
      setError("root", {
        message: "Something went wrong. Please email us — we'll get right back to you.",
      });
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {submitted ? (
          <SuccessState dark={dark} dense={dense} />
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={cn("grid", dense ? "gap-3.5" : "gap-5")}
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

            <Field label="Phone" error={errors.phone?.message} labelCls={labelCls} errorCls={errorCls}>
              <input
                type="tel"
                autoComplete="tel"
                placeholder="Your phone number"
                className={inputCls}
                {...register("phone")}
              />
            </Field>

            <div className="space-y-2.5">
              <label className="flex items-start gap-2.5">
                <input type="checkbox" className={checkboxCls} {...register("preferPhoneCall")} />
                <span className={checkboxLabelCls}>I prefer a phone call</span>
              </label>

              <label className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  className={checkboxCls}
                  {...register("subscribeNewsletter")}
                />
                <span className={checkboxLabelCls}>
                  Keep me posted with FlyWays trips and openings (newsletter)
                </span>
              </label>
            </div>

            {/* Honeypot — visually hidden, not for humans */}
            <div aria-hidden className="hidden">
              <label>
                Company
                <input tabIndex={-1} autoComplete="off" {...register("company")} />
              </label>
            </div>

            <div>
              {errors.root && (
                <p className={cn("mb-3 text-sm", errorCls)}>{errors.root.message}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={submitButtonCls(dark, dense)}
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

/* -------------------------------------------------------------------- full */

function FullForm({
  tone,
  businessUnit,
  experience,
}: {
  tone: Tone;
  businessUnit?: BusinessUnit;
  experience?: string;
}) {
  const pathname = usePathname();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LeadFullInput>({
    resolver: zodResolver(leadFullSchema),
    defaultValues: { variant: "full", preferPhoneCall: false, subscribeNewsletter: true },
  });

  const { dark, labelCls, inputCls, errorCls, checkboxCls, checkboxLabelCls } = toneClasses(tone);

  const onSubmit = async (data: LeadFullInput) => {
    try {
      await postLead({ ...data, source: pathname });
      setSubmitted(true);
      trackLead({
        source: pathname,
        variant: "full",
        newsletterOptIn: data.subscribeNewsletter,
        businessUnit,
        experience,
      });
    } catch {
      setError("root", {
        message: "Something went wrong. Please email us — we'll get right back to you.",
      });
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {submitted ? (
          <SuccessState dark={dark} />
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
            <Field label="First name" error={errors.firstName?.message} labelCls={labelCls} errorCls={errorCls}>
              <input
                type="text"
                autoComplete="given-name"
                placeholder="First name"
                className={inputCls}
                {...register("firstName")}
              />
            </Field>

            <Field label="Last name" error={errors.lastName?.message} labelCls={labelCls} errorCls={errorCls}>
              <input
                type="text"
                autoComplete="family-name"
                placeholder="Last name"
                className={inputCls}
                {...register("lastName")}
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

            <Field label="Phone number" error={errors.phone?.message} labelCls={labelCls} errorCls={errorCls}>
              <input
                type="tel"
                autoComplete="tel"
                placeholder="Your phone number"
                className={inputCls}
                {...register("phone")}
              />
            </Field>

            <Field label="Country" error={errors.country?.message} labelCls={labelCls} errorCls={errorCls}>
              <select
                autoComplete="country-name"
                defaultValue=""
                className={cn(inputCls, "appearance-none")}
                {...register("country")}
              >
                <option value="" disabled>
                  Select a country
                </option>
                {countries.map((c) => (
                  <option key={c.code} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="State / Province" error={errors.state?.message} labelCls={labelCls} errorCls={errorCls}>
              <input
                type="text"
                autoComplete="address-level1"
                placeholder="State/Province"
                className={inputCls}
                {...register("state")}
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
              <Field
                label="Message (group size, approximate dates, lodge, etc.)"
                error={errors.message?.message}
                labelCls={labelCls}
                errorCls={errorCls}
              >
                <textarea
                  rows={3}
                  placeholder="Questions, preferences, who's coming along…"
                  className={cn(inputCls, "resize-none")}
                  {...register("message")}
                />
              </Field>
            </div>

            <div className="sm:col-span-2 space-y-3">
              <label className="flex items-start gap-2.5">
                <input type="checkbox" className={checkboxCls} {...register("preferPhoneCall")} />
                <span className={checkboxLabelCls}>I prefer a phone call</span>
              </label>

              <label className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  className={checkboxCls}
                  {...register("subscribeNewsletter")}
                />
                <span className={checkboxLabelCls}>
                  Keep me posted with FlyWays trips and openings (newsletter)
                </span>
              </label>

              <label className="flex items-start gap-2.5">
                <input type="checkbox" className={checkboxCls} {...register("agreeContact")} />
                <span className={checkboxLabelCls}>
                  I agree to be contacted by FlyWays via email. To opt out, you can click the
                  unsubscribe link in the emails.
                </span>
              </label>
              {errors.agreeContact && (
                <p className={cn("text-xs", errorCls)}>{errors.agreeContact.message}</p>
              )}
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
              <button type="submit" disabled={isSubmitting} className={submitButtonCls(dark)}>
                {isSubmitting ? "Sending…" : "Send & get a reply →"}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ shared */

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
