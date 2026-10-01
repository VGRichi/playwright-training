import { test } from "@playwright/test";

test("for training", async ({ page }) => {
  await page.goto("https://testadmin.etender.gov.az/scope-of-works/list");
  await page.getByRole('button', { name: 'Use this' }).filter({hasText: 'Javid'}).click();
  await page.getByRole("button", { name: "Yarat" }).click();
});
