import { expect, test } from "@playwright/test";

test("desktop Services menu closes outside, on Escape, and after navigation", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/contact");

  const menu = page.locator("details.nav-details", { hasText: "Services" });
  const trigger = menu.locator("summary");

  await trigger.click();
  await expect(menu).toHaveAttribute("open", "");

  await page.locator("main").click({ position: { x: 30, y: 140 } });
  await expect(menu).not.toHaveAttribute("open", "");

  await trigger.click();
  await page.keyboard.press("Escape");
  await expect(menu).not.toHaveAttribute("open", "");
  await expect(trigger).toBeFocused();

  await trigger.click();
  await menu.getByRole("link", { name: "Permanent Residence", exact: true }).click();
  await expect(page).toHaveURL(/\/permanent-resident-sg$/);
  await expect(menu).not.toHaveAttribute("open", "");
});

test("desktop Checker menu links to both readiness checkers", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  const menu = page.locator("details.nav-details", { hasText: "Checker" });
  await menu.locator("summary").click();
  await expect(menu.getByRole("link", { name: /PR Readiness/ })).toHaveAttribute("href", "/pr-readiness-review");
  await menu.getByRole("link", { name: /Citizen Readiness/ }).click();
  await expect(page).toHaveURL(/\/citizenship-readiness-review$/);
  await expect(menu).not.toHaveAttribute("open", "");
});
