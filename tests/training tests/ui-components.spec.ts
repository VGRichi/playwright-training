import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://playground.bondaracademy.com/");
})

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
    await usingTheGridEmailInput.pressSequentially("test@test2.com", { delay: 500, });

    //Extract value
    const inputValue = await usingTheGridEmailInput.inputValue;

    //Assertions
    await expect(usingTheGridEmailInput).toHaveValue("test@test2.com");
    await expect(usingTheGridEmailInput).toHaveValue(/test.com/);
  });

  //RADIO BUTTONS
  test("Radio buttons", async ({ page }) => {
    const usingTheGridEmailInput = page.locator("nb-card", { hasText: "Using the Grid" })
    await usingTheGridEmailInput.getByLabel('Option 1').check({force: true})
    await usingTheGridEmailInput.getByRole('radio', {name:"Option 2"}).check({force:true})

    const radioStatus = await usingTheGridEmailInput.getByRole('radio', {name: "Option 2"}).isChecked()
    expect(radioStatus).toBeTruthy()

    //USE THIS INSTEAD assertion
    await expect(usingTheGridEmailInput.getByRole('radio', {name:"Option 2"})).toBeChecked()
    await expect(usingTheGridEmailInput.getByRole('radio', {name:"Option 1"})).not.toBeChecked()

  })

  //CHECKBOXES
  test("Checkboxes", async ({ page }) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', {name: "Hide on click"}).check({force:true})

    const allBoxes = page.getByRole('checkbox')
    for(const box of await allBoxes.all()){
      await box.check({force:true})
      await expect(box).toBeChecked()
    }

  })

   //LISTS AND DROPDOWNS
  test('Lists and dropdowns', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    //Standard dropdown
    await page.locator('.form-group', {hasText:"Toast type:"}).getByRole('combobox').selectOption('info')
    await expect(page.getByRole('combobox')).toHaveValue('info')

    //Custom dropdowns
    await page.locator('.form-group', {hasText:"Position:"}).locator('nb-select').click()
    //Option 1
    // await page.getByRole('list').getByText("bottom-end").click()
    //Option 2
    await page.locator('nb-option', {hasText:"bottom-end"}).click()
    await expect(page.locator('.form-group', {hasText:"Position:"}).locator('nb-select')).toHaveText('bottom-end')

    //LOOPING THROUGH THE LIST
    const positionDropDownField = page.locator('.form-group', {hasText:"Position:"}).locator('nb-select')
    await positionDropDownField.click()
    const allListValues = await page.locator('nb-option').allTextContents()
    for (const listValue of allListValues){
      await page.locator('nb-option', {hasText:listValue}).click()
      await expect(positionDropDownField).toHaveText(listValue)
      await positionDropDownField.click()
    }
  })

  //TOOLTIPS
  test('Tooltips', async ({ page }) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    await page.getByRole('button', {name: "Top"}).hover()
    await expect(page.getByRole('tooltip')).toHaveText('This is a tooltip')
    
  })

  //DIALOG BOXES
  test('Dialogs', async ({ page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    page.on('dialog', dialog => {
      expect(dialog.message()).toEqual('Are you sure you want to delete?')
      dialog.accept()
    })

    await page.locator('tr', {hasText: 'mdo@gmail.com'}).locator('.nb-trash').click()
    await expect(page.locator('tr', {hasText: 'mdo@gmail.com'})).not.toBeVisible()
  })

  //TABLES
  test('Tables', async ({ page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // 1 HOW TO SELECT ROW BY ANY VISIBLE TEXT
    const tableRowByEmail = page.getByRole ('row', {name:"twitter@outlook.com"})
    await tableRowByEmail.locator('.nb-edit').click()
    await tableRowByEmail.getByPlaceholder('Age').fill('35')
    await tableRowByEmail.locator('.nb-checkmark').click()
    await expect(tableRowByEmail.locator('td').last()).toHaveText('35')

    // 2 HOW TO GET ROW BY SPECIFIC COLUMN VALUE
    const table = page.locator('tbody')
    const tableRowById = page.getByRole('row').filter({ has: page.getByRole('cell').nth(1).getByText('10')})
    await tableRowById.locator('.nb-edit').click()
    await table.getByPlaceholder('E-mail').fill("test@test.com")
    await table.locator('.nb-checkmark').click()
    await expect(tableRowById.locator('td').nth(5)).toHaveText('test@test.com')

    /// 3 LOOP THROUGH TABLE ROWS
    const ages = ["20", "30","40","200",]
    for(let age of ages){
        await page.getByPlaceholder('Age').fill(age)
        if (age == "200"){
          await expect(table).toContainText('No data found')
        } else {
          await expect (table.locator('tr').first().locator('td').last()).toHaveText(age)
          const allTableRows = await table.locator('tr').all()
          for(let row of allTableRows){
            await expect (row.locator('td').last()).toHaveText(age)
          }
        }
    }

  })

  test('Date picker', async ({ page }) =>{
    await page.getByText('Forms').click()
    await page.getByText("Datepicker").click();

    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()

    const date = new Date()
    date.setDate(date.getDate() + 240)

    const expectedMonth = date.toLocaleString('En-US', {month:'short'})
    const expectedMonthLong = date.toLocaleString('En-US', {month:'long'})
    const expectedDay = date.getDate().toString()
    const expectedYear = date.getFullYear()
    const expectedDate = `${expectedMonth} ${expectedDay}, ${expectedYear}`

    let currentMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
    while(!currentMonthAndYear?.includes(expectedMonthAndYear)){
        await page.locator('.next-month').click()
        currentMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }

    // const expectedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    // "Jun 15, 2025"

    await page.locator('.day-cell:not(.bounding-month)').getByText(expectedDay, {exact:true}).click()
    await expect(calendarInputField).toHaveValue(expectedDate)  
  })

})