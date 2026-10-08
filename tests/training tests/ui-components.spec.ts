import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://playground.bondaracademy.com/");
});

test.describe("Form layouts page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form layouts").click();
  });

//INPUT FIELDS
  test("Input fields", async ({ page }) => {
    const usingTheGridEmailInput = page.locator("nb-card", { hasText: "Using the Grid" }).getByRole("textbox", { name: "Email" });
    await usingTheGridEmailInput.fill("test@test.com");
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially("test@test2.com", {delay: 500, });

    //Extract value
    const inputValue = await usingTheGridEmailInput.inputValue;

    //Assertions
    await expect(usingTheGridEmailInput).toHaveValue("test@test2.com");
    await expect(usingTheGridEmailInput).toHaveValue(/"test@test2.com"/);
  });
});

//RADIO BUTTONS
