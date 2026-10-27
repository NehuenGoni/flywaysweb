import { teamPhotos, type TeamPhoto } from "./team-data.generated";

/**
 * Fotos del equipo. Viven en Vercel Blob bajo `team/<slug>.webp`; se generan
 * con `node scripts/process-team.mjs "<carpeta>"` (recorte 4:5 + webp +
 * blurDataURL) y el nombre y cargo salen del nombre del archivo original.
 */
export const TEAM_BASE = "https://pm7wtjb3rusbf6oi.public.blob.vercel-storage.com/team";

export interface TeamMember extends TeamPhoto {
  src: string;
}

export interface TeamGroup {
  id: string;
  title: string;
  members: TeamMember[];
}

/** El grupo se decide por cargo, no por persona: una incorporación nueva cae sola donde corresponde. */
const groupRules: { id: string; title: string; role: RegExp }[] = [
  { id: "office", title: "Sales, operations & finance", role: /sales|operations|logistics|accounting|finance/i },
  { id: "lodges", title: "At the lodges", role: /host|chef|cook|housekeeper/i },
  { id: "field", title: "In the field", role: /guide|groundkeeper/i },
];

const members: TeamMember[] = teamPhotos.map((p) => ({ ...p, src: `${TEAM_BASE}/${p.slug}.webp` }));

export const owners = members.filter((m) => /^owner\b/i.test(m.role));

export const teamGroups: TeamGroup[] = groupRules
  .map(({ id, title, role }) => ({
    id,
    title,
    members: members.filter((m) => !owners.includes(m) && role.test(m.role)),
  }))
  .filter((g) => g.members.length > 0);

if (process.env.NODE_ENV !== "production") {
  const lost = members.filter((m) => !owners.includes(m) && !teamGroups.some((g) => g.members.includes(m)));
  if (lost.length > 0) {
    console.warn(`[team] cargo sin grupo: ${lost.map((m) => `${m.name} (${m.role})`).join(", ")}`);
  }
}
