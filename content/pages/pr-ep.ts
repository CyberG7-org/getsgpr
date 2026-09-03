import type { PageContent } from "@/content/types";
import { SITE } from "@/content/site";

export const prEp: PageContent = {
  meta: {
    title: "Singapore PR for Employment Pass & S Pass Holders — GetSGPR",
    description: "Your employment record is the centre of your application. We make sure it reads as stability and trajectory, with the evidence to match.",
    path: "/permanent-resident-sg/ep-s-pass-holders",
  },
  shapes: "service",
  blocks: [
    {
      kind: "crumbs",
      items: [
        { label: "Home", href: "/" },
        { label: "Permanent Residence", href: "/permanent-resident-sg" },
        { label: "EP & S Pass Holders" },
      ],
    },
    {
      kind: "hero", variant: "light",
      eyebrow: "Permanent Resident · Employment Pass and S Pass holders",
      title: "PR for Employment Pass and S Pass holders.",
      sub: "Your employment record is the centre of your application. We make sure it reads as stability and trajectory, with the evidence to match.",
      small: SITE.independenceLine,
      buttons: [
        { label: "Assess my profile", href: "/pr-readiness-review", style: "primary" },
      ],
      aside: { kind: "image", ratio: "4-3", label: "Photo relevant to this segment, no client faces without consent" },
    },
    { kind: "trust" },
    {
      kind: "items", columns: 2,
      title: "Where work-pass applications go wrong.",
      items: [
        { title: "Employment letters that are out of date", text: "ICA's checklist asks for a recent letter. One from six months ago, or one that omits salary and start date, weakens the record." },
        { title: "Payslips that do not match CPF or the letter", text: "Bonuses, allowances and title changes create differences that are innocent but unexplained." },
        { title: "Job hopping without a story", text: "Three employers in four years can read as progression or as instability. The cover letter decides which." },
        { title: "Applying right before a renewal", text: "Timing an application around a pass renewal, rather than around your strongest evidence." },
      ],
    },
    {
      kind: "prose", tone: "alt",
      title: "What ICA says it considers.",
      content: [
        { p: "ICA cites economic contributions, qualifications and age among the factors it assesses, together with length of residence, family ties and profile, and integration. Its checklist asks employed applicants for a recent employment letter and six months of payslips, and for education and professional qualification records." },
        { small: "Source: ICA, \"Becoming a Permanent Resident\" and the PR document checklist. Checked [[date]]." },
      ],
      source: 'ICA, "Becoming a Permanent Resident" and the PR document checklist',
    },
    {
      kind: "cards", columns: 4,
      title: "The factors that carry pass-holder applications.",
      cards: [
        { title: "Economic contribution", text: "Stability, progression and role, evidenced by letters, payslips and CPF where applicable." },
        { title: "Career stage", text: "Your age read together with your career history, not on its own." },
        { title: "Qualifications and professional capital", text: "Degrees, licences and professional memberships, and whether they are recognised." },
        { title: "Evidence quality and timing", text: "Whether the employment record you can show today is complete and internally consistent." },
      ],
      foot: { button: { label: "Start the free review", href: "/pr-readiness-review", style: "primary" } },
    },
    {
      kind: "items", tone: "alt", columns: 2,
      title: "What we do for pass holders.",
      items: [
        { title: "Employment evidence review", text: "We check the letter, payslips and CPF against each other and tell you what to request from HR." },
        { title: "Career narrative", text: "A cover letter that explains your progression and why Singapore is where it continues." },
        { title: "Qualification mapping", text: "Which certificates and memberships to include, and which add nothing." },
        { title: "Timing advice", text: "Whether to apply now, or after a confirmed promotion, pay change or qualification." },
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
            meta: "[[S Pass or EP holder · age band · sector · years in Singapore]]",
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
        { q: "Does my salary need to be above a certain level?", a: "ICA does not publish a threshold. It assesses economic contribution alongside everything else. Stability and trajectory matter as much as the number." },
        { q: "I changed jobs recently. Should I wait?", a: "Often yes, until you have six months of payslips and a current employment letter from the new employer. The Readiness Review will tell you whether your record is ready." },
        { q: "Does an S Pass have a lower chance than an EP?", a: "ICA does not publish approval rates by pass type, and we will not guess. What we can do is make sure an S Pass holder's record shows stability, progression and integration as clearly as possible." },
        { q: "What should my employment letter say?", a: "Your role, start date, salary, employment status and, ideally, a line on your contribution. We give you a template to send to HR." },
      ],
    },
    {
      kind: "source", tight: true,
      primary: 'ICA, "Becoming a Permanent Resident" and the PR document checklist',
    },
    {
      kind: "cta",
      title: "Find out whether your employment record is ready.",
      buttons: [
        { label: "Get My Free PR Readiness Report", href: "/pr-readiness-review", style: "light" },
      ],
    },
  ],
};
