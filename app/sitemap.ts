import type { MetadataRoute } from "next";
import { NAV } from "@/content/nav";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return NAV.routes.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
