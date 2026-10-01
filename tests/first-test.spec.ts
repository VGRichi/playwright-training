import { test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test.describe('Suite 1', () => {
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


//USER VISIBLE LOCATORS
test('User visible locators', async ({ page }) => {
    await page.getByRole('button', {name: 'Sign in'}).first().click()
    await page.getByRole('textbox', {name: "Email"}).first().fill('test@example.com')

    await page.getByLabel('Email').first().fill('test@example2.com')

    await page.getByPlaceholder('Jane Doe').fill('Artem Bondar')

    await page.getByText('Submit').first().click()

    await page.getByTestId('inputEmail1').first().fill('test@example3.com')

    await page.getByTitle('IoT Dashboard').first().click()
})

test('Locating child elements', async ({ page }) => {
    await page.locator('nb-card').locator('nb-radio-group').locator(':text-is("Option 1")').click()
    await page.locator('nb-card nb-radio-group :text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click()

    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('Locating parent elements', async ({ page }) => {
    await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('button').click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('button').click()

    await page.locator('nb-card').filter({hasText: 'Using the Grid'}).getByRole('button').click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText:'Submit'})
        .getByLabel('Email').fill('test@example5.com')

    await page.getByText('Using the Grid').locator('..').getByRole('button').click()
})