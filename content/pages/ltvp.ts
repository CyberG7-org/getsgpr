import type { PageContent } from "@/content/types";

export const ltvp: PageContent = {
  meta: {
    title: "Singapore LTVP Application Support for Family of Citizens & PRs — GetSGPR",
    description: "An LTVP application is really two people's evidence: the sponsor's and the applicant's. We prepare both so the relationship and the means of support are clear",
    path: "/ltvp",
  },
  shapes: "service",
  blocks: [
    {
      kind: "hero", variant: "light",
      eyebrow: "Long Term Visit Pass", eyebrowTone: "teal",
      title: "Long Term Visit Pass for family of Singaporeans and PRs.",
      sub: "An LTVP application is really two people's evidence: the sponsor's and the applicant's. We prepare both so the relationship and the means of support are clear and consistent.",
      small: "Independent consultancy. ICA makes all decisions. No approval guarantees.",
      buttons: [
        { label: "Book an LTVP consultation", href: "/book-a-call", style: "primary" },
      ],
      aside: { kind: "image", ratio: "4-3", label: "Photo relevant to this segment, no client faces without consent" },
    },
    { kind: "trust" },
    {
      kind: "items", columns: 2,
      title: "Where LTVP applications go wrong.",
      items: [
        { title: "The sponsor is under-evidenced", text: "Applicants focus on their own documents and give the sponsor's income and residence a single page." },
        { title: "Relationship evidence is thin", text: "A marriage certificate alone, with nothing to show the relationship as lived." },
        { title: "Documents from abroad are late, expired or untranslated", text: "Birth certificates, marriage records and police clearances that arrive after the deadline or in the wrong form." },
        { title: "Renewal treated as automatic", text: "Changes in the sponsor's circumstances that were never reported." },
      ],
    },
    {
      kind: "prose", tone: "alt",
      title: "What ICA says.",
      content: [
        { p: "ICA currently lists seven Long-Term Visit Pass eligibility categories: spouses of Singapore citizens; spouses of Singapore PRs; eligible unmarried children below 21 of Singapore citizens or PRs; parents of Singapore citizens or PRs; graduates from Singapore institutes of higher learning seeking employment; one parent or grandparent of a child studying in Singapore on a Student's Pass; and visitors seeking permission to give birth in Singapore. Sponsorship requirements differ by category. ICA also advises current LTVP holders to apply for renewal at least three months before their pass expires." },
        { small: "Source: ICA, \"Becoming a Long-Term Visit Pass Holder\". Checked [[date]]." },
      ],
      source: 'ICA, "Becoming a Long-Term Visit Pass Holder"',
    },
    {
      kind: "cards", columns: 3,
      title: "What ICA considers for LTVP applications.",
      cards: [
        { title: "Family ties and profile", text: "The applicant's family ties to Singaporeans and wider family circumstances." },
        { title: "Economic contribution and qualifications", text: "The applicant's economic contributions, qualifications and ability to contribute to Singapore." },
        { title: "Age, residency and integration", text: "Age, length of residency, ability to integrate and commitment to sinking roots in Singapore." },
      ],
    },
    {
      kind: "items", tone: "alt", columns: 2,
      title: "What we do for LTVP applicants and sponsors.",
      items: [
        { title: "Two-person document map", text: "Everything required from sponsor and applicant, with where each comes from and how long it takes." },
        { title: "Relationship evidence review", text: "What to include, what to leave out, and how to present it." },
        { title: "Foreign document handling", text: "Translation and certification requirements, and the timeline to obtain them." },
        { title: "Sponsor evidence preparation", text: "The sponsor's letter, income and residence records, prepared to the same standard as the applicant's." },
      ],
      foot: {
        button: { label: "Book an LTVP consultation", href: "/book-a-call", style: "ghost" },
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
            meta: "[[Spouse of a Singapore citizen · country of origin · year]]",
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
        { q: "Who can sponsor an LTVP?", a: "Singapore citizens and PRs, for the family members ICA lists. The categories and their requirements are on ica.gov.sg and we confirm which applies to you at the consultation." },
        { q: "Can my family member work on an LTVP?", a: "Some LTVP holders may be eligible for a Letter of Consent or a work pass, depending on the sponsor's status and other conditions published by MOM. We explain what applies; we do not promise work rights." },
        { q: "How long does it take?", a: "ICA publishes the processing time for each LTVP category. Preparation time depends on how quickly the applicant and sponsor can obtain the required records, particularly documents issued overseas." },
        { q: "Is LTVP a route to PR?", a: "LTVP is a visit pass, not a residence status. Some LTVP holders later apply for PR on their own merits. If that is your plan, say so at the consultation so the evidence you gather now is useful later." },
      ],
    },
    {
      kind: "source", tight: true,
      primary: 'ICA, "Becoming a Long-Term Visit Pass Holder"',
    },
    {
      kind: "cta",
      title: "Bring your family here, properly.",
      buttons: [
        { label: "Book an LTVP consultation", href: "/book-a-call", style: "light" },
      ],
    },
  ],
};
