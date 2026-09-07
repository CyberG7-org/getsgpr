import { expect, test } from "@playwright/test";

const OUTCOMES = ["Ready to Prepare", "Strengthen First", "More Information Needed"];

test("citizenship questionnaire completes and shows a result", async ({ page }) => {
  await page.goto("/citizenship-readiness-review");

  const firstOptions = page.locator("div.flex.flex-wrap.gap-2 > button:first-child");
  await expect(firstOptions).toHaveCount(18);
  for (let index = 0; index < 18; index++) await firstOptions.nth(index).click();

  await page.getByPlaceholder("First name").fill("Alex");
  await page.getByPlaceholder("you@example.com").fill("alex@example.com");
  await page.getByRole("checkbox").check();

  const leadResponse = page.waitForResponse((response) => response.url().endsWith("/api/lead") && response.status() === 202);
  await page.getByRole("button", { name: "See my result" }).click();
  await leadResponse;

  const heading = page.locator("h2", { hasText: "Your citizenship readiness result:" });
  await expect(heading).toBeVisible();
  const text = (await heading.textContent()) ?? "";
  expect(OUTCOMES.some((outcome) => text.includes(outcome))).toBe(true);
  await expect(page.getByRole("link", { name: "Book a citizenship consultation" })).toHaveAttribute("href", "/book-a-call");
});
