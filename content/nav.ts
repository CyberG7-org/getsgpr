export type Link = { label: string; href: string; external?: boolean; small?: string };

export const NAV = {
  services: [
    { label: "Permanent Residence", href: "/permanent-resident-sg", small: "First-time, family, EP/S Pass, founders" },
    { label: "Singapore Citizenship", href: "/singapore-citizen", small: "For PR holders and families" },
    { label: "Long Term Visit Pass", href: "/ltvp", small: "Family of citizens and PRs" },
    { label: "PR Rejection Appeal", href: "/pr-appeal", small: "Appeal or reapply, on evidence" },
  ] as Link[],
  primary: [
    { label: "Packages", href: "/packages" },
    { label: "Readiness Review", href: "/pr-readiness-review" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Knowledge Centre", href: "/guides" },
    { label: "About", href: "/about" },
  ] as Link[],
  cta: { label: "Book a free call", href: "/contact" },
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
    ] as Link[],
    company: [
      { label: "About GetSGPR", href: "/about" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Knowledge Centre", href: "/guides" },
      { label: "PR FAQ", href: "/guides/singapore-pr-faq" },
      { label: "Contact", href: "/contact" },
      { label: "WhatsApp +65 8934 0818", href: "https://wa.me/6589340818", external: true },
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
    "/singapore-citizen", "/ltvp", "/pr-appeal", "/packages", "/sgpr-lite-diy-tier",
    "/sgpr-partnered-do-with-you", "/sgpr-premium-concierge", "/case-studies", "/about",
    "/privacy-data-security", "/guides", "/guides/singapore-pr-faq", "/contact",
    "/case-studies/sample-reapplication", "/case-studies/sample-family", "/case-studies/sample-first-time",
  ],
} as const;
