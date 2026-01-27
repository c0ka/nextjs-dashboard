import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("should allow a user to log in and log out", async ({ page }) => {
    // 1. Log in
    await page.goto("/login");

    // Fill in credentials
    // Adapting selectors based on common practice, assuming standard inputs.
    // If they fail, I'll need to inspect login page source.
    await page.getByLabel("Email").fill("user@nextmail.com");
    await page.getByLabel("Password").fill("123456");

    // Click login
    await page.getByRole("button", { name: "Log in" }).click();

    // Verify redirection to dashboard
    await expect(page).toHaveURL("/dashboard", { timeout: 10000 });

    // 2. Log out
    // Click Sign Out button
    // The button text is "Sign Out", visible on desktop.
    await page.getByRole("button", { name: "Sign Out" }).click();

    // Verify redirection to landing page or login page
    // The action calls signOut({ redirectTo: "/" }), so it should go to "/"
    await expect(page).toHaveURL("/");
  });
});
