"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { ScheduleCallButton } from "@/components/ui/ScheduleCallButton";
import { HeroVideo } from "./HeroVideo";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-ink text-paper">
      {/* The gradient sits behind the poster/film and tints them. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-teal-700 to-teal" />
      <HeroVideo />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_70%_-10%,rgba(134,190,205,0.18),transparent_55%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(100%_100%_at_50%_120%,rgba(0,0,0,0.6),transparent_55%)]" />

      <Container className="relative py-32">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-display text-xs uppercase tracking-[0.32em] text-sky"
        >
          FlyWays Argentina · Est. 20 years
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
          className="font-display mt-5 max-w-4xl text-4xl leading-[1.04] sm:text-6xl lg:text-7xl"
        >
          Argentina&apos;s finest hunting and fishing.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <ButtonLink href="/experiences" variant="onDark" size="lg">
            More Info
          </ButtonLink>
          <ScheduleCallButton
            placement="page"
            variant="ghost"
            size="lg"
            className="text-paper/85 hover:text-paper"
          />
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-paper/30 p-1.5"
        >
          <span className="block h-2 w-1 rounded-full bg-paper/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
