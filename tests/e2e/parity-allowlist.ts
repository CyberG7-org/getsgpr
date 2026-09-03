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
  ],

  "pkg-partnered": [
    // Trust strip — same fixed-component substitution as above.
    "[Tradehub 21, full address]",
  ],

  "pkg-concierge": [
    // Trust strip — same fixed-component substitution as above.
    "[Tradehub 21, full address]",
  ],

  readiness: [
    // Trust strip — same fixed-component substitution as above.
    "[Tradehub 21, full address]",

    // SourceBlock — same "[date]" vs "[date checked]" placeholder mismatch as above.
    "last reviewed: [date] · primary source:",

    // The prototype's static #result section (readiness.html) is a layout mock for
    // the page shown after the questionnaire; per the task brief it is not ported,
    // because the live result renders inside the ReadinessForm widget once answered
    // (not on page load, which is all parity's page.goto ever exercises). Its
    // section-head text is allowlisted rather than reproduced statically:
    "Your PR readiness result:",
    "Layout of the page shown after",
    "Result page",

    // SampleResult (components/blocks/SampleResult.tsx, built in an earlier task, out
    // of this task's file list) is a shared, fixed-content widget: it always renders
    // the three generic per-outcome intro paragraphs and generic bracket placeholders
    // that belong to the prototype's static #result mock further down the page, not
    // the concrete worked example ("Sample only. Your result is written for your
    // answers.", with its specific sample strong/weak factors, actions and package)
    // that readiness.html shows inline in the "A result you can act on, not a
    // percentage." section. The component takes no per-page content input, so this
    // section's specific sample copy can never be reproduced verbatim by it.
    "your result is written for your answers.",
    "obtain a current employment letter dated within the last month.",
    "reconcile the employment dates on your cv, payslips and cpf statements.",
    "gather evidence of community involvement from the last two years.",
  ],
};
