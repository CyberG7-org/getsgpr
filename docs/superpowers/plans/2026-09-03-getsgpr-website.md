# GetSGPR Production Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the 22-page GetSGPR production website in Next.js on Vercel, ported faithfully from `prototype-bundle.html`, with real facts from the live site filled in and every unresolved fact left as a visible gold placeholder.

**Architecture:** Next.js App Router with static generation. Every page is a typed content file (a list of "blocks") rendered by one `<Blocks>` renderer built from a small component library; components hold no copy. Tailwind v4 carries the token spec as a theme; a handful of multi-state patterns (nav dropdown, FAQ marker, checker) live in `@layer components`. Two client widgets (eligibility checker, readiness questionnaire) post leads to one route handler that forwards to a GoHighLevel webhook when configured.

**Tech Stack:** Next.js 15+ (App Router, TypeScript strict), React 19, Tailwind CSS v4, `next/font/google`, `gray-matter` + `remark` + `remark-html` for Markdown, Vitest (unit), Playwright (e2e + parity), ESLint (next config).

**Spec:** `docs/superpowers/specs/2026-09-03-getsgpr-website-design.md` (copied into `site/docs/` in Task 1). Prototype reference files: `reference/prototype/<page>.html`, `reference/prototype/styles.css`, `reference/prototype/app.js` (created 2026-09-03 by `reference/split.py`).

## Global Constraints

- Repo root for all commands: `C:\Users\cyber\Downloads\Claude MCP\GetSGPR\site` (created in Task 1). Shell is PowerShell 5.1: no `&&`; chain with `;`.
- Node 24.15.0, npm 11.6.2. Use `npm`, not pnpm or yarn.
- Routes are exactly the spec §4 list. The seven live URLs must never change: `/permanent-resident-sg`, `/singapore-citizen`, `/ltvp`, `/pr-appeal`, `/sgpr-lite-diy-tier`, `/sgpr-partnered-do-with-you`, `/sgpr-premium-concierge`.
- Redirects (permanent): `/home→/`, `/about-us→/about`, `/contactus→/contact`, `/service→/services`, `/package→/packages`, `/privacy-policy→/privacy-data-security`, `/terms-of-use→/privacy-data-security#terms`.
- Facts to fill everywhere (never placeholders): entity "SGPR Immigration Singapore"; UEN 53408306D; address "18 Boon Lay Way, #04-118, Tradehub 21, Singapore 609966"; phone/WhatsApp "+65 8934 0818" (`https://wa.me/6589340818`); prices S$197 / S$497 / S$1,997; refund policy "Once consultancy services have started, fees are non-refundable, even if applications are rejected."
- Facts that stay placeholders: email, opening hours, consultant names/roles, founding year, Google rating and review count, DPO name, response-time promises other than the prototype's "24 hours", all "checked on" dates, case-study and guide bodies.
- Placeholders are emitted ONLY through `<Ph>` (or `[[text]]` in rich strings, which renders `<Ph>`). Never write literal `[brackets]` in JSX.
- Forbidden phrases outside `<Ph>` (build fails): "high success rate", "success rate", "guaranteed approval", "guarantee approval", "ICA approved", "ICA-approved", "ICA partner", "ICA-endorsed", and any `\d+%` adjacent to "approval" or "success". The prototype's "[90%] approval rate" stat is removed, not ported.
- Prototype builder notes are NOT copy and must not be ported: any paragraph starting "Layout note", "Placeholder structure", "Mark up as schema.org", "Placeholder copy", "Layout of the page shown after".
- No team page and no named-specialist modules.
- Independence disclaimer (verbatim, footer of every page): "GetSGPR is an independent consultancy and is not affiliated with, licensed by or endorsed by the Immigration & Checkpoints Authority (ICA) or any government agency. ICA assesses every application on its own merits and makes all final decisions. Nothing on this website is a promise or prediction of approval."
- All animation wrapped in `@media (prefers-reduced-motion: reduce)` which disables it entirely.
- Commit after every task with the message given in the task, ending with `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.
- Tests: `npm run test` (Vitest) and `npm run e2e` (Playwright) must pass at the end of every task that touches them. `npm run build` must pass at the end of every task.

## File map

```
site/
  package.json, next.config.ts, tsconfig.json, eslint.config.mjs, postcss.config.mjs
  vitest.config.ts, playwright.config.ts, .env.example, .gitignore, README.md
  docs/superpowers/specs/2026-09-03-getsgpr-website-design.md   (copied)
  docs/superpowers/plans/2026-09-03-getsgpr-website.md          (copied)
  app/
    globals.css                 tokens (@theme), base type, keyframes, reduced motion, components layer
    layout.tsx                  fonts, Header, Footer, ActionBar, ChatWidget, JSON-LD
    page.tsx                    home
    sitemap.ts  robots.ts  not-found.tsx
    api/lead/route.ts           POST → GHL webhook (env) or 202 no-op
    pr-readiness-review/page.tsx
    services/page.tsx
    permanent-resident-sg/page.tsx
    permanent-resident-sg/first-time-application/page.tsx
    permanent-resident-sg/family-spouse/page.tsx
    permanent-resident-sg/ep-s-pass-holders/page.tsx
    permanent-resident-sg/founders-self-employed/page.tsx
    singapore-citizen/page.tsx   ltvp/page.tsx   pr-appeal/page.tsx
    packages/page.tsx
    sgpr-lite-diy-tier/page.tsx  sgpr-partnered-do-with-you/page.tsx  sgpr-premium-concierge/page.tsx
    case-studies/page.tsx        case-studies/[slug]/page.tsx
    about/page.tsx               privacy-data-security/page.tsx
    guides/page.tsx              guides/[slug]/page.tsx
    contact/page.tsx
  components/
    layout/Header.tsx  MobileNav.tsx  Footer.tsx  ActionBar.tsx  Brand.tsx
    ui/Ph.tsx  RichText.tsx  Button.tsx  Badge.tsx  Eyebrow.tsx  SectionHead.tsx  Section.tsx
       Reveal.tsx  Shapes.tsx  ImagePh.tsx  FaqList.tsx  CtaBand.tsx  SourceBlock.tsx
       Prose.tsx  Kv.tsx  DataTable.tsx
    blocks/Blocks.tsx  Hero.tsx  Trust.tsx  Stats.tsx  Honesty.tsx  Cards.tsx  Tiles.tsx
       Items.tsx  Steps.tsx  Packages.tsx  Reviews.tsx  ContactSplit.tsx  Honest.tsx
       SampleResult.tsx  Crumbs.tsx  Filters.tsx  SplitProse.tsx  Text.tsx
    widgets/EligibilityChecker.tsx  ReadinessForm.tsx  GhlForm.tsx  ChatWidget.tsx
  content/
    site.ts  nav.ts  testimonials.ts  packages.ts  services.ts  types.ts
    pages/home.ts  readiness.ts  services.ts  packages.ts  about.ts  contact.ts  privacy.ts
          cases.ts  guides.ts  faq.ts  pkg-lite.ts  pkg-partnered.ts  pkg-concierge.ts
    case-studies/*.md   guides/*.md
  lib/rich.ts  compliance.ts  markdown.ts  checker.ts  readiness.ts  metadata.ts  lead.ts
  scripts/lint-compliance.ts  audit-placeholders.ts
  tests/unit/*.test.ts(x)
  tests/e2e/smoke.spec.ts  parity.spec.ts  redirects.spec.ts  parity-allowlist.ts
```

---

### Task 1: Scaffold the Next.js app, redirects, git

**Files:**
- Create: `site/` via create-next-app, `site/next.config.ts`, `site/.env.example`, `site/docs/...` (copies)
- Test: `site/tests/unit/config.test.ts`

**Interfaces:**
- Produces: `next.config.ts` exporting `redirects()`; `REDIRECTS` constant exported from `lib/redirects.ts` as `{ source: string; destination: string }[]`.

- [ ] **Step 1: Scaffold**

Run from `C:\Users\cyber\Downloads\Claude MCP\GetSGPR`:

```powershell
npx --yes create-next-app@latest site --ts --tailwind --eslint --app --src-dir=false --import-alias "@/*" --use-npm --no-turbopack --yes
```

Expected: `site/` exists with `app/`, `package.json`, `next.config.ts`, `postcss.config.mjs`, `app/globals.css` containing `@import "tailwindcss";`.

- [ ] **Step 2: Init git and copy docs**

```powershell
cd site; git init -b main; New-Item -ItemType Directory -Force docs\superpowers\specs, docs\superpowers\plans | Out-Null; Copy-Item ..\docs\superpowers\specs\2026-09-03-getsgpr-website-design.md docs\superpowers\specs\; Copy-Item ..\docs\superpowers\plans\2026-09-03-getsgpr-website.md docs\superpowers\plans\
```

- [ ] **Step 3: Install test tooling**

```powershell
npm i -D vitest @vitejs/plugin-react jsdom @playwright/test tsx; npm i gray-matter remark remark-html; npx playwright install chromium
```

- [ ] **Step 4: Write the failing redirect test**

`tests/unit/config.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { REDIRECTS } from "@/lib/redirects";

describe("redirects", () => {
  it("maps every old GoHighLevel URL permanently", () => {
    const map = Object.fromEntries(REDIRECTS.map((r) => [r.source, r.destination]));
    expect(map).toEqual({
      "/home": "/",
      "/about-us": "/about",
      "/contactus": "/contact",
      "/service": "/services",
      "/package": "/packages",
      "/privacy-policy": "/privacy-data-security",
      "/terms-of-use": "/privacy-data-security#terms",
    });
    expect(REDIRECTS.every((r) => r.permanent)).toBe(true);
  });
});
```

`vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", include: ["tests/unit/**/*.test.{ts,tsx}"] },
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
});
```

Add to `package.json` scripts: `"test": "vitest run"`, `"test:watch": "vitest"`, `"e2e": "playwright test"`, `"lint:compliance": "tsx scripts/lint-compliance.ts"`, `"audit:placeholders": "tsx scripts/audit-placeholders.ts"`, `"prebuild": "npm run lint:compliance"` (the script file arrives in Task 4; until then prebuild would fail, so add `prebuild` in Task 4, not now).

- [ ] **Step 5: Run test to verify it fails**

Run: `npm run test`
Expected: FAIL, cannot resolve `@/lib/redirects`.

- [ ] **Step 6: Implement redirects and config**

`lib/redirects.ts`:

```ts
export const REDIRECTS = [
  { source: "/home", destination: "/", permanent: true },
  { source: "/about-us", destination: "/about", permanent: true },
  { source: "/contactus", destination: "/contact", permanent: true },
  { source: "/service", destination: "/services", permanent: true },
  { source: "/package", destination: "/packages", permanent: true },
  { source: "/privacy-policy", destination: "/privacy-data-security", permanent: true },
  { source: "/terms-of-use", destination: "/privacy-data-security#terms", permanent: true },
] as const;
```

`next.config.ts`:

```ts
import type { NextConfig } from "next";
import { REDIRECTS } from "./lib/redirects";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return REDIRECTS.map((r) => ({ ...r }));
  },
};

export default nextConfig;
```

`.env.example`:

```
# Optional. When set, /api/lead forwards checker and readiness submissions here (GHL inbound webhook URL).
GHL_LEAD_WEBHOOK_URL=
# Public site origin used for canonical URLs and sitemap.
NEXT_PUBLIC_SITE_URL=https://getsgpr.com
```

- [ ] **Step 7: Run tests and build**

Run: `npm run test; npm run build`
Expected: test PASS; build succeeds with the default page.

- [ ] **Step 8: Commit**

```powershell
git add -A; git commit -m "chore: scaffold Next.js app with Tailwind, redirects, test tooling

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 2: Design tokens, fonts and global styles

**Files:**
- Modify: `app/globals.css`, `app/layout.tsx`
- Test: `tests/unit/tokens.test.ts`

**Interfaces:**
- Produces: Tailwind theme colour names `ink navy-900 navy-700 navy-500 blue-300 blue-200 blue-100 blue-50 slate-500 slate-400 slate-300 line line-soft input-line paper paper-alt paper-warm paper-cool on-dark on-dark-muted teal teal-bg red red-bg amber amber-bg violet violet-bg green green-bg gold gold-bg` (use as `bg-navy-700`, `text-teal`, `border-line`); font utilities `font-display`, `font-body`; radii `rounded-btn rounded-chip rounded-card rounded-panel`; shadows `shadow-card shadow-form`; animation utilities `animate-rise`, `animate-floaty`, `animate-spin-slow`; component classes `.container-x`, `.container-narrow`, `.ph`, `.reveal`, `.reveal.in`, `.section-gap`.
- `app/layout.tsx` exposes CSS variables `--font-display` and `--font-body` from next/font.

- [ ] **Step 1: Write the failing token test**

`tests/unit/tokens.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";

const css = readFileSync("app/globals.css", "utf8");
const TOKENS: Record<string, string> = {
  ink: "#0A1223", "navy-900": "#111B33", "navy-700": "#1B2B57", "navy-500": "#111E42",
  "blue-300": "#93AEDC", "blue-200": "#A9BFE4", "blue-100": "#C6D2E6", "blue-50": "#CFDDF5",
  "slate-500": "#4C5670", "slate-400": "#7C879C", "slate-300": "#9AA4B8",
  line: "#E7EBF3", "line-soft": "#EDF1F8", "input-line": "#DFE4EF",
  paper: "#F6F8FC", "paper-alt": "#EEF2F9", "paper-warm": "#F7F4EF", "paper-cool": "#EDF1F8",
  "on-dark": "#EFF3FA", "on-dark-muted": "#B9C8E2",
  teal: "#0E7C86", "teal-bg": "#DFF1F2", red: "#C0272D", "red-bg": "#FBE9EA",
  amber: "#B26A00", "amber-bg": "#FBF0DE", violet: "#5B4B9E", "violet-bg": "#EAE7F5",
  green: "#1F7A4D", "green-bg": "#E3F3EA", gold: "#9A6A0C", "gold-bg": "#F7EAC9",
};

describe("globals.css tokens", () => {
  for (const [name, hex] of Object.entries(TOKENS)) {
    it(`defines --color-${name}: ${hex}`, () => {
      expect(css).toMatch(new RegExp(`--color-${name}:\\s*${hex}`, "i"));
    });
  }
  it("disables animation under prefers-reduced-motion", () => {
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)/);
  });
  it("defines the three keyframes", () => {
    for (const k of ["riseIn", "floaty", "spinSlow"]) expect(css).toContain(`@keyframes ${k}`);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test`
Expected: FAIL on every token (the scaffold CSS has none).

- [ ] **Step 3: Write globals.css**

Replace `app/globals.css` entirely:

```css
@import "tailwindcss";

@theme {
  --color-ink: #0A1223;
  --color-navy-900: #111B33;
  --color-navy-700: #1B2B57;
  --color-navy-500: #111E42;
  --color-blue-300: #93AEDC;
  --color-blue-200: #A9BFE4;
  --color-blue-100: #C6D2E6;
  --color-blue-50: #CFDDF5;
  --color-slate-500: #4C5670;
  --color-slate-400: #7C879C;
  --color-slate-300: #9AA4B8;
  --color-line: #E7EBF3;
  --color-line-soft: #EDF1F8;
  --color-input-line: #DFE4EF;
  --color-paper: #F6F8FC;
  --color-paper-alt: #EEF2F9;
  --color-paper-warm: #F7F4EF;
  --color-paper-cool: #EDF1F8;
  --color-on-dark: #EFF3FA;
  --color-on-dark-muted: #B9C8E2;
  --color-teal: #0E7C86;      --color-teal-bg: #DFF1F2;
  --color-red: #C0272D;       --color-red-bg: #FBE9EA;
  --color-amber: #B26A00;     --color-amber-bg: #FBF0DE;
  --color-violet: #5B4B9E;    --color-violet-bg: #EAE7F5;
  --color-green: #1F7A4D;     --color-green-bg: #E3F3EA;
  --color-gold: #9A6A0C;      --color-gold-bg: #F7EAC9;

  --font-display: var(--font-bricolage), "Segoe UI", system-ui, sans-serif;
  --font-body: var(--font-work-sans), "Segoe UI", system-ui, sans-serif;

  --radius-btn: 12px;
  --radius-chip: 10px;
  --radius-card: 20px;
  --radius-panel: 26px;

  --shadow-card: 0 1px 3px rgba(17,27,51,.06), 0 18px 40px -24px rgba(17,27,51,.18);
  --shadow-form: 0 12px 30px -22px rgba(17,27,51,.4);

  --animate-rise: riseIn .85s both;
  --animate-floaty: floaty 18s ease-in-out infinite;
  --animate-spin-slow: spinSlow 110s linear infinite;

  @keyframes riseIn { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
  @keyframes floaty { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-24px); } }
  @keyframes spinSlow { to { transform: rotate(360deg); } }
}

@layer base {
  html { scroll-behavior: smooth; }
  body { @apply bg-paper text-navy-900 font-body antialiased; font-size: 16.5px; line-height: 1.65; }
  ::selection { @apply bg-blue-50; }
  a { @apply text-navy-700; text-underline-offset: 3px; text-decoration-thickness: 1px; }
  :is(a, button, summary, input, select, textarea):focus-visible { outline: 2px solid var(--color-navy-700); outline-offset: 3px; }
  h1, h2, h3, h4 { @apply font-display font-semibold text-navy-900; text-wrap: pretty; font-variation-settings: "opsz" 96; }
  h1 { font-size: clamp(38px, 5.2vw, 64px); line-height: 1.02; letter-spacing: -.035em; }
  h2 { font-size: 46px; line-height: 1.08; letter-spacing: -.035em; }
  h3 { font-size: 24px; line-height: 1.18; letter-spacing: -.025em; }
  h4 { font-size: 17px; line-height: 1.3; letter-spacing: -.01em; font-variation-settings: "opsz" 24; }
  p { text-wrap: pretty; }
  @media (max-width: 980px) {
    h1 { font-size: clamp(30px, 8.4vw, 44px); line-height: 1.07; letter-spacing: -.03em; }
    h2 { font-size: clamp(25px, 6.2vw, 33px); line-height: 1.14; }
    h3 { font-size: 18px; }
  }
}

@layer components {
  .container-x { @apply mx-auto max-w-[1240px] px-7 max-[980px]:px-[18px]; }
  .container-narrow { @apply mx-auto max-w-[940px]; }
  .eyebrow { @apply block text-[12.5px] font-semibold uppercase tracking-[.1em] text-navy-700 mb-3.5; }
  .lead { @apply text-[19.5px] leading-[1.6] text-slate-500 max-w-[62ch]; }
  .small { @apply text-[13.5px] leading-[1.5] text-slate-400; }
  .fine { @apply text-[12px] text-slate-300; }
  .note { @apply text-[14px] text-slate-400 max-w-[70ch] mt-[18px]; }

  /* placeholders for facts GetSGPR must supply */
  .ph { @apply bg-gold-bg text-gold rounded px-1 font-mono font-medium; font-size: .84em; }
  .on-dark .ph, footer .ph { background: #3A3016; color: #E4C46B; }

  /* buttons */
  .btn { @apply inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-btn font-body font-semibold text-[16px] no-underline border border-transparent cursor-pointer leading-[1.2] transition-colors duration-200; }
  .btn-primary { @apply bg-navy-700 text-on-dark hover:bg-navy-500; }
  .btn-ghost { @apply bg-transparent text-navy-900 border-input-line hover:bg-line-soft hover:border-blue-200; }
  .btn-light { @apply bg-blue-300 text-navy-900 hover:bg-blue-200; }
  .btn-outline-dark { @apply bg-transparent text-on-dark border-[rgba(147,174,220,.45)] hover:bg-[rgba(147,174,220,.12)]; }
  .btn-sm { @apply min-h-[44px] px-[18px] py-[9px] text-[15px]; }

  /* cards hover, reveal */
  .card-hover { @apply transition-[transform,border-color] duration-[350ms] hover:-translate-y-[5px] hover:border-blue-200; }
  .reveal { opacity: 0; }
  .reveal.in { animation: riseIn .85s both; }

  /* nav dropdown (details) */
  .nav-details > summary { list-style: none; }
  .nav-details > summary::-webkit-details-marker { display: none; }
  .nav-details > summary::after { content: " ▾"; font-size: 11px; opacity: .7; }

  /* FAQ marker */
  .faq summary { list-style: none; }
  .faq summary::-webkit-details-marker { display: none; }
  .faq summary::after { content: "+"; color: #9CA9A5; font-weight: 400; font-size: 24px; line-height: 1; }
  .faq details[open] summary::after { content: "–"; }

  /* tables */
  .data-table { @apply w-full border-collapse text-[14.5px] min-w-[640px]; }
  .data-table th, .data-table td { @apply text-left px-4 py-3 border-t border-line-soft align-top text-slate-500; }
  .data-table thead th { @apply bg-line-soft border-t-0 font-semibold text-navy-900 text-[13.5px] whitespace-nowrap; }
  .data-table td:first-child { @apply font-medium text-navy-900; }

  /* prose */
  .prose-x { @apply grid gap-[18px] text-slate-500 max-w-[66ch]; }
  .prose-x h3 { @apply text-navy-900 mt-2; }
  .prose-x ul, .prose-x ol { @apply pl-5 grid gap-2; }
  .prose-x ul { list-style: disc; } .prose-x ol { list-style: decimal; }
  .prose-x strong { @apply text-navy-900; }

  /* decorative shapes */
  .shapes { @apply fixed inset-0 -z-10 pointer-events-none overflow-hidden; }
  .shapes > * { @apply absolute opacity-[.16]; }
  .shp-ring { @apply border-2 border-navy-700 rounded-full; }
  .shp-bloom { @apply rounded-full; background: radial-gradient(circle, var(--color-blue-300), transparent 65%); }
  .shp-square { @apply border-2 border-navy-700 rounded-[22px] rotate-[18deg]; }
  .shp-square.filled { @apply bg-blue-300 border-0; }
  .shp-arc { @apply rounded-full border-2 border-transparent border-t-navy-700 border-r-navy-700; }
  .shp-pill { @apply bg-blue-300 rounded-full; }
  .shp-dots { background-image: radial-gradient(var(--color-navy-700) 1.5px, transparent 1.6px); background-size: 18px 18px; }
  .shp-bars { @apply grid gap-2.5; } .shp-bars i { @apply block h-[3px] bg-navy-700; }
  .shp-cross::before, .shp-cross::after { content: ""; @apply absolute bg-navy-700 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2; }
  .shp-cross::before { @apply w-full h-[2px]; } .shp-cross::after { @apply w-[2px] h-full; }
  .shp-tri { width: 0; height: 0; border-left: 30px solid transparent; border-right: 30px solid transparent; border-bottom: 52px solid var(--color-blue-300); }
  .floaty { animation: floaty 18s ease-in-out infinite; }
  .spin-slow { animation: spinSlow 110s linear infinite; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .reveal { opacity: 1; }
  .reveal.in, .floaty, .spin-slow { animation: none; }
  .card-hover, .btn { transition: none; }
}
```

