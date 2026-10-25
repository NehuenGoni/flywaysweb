import type { Experience, Lodge, MediaRef, Program } from "./types";
import { mediaIndex } from "./media-index";

/**
 * Fotos de experiencias, lodges y programas. Viven en Vercel Blob (no en el
 * repo) bajo `experiences/<experiencia>/<lodge>/<sección>/<archivo>.webp`,
 * reflejando las carpetas que entregó el cliente (HERO / THE LODGING /
 * THE SHOOTING|HUNTING / THE SERVICE). Acá se elige cuál foto va en cada
 * lugar; el resto de la carpeta del lodge/programa pasa a su galería.
 */
export const MEDIA_BASE = "https://pm7wtjb3rusbf6oi.public.blob.vercel-storage.com/experiences";

function ref(path: string, alt: string): MediaRef {
  const size = mediaIndex[path];
  if (!size) throw new Error(`[media] foto inexistente en media-index: ${path}`);
  return { src: `${MEDIA_BASE}/${path}`, alt, width: size[0], height: size[1] };
}

/** Rutas de todas las fotos de una carpeta, sin las excluidas. */
function photosIn(folder: string, exclude: string[] = []): string[] {
  return Object.keys(mediaIndex).filter((p) => p.startsWith(`${folder}/`) && !exclude.includes(p));
}

function galleryOf(folder: string, label: string, exclude: string[] = []): MediaRef[] {
  return photosIn(folder, exclude).map((p, i) => ref(p, `${label} — photo ${i + 1}`));
}

/* ── Experiencias (HERO a nivel experiencia) ─────────────────────────────── */

const experienceHeroes: Record<string, string> = {
  "dove-hunting-cordoba": "dove-hunting-cordoba/hero/impact-1-1.webp",
  "big-game": "big-game/hero/5.webp",
  // Mixed Bag y Fly Fishing no traen carpeta HERO propia: se usó la mejor foto real.
  "mixed-bag": "mixed-bag/estancia-del-monte/the-shooting/buenos-aires-mixed-bag-1-38.webp",
  "fly-fishing-patagonia": "patagonia-fly-fishing/echoes-of-patagonia/dji-0057.webp",
};

export function withExperienceMedia(experience: Experience): Experience {
  const path = experienceHeroes[experience.slug];
  if (!path) return experience;
  return { ...experience, hero: ref(path, experience.title) };
}

/* ── Lodges ──────────────────────────────────────────────────────────────── */

interface LodgePhotos {
  folder: string;
  hero: string;
  /**
   * La foto principal de cada sección, en el orden de lodge.sections
   * (Lodging / Shooting|Hunting / Service). Va primera en el carrusel; el
   * resto de la carpeta de la sección la sigue.
   */
  sections: [string, string, string];
}

const lodgePhotos: Record<string, LodgePhotos> = {
  "los-chanares": {
    folder: "dove-hunting-cordoba/estancia-los-chanares",
    hero: "hero/golden-hour-mediterranean-estate.webp",
    sections: [
      "the-lodging/gn1-4014-1.webp",
      "the-shooting/fly-ways-institucional-647.webp",
      "the-service/fly-ways-institucional-953.webp",
    ],
  },
  "posta-del-norte": {
    folder: "dove-hunting-cordoba/posta-del-norte",
    hero: "hero/golden-mediterranean-courtyard-retreat.webp",
    sections: [
      "the-lodging/copia-de-copy-of-greennation-65.webp",
      "the-shooting/a7303782.webp",
      "the-service/copia-de-copy-of-greennation-64.webp",
    ],
  },
  "estancia-del-monte": {
    folder: "mixed-bag/estancia-del-monte",
    hero: "hero/golden-hour-hacienda-estate.webp",
    sections: [
      "the-lodging/mediterranean-villa-pool-paradise.webp",
      "the-shooting/golden-marsh-at-dawn.webp",
      "the-service/buenos-aires-mixed-bag-1-79.webp",
    ],
  },
  "estancia-santa-rita": {
    folder: "mixed-bag/santa-rita",
    hero: "hero/golden-hour-countryside-estate.webp",
    sections: [
      "the-lodging/cozy-rustic-manor-living-room.webp",
      "the-shooting/21.webp",
      "the-service/4.webp",
    ],
  },
  "mountain-lodge": {
    folder: "big-game/mountain-lodge",
    // Sin carpeta HERO: la fachada con los trofeos es la mejor toma del lodge.
    hero: "the-hunting/ecb5b55c-42b2-4954-a937-ca8b9abf1234.webp",
    sections: [
      "the-lodging/rustic-lodge-gathering-by-the-fire.webp",
      "the-hunting/img-4904.webp",
      "the-service/ech7550.webp",
    ],
  },
};

export function withLodgeMedia(lodge: Lodge): Lodge {
  const photos = lodgePhotos[lodge.slug];
  if (!photos) return lodge;

  const at = (rel: string) => `${photos.folder}/${rel}`;
  const heroPath = at(photos.hero);
  const sections = lodge.sections.map((section, i) => {
    const rel = photos.sections[i];
    if (!rel) return section;
    const lead = at(rel);
    const folder = lead.slice(0, lead.lastIndexOf("/"));
    const paths = [lead, ...photosIn(folder, [lead, heroPath])];
    const images = paths.map((p, n) => ref(p, `${lodge.name} — ${section.heading} ${n + 1}`));
    return { ...section, image: images[0], images };
  });

  return {
    ...lodge,
    hero: ref(heroPath, lodge.name),
    sections,
    // El hero va primero: arriba es solo un fondo y acá se puede ampliar.
    gallery: [heroPath, ...photosIn(photos.folder, [heroPath])].map((p, i) =>
      ref(p, `${lodge.name} — photo ${i + 1}`),
    ),
  };
}

/* ── Programas de pesca ──────────────────────────────────────────────────── */

export interface ProgramMedia {
  hero: MediaRef;
  gallery: MediaRef[];
}

const programPhotos: Record<string, { folder: string; hero: string }> = {
  "echoes-of-patagonia": {
    folder: "patagonia-fly-fishing/echoes-of-patagonia",
    hero: "dji-0103.webp",
  },
  "nomad-fishing-experience": {
    folder: "patagonia-fly-fishing/nomad-fishing-experience",
    hero: "dji-0524.webp",
  },
};

export function withProgramMedia(program: Program): Program {
  const photos = programPhotos[program.slug];
  if (!photos) return program;
  const heroPath = `${photos.folder}/${photos.hero}`;
  // La toma del hero de la experiencia ya se ve arriba de todo: no se repite.
  const exclude = [heroPath, ...Object.values(experienceHeroes)];
  return { ...program, hero: ref(heroPath, program.name), gallery: galleryOf(photos.folder, program.name, exclude) };
}
