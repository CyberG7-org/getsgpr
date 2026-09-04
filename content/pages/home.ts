import type { PageContent } from "@/content/types";
import { SITE } from "@/content/site";

export const home: PageContent = {
  meta: {
    title: "Singapore PR Application Consultant | Evidence-Led PR Strategy — GetSGPR",
    description: "Evidence-led Singapore PR application support: a free 8-factor Readiness Review, fixed-price packages from S$197, and no approval guarantees.",
    path: "/",
  },
  shapes: "home",
  blocks: [
    {
      kind: "hero", variant: "dark",
      eyebrow: "Singapore PR consultancy",
      title: "Build a stronger Singapore PR application — before you submit.",
      sub: "Get a structured review of your profile, evidence, timing and application narrative. Choose expert guidance or end-to-end application management.",
      small: SITE.independenceLine,
      buttons: [
        { label: "Get My Free PR Readiness Report", href: "/pr-readiness-review", style: "light" },
        { label: "Compare Packages", href: "/packages", style: "outline-dark" },
      ],
      under: "Or answer six quick questions on the right for an instant snapshot.",
      aside: { kind: "checker" },
    },
    {
      kind: "stats", tight: true,
      items: [
        { value: "Fixed-price packages", label: "Clear pricing for the support you need." },
        { value: "No approval guarantees", label: "ICA makes all application decisions." },
        { value: "Reply within 24 hours", label: "Speak with our team about your next step." },
      ],
    },
    {
      kind: "honesty", tone: "alt",
      title: "We do not guarantee 100% approval simply for marketing purposes.",
      paragraphs: [
        "No agency can promise an ICA outcome, and any that does is telling you what you want to hear. What we can do is review your profile thoroughly, strengthen the parts within your control, and tell you plainly when waiting is the better move.",
        "If your application is rejected, we reassess the reasons with you and advise on appeal or re-submission on the merits.",
      ],
    },
    {
      kind: "cards", columns: 4,
      eyebrow: "Services",
      title: "Four services. One standard: evidence first.",
      cards: [
        {
          tone: "teal", badge: "Permanent Residence", title: "Permanent Residence",
          text: "Securing PR requires careful preparation, strong documentation and honest profile positioning. We assess thoroughly, identify your strengths, and prepare a submission that presents your case on its actual merits.",
          tags: ["Profile assessment", "Document prep", "ICA submission"],
          link: { label: "Learn more →", href: "/permanent-resident-sg" },
        },
        {
          tone: "red", badge: "Citizenship", title: "Singapore Citizenship",
          text: "Citizenship is a major step after PR. We prepare an application that evidences your contribution to Singapore and positions your case on its actual merits.",
          tags: ["Contribution narrative", "Family applications"],
          link: { label: "Learn more →", href: "/singapore-citizen" },
        },
        {
          tone: "teal", badge: "LTVP", title: "Long Term Visit Pass",
          text: "The LTVP lets family members of Singaporeans and PRs stay long-term. We make sure every supporting document is accurate and complete before it goes in.",
          tags: ["Spouse", "Parents", "Sponsorship"],
          link: { label: "Learn more →", href: "/ltvp" },
        },
        {
          tone: "red", badge: "Appeal", title: "Rejection Appeal",
          text: "A rejection is not the end of your PR journey. We analyse the rejected application and work with you to strengthen the profile for a viable appeal or re-submission.",
          tags: ["Rejection analysis", "Appeal drafting"],
          link: { label: "Learn more →", href: "/pr-appeal" },
        },
      ],
    },
    {
      kind: "tiles", tone: "alt",
      eyebrow: "Our diagnostic",
      title: "The GetSGPR PR Readiness Review™",
      sub: "An 8-factor application-readiness diagnostic built around the factors ICA publicly states it considers, plus the quality, consistency and timing of your supporting evidence.",
      tiles: [
        { n: "01", title: "Family and Singapore ties", text: "Sponsor and household context, family connections and established relationships here." },
        { n: "02", title: "Economic contribution", text: "Employment stability, trajectory, role and the financial evidence behind them." },
        { n: "03", title: "Qualifications and professional capital", text: "Education, recognised skills, licences and career progression." },
        { n: "04", title: "Career stage", text: "Age read together with your career history, not as a stand-alone number." },
        { n: "05", title: "Residence continuity", text: "Length and stability of your time in Singapore." },
        { n: "06", title: "Integration and roots", text: "Evidence that you are part of life here and intend to stay." },
        { n: "07", title: "Family profile and long-term plan", text: "Household coherence, dependants and your settlement plan." },
        { n: "08 · GetSGPR layer", title: "Evidence quality and timing", text: "Completeness, date freshness, cross-document consistency and what has changed since any earlier application.", ours: true },
      ],
      after: {
        text: "You receive one of three outcomes — **Ready to Prepare**, **Strengthen First** or **More Information Needed** — with three concrete next actions and the package that fits.",
        button: { label: "Start the free review", href: "/pr-readiness-review", style: "primary" },
      },
      note: "The Readiness Review is a GetSGPR diagnostic. It is not an ICA score, a quota model or a prediction of approval.",
    },
    {
      kind: "items", columns: 3,
      title: "PR strategy, not just PR paperwork.",
      sub: "ICA tells applicants what documents may be required. We help you answer the harder questions. Is your profile ready? Is your evidence coherent? Is now the right time? What is weak or missing? And how should your application tell one consistent, evidence-backed story?",
      items: [
        { title: "Diagnosis", text: "Where your profile is strong, where it is thin, and what that means for how you apply." },
        { title: "Timing", text: "Whether to submit now, or strengthen specific areas first and apply later." },
        { title: "Evidence selection", text: "Which records support your case, and which add noise." },
        { title: "Consistency checking", text: "Dates, roles, addresses and family history that agree across every document." },
        { title: "Narrative", text: "A cover letter and supporting statements that make one clear case." },
        { title: "Post-submission and rejection strategy", text: "What to do while you wait, and what to do if the answer is no." },
      ],
    },
    {
      kind: "steps", tone: "dark",
      eyebrow: "Process",
      title: "How it works, from first call to submission.",
      steps: [
        { when: "Day 0", title: "Free consultation", text: "We look at your profile and say plainly whether now is the right time to apply." },
        { when: "Week 1–2", title: "Profile strategy", text: "We identify what strengthens your case and what needs explaining, then plan around it." },
        { when: "Week 2–8", title: "Documentation", text: "Checklists, translations, and declaration letters where documents are missing for valid reasons." },
        { when: "Month 1–3", title: "Submission", text: "Filed through the ICA portal, with clear next steps after every call while you wait." },
      ],
      note: "ICA's own processing time starts after submission and is published on ica.gov.sg. Nothing we do shortens it.",
    },
    {
      kind: "packages",
      eyebrow: "Packages",
      title: "Choose how much support you need. Know the price before you speak to us.",
    },
    {
      kind: "cards", tone: "alt", columns: 3,
      eyebrow: "Client cases",
      title: "Real applicants. Real journeys. Verifiable outcomes.",
      sub: "Detailed client cases and redacted ICA outcome documents, published with written consent.",
      cards: [
        {
          title: "", badge: "[[PR Approved]]",
          outcome: {
            imageLabel: "Redacted ICA outcome document",
            meta: "[[EP holder · age band 30–34 · cybersecurity · 6 years in Singapore]]",
            challenge: "[[One sentence.]]", did: "[[One sentence.]]", result: "[[Verified outcome and month/year.]]",
            href: "/case-studies/sample-reapplication",
          },
        },
        {
          title: "", badge: "[[Reapplication Approved]]",
          outcome: {
            imageLabel: "Redacted ICA outcome document",
            meta: "[[Profile line]]",
            challenge: "[[One sentence.]]", did: "[[One sentence.]]", result: "[[Verified outcome and month/year.]]",
            href: "/case-studies/sample-reapplication",
          },
        },
        {
          title: "", badge: "[[Application Submitted]]",
          outcome: {
            imageLabel: "Video still",
            meta: "[[Profile line]]",
            challenge: "[[One sentence.]]", did: "[[One sentence.]]", result: "[[Verified outcome and month/year.]]",
            href: "/case-studies/sample-reapplication",
          },
        },
      ],
      foot: {
        text: "Every application is assessed by ICA on its own merits. Past outcomes do not predict future approval.",
        link: { label: "Read all case studies →", href: "/case-studies" },
      },
    },
    {
      kind: "reviews",
      eyebrow: "Testimonials",
      title: "What clients say.",
      sub: "Feedback from clients across PR, citizenship, LTVP and appeal applications.",
      limit: 3,
    },
    {
      kind: "items", tone: "alt", columns: 2,
      title: "Your documents are sensitive. We treat them that way.",
      sub: "A PR application means sharing passports, employment records and family documents. Before you share anything with us, here is how we handle it.",
      items: [
        { title: "Secure client workspace", text: "Every client document goes into a controlled workspace, not into chat threads or personal inboxes." },
        { title: "Role-based access", text: "Only the people working on your case can open your files, and access is revoked when the case closes." },
        { title: "Stated retention", text: "We keep files for [[x months]] after your outcome, then delete them, unless you ask us to keep them longer." },
        { title: "A named data protection contact", text: "[[Name]] answers questions about your data at [[email]]." },
      ],
      foot: {
        text: "**We will never ask you to send passports or NRIC/FIN numbers over WhatsApp or during a free consultation.**",
        link: { label: "How we handle your data →", href: "/privacy-data-security" },
      },
    },
    {
      kind: "faq",
      eyebrow: "FAQ",
      title: "Questions people ask before they call us.",
      schema: true, openFirst: true,
      items: [
        { q: "Is there any consultation fee involved?", a: "No. The initial consultation is complimentary and non-obligatory. We recommend booking one to two weeks ahead, and you can reschedule free with 24 hours' notice. [[Lift verbatim from the live site.]]" },
        { q: "Do you guarantee 100% approval if I engage your firm?", a: "No. We do not guarantee 100% approval simply for marketing purposes. No agency can promise an ICA outcome. We uphold transparency and honesty in our services, review your profile thoroughly and tell you plainly when waiting is the better move. [[Lift verbatim from the live site.]]" },
        { q: "How long will it take to prepare my application?", a: "Preparation generally takes one to three months, depending on how complete your documents are and how quickly employers and institutions respond. ICA's own processing time is separate. [[Lift verbatim from the live site.]]" },
        { q: "What if my documents are not in English?", a: "Documents not in English must be accompanied by an accepted translation. We coordinate translations where needed, at cost. [[Lift verbatim from the live site.]]" },
        { q: "What if I cannot produce my birth certificate or education certificates?", a: "Where a document genuinely cannot be obtained, we draft a declaration letter explaining its absence at no additional charge. [[Lift verbatim from the live site.]]" },
        { q: "Can I appeal if my application gets rejected?", a: "Yes. Appeals are lodged through ICA's e-Service and assessed on their merits. We reassess the reasons with you and advise on appeal or re-submission. [[Lift verbatim from the live site.]]" },
      ],
    },
    {
      kind: "contact", tone: "alt", id: "contact",
      eyebrow: "Contact",
      title: "Book a free call.",
      sub: "Speak with a consultant about your snapshot or your situation. Free, non-obligatory, and no documents needed for the first call. We reply within 24 hours.",
      prose: [
        { h3: "Or reach us directly" },
        { p: "[WhatsApp +65 8934 0818](https://wa.me/6589340818)" },
        { p: "Consultations in English, Mandarin, Malay and Tamil. Book one to two weeks ahead where you can; reschedule free with 24 hours' notice." },
        { p: "**Please do not send passports, NRIC or FIN numbers or other documents by email or WhatsApp.** If you become a client we will open a secure workspace for your files." },
      ],
    },
    {
      kind: "cta",
      title: "Know where you stand before you apply.",
      sub: "Ten minutes. No documents. No NRIC or passport numbers. Just a clear picture of what is ready, what is weak and what to do next.",
      buttons: [
        { label: "Get My Free PR Readiness Report", href: "/pr-readiness-review", style: "light" },
        { label: "Book a free call", href: "/contact", style: "outline-dark" },
      ],
    },
  ],
};
