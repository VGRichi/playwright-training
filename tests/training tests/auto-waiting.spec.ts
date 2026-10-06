import { expect, test } from '@playwright/test'

//Global timeout
    //Test timeout
        //Action timeout
        //Navigation timeout
        //Expect timeout

test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('https://playground.bondaracademy.com/')
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Dialog').click()
    testInfo.setTimeout(testInfo.timeout + 3000) //Test timeout
})

test('Auto-waiting', async ({ page }) => {
    const dialogWithDelayForm = page.locator('nb-card', { hasText: 'Dialog with delay' })
    await dialogWithDelayForm.getByRole('button', { name: '3 seconds' }).click()

    const dialogContainer = page.locator('nb-dialog-container')
    // await dialogContainer.getByRole('button', { name: 'Ok' }).click()

    const dialogHeaderText = await dialogContainer.locator('nb-card-header').textContent()
    expect(dialogHeaderText).toEqual('Friendly reminder')

})

test('Alternative waits', async ({ page }) => {
    const dialogWithDelayForm = page.locator('nb-card', { hasText: 'Dialog with delay' })
    await dialogWithDelayForm.getByRole('button', { name: '3 seconds' }).click()

    const dialogContainer = page.locator('nb-dialog-container')

    // Wait for the element
    // await dialogContainer.waitFor()
    // await page.waitForSelector('nb-dialog-container')

    //Wait for API response
    // await page.waitForResponse('**/delay/*')

    // Wait for load state (NOT RECOMMENDED)
    // await page.waitForLoadState('networkidle')

    //--hardcoded wait (NOT RECOMMENDED - NEVER)
    // await page.waitForTimeout(3500)    

    const dialogHeaderText = await dialogContainer.locator('nb-card-header').allTextContents()
    // expect(dialogHeaderText).toContain('Friendly reminder')

    await expect(dialogContainer.locator('nb-card-header')).toHaveText('Friendly reminder', { timeout: 4000 })

})

test('Timeout', async ({ page }) => {
    // test.setTimeout(10000)
    test.slow()
    const dialogWithDelayForm = page.locator('nb-card', { hasText: 'Dialog with delay' })
    await dialogWithDelayForm.getByRole('button', { name: '3 seconds' }).click()

    const dialogContainer = page.locator('nb-dialog-container')

    await dialogContainer.getByRole('button', { name: 'Ok' }).click({timeout: 4000})
})

