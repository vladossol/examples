const { test, expect } = require('@playwright/test');
const StudentDashboard = require('./PageObjects/student.dashboard.js');
const StudentWorkItem = require('./PageObjects/student.work.item.js');

test.describe('Student workitem page contents validation', async () => {

    let page;
    let studentWorkItem;
    let studentDashboard;

    // initiating sequantial execution of tests

    test.describe.configure({ mode: 'serial' });

    test.use({ storageState: './auth.student.json' });

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        studentWorkItem = new StudentWorkItem(page);
        studentDashboard = new StudentDashboard(page);
        await page.goto('https://qa.gradeflow.net/signin');
    });

    test('Workitem navbar and assignment title validation', async () => {
        await studentDashboard.goToAssignment();
        await expect(page).toHaveURL(/.*workitem/);
        await expect(page).toHaveTitle('Gradeflow - Student Assignment');
        await expect(studentWorkItem.navbarHeader).toBeVisible();
        await expect(studentWorkItem.assignmentTitle).toBeVisible();
        await expect(studentWorkItem.assignmentTitle).not.toBeEmpty();
        await expect(studentWorkItem.assignmentClass).toBeVisible();
        await expect(studentWorkItem.assignmentClass).not.toBeEmpty();
        await expect(studentWorkItem.assignmentDate).toBeVisible();
        await expect(studentWorkItem.assignmentDate).not.toBeEmpty();
        await expect(studentWorkItem.assignmentStatus).toBeVisible();
        await expect(studentWorkItem.assignmentStatus).not.toBeEmpty();
    });

    test('Workitem navbar buttons and links validation', async () => {
        await expect(studentWorkItem.dashboardLink).toBeVisible();
        await expect(studentWorkItem.profileButton).toBeVisible();
        await expect(studentWorkItem.googleDocsLink).toBeVisible();
        await expect(studentWorkItem.googleDocsLink).toHaveRole('link');
        await expect(studentWorkItem.googleDocsLink).toHaveAttribute('href', /docs.google.com/);
        await studentWorkItem.hoverDocsLink();
        await expect(studentWorkItem.docsTooltip).toBeVisible();
        await expect(studentWorkItem.docsTooltip).toContainText('Open your google/docs in a new tab');
    });

    test('Workitem navbar points counter and tooltip validation', async () => {
        await expect(studentWorkItem.pointsCounter).toBeVisible();
        await expect(studentWorkItem.pointsCounter).toHaveAttribute('data-state', 'closed');
        // not specifying amount of points here
        await expect(studentWorkItem.pointsCounter).not.toBeEmpty();
        await studentWorkItem.hoverPointsCounter();
        // validating points tooltip elements
        await expect(studentWorkItem.pointsPie).toBeVisible();
        await expect(studentWorkItem.pointsCounter).toHaveAttribute('data-state', 'open');
        await studentWorkItem.hoverPointsPie();
        // validating tooltip contents
        await expect(studentWorkItem.pointsPieTooltip).toBeVisible();
        await expect(studentWorkItem.pointsLegend1).toContainText('Platform-Graded');
        await expect(studentWorkItem.pointsLegend2).toContainText('Teacher-Graded');
        await expect(studentWorkItem.pointsLegend3).toContainText('Unearned Points');
        await expect(studentWorkItem.pointsPlatformEntry).toContainText('Platform Points (evaluated):');
        await expect(studentWorkItem.pointsTeacherEntry).toContainText('Teacher Points (evaluated):');
        await expect(studentWorkItem.pointsUnearnedEntry).toContainText('Unearned Points (evaluated):');
    });

    test('Workitem taskbar functionality', async () => {
        await test.step('Assignment overview button and contents', async () => {
            await expect(studentWorkItem.overviewButton).toHaveAttribute('data-state', 'closed');
            await studentWorkItem.overviewButton.click();
            await expect(studentWorkItem.overviewButton).toHaveAttribute('data-state', 'open');
            await expect(studentWorkItem.descriptionText).not.toBeEmpty();
            await studentWorkItem.overviewButton.click();
            await expect(studentWorkItem.overviewButton).toHaveAttribute('data-state', 'closed');
        });

        await test.step('Section button and contents', async () => {
            await page.waitForTimeout(1000);
            await expect(studentWorkItem.section2Button).toHaveAttribute('data-state', 'closed');
            await studentWorkItem.section2Button.click();
            await expect(studentWorkItem.section2Button).toHaveAttribute('data-state', 'open');
            await expect(studentWorkItem.descriptionText).not.toBeEmpty();
            await expect(studentWorkItem.resourceHeader).toBeVisible();
            await expect(studentWorkItem.resourceLink).toBeVisible();
        });

        await test.step('Task fist button and contents', async () => {
            await studentWorkItem.task3Button.click();
            await page.waitForTimeout(1000);
            await expect(studentWorkItem.section2Button).toHaveAttribute('data-state', 'closed');
            await expect(studentWorkItem.task3Button).toHaveAttribute('data-state', 'open');
            await expect(studentWorkItem.instructionsHeader).toBeVisible();
            await expect(studentWorkItem.instructionsText).not.toBeEmpty();
            await expect(studentWorkItem.resourceHeader).toBeVisible();
            await expect(studentWorkItem.resourceLink).toBeVisible();
        });

        await test.step('Task second button and contents', async () => {
            await studentWorkItem.task4Button.click();
            await page.waitForTimeout(1000);
            await expect(studentWorkItem.task3Button).toHaveAttribute('data-state', 'closed');
            await expect(studentWorkItem.task4Button).toHaveAttribute('data-state', 'open');
            await expect(studentWorkItem.instructionsHeader).toBeVisible();
            await expect(studentWorkItem.instructionsText).not.toBeEmpty();
            await expect(studentWorkItem.resourceHeader).toBeVisible();
            await expect(studentWorkItem.resourceLink).toBeVisible();
        });
    });

    test('Workitem taskbar resource modal', async () => {
        await studentWorkItem.resourceLink.click();
        await expect(studentWorkItem.resourceModal).toBeVisible();
        await expect(studentWorkItem.videoFrame).toBeVisible();
        await expect(studentWorkItem.newTabButton).toBeVisible();
        await studentWorkItem.closeButton.click();
    });

    test('Workitem taskbar tabs', async () => {
        await studentWorkItem.completeTab.click();
        await expect(studentWorkItem.overviewButton).toBeVisible();
        await studentWorkItem.allTab.click();
        await expect(studentWorkItem.section1Button).toBeVisible();
        await expect(studentWorkItem.task1Button).toBeVisible();
        await expect(studentWorkItem.task2Button).toBeVisible();
        await studentWorkItem.incompleteTab.click();
        await expect(studentWorkItem.section2Button).toBeVisible();
        await expect(studentWorkItem.task3Button).toBeVisible();
        await expect(studentWorkItem.task4Button).toBeVisible();
    });

    test('Workitem docs iframe', async () => {
        await expect(studentWorkItem.docsIframe).toBeVisible();
    });
});
