import type { PageContent } from "@/content/types";
import { PACKAGES, REFUND_POLICY } from "@/content/packages";

const pkg = PACKAGES.find((p) => p.key === "lite")!;

export const pkgLite: PageContent = {
  meta: {
    title: "SGPR Lite — S$197 DIY Singapore PR Toolkit — GetSGPR",
    description: "For independent applicants who want clarity and structure without agency fees. Everything you need to prepare a Singapore PR application properly, organised",
    path: "/sgpr-lite-diy-tier",
  },
  shapes: "plain",
  blocks: [
    {
      kind: "crumbs",
      items: [
        { label: "Home", href: "/" },
        { label: "Packages", href: "/packages" },
        { label: "SGPR Lite" },
      ],
    },
    {
      kind: "hero", variant: "light",
      eyebrow: "SGPR Lite · DIY", eyebrowTone: "teal",
      title: "SGPR Lite: do it yourself, without guessing.",
      sub: "For independent applicants who want clarity and structure without agency fees. Everything you need to prepare a Singapore PR application properly, organised the way we organise it for clients.",
      small: "Independent consultancy. ICA makes all decisions. No approval guarantees.",
      buttons: [
        { label: "Get SGPR Lite", href: "/contact", style: "primary" },
        { label: "Compare all packages", href: "/packages", style: "ghost" },
      ],
      aside: { kind: "package", pkg: "lite", cta: { label: "Get SGPR Lite", href: "/contact", style: "primary" } },
    },
    { kind: "trust" },
    {
      kind: "items", columns: 3,
      eyebrow: "What is inside",
      title: "Everything included.",
      items: [
        { title: "Readiness self-assessment", text: "The same eight factors we use, as a worksheet you complete yourself." },
        { title: "ICA-linked document checklist and organiser", text: "By applicant type, linked to ICA's current checklist and updated when ICA updates theirs." },
        { title: "Editable letter templates", text: "Cover letter, employer letter request, declaration letter for missing documents." },
        { title: "Consistency checklist", text: "The cross-document checks that catch mismatched dates, titles and addresses before ICA does." },
        { title: "Process resources", text: "Worked guides to the ICA e-Service, timing and what to expect after submission." },
        { title: "90 days of updates", text: "Any change to the checklist or guides in your first 90 days, sent to you." },
      ],
    },
    {
      kind: "honest", tone: "alt", tight: true,
      title: "What it does not include.",
      text: "Lite does not include consultations, document review, form completion, submission or appeal support. If you want a second pair of eyes, see SGPR Partnered.",
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
        { q: "How do I receive it?", a: "Instantly after purchase, as a download link plus a private page that stays updated for 90 days." },
        { q: "Is it refundable?", a: "Lite is a digital product and is non-refundable once downloaded. Its fee is credited in full against Partnered or Concierge within [[90]] days." },
        { q: "Does it cover family applications?", a: "Yes. The toolkit includes family checklists at the single price." },
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
        { label: "Book a free call", href: "/contact", style: "outline-dark" },
      ],
    },
  ],
};
