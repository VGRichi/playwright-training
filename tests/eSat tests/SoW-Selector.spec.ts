import { test, expect, Page } from "@playwright/test";
import path from "path";
import { esatLogin } from "../../pages/eSatLogin";
import { esatCredentials } from "../../pages/eSatLogin";
import { SowCreateModal } from "../../pages/SowCreateModal";
import { SowSteps } from "../../pages/SowSteps";

//LOGIN
test.use(esatCredentials);

test.beforeEach(async ({ page }) => {
  await esatLogin(page);
});

//TESTS
const methods = {
  rfq: { name: 'TEST RFQ', method: 'Kotirovka sorğusu', type: 'Mal', price: '500' },
  rfp: { name: 'TEST RFP', method: 'Açıq tender', type: 'Mal', price: '500' },
  birMenbe: { name: 'TEST Bir mənbə', method: 'Bir mənbə', type: 'Mal', basis: '49.1.2.1', price: '500' },
};

async function createSow(page: Page, data: typeof methods.rfq & { basis?: string }) {
  const sow = new SowCreateModal(page);
  await sow.open();
  await sow.create({ ...data, file: path.join(__dirname, 'playwright-test.pdf') });
}

test('SoW Creation - RFQ', async ({ page }) => {
  await createSow(page, methods.rfq);
});

test('SoW Creation - RFP', async ({ page }) => {
  await createSow(page, methods.rfp);
});

test('SoW Creation - Bir mənbə', async ({ page }) => {
  await createSow(page, methods.birMenbe);
});