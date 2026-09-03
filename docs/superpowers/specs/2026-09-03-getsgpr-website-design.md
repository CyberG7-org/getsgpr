# GetSGPR Production Website — Design Spec

Date: 2026-09-03
Status: approved by user (chat), pending implementation plan
Source of truth for layout and copy: `GetSGPR/prototype-bundle.html` (22 hash-routed pages, blue token set)
Strategy source: `C:\Users\cyber\Downloads\GetSGPR Competitive Website Strategy for Singapore Permanent Residence Consulting.pdf`

## 1. Goal

Turn the approved prototype into a production website for GetSGPR (Singapore PR consultancy) that:

- preserves the client's existing live URLs so search rankings and inbound links survive,
- is evidence-led and compliant (no success-rate claims, no "ICA approved/partner", independence disclaimer on every page),
- fills every fact the live site can supply and leaves the rest as visible gold placeholders for the client,
- deploys to Vercel with no runtime data dependencies.

## 2. Decisions (all confirmed by user on 2026-09-03)

| Decision | Choice |
|---|---|
| Stack | Next.js (latest, App Router, TypeScript strict), Tailwind v4, deployed on Vercel |
| Scope | All 22 prototype pages in this pass |
| Design source | `prototype-bundle.html` |
| Styling approach | Tailwind theme carrying the full token spec (not plain CSS, not a CMS) |
| Missing facts | Keep visible gold placeholders for anything the live site does not supply |
| Testimonials | Use the nine live quotes verbatim, each flagged `verified: false`, listed in the launch checklist |
| Repo | New folder `GetSGPR/site`, `git init`, one commit per plan task, no remote until asked |

## 3. Facts recovered from getsgpr.com (2026-09-03)

Fill these in; do not leave as placeholders.

| Fact | Value |
|---|---|
| Legal entity | SGPR Immigration Singapore (copyright line also uses "Get SGPR") |
| UEN | 53408306D |
| Address | 18 Boon Lay Way, #04-118, Tradehub 21, Singapore 609966 |
| Phone / WhatsApp | +65 8934 0818 (`https://wa.me/6589340818`) |
| Packages | SGPR Lite (DIY) SGD 197; SGPR Partnered (Do-With-You) SGD 497; SGPR Premium Concierge (Do-For-You) SGD 1,997 |
| Refund policy (Terms of Use) | "Once consultancy services have started, fees are non-refundable, even if applications are rejected." |
| Payment terms (Terms of Use) | Fees are communicated before service engagement |
| Governing law | Republic of Singapore, exclusive jurisdiction of Singapore courts |
| Guarantee stance (Packages page) | "We do not guarantee 100% success" |
| Privacy Policy | Contact is "Data Protection Officer" (unnamed); data not transferred outside Singapore; retention "only as long as necessary for service delivery, legal, or business purposes" |
| Eligibility categories (PR page) | Employment or S Pass Holder; Student in Singapore; Foreign Investor; Spouse of a Singapore Citizen or PR; Unmarried Child Under 21; Aged Parent of a Singapore Citizen |
| 4-step process | Submit Your Profile; Personalized Consultation; In-Depth Profile Assessment; ICA-Compliant Application Submission |
| Appeal window (Appeal page) | "generally within 6 months of the rejection date" |
| GHL form id | `z6a7dZmxkVc4lU8nayfJ` (iframe `https://api.leadconnectorhq.com/widget/form/z6a7dZmxkVc4lU8nayfJ`, needs `https://link.msgsndr.com/js/form_embed.js`) |
| GHL chat widget id | `685385ad2eeadb3322507b55` (`https://widgets.leadconnectorhq.com/loader.js`) |

### Package inclusions (verbatim from live package pages)

**Lite (SGD 197)** — "Your complete self-guided toolkit for Singapore PR or Citizenship applications"; "resources, structure, and templates for a well-prepared application"; bonuses: "Sample filled ICA Form 4A", "Singapore integration checklist", "PR Readiness Self-Assessment Scorecard"; "Downloadable PDFs, checklists, and templates"; "Optional portal login with lifetime access (for upgraded buyers)"; "Mobile-optimized and print-friendly versions". Not suitable for: "Applicants with weak profiles who need custom strategy"; "Those needing form-filling help or profile analysis"; "People who already got rejected (should upgrade to Tier 2 or 3)". Submission assistance and drafting: not included.