- [ ] **Step 4: Wire fonts in the root layout (chrome components come in Task 5)**

`app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Bricolage_Grotesque, Work_Sans } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bricolage",
  display: "swap",
});
const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://getsgpr.com"),
  title: "GetSGPR",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-SG" className={`${bricolage.variable} ${workSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

Delete `app/page.tsx` content down to a minimal `export default function Home() { return <main className="container-x py-20"><h1>GetSGPR</h1></main>; }` so the build has a page until Task 8.

- [ ] **Step 5: Run tests and build**

Run: `npm run test; npm run build`
Expected: all token tests PASS; build succeeds. If Tailwind rejects `@apply` of a custom colour inside `@layer components`, the fix is to reference `var(--color-…)` directly for that rule.

- [ ] **Step 6: Commit**

```powershell
git add -A; git commit -m "feat: design tokens, fonts and global styles from the token spec

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 3: Rich text, placeholders and the compliance library

**Files:**
- Create: `lib/rich.ts`, `components/ui/Ph.tsx`, `components/ui/RichText.tsx`, `lib/compliance.ts`
- Test: `tests/unit/rich.test.tsx`, `tests/unit/compliance.test.ts`

**Interfaces:**
- `parseRich(src: string): RichNode[]` where `RichNode = { t: "text"; v: string } | { t: "ph"; v: string } | { t: "strong"; v: string } | { t: "link"; v: string; href: string }`.
  Syntax: `[[Placeholder label]]` → ph; `**bold**` → strong; `[label](href)` → link. Everything else text.
- `<Ph label="Email" />` renders `<span class="ph" data-ph="Email">[Email]</span>`.
- `<RichText value="..." />` renders parsed nodes inline; `<RichText as="p" className=…>` wraps in that element.
- `findViolations(text: string): string[]` from `lib/compliance.ts` returns matched forbidden phrases in plain text (caller strips `<Ph>` content first). `FORBIDDEN: RegExp[]` exported.
- `stripPlaceholders(html: string): string` removes `<span class="ph"…>…</span>` and `[[…]]` before checking.

- [ ] **Step 1: Write failing tests**

`tests/unit/rich.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { parseRich } from "@/lib/rich";
import { RichText } from "@/components/ui/RichText";
import { Ph } from "@/components/ui/Ph";

describe("parseRich", () => {
  it("splits placeholders, bold and links", () => {
    expect(parseRich("Reply from [[Email]] within **24 hours**, see [pricing](/packages).")).toEqual([
      { t: "text", v: "Reply from " },
      { t: "ph", v: "Email" },
      { t: "text", v: " within " },
      { t: "strong", v: "24 hours" },
      { t: "text", v: ", see " },
      { t: "link", v: "pricing", href: "/packages" },
      { t: "text", v: "." },
    ]);
  });
  it("returns plain text untouched", () => {
    expect(parseRich("Plain.")).toEqual([{ t: "text", v: "Plain." }]);
  });
});

describe("RichText / Ph", () => {
  it("renders a gold placeholder span with data-ph", () => {
    expect(renderToStaticMarkup(<Ph label="Email" />)).toBe('<span class="ph" data-ph="Email">[Email]</span>');
  });
  it("renders inline nodes and a wrapper element", () => {
    const html = renderToStaticMarkup(<RichText as="p" className="small" value="Call **now** [[Hours]]" />);
    expect(html).toBe('<p class="small">Call <strong>now</strong> <span class="ph" data-ph="Hours">[Hours]</span></p>');
  });
});
```

`tests/unit/compliance.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { findViolations, stripPlaceholders } from "@/lib/compliance";

describe("compliance", () => {
  it("flags forbidden phrases", () => {
    expect(findViolations("We have a high success rate and are ICA approved.")).toEqual(["high success rate", "ICA approved"]);
    expect(findViolations("90% approval rate")).toEqual(["90% approval"]);
  });
  it("ignores allowed copy", () => {
    expect(findViolations("We do not guarantee 100% approval simply for marketing purposes.")).toEqual([]);
    expect(findViolations("No approval guarantees.")).toEqual([]);
  });
  it("strips placeholder spans before checking", () => {
    const html = 'Rate <span class="ph" data-ph="x">[90% approval]</span> and [[success rate]] here';
    expect(findViolations(stripPlaceholders(html))).toEqual([]);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run test`
Expected: FAIL, modules not found.

- [ ] **Step 3: Implement**

`lib/rich.ts`:

```ts
export type RichNode =
  | { t: "text"; v: string }
  | { t: "ph"; v: string }
  | { t: "strong"; v: string }
  | { t: "link"; v: string; href: string };

const TOKEN = /\[\[([^\]]+)\]\]|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

export function parseRich(src: string): RichNode[] {
  const out: RichNode[] = [];
  let last = 0;
  for (const m of src.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ t: "text", v: src.slice(last, i) });
    if (m[1] !== undefined) out.push({ t: "ph", v: m[1] });
    else if (m[2] !== undefined) out.push({ t: "strong", v: m[2] });
    else out.push({ t: "link", v: m[3], href: m[4] });
    last = i + m[0].length;
  }
  if (last < src.length) out.push({ t: "text", v: src.slice(last) });
  return out;
}
```

`components/ui/Ph.tsx`:

```tsx
export function Ph({ label }: { label: string }) {
  return <span className="ph" data-ph={label}>[{label}]</span>;
}
```

`components/ui/RichText.tsx`:

```tsx
import Link from "next/link";
import { parseRich } from "@/lib/rich";
import { Ph } from "./Ph";

type Props = { value: string; as?: keyof React.JSX.IntrinsicElements; className?: string };

export function RichText({ value, as, className }: Props) {
  const nodes = parseRich(value).map((n, i) => {
    switch (n.t) {
      case "ph": return <Ph key={i} label={n.v} />;
      case "strong": return <strong key={i}>{n.v}</strong>;
      case "link": return n.href.startsWith("/") ? <Link key={i} href={n.href}>{n.v}</Link> : <a key={i} href={n.href}>{n.v}</a>;
      default: return n.v;
    }
  });
  if (!as) return <>{nodes}</>;
  const Tag = as as "p";
  return <Tag className={className}>{nodes}</Tag>;
}
```

`lib/compliance.ts`:

```ts
export const FORBIDDEN: RegExp[] = [
  /high success rates?/i,
  /\bsuccess rates?\b/i,
  /guaranteed? approval/i,
  /ICA[- ]approved/i,
  /ICA[- ]partner/i,
  /ICA[- ]endorsed/i,
  /\d{1,3}% (?:approval|success)/i,
];

export function stripPlaceholders(html: string): string {
  return html.replace(/<span class="ph"[^>]*>[\s\S]*?<\/span>/g, " ").replace(/\[\[[^\]]+\]\]/g, " ");
}

export function findViolations(text: string): string[] {
  const hits: string[] = [];
  for (const re of FORBIDDEN) {
    const m = text.match(re);
    if (m) hits.push(m[0]);
  }
  return hits;
}
```

Note the "guarantee 100% approval" sentence: `/\d{1,3}% (?:approval|success)/` would match "100% approval". Add a preceding-context guard: replace that regex with `/(?<!not guarantee )\d{1,3}% (?:approval|success)/i` so the honesty sentence passes and bare "90% approval" fails.

- [ ] **Step 4: Run tests**

Run: `npm run test`
Expected: PASS (13 tests).

- [ ] **Step 5: Commit**

```powershell
git add -A; git commit -m "feat: rich text parser, Ph placeholder and compliance checks

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 4: Site facts, nav, testimonials, compliance lint and placeholder audit scripts

**Files:**
- Create: `content/site.ts`, `content/nav.ts`, `content/testimonials.ts`, `scripts/lint-compliance.ts`, `scripts/audit-placeholders.ts`
- Modify: `package.json` (add `prebuild`)
- Test: `tests/unit/site.test.ts`

**Interfaces:**
- `SITE` from `content/site.ts`:

```ts
export const SITE = {
  name: "GetSGPR",
  legalName: "SGPR Immigration Singapore",
  uen: "53408306D",
  address: "18 Boon Lay Way, #04-118, Tradehub 21, Singapore 609966",
  addressShort: "Tradehub 21, Boon Lay Way",
  phoneDisplay: "+65 8934 0818",
  whatsappUrl: "https://wa.me/6589340818",
  url: "https://getsgpr.com",
  tagline: "Know where you stand. Strengthen what matters. Submit with confidence.",
  disclaimer: "GetSGPR is an independent consultancy and is not affiliated with, licensed by or endorsed by the Immigration & Checkpoints Authority (ICA) or any government agency. ICA assesses every application on its own merits and makes all final decisions. Nothing on this website is a promise or prediction of approval.",
  independenceLine: "Independent Singapore immigration consultancy. ICA makes all approval decisions. We never guarantee approval.",
  ghl: { formId: "z6a7dZmxkVc4lU8nayfJ", chatWidgetId: "685385ad2eeadb3322507b55" },
  // Facts the live site does not publish. Rendered through <Ph>.
  placeholders: { email: "Email", hours: "Opening hours", googleRating: "Google rating", reviewCount: "Number of reviews", dpo: "DPO name", checkedOn: "date checked" },
} as const;
```

- `NAV` from `content/nav.ts`: `{ services: {label, href, small}[]; primary: {label, href}[]; compact: {label, href}[]; footer: { services: Link[]; company: Link[]; legal: Link[] }; routes: string[] }` where `Link = { label: string; href: string; external?: boolean }` and `routes` lists all 22 static routes plus the shipped case-study and guide slugs (used by sitemap and tests).
- `TESTIMONIALS: { name: string; quote: string; type: string; verified: false }[]` (nine entries, spec §3).

- [ ] **Step 1: Write failing test**

`tests/unit/site.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { SITE } from "@/content/site";
import { NAV } from "@/content/nav";
import { TESTIMONIALS } from "@/content/testimonials";

describe("site facts", () => {
  it("carries the live-site facts", () => {
    expect(SITE.legalName).toBe("SGPR Immigration Singapore");
    expect(SITE.uen).toBe("53408306D");
    expect(SITE.address).toBe("18 Boon Lay Way, #04-118, Tradehub 21, Singapore 609966");
    expect(SITE.whatsappUrl).toBe("https://wa.me/6589340818");
  });
  it("lists the 22 static routes", () => {
    const expected = ["/", "/pr-readiness-review", "/services", "/permanent-resident-sg",
      "/permanent-resident-sg/first-time-application", "/permanent-resident-sg/family-spouse",
      "/permanent-resident-sg/ep-s-pass-holders", "/permanent-resident-sg/founders-self-employed",
      "/singapore-citizen", "/ltvp", "/pr-appeal", "/packages", "/sgpr-lite-diy-tier",
      "/sgpr-partnered-do-with-you", "/sgpr-premium-concierge", "/case-studies", "/about",
      "/privacy-data-security", "/guides", "/guides/singapore-pr-faq", "/contact"];
    for (const r of expected) expect(NAV.routes).toContain(r);
  });
  it("flags all nine testimonials as unverified", () => {
    expect(TESTIMONIALS).toHaveLength(9);
    expect(TESTIMONIALS.every((t) => t.verified === false)).toBe(true);
    expect(TESTIMONIALS.map((t) => t.name)).toContain("Olivia Tan");
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm run test` → FAIL, modules missing.

- [ ] **Step 3: Implement content files**

`content/site.ts`: the `SITE` object above, verbatim.

`content/nav.ts`:

```ts
export type Link = { label: string; href: string; external?: boolean; small?: string };

export const NAV = {
  services: [
    { label: "Permanent Residence", href: "/permanent-resident-sg", small: "First-time, family, EP/S Pass, founders" },
    { label: "Singapore Citizenship", href: "/singapore-citizen", small: "For PR holders and families" },
    { label: "Long Term Visit Pass", href: "/ltvp", small: "Family of citizens and PRs" },
    { label: "PR Rejection Appeal", href: "/pr-appeal", small: "Appeal or reapply, on evidence" },
  ] as Link[],
  primary: [
    { label: "Packages", href: "/packages" },
    { label: "Readiness Review", href: "/pr-readiness-review" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Knowledge Centre", href: "/guides" },
    { label: "About", href: "/about" },
  ] as Link[],
  cta: { label: "Book a free call", href: "/contact" },
  compact: [
    { label: "Services", href: "/services" },
    { label: "Packages", href: "/packages" },
  ] as Link[],
  footer: {
    services: [
      { label: "Permanent Residence", href: "/permanent-resident-sg" },
      { label: "Singapore Citizenship", href: "/singapore-citizen" },
      { label: "Long Term Visit Pass", href: "/ltvp" },
      { label: "PR Rejection Appeal", href: "/pr-appeal" },
      { label: "Packages", href: "/packages" },
      { label: "Free PR Readiness Review", href: "/pr-readiness-review" },
    ] as Link[],
    company: [
      { label: "About GetSGPR", href: "/about" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Knowledge Centre", href: "/guides" },
      { label: "PR FAQ", href: "/guides/singapore-pr-faq" },
      { label: "Contact", href: "/contact" },
      { label: "WhatsApp +65 8934 0818", href: "https://wa.me/6589340818", external: true },
    ] as Link[],
    legal: [
      { label: "Privacy & data security", href: "/privacy-data-security" },
      { label: "Terms of use", href: "/privacy-data-security#terms" },
    ] as Link[],
  },
  routes: [
    "/", "/pr-readiness-review", "/services", "/permanent-resident-sg",
    "/permanent-resident-sg/first-time-application", "/permanent-resident-sg/family-spouse",
    "/permanent-resident-sg/ep-s-pass-holders", "/permanent-resident-sg/founders-self-employed",
    "/singapore-citizen", "/ltvp", "/pr-appeal", "/packages", "/sgpr-lite-diy-tier",
    "/sgpr-partnered-do-with-you", "/sgpr-premium-concierge", "/case-studies", "/about",
    "/privacy-data-security", "/guides", "/guides/singapore-pr-faq", "/contact",
  ],
} as const;
```

The prototype footer also listed "Google Business Profile", "LinkedIn", "Facebook" with `href="#"`. The live site publishes no such URLs, so they are omitted (dead links are worse than none). Record this in the README checklist in Task 19.

`content/testimonials.ts`:

```ts
export type Testimonial = { name: string; quote: string; type: string; verified: false };
export const TESTIMONIALS: Testimonial[] = [
  { name: "John Tan", quote: "The team guided me step-by-step and made my PR approval process simple and fast.", type: "Singapore PR Application", verified: false },
  { name: "Priya Nair", quote: "Excellent service with attention to detail. My citizenship application went smoothly!", type: "Citizenship Application", verified: false },
  { name: "Mr. Chen Wei", quote: "Very professional support, handled all documentation perfectly for my wife's LTVP.", type: "LTVP for Spouse", verified: false },
  { name: "Sarah Lim", quote: "Fast response, professional advice, and friendly consultants. Highly recommend!", type: "Singapore PR Application", verified: false },
  { name: "Mr. Ahmad", quote: "Thank you for helping me secure my S Pass and job transfer without hassle.", type: "Work Pass Application", verified: false },
  { name: "Olivia Tan", quote: "After my first rejection, they helped me successfully appeal and get my PR approved.", type: "PR Appeal Assistance", verified: false },
  { name: "Jason Koh", quote: "As a self-employed applicant, their expert advice was crucial for my approval.", type: "Business Owner PR", verified: false },
  { name: "Emily Wong", quote: "Entire family PR application handled smoothly — grateful for their expertise!", type: "Family PR Application", verified: false },
  { name: "Rajesh Kumar", quote: "Professional, fast, and very transparent process. The best consultancy experience.", type: "Citizenship Appeal", verified: false },
];
```

- [ ] **Step 4: Write the two scripts**

`scripts/lint-compliance.ts` scans source text (content files, components, Markdown) so the build fails before rendering:

```ts
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { findViolations, stripPlaceholders } from "../lib/compliance";

const ROOTS = ["content", "components", "app"];
const EXT = /\.(ts|tsx|md)$/;
let failed = false;

function walk(dir: string, out: string[] = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (EXT.test(name)) out.push(p);
  }
  return out;
}

for (const root of ROOTS) {
  for (const file of walk(root)) {
    const text = stripPlaceholders(readFileSync(file, "utf8"));
    const hits = findViolations(text);
    if (hits.length) {
      failed = true;
      console.error(`✗ ${file}: ${hits.join(", ")}`);
    }
  }
}
if (failed) { console.error("Compliance lint failed."); process.exit(1); }
console.log("Compliance lint passed.");
```

`lib/compliance.ts` itself contains the forbidden strings as regex source, and `tests/` contain them as fixtures; neither is under `ROOTS`, so they are not scanned.

`scripts/audit-placeholders.ts` reports remaining placeholders per file (source-level; the e2e parity test covers rendered output):

```ts
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["content", "components", "app"];
const rows: { file: string; label: string }[] = [];

function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(ts|tsx|md)$/.test(name)) {
      const src = readFileSync(p, "utf8");
      for (const m of src.matchAll(/\[\[([^\]]+)\]\]|<Ph label="([^"]+)"/g)) rows.push({ file: p, label: m[1] ?? m[2] });
    }
  }
}
for (const r of ROOTS) walk(r);
const byLabel = new Map<string, Set<string>>();
for (const r of rows) byLabel.set(r.label, (byLabel.get(r.label) ?? new Set()).add(r.file));
console.log(`| Placeholder | Occurrences | Files |\n|---|---|---|`);
for (const [label, files] of [...byLabel].sort((a, b) => b[1].size - a[1].size))
  console.log(`| ${label} | ${rows.filter((r) => r.label === label).length} | ${[...files].join("<br>")} |`);
console.log(`\n${rows.length} placeholders across ${byLabel.size} labels.`);
```

Add to `package.json` scripts: `"prebuild": "npm run lint:compliance"`.

- [ ] **Step 5: Run tests, lint, build**

Run: `npm run test; npm run lint:compliance; npm run build`
Expected: tests PASS; "Compliance lint passed."; build succeeds.

- [ ] **Step 6: Commit**

```powershell
git add -A; git commit -m "feat: site facts, navigation, testimonials and compliance scripts

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 5: Layout chrome — Header, MobileNav, Footer, ActionBar, ChatWidget, JSON-LD

**Files:**
- Create: `components/layout/Brand.tsx`, `Header.tsx`, `MobileNav.tsx`, `Footer.tsx`, `ActionBar.tsx`, `components/widgets/ChatWidget.tsx`, `components/ui/Shapes.tsx`
- Modify: `app/layout.tsx`, `app/globals.css`
- Test: `tests/unit/footer.test.tsx`

**Interfaces:**
- Consumes: `SITE`, `NAV`, `Ph`.
- Produces: `<Header />`, `<Footer />`, `<ActionBar />` (mobile only), `<ChatWidget />`, `<Shapes preset="home" | "service" | "plain" />`. Root layout renders `<Header/>{children}<Footer/><ActionBar/><ChatWidget/>` and injects LocalBusiness JSON-LD.

- [ ] **Step 1: Write the failing footer test**

`tests/unit/footer.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Footer } from "@/components/layout/Footer";
import { SITE } from "@/content/site";

