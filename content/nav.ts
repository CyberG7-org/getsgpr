import { SITE } from "@/content/site";

export type Link = { label: string; href: string; external?: boolean; small?: string };
// A primary item with a menu opens a dropdown; one without an href exists only as a dropdown.
export type NavItem =
  | { label: string; href: string; menu?: readonly Link[] }
  | { label: string; href?: undefined; menu: readonly Link[] };

const services: Link[] = [
  { label: "Permanent Residence", href: "/permanent-resident-sg", small: "First-time, family, EP/S Pass, founders" },
  { label: "Singapore Citizenship", href: "/singapore-citizen", small: "For PR holders and families" },
  { label: "Long Term Visit Pass", href: "/ltvp", small: "Family of citizens and PRs" },
  { label: "PR Rejection Appeal", href: "/pr-appeal", small: "Appeal or reapply, on evidence" },
];

const checkers: Link[] = [
  { label: "PR Readiness", href: "/pr-readiness-review", small: "15 questions, free result and next steps" },
  { label: "Citizen Readiness", href: "/citizenship-readiness-review", small: "18 questions for PR holders" },
];

export const NAV = {
  services,
  checkers,
  primary: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services", menu: services },
    { label: "Packages", href: "/packages" },
    { label: "Checker", menu: checkers },
    { label: "Guides", href: "/guides" },
    { label: "Contact Us", href: "/contact" },
  ] as NavItem[],
  cta: { label: "Book a free call", href: "/book-a-call" },
  compact: [
    { label: "Services", href: "/services" },
    { label: "Packages", href: "/packages" },
  ] as Link[],
  footer: {
    services: [
      { label: "Permanent Residence", href: "/permanent-resident-sg" },
      { label: "Singapore Citizenship", href: "/singapore-citizen" },
      { label: "Long Term Visit Pass", href: "/ltvp" },
      { label: "PR Rejection Appeal", href: "/pr-appeal" },
      { label: "Packages", href: "/packages" },
      { label: "Free PR Readiness Review", href: "/pr-readiness-review" },
      { label: "Free Citizenship Readiness Checker", href: "/citizenship-readiness-review" },
    ] as Link[],
    company: [
      { label: "About GetSGPR", href: "/about" },
      { label: "Guides", href: "/guides" },
      { label: "PR FAQ", href: "/guides/singapore-pr-faq" },
      { label: "Contact", href: "/contact" },
      { label: "WhatsApp +65 8934 0818", href: SITE.whatsappUrl, external: true },
    ] as Link[],
    legal: [
      { label: "Privacy & data security", href: "/privacy-data-security" },
      { label: "Terms of use", href: "/privacy-data-security#terms" },
    ] as Link[],
  },
  routes: [
    "/", "/pr-readiness-review", "/services", "/permanent-resident-sg",
    "/permanent-resident-sg/first-time-application", "/permanent-resident-sg/family-spouse",
    "/permanent-resident-sg/ep-s-pass-holders", "/permanent-resident-sg/founders-self-employed",
    "/singapore-citizen", "/citizenship-readiness-review", "/ltvp", "/pr-appeal", "/packages", "/sgpr-lite-diy-tier",
    "/sgpr-partnered-do-with-you", "/sgpr-premium-concierge", "/about",
    "/privacy-data-security", "/guides", "/guides/singapore-pr-faq", "/contact", "/book-a-call",
    "/guides/should-i-apply-now-or-wait", "/guides/pr-document-checklist",
    "/guides/appeal-or-reapply", "/guides/what-ica-considers",
  ],
} as const;
