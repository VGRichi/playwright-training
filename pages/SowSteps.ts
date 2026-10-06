import { expect, Page, test } from "@playwright/test";

export class SowSteps {
  constructor(private page: Page) {}

  step(name: string) {
    return this.page.getByRole('tabpanel', { name });
  }

  async saveRowAndStep(stepName: string) {
    await test.step(`Save "${stepName}"`, async () => {
      const step = this.step(stepName);

      const rowSave = step.getByTitle('Yadda saxla');
      await rowSave.click();
      await expect(rowSave).toBeHidden();

      await step.locator('button:not([title])', { hasText: 'Yadda saxla' }).click();
    });
  }
}