describe("Footer", () => {
  const html = renderToStaticMarkup(<Footer />);
  it("carries the independence disclaimer verbatim", () => {
    expect(html.replace(/&amp;/g, "&")).toContain(SITE.disclaimer);
  });
  it("shows legal name, UEN, address and phone, and placeholders for email and hours", () => {
    expect(html).toContain("SGPR Immigration Singapore");
    expect(html).toContain("UEN 53408306D");
    expect(html).toContain("18 Boon Lay Way, #04-118, Tradehub 21, Singapore 609966");
    expect(html).toContain("+65 8934 0818");
    expect(html).toContain('data-ph="Email"');
    expect(html).toContain('data-ph="Opening hours"');
  });
  it("links every footer route", () => {
    for (const href of ["/permanent-resident-sg", "/packages", "/pr-readiness-review", "/about", "/case-studies", "/guides", "/contact", "/privacy-data-security"])
      expect(html).toContain(`href="${href}"`);
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm run test`
Expected: FAIL (Footer module missing).

- [ ] **Step 3: Implement chrome**

`components/layout/Brand.tsx`:

```tsx
import Link from "next/link";

export function Brand({ large = false }: { large?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 no-underline text-on-dark">
      <svg viewBox="0 0 40 40" aria-hidden="true" className="w-[30px] h-[30px]">
        <defs><linearGradient id="gm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#93AEDC" /><stop offset="1" stopColor="#1B2B57" /></linearGradient></defs>
        <circle cx="20" cy="20" r="14" fill="none" stroke="url(#gm)" strokeWidth="6" strokeDasharray="70 18" strokeLinecap="round" transform="rotate(-60 20 20)" />
      </svg>
      <b className={`font-display font-semibold tracking-[-.02em] ${large ? "text-[22px]" : "text-[19px]"}`}>GetSGPR</b>
    </Link>
  );
}
```

`components/layout/Header.tsx` (server component; the Services dropdown is a native `<details>` exactly as the prototype, so no JS):

```tsx
import Link from "next/link";
import { NAV } from "@/content/nav";
import { Brand } from "./Brand";
import { MobileNav } from "./MobileNav";

const linkCls = "px-3.5 py-[9px] rounded-[9px] text-blue-100 no-underline text-[14.5px] font-medium transition-colors hover:bg-[rgba(147,174,220,.12)] hover:text-on-dark";

export function Header() {
  return (
    <header className="sticky top-0 z-[60] bg-[rgba(10,18,35,.92)] backdrop-blur-[12px] text-on-dark">
      <div className="container-x flex items-center gap-5 min-h-[62px]">
        <Brand />
        <nav aria-label="Primary" className="hidden min-[1081px]:flex items-center gap-0.5 ml-auto">
          <details className="nav-details relative">
            <summary className={`${linkCls} cursor-pointer`}>Services</summary>
            <div className="absolute top-11 left-0 bg-white border border-line rounded-[14px] shadow-card min-w-[270px] p-2 grid">
              {NAV.services.map((s) => (
                <Link key={s.href} href={s.href} className="px-3 py-2.5 rounded-[9px] text-navy-900 no-underline text-[15px] font-medium hover:bg-line-soft">
                  {s.label}<small className="block text-slate-400 text-[12.5px] font-normal mt-0.5">{s.small}</small>
                </Link>
              ))}
            </div>
          </details>
          {NAV.primary.map((l) => <Link key={l.href} href={l.href} className={linkCls}>{l.label}</Link>)}
          <Link href={NAV.cta.href} className="btn btn-light btn-sm ml-2.5">{NAV.cta.label}</Link>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
```

`components/layout/MobileNav.tsx` (compact nav shown at 1080px and below; no state needed):

```tsx
import Link from "next/link";
import { NAV } from "@/content/nav";

export function MobileNav() {
  return (
    <nav aria-label="Primary, compact" className="flex min-[1081px]:hidden items-center gap-1.5 ml-auto">
      {NAV.compact.map((l) => <Link key={l.href} href={l.href} className="text-blue-100 no-underline text-[14px] font-medium px-3 py-2 rounded-[9px]">{l.label}</Link>)}
      <Link href="/contact" className="bg-blue-300 text-navy-900 font-semibold no-underline text-[14px] px-3 py-2 rounded-[9px]">Book</Link>
    </nav>
  );
}
```

`components/layout/Footer.tsx`:

```tsx
import Link from "next/link";
import { SITE } from "@/content/site";
import { NAV, type Link as NavLink } from "@/content/nav";
import { Ph } from "@/components/ui/Ph";
import { Brand } from "./Brand";

function Col({ title, links }: { title: string; links: readonly NavLink[] }) {
  return (
    <div>
      <h4 className="text-on-dark text-[13px] tracking-[.08em] uppercase mb-3.5 font-body">{title}</h4>
      <ul className="list-none m-0 p-0 grid gap-[9px]">
        {links.map((l) => (
          <li key={l.href}>
            {l.external
              ? <a href={l.href} className="text-blue-100 no-underline hover:text-on-dark hover:underline">{l.label}</a>
              : <Link href={l.href} className="text-blue-100 no-underline hover:text-on-dark hover:underline">{l.label}</Link>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-on-dark-muted pt-[72px] pb-10 text-[14.5px]">
      <div className="container-x">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 max-[980px]:grid-cols-2 max-[560px]:grid-cols-1">
          <div className="grid gap-2.5">
            <Brand large />
            <p>Independent Singapore immigration consultancy for PR, citizenship and Long Term Visit Pass applications. Evidence-led preparation, published prices, no approval guarantees.</p>
            <p>{SITE.legalName} · UEN {SITE.uen}<br />{SITE.address}<br />{SITE.phoneDisplay} · <Ph label={SITE.placeholders.email} /><br /><Ph label={SITE.placeholders.hours} /></p>
          </div>
          <Col title="Services" links={NAV.footer.services} />
          <Col title="Company" links={NAV.footer.company} />
          <Col title="Legal" links={NAV.footer.legal} />
        </div>
        <div className="border-t border-[rgba(147,174,220,.18)] mt-12 pt-6 grid gap-3 text-[13px] text-slate-400">
          <p>{SITE.disclaimer}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2"><span>© {new Date().getFullYear()} {SITE.legalName}. All rights reserved.</span><span>{SITE.tagline}</span></div>
        </div>
      </div>
    </footer>
  );
}
```

`components/layout/ActionBar.tsx`:

```tsx
import Link from "next/link";
import { SITE } from "@/content/site";

export function ActionBar() {
  return (
    <div className="hidden max-[1080px]:flex fixed bottom-0 inset-x-0 z-[90] bg-[rgba(10,18,35,.97)] backdrop-blur-[12px] border-t border-[rgba(147,174,220,.2)] px-3 py-2.5 gap-2">
      <a href={SITE.whatsappUrl} className="flex-1 min-h-[52px] inline-flex items-center justify-center rounded-btn no-underline font-semibold text-[15px] bg-[rgba(147,174,220,.14)] text-on-dark">WhatsApp</a>
      <Link href="/contact" className="flex-[1.3] min-h-[52px] inline-flex items-center justify-center rounded-btn no-underline font-semibold text-[15px] bg-blue-300 text-navy-900">Book a call</Link>
    </div>
  );
}
```

Add to `app/globals.css` inside `@layer base`:

```css
@media (max-width: 1080px) { body { padding-bottom: calc(86px + env(safe-area-inset-bottom, 0px)); } }
```

`components/widgets/ChatWidget.tsx`:

```tsx
"use client";
import Script from "next/script";
import { SITE } from "@/content/site";

export function ChatWidget() {
  return (
    <Script
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id={SITE.ghl.chatWidgetId}
      strategy="afterInteractive"
    />
  );
}
```

`components/ui/Shapes.tsx` — three presets. Transcribe each from the prototype's first line (`reference/prototype/home.html` line 3 for `home`, `pr.html` line 3 for `service`, `packages.html` line 3 for `plain`): every `<div class="shp-… [spin|floaty]" style="left:…;top:…;width:…;height:…">` becomes one entry; `spin` → `spin-slow`; a `shp-bars` entry renders four `<i />` children. The `home` preset, fully:

```tsx
import type { CSSProperties } from "react";

type Shape = { c: string; s: CSSProperties };
const PRESETS: Record<"home" | "service" | "plain", Shape[]> = {
  home: [
    { c: "shp-ring spin-slow", s: { left: "-6%", top: "10%", width: 420, height: 420 } },
    { c: "shp-ring floaty", s: { left: "78%", top: "58%", width: 260, height: 260 } },
    { c: "shp-ring", s: { left: "80%", top: "60%", width: 200, height: 200 } },
    { c: "shp-bloom floaty", s: { left: "60%", top: "-10%", width: 520, height: 520 } },
    { c: "shp-bloom", s: { left: "10%", top: "70%", width: 420, height: 420 } },
    { c: "shp-dots", s: { left: "86%", top: "18%", width: 140, height: 100 } },
    { c: "shp-arc spin-slow", s: { left: "30%", top: "80%", width: 180, height: 180 } },
  ],
  service: [
    { c: "shp-ring", s: { left: "75%", top: "10%", width: 260, height: 260 } },
    { c: "shp-ring", s: { left: "77%", top: "12%", width: 200, height: 200 } },
    { c: "shp-square filled", s: { left: "8%", top: "15%", width: 120, height: 120 } },
    { c: "shp-ring spin-slow", s: { left: "15%", top: "65%", width: 240, height: 240 } },
    { c: "shp-bars", s: { left: "85%", top: "60%", width: 100, height: 60 } },
    { c: "shp-bloom", s: { left: "40%", top: "30%", width: 500, height: 500 } },
    { c: "shp-dots", s: { left: "55%", top: "80%", width: 120, height: 60 } },
  ],
  plain: [], // fill from packages.html line 3 using the same mapping
};

export function Shapes({ preset }: { preset: keyof typeof PRESETS }) {
  return (
    <div className="shapes" aria-hidden="true">
      {PRESETS[preset].map((p, i) => (
        <div key={i} className={p.c} style={p.s}>{p.c.includes("shp-bars") ? <><i /><i /><i /><i /></> : null}</div>
      ))}
    </div>
  );
}
```

`app/layout.tsx` body becomes:

```tsx
<body>
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org", "@type": "LocalBusiness", name: SITE.name, legalName: SITE.legalName,
    identifier: SITE.uen, url: SITE.url, telephone: SITE.phoneDisplay,
    address: { "@type": "PostalAddress", streetAddress: "18 Boon Lay Way, #04-118, Tradehub 21", postalCode: "609966", addressCountry: "SG" },
    areaServed: "Singapore",
  }) }} />
  <Header />
  {children}
  <Footer />
  <ActionBar />
  <ChatWidget />
</body>
```

- [ ] **Step 4: Run tests and build**

Run: `npm run test; npm run build`
Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add -A; git commit -m "feat: header, footer, mobile action bar, chat widget and JSON-LD

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 6: Content types and UI primitives

**Files:**
- Create: `content/types.ts`, `components/ui/Button.tsx`, `Badge.tsx`, `Eyebrow.tsx`, `SectionHead.tsx`, `Section.tsx`, `Reveal.tsx`, `ImagePh.tsx`, `FaqList.tsx`, `CtaBand.tsx`, `SourceBlock.tsx`, `Prose.tsx`, `Kv.tsx`, `DataTable.tsx`, `lib/metadata.ts`
- Modify: `app/layout.tsx` (mount `<Reveal />`)
- Test: `tests/unit/ui.test.tsx`

**Interfaces — `content/types.ts` is the whole content model. Later tasks import these names exactly:**

```ts
export type Tone = "teal" | "red" | "amber" | "violet" | "green" | "gold" | "neutral";
export type SectionTone = "default" | "alt" | "dark" | "warm";
export type Btn = { label: string; href: string; style: "primary" | "ghost" | "light" | "outline-dark" };
export type Ratio = "4-3" | "16-9" | "3-4" | "1-1";
export type ProseItem =
  | { p: string }
  | { h3: string; smallSuffix?: string }
  | { ul: string[] }
  | { ol: string[] }
  | { small: string }
  | { kv: { k: string; v: string }[] }
  | { strong: string };

export type PageMeta = { title: string; description: string; path: string };
export type Foot = { text?: string; link?: { label: string; href: string }; button?: Btn };

export type Hero = {
  kind: "hero"; variant: "dark" | "light" | "plain";
  eyebrow?: string; eyebrowTone?: Tone; title: string; sub?: string; small?: string; badge?: string;
  buttons?: Btn[]; under?: string;
  aside?: { kind: "checker" } | { kind: "image"; ratio: Ratio; label: string };
};
export type Trust = { kind: "trust"; google?: boolean };
export type Stats = { kind: "stats"; items: { value: string; label: string }[] };
export type Honesty = { kind: "honesty"; title: string; paragraphs: string[] };
export type Card = {
  tone?: Tone; badge?: string; title: string; text?: string; tags?: string[]; bullets?: string[];
  link?: { label: string; href: string };
  outcome?: { imageLabel: string; meta: string; challenge: string; did: string; result: string; href: string };
};
export type Cards = { kind: "cards"; eyebrow?: string; eyebrowTone?: Tone; title?: string; sub?: string; columns: 2 | 3 | 4; maxWidth?: number; cards: Card[]; note?: string; foot?: Foot };
export type Tiles = { kind: "tiles"; eyebrow?: string; title: string; sub?: string; tiles: { n: string; title: string; text: string; ours?: boolean }[]; after?: { text: string; button: Btn }; note?: string };
export type Items = { kind: "items"; eyebrow?: string; title?: string; sub?: string; columns: 2 | 3; items: { title: string; text: string }[]; foot?: Foot };
export type Steps = { kind: "steps"; eyebrow?: string; title: string; sub?: string; light?: boolean; steps: { when: string; title: string; text: string }[]; note?: string };
export type PackagesBlock = { kind: "packages"; eyebrow?: string; title?: string; sub?: string; note?: string; showNotFor?: boolean };
export type Reviews = { kind: "reviews"; eyebrow?: string; title: string; sub?: string; limit?: number };
export type Faq = { kind: "faq"; eyebrow?: string; title: string; items: { q: string; a: string }[]; schema?: boolean; openFirst?: boolean; note?: string };
export type ContactSplit = { kind: "contact"; eyebrow?: string; title: string; sub?: string; prose: ProseItem[] };
export type CtaBandBlock = { kind: "cta"; title: string; sub?: string; buttons: Btn[] };
export type Source = { kind: "source"; primary: string; reviewedBy?: boolean };
export type Table = { kind: "table"; eyebrow?: string; title?: string; sub?: string; columns: string[]; rows: string[][]; note?: string; foot?: Foot };
export type ProseBlock = { kind: "prose"; eyebrow?: string; title?: string; sub?: string; content: ProseItem[]; source?: string; image?: { ratio: Ratio; label: string; caption?: string }; images?: { ratio: Ratio; label: string }[]; foot?: Foot };
export type Honest = { kind: "honest"; title: string; text: string };
export type SampleResult = { kind: "sampleResult" };
export type Crumbs = { kind: "crumbs"; items: { label: string; href?: string }[] };
export type Filters = { kind: "filters"; chips: string[] };
export type Text = { kind: "text"; eyebrow?: string; title?: string; sub?: string; paragraphs?: string[]; buttons?: Btn[]; foot?: Foot };
export type ReadinessFormBlock = { kind: "readinessForm"; eyebrow?: string; title: string; sub?: string };

type Wrap = { tone?: SectionTone; tight?: boolean; id?: string };
export type Block = Wrap & (Hero | Trust | Stats | Honesty | Cards | Tiles | Items | Steps | PackagesBlock | Reviews | Faq | ContactSplit | CtaBandBlock | Source | Table | ProseBlock | Honest | SampleResult | Crumbs | Filters | Text | ReadinessFormBlock);

export type PageContent = { meta: PageMeta; shapes: "home" | "service" | "plain"; blocks: Block[] };
```

Every string field that carries copy (`sub`, `text`, `p`, list items, `note`, `foot.text`, `a`, `quote`, table cells, `kv.v`) is rich: it supports `[[ph]]`, `**bold**` and `[label](href)`.

- `lib/metadata.ts`: `export function pageMetadata(meta: PageMeta): Metadata` returning `{ title, description, alternates: { canonical: meta.path }, openGraph: { title, description, url: meta.path, siteName: "GetSGPR", locale: "en_SG", type: "website" } }`.

- [ ] **Step 1: Write failing UI tests**

`tests/unit/ui.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FaqList } from "@/components/ui/FaqList";
import { DataTable } from "@/components/ui/DataTable";
import { pageMetadata } from "@/lib/metadata";

describe("ui primitives", () => {
  it("Button maps style to btn classes and links internal hrefs", () => {
    const html = renderToStaticMarkup(<Button label="Go" href="/packages" style="primary" />);
    expect(html).toContain('class="btn btn-primary"');
    expect(html).toContain('href="/packages"');
  });
  it("Badge applies tone classes", () => {
    expect(renderToStaticMarkup(<Badge tone="teal">PR</Badge>)).toContain("bg-teal-bg text-teal");
  });
  it("FaqList renders details, opens the first when asked, emits FAQPage JSON-LD when schema is true", () => {
    const html = renderToStaticMarkup(<FaqList items={[{ q: "Q1?", a: "A1 **b**" }, { q: "Q2?", a: "A2" }]} schema openFirst />);
    expect(html).toContain("<details open");
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).toContain("<strong>b</strong>");
  });
  it("DataTable renders ✓ as green check cells", () => {
    const html = renderToStaticMarkup(<DataTable columns={["Stage", "Lite"]} rows={[["Audit", "✓"]]} />);
    expect(html).toContain('class="text-center text-green font-bold"');
  });
  it("pageMetadata sets canonical", () => {
    expect(pageMetadata({ title: "T", description: "D", path: "/ltvp" }).alternates).toEqual({ canonical: "/ltvp" });
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm run test`
Expected: FAIL (modules missing).

- [ ] **Step 3: Implement primitives**

`components/ui/Button.tsx`:

```tsx
import Link from "next/link";
import type { Btn } from "@/content/types";

export function Button({ label, href, style, small }: Btn & { small?: boolean }) {
  const cls = `btn btn-${style}${small ? " btn-sm" : ""}`;
  return href.startsWith("/") || href.startsWith("#")
    ? <Link href={href} className={cls}>{label}</Link>
    : <a href={href} className={cls}>{label}</a>;
}

export function ButtonRow({ buttons, className = "" }: { buttons?: Btn[]; className?: string }) {
  if (!buttons?.length) return null;
  return <div className={`flex flex-wrap gap-3 items-center ${className}`}>{buttons.map((b) => <Button key={b.href + b.label} {...b} />)}</div>;
}
```

`components/ui/Badge.tsx`:

```tsx
import type { Tone } from "@/content/types";

const TONES: Record<Tone, string> = {
  teal: "bg-teal-bg text-teal", red: "bg-red-bg text-red", amber: "bg-amber-bg text-amber",
  violet: "bg-violet-bg text-violet", green: "bg-green-bg text-green", gold: "bg-gold-bg text-gold",
  neutral: "bg-line-soft text-navy-700",
};
export const TONE_TEXT: Record<Tone, string> = {
  teal: "text-teal", red: "text-red", amber: "text-amber", violet: "text-violet", green: "text-green", gold: "text-gold", neutral: "text-navy-700",
};

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: React.ReactNode }) {
  return <span className={`inline-block text-[12px] font-semibold tracking-[.04em] px-2.5 py-1 rounded-full w-fit ${TONES[tone]}`}>{children}</span>;
}
```

`components/ui/Eyebrow.tsx`:

```tsx
import { TONE_TEXT } from "./Badge";
import type { Tone } from "@/content/types";

export function Eyebrow({ children, tone, onDark }: { children: React.ReactNode; tone?: Tone; onDark?: boolean }) {
  return <span className={`eyebrow ${onDark ? "text-blue-300" : tone ? TONE_TEXT[tone] : ""}`}>{children}</span>;
}
```

`components/ui/SectionHead.tsx`:

```tsx
import { Eyebrow } from "./Eyebrow";
import { RichText } from "./RichText";
import type { Tone } from "@/content/types";

export function SectionHead({ eyebrow, eyebrowTone, title, sub, onDark }: { eyebrow?: string; eyebrowTone?: Tone; title?: string; sub?: string; onDark?: boolean }) {
  if (!eyebrow && !title && !sub) return null;
  return (
    <div className="reveal max-w-[780px] mb-10">
      {eyebrow && <Eyebrow tone={eyebrowTone} onDark={onDark}>{eyebrow}</Eyebrow>}
      {title && <h2 className={`mb-3.5 ${onDark ? "text-on-dark" : ""}`}><RichText value={title} /></h2>}
      {sub && <RichText as="p" className={`lead text-[18px] ${onDark ? "text-on-dark-muted" : ""}`} value={sub} />}
    </div>
  );
}
```

`components/ui/Section.tsx`:

```tsx
import type { SectionTone } from "@/content/types";

const TONES: Record<SectionTone, string> = {
  default: "", alt: "bg-paper-alt", dark: "bg-navy-900 text-on-dark on-dark",
  warm: "bg-[linear-gradient(135deg,var(--color-paper-cool),var(--color-paper-warm))]",
};

export function Section({ tone = "default", tight, id, children }: { tone?: SectionTone; tight?: boolean; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`${tight ? "py-9" : "py-14 max-[980px]:py-10"} ${TONES[tone]}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}
```

`components/ui/Reveal.tsx` (client; arms `.reveal` elements on every navigation, honouring reduced motion — mirrors `reference/prototype/app.js` lines 4–13):

```tsx
"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function Reveal() {
  const path = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { (en.target as HTMLElement).classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [path]);
  return null;
}
```

Mount `<Reveal />` once in `app/layout.tsx` directly after `<Header />`.

`components/ui/ImagePh.tsx`:

```tsx
import type { Ratio } from "@/content/types";

const RATIO: Record<Ratio, string> = { "4-3": "aspect-[4/3]", "16-9": "aspect-[16/9]", "3-4": "aspect-[3/4]", "1-1": "aspect-square" };

export function ImagePh({ ratio, label, className = "" }: { ratio: Ratio; label: string; className?: string }) {
  return (
    <div className={`${RATIO[ratio]} grid place-items-center text-slate-400 text-[12.5px] text-center p-4 font-medium border border-line rounded-card bg-[repeating-linear-gradient(135deg,var(--color-line-soft)_0_12px,#fff_12px_24px)] ${className}`}>
      {label}
    </div>
  );
}
```

`components/ui/FaqList.tsx`:

```tsx
import { RichText } from "./RichText";

export function FaqList({ items, schema, openFirst }: { items: { q: string; a: string }[]; schema?: boolean; openFirst?: boolean }) {
  return (
    <>
      <div className="faq max-w-[940px] border-t border-line">
        {items.map((it, i) => (
          <details key={it.q} open={openFirst && i === 0 ? true : undefined} className="border-b border-line">
            <summary className="cursor-pointer py-[22px] pr-6 font-semibold text-[17px] flex justify-between gap-4 text-navy-900">{it.q}</summary>
            <RichText as="div" className="pb-6 text-slate-500 text-[15.5px] leading-[1.62] max-w-[70ch]" value={it.a} />
          </details>
        ))}
      </div>
      {schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a.replace(/\[\[[^\]]+\]\]/g, "").replace(/\*\*/g, "").trim() } })),
        }) }} />
      )}
    </>
  );
}
```

`components/ui/CtaBand.tsx`:

```tsx
import { RichText } from "./RichText";
import { ButtonRow } from "./Button";
import type { Btn } from "@/content/types";

