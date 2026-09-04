import { expect, test } from "@playwright/test";

test("desktop Services menu closes outside, on Escape, and after navigation", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/contact");

  const menu = page.locator("details.nav-details");
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
