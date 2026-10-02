import { expect, test } from "@playwright/test";
import path from "path";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.locator('.card').filter({ hasText: 'Javid' }).getByRole('button', { name: 'Use this' }).click();
  await page.locator('.card-body').getByText('"SƏNAYE TƏCHİZAT SERVİS" MƏHDUD MƏSULİYYƏTLİ CƏMİYYƏTİ').click()
  await page.locator('.card-header').getByText('Administrator', { exact: true }).click()
});

test("ESAT Login", async ({ page }) => {
  await page.goto("/scope-of-works/list");
  await page.getByRole("button", { name: "Yarat" }).click();

  await page.getByLabel("Satınalma predmeti").fill("donga")

  await page.getByRole('combobox', { name: 'Satınalma metodu' }).click()
  await page.getByRole('option', { name: 'Bir mənbə' }).click()

  await page.getByRole('combobox', { name: "Mallar, işlər və ya xidmətlər" }).click()
  await page.getByRole('option', { name: "Mal" }).click()
  
  await page.getByRole('combobox', { name: 'Bir mənbə üçün əsas' }).click()
  await page.getByRole('option').first().click()

  await page.getByLabel("Ehtimal olunan qiymət").fill("500")

  await page.locator('input[type="file"]').setInputFiles(path.join(__dirname, 'playwright-test.pdf'))
  await expect(page.locator('mat-icon', { hasText: 'delete' })).toBeVisible()

  const dialog = page.locator('mat-dialog-container')
  await dialog.locator('button[type="submit"]', { hasText: 'Yarat' }).click()

  await page.pause();
});
