"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { MediaRef } from "@/content/types";

/**
 * Visor a pantalla completa. Se cierra con Esc, clic en el fondo o la X;
 * navega con las flechas del teclado o los botones. Bloquea el scroll de
 * la página mientras está abierto.
 */
export function Lightbox({
  photos,
  index,
  onClose,
  onChange,
}: {
  photos: MediaRef[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = photos.length;
  const photo = photos[index];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight" && count > 1) onChange((index + 1) % count);
      else if (event.key === "ArrowLeft" && count > 1) onChange((index - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count, onClose, onChange]);

  if (!photo) return null;

  const button =
    "absolute z-10 flex h-11 w-11 items-center justify-center rounded-full bg-paper/10 text-paper backdrop-blur transition hover:bg-paper/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      className="fixed inset-0 z-[100] bg-black/90"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        aria-label="Close"
        onClick={onClose}
        className={`${button} right-4 top-4`}
      >
        <span aria-hidden className="text-2xl leading-none">
          ×
        </span>
      </button>

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(event) => {
              event.stopPropagation();
              onChange((index - 1 + count) % count);
            }}
            className={`${button} left-3 top-1/2 -translate-y-1/2 sm:left-6`}
          >
            <span aria-hidden className="text-xl">
              ←
            </span>
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(event) => {
              event.stopPropagation();
              onChange((index + 1) % count);
            }}
            className={`${button} right-3 top-1/2 -translate-y-1/2 sm:right-6`}
          >
            <span aria-hidden className="text-xl">
              →
            </span>
          </button>
        </>
      )}

      <div
        className="absolute inset-x-4 bottom-16 top-16 sm:inset-x-20"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="100vw"
          quality={80}
          className="object-contain"
        />
      </div>

      <p className="absolute inset-x-0 bottom-5 text-center font-display text-xs uppercase tracking-[0.22em] text-paper/70">
        {index + 1} / {count}
      </p>
    </div>
  );
}
