import { test, expect } from "@playwright/test";

test("Docs page renders correctly", async ({ page }) => {
  await page.goto("/docs/getting-started");

  // Check H1
  await expect(page.locator("h1")).toBeVisible();

  // Check for some content that implies shared components are working (e.g. style)
  const h1 = page.locator("h1");
  await expect(h1).toHaveClass(/font-bold/);
});
