import { test, expect } from "@playwright/test";
import { prototypeSentences, norm } from "./prototype-text";
import { ALLOW } from "./parity-allowlist";

export const ROUTE_KEYS: Record<string, string> = { "/": "home" };

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
