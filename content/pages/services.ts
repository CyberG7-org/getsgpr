import type { PageContent } from "@/content/types";
import { SERVICES } from "@/content/services";

const pr = SERVICES.find((s) => s.key === "pr")!;
const citizenship = SERVICES.find((s) => s.key === "citizenship")!;
const ltvp = SERVICES.find((s) => s.key === "ltvp")!;
const appeal = SERVICES.find((s) => s.key === "appeal")!;

export const services: PageContent = {
  meta: {
    title: "Singapore Immigration Services: PR, Citizenship, LTVP, Appeals — GetSGPR",
    description: "Whether you are applying for PR for the first time, converting to citizenship, bringing family here or recovering from a rejection, the work is the same.",
    path: "/services",
  },
  shapes: "plain",
  blocks: [
    {
      kind: "hero", variant: "plain",
      eyebrow: "Services",
      title: "Four services. One standard: evidence first, no approval guarantees.",
      sub: "Whether you are applying for PR for the first time, converting to citizenship, bringing family here or recovering from a rejection, the work is the same: understand where you stand, strengthen what matters, submit one consistent application.",
    },
    { kind: "trust" },
    {
      kind: "cards", columns: 2,
      cards: [
        {
          title: "Permanent Resident",
          bullets: [
            "For Employment Pass, S Pass and other pass holders, and for families, applying for Singapore PR.",
            "We review your profile against the factors ICA publishes, close the gaps in your evidence and prepare an application that tells one coherent story.",
          ],
          link: { label: "Start with the free Readiness Review →", href: pr.href },
        },
        {
          title: "Singapore Citizenship",
          bullets: [
            "For PR holders and their families ready to take the next step.",
            "We help you show the depth of your roots here with evidence, not adjectives, and time the application sensibly.",
          ],
          link: { label: "Book a citizenship consultation →", href: citizenship.href },
        },
        {
          title: "Long Term Visit Pass (LTVP)",
          bullets: [
            "For spouses, children and parents of Singapore citizens and PRs.",
            "We prepare the sponsor's and the applicant's evidence together so that the relationship and the means of support are clear and consistent.",
          ],
          link: { label: "Book an LTVP consultation →", href: ltvp.href },
        },
        {
          title: "PR Rejection Appeal",
          bullets: [
            "For applicants ICA has turned down.",
            "We diagnose what has materially changed, tell you honestly whether an appeal or a later reapplication is the better route, and prepare whichever you choose.",
          ],
          link: { label: "Start the Rejection Diagnostic →", href: appeal.href },
        },
      ],
    },
    {
      kind: "text", tone: "alt",
      title: "Not sure which applies to you?",
      sub: "Take the free Readiness Review, or book a 20-minute call. Either way you will be told which service fits, or that none does yet, before any fee is discussed.",
      buttons: [
        { label: "Get My Free PR Readiness Report", href: "/pr-readiness-review", style: "primary" },
        { label: "Book a 20-minute strategy call", href: "/book-a-call", style: "ghost" },
      ],
    },
    {
      kind: "steps", light: true,
      title: "The same six stages, every time.",
      steps: [
        { when: "", title: "Readiness diagnostic", text: "Profile and evidence mapped against the eight factors." },
        { when: "", title: "Strategy consultation", text: "Timing, evidence, narrative and scope agreed with a named consultant." },
        { when: "", title: "Evidence and document review", text: "Every document checked for freshness and consistency." },
        { when: "", title: "Application QA", text: "Forms and statements checked against each other and the evidence." },
        { when: "", title: "ICA submission", text: "Through ICA's e-Service, guided or assisted." },
        { when: "", title: "Post-submission support and outcome review", text: "What to expect while you wait, and what to do after the decision." },
      ],
      note: "What changes between packages is how much of each stage we do for you. [See pricing →](/packages)",
    },
    {
      kind: "source", tone: "alt", tight: true,
      primary: "Immigration & Checkpoints Authority (ica.gov.sg)",
    },
  ],
};
