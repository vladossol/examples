const { test, chromium } = require('@playwright/test');
const fs = require('fs');
let authJson = require('../../auth.student.json');

test('Grabbing cookies', async () => {

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // navigating to the QA endpoint page for grdf.autostudent user

    await page.goto('');

    // grabbing token value as string and slicing unneeded characters 

    let tokenValue = (await page.locator('p').first().innerText()).slice(5);
    let userValue = (await page.locator('p').nth(1).innerText()).slice(6);

    // writing new values in auth.student.json file

    authJson.cookies = [
        {
            "name": "token",
            "value": tokenValue,
            "domain": "qa.gradeflow.net",
            "path": "/"
        },
        {
            "name": "user",
            "value": userValue,
            "domain": "qa.gradeflow.net",
            "path": "/"
        }
    ]

    fs.writeFileSync('./auth.student.json', JSON.stringify(authJson));

    await browser.close();
});
