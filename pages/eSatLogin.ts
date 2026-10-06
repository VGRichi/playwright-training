import { Page } from "@playwright/test";

export const esatCredentials = {
  baseURL: process.env.baseURL,
  httpCredentials: {
    username: process.env.HTTP_USERNAME!,
    password: process.env.HTTP_PASSWORD!,
  },
};

export async function esatLogin(page: Page) {
  await page.goto("/");
  await page.locator('.card').getByRole('button', { name: 'Use this' }).first().click();
  await page.locator('.card-body').getByText('"SƏNAYE TƏCHİZAT SERVİS" MƏ').click();
  await page.locator('.card-header').getByText('Administrator', { exact: true }).click();
}