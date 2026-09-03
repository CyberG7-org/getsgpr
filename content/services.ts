import type { Tone } from "@/content/types";

export type ServiceKey = "pr" | "citizenship" | "ltvp" | "appeal";

export type Service = {
  key: ServiceKey;
  label: string;
  href: string;
  tone: Tone;
  badge: string;
  summary: string;
  tags: string[];
};

export const SERVICES: Service[] = [
  {
    key: "pr",
    label: "Permanent Residence",
    href: "/permanent-resident-sg",
    tone: "teal",
    badge: "Permanent Residence",
    summary: "Securing PR requires careful preparation, strong documentation and honest profile positioning. We assess thoroughly, identify your strengths, and prepare a submission that presents your case on its actual merits.",
    tags: ["Profile assessment", "Document prep", "ICA submission"],
  },
  {
    key: "citizenship",
    label: "Singapore Citizenship",
    href: "/singapore-citizen",
    tone: "red",
    badge: "Citizenship",
    summary: "Citizenship is a major step after PR. We prepare an application that evidences your contribution to Singapore and positions your case on its actual merits.",
    tags: ["Contribution narrative", "Family applications"],
  },
  {
    key: "ltvp",
    label: "Long Term Visit Pass",
    href: "/ltvp",
    tone: "teal",
    badge: "LTVP",
    summary: "The LTVP lets family members of Singaporeans and PRs stay long-term. We make sure every supporting document is accurate and complete before it goes in.",
    tags: ["Spouse", "Parents", "Sponsorship"],
  },
  {
    key: "appeal",
    label: "Rejection Appeal",
    href: "/pr-appeal",
    tone: "red",
    badge: "Appeal",
    summary: "A rejection is not the end of your PR journey. We analyse the rejected application and work with you to strengthen the profile for a viable appeal or re-submission.",
    tags: ["Rejection analysis", "Appeal drafting"],
  },
];
