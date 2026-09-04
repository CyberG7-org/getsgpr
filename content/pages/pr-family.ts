import type { PageContent } from "@/content/types";
import { SITE } from "@/content/site";

export const prFamily: PageContent = {
  meta: {
    title: "Family & Spouse Singapore PR Application — GetSGPR",
    description: "A family application is several people's records read as one story. The story holds when every date, address and relationship agrees across every document.",
    path: "/permanent-resident-sg/family-spouse",
  },
  shapes: "service",
  blocks: [
    {
      kind: "crumbs",
      items: [
        { label: "Home", href: "/" },
        { label: "Permanent Residence", href: "/permanent-resident-sg" },
        { label: "Family & Spouse" },
      ],
    },
    {
      kind: "hero", variant: "light",
      eyebrow: "Permanent Resident · Family and spouse",
      title: "One household. One consistent application.",
      sub: "A family application is several people's records read as one story. The story holds when every date, address and relationship agrees across every document.",
      small: SITE.independenceLine,
      buttons: [
        { label: "Book a family consultation", href: "/book-a-call", style: "primary" },
      ],
      aside: { kind: "image", ratio: "4-3", label: "Photo relevant to this segment, no client faces without consent" },
    },
    { kind: "trust" },
    {
      kind: "items", columns: 2,
      title: "Where family applications go wrong.",
      items: [
        { title: "Two versions of the same history", text: "Marriage dates, previous addresses and children's details that differ between the main applicant's and the spouse's documents." },
        { title: "The sponsor's evidence is thin", text: "When a Singaporean or PR spouse sponsors, their own employment, residence and support evidence matters and is often overlooked." },
        { title: "Children's records are an afterthought", text: "Birth certificates, school letters and passports that are expired, untranslated or missing." },
        { title: "Nobody owns the whole file", text: "Each adult gathers their own documents and nobody checks them against each other." },
      ],
    },
    {
      kind: "prose", tone: "alt",
      title: "What ICA says it considers.",
      content: [
        { p: "ICA names family ties to Singaporeans and family profile among the factors it assesses, alongside economic contribution, qualifications, age, length of residence, and integration and commitment to sinking roots. For family applications ICA's checklist asks for the marriage certificate, children's birth certificates and, where applicable, the sponsor's own records." },
        { small: "Source: ICA, \"Becoming a Permanent Resident\" and the PR document checklist. Checked [[date]]." },
      ],
      source: 'ICA, "Becoming a Permanent Resident" and the PR document checklist',
    },
    {
      kind: "cards", columns: 3,
      title: "The factors that carry family applications.",
      cards: [
        { title: "Family and Singapore ties", text: "The sponsor relationship and the household's connections here." },
        { title: "Family profile and long-term plan", text: "Whether the household's settlement plan is coherent: schooling, housing, work." },
        { title: "Evidence quality and timing", text: "Consistency across every family member's documents, which is where most family applications are weakest." },
      ],
      foot: { button: { label: "Start the free review", href: "/pr-readiness-review", style: "primary" } },
    },
    {
      kind: "items", tone: "alt", columns: 2,
      title: "What we do for families.",
      items: [
        { title: "Family document map", text: "One list, per person, of every record required and where it is." },
        { title: "Cross-document reconciliation", text: "We read the household's records against each other and fix the differences before ICA reads them." },
        { title: "Sponsor evidence review", text: "Where a Singaporean or PR spouse is sponsoring, we prepare their evidence as carefully as the applicant's." },
        { title: "One narrative", text: "A cover letter that explains the household, not just the main applicant." },
      ],
      foot: {
        text: "Partnered and Concierge are priced per additional family member; see the family pricing table. Lite covers a family at the single price.",
        button: { label: "See family pricing", href: "/packages", style: "ghost" },
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
            meta: "[[Married EP holder · spouse and child included · years in Singapore]]",
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
        { q: "Should we apply together or separately?", a: "It depends on each person's profile and on who is sponsoring whom. This is one of the first things a family consultation settles." },
        { q: "My spouse is a Singapore citizen. Does that make approval likely?", a: "Family ties to Singaporeans are one of the factors ICA names, and they matter. They are not a guarantee, and ICA still assesses the whole application. We prepare the sponsor's evidence as carefully as yours." },
        { q: "Do our children need their own documents?", a: "Yes. Each child included needs their own birth certificate, passport and, where relevant, school records, and each must be current and translated where necessary." },
        { q: "What does a family application cost?", a: "Partnered and Concierge are priced per additional member. The full table is on the pricing page." },
      ],
    },
    {
      kind: "source", tight: true,
      primary: 'ICA, "Becoming a Permanent Resident" and the PR document checklist',
    },
    {
      kind: "cta",
      title: "Get the whole household on one page.",
      buttons: [
        { label: "Book a family consultation", href: "/book-a-call", style: "light" },
        { label: "Get My Free PR Readiness Report", href: "/pr-readiness-review", style: "outline-dark" },
      ],
    },
  ],
};
