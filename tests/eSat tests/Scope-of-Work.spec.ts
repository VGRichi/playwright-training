import { expect, test } from "@playwright/test";
import path from "path";
import { esatLogin } from "../../pages/eSatLogin";
import { esatCredentials } from "../../pages/eSatLogin";

test.use(esatCredentials);

test.beforeEach(async ({ page }) => {
  await esatLogin(page);
});

//TESTS
test("Scope of Work Creation", async ({ page }) => {
  await page.goto("/scope-of-works/list");
  await page.getByRole("button", { name: "Yarat" }).click();

});



//Bir Mənbə
test("Create Scope of Work", async ({ page }) => {
  await page.getByRole('link', { name: 'Şərtlər toplusu' }).click();
  await page.getByRole("button", { name: "Yarat" }).click();

  const sowCreateModal = page.locator('app-sow-create-modal')
  await expect(sowCreateModal).toBeVisible()

  await page.getByLabel("Satınalma predmeti").fill("TEST PW")

  await page.getByRole('combobox', { name: 'Satınalma metodu' }).click()
  await page.getByRole('option', { name: 'Bir mənbə' }).click()

  await page.getByRole('combobox', { name: "Mallar, iş" }).click()
  await page.getByRole('option', { name: "Mal" }).click()

  await page.getByRole('combobox', { name: 'Bir mənbədən satınalmanın' }).click()
  await page.getByRole('option', {name:"49.1.2" }).click()

  await page.getByLabel("Ehtimal olunan qiymət").fill("500")

  await page.locator('input[type="file"]').setInputFiles(path.join(__dirname, 'playwright-test.pdf'))
  await expect(page.locator('mat-icon', { hasText: 'delete' })).toBeVisible()

  await sowCreateModal.locator('button[type="submit"]', { hasText: 'Yarat' }).click()

  await page.pause();
});
