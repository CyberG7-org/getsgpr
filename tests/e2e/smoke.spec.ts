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
