"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { MediaRef } from "@/content/types";
import { Lightbox } from "./Lightbox";

/**
 * Carrusel de fotos de una sección (Lodging / Shooting / Service). Muestra
 * una foto a la vez, con flechas, contador y deslizamiento táctil. Solo se
 * montan la foto actual y las vecinas, así que no descarga la carpeta entera.
 * Un clic abre la foto en el visor ampliado.
 */
export function PhotoCarousel({ photos, label }: { photos: MediaRef[]; label: string }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const dragStart = useRef<number | null>(null);
  const dragged = useRef(false);
  const count = photos.length;

  const go = (next: number) => setIndex((next + count) % count);

  const button =
    "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-paper backdrop-blur transition hover:bg-black/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper";

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      className="group relative aspect-[4/5] w-full select-none overflow-hidden rounded-2xl bg-ink/10"
      onPointerDown={(event) => {
        dragStart.current = event.clientX;
        dragged.current = false;
      }}
      onPointerUp={(event) => {
        if (dragStart.current === null) return;
        const delta = event.clientX - dragStart.current;
        dragStart.current = null;
        if (Math.abs(delta) > 40) {
          dragged.current = true;
          go(index + (delta < 0 ? 1 : -1));
        }
      }}
      onPointerCancel={() => {
        dragStart.current = null;
      }}
    >
      {photos.map((photo, i) => {
        const distance = Math.min((i - index + count) % count, (index - i + count) % count);
        if (distance > 1) return null;
        return (
          <button
            key={photo.src}
            type="button"
            aria-label={`Enlarge photo ${i + 1} of ${count}`}
            aria-hidden={i !== index}
            tabIndex={i === index ? 0 : -1}
            onClick={() => {
              if (!dragged.current) setOpen(true);
            }}
            className={`absolute inset-0 cursor-zoom-in transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              draggable={false}
              className="object-cover"
            />
          </button>
        );
      })}

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => go(index - 1)}
            className={`${button} left-3`}
          >
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => go(index + 1)}
            className={`${button} right-3`}
          >
            <span aria-hidden>→</span>
          </button>
          <span className="absolute bottom-3 right-3 z-10 rounded-full bg-black/45 px-3 py-1 font-display text-xs tracking-[0.18em] text-paper backdrop-blur">
            {index + 1} / {count}
          </span>
        </>
      )}

      {open && (
        <Lightbox photos={photos} index={index} onClose={() => setOpen(false)} onChange={setIndex} />
      )}
    </div>
  );
}
