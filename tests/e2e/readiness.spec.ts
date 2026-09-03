import { test, expect } from "@playwright/test";

const OUTCOMES = ["Ready to Prepare", "Strengthen First", "More Information Needed"];

test("readiness questionnaire completes and shows a result", async ({ page }) => {
  await page.goto("/pr-readiness-review");

  // Each question renders its options as a "flex flex-wrap gap-2" row of chip
  // buttons; clicking the first button in each such row answers every question
  // with its first option, in question order.
  const firstOptions = page.locator("div.flex.flex-wrap.gap-2 > button:first-child");
  await expect(firstOptions).toHaveCount(15);
  const count = await firstOptions.count();
  for (let i = 0; i < count; i++) {
    await firstOptions.nth(i).click();
  }

  await page.getByPlaceholder("First name").fill("Alex");
  await page.getByPlaceholder("you@example.com").fill("alex@example.com");
  await page.getByRole("checkbox").check();

  const leadResponse = page.waitForResponse((r) => r.url().endsWith("/api/lead") && r.status() === 202);
  await page.getByRole("button", { name: "See my result" }).click();
  await leadResponse;

  const heading = page.locator("h2", { hasText: "Your PR readiness result:" });
  await expect(heading).toBeVisible();
  const text = (await heading.textContent()) ?? "";
  expect(OUTCOMES.some((o) => text.includes(o))).toBe(true);
});
