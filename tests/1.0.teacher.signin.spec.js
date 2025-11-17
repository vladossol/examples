const { test, expect } = require('@playwright/test');
const TeacherNavbar = require('./PageObjects/teacher.navbar.js');
const LoginPage = require('./PageObjects/login.page.js');

test.describe('Teacher sign in and sign out flow', async () => {

    let page;
    let navbar;
    let loginPage;

    // initiating browser instance in authenticated state and sequantial execution of tests

    test.use({ storageState: './auth.teacher.json' });

    test.describe.configure({ mode: 'serial' });

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        navbar = new TeacherNavbar(page);
        loginPage = new LoginPage(page);
    });

    test('Teacher signs in', async () => {
        await page.goto('https://qa.gradeflow.net/signin-teacher');
        await expect(page).toHaveURL('https://qa.gradeflow.net/');
        await expect(page).toHaveTitle('Gradeflow - Dashboard');
    });

    test('Teacher signs out', async () => {
        await navbar.profileButton.click();
        await navbar.logOutButton.click();
        await expect(page).toHaveURL('https://qa.gradeflow.net/signin');
        await expect(page).toHaveTitle('Gradeflow - Student SignIn');
        await expect(loginPage.alertLogOut).toContainText('Successfully logged out.');
        await expect(loginPage.googleButton).toBeVisible();
        await expect(loginPage.switchAccountLink).toBeVisible();
    });
});
