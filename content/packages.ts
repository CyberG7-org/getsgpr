import type { Btn, Tone } from "./types";

export type Package = {
  key: "lite" | "partnered" | "concierge"; slug: string; badge: { tone: Tone; label: string }; name: string;
  price: string; priceNote: string; tagline: string; bullets: string[]; bestFor: string; notFor: string[]; cta: Btn; featured?: boolean;
};

export const REFUND_POLICY = "Once consultancy services have started, fees are non-refundable, even if applications are rejected.";

export const PACKAGES: Package[] = [
  {
    key: "lite", slug: "/sgpr-lite-diy-tier", badge: { tone: "teal", label: "DIY" }, name: "SGPR Lite",
    price: "S$197", priceNote: "one-time", tagline: "Do it yourself, without guessing.",
    bullets: ["Self-guided application toolkit", "ICA-linked document checklists and organiser", "Editable letter templates and consistency checklist", "Process resources, updated for 90 days"],
    bestFor: "For: Independent applicants wanting clarity and structure without agency fees.",
    notFor: ["Applicants with weak profiles who need custom strategy", "Those needing form-filling help or profile analysis", "People who already got rejected (should upgrade to Partnered or Concierge)"],
    cta: { label: "Get SGPR Lite", href: "/sgpr-lite-diy-tier", style: "primary" },
  },
  {
    key: "partnered", slug: "/sgpr-partnered-do-with-you", badge: { tone: "violet", label: "Most chosen" }, name: "SGPR Partnered",
    price: "S$497", priceNote: "one-time", tagline: "You remain in control. We pressure-test the case.",
    bullets: ["Everything in Lite", "Full Readiness Report and 60-minute strategy consultation", "Feedback via secure shared Drive, two review rounds", "Samples, forms and cover letter reviewed by a consultant"],
    bestFor: "For: Applicants wanting expert feedback and shared work across scheduled calls.",
    notFor: ["Applicants who need full document management or done-for-you writing", "Those unsure how to fill Form 4A — better served by Concierge", "Applicants needing ICA submission done on their behalf"],
    cta: { label: "Book SGPR Partnered", href: "/sgpr-partnered-do-with-you", style: "light" }, featured: true,
  },
  {
    key: "concierge", slug: "/sgpr-premium-concierge", badge: { tone: "amber", label: "Done for you" }, name: "Premium Concierge",
    price: "S$1,997", priceNote: "single applicant", tagline: "We manage the application with you from strategy to submission.",
    bullets: ["End-to-end white-glove service with a named case manager", "Full profile strategy, evidence matrix and writing", "Document handling and translation coordination", "ICA submission, live updates and a post-outcome strategy review"],
    bestFor: "For: Busy professionals and families wanting strategy, writing and submission handled.",
    notFor: ["People on a tight budget", "Those who enjoy DIY processes", "Applicants with incomplete documents or unresolved legal issues"],
    cta: { label: "Book a Concierge call", href: "/sgpr-premium-concierge", style: "primary" },
  },
];
