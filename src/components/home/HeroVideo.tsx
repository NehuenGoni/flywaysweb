"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const HERO_VIDEO_URL =
  "https://pm7wtjb3rusbf6oi.public.blob.vercel-storage.com/Flyways-web.mp4";

type NetworkInformation = { saveData?: boolean };

/**
 * Background film for the home hero. The poster (first frame of the film) is
 * always shown; the video itself is heavy, so it is only mounted after the page
 * has finished loading and never on mobile, with data-saver on or with reduced
 * motion — in those cases the hero keeps showing the poster.
 */
export function HeroVideo() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => {
      const connection = (navigator as Navigator & {
        connection?: NetworkInformation;
      }).connection;
      const skip =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.matchMedia("(max-width: 767px)").matches ||
        connection?.saveData === true;
      if (!skip) setEnabled(true);
    };

    if (document.readyState === "complete") {
      start();
      return;
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  return (
    <>
      <Image
        src="/hero-poster.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {enabled && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onPlaying={() => setReady(true)}
          className={`absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-1000 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 -z-10 bg-black/40" />
    </>
  );
}
