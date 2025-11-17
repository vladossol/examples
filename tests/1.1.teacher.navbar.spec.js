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


    test('Teacher submissions page navigation', async () => {
        await navbar.submissionButton.click();
        await expect(page).toHaveURL('https://qa.gradeflow.net/teacher/submission');
        await expect(page).toHaveTitle('Gradeflow - Submissions');
    });

    test('Teacher classes page navigation', async () => {
        await navbar.classesButton.click();
        await expect(page).toHaveURL('https://qa.gradeflow.net/teacher/classes');
        await expect(page).toHaveTitle('Gradeflow - Classes');
    });

    test('Teacher my curriculum page navigation', async () => {
        await navbar.myCurriculumButton.click();
        await expect(page).toHaveURL('https://qa.gradeflow.net/teacher/curriculum');
        await expect(page).toHaveTitle('Gradeflow - Curriculum');
    });

    test('Teacher students page navigation', async () => {
        await navbar.studentsButton.click();
        await expect(page).toHaveURL('https://qa.gradeflow.net/teacher/students');
        await expect(page).toHaveTitle('Gradeflow - Students');
    });

    test('Teacher dashboard page navigation', async () => {
        await navbar.dashboardButton.click();
        await expect(page).toHaveURL('https://qa.gradeflow.net/');
        await expect(page).toHaveTitle('Gradeflow - Dashboard');
    });

    test('Teacher start tour and markeplace link presence', async () => {
        // start tour button was temporally removed 01/10/25
        // await expect(navbar.startTourButton).toBeVisible();
        await expect(navbar.marketplaceLink).toBeVisible();
    });
});
