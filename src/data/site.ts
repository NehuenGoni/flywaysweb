export const siteConfig = {
  name: "FlyWays Argentina",
  shortName: "FlyWays",
  description:
    "Premium dove hunting in Córdoba, Argentina. Orvis Endorsed and Beretta Trident certified, with twenty years of owner-run operation across dove, mixed bag, fly fishing and big game.",
  // Used by metadataBase / sitemap. Update to the production domain at launch.
  url: "https://www.flyways.com",
  // TODO(client): confirm the real Calendly (or scheduling) URL for "Book a call".
  bookingUrl: "https://calendly.com/flyways/book-a-call",
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

export type NavItem = { label: string; href: string };

// Experiences first, then the lodges, then brand and planning.
export const mainNav: NavItem[] = [
  { label: "Experiences", href: "/experiences" },
  { label: "The Lodges", href: "/lodges" },
  { label: "Why Flyways", href: "/why-flyways" },
  { label: "Plan your trip", href: "/plan-your-trip" },
];