export function CtaBand({ title, sub, buttons }: { title: string; sub?: string; buttons: Btn[] }) {
  return (
    <section className="bg-[linear-gradient(135deg,var(--color-navy-900),var(--color-navy-700))] text-on-dark py-[88px] on-dark">
      <div className="container-x reveal">
        <h2 className="text-on-dark mb-3">{title}</h2>
        {sub && <RichText as="p" className="lead text-on-dark-muted mb-7" value={sub} />}
        <ButtonRow buttons={buttons} />
      </div>
    </section>
  );
}
```

`components/ui/SourceBlock.tsx`:

```tsx
import { Ph } from "./Ph";
import { SITE } from "@/content/site";

export function SourceBlock({ primary, reviewedBy = true }: { primary: string; reviewedBy?: boolean }) {
  return (
    <div className="bg-white border border-line rounded-card px-[26px] py-[22px] text-[14px] text-slate-500 max-w-[820px]">
      <b className="block text-navy-700 mb-1.5 text-[12.5px] tracking-[.08em] uppercase">Reviewed against official ICA information</b>
      <div className="text-[13px] text-slate-400 mb-1.5">
        Last reviewed: <Ph label={SITE.placeholders.checkedOn} /> · Primary source: {primary}
        {reviewedBy && <> · Reviewed by: <Ph label="name, role" /></>}
      </div>
      GetSGPR is an independent consultancy and is not affiliated with or endorsed by ICA. Immigration policies and individual circumstances can change; ICA makes all final decisions.
    </div>
  );
}
```

`components/ui/Kv.tsx`:

```tsx
import { RichText } from "./RichText";

export function Kv({ rows }: { rows: { k: string; v: string }[] }) {
  return (
    <dl className="grid grid-cols-[160px_1fr] max-[980px]:grid-cols-1 gap-x-5 gap-y-2.5 text-[15.5px] m-0">
      {rows.map((r) => (
        <div key={r.k} className="contents">
          <dt className="text-slate-400 text-[12.5px] font-semibold tracking-[.06em] uppercase pt-[3px]">{r.k}</dt>
          <dd className="m-0 text-slate-500"><RichText value={r.v} /></dd>
        </div>
      ))}
    </dl>
  );
}
```

`components/ui/Prose.tsx`:

```tsx
import { RichText } from "./RichText";
import { Kv } from "./Kv";
import type { ProseItem } from "@/content/types";

export function Prose({ content, className = "" }: { content: ProseItem[]; className?: string }) {
  return (
    <div className={`prose-x ${className}`}>
      {content.map((it, i) => {
        if ("p" in it) return <RichText key={i} as="p" value={it.p} />;
        if ("h3" in it) return <h3 key={i}>{it.h3}{it.smallSuffix && <> <span className="small">({it.smallSuffix})</span></>}</h3>;
        if ("ul" in it) return <ul key={i}>{it.ul.map((li, j) => <li key={j}><RichText value={li} /></li>)}</ul>;
        if ("ol" in it) return <ol key={i}>{it.ol.map((li, j) => <li key={j}><RichText value={li} /></li>)}</ol>;
        if ("small" in it) return <RichText key={i} as="p" className="small" value={it.small} />;
        if ("kv" in it) return <Kv key={i} rows={it.kv} />;
        return <p key={i}><strong><RichText value={it.strong} /></strong></p>;
      })}
    </div>
  );
}
```

`components/ui/DataTable.tsx`:

```tsx
import { RichText } from "./RichText";

