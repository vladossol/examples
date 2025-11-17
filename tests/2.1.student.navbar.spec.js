const { test, expect } = require('@playwright/test');
const StudentNavbar = require('./PageObjects/student.navbar.js');
const StudentDashboard = require('./PageObjects/student.dashboard.js');

test.describe('Student navbar links navigation and page contents', async () => {

    let page;
    let navbar;
    let studentDashboard;

    // initiating browser instance in authenticated state and sequantial execution of tests

    test.use({ storageState: './auth.student.json' });

    test.describe.configure({ mode: 'serial' });

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        navbar = new StudentNavbar(page);
        studentDashboard = new StudentDashboard(page);
        await page.goto('https://qa.gradeflow.net/signin');
    });

    test('Student submissions page navigation', async () => {
        await navbar.assignmentsButton.click();
        await expect(page).toHaveURL('https://qa.gradeflow.net/students/assignments');
        await expect(page).toHaveTitle('Gradeflow - Assignments');
    });

    test('Student messages page navigation', async () => {
        await navbar.messagesButton.click();
        await expect(page).toHaveURL('https://qa.gradeflow.net/students/messages');
        await expect(page).toHaveTitle('Gradeflow - Messages');
    });

    test('Student classes page navigation', async () => {
        await navbar.classesButton.click();
        await expect(page).toHaveURL('https://qa.gradeflow.net/students/classes');
        await expect(page).toHaveTitle('Gradeflow - Classes');
    });

    test('Student dashboard page navigation and elements', async () => {
        await navbar.dashboardButton.click();
        await expect(page).toHaveURL('https://qa.gradeflow.net/');
        await expect(page).toHaveTitle('Gradeflow - Dashboard');

        await test.step('Last evalueted assignment elements', async () => {
            await expect(studentDashboard.evaluatedHeader).toBeVisible();
            await expect(studentDashboard.pieChart).toBeVisible();
            await expect(studentDashboard.pieLegend).toBeVisible();
            await expect(studentDashboard.pieLegend).toContainText('Platform', 'Teacher', 'Unearned Points');
            await studentDashboard.hoverPieChart();
            await expect(studentDashboard.pieTooltip).toBeVisible();
            await expect(studentDashboard.pieTooltip).not.toBeEmpty();
            await expect(studentDashboard.evaluatedData).toBeVisible();
            await expect(studentDashboard.evaluatedData).not.toBeEmpty();
        });

        await test.step('Current assignments elements', async () => {
            await expect(studentDashboard.currentHeader).toBeVisible();
            await expect(studentDashboard.assignmentsList).toBeVisible();
            await expect(studentDashboard.assignmentsList).not.toBeEmpty();
            await expect(studentDashboard.allAssignmentsButton).toBeVisible();
        });

        await test.step('Overdue assignments elements', async () => {
            await expect(studentDashboard.overdueHeader).toBeVisible();
            await expect(studentDashboard.allOverdueButton).toBeVisible();
        });

        await test.step('Teacher feedback elements', async () => {
            await expect(studentDashboard.feedbackHeader).toBeVisible();
            await expect(studentDashboard.allFeedbackButton).toBeVisible();
        });
    });
});
