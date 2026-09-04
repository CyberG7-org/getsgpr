import type { PageContent } from "@/content/types";
import { PACKAGES, REFUND_POLICY } from "@/content/packages";

const pkg = PACKAGES.find((p) => p.key === "partnered")!;

export const pkgPartnered: PageContent = {
  meta: {
    title: "SGPR Partnered — S$497 Do-With-You PR Application Support — GetSGPR",
    description: "For applicants who want expert feedback and shared work across scheduled calls. You do the work; we find the gaps and inconsistencies before ICA does.",
    path: "/sgpr-partnered-do-with-you",
  },
  shapes: "plain",
  blocks: [
    {
      kind: "crumbs",
      items: [
        { label: "Home", href: "/" },
        { label: "Packages", href: "/packages" },
        { label: "SGPR Partnered" },
      ],
    },
    {
      kind: "hero", variant: "light",
      eyebrow: "SGPR Partnered · Most chosen", eyebrowTone: "violet",
      title: "SGPR Partnered: you remain in control. We pressure-test the case.",
      sub: "For applicants who want expert feedback and shared work across scheduled calls. You do the work; we find the gaps and inconsistencies before ICA does.",
      small: "Independent consultancy. ICA makes all decisions. No approval guarantees.",
      buttons: [
        { label: "Book SGPR Partnered", href: "/book-a-call", style: "primary" },
        { label: "Compare all packages", href: "/packages", style: "outline-dark" },
      ],
      aside: { kind: "package", pkg: "partnered", cta: { label: "Book SGPR Partnered", href: "/book-a-call", style: "light" } },
    },
    { kind: "trust" },
    {
      kind: "items", columns: 3,
      eyebrow: "What is inside",
      title: "Everything included.",
      items: [
        { title: "Everything in Lite", text: "The full toolkit, checklists and templates." },
        { title: "Full Readiness Report", text: "The 8-factor diagnostic written for your profile, with strong areas, weak areas and next actions." },
        { title: "60-minute strategy consultation", text: "With a named consultant, on timing, evidence and narrative." },
        { title: "Personalised evidence-gap list", text: "Exactly which records to obtain, from whom, and by when." },
        { title: "Feedback via secure shared Drive", text: "Upload your drafts; we return written comments. Two review rounds on forms, cover letter and supporting statements." },
        { title: "30-day question window", text: "Email questions answered within [[two]] working days after your final review." },
      ],
    },
    {
      kind: "honest", tone: "alt", tight: true,
      title: "What it does not include.",
      text: "Partnered does not include form completion, document collection, submission on your behalf or appeal drafting. If you want one accountable manager for the whole file, see Premium Concierge.",
    },
    {
      kind: "steps", tone: "dark",
      eyebrow: "Process",
      title: "How it works.",
      steps: [
        { when: "Day 0", title: "Free consultation", text: "We look at your profile and say plainly whether now is the right time to apply." },
        { when: "Week 1–2", title: "Profile strategy", text: "We identify what strengthens your case and what needs explaining, then plan around it." },
        { when: "Week 2–8", title: "Documentation", text: "Checklists, translations, and declaration letters where documents are missing for valid reasons." },
        { when: "Month 1–3", title: "Submission", text: "Filed through the ICA portal, with clear next steps after every call while you wait." },
      ],
    },
    {
      kind: "faq",
      title: "Questions.",
      openFirst: true,
      items: [
        { q: "How many calls are included?", a: "One 60-minute strategy consultation. Additional calls are S$[[x]] each." },
        { q: "What counts as a review round?", a: "One complete pass by us over your forms, cover letter and supporting statements, with written comments returned to you." },
        { q: "Can I upgrade to Concierge?", a: "Yes. The Partnered fee is credited in full against Concierge within [[90]] days." },
      ],
    },
    {
      kind: "text", tone: "alt", tight: true,
      paragraphs: [
        "Prices in SGD, [[include / exclude]] GST. ICA application fees and third-party costs are shown separately. No hidden consultancy fees. No approval guarantees.",
        `**Not suitable for:** ${pkg.notFor.join("; ")}`,
        `**Refunds:** ${REFUND_POLICY}`,
      ],
    },
    {
      kind: "cta",
      title: "Not sure this is the right package?",
      sub: "The free Readiness Review recommends one at the end, or book a free call.",
      buttons: [
        { label: "Get My Free PR Readiness Report", href: "/pr-readiness-review", style: "light" },
        { label: "Book a free call", href: "/book-a-call", style: "outline-dark" },
      ],
    },
  ],
};