export function DataTable({ columns, rows }: { columns: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto bg-white border border-line rounded-card shadow-card">
      <table className="data-table">
        <thead><tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => cell === "✓"
                ? <td key={j} className="text-center text-green font-bold">✓</td>
                : cell === "—" ? <td key={j} className="text-center text-slate-300">—</td>
                : <td key={j}><RichText value={cell} /></td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

`lib/metadata.ts`:

```ts
import type { Metadata } from "next";
import type { PageMeta } from "@/content/types";

export function pageMetadata(meta: PageMeta): Metadata {
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.path },
    openGraph: { title: meta.title, description: meta.description, url: meta.path, siteName: "GetSGPR", locale: "en_SG", type: "website" },
  };
}
```

- [ ] **Step 4: Run tests and build**

Run: `npm run test; npm run build`
Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add -A; git commit -m "feat: content model types and UI primitives

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 7: Block components and the Blocks renderer

**Files:**
- Create: `components/blocks/Blocks.tsx`, `Hero.tsx`, `Trust.tsx`, `Stats.tsx`, `Honesty.tsx`, `Cards.tsx`, `Tiles.tsx`, `Items.tsx`, `Steps.tsx`, `Packages.tsx`, `Reviews.tsx`, `ContactSplit.tsx`, `Honest.tsx`, `SampleResult.tsx`, `Crumbs.tsx`, `Filters.tsx`, `SplitProse.tsx`, `Text.tsx`, `components/Page.tsx`, `content/packages.ts`
- Test: `tests/unit/blocks.test.tsx`

**Interfaces:**
- Consumes: everything from Task 6, `TESTIMONIALS`, `SITE`.
- Produces: `<Blocks blocks={Block[]} />` renders each block inside `<Section>` (except `hero`, `trust`, `cta`, `crumbs`, which manage their own wrapper). `<Page content={PageContent} />` renders `<Shapes/> <main> <Blocks/> </main>`. `PACKAGES` from `content/packages.ts`:

```ts
export type Package = {
  key: "lite" | "partnered" | "concierge"; slug: string; badge: { tone: Tone; label: string }; name: string;
  price: string; priceNote: string; tagline: string; bullets: string[]; bestFor: string; notFor: string[];
  cta: Btn; featured?: boolean;
};
export const PACKAGES: Package[]; export const REFUND_POLICY: string;
```

- The `hero` block's `aside.kind === "checker"` renders `<EligibilityChecker />` (Task 8). Until Task 8 exists, `Hero.tsx` imports it lazily from `@/components/widgets/EligibilityChecker`; create that file in this task as a stub `export function EligibilityChecker() { return null; }` and replace it in Task 8. Same for `readinessForm` → `ReadinessForm` and `contact` → `GhlForm`.

- [ ] **Step 1: Write the failing renderer test**

`tests/unit/blocks.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Blocks } from "@/components/blocks/Blocks";
import type { Block } from "@/content/types";

const blocks: Block[] = [
  { kind: "hero", variant: "dark", eyebrow: "Singapore PR consultancy", title: "Build a stronger application.", sub: "Sub **bold**", buttons: [{ label: "Go", href: "/packages", style: "light" }] },
  { kind: "trust", google: true },
  { kind: "cards", columns: 4, title: "Four services.", cards: [{ tone: "teal", badge: "PR", title: "Permanent Residence", text: "Text", tags: ["A", "B"], link: { label: "Learn more →", href: "/permanent-resident-sg" } }] },
  { kind: "steps", title: "How it works", tone: "dark", steps: [{ when: "Day 0", title: "Free consultation", text: "T" }] },
  { kind: "packages" },
  { kind: "reviews", title: "What clients say.", limit: 3 },
  { kind: "faq", title: "FAQ", items: [{ q: "Q?", a: "A" }], schema: true },
  { kind: "cta", title: "Know where you stand.", buttons: [{ label: "Start", href: "/pr-readiness-review", style: "light" }] },
];
const html = renderToStaticMarkup(<Blocks blocks={blocks} />);

describe("Blocks", () => {
  it("renders one h1 from the hero and h2s from block titles", () => {
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain("Four services.");
    expect(html).toContain("How it works");
  });
  it("renders trust facts and Google placeholders", () => {
    expect(html).toContain("UEN 53408306D");
    expect(html).toContain("Tradehub 21");
    expect(html).toContain('data-ph="Google rating"');
  });
  it("renders all three packages with live prices", () => {
    for (const p of ["S$197", "S$497", "S$1,997"]) expect(html).toContain(p);
  });
  it("renders testimonials with the verification badge", () => {
    expect(html).toContain("John Tan");
    expect(html).toContain("Pending verification");
  });
  it("renders the CTA band buttons", () => {
    expect(html).toContain('href="/pr-readiness-review"');
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm run test`
Expected: FAIL.

- [ ] **Step 3: Implement `content/packages.ts`**

Copy from `reference/prototype/home.html` lines 172–201 (bullets, taglines, best-for) plus the live "not suitable for" lists from the spec §3:

```ts
import type { Btn, Tone } from "./types";

export type Package = {
  key: "lite" | "partnered" | "concierge"; slug: string; badge: { tone: Tone; label: string }; name: string;
  price: string; priceNote: string; tagline: string; bullets: string[]; bestFor: string; notFor: string[]; cta: Btn; featured?: boolean;
};

export const REFUND_POLICY = "Once consultancy services have started, fees are non-refundable, even if applications are rejected.";

export const PACKAGES: Package[] = [
  {
    key: "lite", slug: "/sgpr-lite-diy-tier", badge: { tone: "teal", label: "DIY" }, name: "SGPR Lite",
    price: "S$197", priceNote: "one-time", tagline: "Do it yourself, without guessing.",
    bullets: ["Self-guided application toolkit", "ICA-linked document checklists and organiser", "Editable letter templates and consistency checklist", "Process resources, updated for 90 days"],
    bestFor: "For: Independent applicants wanting clarity and structure without agency fees.",
    notFor: ["Applicants with weak profiles who need custom strategy", "Those needing form-filling help or profile analysis", "People who already got rejected (should upgrade to Partnered or Concierge)"],
    cta: { label: "Get SGPR Lite", href: "/sgpr-lite-diy-tier", style: "primary" },
  },
  {
    key: "partnered", slug: "/sgpr-partnered-do-with-you", badge: { tone: "violet", label: "Most chosen" }, name: "SGPR Partnered",
    price: "S$497", priceNote: "one-time", tagline: "You remain in control. We pressure-test the case.",
    bullets: ["Everything in Lite", "Full Readiness Report and 60-minute strategy consultation", "Feedback via secure shared Drive, two review rounds", "Samples, forms and cover letter reviewed by a consultant"],
    bestFor: "For: Applicants wanting expert feedback and shared work across scheduled calls.",
    notFor: ["Applicants who need full document management or done-for-you writing", "Those unsure how to fill Form 4A — better served by Concierge", "Applicants needing ICA submission done on their behalf"],
    cta: { label: "Book SGPR Partnered", href: "/sgpr-partnered-do-with-you", style: "light" }, featured: true,
  },
  {
    key: "concierge", slug: "/sgpr-premium-concierge", badge: { tone: "amber", label: "Done for you" }, name: "Premium Concierge",
    price: "S$1,997", priceNote: "single applicant", tagline: "We manage the application with you from strategy to submission.",
    bullets: ["End-to-end white-glove service with a named case manager", "Full profile strategy, evidence matrix and writing", "Document handling and translation coordination", "ICA submission, live updates and a post-outcome strategy review"],
    bestFor: "For: Busy professionals and families wanting strategy, writing and submission handled.",
    notFor: ["People on a tight budget", "Those who enjoy DIY processes", "Applicants with incomplete documents or unresolved legal issues"],
    cta: { label: "Book a Concierge call", href: "/sgpr-premium-concierge", style: "primary" },
  },
];
```

- [ ] **Step 4: Implement block components**

Each block component takes its block type as props. Class recipes come from `reference/prototype/styles.css` (line numbers noted). Full code for the renderer and the most-used blocks; the rest follow the same shape.

`components/blocks/Blocks.tsx`:

```tsx
import type { Block } from "@/content/types";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/ui/CtaBand";
import { SourceBlock } from "@/components/ui/SourceBlock";
import { Hero } from "./Hero"; import { Trust } from "./Trust"; import { Stats } from "./Stats"; import { Honesty } from "./Honesty";
import { Cards } from "./Cards"; import { Tiles } from "./Tiles"; import { Items } from "./Items"; import { Steps } from "./Steps";
import { Packages } from "./Packages"; import { Reviews } from "./Reviews"; import { ContactSplit } from "./ContactSplit"; import { Honest } from "./Honest";
import { SampleResult } from "./SampleResult"; import { Crumbs } from "./Crumbs"; import { Filters } from "./Filters"; import { SplitProse } from "./SplitProse";
import { Text } from "./Text"; import { TableBlock } from "./TableBlock"; import { FaqBlock } from "./FaqBlock";
import { ReadinessForm } from "@/components/widgets/ReadinessForm";
import { SectionHead } from "@/components/ui/SectionHead";

function Inner({ b }: { b: Block }) {
  switch (b.kind) {
    case "stats": return <Stats {...b} />;
    case "honesty": return <Honesty {...b} />;
    case "cards": return <Cards {...b} />;
    case "tiles": return <Tiles {...b} />;
    case "items": return <Items {...b} />;
    case "steps": return <Steps {...b} onDark={b.tone === "dark"} />;
    case "packages": return <Packages {...b} />;
    case "reviews": return <Reviews {...b} />;
    case "faq": return <FaqBlock {...b} />;
    case "contact": return <ContactSplit {...b} />;
    case "source": return <SourceBlock primary={b.primary} reviewedBy={b.reviewedBy} />;
    case "table": return <TableBlock {...b} />;
    case "prose": return <SplitProse {...b} />;
    case "honest": return <Honest {...b} />;
    case "sampleResult": return <SampleResult />;
    case "filters": return <Filters {...b} />;
    case "text": return <Text {...b} />;
    case "readinessForm": return <><SectionHead eyebrow={b.eyebrow} title={b.title} sub={b.sub} /><ReadinessForm /></>;
    default: return null;
  }
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.kind === "hero") return <Hero key={i} {...b} />;
        if (b.kind === "trust") return <Trust key={i} google={b.google} />;
        if (b.kind === "cta") return <CtaBand key={i} title={b.title} sub={b.sub} buttons={b.buttons} />;
        if (b.kind === "crumbs") return <Crumbs key={i} items={b.items} />;
        return <Section key={i} tone={b.tone} tight={b.tight} id={b.id}><Inner b={b} /></Section>;
      })}
    </>
  );
}
```

`components/Page.tsx`:

```tsx
import type { PageContent } from "@/content/types";
import { Shapes } from "@/components/ui/Shapes";
import { Blocks } from "@/components/blocks/Blocks";

export function Page({ content }: { content: PageContent }) {
  return (<><Shapes preset={content.shapes} /><main><Blocks blocks={content.blocks} /></main></>);
}
```

`components/blocks/Hero.tsx` (styles.css lines 100–112):

```tsx
import type { Hero as HeroBlock } from "@/content/types";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RichText } from "@/components/ui/RichText";
import { ButtonRow } from "@/components/ui/Button";
import { ImagePh } from "@/components/ui/ImagePh";
import { Badge } from "@/components/ui/Badge";
import { EligibilityChecker } from "@/components/widgets/EligibilityChecker";

export function Hero(b: HeroBlock) {
  const dark = b.variant === "dark";
  const two = b.aside !== undefined;
  return (
    <section className={`relative py-24 pb-[88px] max-[980px]:py-14 ${dark ? "bg-[linear-gradient(180deg,var(--color-ink),var(--color-navy-900))] text-on-dark on-dark" : ""}`}>
      <div className={`container-x grid gap-14 items-center max-[980px]:grid-cols-1 max-[980px]:gap-8 ${two ? "grid-cols-[6.5fr_5.5fr]" : "grid-cols-1"}`}>
        <div>
          {b.eyebrow && <Eyebrow tone={b.eyebrowTone} onDark={dark}>{b.eyebrow}</Eyebrow>}
          <h1 className={`mb-5 max-w-[18ch] ${dark ? "text-on-dark" : ""}`}><RichText value={b.title} /></h1>
          {b.badge && <p className="small mb-4"><Badge><RichText value={b.badge} /></Badge></p>}
          {b.sub && <RichText as="p" className={`lead mb-[18px] ${dark ? "text-on-dark-muted" : ""}`} value={b.sub} />}
          {b.small && <RichText as="p" className={`small mb-[26px] max-w-[60ch] ${dark ? "text-on-dark-muted" : ""}`} value={b.small} />}
          <ButtonRow buttons={b.buttons} />
          {b.under && <RichText as="p" className={`small mt-3.5 ${dark ? "text-on-dark-muted" : ""}`} value={b.under} />}
        </div>
        {b.aside?.kind === "checker" && <EligibilityChecker />}
        {b.aside?.kind === "image" && <ImagePh ratio={b.aside.ratio} label={b.aside.label} className="min-h-[380px] max-[980px]:min-h-[240px]" />}
      </div>
    </section>
  );
}
```

`components/blocks/Trust.tsx` (styles.css 115–118; facts from `SITE`, Google line placeholders):

```tsx
import { SITE } from "@/content/site";
import { Ph } from "@/components/ui/Ph";

export function Trust({ google }: { google?: boolean }) {
  return (
    <div className="bg-paper-alt border-y border-line">
      <div className="container-x flex flex-wrap gap-x-6 gap-y-2 py-3.5 text-[13.5px] font-medium text-slate-500 items-center">
        <span>UEN {SITE.uen}</span><span>{SITE.address}</span><span>Fixed-price packages</span><span>No approval guarantees</span><span>Reply within 24 hours</span>
        {google && <span className="ml-auto text-navy-900 max-[980px]:ml-0">★ <Ph label={SITE.placeholders.googleRating} /> on Google · <Ph label={SITE.placeholders.reviewCount} /> reviews</span>}
      </div>
    </div>
  );
}
```

`components/blocks/Cards.tsx` (styles.css 138–152, 162–165):

```tsx
import Link from "next/link";
import type { Cards as CardsBlock, Card } from "@/content/types";
import { SectionHead } from "@/components/ui/SectionHead";
import { Badge } from "@/components/ui/Badge";
import { RichText } from "@/components/ui/RichText";
import { ImagePh } from "@/components/ui/ImagePh";
import { FootRow } from "./Text";

const COLS = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" } as const;
const TAG: Record<string, string> = { teal: "bg-teal-bg text-teal", red: "bg-red-bg text-red", amber: "bg-amber-bg text-amber", violet: "bg-violet-bg text-violet" };

function CardView({ c, i }: { c: Card; i: number }) {
  return (
    <div className="card-hover reveal bg-white border border-line rounded-card px-8 py-[34px] max-[980px]:px-6 max-[980px]:py-[30px] flex flex-col gap-2.5 shadow-card" style={{ animationDelay: `${i * 0.06}s` }}>
      {c.badge && <Badge tone={c.tone}>{c.badge}</Badge>}
      {c.outcome && <><Badge tone="green"><RichText value={c.badge ?? "[[Verified outcome]]"} /></Badge><ImagePh ratio="16-9" label={c.outcome.imageLabel} /></>}
      <h3 className="text-[22px] max-[980px]:text-[18px]"><RichText value={c.title} /></h3>
      {c.outcome && <RichText as="p" className="text-[13.5px] text-slate-400" value={c.outcome.meta} />}
      {c.text && <RichText as="p" className="text-slate-500 text-[15.5px] leading-[1.62]" value={c.text} />}
      {c.bullets && <ul className="pl-[18px] text-slate-500 text-[15px] grid gap-1.5 list-disc">{c.bullets.map((b) => <li key={b}><RichText value={b} /></li>)}</ul>}
      {c.outcome && (
        <dl className="mt-1.5 grid grid-cols-[110px_1fr] gap-x-3 gap-y-1.5 text-[14.5px]">
          <dt className="text-slate-400">Challenge</dt><dd className="m-0 text-slate-500"><RichText value={c.outcome.challenge} /></dd>
          <dt className="text-slate-400">What we did</dt><dd className="m-0 text-slate-500"><RichText value={c.outcome.did} /></dd>
          <dt className="text-slate-400">Result</dt><dd className="m-0 text-slate-500"><RichText value={c.outcome.result} /></dd>
        </dl>
      )}
      {c.tags && <div className="flex flex-wrap gap-1.5">{c.tags.map((t) => <span key={t} className={`text-[12.5px] font-medium px-2.5 py-1 rounded-full ${c.tone && TAG[c.tone] ? TAG[c.tone] : "bg-line-soft text-slate-500"}`}>{t}</span>)}</div>}
      {(c.link ?? (c.outcome && { label: "Read the full case →", href: c.outcome.href })) && (() => { const l = c.link ?? { label: "Read the full case →", href: c.outcome!.href }; return <Link href={l.href} className="mt-auto pt-2 font-semibold text-[15px] no-underline hover:underline">{l.label}</Link>; })()}
    </div>
  );
}

export function Cards(b: CardsBlock) {
  return (
    <>
      <SectionHead eyebrow={b.eyebrow} eyebrowTone={b.eyebrowTone} title={b.title} sub={b.sub} />
      <div className={`grid gap-[18px] max-[980px]:grid-cols-1 max-[980px]:gap-3.5 ${COLS[b.columns]}`} style={b.maxWidth ? { maxWidth: b.maxWidth } : undefined}>
        {b.cards.map((c, i) => <CardView key={c.title + i} c={c} i={i} />)}
      </div>
      {b.note && <RichText as="p" className="note" value={b.note} />}
      <FootRow foot={b.foot} />
    </>
  );
}
```

`components/blocks/Text.tsx` also exports `FootRow`:

```tsx
import Link from "next/link";
import type { Text as TextBlock, Foot } from "@/content/types";
import { SectionHead } from "@/components/ui/SectionHead";
import { RichText } from "@/components/ui/RichText";
import { ButtonRow, Button } from "@/components/ui/Button";

export function FootRow({ foot }: { foot?: Foot }) {
  if (!foot) return null;
  return (
    <div className="text-[14.5px] text-slate-400 mt-7 flex flex-wrap gap-x-6 gap-y-2 items-baseline">
      {foot.text && <RichText as="span" value={foot.text} />}
      {foot.link && <Link href={foot.link.href}>{foot.link.label}</Link>}
      {foot.button && <Button {...foot.button} />}
    </div>
  );
}

export function Text(b: TextBlock) {
  return (
    <>
      <SectionHead eyebrow={b.eyebrow} title={b.title} sub={b.sub} />
      {b.paragraphs?.map((p, i) => <RichText key={i} as="p" className="lead mb-3.5" value={p} />)}
      <ButtonRow buttons={b.buttons} className="mt-4" />
      <FootRow foot={b.foot} />
    </>
  );
}
```

Remaining blocks, each a thin wrapper of SectionHead + a grid, with class recipes from `styles.css`:

- `Stats.tsx` (lines 176–179): flex-wrap of white cards, value in `font-display text-[44px] font-semibold tracking-[-.035em] leading-none text-navy-700`, label `text-[14.5px] text-slate-500 mt-2`.
- `Honesty.tsx` (182–185): `rounded-panel px-14 py-[68px] max-[980px]:px-6 max-[980px]:py-[34px] grid grid-cols-[5fr_7fr] max-[980px]:grid-cols-1 gap-12 bg-[linear-gradient(135deg,var(--color-paper-cool),var(--color-paper-warm))] reveal`; h2 `text-[34px]`; paragraphs `text-[16.5px] leading-[1.68] text-[#3D4B47]`.
- `Tiles.tsx` (155–160): 4-col grid of tiles; `ours` tile gets `bg-teal-bg border-transparent` and number `text-teal`; then the `after` row (`grid grid-cols-2 items-center mt-7`: lead text + button) and `note`.
- `Items.tsx` (168–173): `grid gap-x-7 gap-y-[22px] grid-cols-2|3`; each item `grid gap-1.5` with h4 `text-[18px]` and p `text-slate-500 text-[15.5px]`; on dark, h4 `text-on-dark`.
- `Steps.tsx` (205–212): 4-col (3 when `steps.length === 3`) grid; dark step `bg-white/5 border border-[rgba(147,174,220,.2)] rounded-card px-[26px] py-7`, when label `text-[12.5px] font-semibold tracking-[.08em] uppercase text-blue-300`; `light` steps `bg-white border-line shadow-card`, when `text-navy-700`, h4 `text-navy-900`, p `text-slate-500`; note rendered `note` (on dark, `text-on-dark-muted`).
- `Packages.tsx` (188–202): maps `PACKAGES`; card `bg-white border border-line rounded-[22px] px-8 py-[34px] flex flex-col gap-3.5 shadow-card card-hover`; featured `bg-navy-900 border-navy-900 text-on-dark`; name `font-display text-[22px] font-semibold tracking-[-.02em]`; price `font-display text-[46px] font-semibold tracking-[-.035em] leading-none` with `<small className="font-body text-[14px] font-normal text-slate-400 ml-1.5">`; bullets `pl-[18px] grid gap-[7px] text-[15px] text-slate-500 list-disc`; `bestFor` `text-[14px] text-slate-400`; when `showNotFor`, a `border-t border-line-soft pt-3 text-[13.5px] text-slate-400` list "Not for: …"; CTA `mt-auto`. Default `note` when none given: `"Prices in SGD, [[include / exclude]] GST. ICA application fees and third-party costs are shown separately. No hidden consultancy fees. No approval guarantees. [Compare everything →](/packages)"`.
- `Reviews.tsx` (215–219): 3-col grid over `TESTIMONIALS.slice(0, limit ?? 9)`; each `bg-white border border-line rounded-card p-[30px] grid gap-3 shadow-card reveal`; opening quote mark `font-display text-[40px] leading-[.6] text-blue-300`; quote `text-[15.5px] text-slate-500`; who `text-[13.5px] text-slate-400 font-medium` as `{name} · {type} · <Ph label="Month, year" />`; when `verified === false`, a `<Badge tone="gold">Pending verification</Badge>` above the quote.
- `FaqBlock.tsx`: SectionHead + `<FaqList items schema openFirst />` + optional note.
- `TableBlock.tsx`: SectionHead + `<DataTable />` + note + FootRow.
- `SplitProse.tsx` (253–260): if `image` or `images` or `source`, a `grid grid-cols-[5fr_7fr] max-[980px]:grid-cols-1 gap-14` with the left column (ImagePh + caption `small`, or `<Prose content>` when the source is on the right) and the right column (`<Prose>` or `<SourceBlock primary={source} />`); otherwise just `<Prose>`. When `images` is given, render them in a `grid grid-cols-2 gap-[18px]` under the prose. Then FootRow.
- `ContactSplit.tsx`: SectionHead + `grid grid-cols-[5fr_7fr] max-[980px]:grid-cols-1 gap-14` with `<GhlForm />` in a `bg-white border border-line rounded-card overflow-hidden shadow-form` card and `<Prose content>` on the right.
- `Honest.tsx` (240–241): `bg-amber-bg rounded-card px-[30px] py-[26px] max-w-[820px]`, h3 + RichText p.
- `Crumbs.tsx` (309–310): `container-x` → `text-[13px] text-slate-400 pt-3.5`, items joined by " › ", linked when `href`.
- `Filters.tsx` (308): `flex flex-wrap gap-2 mb-7` of chips `border border-input-line rounded-full px-4 py-[9px] text-[14.5px] font-medium bg-white min-h-[44px] inline-flex items-center`; first chip `bg-navy-700 text-on-dark border-navy-700`. Static (no filtering behaviour is in the prototype).
- `SampleResult.tsx`: the `.result` card from `reference/prototype/readiness.html` result section (styles 301–305): three outcome paragraphs, the two-column Strong areas / Areas to strengthen lists with `[[List]]`, "Your three next actions" ol with three `[[Generated from answers]]`, "Recommended package" line `[[Lite / Partnered / Concierge]] · S$[[price]] · [[one line on why]].`, button row (`Book a 20-minute strategy call with [[consultant name]]` → `/contact`; ghost `[[Buy Lite / Book Partnered / Book a Concierge strategy call]]` → `/packages`), closing small print. All bracketed text through `RichText`.

- [ ] **Step 5: Create widget stubs so the build passes**

`components/widgets/EligibilityChecker.tsx`, `ReadinessForm.tsx`, `GhlForm.tsx`: each `export function X() { return null; }` (replaced in Task 8).

- [ ] **Step 6: Run tests and build**

Run: `npm run test; npm run build`
Expected: PASS.

- [ ] **Step 7: Commit**

```powershell
git add -A; git commit -m "feat: block components, Blocks renderer and package data

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 8: Widgets — eligibility checker, readiness questionnaire, GHL form, lead endpoint

**Files:**
- Create: `lib/checker.ts`, `lib/readiness.ts`, `lib/lead.ts`, `app/api/lead/route.ts`
- Replace: `components/widgets/EligibilityChecker.tsx`, `ReadinessForm.tsx`, `GhlForm.tsx`
- Test: `tests/unit/checker.test.ts`, `tests/unit/readiness.test.ts`, `tests/unit/lead.test.ts`

**Interfaces:**
- `lib/checker.ts`: `QUESTIONS: { q: string; options: string[] }[]` (six, verbatim from `reference/prototype/app.js` lines 16–23); `verdict(answers: number[]): { v: string; b: string; p: string; href: string }` (logic from app.js lines 24–31 with `k` mapped to the package route).
- `lib/readiness.ts`: `READINESS_QUESTIONS: { group: string; q: string; options: string[] }[]` (fifteen, verbatim from `reference/prototype/readiness.html` form section); `assess(answers: number[]): ReadinessResult` where `ReadinessResult = { outcome: "Ready to Prepare" | "Strengthen First" | "More Information Needed"; intro: string; strong: string[]; weak: string[]; actions: string[]; pkg: { name: string; price: string; why: string; href: string } }`.
- `lib/lead.ts`: `type Lead = { source: "checker" | "readiness"; email: string; firstName?: string; answers: number[]; outcome: string; pkg: string }`; `postLead(lead: Lead): Promise<boolean>` (client fetch to `/api/lead`).
- `app/api/lead/route.ts`: `POST` validates the JSON body (email regex, `answers` array of numbers); forwards to `process.env.GHL_LEAD_WEBHOOK_URL` when set; returns `202 { ok: true, forwarded: boolean }`; `400` on invalid body.

- [ ] **Step 1: Write failing tests**

`tests/unit/checker.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { QUESTIONS, verdict } from "@/lib/checker";

describe("eligibility checker", () => {
  it("has six questions", () => expect(QUESTIONS).toHaveLength(6));
  it("rejected before → appeal verdict → concierge", () => {
    expect(verdict([0, 2, 0, 1, 2, 0])).toMatchObject({ v: "An appeal may be viable.", href: "/sgpr-premium-concierge" });
  });
  it("under one year → wait → lite", () => {
    expect(verdict([0, 0, 0, 0, 3, 0])).toMatchObject({ v: "Waiting is probably smarter.", href: "/sgpr-lite-diy-tier" });
  });
  it("already PR → citizenship path", () => {
    expect(verdict([3, 2, 0, 0, 2, 0]).v).toBe("You're on the citizenship path.");
  });
  it("tenure and income strong → partnered", () => {
    expect(verdict([0, 2, 0, 0, 2, 0])).toMatchObject({ v: "You're in a strong position.", href: "/sgpr-partnered-do-with-you" });
  });
  it("family → conversation → concierge", () => {
    expect(verdict([0, 1, 2, 0, 0, 0])).toMatchObject({ v: "Worth a conversation.", href: "/sgpr-premium-concierge" });
  });
  it("default → conversation → partnered", () => {
    expect(verdict([0, 1, 0, 0, 0, 0])).toMatchObject({ v: "Worth a conversation.", href: "/sgpr-partnered-do-with-you" });
  });
});
```

`tests/unit/readiness.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { READINESS_QUESTIONS, assess } from "@/lib/readiness";

// answers are option indexes for Q1..Q15
const base = [0, 2, 2, 1, 3, 2, 2, 0, 1, 0, 0, 0, 0, 0, 5];

describe("readiness assessment", () => {
  it("has fifteen questions in four groups", () => {
    expect(READINESS_QUESTIONS).toHaveLength(15);
    expect(new Set(READINESS_QUESTIONS.map((q) => q.group)).size).toBe(4);
  });
  it("solid profile with complete evidence → Ready to Prepare", () => {
    const r = assess(base);
    expect(r.outcome).toBe("Ready to Prepare");
    expect(r.actions).toHaveLength(3);
    expect(r.pkg.href).toBe("/sgpr-partnered-do-with-you");
  });
  it("under one year residence → Strengthen First", () => {
    expect(assess([...base.slice(0, 4), 0, ...base.slice(5)]).outcome).toBe("Strengthen First");
  });
  it("missing evidence or known inconsistencies → Strengthen First", () => {
    expect(assess([...base.slice(0, 11), 2, ...base.slice(12)]).outcome).toBe("Strengthen First");
    expect(assess([...base.slice(0, 12), 3, ...base.slice(13)]).outcome).toBe("Strengthen First");
  });
  it("self-employed, variable income, 'Other' pass or unsure what changed → More Information Needed", () => {
    expect(assess([...base.slice(0, 7), 1, ...base.slice(8)]).outcome).toBe("More Information Needed");
    expect(assess([6, ...base.slice(1)]).outcome).toBe("More Information Needed");
    expect(assess([...base.slice(0, 13), 2, 6]).outcome).toBe("More Information Needed");
  });
  it("rejected more than once with nothing changed → Strengthen First, concierge", () => {
    const r = assess([...base.slice(0, 13), 3, 5]);
    expect(r.outcome).toBe("Strengthen First");
    expect(r.pkg.href).toBe("/sgpr-premium-concierge");
  });
});
```

`tests/unit/lead.test.ts` (route handler, no network):

```ts
import { describe, it, expect, vi, afterEach } from "vitest";
import { POST } from "@/app/api/lead/route";

const body = { source: "checker", email: "a@b.co", answers: [0, 1], outcome: "x", pkg: "Lite" };
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

describe("POST /api/lead", () => {
  it("rejects a bad email", async () => {
    const res = await POST(new Request("http://x/api/lead", { method: "POST", body: JSON.stringify({ ...body, email: "nope" }) }));
    expect(res.status).toBe(400);
  });
  it("accepts without forwarding when no webhook is configured", async () => {
    const res = await POST(new Request("http://x/api/lead", { method: "POST", body: JSON.stringify(body) }));
    expect(res.status).toBe(202);
    expect(await res.json()).toEqual({ ok: true, forwarded: false });
  });
  it("forwards when GHL_LEAD_WEBHOOK_URL is set", async () => {
    vi.stubEnv("GHL_LEAD_WEBHOOK_URL", "https://hook.example/x");
    const spy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("ok", { status: 200 }));
    const res = await POST(new Request("http://x/api/lead", { method: "POST", body: JSON.stringify(body) }));
    expect(spy).toHaveBeenCalledWith("https://hook.example/x", expect.objectContaining({ method: "POST" }));
    expect(await res.json()).toEqual({ ok: true, forwarded: true });
  });
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm run test`
Expected: FAIL.

- [ ] **Step 3: Implement `lib/checker.ts`**

```ts
export const QUESTIONS = [
  { q: "What is your current status in Singapore?", options: ["Employment Pass", "S Pass / Work Permit", "Dependant's Pass or LTVP", "Already a PR"] },
  { q: "How long have you worked in Singapore?", options: ["Under 1 year", "1–2 years", "2–5 years", "More than 5 years"] },
  { q: "Are you applying alone or with family?", options: ["On my own", "With spouse", "With spouse and children"] },
  { q: "Have you applied before?", options: ["No, first application", "Yes, and it was rejected", "Yes, still pending"] },
  { q: "Monthly income range?", options: ["Below $4,000", "$4,000 – $6,000", "$6,000 – $10,000", "Above $10,000"] },
  { q: "When would you like to submit?", options: ["As soon as possible", "Within 6 months", "Just researching"] },
];

const CONCIERGE = { p: "Premium Concierge — S$1,997", href: "/sgpr-premium-concierge" };
const PARTNERED = { p: "SGPR Partnered — S$497", href: "/sgpr-partnered-do-with-you" };
const LITE = { p: "SGPR Lite — S$197", href: "/sgpr-lite-diy-tier" };

export function verdict(a: number[]) {
  if (a[3] === 1) return { v: "An appeal may be viable.", b: "A rejection is a decision on one application, not on you. What matters now is what has materially changed since you applied. We review the previous submission with you and advise on appeal or re-submission on the merits.", ...CONCIERGE };
  if (a[1] === 0) return { v: "Waiting is probably smarter.", b: "ICA weighs length of residence and a stable employment record. With under a year in Singapore, most applicants are better served building that record first. SGPR Lite gets your documents in order now, so you are ready when the time is right.", ...LITE };
  if (a[0] === 3) return { v: "You're on the citizenship path.", b: "Citizenship asks a different question from PR: not whether you could contribute, but whether you already belong here. We help you evidence that and time the application sensibly.", ...CONCIERGE };
  if (a[1] >= 2 && a[4] >= 2) return { v: "You're in a strong position.", b: "Tenure and income are two of the factors ICA says it considers, and yours look solid. The work now is making sure your evidence is current and consistent, and your application tells one clear story.", ...PARTNERED };
  if (a[2] === 2) return { v: "Worth a conversation.", b: "Family applications are one story told through several people's records. The extra work is keeping every date, address and relationship consistent. Premium Concierge gives your household one accountable case manager.", ...CONCIERGE };
  return { v: "Worth a conversation.", b: "Your answers do not point to an obvious yes or no, which is normal. A free call will tell you whether now is the right time and what to prepare.", ...PARTNERED };
}
```

- [ ] **Step 4: Implement `lib/readiness.ts`**

Questions verbatim from `reference/prototype/readiness.html` (groups "Group A — Profile", "Group B — Residence and work", "Group C — Family and ties", "Group D — Evidence and timing"). Rubric (documented in the README as a GetSGPR diagnostic, not an ICA score):

```ts
export type Outcome = "Ready to Prepare" | "Strengthen First" | "More Information Needed";
export type ReadinessResult = { outcome: Outcome; intro: string; strong: string[]; weak: string[]; actions: string[]; pkg: { name: string; price: string; why: string; href: string } };

export const READINESS_QUESTIONS = [
  { group: "Group A — Profile", q: "1. Which pass do you hold now?", options: ["Employment Pass", "S Pass", "Work Permit", "Dependant's Pass", "LTVP", "Student Pass", "Other"] },
  { group: "Group A — Profile", q: "2. What is your age band?", options: ["Under 25", "25–29", "30–34", "35–39", "40–44", "45–49", "50 and above"] },
  { group: "Group A — Profile", q: "3. What is your highest completed qualification?", options: ["Secondary", "Diploma", "Bachelor's", "Master's", "Doctorate", "Professional qualification"] },
  { group: "Group A — Profile", q: "4. Was that qualification obtained in Singapore?", options: ["Yes", "No"] },
  { group: "Group B — Residence and work", q: "5. How long have you lived in Singapore continuously?", options: ["Under 1 year", "1–2", "2–4", "4–6", "6–10", "Over 10 years"] },
  { group: "Group B — Residence and work", q: "6. How long have you been with your current employer or business?", options: ["Under 6 months", "6–12 months", "1–3 years", "Over 3 years"] },
  { group: "Group B — Residence and work", q: "7. What is your monthly salary band?", options: ["Under S$4,000", "S$4,000–6,999", "S$7,000–9,999", "S$10,000–14,999", "S$15,000 and above", "Self-employed, variable"] },
  { group: "Group B — Residence and work", q: "8. Are you employed or self-employed?", options: ["Employed", "Self-employed or business owner", "Both"] },
  { group: "Group C — Family and ties", q: "9. Are you married to, or the child or parent of, a Singapore citizen or PR?", options: ["Yes", "No"] },
  { group: "Group C — Family and ties", q: "10. Will family members be included in your application?", options: ["No", "Spouse", "Spouse and children", "Children only", "Parents"] },
  { group: "Group C — Family and ties", q: "11. Do you have Singapore-based evidence of community involvement, such as volunteering, associations or professional bodies?", options: ["Yes, within the last two years", "Yes, but older", "No"] },
  { group: "Group D — Evidence and timing", q: "12. Do you have an employment letter dated within the last month and six months of payslips?", options: ["Both", "One", "Neither"] },
  { group: "Group D — Evidence and timing", q: "13. Do the dates and job titles on your CV, payslips, CPF and employment letters all agree?", options: ["Yes", "Mostly", "Not sure", "Known differences"] },
  { group: "Group D — Evidence and timing", q: "14. Have you applied for Singapore PR before?", options: ["No", "Yes, withdrawn", "Yes, rejected once", "Yes, rejected more than once"] },
  { group: "Group D — Evidence and timing", q: "15. If rejected: what has materially changed since your last application?", options: ["New job or promotion", "Salary increase", "Marriage or child", "Longer residence", "New qualification", "Nothing significant", "Not sure"] },
];

const INTRO: Record<Outcome, string> = {
  "Ready to Prepare": "Based on your answers, your profile and evidence look ready to be assembled into an application. The work now is doing it well.",
  "Strengthen First": "Based on your answers, one or more factors would benefit from work before you apply. Doing that work first is usually better than applying and hoping.",
  "More Information Needed": "Your answers raise a question we cannot resolve without talking to you. That is not a bad sign; it means your situation needs a person, not a form.",
};

export function assess(a: number[]): ReadinessResult {
  const strong: string[] = [], weak: string[] = [], actions: string[] = [];
  const rejected = a[13] >= 2;
  // factor reads
  if (a[4] >= 3) strong.push("Residence continuity"); else if (a[4] === 0) weak.push("Residence continuity");
  if (a[5] >= 2) strong.push("Employment stability"); else if (a[5] === 0) weak.push("Employment stability");
  if (a[6] >= 2 && a[6] <= 4) strong.push("Economic contribution"); else if (a[6] === 0) weak.push("Economic contribution");
  if (a[2] >= 2) strong.push("Qualifications"); if (a[3] === 0) strong.push("Singapore qualification");
  if (a[8] === 0) strong.push("Family ties to Singapore");
  if (a[10] === 0) strong.push("Integration evidence"); else weak.push("Integration evidence");
  if (a[11] === 0) strong.push("Evidence currency"); else weak.push("Evidence currency");
  if (a[12] === 0) strong.push("Cross-document consistency"); else if (a[12] >= 2) weak.push("Cross-document consistency");
  if (rejected) weak.push("Previous rejection");

  let outcome: Outcome = "Ready to Prepare";
  const needsPerson = a[0] === 6 || a[6] === 5 || a[7] >= 1 || (rejected && a[14] === 6);
  const mustStrengthen = a[4] === 0 || a[11] === 2 || a[12] === 3 || (rejected && a[14] === 5) || a[5] === 0;
  if (needsPerson) outcome = "More Information Needed";
  else if (mustStrengthen || weak.length >= 3) outcome = "Strengthen First";

  if (a[11] !== 0) actions.push("Obtain an employment letter dated within the last month and gather six months of payslips.");
  if (a[12] !== 0) actions.push("Reconcile dates and job titles across your CV, payslips, CPF statements and employment letters.");
  if (a[10] !== 0) actions.push("Document Singapore-based community involvement from the last two years, or start it now.");
  if (a[4] === 0) actions.push("Build a longer, continuous residence record before you submit.");
  if (rejected) actions.push("Write down exactly what has changed since your last application and how you can evidence it.");
  actions.push("Book a free 20-minute call to confirm timing and the package that fits.");
  const three = actions.slice(0, 3);

  const pkg = (a[13] === 3 || (rejected && a[14] >= 5) || a[9] >= 2) ? { name: "Premium Concierge", price: "S$1,997", why: "your case needs one accountable case manager and the narrative written for you.", href: "/sgpr-premium-concierge" }
    : outcome === "Strengthen First" && weak.length <= 1 ? { name: "SGPR Lite", price: "S$197", why: "you can get your documents in order now and apply when the record is stronger.", href: "/sgpr-lite-diy-tier" }
    : { name: "SGPR Partnered", price: "S$497", why: "a consultant pressure-tests your evidence while you stay in control.", href: "/sgpr-partnered-do-with-you" };

  return { outcome, intro: INTRO[outcome], strong, weak, actions: three, pkg };
}
```

Check each test case against this rubric before running: `base` gives strong ≥ 5, weak = 0 → Ready; setting Q5 to 0 → mustStrengthen; Q12 = 2 → mustStrengthen; Q13 = 3 → mustStrengthen; Q8 = 1 → needsPerson; Q1 = 6 → needsPerson; Q14 = 2 with Q15 = 6 → needsPerson; Q14 = 3 with Q15 = 5 → mustStrengthen and pkg Concierge (a[13] === 3).

- [ ] **Step 5: Implement `lib/lead.ts` and the route**

`lib/lead.ts`:

```ts
export type Lead = { source: "checker" | "readiness"; email: string; firstName?: string; answers: number[]; outcome: string; pkg: string };
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function postLead(lead: Lead): Promise<boolean> {
  try {
    const res = await fetch("/api/lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(lead) });
    return res.ok;
  } catch { return false; }
}
```

`app/api/lead/route.ts`:

```ts
import { NextResponse } from "next/server";
import { EMAIL_RE, type Lead } from "@/lib/lead";

export async function POST(req: Request) {
  let body: Partial<Lead>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 }); }
  if (!body || typeof body.email !== "string" || !EMAIL_RE.test(body.email) || !Array.isArray(body.answers) || !body.answers.every((n) => typeof n === "number") || (body.source !== "checker" && body.source !== "readiness"))
    return NextResponse.json({ ok: false, error: "invalid lead" }, { status: 400 });
  const url = process.env.GHL_LEAD_WEBHOOK_URL;
  let forwarded = false;
  if (url) {
    try {
      const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...body, receivedAt: new Date().toISOString() }) });
      forwarded = res.ok;
    } catch { forwarded = false; }
  }
  return NextResponse.json({ ok: true, forwarded }, { status: 202 });
}
```

- [ ] **Step 6: Implement the three widgets**

`components/widgets/GhlForm.tsx` (iframe from `reference/prototype/home.html` line 264; the embed script once):

```tsx
"use client";
import Script from "next/script";
import { SITE } from "@/content/site";

