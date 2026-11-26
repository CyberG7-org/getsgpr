import type { MetadataRoute } from "next";
import { NAV } from "@/content/nav";
import { SITE } from "@/content/site";
import { getGuides } from "@/lib/markdown";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set([
    ...NAV.routes,
    ...getGuides().map((guide) => `/guides/${guide.slug}`),
  ]);

  return [...paths].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
