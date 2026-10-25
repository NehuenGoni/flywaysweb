"use client";

import Image from "next/image";
import { useState } from "react";
import type { MediaRef } from "@/content/types";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox } from "./Lightbox";

/**
 * Galería tipo masonry. Arranca mostrando solo las primeras `initial` fotos
 * (el resto ni se monta, así no se descargan) y se expande con "Show all".
 * Cada foto se abre en el visor ampliado.
 */
export function Gallery({
  photos,
  eyebrow = "Gallery",
  heading,
  initial = 6,
}: {
  photos: MediaRef[];
  eyebrow?: string;
  heading: string;
  initial?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  if (photos.length === 0) return null;

  const visible = expanded ? photos : photos.slice(0, initial);
  const hidden = photos.length - visible.length;

  return (
    <div>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="font-display mt-3 text-3xl sm:text-4xl">{heading}</h2>
      </Reveal>

      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {visible.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            aria-label={`Enlarge photo ${i + 1} of ${photos.length}`}
            onClick={() => setActive(i)}
            className="block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-xl"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width ?? 1600}
              height={photo.height ?? 1067}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="h-auto w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {photos.length > initial && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
            className="rounded-full border border-ink/20 px-6 py-3 text-sm font-medium transition hover:border-ink/40 hover:bg-ink/5"
          >
            {expanded ? "Show fewer photos" : `Show all ${photos.length} photos (+${hidden})`}
          </button>
        </div>
      )}

      {active !== null && (
        <Lightbox photos={visible} index={active} onClose={() => setActive(null)} onChange={setActive} />
      )}
    </div>
  );
}
