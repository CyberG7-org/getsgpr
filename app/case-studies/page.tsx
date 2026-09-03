import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { getCaseStudies } from "@/lib/markdown";
import { casesMeta, casesBefore, casesAfter, CASE_FILTER_CHIPS } from "@/content/pages/cases";
import type { Block, Card } from "@/content/types";

export const metadata = pageMetadata(casesMeta);

export default function CaseStudiesPage() {
  const cards: Card[] = getCaseStudies().map((cs) => ({
    title: "",
    badge: cs.outcome,
    outcome: {
      imageLabel: cs.imageLabel,
      meta: cs.profile,
      challenge: "[[One-line challenge]]",
      did: "[[One sentence.]]",
      result: "[[Month, year]]",
      href: `/case-studies/${cs.slug}`,
    },
  }));

  const blocks: Block[] = [
    ...casesBefore,
    { kind: "filters", chips: CASE_FILTER_CHIPS, tight: true },
    { kind: "cards", columns: 3, cards, tight: true },
    ...casesAfter,
  ];

  return <Page content={{ meta: casesMeta, shapes: "plain", blocks }} />;
}
