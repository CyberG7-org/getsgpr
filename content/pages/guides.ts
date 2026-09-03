import type { Block, PageMeta } from "@/content/types";

export const guidesMeta: PageMeta = {
  title: "Singapore PR Guides, Checked Against ICA | GetSGPR Knowledge Centre",
  description: "Guides written by our team and checked against ICA's published information. Each one names who wrote it, who reviewed it and when.",
  path: "/guides",
};

export const GUIDES_FILTER_CHIPS = [
  "All",
  "Eligibility and assessment",
  "Documents",
  "Timing and fees",
  "Family",
  "After a decision",
  "Reference",
];

// Blocks before the "Start here." and "All guides." cards grids, which app/guides/page.tsx
// builds at render time from getGuides() (see the task brief — same pattern as
// content/pages/cases.ts's casesBefore/casesAfter for app/case-studies/page.tsx).
export const guidesBefore: Block[] = [
  {
    kind: "hero", variant: "plain",
    eyebrow: "Knowledge Centre",
    title: "Decide with ICA-sourced information.",
    sub: "Guides written by our team and checked against ICA's published information. Each one names who wrote it, who reviewed it and when. Where ICA's page is the answer, we link to it rather than copy it.",
  },
  { kind: "trust" },
];
