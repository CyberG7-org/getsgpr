export const ALLOW: Record<string, string[]> = {
  home: [
    // Dropped stat (approval-rate stat removed by decision; brief §Step 3.3).
    "approval rate across cases we prepared",
    "Requires substantiation: basis and date range, or remove.",

    // EligibilityChecker widget (components/widgets/EligibilityChecker.tsx, built in an
    // earlier task, out of this task's file list) renders one step of its 6-question →
    // email → result flow at a time; on a fresh page load only step 1 of 6 is in the
    // DOM (not merely CSS-hidden — the other steps are simply never mounted). These
    // sentences belong to the email-capture and result steps, which parity (page.goto
    // with no interaction) never reaches.
    "Where should we send it?",
    "We will email your snapshot along with the document checklist for your pathway.",
    "No newsletter, no follow-up spam.",
    "Please enter a valid email address.",
    "We use your email only to send this result and follow up once if you ask us to.",
    "A GetSGPR snapshot, not an ICA decision.",
    "No agency can promise an ICA outcome.",

    // Trust strip (components/blocks/Trust.tsx, fixed component, no per-page content
    // input): always renders the real address (SITE.address) in place of the
    // prototype's `[Tradehub 21, full address]` placeholder, per ruling 3 — so the
    // bracket text itself never appears, by design.
    "[Tradehub 21, full address]",
    // Same component renders generic placeholder labels from SITE.placeholders
    // ("Google rating", "Number of reviews") rather than the prototype's specific
    // example values ("4.9", "n"); the trust block takes no content-file input for
    // this line.
    "★ [4.9] on Google · [n] reviews ·",

    // Reviews block (components/blocks/Reviews.tsx, built in an earlier task) always
    // renders from the site-wide content/testimonials.ts list, not per-item quote text
    // supplied by the page; the block type carries no fields for quote copy. The
    // prototype's bracket placeholder quote/attribution text can't be reproduced here.
    "[Client quote, unedited, with permission to publish.]",
    "[Public first name] · [Package] · [Month, year]",
  ],

  services: [
    // Trust strip (components/blocks/Trust.tsx): renders the real address (SITE.address)
    // in place of the prototype's `[Tradehub 21, full address]` placeholder — same
    // fixed-component substitution as the home page allowlist above.
    "[Tradehub 21, full address]",

    // SourceBlock (components/ui/SourceBlock.tsx, shared fixed component): always
    // renders the placeholder label SITE.placeholders.checkedOn ("date checked") for
    // the last-reviewed date, not the prototype's bare "[date]" placeholder. The
    // component takes no per-page date input, so this line can never match verbatim.
    "last reviewed: [date] · primary source:",
  ],

  pr: [
    // Trust strip — same fixed-component substitution as above.
    "[Tradehub 21, full address]",

    // SourceBlock — same "[date]" vs "[date checked]" placeholder mismatch as above.
    // pr.html repeats this source block twice with identical text; both collapse to
    // one deduplicated sentence in prototypeSentences() and are covered by this line.
    "last reviewed: [date] · primary source:",
  ],

  "pr-first-time": [
    // Trust strip — same fixed-component substitution as above.
    "[Tradehub 21, full address]",

    // SourceBlock — same "[date]" vs "[date checked]" placeholder mismatch as above.
    // This page's source block also repeats twice (inline + tight section); both
    // collapse to one deduplicated sentence, covered by this line.
    "last reviewed: [date] · primary source:",
  ],

  "pr-family": [
    // Trust strip — same fixed-component substitution as above.
    "[Tradehub 21, full address]",

    // SourceBlock — same "[date]" vs "[date checked]" placeholder mismatch as above.
    "last reviewed: [date] · primary source:",
  ],

  "pr-ep": [
    // Trust strip — same fixed-component substitution as above.
    "[Tradehub 21, full address]",

    // SourceBlock — same "[date]" vs "[date checked]" placeholder mismatch as above.
    "last reviewed: [date] · primary source:",
  ],

  "pr-founders": [
    // Trust strip — same fixed-component substitution as above.
    "[Tradehub 21, full address]",

    // SourceBlock — same "[date]" vs "[date checked]" placeholder mismatch as above.
    "last reviewed: [date] · primary source:",
  ],

  citizenship: [
    // Trust strip — same fixed-component substitution as above.
    "[Tradehub 21, full address]",

    // SourceBlock — same "[date]" vs "[date checked]" placeholder mismatch as above.
    // citizenship.html repeats this source block twice (inline + tight section) with
    // identical text; both collapse to one deduplicated sentence and are covered here.
    "last reviewed: [date] · primary source:",
  ],

  ltvp: [
    // Trust strip — same fixed-component substitution as above.
    "[Tradehub 21, full address]",

    // SourceBlock — same "[date]" vs "[date checked]" placeholder mismatch as above.
    // ltvp.html repeats this source block twice (inline + tight section) with
    // identical text; both collapse to one deduplicated sentence and are covered here.
    "last reviewed: [date] · primary source:",
  ],

  appeal: [
    // Trust strip — same fixed-component substitution as above.
    "[Tradehub 21, full address]",

    // SourceBlock — same "[date]" vs "[date checked]" placeholder mismatch as above.
    // appeal.html repeats this source block twice (inline + tight section) with
    // identical text; both collapse to one deduplicated sentence and are covered here.
    "last reviewed: [date] · primary source:",
  ],

  packages: [
    // Trust strip — same fixed-component substitution as above.
    "[Tradehub 21, full address]",

    // Fixed-component substitution: the shared `Packages` block (built in an earlier
    // task) renders `showNotFor` from `content/packages.ts`'s `notFor` array (3 bullets
    // per package, sourced from home.html's package cards in Task 7), not the single
    // "Not included: ..." / "Family: ... Appeal drafting: ..." paragraph that
    // packages.html's own `.pkg` cards carry. Per the task brief, the data file wins
    // and this is the documented difference.
    "Not included: consultations, document review, form completion, submission or appeal support.",
    "Not included: form completion, document collection, submission on your behalf, appeal drafting.",
    "Family: [S$x] per additional member.",
    "Appeal drafting: [included / add-on — confirm].",
  ],

  "pkg-lite": [
    // Trust strip — same fixed-component substitution as above.
    "[Tradehub 21, full address]",

    // Hero block's `aside` union (kind: "checker" | "image", fixed by an earlier task,
    // not in this task's file list) has no package-summary-card variant, so the
    // prototype's redundant sidebar `.pkg` card (a duplicate mini preview of the same
    // package shown beside the hero copy) cannot be reproduced as a whole component.
    // Its name, price, tagline and CTA are already present via the hero's own
    // title/sub/badge/buttons, and its "For: ..." line is carried through verbatim via
    // `hero.under` (= PACKAGES.lite.bestFor). Only the card's compact 4-item bullet
    // list — itself a shorthand restatement of the six items spelled out in full in
    // the "Everything included" section below — has no field to render into.
    "Self-guided application toolkit",
    "ICA-linked document checklists and organiser",
    "Editable letter templates and consistency checklist",
    "Process resources, updated for 90 days",
  ],

  "pkg-partnered": [
    // Trust strip — same fixed-component substitution as above.
    "[Tradehub 21, full address]",

    // Redundant sidebar `.pkg` card — same Hero-aside type limitation as pkg-lite above.
    // Name/price/tagline/CTA are covered by the hero fields; "For: ..." is carried via
    // `hero.under` (= PACKAGES.partnered.bestFor). Only the card's compact bullet list
    // (a shorthand restatement of the six items in "Everything included" below) has no
    // field to render into.
    "Everything in Lite",
    "Full Readiness Report and 60-minute strategy consultation",
    "Feedback via secure shared Drive, two review rounds",
    "Samples, forms and cover letter reviewed by a consultant",
  ],

  "pkg-concierge": [
    // Trust strip — same fixed-component substitution as above.
    "[Tradehub 21, full address]",

    // Redundant sidebar `.pkg` card — same Hero-aside type limitation as pkg-lite above.
    // Name/price/tagline/CTA are covered by the hero fields; "For: ..." is carried via
    // `hero.under` (= PACKAGES.concierge.bestFor). Only the card's compact bullet list
    // (a shorthand restatement of the six items in "Everything included" below) has no
    // field to render into.
    "End-to-end white-glove service with a named case manager",
    "Full profile strategy, evidence matrix and writing",
    "Document handling and translation coordination",
    "ICA submission, live updates and a post-outcome strategy review",
  ],
};