export function GhlForm({ suffix = "form" }: { suffix?: string }) {
  const id = `inline-${SITE.ghl.formId}-${suffix}`;
  return (
    <>
      <iframe src={`https://api.leadconnectorhq.com/widget/form/${SITE.ghl.formId}`} id={id} title="Contact Us Form"
        data-layout="{'id':'INLINE'}" data-trigger-type="alwaysShow" data-activation-type="alwaysActivated" data-deactivation-type="neverDeactivate"
        data-form-name="Contact Us Form" data-height="815" data-layout-iframe-id={id} data-form-id={SITE.ghl.formId} data-cookie-consent="true" data-cookie-consent-provider="auto"
        style={{ width: "100%", height: 815, border: "none", display: "block" }} loading="lazy" />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </>
  );
}
```

`components/widgets/EligibilityChecker.tsx` — a React port of `app.js` lines 33–75 using `useState` for `{ step, answers, email, emailError, emailStage, emailSaved }`; markup and copy from `home.html` lines 38–63 (pips progress bar with `role="progressbar"`, question view, email view with "Show my result" / "Skip and just show me", result view with verdict, body, "Suggested package: **…**", "✓ Sent to …" when saved, the "A GetSGPR snapshot, not an ICA decision…" fine print, "Book a free call" → `/contact`, "Start over"). On "Show my result" with a valid email, call `postLead({ source: "checker", email, answers, outcome: r.v, pkg: r.p })` and proceed regardless of the response. Styles from styles.css 281–298 (`bg-white text-navy-900 rounded-[22px] p-[30px] shadow-form grid gap-[18px]`, options `text-left font-medium text-[15.5px] min-h-[52px] px-4 py-3 border border-input-line rounded-btn bg-white hover:border-blue-200 hover:bg-line-soft`, verdict `font-display text-[27px] font-semibold tracking-[-.03em] leading-[1.15]`, sent chip `bg-green-bg text-green rounded-chip px-3.5 py-2.5 text-[14px] font-medium`, package line `bg-line-soft rounded-chip px-3.5 py-3 text-[14.5px]`).

`components/widgets/ReadinessForm.tsx` — client component rendering `READINESS_QUESTIONS` grouped under h3s with the `.progress` bar (four spans, one per group, `on` once any answer in that group is set), choice chips (`.choice` recipe, styles 269–271; selected `bg-navy-700 text-on-dark border-navy-700`), then "Where should we send your result?" with First name + Email fields, the consent checkbox (label text verbatim from readiness.html, "Privacy policy" linking to `/privacy-data-security`), a "See my result" primary button, and the small print. Validation: all 15 answered (Q15 may be skipped when Q14 is "No" or "Yes, withdrawn"), email matches `EMAIL_RE`, consent checked; show a red `text-red text-[13.5px]` error line otherwise. On submit: `assess(answers)`, `postLead({ source: "readiness", email, firstName, answers, outcome, pkg: pkg.name })`, then render the result card (same layout as `SampleResult` but with real values: outcome in the h2 "Your PR readiness result: {outcome}", intro, strong/weak lists, three actions, "Recommended package: {name} · {price} · {why}", buttons "Book a 20-minute strategy call" → `/contact` and `{pkg.cta}` → `pkg.href`, closing small print "Message us on WhatsApp to schedule (scheduling only, no documents). This result is a GetSGPR diagnostic and not a prediction of ICA's decision. ICA assesses every application on its own merits."). Scroll the result into view with `scrollIntoView({ behavior: reduce ? "auto" : "smooth" })`.

- [ ] **Step 7: Run tests and build**

Run: `npm run test; npm run build`
Expected: PASS (all unit suites).

- [ ] **Step 8: Commit**

```powershell
git add -A; git commit -m "feat: eligibility checker, readiness questionnaire, GHL form and lead endpoint

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 9: Playwright harness (smoke, redirects, parity) and the Home page

