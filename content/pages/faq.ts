import type { PageContent } from "@/content/types";

export const faqMeta = {
  title: "Singapore PR FAQ: Eligibility, Documents, Timing, Appeals — GetSGPR",
  description: "Short answers, with links to the longer guides and to ICA's own pages. Reviewed by [[name]] on [[date]].",
  path: "/guides/singapore-pr-faq",
};

// Modelled as six consecutive `faq` blocks rather than one literal container: `Blocks`
// wraps every block in its own `<Section>`, so faq.html's single section holding six
// grouped <h3>/.faq lists becomes six tight, back-to-back faq blocks here (see the task
// brief). `schema: true` only on the first so the page emits one FAQPage JSON-LD, not six.
export const faq: PageContent = {
  meta: faqMeta,
  shapes: "plain",
  blocks: [
    {
      kind: "crumbs",
      items: [
        { label: "Home", href: "/" },
        { label: "Knowledge Centre", href: "/guides" },
        { label: "Singapore PR FAQ" },
      ],
    },
    {
      kind: "hero", variant: "plain",
      eyebrow: "Reference",
      title: "Singapore PR: the questions people actually ask.",
      sub: "Short answers, with links to the longer guides and to ICA's own pages. Reviewed by [[name]] on [[date]].",
    },
    {
      kind: "faq", tight: true, schema: true, openFirst: true,
      title: "Eligibility",
      items: [
        {
          q: "Who can apply for Singapore PR?",
          a: 'ICA lists the categories of people who may apply, including spouses and unmarried children of citizens and PRs, aged parents of citizens, holders of work passes such as the Employment Pass and S Pass, students studying in Singapore, and foreign investors under the Global Investor Programme. The current list and each category\'s requirements are on ica.gov.sg. Source: ICA, "Becoming a Permanent Resident", checked [[date]].',
        },
        {
          q: "How does ICA decide?",
          a: "Holistically. ICA names family ties to Singaporeans, economic contributions, qualifications, age, family profile, length of residence, and the applicant's ability to contribute and integrate and commitment to sinking roots. It does not publish weightings or a scoring formula, and anyone who claims to know them is guessing.",
        },
        {
          q: "Is there a minimum salary or minimum years in Singapore?",
          a: "ICA does not publish either. It assesses each factor alongside the others.",
        },
      ],
    },
    {
      kind: "faq", tight: true, openFirst: true,
      title: "Documents",
      items: [
        {
          q: "What documents do I need?",
          a: "ICA publishes a document checklist that includes personal identification, education certificates, a recent employment letter, six months of payslips and, for the self-employed, business registration and financial records, among others. Use ICA's current checklist rather than any copy, including ours. [ICA PR document checklist →](#)",
        },
        {
          q: "What if I cannot get a document?",
          a: "Explain its absence in a declaration letter. Where you work with us, we draft it at no extra charge.",
        },
        {
          q: "Do documents need to be translated?",
          a: "Documents not in English must be accompanied by an accepted translation. ICA's checklist explains the requirement.",
        },
      ],
    },
    {
      kind: "faq", tight: true, openFirst: true,
      title: "Timing",
      items: [
        {
          q: "When should I apply?",
          a: "When your strongest factors are in place and your evidence is current. Read: Should I apply for Singapore PR now or wait?",
        },
        {
          q: "How long does ICA take?",
          a: "ICA publishes its processing time on ica.gov.sg. It starts after submission. Nothing a consultant does shortens it.",
        },
        {
          q: "How long does preparation take?",
          a: "With us, typically one to three months, depending mostly on how quickly employers and institutions supply records.",
        },
      ],
    },
    {
      kind: "faq", tight: true, openFirst: true,
      title: "Costs",
      items: [
        {
          q: "What does ICA charge?",
          a: "A processing fee per applicant at submission and further fees on approval. Current amounts are on ica.gov.sg. [[Insert with date checked.]]",
        },
        {
          q: "What does a consultant charge?",
          a: "It varies widely. Ours are fixed and published: Lite S$197, Partnered S$497, Concierge S$1,997. [See pricing](/packages)",
        },
      ],
    },
    {
      kind: "faq", tight: true, openFirst: true,
      title: "After the decision",
      items: [
        {
          q: "What if I am rejected?",
          a: "You may appeal through ICA's e-Service, or apply again later. Which is better depends on what has materially changed. [Read: PR rejected: appeal or reapply?](/pr-appeal)",
        },
        {
          q: "Does ICA give reasons?",
          a: "No.",
        },
        {
          q: "Can a consultant find out why?",
          a: "No. ICA has no channel for consultants and does not endorse them.",
        },
      ],
    },
    {
      kind: "faq", tight: true, openFirst: true,
      title: "Consultants",
      items: [
        {
          q: "Do I need a consultant?",
          a: "Not necessarily. A straightforward profile with clean documents can be prepared well without one. A consultant earns their fee on diagnosis, timing, evidence consistency and narrative, and on families, founders and reapplications.",
        },
        {
          q: "Is GetSGPR affiliated with ICA?",
          a: "No. No consultancy is. ICA says so on its own website.",
        },
        {
          q: "Can anyone guarantee approval?",
          a: "No. Singapore's consumer regulator has taken court action against consultancies that claimed to.",
        },
      ],
    },
    {
      kind: "source", tone: "alt", tight: true,
      primary: "Immigration & Checkpoints Authority (ica.gov.sg)",
    },
    {
      kind: "cta",
      title: "Know where you stand before you apply.",
      buttons: [{ label: "Get My Free PR Readiness Report", href: "/pr-readiness-review", style: "light" }],
    },
  ],
};
