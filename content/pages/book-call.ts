import type { PageContent } from "@/content/types";
import { SITE } from "@/content/site";

export const bookCall: PageContent = {
  meta: {
    title: "Book a Free Call | GetSGPR",
    description: "Choose an available time for a complimentary 30-minute consultation with GetSGPR.",
    path: "/book-a-call",
  },
  shapes: "plain",
  blocks: [
    {
      kind: "hero",
      variant: "plain",
      eyebrow: "Free consultation",
      title: "Book a free call.",
      sub: "Choose a convenient time to speak with a consultant about your situation or Readiness result.",
      small: "Complimentary and non-obligatory. No documents are needed for the first call.",
      centered: true,
    },
    { kind: "trust" },
    {
      kind: "calendar",
      tone: "alt",
      eyebrow: "Calendar",
      title: "Choose a date and time.",
      sub: "Select an available 30-minute appointment below. You will receive confirmation by email.",
    },
    {
      kind: "text",
      tight: true,
      paragraphs: [SITE.independenceLine],
    },
  ],
};