**Files:**
- Create: `playwright.config.ts`, `tests/e2e/smoke.spec.ts`, `tests/e2e/redirects.spec.ts`, `tests/e2e/parity.spec.ts`, `tests/e2e/parity-allowlist.ts`, `tests/e2e/prototype-text.ts`, `content/pages/home.ts`
- Modify: `app/page.tsx`

**Interfaces:**
- `tests/e2e/prototype-text.ts`: `prototypeSentences(pageKey: string): string[]` reads `../../reference/prototype/<key>.html`, keeps only `<main>…</main>`, drops `<header>`, `<footer>`, `.shapes`, `.action-bar`, `<iframe>`, `<script>`, `<style>`; converts `<span class="ph">[X]</span>` to `[X]`; strips tags; splits on sentence boundaries; keeps strings ≥ 24 chars; drops any sentence starting with a builder-note prefix (Global Constraints) and any sentence containing a forbidden phrase; returns unique normalised sentences (collapse whitespace, curly quotes → straight).
- `tests/e2e/parity-allowlist.ts`: `ALLOW: Record<string, string[]>` of prototype sentences intentionally not carried per page key (start with `home: ["approval rate across cases we prepared"]`).
- Parity rule: for route R with prototype key K, every sentence from `prototypeSentences(K)` not in `ALLOW[K]` must appear (same normalisation) in the rendered page's `main` innerText.
- `ROUTE_KEYS: Record<string, string>` mapping route → prototype key, in `parity.spec.ts`, extended by each page task.

- [ ] **Step 1: Playwright config**

`playwright.config.ts`:

```ts
import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  use: { baseURL: "http://localhost:3100", headless: true },
  webServer: { command: "npm run build; npx next start -p 3100", url: "http://localhost:3100", reuseExistingServer: !process.env.CI, timeout: 180_000 },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
});
```

On PowerShell, `;` in `command` is fine because Playwright spawns it through the system shell.

- [ ] **Step 2: Write the e2e specs (they fail until pages exist)**

`tests/e2e/smoke.spec.ts`:

```ts
import { test, expect } from "@playwright/test";
import { NAV } from "../../content/nav";
import { SITE } from "../../content/site";
import { FORBIDDEN } from "../../lib/compliance";

for (const route of NAV.routes) {
  test(`smoke ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("footer")).toContainText(SITE.disclaimer);
    const body = (await page.locator("body").innerText()).replace(/\[[^\]]+\]/g, " ");
    for (const re of FORBIDDEN) expect(body, `forbidden ${re}`).not.toMatch(re);
    expect(errors).toEqual([]);
  });
}
```

`tests/e2e/redirects.spec.ts`:

```ts
import { test, expect } from "@playwright/test";
import { REDIRECTS } from "../../lib/redirects";

for (const r of REDIRECTS) {
  test(`redirect ${r.source} → ${r.destination}`, async ({ request }) => {
    const res = await request.get(r.source, { maxRedirects: 0 });
    expect([301, 308]).toContain(res.status());
    expect(res.headers()["location"]).toContain(r.destination.split("#")[0]);
  });
}
```

`tests/e2e/prototype-text.ts`:

```ts
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { FORBIDDEN } from "../../lib/compliance";

const NOTE_PREFIX = ["Layout note", "Placeholder structure", "Mark up as schema.org", "Placeholder copy", "Layout of the page shown after"];
export function norm(s: string) {
  return s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim();
}
export function prototypeSentences(key: string): string[] {
  let html = readFileSync(join(__dirname, "../../../reference/prototype", `${key}.html`), "utf8");
  html = html.slice(html.indexOf("<main>"), html.indexOf("</main>"));
  html = html.replace(/<(script|style|iframe)[\s\S]*?<\/\1>/g, " ")
             .replace(/<div class="shapes"[\s\S]*?<\/div><\/div>/g, " ")
             .replace(/<span class="ph">\[([^\]]+)\]<\/span>/g, "[$1]")
             .replace(/<[^>]+>/g, " ")
             .replace(/&amp;/g, "&").replace(/&nbsp;/g, " ");
  const out = new Set<string>();
  for (const raw of html.split(/(?<=[.!?…])\s+|\n+/)) {
    const s = norm(raw);
    if (s.length < 24) continue;
    if (NOTE_PREFIX.some((p) => s.startsWith(p))) continue;
    if (FORBIDDEN.some((re) => re.test(s.replace(/\[[^\]]+\]/g, " ")))) continue;
    out.add(s);
  }
  return [...out];
}
```

`tests/e2e/parity.spec.ts`:

```ts
import { test, expect } from "@playwright/test";
import { prototypeSentences, norm } from "./prototype-text";
import { ALLOW } from "./parity-allowlist";

export const ROUTE_KEYS: Record<string, string> = { "/": "home" };

