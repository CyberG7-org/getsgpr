import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { getGuides } from "@/lib/markdown";
import { guidesMeta, guidesBefore } from "@/content/pages/guides";
import type { Block, Card } from "@/content/types";

export const metadata = pageMetadata(guidesMeta);

export default function GuidesPage() {
  const guides = getGuides();

  const startHereCards: Card[] = guides.map((g) => ({
    badge: g.category,
    title: g.title,
    text: g.summary,
    image: g.image && g.imageAlt ? { src: g.image, alt: g.imageAlt } : undefined,
    link: { label: "Read →", href: `/guides/${g.slug}` },
  }));

  const blocks: Block[] = [
    ...guidesBefore,
    { kind: "cards", title: "Practical guides.", sub: "Start with ICA's published rules, then use the practical checks to prepare your next step.", columns: 2, cards: startHereCards },
  ];

  return <Page content={{ meta: guidesMeta, shapes: "plain", blocks }} />;
}
