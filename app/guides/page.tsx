import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { getGuides } from "@/lib/markdown";
import { guidesMeta, guidesBefore, GUIDES_FILTER_CHIPS } from "@/content/pages/guides";
import type { Block, Card } from "@/content/types";

export const metadata = pageMetadata(guidesMeta);

export default function GuidesPage() {
  const guides = getGuides();

  // "Start here." — the site's four guides, in the columns-4 card layout guides.html
  // uses for its curated picks (author/reviewer/date meta line kept as placeholders,
  // since Guide carries no author/date fields).
  const startHereCards: Card[] = guides.map((g) => ({
    badge: g.category,
    title: g.title,
    text: "[[Author]] · Last reviewed [[date]] · [[x]] min read",
    link: { label: "Read →", href: `/guides/${g.slug}` },
  }));

  // "All guides." — the same guides, built from getGuides() at render time, in the
  // columns-3 layout with each card's summary in place of the meta line. With only
  // four real guides on the site this list is identical to "Start here." above; see
  // tests/e2e/parity-allowlist.ts (key "guides") for why this differs from the
  // prototype's nine mocked "All guides" cards.
  const allGuideCards: Card[] = guides.map((g) => ({
    badge: g.category,
    title: g.title,
    text: g.summary,
    link: { label: "Read →", href: `/guides/${g.slug}` },
  }));

  const blocks: Block[] = [
    ...guidesBefore,
    { kind: "cards", title: "Start here.", columns: 4, cards: startHereCards },
    { kind: "filters", tone: "alt", chips: GUIDES_FILTER_CHIPS },
    { kind: "cards", tone: "alt", title: "All guides.", columns: 3, cards: allGuideCards },
  ];

  return <Page content={{ meta: guidesMeta, shapes: "plain", blocks }} />;
}