**Partnered (SGD 497)** — toolkit plus "Editable Form 4A sample"; "ICA rejection-prevention checklist"; "Cover letter starter kit (if you don't have a draft)"; "Shared Google Drive folder for feedback"; "All resources available via secure PDF download"; "Zoom call link auto-booking provided". Not suitable for: "Applicants who need full document management or done-for-you writing"; "Those unsure how to fill Form 4A — better served by Tier 3"; "Applicants needing ICA submission done on their behalf". Submission: applicant submits independently. Drafting: starter kit only.

**Premium Concierge (SGD 1,997)** — "all-in-one, white-glove PR/citizenship application service": strategy and planning, document writing and preparation, ICA portal submission, success coaching. Bonuses: "PR Roadmap (2025–2030): Citizenship projection, family expansion advice"; "Social integration guide: CC groups, grassroots orgs, volunteering paths"; "PR Readiness Profile Report (PDF summary of your strengths)". Format: "Shared secure Google Drive folder"; "Live calendar link to book calls or request updates"; "Optional in-person collection meeting" (SG-based clients only). Not suitable for: "People on a tight budget"; "Those who enjoy DIY processes"; "Applicants with incomplete documents or unresolved legal issues".

### Testimonials (verbatim, live site, all five stars, none verified)

| Name | Quote | Type |
|---|---|---|
| John Tan | "The team guided me step-by-step and made my PR approval process simple and fast." | Singapore PR Application |
| Priya Nair | "Excellent service with attention to detail. My citizenship application went smoothly!" | Citizenship Application |
| Mr. Chen Wei | "Very professional support, handled all documentation perfectly for my wife's LTVP." | LTVP for Spouse |
| Sarah Lim | "Fast response, professional advice, and friendly consultants. Highly recommend!" | Singapore PR Application |
| Mr. Ahmad | "Thank you for helping me secure my S Pass and job transfer without hassle." | Work Pass Application |
| Olivia Tan | "After my first rejection, they helped me successfully appeal and get my PR approved." | PR Appeal Assistance |
| Jason Koh | "As a self-employed applicant, their expert advice was crucial for my approval." | Business Owner PR |
| Emily Wong | "Entire family PR application handled smoothly — grateful for their expertise!" | Family PR Application |
| Rajesh Kumar | "Professional, fast, and very transparent process. The best consultancy experience." | Citizenship Appeal |

### Facts the live site does NOT supply (remain gold placeholders)

Email (live site publishes `mail@example.com`, template debris), opening hours, consultant names and roles, founding year, Google rating and review count, DPO name, response-time promises, all dates ("checked on" dates, month/year on outcomes), case-study narratives, guide bodies.

## 4. Routes

Exactly the prototype's `data-url` values. Never change the seven that match live URLs.

| Route | Prototype page key | Source |
|---|---|---|
| `/` | home | Hero, eligibility checker, services, process, testimonials, pricing, FAQ, contact |
| `/pr-readiness-review` | readiness | 8-factor diagnostic, three outcomes |
| `/services` | services | Overview of four services |
| `/permanent-resident-sg` | pr | Flagship service (live URL) |
| `/permanent-resident-sg/first-time-application` | pr-first-time | Applicant sub-page |
| `/permanent-resident-sg/family-spouse` | pr-family | Applicant sub-page |
| `/permanent-resident-sg/ep-s-pass-holders` | pr-ep | Applicant sub-page |
| `/permanent-resident-sg/founders-self-employed` | pr-founders | Applicant sub-page |
| `/singapore-citizen` | citizenship | Service (live URL) |
| `/ltvp` | ltvp | Service (live URL) |
| `/pr-appeal` | appeal | Service (live URL) |
| `/packages` | packages | Three tiers plus comparison table |
| `/sgpr-lite-diy-tier` | pkg-lite | Package (live URL) |
| `/sgpr-partnered-do-with-you` | pkg-partnered | Package (live URL) |
| `/sgpr-premium-concierge` | pkg-concierge | Package (live URL) |
| `/case-studies` | cases | Index |
| `/case-studies/[slug]` | case | Detail, from Markdown; ship with the prototype's placeholder cases |
| `/about` | about | Firm, stance, testimonials (no team page, no named specialists — removed by user 2026-09-02) |
| `/privacy-data-security` | privacy | Privacy and data security |
| `/guides` | guides | Index, from Markdown |
| `/guides/singapore-pr-faq` | faq | FAQ |
| `/contact` | contact | GHL form, WhatsApp, expectations |

