import type { Metadata } from "next";
import type { PageMeta } from "@/content/types";

export function pageMetadata(meta: PageMeta): Metadata {
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.path },
    openGraph: { title: meta.title, description: meta.description, url: meta.path, siteName: "GetSGPR", locale: "en_SG", type: "website" },
  };
}
