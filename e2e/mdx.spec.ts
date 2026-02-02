import { test, expect } from "@playwright/test";

test("MDX page renders correctly", async ({ page }) => {
  await page.goto("/mdx-test");

  // Check H1
  await expect(page.locator("h1")).toContainText("Acme Dashboard");

  // Check H2
  await expect(page.locator("h2").first()).toContainText("Key Features");

  // Check for Card component
  await expect(page.locator('[data-slot="card"]').first()).toBeVisible();
  await expect(page.locator('[data-slot="card-title"]').first()).toContainText(
    "Starter",
  );

  // Check for global style application (using class name from lusitana font or specific style)
  const h1 = page.locator("h1");
  await expect(h1).toHaveClass(/font-bold/);

  // Check for table rendering
  await expect(page.locator("table")).toBeVisible();
  await expect(page.locator("th").first()).toContainText("Feature");
});
