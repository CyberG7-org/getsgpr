import type { PageContent } from "@/content/types";
import { SITE } from "@/content/site";

export const about: PageContent = {
  meta: {
    title: "About GetSGPR | Independent Singapore PR Consultancy, UEN 53408306D",
    description: "Know where you stand. Strengthen what matters. Submit with confidence.",
    path: "/about",
  },
  shapes: "plain",
  blocks: [
    {
      kind: "hero", variant: "light",
      eyebrow: "About",
      title: "An independent Singapore PR consultancy that shows its work.",
      sub: "Know where you stand. Strengthen what matters. Submit with confidence.",
      aside: { kind: "image", ratio: "4-3", label: "Photo of the office at Tradehub 21, exterior or reception" },
    },
    { kind: "trust" },
    {
      kind: "prose",
      title: "Who we are, on the record.",
      content: [
        {
          kv: [
            { k: "Legal name", v: "SGPR Immigration Singapore" },
            { k: "UEN", v: "53408306D" },
            { k: "Office", v: `${SITE.address} · [Get directions](/contact)` },
            { k: "Established", v: "[[Year]]" },
            { k: "Languages", v: "English, Mandarin, Malay, Tamil" },
            { k: "Contact", v: "+65 8934 0818 · [[Email]] · [[Hours]]" },
            {
              k: "Regulatory position",
              v: "GetSGPR is an independent consultancy. It is not affiliated with, licensed by or endorsed by ICA. [[If GetSGPR holds an MOM Employment Agency licence, state the number; if not, do not mention EA licensing, which applies to recruitment and placement rather than PR applications.]]",
            },
          ],
        },
      ],
      images: [
        { ratio: "4-3", label: "Office photo" },
        { ratio: "4-3", label: "Map" },
      ],
    },
    {
      kind: "items", tone: "alt", columns: 3,
      title: "Why we work this way.",
      items: [
        {
          title: "ICA publishes the checklist. We add the strategy.",
          text: "Anyone can download ICA's document list. The value of a consultant is in the questions the list does not answer: whether your profile is ready, whether your evidence is coherent, whether now is the right time, and how the application should tell its story. That is what we do.",
        },
        {
          title: "We make no promises about approval, because nobody honest can.",
          text: "ICA assesses every application on its own merits and says so. Singapore's competition and consumer regulator has taken court action against immigration consultancies for guaranteed-success claims. We would rather be the consultancy that never needed to be told.",
        },
        {
          title: "Proof you can check beats proof we selected.",
          text: "We publish attributed client feedback as it was originally shared with GetSGPR. Our cases are published only with written consent and redacted outcome documents.",
        },
      ],
    },
    {
      kind: "honesty",
      title: "We do not guarantee 100% approval simply for marketing purposes.",
      paragraphs: [
        "No agency can promise an ICA outcome, and any that does is telling you what you want to hear. What we can do is review your profile thoroughly, strengthen the parts within your control, and tell you plainly when waiting is the better move.",
        "If your application is rejected, we reassess the reasons with you and advise on appeal or re-submission on the merits.",
      ],
    },
    {
      kind: "reviews",
      eyebrow: "Testimonials",
      title: "What clients say.",
      sub: "Feedback from clients across PR, citizenship, LTVP and appeal applications.",
      limit: 9,
    },
    {
      kind: "table", tone: "alt",
      title: "What you will not find here.",
      columns: ["Typical agency marketing", "GetSGPR"],
      rows: [
        ["\"Highest approval rate\"", "An 8-factor diagnostic that tells you what is strong and what is weak"],
        ["\"Guaranteed PR\" or \"secret ICA criteria\"", "ICA's published factors, cited with dates"],
        ["Prices on request", "Three fixed prices, published, with everything included and excluded"],
        ["Anonymous testimonials", "Attributed client feedback and consented client cases with outcome documents"],
        ["Documents by WhatsApp", "A secure client workspace and a published data policy"],
      ],
    },
    {
      kind: "text", tone: "alt", tight: true,
      title: "Our independence, in full.",
      paragraphs: [SITE.disclaimer],
    },
    {
      kind: "cta",
      title: "See where you stand.",
      buttons: [
        { label: "Get My Free PR Readiness Report", href: "/pr-readiness-review", style: "light" },
        { label: "Book a 20-minute strategy call", href: "/contact", style: "outline-dark" },
      ],
    },
  ],
};
