import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { publishedExperienceSlugs, publishedLodgeSlugs } from "@/content/index";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  // Shells with no client copy yet (Gallery, Our Team, Articles, Blog,
  // Newsletter, the Plan Your Trip sub-pages) are intentionally left out —
  // they're noindex until content arrives. See generateMetadata/metadata on
  // each of those routes.
  const staticRoutes = [
    "",
    "/experiences",
    "/lodges",
    "/why-flyways",
    "/plan-your-trip",
    "/rates",
    "/schedule-a-call",
    "/why-flyways/newsletter",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const routes: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  for (const slug of publishedExperienceSlugs) {
    routes.push({
      url: `${base}/experiences/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  for (const slug of publishedLodgeSlugs) {
    routes.push({
      url: `${base}/lodges/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return routes;
}
