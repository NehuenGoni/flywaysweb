import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { experienceSlugs } from "@/content/experiences";
import { lodgeSlugs } from "@/content/lodges";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/experiences",
    "/lodges",
    "/why-flyways",
    "/plan-your-trip",
    "/contact",
  ];

  const routes: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  for (const slug of experienceSlugs) {
    routes.push({
      url: `${base}/experiences/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  for (const slug of lodgeSlugs) {
    routes.push({
      url: `${base}/lodges/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return routes;
}
