import { experiences } from "@/content/experiences";
import { lodgesForExperience } from "@/content/index";
import { hasPrograms } from "@/content/types";
import type { ExperienceIconName } from "@/components/brand/icons";

export const siteConfig = {
  name: "FlyWays Argentina",
  shortName: "FlyWays",
  description:
    "Premium dove hunting in Córdoba, Argentina. Orvis Endorsed and Beretta Trident certified, with twenty years of owner-run operation across dove, mixed bag, fly fishing and big game.",
  // Used by metadataBase / sitemap. Update to the production domain at launch.
  url: "https://www.flyways.com",
  contact: {
    phone: "+1.786.207.2871",
    phoneHref: "tel:+17862072871",
    // TODO(client): confirm the public contact email.
    email: "info@flyways.com",
    emailHref: "mailto:info@flyways.com",
    // WhatsApp is intentionally NOT a primary CTA (low US penetration);
    // surfaced in the footer for clients already in Argentina / EU / LatAm.
    whatsapp: "+54 9 351 590 1741",
    whatsappHref: "https://wa.me/5493515901741",
  },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "Vimeo", href: "https://vimeo.com/" },
  ],
} as const;

/** A lodge nested under an experience in the "Experiences" submenu. */
export type NavGrandchild = {
  label: string;
  href: string;
  /** Short qualifier shown under the label, e.g. a lodge's location. */
  sublabel?: string;
};

export type NavChild = {
  label: string;
  href: string;
  /** Only set for experience children — used to render the marker icon. */
  icon?: ExperienceIconName;
  sublabel?: string;
  /** The lodges that belong to this experience, if any. */
  children?: NavGrandchild[];
};

export type NavItem = { label: string; href: string; children?: NavChild[] };

/** The nested entries for an experience's submenu — its lodges, or its programs. */
function navGrandchildrenFor(experience: (typeof experiences)[number]): NavGrandchild[] {
  if (hasPrograms(experience)) {
    return experience.offering.programs.map((p) => ({
      label: p.name,
      href: `/experiences/${experience.slug}#${p.slug}`,
      sublabel: p.location,
    }));
  }
  return lodgesForExperience(experience).map((l) => ({
    label: l.name,
    href: `/lodges/${l.slug}`,
    sublabel: l.location,
  }));
}

// Experiences first (each with its lodges/programs nested underneath), then
// brand and planning. "The Lodges" is no longer a top-level nav item —
// /lodges and /lodges/[slug] still exist (redirects and old links point at
// them), they're just reached via /experiences/[slug] now.
export const mainNav: NavItem[] = [
  {
    label: "Experiences",
    href: "/experiences",
    children: experiences.map((e) => ({
      label: e.navLabel,
      href: `/experiences/${e.slug}`,
      icon: e.icon,
      children: navGrandchildrenFor(e),
    })),
  },
  { label: "Plan your trip", href: "/plan-your-trip" },
  {
    label: "Gallery",
    href: "/gallery/photo",
    children: [
      { label: "Photo Gallery", href: "/gallery/photo" },
      { label: "Video Gallery", href: "/gallery/video" },
    ],
  },
  { label: "The Flyways Standard", href: "/why-flyways" },
];