### Permanent (308/301) redirects from old GoHighLevel URLs

`/home → /`, `/about-us → /about`, `/contactus → /contact`, `/service → /services`, `/package → /packages`, `/privacy-policy → /privacy-data-security`, `/terms-of-use → /privacy-data-security#terms` (until a Terms page exists; the refund and governing-law text from the live Terms is carried into the privacy page's Terms section).

Generated `sitemap.xml` (all 22 routes plus case-study and guide slugs) and `robots.txt`.

## 5. Design tokens (Tailwind v4 `@theme`)

Colors: ink #0A1223; navy-900 #111B33; navy-700 #1B2B57 (primary brand); navy-500 #111E42 (button hover); blue-300 #93AEDC; blue-200 #A9BFE4; blue-100 #C6D2E6; blue-50 #CFDDF5; slate-500 #4C5670; slate-400 #7C879C; slate-300 #9AA4B8; line #E7EBF3; line-soft #EDF1F8; input-line #DFE4EF; paper #F6F8FC; paper-alt #EEF2F9; paper-warm #F7F4EF; paper-cool #EDF1F8; on-dark #EFF3FA; on-dark-muted #B9C8E2.

Accents with tint backgrounds: teal #0E7C86 / #DFF1F2 (PR, LTVP); red #C0272D / #FBE9EA (Citizenship, Appeal, errors); amber #B26A00 / #FBF0DE (Concierge); violet #5B4B9E / #EAE7F5 (Partnered); green #1F7A4D / #E3F3EA (success); gold #9A6A0C / #F7EAC9 (placeholders only).

Fonts: Bricolage Grotesque (display, `opsz` 12..96, weights 400–700, set `font-variation-settings: "opsz" 96` on h1–h3, 24 on h4) and Work Sans (body, 400/500/600), loaded through `next/font/google`.

Type scale: h1 hero 54–72px / 600 / 1.02 / -0.035em (mobile clamp(30px, 8.4vw, 44px)); h2 46px / 600 / 1.08 / -0.035em (mobile clamp(25px, 6.2vw, 33px)); h3 22–27px / 600 / 1.15–1.2 / -0.02 to -0.03em (mobile 18px); price 44–48px / 600 / -0.035em; lead 19.5px / 1.6; body 16.5px / 1.65; body-small 15.5px / 1.62; meta 13.5px; eyebrow 12.5px / 600 / 0.1em uppercase; fine 12px; button 15–16px / 500–600. `text-wrap: pretty` on headings and paragraphs.

Spacing: section gap 112px desktop, 64px mobile; container 1240px with 28px gutters (18px mobile); narrow container 940px. Card padding 34×32 (30 compact, 68×56 feature panels, 34×24 mobile). Grid gaps 18px (14px mobile).

Radius: buttons/inputs 12px; chips/nav 9–11px; cards 20–22px; feature panels 26px; pills 100px.

Shadows: card `0 1px 3px rgba(17,27,51,.06), 0 18px 40px -24px rgba(17,27,51,.18)`; form `0 12px 30px -22px rgba(17,27,51,.4)`.

Motion: keyframes riseIn (0.85s both, stagger 60ms per card), floaty (13–24s), spinSlow (65–145s); card hover translateY(-5px) + border blue-200 over 0.35s; button hover background darken 0.2s. A single `@media (prefers-reduced-motion: reduce)` block disables all animation and transitions.

## 6. Architecture

```
site/
  app/
    layout.tsx            fonts, <Header/>, <Footer/>, <ActionBar/>, <ChatWidget/>, JSON-LD
    page.tsx              home
    <route>/page.tsx      one folder per route in §4
    case-studies/[slug]/page.tsx   generateStaticParams from content/case-studies
    guides/[slug]/page.tsx         generateStaticParams from content/guides
    sitemap.ts, robots.ts, not-found.tsx
  components/
    layout/  Header, MobileNav, Footer, ActionBar
    ui/      Button, Badge, Chip, Card, SectionHead, Eyebrow, Step, FaqList, CtaBand,
             PriceCard, ComparisonTable, Prose, Disclaimer, Shapes, Reveal, Ph
    forms/   GhlForm (iframe), EligibilityChecker (client), ChatWidget (client, next/script)
  content/
    site.ts               entity, UEN, address, phone, WhatsApp, placeholders for email/hours
    nav.ts                header and footer link trees
    pages/*.ts            typed copy for each static page
    services.ts           data driving the eight service pages (four services + four PR sub-pages)
    packages.ts           three tiers, inclusions, not-suitable-for, refund policy
    testimonials.ts       nine entries, `verified: false`
    case-studies/*.md     frontmatter: title, slug, outcome, profile, package, date (placeholder)
    guides/*.md           frontmatter: title, slug, summary, checkedOn (placeholder)
  lib/
    content.ts            Markdown loading (gray-matter + remark) and typed accessors
    compliance.ts         forbidden-phrase list shared by lint and tests
  scripts/
    audit-placeholders.ts prints every <Ph> occurrence by route
    lint-compliance.ts    fails if a forbidden phrase appears outside a <Ph>
  tests/e2e/smoke.spec.ts Playwright: all routes 200, one h1, disclaimer present, no forbidden phrases
  docs/                   this spec and the implementation plan (copied in at scaffold)
```

Rules:

- Components hold no copy. All strings come from `content/`.
- `<Ph label="Email" />` renders `<span class="ph">[Email]</span>` styled gold; it is the only way to emit a bracketed placeholder.
- Service pages and package pages are rendered by one template each, fed by `services.ts` / `packages.ts`.
- Client components are limited to EligibilityChecker, ChatWidget, MobileNav toggle, Reveal (IntersectionObserver), and FaqList if it needs more than native `<details>` (prefer native).

## 7. Integrations

- **GHL form**: `<GhlForm />` renders the iframe with the live form id and loads `form_embed.js` once via `next/script` (strategy `lazyOnload`). Used on `/contact` and the Home contact section.
- **GHL chat widget**: `<ChatWidget />` in the root layout, `next/script` strategy `afterInteractive`, the live `data-widget-id`.
- **WhatsApp**: all WhatsApp CTAs link to `https://wa.me/6589340818`; the sticky mobile action bar shows WhatsApp and Book a call (`/contact`).
- **Analytics**: none until the client supplies an ID; leave a documented slot in `layout.tsx`.

## 8. SEO and compliance

- Per-route `metadata` (title, description) taken from the prototype's `data-title` and copy deck; canonical set from `metadataBase` (`https://getsgpr.com`); default Open Graph image placeholder.
- `LocalBusiness` JSON-LD in the root layout with name, UEN (as `identifier`), address, telephone, `areaServed: Singapore`.
- Independence disclaimer in the footer of every page: GetSGPR is a private consultancy, not affiliated with or endorsed by ICA; outcomes are decided solely by ICA.
- Forbidden phrases (build fails if present outside `<Ph>`): "high success rate", "success rate", "guaranteed", "guarantee approval", "ICA approved", "ICA partner", "ICA-endorsed", any `NN%` approval figure. Live-site claim "Transparent process with high success rates" is NOT carried over.
- Three diagnostic outcomes (Ready to Prepare / Strengthen First / More Information Needed) and the 8-factor PR Readiness Review vocabulary are preserved from the prototype.
- No team page and no named-specialist modules (user removed them 2026-09-02).

## 9. Testing and verification

- `npm run build` and `npm run lint` clean; TypeScript strict.
- `npm run lint:compliance` runs on prebuild.
- `npm run audit:placeholders` outputs the launch checklist table.
- Playwright smoke: for every route in `content/nav.ts` plus generated slugs, expect 200, exactly one `h1`, the disclaimer text, no forbidden phrase in body text, no console errors.
- Redirect test: each old URL returns 308/301 to its target.
- Visual check in the preview browser at 1440px and 375px for Home, PR, Packages, Contact; reduced-motion check via emulation.

## 10. Delivery and launch checklist (goes into README)

1. Facts to supply: email, opening hours, consultant names/roles (if any are to be shown), founding year, Google rating and review count with the date checked, DPO name, response-time promises, all "checked on" dates.
2. Testimonials: confirm permission and add month/year for each of the nine; remove any that cannot be verified.
3. Case studies and guides: replace placeholder Markdown with real content.
4. Vercel: import repo, set production domain `getsgpr.com`, verify the seven redirects, submit sitemap in Search Console.
5. GHL: confirm form id and chat widget id still belong to the client's account.
6. Terms of Use: decide whether a standalone `/terms-of-use` page returns (currently redirected).

## 11. Out of scope

Blog, CMS, analytics wiring, payment checkout, multilingual, team page.
