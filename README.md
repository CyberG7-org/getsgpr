# GetSGPR — production website

Marketing and lead-generation site for **SGPR Immigration Singapore** (UEN 53408306D), trading as GetSGPR: 18 Boon Lay Way, #04-118, Tradehub 21, Singapore 609966. Phone / WhatsApp +65 8934 0818.

Next.js 16 (App Router), Tailwind v4, TypeScript, Vitest (unit), Playwright (e2e).

## Stack and scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the dev server on port 3000. |
| `npm run build` | Production build. Runs `prebuild` first, which runs `lint:compliance` — a failing compliance lint fails the build. |
| `npm run start` | Start the production server after `build`. |
| `npm run lint` | `next lint` / ESLint. |
| `npm run test` | Vitest unit tests (`vitest run`). |
| `npm run test:watch` | Vitest in watch mode. |
| `npm run e2e` | Playwright e2e suite. Builds and boots the app on port 3100 first (see `playwright.config.ts`). |
| `npm run lint:compliance` | Runs `scripts/lint-compliance.ts` — see [Compliance lint](#compliance-lint). |
| `npm run audit:placeholders` | Prints a Markdown table of every `[[…]]` / `<Ph label="…">` placeholder in `content/`, `components/`, `app/`, grouped by label. See `docs/placeholder-audit.md` for the current snapshot. |

Routing, `sitemap.xml` and `robots.txt` are generated from `content/nav.ts` (`NAV.routes`) and `content/site.ts` (`SITE.url`) — see `app/sitemap.ts` and `app/robots.ts`. A route added to a page but not to `NAV.routes` will not appear in the sitemap or be covered by the smoke/parity e2e tests.

## Environment

Copy `.env.example` to `.env.local` and fill in as needed:

- `GHL_LEAD_WEBHOOK_URL` — optional. When set, `POST /api/lead` forwards checker and readiness-review submissions to this URL (a GoHighLevel inbound webhook) as JSON with a `receivedAt` timestamp appended. When unset, the API still validates and accepts the lead (`forwarded: false` in the response) but nothing is sent anywhere.
- `NEXT_PUBLIC_SITE_URL` — the public origin used for `metadataBase`, canonical URLs and the sitemap. Defaults to `https://getsgpr.com` if unset (see `app/layout.tsx`).

GoHighLevel form id `z6a7dZmxkVc4lU8nayfJ` and chat widget id `685385ad2eeadb3322507b55` are set directly in `content/site.ts` (`SITE.ghl`), not as env vars — confirm both are still correct before launch.

## Content editing

Nothing in `components/` holds copy. Every page is assembled in `components/Page.tsx` from an array of typed content blocks (`Block` in `content/types.ts`; the switch that renders each `kind` lives in `components/blocks/Blocks.tsx`), and the copy for each block lives in `content/`:

- `content/pages/*.ts` — one file per route (e.g. `home.ts`, `pr.ts`, `packages.ts`, `contact.ts`), each exporting the page's `Block[]`.
- `content/services.ts` — the shared services index used to build the Services dropdown and cross-links.
- `content/packages.ts`, `content/testimonials.ts` — shared structured data (pricing tiers, the nine testimonials).
- `content/guides/*.md`, `content/case-studies/*.md` — long-form Markdown for the Knowledge Centre guides and case-study pages (rendered via `remark`/`remark-html`, front matter parsed with `gray-matter`).
- `content/site.ts` — sitewide facts: legal name, UEN, address, phone, disclaimer, GHL ids, and the `SITE.placeholders` label map.
- `content/nav.ts` — header/footer navigation and `NAV.routes`, the single source of truth for every route that must exist, be in the sitemap, and be smoke-tested.

**Rich-text syntax** — any copy string can use (parsed by `lib/rich.ts`, rendered by `components/ui/RichText.tsx`):

- `[[placeholder]]` — an unresolved fact, rendered as a visibly-bracketed `<Ph>`-style placeholder (see below).
- `**bold**` — inline emphasis.
- `[label](href)` — a link.

**The `<Ph>` rule** — `[[…]]` in a copy string and `<Ph label="…">` in TSX are the *only* two ways a placeholder may appear anywhere in `content/`, `components/`, or `app/`. Anything the live site does not publish (email address, opening hours, Google rating, DPO name, "date checked" stamps) must go through one of these two forms so it renders as a clearly-marked placeholder instead of an invented fact, and so `npm run audit:placeholders` can find it. Do not write "TBD", "TODO", `XXX`, or a guessed-at fact directly into copy.

## Compliance lint

`npm run lint:compliance` runs before every build (`prebuild`) and fails it if either check fails:

1. **Forbidden claims** (`lib/compliance.ts`, `FORBIDDEN`) — the build fails if any rendered page text matches a banned promotional/approval-adjacent pattern: "success rate(s)", "high success rate(s)", "guaranteed approval" (with negations like "never guaranteed approval" allowed), "ICA-approved" / "ICA-partner" / "ICA-endorsed", or a bare `NN% approval`/`NN% success` figure. These are the specific claims Singapore's immigration-consultancy advertising rules and ICA's own positioning make risky or false for an independent consultancy to make. The same list is asserted again per-route in the e2e smoke tests.
2. **Placeholder discipline** — the script re-uses the same scan as `audit:placeholders` and (via `stripPlaceholders` in `lib/compliance.ts`) strips `<span class="ph">…</span>` and `[[…]]` runs before checking prose, so a placeholder's bracket text itself never trips the forbidden-claims check.

If `lint:compliance` fails, the fix is almost always either rewording the offending copy in `content/` or wrapping an unverified fact in `[[…]]` / `<Ph>` rather than stating it outright — never suppressing or editing the rule.

## Readiness rubric summary

The free readiness checker (`/pr-readiness-review`) asks 15 questions across four groups (current pass, age, qualifications; residence and work; family and ties; evidence and timing) and scores them in `assess()` in `lib/readiness.ts`. In prose:

- **Strong / weak factors** are read directly off individual answers — residence continuity, employment stability, "economic contribution" (mid salary bands), qualifications, a Singapore-obtained qualification, family ties to a citizen/PR, recent community/integration evidence, evidence currency, and cross-document consistency. A prior rejection is always logged as a weak factor.
- **Outcome** is one of three: **Ready to Prepare** (default), **Strengthen First**, or **More Information Needed**.
  - Routed to *More Information Needed* if the pass type is "Other", the salary band is "self-employed, variable", the applicant is self-employed/business owner, or they were rejected before and "nothing significant" has changed since — these need a conversation, not a form.
  - Otherwise routed to *Strengthen First* if residence is under a year, evidence is stale, cross-document consistency is unclear/known-inconsistent, a prior rejection's "what changed" answer is thin, employment tenure is under 6 months, or three or more factors came back weak.
  - Otherwise *Ready to Prepare*.
- **Actions** — up to three, drawn in priority order from: get a current employment letter and six months of payslips; reconcile dates/titles across CV, payslips, CPF and employment letters; document recent community involvement; build a longer residence record; document what changed since a prior rejection; assemble evidence against ICA's checklist with dates; write a one-page consistent cover narrative; book the free call.
- **Package recommendation** — Premium Concierge for a second-or-later rejection, a rejection with little material change, or two-plus family members being included; SGPR Lite for "Strengthen First" with at most one weak factor; SGPR Partnered otherwise.

## Launch checklist

### 1. Facts to supply

Everything below renders as a bracketed placeholder (`[[…]]` / `<Ph>`) until a real value is supplied. Full detail — every occurrence and file — is in `docs/placeholder-audit.md` (regenerate with `npm run audit:placeholders`); the most load-bearing ones:

| Placeholder | Occurrences | Where |
|---|---|---|
| `date` / "date checked" stamps | 14 | Service pages, FAQ, privacy, guides |
| "One sentence." (page-specific micro-copy) | 23 | Service pages, case studies index |
| "Verified outcome" / "Verified outcome and month/year." | 20 | Service pages, home, `Cards.tsx` |
| `x` (numeric placeholders — fees, day counts) | 28 | Service pages, packages, privacy |
| include / exclude toggles | 6 | Packages content and `Packages.tsx` |
| `month` / date stamps on case studies | 10 | Case study Markdown + `cases.ts` |
| Guide body/section placeholders | 32 | The four `content/guides/*.md` files |
| Email address | 3 | `about.ts`, `contact.ts`, `privacy.ts` |
| Opening hours | 2 | `about.ts`, `contact.ts` |
| DPO name | 2 | `privacy.ts` |
| Google rating / review count | — | `SITE.placeholders`, rendered where reviews are shown |

The full audit lists 278 placeholders across 94 distinct labels as of this commit. One row in the raw audit (`^\` in `components/ui/FaqList.tsx`) is a false positive — the scanner's `[[…]]` regex matches against its own escaped regex literal used to strip placeholders from FAQ JSON-LD, not an actual placeholder — and can be ignored.

### 2. Testimonials

`content/testimonials.ts` has nine testimonials (John Tan, Priya Nair, Mr. Chen Wei, Sarah Lim, Mr. Ahmad, Olivia Tan, Jason Koh, Emily Wong, Rajesh Kumar), all currently marked `verified: false`. Before launch: confirm written/recorded permission from each named client to publish their name and quote, add the month/year the testimonial was given, flip `verified` to `true` once confirmed, and remove any testimonial that cannot be verified or permissioned in time.

### 3. Case studies and guides

`content/case-studies/sample-*.md` and the four files in `content/guides/` are sample Markdown with bracketed placeholders throughout (profile lines, factor tables, sourced ICA citations with "checked date" stamps). Replace with real, evidenced case studies and guide bodies — every ICA-sourced claim in the guides needs an inline "Source: ICA, page, checked [[date]]" citation, per the existing placeholder pattern.

### 4. Social links

Google Business Profile, LinkedIn and Facebook links were deliberately omitted — the live site does not publish any of these. Add them (to `content/site.ts` and footer/header nav) only once real, live profile URLs exist.

### 5. Vercel

- Import this repository into Vercel.
- Set `GHL_LEAD_WEBHOOK_URL` and `NEXT_PUBLIC_SITE_URL` (production value `https://getsgpr.com`) as environment variables.
- Point the production domain at `getsgpr.com`.
- After deploy, verify all seven redirects in `lib/redirects.ts` resolve correctly, e.g.:
  ```
  curl -I https://getsgpr.com/home
  curl -I https://getsgpr.com/about-us
  curl -I https://getsgpr.com/contactus
  curl -I https://getsgpr.com/service
  curl -I https://getsgpr.com/package
  curl -I https://getsgpr.com/privacy-policy
  curl -I https://getsgpr.com/terms-of-use
  ```
  Each should return a `308` with the expected `location` header.
- Submit `https://getsgpr.com/sitemap.xml` in Google Search Console.

### 6. GoHighLevel

Confirm the form id (`z6a7dZmxkVc4lU8nayfJ`) and chat widget id (`685385ad2eeadb3322507b55`) in `content/site.ts` still match the live GHL account, and create the inbound webhook GHL-side that `GHL_LEAD_WEBHOOK_URL` will point to, so checker and readiness-review leads land in the CRM.

### 7. `/terms-of-use`

Currently `/terms-of-use` permanently redirects to `/privacy-data-security#terms` (`lib/redirects.ts`), i.e. terms live as a section of the privacy page rather than a standalone route. Decide before launch whether that is the intended final structure or whether `/terms-of-use` should become its own page — if the latter, remove the redirect, add the route to `content/nav.ts` `NAV.routes`, and give it its own content file under `content/pages/`.
