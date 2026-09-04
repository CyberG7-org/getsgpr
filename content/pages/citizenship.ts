import type { PageContent } from "@/content/types";

export const citizenship: PageContent = {
  meta: {
    title: "Singapore Citizenship Application Support for PR Holders — GetSGPR",
    description: "Citizenship asks a different question from PR. Not whether you could contribute here, but whether you already belong here. We help you answer it with evidence.",
    path: "/singapore-citizen",
  },
  shapes: "service",
  blocks: [
    {
      kind: "hero", variant: "light",
      eyebrow: "Singapore Citizenship", eyebrowTone: "red",
      title: "From PR to citizen: an application that shows your roots.",
      sub: "Citizenship asks a different question from PR. Not whether you could contribute here, but whether you already belong here. We help you answer it with evidence.",
      small: "Independent consultancy. ICA makes all decisions. No approval guarantees.",
      buttons: [
        { label: "Book a citizenship consultation", href: "/contact", style: "primary" },
      ],
      aside: { kind: "image", ratio: "4-3", label: "Photo relevant to this segment, no client faces without consent" },
    },
    { kind: "trust" },
    {
      kind: "items", columns: 2,
      title: "Where citizenship applications go wrong.",
      items: [
        { title: "Treating it as PR again", text: "Re-submitting the PR evidence with newer dates, when the question has changed." },
        { title: "Integration asserted, not shown", text: "\"I love Singapore\" in the cover letter, with nothing in the documents to back it." },
        { title: "Household out of step", text: "One spouse ready to convert, the other not, and no explanation of the plan." },
        { title: "Timing by impatience", text: "Applying the month you become eligible rather than when the record is strongest." },
      ],
    },
    {
      kind: "prose", tone: "alt",
      title: "What ICA says it considers.",
      content: [
        { p: "ICA currently lists five eligibility routes: PRs aged 21 or above who have held PR for at least two years; PRs who have held PR for at least two years and have been married to a Singapore citizen for at least two years; eligible unmarried children below 21 of Singapore citizens; PR students who meet ICA's residence and education conditions; and PR aged parents of Singapore citizens aged 21 or above. Meeting an eligibility route does not guarantee approval. ICA assesses family ties, economic contributions, qualifications, age, family profile, length of residency, ability to integrate and commitment to sinking roots." },
        { small: "Source: ICA, \"Becoming a Singapore Citizen\". Checked [[date]]." },
      ],
      source: 'ICA, "Becoming a Singapore Citizen"',
    },
    {
      kind: "cards", columns: 4,
      title: "The factors that carry citizenship applications.",
      sub: "Citizenship applications use the same consultation and evidence process as PR. The free Readiness Review is designed for PR; for citizenship, start with a consultation.",
      cards: [
        { title: "Family ties and profile", text: "Your family ties to Singaporeans and your wider family circumstances." },
        { title: "Economic contribution and qualifications", text: "Your economic contributions, qualifications and ability to contribute to Singapore." },
        { title: "Age and length of residency", text: "Your age and the length of time you have resided in Singapore." },
        { title: "Integration and roots", text: "Your ability to integrate into society and your commitment to sinking roots in Singapore." },
      ],
    },
    {
      kind: "items", tone: "alt", columns: 2,
      title: "What we do for citizenship applicants.",
      items: [
        { title: "Eligibility and timing check", text: "Which category you fall under, when you become eligible, and whether now is the strongest time." },
        { title: "Integration evidence map", text: "What you can show, gathered and organised." },
        { title: "Household plan", text: "For families, a clear account of who is applying, who is not yet, and why." },
        { title: "Narrative", text: "A cover letter about belonging, written from the evidence." },
        { title: "Obligations briefing", text: "Renunciation and National Service consequences explained before you commit, so nothing surprises you later." },
      ],
      foot: {
        button: { label: "See pricing", href: "/packages", style: "ghost" },
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
            meta: "[[PR holder since year · sector · family status]]",
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
        { q: "How long after PR can I apply?", a: "ICA publishes the qualifying periods for each category on ica.gov.sg. Eligibility is the start, not the end. The stronger question is whether your record since PR shows the roots the application is asking about." },
        { q: "Do I have to give up my other citizenship?", a: "Singapore does not permit dual citizenship for adults. You will be required to renounce other citizenships if approved. We explain what this means for you before you apply." },
        { q: "What about National Service?", a: "Male applicants and male children may become liable for National Service on becoming citizens or second-generation PRs. MINDEF and ICA publish the rules. We brief you on them; we do not advise you around them." },
        { q: "Can we apply as a family?", a: "Yes, and the household plan is a central part of the application. See our family guidance." },
      ],
    },
    {
      kind: "source", tight: true,
      primary: 'ICA, "Becoming a Singapore Citizen"',
    },
    {
      kind: "cta",
      title: "Show that you belong here.",
      buttons: [
        { label: "Book a citizenship consultation", href: "/contact", style: "light" },
      ],
    },
  ],
};
