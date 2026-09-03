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

    // The rest of that same unported #result mock: its three generic per-outcome
    // intro paragraphs, its generic bracket placeholders (distinct from the concrete
    // worked example that SampleResult.tsx renders for the "A result you can act on,
    // not a percentage." section above it), its two CTA buttons and its small print.
    // None of this is reproduced anywhere on the live page — the real equivalents
    // only exist inside ReadinessForm's post-submit result view, which parity's
    // page.goto (no interaction) never reaches.
    "Based on your answers, your profile and evidence look ready to be assembled into an application.",
    "The work now is doing it well.",
    "Based on your answers, one or more factors would benefit from work before you apply.",
    "Doing that work first is usually better than applying and hoping.",
    "More Information Needed:",
    "Your answers raise a question we cannot resolve without talking to you.",
    "That is not a bad sign; it means your situation needs a person, not a form.",
    "[Generated from answers]",
    "[Lite / Partnered / Concierge] · S$[price] · [one line on why].",
    "Book a 20-minute strategy call with [consultant name]",
    "[Buy Lite / Book Partnered / Book a Concierge strategy call]",
    "Message us on WhatsApp to schedule (scheduling only, no documents).",
    "This result is a GetSGPR diagnostic and not a prediction of ICA's decision.",
    "ICA assesses every application on its own merits.",
  ],

  about: [
    // Trust strip — same fixed-component substitution as above.
    "[Tradehub 21, full address]",

    // Prose kv "Office" row (content/pages/about.ts): renders the real address
    // (SITE.address) in place of the prototype's `[Full address, Tradehub 21]`
    // placeholder, per transcription rule 4 and the task brief ("Address = the full
    // address"). Same substitution family as the trust-strip line above, different
    // literal bracket wording used in this particular dt/dd pair.
    "[full address, tradehub 21]",

    // Prose kv "Contact" row: renders the real phone number (+65 8934 0818) in
    // place of the prototype's `[Phone]` placeholder, per fix-round-1 review and
    // transcription rule 4 ("[Phone] → +65 8934 0818" applies everywhere, not just
    // the trust strip). The Email/Hours placeholders in the same row are unaffected
    // and still render literally, so the original three-placeholder combined
    // sentence no longer forms verbatim.
    "[phone] · [email] · [hours]",
  ],

  contact: [
    // Trust strip — same fixed-component substitution as above.
    "[Tradehub 21, full address]",

    // Prose kv "Address" row (content/pages/contact.ts) — same substitution as the
    // about-page kv Office row above.
    "[full address, tradehub 21]",

    // The prototype's Email row is transcribed with an apparent copy-paste error:
    // its dd literally reads "[Address] · We reply within 24 hours." (the bracket
    // should almost certainly read "[Email]"). Per the task brief, this page's kv
    // corrects the label (Email = [[Email]]), which is rendered on its own row
    // without the trailing "We reply within 24 hours." clause — that clause is
    // reproduced verbatim elsewhere on this page (the hero sub's closing sentence).
    "[address] · we reply within 24 hours.",

    // GoHighLevel iframe embed note (contact.html's <p class="note"> next to the
    // form embed): a builder/implementation note about the widget markup, not real
    // page content. The live page renders the actual form via the GhlForm widget
    // (components/widgets/GhlForm.tsx) with no such note.
    "gohighlevel contact form embed.",
    "each instance needs a unique id and data-layout-iframe-id.",
  ],

  cases: [
    // Trust strip — same fixed-component substitution as above.
    "[Tradehub 21, full address]",

    // cases.html mocks six outcome cards with hand-written, card-specific meta/badge/
    // image-label text (no real data behind them). Per the task brief, the live page
    // instead builds its cards at render time from getCaseStudies() — three real
    // CaseStudy records, each carrying one generic `profile` placeholder shared with
    // the case detail page's "Applicant profile" Kv row (content/case-studies/*.md),
    // not six distinct hand-written meta lines. The three cards we do have use that
    // generic profile text, so it appears on the page; the specific meta wording for
    // the prototype's other three mock cards (which have no corresponding real case
    // record) cannot be reproduced and is allowlisted here:
    "[ep holder · 30–34 · technology · 6 years]",
    "[reapplication approved]",
    "[s pass holder · 35–39 · healthcare · 8 years]",
    "[family · ep holder, spouse and child]",
    "[founder · 40–44 · logistics]",
    "[pr since year · finance]",

    // Same root cause: cases.html's outcome cards show per-card image-source labels
    // ("Outcome document on file", "Video", "Google review"). CaseStudy.imageLabel is
    // fixed to "Redacted ICA outcome document" for every case per the task brief
    // (matching the case.html detail page's split-section image caption), so the
    // index cards show that text instead of the prototype's per-card labels.
    "outcome document on file",
  ],

  case: [
    // Trust strip is not present on the case detail page; no allowlist entries are
    // needed here. Every prototype placeholder on case.html is reproduced verbatim,
    // via the Markdown `[[X]]` → Ph conversion (lib/markdown.ts) for the case body
    // and the Kv rows for "At a glance" (see content/case-studies/*.md and
    // app/case-studies/[slug]/page.tsx).
  ],

  guides: [
    // Trust strip — same fixed-component substitution as above.
    "[Tradehub 21, full address]",

    // guides.html's "Start here." and "All guides." sections mock four and nine
    // cards respectively with hand-written titles. The live page builds both
    // sections from getGuides() at render time (see the task brief and
    // app/guides/page.tsx) — with only four real guide files on the site today,
    // that's four cards in each section, not four-plus-nine hand-written ones. The
    // four real guides' own titles do appear (should-i-apply-now-or-wait,
    // pr-document-checklist, appeal-or-reapply, what-ica-considers all match text
    // already on the page); the five other mocked "All guides" titles that have no
    // corresponding real guide file cannot be reproduced and are allowlisted here:
    "Singapore PR consultant fees compared",
    "What does a PR consultant actually do?",
    "PR for EP and S Pass holders",
    "PR for self-employed founders",
    "Singapore PR processing time and fees",
    "Appeals and reapplications",

    // guides.html's trailing "Article page layout" section (eyebrow "Article page
    // layout", <h2>, the two-card left column, the .prose body and its .source
    // block) is the template for the guide detail page, not index-page content —
    // per the task brief it is NOT ported to /guides. The template itself lives at
    // /guides/[slug] (see app/guides/[slug]/page.tsx and content/guides/*.md, whose
    // markdown body reproduces the placeholder paragraphs verbatim). These lines
    // belong to that unported sample-article section:
    "[Title as a question or plain statement]",
    '[Body in H2 sections, short paragraphs, with ICA citations inline as "Source: ICA, page, checked date".]',
    "Reviewed against official ICA information",
    "Last reviewed: [date] · Primary source: Immigration & Checkpoints Authority (ica.gov.sg) · Reviewed by: [name, role]",
    "GetSGPR is an independent consultancy and is not affiliated with or endorsed by ICA.",
    "Immigration policies and individual circumstances can change; ICA makes all final decisions.",
  ],

  faq: [
    // SourceBlock (components/ui/SourceBlock.tsx, shared fixed component): always
    // renders the placeholder label SITE.placeholders.checkedOn ("date checked") for
    // the last-reviewed date, not faq.html's bare "[date]" placeholder — same
    // "[date]" vs "[date checked]" mismatch as the other pages' SourceBlock entries
    // above (e.g. the "pr" key). No trust strip appears on this page.
    "last reviewed: [date] · primary source:",
  ],
};
