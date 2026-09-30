import { test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})


test('Locator syntax rules', async ({ page }) => {
    //find by Tag
    page.locator('input')

    //find by ID
    page.locator('#inputEmail1')

    //find by class value
    page.locator('.shape-rectangle')

    //find by any attribute
    page.locator('[placeholder="Email"]')

    //find by full class value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //find by several selectors
    page.locator('input[placeholder="Email"].shape-rectangle')

    //find by partial text match
    page.locator(':text("Using")')

    //find by exact text match
    page.locator(':text-is("Using the Grid")')

    //find by Xpath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]')
})


test.describe('Suite', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
    })

    test('this is a first test', async ({ page }) => {
        await page.getByText('Form Layouts').click()
    })

    test('this is a datepicker test', async ({ page }) => {
        await page.getByText('Datepicker').click()
    })

})

test.describe('Suite 2', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Charts').click()
    })

    test('this is a first test', async ({ page }) => {
        await page.getByText('Form Layouts').click()
    })

    test('this is a datepicker test', async ({ page }) => {
        await page.getByText('Datepicker').click()
    })

})


