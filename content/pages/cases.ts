import type { Block, PageMeta } from "@/content/types";

export const casesMeta: PageMeta = {
  title: "Singapore PR Client Cases with Verified Outcomes — GetSGPR",
  description: "Every case here is a real GetSGPR client who agreed in writing to share it. Where an outcome document is shown, it is ICA's, redacted to protect the client.",
  path: "/case-studies",
};

export const CASE_FILTER_CHIPS = [
  "All",
  "First-time applicants",
  "Previously rejected",
  "Family applications",
  "Founders and self-employed",
  "Citizenship",
  "LTVP",
];

// Blocks before the filters + cards grid, which app/case-studies/page.tsx builds at
// render time from getCaseStudies() (see the task brief).
export const casesBefore: Block[] = [
  {
    kind: "hero", variant: "plain",
    eyebrow: "Client cases",
    title: "Real applicants. Real journeys. Verifiable outcomes.",
    sub: "Every case here is a real GetSGPR client who agreed in writing to share it. Where an outcome document is shown, it is ICA's, redacted to protect the client. Where we could not verify something, it is not here.",
    small: "ICA assesses every application on its own merits. No case on this page predicts your outcome.",
  },
  { kind: "trust" },
];

// Blocks after the filters + cards grid.
export const casesAfter: Block[] = [
  {
    kind: "text", tone: "alt", tight: true,
    title: "Our first cases are being prepared.",
    sub: "Empty state, shown until cases are published. We publish a case only when the client has consented in writing and we can show the outcome document. The first cases will appear here in [[month]]. In the meantime, our Google reviews are public and unedited.",
    buttons: [{ label: "Read reviews on Google", href: "#", style: "ghost" }],
  },
  {
    kind: "cta",
    title: "Is your situation similar?",
    sub: "Start the free Readiness Review.",
    buttons: [{ label: "Get My Free PR Readiness Report", href: "/pr-readiness-review", style: "light" }],
  },
];