for (const [route, key] of Object.entries(ROUTE_KEYS)) {
  test(`parity ${route} ⇄ ${key}.html`, async ({ page }) => {
    await page.goto(route);
    const text = norm(await page.locator("main").innerText());
    const missing = prototypeSentences(key).filter((s) => !(ALLOW[key] ?? []).some((a) => s.includes(a)) && !text.includes(s));
    expect(missing, `missing from ${route}:\n${missing.join("\n")}`).toEqual([]);
  });
}
```

`tests/e2e/parity-allowlist.ts`: `export const ALLOW: Record<string, string[]> = { home: ["approval rate across cases we prepared", "Requires substantiation"] };`

Add `"e2e": "playwright test"` (already in scripts). Run: `npm run e2e` → smoke fails for every route except the placeholder home, parity fails: expected at this point.

- [ ] **Step 3: Write `content/pages/home.ts`**

Transcribe `reference/prototype/home.html` lines 28–279 into blocks, in order. Exact block sequence:

1. `hero` dark: eyebrow "Singapore PR consultancy"; title, sub, small (= `SITE.independenceLine`), buttons [light "Get My Free PR Readiness Report" → `/pr-readiness-review`, outline-dark "Compare Packages" → `/packages`], under "Or answer six quick questions on the right for an instant snapshot.", aside `{ kind: "checker" }`.
2. `trust` google: true.
3. `stats` tight: only `{ value: "24 hours", label: "we respond within" }` (the approval-rate stat is dropped by decision).
4. `honesty` alt: title "We do not guarantee 100% approval simply for marketing purposes." + two paragraphs (lines 88–89).
5. `cards` columns 4, eyebrow "Services", title "Four services. One standard: evidence first.", four cards (lines 100–134) with tones teal/red/teal/red, badges, text, tags and "Learn more →" links to the four service routes.
6. `tiles` alt: eyebrow "Our diagnostic", title "The GetSGPR PR Readiness Review™", sub (line 142), eight tiles (line 143; the eighth `ours: true`, n "08 · GetSGPR layer"), after `{ text: "You receive one of three outcomes — **Ready to Prepare**, **Strengthen First** or **More Information Needed** — with three concrete next actions and the package that fits.", button: primary "Start the free review" → /pr-readiness-review }`, note (line 148).
7. `items` columns 3: title "PR strategy, not just PR paperwork.", sub (line 154), six items (line 155).
8. `steps` dark: eyebrow "Process", title "How it works, from first call to submission.", four steps (line 163), note (line 164).
9. `packages`: eyebrow "Packages", title "Choose how much support you need. Know the price before you speak to us." (note default).
10. `cards` alt columns 3: eyebrow "Client cases", title "Real applicants. Real journeys. Verifiable outcomes.", sub (line 209), three outcome cards (lines 211–231: badges `[[PR Approved]]`, `[[Reapplication Approved]]`, `[[Application Submitted]]`; imageLabel; meta; challenge/did/result placeholders; href `/case-studies/sample-reapplication`), foot `{ text: "Every application is assessed by ICA on its own merits. Past outcomes do not predict future approval.", link: { label: "Read all case studies →", href: "/case-studies" } }`. The "Layout note" is dropped.
11. `reviews`: eyebrow "Testimonials", title "What clients say.", limit 3 (sub dropped: it was a builder note).
12. `items` alt columns 2: title "Your documents are sensitive. We treat them that way.", sub (line 246), four items (line 247, with `[[x months]]`, `[[Name]]`, `[[email]]`), foot `{ text: "**We will never ask you to send passports or NRIC/FIN numbers over WhatsApp or during a free consultation.**", link: { label: "How we handle your data →", href: "/privacy-data-security" } }`.
13. `faq`: eyebrow "FAQ", title "Questions people ask before they call us.", six items (line 255, keep the `[[Lift verbatim from the live site.]]` suffixes), schema true, openFirst true.
14. `contact` alt id "contact": eyebrow "Contact", title "Book a free call.", sub (line 262), prose (lines 266–269: h3 "Or reach us directly", p with WhatsApp link `[WhatsApp +65 8934 0818](https://wa.me/6589340818)`, languages line, strong warning).
15. `cta`: title "Know where you stand before you apply.", sub (line 277), buttons [light → /pr-readiness-review, outline-dark "Book a free call" → /contact].

`meta`: `{ title: "Singapore PR Application Consultant | Evidence-Led PR Strategy — GetSGPR", description: "Evidence-led Singapore PR application support: a free 8-factor Readiness Review, fixed-price packages from S$197, and no approval guarantees.", path: "/" }`; `shapes: "home"`.

`app/page.tsx`:

```tsx
import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/metadata";
import { home } from "@/content/pages/home";
export const metadata = pageMetadata(home.meta);
export default function HomePage() { return <Page content={home} />; }
```

- [ ] **Step 4: Run the full suite**

Run: `npm run test; npm run e2e -- --grep "smoke /$|parity /|redirect"`
Expected: unit PASS; smoke `/` PASS; redirects PASS; parity `/` PASS. If parity lists missing sentences, fix the content file (never the allowlist) unless the sentence is a builder note or a removed compliance item.

- [ ] **Step 5: Commit**

```powershell
git add -A; git commit -m "feat: home page content and Playwright smoke, redirect and parity suites

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

## Page tasks — shared procedure

Tasks 10–18 each port prototype pages. Every one follows this procedure; the task text lists only what differs.

**Transcription rules (apply to every page):**
1. Open `reference/prototype/<key>.html`. Work through `<main>` top to bottom; each `<section>` becomes one block (or the `hero` / `trust` / `cta` / `crumbs` block). `section.alt` → `tone: "alt"`, `section.dark` → `tone: "dark"`, `section.warm` → `tone: "warm"`, `section.tight` → `tight: true`, `id="…"` → `id`.
2. Copy text verbatim. `<span class="ph">[X]</span>` → `[[X]]`. `<strong>` → `**…**`. `<a href="#key">` → `[label](/route)` using the spec §4 route map (`#pr` → `/permanent-resident-sg`, `#readiness` → `/pr-readiness-review`, `#contact` → `/contact`, `#packages` → `/packages`, `#pkg-lite` → `/sgpr-lite-diy-tier`, `#cases` → `/case-studies`, `#case` → `/case-studies/sample-reapplication`, `#guides` → `/guides`, `#faq` → `/guides/singapore-pr-faq`, `#privacy` → `/privacy-data-security`, `#home` → `/`; `#form` → `#form`, `#result` → `#result`, `#appeal` on the packages page → `#appeal`).
3. Trust strip: the prototype's `[Tradehub 21, full address]` is replaced by the real address (the `trust` block does this itself).
4. `[Legal entity name]` → "SGPR Immigration Singapore". `[Full address, Tradehub 21]` / `[Tradehub 21, full address]` / `[Address]` / `[Postal address]` → the full address. `[Phone]` → "+65 8934 0818". Every other bracket stays a placeholder.
5. Drop builder notes (Global Constraints list). Drop the approval-rate stat wherever it appears.
6. `img-ph` divs → `aside: { kind: "image", ratio, label }` in heroes, `image`/`images` in `prose` blocks, `outcome.imageLabel` in outcome cards.
7. Page `meta.title` = the `data-title` on the reference file's line 2. `meta.description` = the hero `sub` trimmed to ≤ 160 characters. `meta.path` = the route.
8. `shapes`: "home" for `/`, "service" for the eight service pages and the readiness page, "plain" for everything else.

**Wiring (every page):** `app/<route>/page.tsx` is the five-line file shown in Task 9 Step 3 with the content import swapped. Add `"<route>": "<key>"` to `ROUTE_KEYS` in `tests/e2e/parity.spec.ts`.

**Verification (every page):** `npm run test; npm run e2e -- --grep "<route>"` → smoke and parity PASS for that route. Then `npm run build`.

**Commit (every page task):** `git add -A; git commit -m "<message in task>"` with the Co-Authored-By trailer.

---

### Task 10: Services overview and the PR flagship page

**Files:**
- Create: `content/services.ts`, `content/pages/services.ts`, `content/pages/pr.ts`, `app/services/page.tsx`, `app/permanent-resident-sg/page.tsx`
- Modify: `tests/e2e/parity.spec.ts`

**Interfaces:**
- `content/services.ts` exports `SERVICES: { key: "pr" | "citizenship" | "ltvp" | "appeal"; label: string; href: string; tone: Tone; badge: string; summary: string; tags: string[] }[]` (the four home cards' data, reused by the Services overview and the Cards on Home in Task 9 can stay inline).

- [ ] **Step 1: `content/pages/services.ts`** from `services.html`: `hero` plain (eyebrow "Services", title "Four services. One standard: evidence first, no approval guarantees.", sub, small, buttons); `trust`; `cards` columns 2 (four service cards from `SERVICES`, each with bullets from the reference and a link); `text` alt ("Not sure which applies to you?" + paragraph + button to `/pr-readiness-review`); `steps` light ("The same six stages, every time." — the reference `steps` div has six steps, so `Steps` renders `grid-cols-3` when `steps.length % 3 === 0 && steps.length !== 4`); `source` alt tight (primary: the reference's "Primary source" text).
- [ ] **Step 2: `content/pages/pr.ts`** from `pr.html` (read in full above): `hero` light (eyebrow "Permanent Resident", title, sub, small, buttons [primary → /pr-readiness-review, ghost "Compare Packages" → /packages], aside image 4-3 "Photo relevant to this segment, no client faces without consent"); `trust`; `cards` columns 3 title "Which applicant are you?" (five cards, links to the four sub-routes and `/pr-appeal`); `items` alt columns 2 "Where PR applications usually go wrong." (five); `prose` "What ICA says it considers." with `content: [{p}, {small: "Source: ICA, … Checked [[date]]."}]` and `source: 'ICA, "Becoming a Permanent Resident" and the PR document checklist'`; `cards` columns 3 "Eight factors, one honest answer." (sub + three outcome-name cards, foot button primary "Start the free review" → /pr-readiness-review); `table` alt "What we do, by package." (columns Stage/Lite/Partnered/Concierge, nine rows, `✓` cells; note "Lite S$197 · Partnered S$497 · Concierge S$1,997 single applicant, family pricing on the pricing page."; foot button ghost "Compare everything" → /packages); `cards` columns 3 maxWidth 380 eyebrow "Client case" title "A case like yours." (one outcome card; foot text "ICA assesses every application on its own merits. This case does not predict your outcome."); `faq` alt "Questions." (five, openFirst); `source` tight; `cta` (title, buttons light → /pr-readiness-review, outline-dark "Book a 20-minute strategy call" → /contact).
- [ ] **Step 3: Wire both pages, add `"/services": "services"` and `"/permanent-resident-sg": "pr"` to `ROUTE_KEYS`.**
- [ ] **Step 4: Verify** both routes; **Commit** `feat: services overview and permanent residence pages`.

---

### Task 11: Four PR applicant sub-pages

**Files:**
- Create: `content/pages/pr-first-time.ts`, `pr-family.ts`, `pr-ep.ts`, `pr-founders.ts`; the four `app/permanent-resident-sg/<segment>/page.tsx`
- Modify: `tests/e2e/parity.spec.ts`

Each reference (`pr-first-time.html`, `pr-family.html`, `pr-ep.html`, `pr-founders.html`) has nine sections in the same order as `pr.html` minus the "Which applicant are you?" grid: `crumbs` (Home › Permanent Residence › segment) → `hero` light with image aside → `trust` → `items` alt (pitfalls) → `prose` (What ICA says… with source) → `cards` columns 3 (three outcomes + foot button) → `table` alt (by package) → `cards` outcome (A case like yours) → `faq` alt → `source` tight → `cta`. Transcribe each; every segment's wording differs, so no copy is shared between files. Routes: `/permanent-resident-sg/first-time-application`, `/family-spouse`, `/ep-s-pass-holders`, `/founders-self-employed`.

- [ ] Transcribe, wire, add the four `ROUTE_KEYS` entries, verify all four routes, commit `feat: PR applicant sub-pages`.

---

### Task 12: Citizenship, LTVP and PR Rejection Appeal

**Files:**
- Create: `content/pages/citizenship.ts`, `ltvp.ts`, `appeal.ts`; `app/singapore-citizen/page.tsx`, `app/ltvp/page.tsx`, `app/pr-appeal/page.tsx`
- Modify: `tests/e2e/parity.spec.ts`

Block orders from the references:
- `citizenship.html`: hero light (eyebrow tone red) + image → trust → items alt (2) "Where citizenship applications go wrong." → prose alt "What ICA says it considers." with source → cards columns 4 "The factors that carry citizenship applications." → items alt (2) "What we do for citizenship applicants." → cards outcome "A case like yours." → faq alt "Questions." → source tight → cta "Show that you belong here."
- `ltvp.html`: same shape as citizenship (eyebrow tone teal); transcribe headings from the file.
- `appeal.html`: hero light (eyebrow tone red) + image → trust → items alt (2) "What usually happens after a rejection, and why it fails." → prose alt "What ICA says about appeals." with source → cards columns 3 "One extra question, and it decides everything." → items alt (2) "What we do after a rejection." → cards outcome → faq alt → source tight → cta "Find out what has really changed."

- [ ] Transcribe, wire, add `"/singapore-citizen": "citizenship"`, `"/ltvp": "ltvp"`, `"/pr-appeal": "appeal"`, verify, commit `feat: citizenship, LTVP and appeal pages`.

---

### Task 13: Packages overview and the three package pages

**Files:**
- Create: `content/pages/packages.ts`, `pkg-lite.ts`, `pkg-partnered.ts`, `pkg-concierge.ts`; `app/packages/page.tsx`, `app/sgpr-lite-diy-tier/page.tsx`, `app/sgpr-partnered-do-with-you/page.tsx`, `app/sgpr-premium-concierge/page.tsx`
- Modify: `tests/e2e/parity.spec.ts`, `content/packages.ts` only if a reference bullet differs from Task 7's data (then the data file wins and the reference is the one corrected — the prices and bullets in Task 7 came from `home.html` and must stay identical across pages).

- [ ] **`packages.ts`** from `packages.html`: hero plain → trust → `packages` with `showNotFor: true` and the note including the refund policy: `"Prices in SGD, [[include / exclude]] GST. ICA application fees and third-party costs are shown separately. No hidden consultancy fees. No approval guarantees. **Refunds:** Once consultancy services have started, fees are non-refundable, even if applications are rejected."` → `honest` alt tight → `table` "Compare everything." (transcribe columns/rows) → cards alt columns 3 "Which one is you?" → `table` "Applying as a family." → items alt (2) "Fees that are not ours." → prose "How long it takes, and what a revision round is." → prose alt id "appeal" "What happens if I am rejected?" (append a final `{p: "Fees already paid are not refunded on rejection: " + REFUND_POLICY}` only if the reference's paragraphs do not already state the refund position; the live Terms sentence must appear on this page) → items (3) "What you can expect from us." → faq alt "Package questions." → cta "Ready to choose?".
- [ ] **Three package pages** from `pkg-lite.html`, `pkg-partnered.html`, `pkg-concierge.html`: `crumbs` (Home › Packages › name) → hero light (eyebrow = package badge label, tone teal/violet/amber; title; sub; badge line with price; buttons) → trust → items (3) "Everything included." → honest alt tight → steps dark "How it works." → faq "Questions." → `text` alt tight with paragraphs: "**Not suitable for:** " + the three live `notFor` items joined by "; " and "**Refunds:** " + `REFUND_POLICY` → cta "Not sure this is the right package?". Eyebrow tones: Lite teal, Partnered violet, Concierge amber.
- [ ] Wire the four routes; add `ROUTE_KEYS` entries `"/packages": "packages"`, `"/sgpr-lite-diy-tier": "pkg-lite"`, `"/sgpr-partnered-do-with-you": "pkg-partnered"`, `"/sgpr-premium-concierge": "pkg-concierge"`; verify; commit `feat: packages overview and package pages`.

---

### Task 14: PR Readiness Review page

**Files:**
- Create: `content/pages/readiness.ts`, `app/pr-readiness-review/page.tsx`
- Modify: `tests/e2e/parity.spec.ts`, `tests/e2e/parity-allowlist.ts`
- Test: `tests/e2e/readiness.spec.ts`

- [ ] **Content** from `readiness.html`: hero light + image → trust → cards columns 2 "Which applies to you?" → table alt "Eight factors. Seven come from ICA. One comes from us." → `text` "A result you can act on, not a percentage." followed by `sampleResult` (same section: give the `text` block the section head only and put `{ kind: "sampleResult" }` as the next block with `tight: true` and no tone) → cards alt columns 3 "Three outcomes, three different next steps." → honest tight → `readinessForm` alt id "form" (eyebrow "The questionnaire", title "Fifteen questions, four groups, about ten minutes.", sub) → source alt tight. The prototype's static `#result` section is a layout mock; it is not ported (the live result renders inside `ReadinessForm`). Add to `ALLOW.readiness`: `["Your PR readiness result:", "Layout of the page shown after", "Result page"]`.
- [ ] **`tests/e2e/readiness.spec.ts`**: visit `/pr-readiness-review`, click one chip per question (the first option of each), fill first name and a valid email, tick consent, click "See my result", expect `h2` containing "Your PR readiness result:" and one of the three outcome names, and expect the `/api/lead` request to return 202 (`page.waitForResponse`).
- [ ] Wire, add `"/pr-readiness-review": "readiness"`, run `npm run e2e -- --grep "readiness"`, commit `feat: PR readiness review page and questionnaire`.

---

### Task 15: About and Contact

**Files:**
- Create: `content/pages/about.ts`, `content/pages/contact.ts`, `app/about/page.tsx`, `app/contact/page.tsx`
- Modify: `tests/e2e/parity.spec.ts`

- [ ] **About** from `about.html`: hero light + image → trust → prose "Who we are, on the record." with `content` including `{kv: [...]}` (Legal entity → "SGPR Immigration Singapore", UEN → "53408306D", Address → full address, everything else placeholders) and `images` (two 4-3) → items alt (3) "Why we work this way." → `honesty` "We do not guarantee 100% approval…" (reuse the honesty block; paragraphs from the file) → table alt "What you will not find here." → `text` alt tight "Our independence, in full." (paragraphs) → `reviews` title "What clients say." (the prototype about page has no testimonial section, but the spec §4 lists testimonials on About; place it after the honesty block, limit 9) → cta "See where you stand.". No team or consultant modules.
- [ ] **Contact** from `contact.html`: hero plain "Book a free call." → trust → `contact` block (prose from the file: h3 "Or reach us directly", WhatsApp link, `{kv}` with Address = full address, Phone = +65 8934 0818, Email = `[[Email]]`, Hours = `[[Opening hours]]`, then the `images` pair and the `honest` text as a `{strong}` item) → steps alt light three "What happens after you book." → `text` tight (closing small print).
- [ ] Wire, add `"/about": "about"` and `"/contact": "contact"`, verify, commit `feat: about and contact pages`.

---

### Task 16: Case studies (index and Markdown detail)

**Files:**
- Create: `lib/markdown.ts`, `content/case-studies/sample-reapplication.md`, `content/case-studies/sample-family.md`, `content/case-studies/sample-first-time.md`, `content/pages/cases.ts`, `app/case-studies/page.tsx`, `app/case-studies/[slug]/page.tsx`
- Modify: `content/nav.ts` (append the three slugs to `routes`), `tests/e2e/parity.spec.ts`
- Test: `tests/unit/markdown.test.ts`

**Interfaces:**
- `lib/markdown.ts`: `type CaseStudy = { slug: string; title: string; segment: string; outcome: string; profile: string; family: string; previous: string; pkg: string; timeline: string; imageLabel: string; html: string }`; `getCaseStudies(): CaseStudy[]`; `getCaseStudy(slug): CaseStudy | undefined`; `type Guide = { slug: string; title: string; summary: string; category: string; source: string; html: string }`; `getGuides(): Guide[]`; `getGuide(slug)`; `renderMarkdown(md: string): string` (remark + remark-html, then `[[X]]` → `<span class="ph" data-ph="X">[X]</span>`).

- [ ] **Test** `tests/unit/markdown.test.ts`: `renderMarkdown("## H\n\nText [[Date]] **b**")` contains `<h2>H</h2>`, `<span class="ph" data-ph="Date">[Date]</span>`, `<strong>b</strong>`; `getCaseStudies()` returns three with unique slugs; `getCaseStudy("sample-reapplication")?.title` is defined.
- [ ] **Markdown files**: frontmatter keys exactly as `CaseStudy` (all values placeholders in `[[…]]` except `slug`, `imageLabel: "Redacted ICA outcome document"`), body = the prototype `case.html` prose sections as Markdown H3s ("The challenge", "Readiness findings", "What GetSGPR did", "What changed (reapplications only)", "The result", "In the client's words") with the bracketed placeholder text verbatim. `sample-reapplication` title: `[[Reapplication approved after one rejection: EP holder in technology]]`, segment `[[segment]]`.
- [ ] **Index** `content/pages/cases.ts` from `cases.html`: hero plain → trust → `filters` + cards columns 3 built at render time from `getCaseStudies()` (so `app/case-studies/page.tsx` constructs the `cards` block: badge = outcome, outcome meta = profile, challenge/did/result placeholders, href `/case-studies/${slug}`) → `text` alt tight "Our first cases are being prepared." → cta "Is your situation similar?".
- [ ] **Detail** `app/case-studies/[slug]/page.tsx`: `generateStaticParams` from `getCaseStudies()`; `generateMetadata` → `pageMetadata({ title: \`${cs.title} — Client case — GetSGPR\`, description: cs.outcome, path })`; render `Crumbs` → hero plain (eyebrow `Client case · ${segment}`, title, badge outcome) → `Section` with the split: left `ImagePh 3-4` + consent caption (verbatim from `case.html`), right: `<h3>At a glance</h3><Kv rows=[Applicant profile, Family context, Previous applications, Package, Timeline] />` then `<div className="prose-x" dangerouslySetInnerHTML={{ __html: cs.html }} />` then the closing small print → cta. `notFound()` for unknown slugs.
- [ ] Wire; add `"/case-studies": "cases"` and `"/case-studies/sample-reapplication": "case"` to `ROUTE_KEYS`; append the three slugs to `NAV.routes` (update `tests/unit/site.test.ts` expected list if it asserts exact length — it asserts containment, so no change); verify; commit `feat: case studies index and Markdown case pages`.

---

### Task 17: Knowledge Centre (guides index, guide pages) and the PR FAQ page

**Files:**
- Create: `content/guides/should-i-apply-now-or-wait.md`, `content/guides/pr-document-checklist.md`, `content/guides/appeal-or-reapply.md`, `content/guides/what-ica-considers.md`, `content/pages/guides.ts`, `content/pages/faq.ts`, `app/guides/page.tsx`, `app/guides/[slug]/page.tsx`, `app/guides/singapore-pr-faq/page.tsx`
- Modify: `content/nav.ts` (append guide slugs to `routes`), `tests/e2e/parity.spec.ts`

- [ ] **Guide Markdown**: frontmatter `title`, `summary`, `category` (one of "Start here", "Timing", "Documents", "Appeals"), `source` (e.g. `ICA, "Becoming a Permanent Resident"`); body: the prototype `guides.html` article template as Markdown — H2 sections with `[[Body in H2 sections, short paragraphs, with ICA citations inline as "Source: ICA, page, checked date".]]` placeholder paragraphs. Titles from the four "Start here" cards in `guides.html`.
- [ ] **Index** from `guides.html`: hero plain "Decide with ICA-sourced information." → trust → cards columns 4 "Start here." (the four cards, links to `/guides/<slug>`) → `filters` + cards alt columns 3 "All guides." built from `getGuides()` at render time → the sample article section is NOT ported to the index (it is the `[slug]` template). Add to `ALLOW.guides` every sentence from the sample-article section (identify them by running the parity test once and copying the reported lines that belong to the article layout, e.g. those starting "Source: ICA", "Body in H2 sections").
- [ ] **Guide page** `app/guides/[slug]/page.tsx`: `generateStaticParams` from `getGuides()` excluding `singapore-pr-faq`; layout from the `guides.html` article section: crumbs → hero plain (eyebrow "Guide · {category}", title, small "Last reviewed [[date]] · Reviewed by [[name, role]]") → `Section` split: left `ImagePh 1-1`, right `prose-x` HTML → `SourceBlock primary={guide.source}` → cta.
- [ ] **FAQ page** `content/pages/faq.ts` from `faq.html`: crumbs → hero plain "Singapore PR: the questions people actually ask." → one `Section` containing six `faq` groups: because `Blocks` wraps each block in its own `Section`, model this as six consecutive `faq` blocks with `tight: true` and the group heading as `title`, `schema: true` on the first only (one FAQPage per page) → source alt tight → cta. The static route folder `app/guides/singapore-pr-faq/` takes precedence over `[slug]`.
- [ ] Wire; add `"/guides": "guides"`, `"/guides/singapore-pr-faq": "faq"`; append guide slugs to `NAV.routes`; verify; commit `feat: knowledge centre, guide pages and PR FAQ`.

---

### Task 18: Privacy & data security (with Terms section)

**Files:**
- Create: `content/pages/privacy.ts`, `app/privacy-data-security/page.tsx`
- Modify: `tests/e2e/parity.spec.ts`

- [ ] **Content** from `privacy.html`: hero plain "Your documents are sensitive. We treat them that way." → trust → items (3) "In one minute." → prose alt "What we collect before you become a client, and what we do not." → items (2) "How client documents are handled." → `text` alt "When we ask to share your story." (paragraphs) → prose "Your rights." (with `[[DPO name]]`, `[[Email]]`, "We do not transfer personal data outside Singapore." and the retention sentence from the live policy, quoted in spec §3, added as the final `{p}` items if the reference does not already contain them) → new `prose` alt id "terms" title "Terms of use" with content: `{p: "These terms apply to the use of this website and to consultancy services provided by SGPR Immigration Singapore (UEN 53408306D)."}`, `{p: "Fees are communicated before service engagement. " + REFUND_POLICY}`, `{p: "GetSGPR does not guarantee any immigration outcome. ICA assesses every application on its own merits and makes all final decisions."}`, `{p: "These Terms are governed by the laws of the Republic of Singapore. Disputes shall be resolved under the exclusive jurisdiction of the Singapore courts."}`, `{small: "Last updated [[date]]."}`.
- [ ] Wire; add `"/privacy-data-security": "privacy"`; verify; commit `feat: privacy, data security and terms page`.

---

### Task 19: Sitemap, robots, 404, audits, README and visual verification

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx`, `README.md`
- Modify: `content/pages/home.ts` only if the visual pass finds a defect

- [ ] **Step 1: sitemap and robots**

`app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";
import { NAV } from "@/content/nav";
import { SITE } from "@/content/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return NAV.routes.map((path) => ({ url: `${SITE.url}${path}`, lastModified: new Date(), changeFrequency: "monthly", priority: path === "/" ? 1 : 0.7 }));
}
```

`app/robots.ts`:

```ts
import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/"] }, sitemap: `${SITE.url}/sitemap.xml` };
}
```

`app/not-found.tsx`: `<main className="container-x py-24"><h1>Page not found</h1><p className="lead mt-4">The page you asked for is not here. Try the <a href="/">home page</a> or <a href="/contact">contact us</a>.</p></main>`.

Add a smoke assertion: `tests/e2e/smoke.spec.ts` gains `test("sitemap lists every route", …)` fetching `/sitemap.xml` and expecting each `NAV.routes` entry to appear.

- [ ] **Step 2: Run every gate**

```powershell
npm run test; npm run lint; npm run lint:compliance; npm run e2e; npm run audit:placeholders > docs/placeholder-audit.md
```

Expected: all PASS; `docs/placeholder-audit.md` is a Markdown table.

- [ ] **Step 3: Visual verification in the preview browser**

Add `.claude/launch.json` in `site/` with configuration `{ "name": "site", "runtimeExecutable": "npm", "runtimeArgs": ["run", "dev"], "port": 3000 }`. Open `/`, `/permanent-resident-sg`, `/packages`, `/contact`, `/pr-readiness-review` at desktop (1440) and mobile (375); check: sticky dark header, Services dropdown opens, hero grid collapses to one column on mobile, action bar appears only on mobile, checker completes to a result, reduced-motion emulation shows content without entrance animation, no console errors. Fix any defect in the component (not by editing content) and re-run the e2e suite.

- [ ] **Step 4: README with the launch checklist**

`README.md` sections: Stack and scripts; Environment (`GHL_LEAD_WEBHOOK_URL`, `NEXT_PUBLIC_SITE_URL`); Content editing (where copy lives, rich-text syntax, `<Ph>` rule); Compliance lint (what fails the build and why); Readiness rubric summary (the `assess` rules in prose); Launch checklist: (1) facts to supply — copy the table from `docs/placeholder-audit.md`; (2) testimonials — the nine names, confirm permission and add month/year, remove any unverified; (3) case studies and guides — replace the sample Markdown; (4) social links — Google Business Profile, LinkedIn, Facebook URLs were not on the live site and are omitted; (5) Vercel — import repo, set env vars, production domain getsgpr.com, verify the seven redirects with `curl -I`, submit sitemap in Search Console; (6) GHL — confirm form and chat widget ids; create the inbound webhook for leads; (7) decide whether `/terms-of-use` returns as a standalone page.

- [ ] **Step 5: Commit**

```powershell
git add -A; git commit -m "feat: sitemap, robots, 404, placeholder audit and launch README

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

## Self-review (done while writing)

- **Spec coverage:** §4 routes → Tasks 9–18 (22 routes + redirects Task 1 + sitemap Task 19). §5 tokens → Task 2. §6 architecture → Tasks 3–8 (content in `content/`, components hold no copy, `<Ph>` is the only placeholder path, client components limited to Reveal, ChatWidget, EligibilityChecker, ReadinessForm, GhlForm). §7 integrations → Tasks 5 and 8. §8 SEO/compliance → Tasks 3, 4, 5 (JSON-LD), 6 (FAQPage), 19 (sitemap). §9 tests → Tasks 1–9 (unit), 9 (smoke/redirect/parity), 14 (readiness e2e), 19 (visual). §10 checklist → Task 19. The spec's `services.ts` "data driving eight pages" is realised as one content file per page plus a shared `SERVICES` index; the eight references differ enough that a single template would hide copy in conditionals.
- **Placeholder scan:** every "transcribe from reference" instruction names the file, the section order and the block types; no TBD/TODO.
- **Type consistency:** `Block` union names match between Task 6 (`types.ts`), Task 7 (`Blocks.tsx` switch) and the page tasks (`kind` values: hero, trust, stats, honesty, cards, tiles, items, steps, packages, reviews, faq, contact, cta, source, table, prose, honest, sampleResult, crumbs, filters, text, readinessForm). `pageMetadata`, `PACKAGES`, `REFUND_POLICY`, `TESTIMONIALS`, `SITE.placeholders.*`, `ROUTE_KEYS`, `ALLOW`, `prototypeSentences`, `assess`, `verdict`, `postLead` are used with the signatures defined where introduced.
