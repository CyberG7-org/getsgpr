import type { PageContent } from "@/content/types";
import { SITE } from "@/content/site";

export const contact: PageContent = {
  meta: {
    title: "Book a Free Call | Contact GetSGPR",
    description: "Speak with a consultant about your Readiness result or your situation. Complimentary and non-obligatory. No documents needed for the first call.",
    path: "/contact",
  },
  shapes: "plain",
  blocks: [
    {
      kind: "hero", variant: "plain",
      eyebrow: "Contact",
      title: "Book a free call.",
      sub: "Speak with a consultant about your Readiness result or your situation. Complimentary and non-obligatory. No documents needed for the first call. We reply within 24 hours.",
    },
    { kind: "trust" },
    {
      kind: "contact",
      eyebrow: "Contact",
      title: "",
      prose: [
        { h3: "Or reach us directly" },
        { p: "[WhatsApp +65 8934 0818](https://wa.me/6589340818)" },
        { p: "For scheduling and status only. We do not accept documents by WhatsApp." },
        {
          kv: [
            { k: "Address", v: `${SITE.address} · By appointment.` },
            { k: "Phone", v: "+65 8934 0818" },
            { k: "Email", v: "[[Email]]" },
            { k: "Hours", v: "[[Opening hours]]" },
          ],
        },
        { small: "Languages: English, Mandarin, Malay, Tamil" },
        { h3: "Before you send anything." },
        {
          strong: "Please do not send passports, NRIC or FIN numbers or other documents by email or WhatsApp. If you become a client we will open a secure workspace for your files. If anyone asks you for documents before you have signed an engagement with us, do not send them, and tell us.",
        },
      ],
    },
    {
      kind: "steps", tone: "alt", light: true,
      title: "What happens after you book.",
      steps: [
        {
          when: "Within 24 hours", title: "We confirm your slot",
          text: "By email with a calendar invite and a reminder the day before. Book one to two weeks ahead where you can; reschedule free with 24 hours' notice.",
        },
        {
          when: "Before the call", title: "We read your Readiness result",
          text: "If you have completed it, so we can start with what matters.",
        },
        {
          when: "After the call", title: "You get a written recommendation",
          text: "The package that fits, the price, and the first three things to do. Or, if we think you should wait or do it yourself, we say so.",
        },
      ],
    },
    {
      kind: "text", tight: true,
      paragraphs: [SITE.independenceLine],
    },
  ],
};
