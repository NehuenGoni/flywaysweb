/**
 * Procesa las fotos del equipo para subirlas a Vercel Blob (store flyways-media).
 *
 *   node scripts/process-team.mjs "<carpeta con las fotos originales>"
 *
 * Los originales se nombran "<orden>- <Nombre> - <Cargo>.<ext>". Genera:
 *   - .team-out/<slug>.webp          → subir a Blob bajo `team/`
 *   - src/content/team-data.generated.ts → datos + blurDataURL para el sitio
 */
import { mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, ".team-out");
const dataFile = path.join(root, "src/content/team-data.generated.ts");

const input = process.argv[2];
if (!input) {
  console.error('Uso: node scripts/process-team.mjs "<carpeta de fotos>"');
  process.exit(1);
}

/** Los owners se muestran más grandes, así que llevan más resolución. */
const OWNER_ROLE = /^owner\b/i;
const SIZE = { owner: [1280, 1600], team: [960, 1200] };
const RATIO = 4 / 5;

/**
 * Foco del recorte [x, y] como fracción del original (0–1). Casi todos los
 * retratos horizontales tienen a la persona cerca del centro; acá solo los
 * que se corren. En verticales y= .4 deja aire arriba de la cabeza.
 */
const DEFAULT_FOCUS = [0.5, 0.4];
const FOCUS = {
  "alex-mitri": [0.45, 0.4],
  "jessica-ciappa": [0.4, 0.4],
  "daniel-lujan": [0.45, 0.4],
  "natalia-cejas": [0.57, 0.4],
  "ruben-rivarola": [0.46, 0.4],
  "mariana-ferreyra": [0.47, 0.4],
  "raul-grigolato": [0.46, 0.4],
};

const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

const FILE_RE = /^(\d+)-\s*(.+?)\s+-\s+(.+?)\.(?:jpe?g|png|webp)$/i;

const slugify = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

const files = (await readdir(input)).filter((f) => FILE_RE.test(f));
if (files.length === 0) {
  console.error(`No encontré fotos con el formato "N- Nombre - Cargo.ext" en ${input}`);
  process.exit(1);
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const people = [];
const slugs = new Set();
let before = 0;
let after = 0;

for (const file of files) {
  const [, order, name, rawRole] = file.match(FILE_RE);
  // Algunos nombres de archivo traen un "_" sobrante al final del cargo.
  const role = rawRole.replace(/_+$/, "").trim();
  const slug = slugify(name);
  if (slugs.has(slug)) throw new Error(`Slug repetido: ${slug} (${file})`);
  slugs.add(slug);

  const src = path.join(input, file);
  const [targetW] = OWNER_ROLE.test(role) ? SIZE.owner : SIZE.team;

  // Se aplica la orientación EXIF antes de medir y recortar.
  const { data: upright, info: meta } = await sharp(src).rotate().toBuffer({ resolveWithObject: true });

  // Mayor recorte 4:5 que entra en el original, centrado en el foco de la persona.
  const [fx, fy] = FOCUS[slug] ?? DEFAULT_FOCUS;
  const wide = meta.width / meta.height > RATIO;
  const cropW = wide ? Math.round(meta.height * RATIO) : meta.width;
  const cropH = wide ? meta.height : Math.round(meta.width / RATIO);
  const left = clamp(Math.round(fx * meta.width - cropW / 2), 0, meta.width - cropW);
  const top = clamp(Math.round(fy * meta.height - cropH / 2), 0, meta.height - cropH);

  // Sin agrandar: el ancho es el objetivo, o el del recorte si el original es más chico.
  const w = Math.min(targetW, cropW);
  const h = Math.round(w / RATIO);

  const buf = await sharp(upright)
    .extract({ left, top, width: cropW, height: cropH })
    .resize(w, h)
    .webp({ quality: 78, effort: 5 })
    .toBuffer({ resolveWithObject: true });

  const blur = await sharp(buf.data).resize(16).webp({ quality: 40 }).toBuffer();

  await writeFile(path.join(outDir, `${slug}.webp`), buf.data);

  const srcSize = (await stat(src)).size;
  before += srcSize;
  after += buf.data.length;

  // Debajo de ~700px de ancho el recorte ya no llena la card en pantallas 2x.
  const small = w < 700;
  console.log(
    `${order.padStart(2)} ${name.padEnd(26)} ${`${meta.width}x${meta.height}`.padEnd(10)} → ` +
      `${`${buf.info.width}x${buf.info.height}`.padEnd(10)} ${kb(srcSize).padStart(8)} → ${kb(buf.data.length).padStart(7)}` +
      (small ? "   ⚠ origen chico, se verá blando" : ""),
  );

  people.push({
    order: Number(order),
    slug,
    name,
    role,
    width: buf.info.width,
    height: buf.info.height,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  });
}

people.sort((a, b) => a.order - b.order);

const ts = `// Generado por scripts/process-team.mjs — no editar a mano.
export interface TeamPhoto {
  order: number;
  slug: string;
  name: string;
  role: string;
  width: number;
  height: number;
  blurDataURL: string;
}

export const teamPhotos: TeamPhoto[] = ${JSON.stringify(people, null, 2)};
`;
await writeFile(dataFile, ts);

console.log(`\n${people.length} fotos · ${kb(before)} → ${kb(after)}`);
console.log(`Subí el contenido de ${outDir} a Blob bajo "team/".`);
