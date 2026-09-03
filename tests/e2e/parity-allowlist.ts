export const ALLOW: Record<string, string[]> = {
  home: [
    // Dropped stat (approval-rate stat removed by decision; brief §Step 3.3).
    "approval rate across cases we prepared",
    "Requires substantiation: basis and date range, or remove.",

    // Builder-note second sentences: the NOTE_PREFIX filter only matches the first
    // sentence of a multi-sentence note, so the note's remainder leaks through as a
    // "required" sentence even though the whole paragraph is a build instruction, not
    // customer copy, and the brief says to drop it.
    "Launch with real, permissioned quotes only, ideally pulled from the Google Business Profile with the date and public name.",
    "All six answers are the client's own live copy and must be reproduced verbatim.",

    // Hero eyebrow: rendered through the shared `.eyebrow` class, which sets
    // text-transform: uppercase (app/globals.css). Playwright's innerText reflects
    // CSS text-transform, so the rendered text is "SINGAPORE PR CONSULTANCY" while the
    // content file (correctly) holds the mixed-case source string. Every other eyebrow
    // on this page is under the 24-char sentence-length floor and never hits this; this
    // one is long enough to surface it. Not fixable from the content file without
    // changing the site-wide eyebrow style.
    "Singapore PR consultancy",

    // EligibilityChecker widget (components/widgets/EligibilityChecker.tsx, built in an
    // earlier task, out of this task's file list) renders one step of its 6-question →
    // email → result flow at a time; on a fresh page load only step 1 of 6 is in the
    // DOM. These sentences belong to the email-capture and result steps, which parity
    // (page.goto with no interaction) never reaches.
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

    // FAQ (components/ui/FaqList.tsx): native <details>, only openFirst's first item is
    // open by default; a closed <details>'s content is not part of the browser's
    // rendered innerText. Items 2–6 are closed on load, so their answer sentences can't
    // appear without a click parity.spec.ts never performs. (Item 1's answer is open
    // and does appear.)
    "We uphold transparency and honesty in our services, review your profile thoroughly and tell you plainly when waiting is the better move.",
    "Preparation generally takes one to three months, depending on how complete your documents are and how quickly employers and institutions respond.",
    "ICA's own processing time is separate.",
    "Documents not in English must be accompanied by an accepted translation.",
    "We coordinate translations where needed, at cost.",
    "Where a document genuinely cannot be obtained, we draft a declaration letter explaining its absence at no additional charge.",
    "Appeals are lodged through ICA's e-Service and assessed on their merits.",
    "We reassess the reasons with you and advise on appeal or re-submission.",
  ],
};
