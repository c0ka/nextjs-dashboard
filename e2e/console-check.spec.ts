import { test, expect } from "@playwright/test";

test("should not have console errors on mdx-test page", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (msg) => {
    if (
      (msg.type() === "error" || msg.type() === "warning") &&
      !msg.text().includes("downloadable font")
    ) {
      consoleErrors.push(msg.text());
    }
  });

  page.on("pageerror", (err) => {
    consoleErrors.push(err.message);
  });

  await page.goto("/mdx-test");
  await page.waitForLoadState("networkidle");

  if (consoleErrors.length > 0) {
    require("fs").writeFileSync("errors.log", consoleErrors.join("\n"), "utf8");
    console.error("Console errors detected:", consoleErrors);
  }
  expect(consoleErrors).toEqual([]);
});
