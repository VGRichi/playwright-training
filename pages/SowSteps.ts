import { expect, Page, test } from "@playwright/test";

export class SowSteps {
  constructor(private page: Page) {}

  step(name: string) {
    return this.page.getByRole('tabpanel', { name });
  }

  async waitForLoader() {
    await expect(this.page.locator('.global-loader-overlay')).toBeHidden({ timeout: 30000 });
  }

  async fillBomRow(data: { name: string; description: string; quantity: string }) {
  const row = this.page.locator('app-bom-step tbody tr').last();
  const cell = (i: number) => row.locator('td').nth(i);

  await cell(1).locator('input').fill(data.name);
  await cell(2).locator('input').fill(data.description);
  await cell(3).locator('input').fill(data.quantity);
}

  async saveStep(stepName: string) {
    await test.step(`Save step "${stepName}"`, async () => {
      await this.waitForLoader();
      await this.step(stepName).locator('button:not([title])', { hasText: 'Yadda saxla' }).click();
    });
  }
}