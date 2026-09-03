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
};
