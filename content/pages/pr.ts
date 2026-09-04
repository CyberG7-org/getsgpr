import type { PageContent } from "@/content/types";
import { SITE } from "@/content/site";

export const pr: PageContent = {
  meta: {
    title: "Singapore PR Application Support | Evidence-Led Preparation — GetSGPR",
    description: "ICA publishes the checklist. We help with the harder part: whether your profile is ready, whether your evidence holds together, and how your application",
    path: "/permanent-resident-sg",
  },
  shapes: "service",
  blocks: [
    {
      kind: "hero", variant: "light",
      eyebrow: "Permanent Resident",
      title: "Singapore PR application support, built around your actual profile.",
      sub: "ICA publishes the checklist. We help with the harder part: whether your profile is ready, whether your evidence holds together, and how your application should tell its story.",
      small: SITE.independenceLine,
      buttons: [
        { label: "Get My Free PR Readiness Report", href: "/pr-readiness-review", style: "primary" },
        { label: "Compare Packages", href: "/packages", style: "outline-dark" },
      ],
      aside: { kind: "image", ratio: "4-3", label: "Photo relevant to this segment, no client faces without consent" },
    },
    { kind: "trust" },
    {
      kind: "cards", columns: 3,
      title: "Which applicant are you?",
      cards: [
        {
          title: "First-time applicant",
          text: "Never applied, or withdrew before a decision.",
          link: { label: "Your first application, prepared properly →", href: "/permanent-resident-sg/first-time-application" },
        },
        {
          title: "Family or spouse",
          text: "Applying with a spouse or children, or sponsored by a Singaporean or PR.",
          link: { label: "One household, one consistent application →", href: "/permanent-resident-sg/family-spouse" },
        },
        {
          title: "EP or S Pass professional",
          text: "Employed in Singapore on a work pass.",
          link: { label: "PR for Employment Pass and S Pass holders →", href: "/permanent-resident-sg/ep-s-pass-holders" },
        },
        {
          title: "Founder or self-employed",
          text: "You run a business here.",
          link: { label: "PR for founders and the self-employed →", href: "/permanent-resident-sg/founders-self-employed" },
        },
        {
          title: "Previously rejected",
          text: "ICA has turned down at least one application.",
          link: { label: "Go to PR Rejection Appeal →", href: "/pr-appeal" },
        },
      ],
    },
    {
      kind: "items", tone: "alt", columns: 2,
      title: "Where PR applications usually go wrong.",
      items: [
        { title: "Applying on instinct, not evidence", text: "Submitting because a friend was approved, without knowing which factors are strong and which are thin." },
        { title: "Stale or inconsistent records", text: "An employment letter older than a month, payslips that do not match CPF, job titles that differ between CV and contract." },
        { title: "No narrative", text: "Forms that are complete but say nothing about why this person, now, intends to make Singapore home." },
        { title: "Wrong timing", text: "Applying a few months before a promotion, a marriage or a qualification that would have changed the picture." },
        { title: "Nothing learned after a rejection", text: "Reapplying with the same evidence and a new date." },
      ],
    },
    {
      kind: "prose",
      title: "What ICA says it considers.",
      content: [
        { p: "ICA states that PR applications are assessed holistically. The factors it names include family ties to Singaporeans, economic contributions, qualifications, age, family profile and length of residence, together with the applicant's ability to contribute and integrate and their commitment to sinking roots in Singapore. ICA's document checklist asks for records that evidence these, including education certificates, a recent employment letter, six months of payslips and, for the self-employed, business registration and financial records. ICA may request further documents during assessment." },
        { small: "Source: ICA, \"Becoming a Permanent Resident\" and the PR document checklist. Checked [[date]]." },
      ],
      source: 'ICA, "Becoming a Permanent Resident" and the PR document checklist',
    },
    {
      kind: "cards", columns: 3,
      title: "Eight factors, one honest answer.",
      sub: "The PR Readiness Review maps your answers against the seven factors above and adds an eighth: whether your evidence is complete, current and consistent. You get Ready to Prepare, Strengthen First or More Information Needed, with three next actions. It takes ten minutes and asks for no documents.",
      cards: [
        { title: "Ready to Prepare", text: "Your profile and evidence look ready to be assembled." },
        { title: "Strengthen First", text: "One or more factors would benefit from work before you apply." },
        { title: "More Information Needed", text: "Your situation needs a person, not a form." },
      ],
      foot: { button: { label: "Start the free review", href: "/pr-readiness-review", style: "primary" } },
    },
    {
      kind: "table", tone: "alt",
      title: "What we do, by package.",
      columns: ["Stage", "Lite", "Partnered", "Concierge"],
      rows: [
        ["Diagnose your profile", "Self-assessment", "Full written report", "Full written report"],
        ["Agree the strategy", "Guide", "60-minute consultation", "Consultations as scoped"],
        ["Build the evidence list", "Checklist", "Personalised gap list", "Evidence matrix, built by us"],
        ["Check the documents", "Checklist", "Spot check", "Full quality control"],
        ["Complete the forms", "Templates", "We review yours", "We complete them for your signature"],
        ["Write the narrative", "Template", "We review yours", "We write it"],
        ["Final consistency audit", "Checklist", "✓", "✓"],
        ["Submit to ICA", "Guide", "Guide", "Step-by-step assistance"],
        ["After submission", "Guide", "Guide", "Advisory to outcome, plus outcome review"],
      ],
      note: "Lite S$197 · Partnered S$497 · Concierge S$1,997 single applicant, family pricing on the pricing page.",
      foot: { button: { label: "Compare everything", href: "/packages", style: "ghost" } },
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
            meta: "[[EP holder · age band 30–34 · technology · 6 years in Singapore]]",
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
        { q: "When is the right time to apply?", a: "When the factors you can influence are as strong as they are going to be for a while, and your evidence is current. If a promotion, a marriage or a qualification is a few months away, it is usually worth waiting. The Readiness Review and the guide \"Should I apply for Singapore PR now or wait?\" go deeper." },
        { q: "How long does ICA take?", a: "ICA publishes its own processing time on ica.gov.sg. It starts after submission and nothing we do shortens it." },
        { q: "Can you tell me my chances?", a: "No, and we will not pretend to. We can tell you what is strong, what is weak and what to do about it, which is more useful than a made-up percentage." },
        { q: "Do I need a consultant at all?", a: "Not always. If your profile is straightforward and you are organised, Lite gives you the structure to do it well. The Readiness Review will say so if that is the case." },
        { q: "What if I have been rejected before?", a: "Use the PR Rejection Appeal page. The diagnostic adds one question, what has materially changed, and that question decides whether to appeal or reapply." },
      ],
    },
    {
      kind: "source", tight: true,
      primary: 'ICA, "Becoming a Permanent Resident" and the PR document checklist',
    },
    {
      kind: "cta",
      title: "Know where you stand before you apply.",
      buttons: [
        { label: "Get My Free PR Readiness Report", href: "/pr-readiness-review", style: "light" },
        { label: "Book a 20-minute strategy call", href: "/contact", style: "outline-dark" },
      ],
    },
  ],
};
