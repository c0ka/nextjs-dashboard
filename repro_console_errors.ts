import { chromium } from "@playwright/test";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on("console", (msg) => {
    if (msg.type() === "error" || msg.type() === "warning") {
      console.log(`[Browser ${msg.type().toUpperCase()}]: ${msg.text()}`);
    }
  });

  page.on("pageerror", (err) => {
    console.log(`[Browser PAGE_ERROR]: ${err.message}`);
  });

  try {
    await page.goto("http://localhost:3000/mdx-test");
    // Wait a bit for any delayed errors
    await page.waitForTimeout(2000);
  } catch (e) {
    console.error("Failed to navigate:", e);
  } finally {
    await browser.close();
  }
})();
