import type { PageContent } from "@/content/types";
import { SITE } from "@/content/site";

export const prFirstTime: PageContent = {
  meta: {
    title: "First-Time Singapore PR Application | Timing, Evidence, Narrative — GetSGPR",
    description: "You only get one first application. Make it the one where the timing is right, the evidence is current and the story is clear.",
    path: "/permanent-resident-sg/first-time-application",
  },
  shapes: "service",
  blocks: [
    {
      kind: "crumbs",
      items: [
        { label: "Home", href: "/" },
        { label: "Permanent Residence", href: "/permanent-resident-sg" },
        { label: "First-Time Application" },
      ],
    },
    {
      kind: "hero", variant: "light",
      eyebrow: "Permanent Resident · First-time applicants",
      title: "Your first Singapore PR application, prepared properly.",
      sub: "You only get one first application. Make it the one where the timing is right, the evidence is current and the story is clear.",
      small: SITE.independenceLine,
      buttons: [
        { label: "Get My Free PR Readiness Report", href: "/pr-readiness-review", style: "primary" },
      ],
      aside: { kind: "image", ratio: "4-3", label: "Photo relevant to this segment, no client faces without consent" },
    },
    { kind: "trust" },
    {
      kind: "items", columns: 2,
      title: "The three questions first-time applicants rarely ask.",
      items: [
        { title: "Is now the right time?", text: "Most people apply when a colleague is approved or a pass renewal is near. Neither is a reason. The right time is when your strongest factors are in place and your evidence is fresh." },
        { title: "Is my evidence current?", text: "ICA's checklist asks for a recent employment letter and six months of payslips. An employment letter from last year, or payslips that stop three months ago, are the most common avoidable weaknesses." },
        { title: "Does it tell one story?", text: "Your forms, cover letter, CV and supporting documents are read together. If the dates and titles disagree, the story is that you are careless, whatever the rest says." },
      ],
    },
    {
      kind: "prose", tone: "alt",
      title: "What ICA says it considers.",
      content: [
        { p: "ICA assesses applications holistically, citing family ties to Singaporeans, economic contributions, qualifications, age, family profile, length of residence, and the applicant's ability to contribute and integrate and commitment to sinking roots here. For a first application, length of residence and economic contribution are usually the factors with the most evidence behind them, and integration is usually the factor with the least." },
        { small: "Source: ICA, \"Becoming a Permanent Resident\". Checked [[date]]." },
      ],
      source: 'ICA, "Becoming a Permanent Resident" and the PR document checklist',
    },
    {
      kind: "cards", columns: 3,
      title: "The three factors that decide most first applications.",
      cards: [
        { title: "Residence continuity", text: "How long you have been here, and whether the record is unbroken." },
        { title: "Economic contribution", text: "Stability and trajectory in your employment, not just the salary number." },
        { title: "Evidence quality and timing", text: "Whether what you can show today is complete, current and consistent." },
      ],
      foot: { button: { label: "Start the free review", href: "/pr-readiness-review", style: "primary" } },
    },
    {
      kind: "items", tone: "alt", columns: 2,
      title: "What we do for first-time applicants.",
      items: [
        { title: "Lite, S$197", text: "The checklist, the organiser, the templates and the consistency check, so you can do it yourself without guessing." },
        { title: "Partnered, S$497", text: "A written readiness report, a 60-minute strategy call on timing and evidence, and two rounds of review on your forms and cover letter." },
        { title: "Concierge, S$1,997", text: "A named case manager, the evidence matrix, forms and narrative written by us, a final consistency audit and submission assistance." },
      ],
      foot: { button: { label: "Compare packages", href: "/packages", style: "ghost" } },
    },
    {
      kind: "cards", columns: 3, maxWidth: 380,
      eyebrow: "Client case",
      title: "A case like yours.",
      cards: [
        {
          title: "", badge: "[[Verified outcome]]",
          outcome: {
            imageLabel: "Redacted ICA outcome document",
            meta: "[[First-time applicant · age band · sector · years in Singapore]]",
            challenge: "[[One sentence.]]",
            did: "[[One sentence.]]",
            result: "[[Verified outcome and month/year.]]",
            href: "/case-studies/sample-reapplication",
          },
        },
      ],
      foot: { text: "ICA assesses every application on its own merits. This case does not predict your outcome." },
    },
    {
      kind: "faq", tone: "alt",
      title: "Questions.",
      openFirst: true,
      items: [
        { q: "How long should I have lived in Singapore before applying?", a: "ICA does not publish a minimum, and it assesses length of residence alongside everything else. In practice, applicants with a longer and unbroken record have more to show. The Readiness Review will tell you whether residence is a strength or a weakness for you." },
        { q: "Should I wait for my promotion or pay rise?", a: "Usually yes, if it is confirmed and close. A stronger economic-contribution record is worth a few months." },
        { q: "Do I need a cover letter?", a: "ICA does not require one, but the application form gives you little room to explain yourself. A short, factual cover letter is where your narrative lives." },
        { q: "What if a document is missing?", a: "Where a record genuinely cannot be obtained, we draft a declaration letter explaining its absence at no extra charge." },
      ],
    },
    {
      kind: "source", tight: true,
      primary: 'ICA, "Becoming a Permanent Resident" and the PR document checklist',
    },
    {
      kind: "cta",
      title: "Start with the right question.",
      sub: "Is now the right time? Ten minutes will tell you.",
      buttons: [
        { label: "Get My Free PR Readiness Report", href: "/pr-readiness-review", style: "light" },
      ],
    },
  ],
};
