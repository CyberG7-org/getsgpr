import { expect, test } from "@playwright/test";

test("contact and booking remain separate navigation destinations", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  const primary = page.getByRole("navigation", { name: "Primary", exact: true });
  await expect(primary.getByRole("link", { name: "Contact Us" })).toHaveAttribute("href", "/contact");
  await expect(primary.getByRole("link", { name: "Book a free call" })).toHaveAttribute("href", "/book-a-call");
});

test("book a call page embeds the appointment calendar", async ({ page }) => {
  await page.goto("/book-a-call");

  await expect(page.getByRole("heading", { level: 1, name: "Book a free call." })).toBeVisible();
  await expect(page.getByTitle("Book a consultation with GetSGPR")).toHaveAttribute(
    "src",
    /api\.leadconnectorhq\.com\/widget\/booking\//,
  );
});
