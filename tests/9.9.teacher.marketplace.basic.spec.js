const { test, expect } = require('@playwright/test');
const TeacherNavbar = require('./PageObjects/teacher.navbar.js');

test.describe('Teacher account navbar links', async () => {

    let page;
    let navbar;

    // initiating browser instance in authenticated state and sequantial execution of tests

    test.use({ storageState: './auth.teacher.json' });

    test.describe.configure({ mode: 'serial' });

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        navbar = new TeacherNavbar(page);
        await page.goto('https://qa.gradeflow.net/signin-teacher');
    });

    test('Teacher navigates to marketplace page', async () => {
      await expect(navbar.marketplaceLink).toBeVisible();

      const pagePromise = page.context().waitForEvent('page');
      await navbar.marketplaceLink.click();

      const newPage = await pagePromise;
      await newPage.waitForLoadState();

      await expect(newPage).toHaveURL('https://qa-marketplace.gradeflow.net/products');
      await expect(newPage).toHaveTitle('GradeFlow - Marketplace');


      const newPageErrors = [];

      newPage.on('console', msg => {
        if (msg.type() === 'error') {
          newPageErrors.push(msg.text());
        }
      });

      await expect(newPageErrors).toEqual([]);
    });
});
