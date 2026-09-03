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
        { label: "Book an LTVP consultation", href: "/contact", style: "primary" },
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
        { p: "ICA publishes who may be sponsored for a Long Term Visit Pass, including the spouse, children and parents of Singapore citizens and PRs, with different requirements by category, the sponsor's obligations, the documents required and the validity and renewal terms. ICA assesses each application on its merits." },
        { small: "Source: ICA, Long Term Visit Pass pages. [[Confirm current categories and requirements before publishing.]] Checked [[date]]." },
      ],
      source: "ICA, Long Term Visit Pass pages",
    },
    {
      kind: "cards", columns: 3,
      title: "What decides an LTVP application.",
      cards: [
        { title: "The relationship", text: "Evidenced, not asserted: records, photographs where appropriate, shared addresses, correspondence." },
        { title: "The sponsor's means and standing", text: "Employment, income, residence and their own immigration status." },
        { title: "Evidence quality and timing", text: "Foreign documents in the right form, current, translated and consistent with the sponsor's records." },
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
        { title: "Renewal reminders", text: "[[If offered: a reminder before expiry and a check on any change in circumstances.]]" },
      ],
      foot: {
        text: "Fee: S$[[x]] fixed, for one sponsor and one applicant. Additional applicants S$[[x]]. [[Confirm.]]",
        button: { label: "Book an LTVP consultation", href: "/packages", style: "ghost" },
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
        { q: "How long does it take?", a: "ICA publishes its processing time. Our preparation typically takes [[two to four weeks]], most of it waiting for foreign documents." },
        { q: "Is LTVP a route to PR?", a: "LTVP is a visit pass, not a residence status. Some LTVP holders later apply for PR on their own merits. If that is your plan, say so at the consultation so the evidence you gather now is useful later." },
      ],
    },
    {
      kind: "source", tight: true,
      primary: "ICA, Long Term Visit Pass pages",
    },
    {
      kind: "cta",
      title: "Bring your family here, properly.",
      buttons: [
        { label: "Book an LTVP consultation", href: "/contact", style: "light" },
      ],
    },
  ],
};
