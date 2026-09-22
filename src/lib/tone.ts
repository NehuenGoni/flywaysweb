import type { ExperienceIconName } from "@/components/brand/icons";

/** Media/hero tone keyed by experience icon, replacing the old per-LodgeCategory maps. */
export const toneByIcon: Record<ExperienceIconName, "teal" | "olive" | "bark" | "ink"> = {
  dove: "teal",
  bird: "teal",
  feather: "olive",
  fish: "ink",
  deer: "bark",
};

/** PageHero only supports a subset of tones; big game/beyond-the-hunt fall back to "olive". */
export function pageHeroTone(icon: ExperienceIconName): "teal" | "ink" | "olive" {
  const tone = toneByIcon[icon];
  return tone === "bark" ? "olive" : tone;
}
