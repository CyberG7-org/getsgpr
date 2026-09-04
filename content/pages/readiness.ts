import type { PageContent } from "@/content/types";

export const readiness: PageContent = {
  meta: {
    title: "Free Singapore PR Readiness Review | 8-Factor Diagnostic — GetSGPR",
    description: "Answer 15 questions about your profile, residence and evidence. You get one of three outcomes and three concrete next actions, written for your situation.",
    path: "/pr-readiness-review",
  },
  shapes: "service",
  blocks: [
    {
      kind: "hero", variant: "light",
      eyebrow: "Free diagnostic",
      title: "Find out how ready your Singapore PR application is — before you spend a cent on it.",
      sub: "Answer 15 questions about your profile, residence and evidence. You get one of three outcomes and three concrete next actions, written for your situation.",
      small: "No documents · No NRIC, FIN or passport numbers · Ranges only, such as salary band · About 10 minutes",
      buttons: [
        { label: "Start the review", href: "#form", style: "primary" },
      ],
      aside: { kind: "image", ratio: "4-3", label: "Illustration or photo: a consultant reviewing a printed checklist, no faces of clients" },
    },
    { kind: "trust" },
    {
      kind: "cards", columns: 2,
      title: "Which applies to you?",
      cards: [
        {
          badge: "Path 1",
          title: "First-time applicant",
          text: "You have never applied for Singapore PR, or your last application was withdrawn.",
          link: { label: "Readiness Review →", href: "#form" },
        },
        {
          badge: "Path 2",
          title: "Previously rejected",
          text: "ICA has rejected at least one PR application from you. Same eight factors, plus one question that matters most: what has materially changed since your previous application?",
          link: { label: "Rejection Diagnostic →", href: "#form" },
        },
      ],
    },
    {
      kind: "table", tone: "alt",
      title: "Eight factors. Seven come from ICA. One comes from us.",
      sub: "ICA says it assesses applications holistically, using factors such as family ties to Singaporeans, economic contribution, qualifications, age, family profile, length of residence, and the applicant's ability to integrate and commitment to sinking roots here. We ask about each of those. Then we add the factor that ICA cannot tell you about in advance: whether your evidence is complete, current and consistent.",
      columns: ["Factor", "What we look at", "Basis"],
      rows: [
        ["Family and Singapore ties", "Sponsor and household context, family connections here", "ICA expressly cites family ties"],
        ["Economic contribution", "Employment stability, trajectory, role, financial evidence", "ICA expressly cites economic contributions"],
        ["Qualifications and professional capital", "Education, recognised skills, licences, progression", "ICA expressly cites qualifications"],
        ["Career stage", "Age read together with career history", "ICA expressly lists age"],
        ["Residence continuity", "Length and stability of residence in Singapore", "ICA expressly lists length of residency"],
        ["Integration and roots", "Evidence of integration and long-term commitment", "ICA refers to ability to integrate and commitment to sinking roots"],
        ["Family profile and long-term plan", "Household coherence, dependants, settlement plan", "ICA expressly cites family profile"],
        ["Evidence quality and timing", "Completeness, date freshness, cross-document consistency, changes since any prior submission", "GetSGPR's operational readiness layer, not a claimed ICA criterion"],
      ],
    },
    {
      kind: "sampleResult",
      title: "A result you can act on, not a percentage.",
      sub: "Understand where you stand, see what is working in your favour, and leave with three practical next steps. Your review focuses on preparation, not a predicted approval percentage.",
    },
    {
      kind: "cards", tone: "alt", columns: 3,
      title: "Three outcomes, three different next steps.",
      cards: [
        {
          badge: "Outcome 1",
          title: "Ready to Prepare",
          text: "Your profile and evidence look ready to be assembled. We recommend a package and you can book a strategy call or buy Lite straight away.",
        },
        {
          badge: "Outcome 2",
          title: "Strengthen First",
          text: "One or more factors would benefit from work before you apply. You get a personalised action plan by email, and we check in as you complete it.",
        },
        {
          badge: "Outcome 3",
          title: "More Information Needed",
          text: "Your answers leave a question we cannot resolve without a conversation. We ask for a few non-sensitive clarifications, then offer a 20-minute call with a named consultant.",
        },
      ],
    },
    {
      kind: "honest", tight: true,
      title: "What this review is, and is not.",
      text: "This is a GetSGPR diagnostic built on the factors ICA publishes. It is not an ICA score, a quota model or a prediction of approval. ICA assesses every application holistically and on its own merits, and it may ask for information we have not covered. A Ready to Prepare result means your application is ready to be prepared well. It does not mean it will be approved.",
    },
    {
      kind: "readinessForm", tone: "alt", id: "form",
      eyebrow: "The questionnaire",
      title: "Fifteen questions, four groups, about ten minutes.",
      sub: "Use ranges where offered. Nothing here identifies you until you choose to leave your email at the end.",
    },
    {
      kind: "source", tone: "alt", tight: true,
      primary: 'ICA, "Becoming a Permanent Resident" and the PR document checklist',
    },
  ],
};
