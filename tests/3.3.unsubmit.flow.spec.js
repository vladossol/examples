const { test, expect } = require('@playwright/test');
const StudentWorkItem = require('./PageObjects/student.work.item.js');
const StudentDashboard = require('./PageObjects/student.dashboard.js');

test.describe('Assignment unsubmit flow', async () => {

    let studentWorkItem;
    let studentDashboard;

    // initiating sequantial execution of tests

    test.describe.configure({ mode: 'serial' });

    test('Unsubmitting assignment', async ({ browser }) => {
        // declaring necessary variables and loading browser instances
        const teacherContext = await browser.newContext({ storageState: './auth.teacher.json' });
        const teacherPage = await teacherContext.newPage();
        const studentContext = await browser.newContext({ storageState: './auth.student.json' });
        const studentPage = await studentContext.newPage();
        studentWorkItem = new StudentWorkItem(studentPage);
        studentDashboard = new StudentDashboard(studentPage);

        await test.step('Opening turned in assignment', async () => {
            // opening student dashboard and clicking first 'Turned In' assignment in the list
            await studentPage.goto('https://qa.gradeflow.net/signin');
            await studentDashboard.assignmentEntry.filter({ hasText: 'Turned In' }).first().click();
        });

        await test.step('Unsubmit and cancel', async () => {
            await studentWorkItem.unsubmitButton.click();
            await expect(studentWorkItem.unsubmitAlert).toBeVisible();
            await expect(studentWorkItem.cancelUnsubmitButton).toBeVisible();
            await expect(studentWorkItem.continueUnsubmitButton).toBeVisible();
            await studentWorkItem.cancelUnsubmitButton.click();
            await expect(studentWorkItem.assignmentStatus).toContainText('Turned In');
        });

        // grabbing assiignment title string
        const assignmentTitle = await studentWorkItem.assignmentTitle.innerText();

        await test.step('Unsubmit and continue', async () => {
            await studentWorkItem.unsubmitButton.click();
            await studentWorkItem.continueUnsubmitButton.click();
            // checking UI changes
            await expect(studentWorkItem.evaluateButton).toBeVisible();
            await expect(studentWorkItem.assignmentStatus).toContainText('In Progress');
        });

        await test.step('Checking student dashboard', async () => {
            await studentWorkItem.dashboardLink.click();
            await expect((studentDashboard.assignmentEntry).filter({ hasText: assignmentTitle })).toContainText('In Progress');
        });

        await test.step('Checking teacher submissions', async () => {
            await teacherPage.goto('https://qa.gradeflow.net/teacher/submission');
            await expect(teacherPage.getByRole('row', { name: assignmentTitle })).not.toBeVisible();
        });

        await teacherContext.close();
        await studentContext.close();
    });
});
