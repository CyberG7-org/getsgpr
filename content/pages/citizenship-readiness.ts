import type { PageContent } from "@/content/types";

export const citizenshipReadiness: PageContent = {
  meta: {
    title: "Free Singapore Citizenship Readiness Checker — GetSGPR",
    description: "Answer 19 questions about your PR history, economic record, family ties and commitment to Singapore. Receive a preparation result and three practical next steps.",
    path: "/citizenship-readiness-review",
  },
  shapes: "service",
  blocks: [
    {
      kind: "hero", variant: "light",
      eyebrow: "Free citizenship diagnostic", eyebrowTone: "red",
      title: "Check how ready you are to prepare a Singapore citizenship application.",
      sub: "Answer 19 questions about your PR history, economic record, family ties and commitment to Singapore. Your result identifies preparation strengths, areas to review and three useful next steps.",
      small: "No documents · No NRIC, FIN or passport numbers · Ranges only · About 10 minutes",
      buttons: [
        { label: "Start the citizenship checker", href: "#form", style: "primary" },
      ],
      aside: { kind: "image", ratio: "4-3", label: "Singapore city and community scene, no client faces" },
    },
    { kind: "trust" },
    {
      kind: "items", columns: 2,
      title: "What the checker reviews.",
      sub: "The questions organise information that may affect eligibility, preparation or the evidence available for a citizenship application.",
      items: [
        { title: "Eligibility and background", text: "Your PR period, age band, qualifications, current citizenship position and matters that may need individual advice." },
        { title: "Economic record", text: "Employment or business circumstances, income range and the consistency of records such as CPF contributions." },
        { title: "Family and Singapore ties", text: "Your household, Singapore citizen family connections and any National Service considerations." },
        { title: "Commitment and timing", text: "Residence history, housing stability, community involvement, renunciation readiness and when you hope to apply." },
      ],
    },
    {
      kind: "sampleResult", tone: "alt", variant: "citizenship",
      title: "A preparation result, not an approval percentage.",
      sub: "You receive Ready to Prepare, Strengthen First or More Information Needed. The result explains which answers drove the preparation view and what to do next.",
    },
    {
      kind: "honest", tight: true,
      title: "How the citizenship checker should be used.",
      text: "This is a GetSGPR preparation diagnostic based on information you provide and the eligibility routes and assessment factors ICA publishes. ICA does not publish a points table for citizenship. The checker does not assign approval points to nationality, income, industry or property ownership, and it does not predict ICA's decision.",
    },
    {
      kind: "citizenshipReadinessForm", tone: "alt", id: "form",
      eyebrow: "The questionnaire",
      title: "Nineteen questions, four groups, about ten minutes.",
      sub: "Choose the closest answer. Your result assesses preparation readiness and flags questions that need a conversation.",
    },
    {
      kind: "source", tone: "alt", tight: true,
      primary: 'ICA, "Becoming a Singapore Citizen"',
    },
  ],
};
