import type { PageContent } from "@/content/types";

export const appeal: PageContent = {
  meta: {
    title: "Singapore PR Rejected? Appeal or Reapply, Decided on Evidence — GetSGPR",
    description: "A rejection is not a verdict on you. It is a decision on one application, at one time, with one set of evidence. The question now is what has materially",
    path: "/pr-appeal",
  },
  shapes: "service",
  blocks: [
    {
      kind: "hero", variant: "light",
      eyebrow: "PR Rejection Appeal", eyebrowTone: "red",
      title: "PR rejected? Decide whether to appeal or reapply — on evidence.",
      sub: "A rejection is not a verdict on you. It is a decision on one application, at one time, with one set of evidence. The question now is what has materially changed, and what to do about it.",
      small: "Appeals are lodged through ICA's e-Service and assessed by ICA on their own merits. There is no special channel for consultants. We never guarantee an outcome.",
      buttons: [
        { label: "Start the Rejection Diagnostic", href: "/pr-readiness-review", style: "primary" },
      ],
      aside: { kind: "image", ratio: "4-3", label: "Photo relevant to this segment, no client faces without consent" },
    },
    { kind: "trust" },
    {
      kind: "items", columns: 2,
      title: "What usually happens after a rejection, and why it fails.",
      items: [
        { title: "Appealing immediately with the same evidence", text: "An appeal that adds nothing new asks ICA to change its mind for no reason." },
        { title: "Reapplying on a date, not a change", text: "Waiting the customary period and resubmitting the same profile." },
        { title: "Guessing the reason", text: "ICA does not give reasons. Building a strategy around a guess wastes the next attempt." },
        { title: "Paying for false hope", text: "Consultancies that promise to \"overturn\" a rejection. Singapore's consumer regulator has taken action against exactly this." },
      ],
    },
    {
      kind: "prose", tone: "alt",
      title: "What ICA says about appeals.",
      content: [
        { p: "ICA states that unsuccessful applicants may appeal through its e-Service, and that appeals are assessed on their own merits. ICA does not publish reasons for rejection and does not endorse or work with commercial consultants. Applicants may also submit a fresh application later." },
        { small: "Source: ICA, \"Appeal for Singapore Citizenship / Permanent Residence\" and \"Becoming a Permanent Resident\". Checked [[date]]." },
      ],
      source: 'ICA, "Appeal for Singapore Citizenship / Permanent Residence"',
    },
    {
      kind: "cards", columns: 3,
      title: "One extra question, and it decides everything.",
      sub: "The Rejection Diagnostic runs the same eight factors as the Readiness Review, then asks: what has materially changed since your previous application? A new role, a pay change, a marriage, a child, a qualification, longer residence, or evidence you did not have before. If the answer is \"something substantial\", an appeal or an early reapplication may be worth it. If the answer is \"not much\", the honest advice is to strengthen first, and we will say so.",
      cards: [
        { title: "Ready to Prepare", text: "Appeal or reapply now." },
        { title: "Strengthen First", text: "Build the change, then reapply." },
        { title: "More Information Needed", text: "Talk to us." },
      ],
      foot: { button: { label: "Start the Rejection Diagnostic", href: "/pr-readiness-review", style: "primary" } },
    },
    {
      kind: "items", tone: "alt", columns: 2,
      title: "What we do after a rejection.",
      items: [
        { title: "Rejection strategy session", text: "A structured review of the previous application, your profile now and the change between them." },
        { title: "Appeal or reapply recommendation", text: "In writing, with reasons, including \"wait\" if that is the right answer." },
        { title: "\"What has changed\" narrative", text: "If you proceed, an appeal letter or a fresh cover letter built around the material change, with the evidence to prove it." },
        { title: "Evidence refresh", text: "Every document re-dated, re-checked and reconciled." },
        { title: "Submission assistance", text: "Through ICA's e-Service, step by step." },
      ],
      foot: {
        text: "Concierge includes the rejection strategy session and one appeal or reapplication assessment [[and drafting — confirm]]. Partnered clients can add the assessment for S$[[x]]. A stand-alone Rejection Strategy Session is S$[[x]]. [[Confirm.]]",
        button: { label: "See the appeal policy on the pricing page", href: "/packages", style: "ghost" },
      },
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
            meta: "[[Previously rejected applicant · pass type · sector · years in Singapore]]",
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
        { q: "Should I appeal or reapply?", a: "It depends on whether something material has changed and how quickly. An appeal makes sense when you have new, substantial evidence to put in front of ICA soon. A reapplication makes sense when the change needs time to build. The diagnostic and the strategy session answer this for your case." },
        { q: "Can you find out why I was rejected?", a: "No. ICA does not give reasons and has no channel for consultants to ask. Anyone who claims otherwise is misleading you." },
        { q: "How long should I wait before reapplying?", a: "ICA does not publish a required waiting period. What matters is the change in your profile and evidence, not the calendar. [[Confirm current ICA guidance.]]" },
        { q: "Will an appeal hurt a later application?", a: "There is no published evidence that it does. A weak appeal is a wasted effort rather than a penalty, but it is still wasted." },
        { q: "I used another consultant last time. Can you still help?", a: "Yes. We will need the previous application if you have it, so we can see exactly what ICA saw." },
      ],
    },
    {
      kind: "source", tight: true,
      primary: 'ICA, "Appeal for Singapore Citizenship / Permanent Residence"',
    },
    {
      kind: "cta",
      title: "Find out what has really changed.",
      buttons: [
        { label: "Start the Rejection Diagnostic", href: "/pr-readiness-review", style: "light" },
        { label: "Book a rejection strategy session", href: "/contact", style: "outline-dark" },
      ],
    },
  ],
};
