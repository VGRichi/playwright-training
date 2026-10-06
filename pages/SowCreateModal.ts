import { expect, Page, Locator } from "@playwright/test";

export class SowCreateModal {
  readonly modal: Locator;

  constructor(private page: Page) {
    this.modal = page.locator('app-sow-create-modal');
  }

  async open() {
    await this.page.getByRole('link', { name: 'Şərtlər toplusu' }).click();
    await this.page.getByRole('button', { name: 'Yarat' }).click();
    await expect(this.modal).toBeVisible();
  }

  async select(label: string, option: string, exact = true) {
    await this.modal.getByRole('combobox', { name: label }).click();
    await this.page.getByRole('option', { name: option, exact}).click();  }

  async uploadFile(filePath: string) {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.modal.getByText('Qoşma').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);

    await expect(this.modal.locator('mat-icon', { hasText: 'delete' })).toBeVisible();
}

  async create(data: { name: string; method: string; type: string; basis?: string; price: string; file: string }) {
    await this.modal.getByLabel('Satınalma predmeti').fill(data.name);
    await this.select('Satınalma metodu', data.method);
    await this.select('Mallar, iş', data.type);
    if (data.basis) {
      await this.select('Bir mənbədən satınalmanın', data.basis, false);
    } 
    await this.modal.getByLabel('Ehtimal olunan qiymət').fill(data.price);
    await this.uploadFile(data.file);
    await this.modal.click({ position: { x: 10, y: 10 } });

    const sowCreateBtn = this.modal.locator('button[type="submit"]', {hasText: 'Yarat'})
    await expect(sowCreateBtn).toBeEnabled();
    await sowCreateBtn.click();
    await expect(this.modal).toBeHidden();  
  }
}