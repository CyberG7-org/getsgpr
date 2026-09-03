import type { PageContent } from "@/content/types";
import { PACKAGES, REFUND_POLICY } from "@/content/packages";

const pkg = PACKAGES.find((p) => p.key === "concierge")!;

export const pkgConcierge: PageContent = {
  meta: {
    title: "Premium Concierge — S$1,997 Done-For-You PR Application — GetSGPR",
    description: "For busy professionals and families who want strategy, writing, document handling and submission managed by one accountable case manager.",
    path: "/sgpr-premium-concierge",
  },
  shapes: "plain",
  blocks: [
    {
      kind: "crumbs",
      items: [
        { label: "Home", href: "/" },
        { label: "Packages", href: "/packages" },
        { label: "Premium Concierge" },
      ],
    },
    {
      kind: "hero", variant: "light",
      eyebrow: "Premium Concierge · Done for you", eyebrowTone: "amber",
      title: "Premium Concierge: we manage the application with you from strategy to submission.",
      sub: "For busy professionals and families who want strategy, writing, document handling and submission managed by one accountable case manager.",
      small: "Independent consultancy. ICA makes all decisions. No approval guarantees.",
      buttons: [
        { label: "Book a Concierge call", href: "/contact", style: "primary" },
        { label: "Compare all packages", href: "/packages", style: "ghost" },
      ],
      aside: { kind: "package", pkg: "concierge" },
    },
    { kind: "trust" },
    {
      kind: "items", columns: 3,
      eyebrow: "What is inside",
      title: "Everything included.",
      items: [
        { title: "Named case manager", text: "One person from strategy to outcome, with a second reviewer before submission." },
        { title: "Full profile strategy", text: "The 8-factor diagnostic, consultations as scoped, and a written plan on timing and evidence." },
        { title: "Evidence matrix and document QC", text: "Every document mapped to what it proves and checked for freshness, legibility, translation and consistency." },
        { title: "Writing", text: "Forms completed for your signature. A tailored application narrative and cover letter written by us. Three revision rounds and a final consistency audit." },
        { title: "Translation coordination and ICA submission", text: "Third-party work coordinated at cost. Step-by-step assistance through the ICA e-Service." },
        { title: "Live updates and post-outcome review", text: "Advisory until the outcome, then a strategy review, including a rejection strategy session and one appeal or reapplication assessment if needed." },
      ],
    },
    {
      kind: "honest", tone: "alt", tight: true,
      title: "What it does not include.",
      text: "Family members are priced per additional adult and child. Appeal drafting is [[included / an add-on — confirm]]. Concierge never includes a promise of approval.",
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
        { q: "Who will I actually work with?", a: "A named case manager, assigned at the strategy consultation, and a second person who checks the application before submission." },
        { q: "What happens if I am rejected?", a: "You receive a post-outcome strategy review. We assess whether there is a real basis to appeal or whether strengthening and reapplying later is better, and we say so in writing." },
        { q: "How is it paid?", a: "Invoiced after the scope is agreed, before work begins. [[Payment terms.]]" },
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
