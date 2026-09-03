import type { PageContent } from "@/content/types";
import { SITE } from "@/content/site";

export const prFounders: PageContent = {
  meta: {
    title: "Singapore PR for Founders & Self-Employed — GetSGPR",
    description: "Your application has to prove what an employment letter proves for everyone else: that your work is real, stable and contributes here.",
    path: "/permanent-resident-sg/founders-self-employed",
  },
  shapes: "service",
  blocks: [
    {
      kind: "crumbs",
      items: [
        { label: "Home", href: "/" },
        { label: "Permanent Residence", href: "/permanent-resident-sg" },
        { label: "Founders & Self-Employed" },
      ],
    },
    {
      kind: "hero", variant: "light",
      eyebrow: "Permanent Resident · Founders and self-employed",
      title: "PR for founders and the self-employed.",
      sub: "Your application has to prove what an employment letter proves for everyone else: that your work is real, stable and contributes here. That takes more evidence, organised better.",
      small: SITE.independenceLine,
      buttons: [
        { label: "Book a specialist assessment", href: "/contact", style: "primary" },
      ],
      aside: { kind: "image", ratio: "4-3", label: "Photo relevant to this segment, no client faces without consent" },
    },
    { kind: "trust" },
    {
      kind: "items", columns: 2,
      title: "Where founder applications go wrong.",
      items: [
        { title: "Income that is hard to read", text: "Director's fees, dividends and drawings that do not add up to a clear personal income across the documents." },
        { title: "A company on paper", text: "Registration without evidence of trading, staff, premises or clients." },
        { title: "Records that lag", text: "Financial statements a year old, or management accounts with no supporting bank evidence." },
        { title: "The founder's story missing", text: "Forms that show a company but not the person's role in it, or why the business belongs in Singapore." },
      ],
    },
    {
      kind: "prose", tone: "alt",
      title: "What ICA says it considers.",
      content: [
        { p: "ICA cites economic contributions among the factors it assesses, together with qualifications, age, family ties and profile, length of residence, and integration and commitment to sinking roots. Its checklist asks self-employed applicants for business registration records and financial records, and ICA may ask for further supporting documents during assessment." },
        { small: "Source: ICA, \"Becoming a Permanent Resident\" and the PR document checklist. Checked [[date]]." },
      ],
      source: 'ICA, "Becoming a Permanent Resident" and the PR document checklist',
    },
    {
      kind: "cards", columns: 3,
      title: "The factors that carry founder applications.",
      cards: [
        { title: "Economic contribution", text: "The business's substance and your personal income from it, evidenced by registration, accounts, tax and bank records." },
        { title: "Integration and roots", text: "Local staff, local clients, local premises and your own involvement here." },
        { title: "Evidence quality and timing", text: "Whether the financial picture is current, complete and consistent across ACRA, IRAS, bank and company records." },
      ],
      foot: { button: { label: "Start the free review", href: "/pr-readiness-review", style: "primary" } },
    },
    {
      kind: "items", tone: "alt", columns: 2,
      title: "What we do for founders.",
      items: [
        { title: "Business evidence matrix", text: "Registration, shareholding, financial statements, tax assessments, bank statements and contracts, mapped to what each proves." },
        { title: "Income reconciliation", text: "One clear personal income figure that every document supports." },
        { title: "Substance evidence", text: "Staff, premises, clients and activity, presented so the business reads as real." },
        { title: "Founder narrative", text: "A cover letter about the person, the business and why both are staying." },
      ],
      foot: {
        text: "Founder applications are usually Partnered or Concierge. Lite includes a founder checklist.",
        button: { label: "Compare packages", href: "/packages", style: "ghost" },
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
            meta: "[[Company director · age band · sector · years trading in Singapore]]",
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
        { q: "I pay myself mostly in dividends. Is that a problem?", a: "Not in itself, but it must be evidenced and explained. Dividends, fees and salary need to reconcile across company accounts, tax assessments and bank statements." },
        { q: "My company is new. Should I wait?", a: "Usually, until it has a trading record and at least one set of financial statements. The assessment will tell you what a year would add." },
        { q: "Do I need audited accounts?", a: "ICA asks for financial records. Whether audited accounts are needed depends on your company's requirements. We tell you what to include based on what you have." },
        { q: "I hold an EP through my own company. Which page applies?", a: "This one. Your evidence is the business's, even if your pass is an EP." },
      ],
    },
    {
      kind: "source", tight: true,
      primary: 'ICA, "Becoming a Permanent Resident" and the PR document checklist',
    },
    {
      kind: "cta",
      title: "Show the substance behind the business.",
      buttons: [
        { label: "Book a specialist assessment", href: "/contact", style: "light" },
      ],
    },
  ],
};
