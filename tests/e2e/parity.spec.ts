import { test, expect } from "@playwright/test";
import { prototypeSentences, norm } from "./prototype-text";
import { ALLOW } from "./parity-allowlist";

export const ROUTE_KEYS: Record<string, string> = {
  "/": "home",
  "/services": "services",
  "/permanent-resident-sg": "pr",
  "/permanent-resident-sg/first-time-application": "pr-first-time",
  "/permanent-resident-sg/family-spouse": "pr-family",
  "/permanent-resident-sg/ep-s-pass-holders": "pr-ep",
  "/permanent-resident-sg/founders-self-employed": "pr-founders",
  "/singapore-citizen": "citizenship",
  "/ltvp": "ltvp",
  "/pr-appeal": "appeal",
  "/packages": "packages",
  "/sgpr-lite-diy-tier": "pkg-lite",
  "/sgpr-partnered-do-with-you": "pkg-partnered",
  "/sgpr-premium-concierge": "pkg-concierge",
  "/pr-readiness-review": "readiness",
  "/about": "about",
  "/contact": "contact",
  "/case-studies": "cases",
  "/case-studies/sample-reapplication": "case",
  "/guides": "guides",
  "/guides/singapore-pr-faq": "faq",
};

for (const [route, key] of Object.entries(ROUTE_KEYS)) {
  test(`parity ${route} ⇄ ${key}.html`, async ({ page }) => {
    await page.goto(route);
    const text = norm(await page.locator("main").evaluate((el) => el.textContent ?? ""));
    const missing = prototypeSentences(key).filter(
      (s) => !(ALLOW[key] ?? []).some((a) => s.includes(a.toLowerCase())) && !text.includes(s)
    );
    expect(missing, `missing from ${route}:\n${missing.join("\n")}`).toEqual([]);
  });
}
