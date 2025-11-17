const { test, expect } = require('@playwright/test');
const TeacherNavbar = require('./PageObjects/teacher.navbar.js');
const TeacherCurriculum = require('./PageObjects/teacher.curriculum.js');
const TeacherAssignmentModal = require('./PageObjects/teacher.assignment.modal.js');
const InvitationPage = require('./PageObjects/invitation.page.js');
const StudentWorkItem = require('./PageObjects/student.work.item.js');
const StudentDashboard = require('./PageObjects/student.dashboard.js');

test.describe('Assignment turning in flow', async () => {

    let teacherNavbar;
    let teacherCurriculum;
    let assignmentModal;
    let invitationPage;
    let studentWorkItem;
    let studentDashboard;

    // initiating sequantial execution of tests

    test.describe.configure({ mode: 'serial' });

    test('Turning in assignment', async ({ browser }) => {
        // declaring necessary variables and loading browser instances
        const teacherContext = await browser.newContext({ storageState: './auth.teacher.json' });
        const teacherPage = await teacherContext.newPage();
        teacherNavbar = new TeacherNavbar(teacherPage);
        teacherCurriculum = new TeacherCurriculum(teacherPage);
        assignmentModal = new TeacherAssignmentModal(teacherPage);
        const studentContext = await browser.newContext({ storageState: './auth.student.json' });
        const studentPage = await studentContext.newPage();
        invitationPage = new InvitationPage(studentPage);
        studentWorkItem = new StudentWorkItem(studentPage);
        studentDashboard = new StudentDashboard(studentPage);

        await test.step('Creating new assignment', async () => {
            await teacherPage.goto('https://qa.gradeflow.net/signin-teacher');
            await teacherNavbar.myCurriculumButton.click();
            await teacherPage.waitForTimeout(2000);
            // opening New Assignment modal and entering data
            await teacherCurriculum.newAssignmentButton.click();
            await assignmentModal.nameInput.fill(teacherCurriculum.assignmentName);
            await assignmentModal.fillAssignmentData();
            await teacherPage.waitForTimeout(1000);
            await assignmentModal.addAssignmentButton.click();
        });

        await test.step('Copying assignment link', async () => {
            await teacherPage.waitForTimeout(1000);
            await teacherCurriculum.copyLink();
        });

        await test.step('Accepting invitation link', async () => {
            await studentPage.goto('https://qa.gradeflow.net/signin');
            await studentPage.goto(teacherCurriculum.invitationLink);
            await invitationPage.continueButton.click();
        });

        await test.step('Turning in assignment and checking evaluation dialog', async () => {
            await studentWorkItem.evaluateButton.click();
            // validating evaluation dialog elements
            await expect(studentWorkItem.evaluationDialog).toBeVisible();
            await expect(studentWorkItem.evaluationText).toHaveText('Please wait while we evaluate your work');
            await studentPage.waitForTimeout(2000);
            await expect(studentWorkItem.evaluationModal).toBeVisible();
            await expect(studentWorkItem.evaluationPie).toBeVisible();
            await studentWorkItem.hoverEvaluationPie();
            await expect(studentWorkItem.evaluationPieTooltip).toBeVisible();
            await expect(studentWorkItem.evaluationPieLegend).toBeVisible();
            await expect(studentWorkItem.continueWorkingButton).toBeVisible();
            await expect(studentWorkItem.turnInButton).toBeVisible();
            // turning in, checking alert box adn work item elements changed
            await studentWorkItem.turnInButton.click();
            await expect(studentWorkItem.alertSubmitted).toBeVisible();
            await expect(studentWorkItem.alertSubmitted).toHaveText('Assignment Submitted');
            await expect(studentWorkItem.assignmentStatus).toHaveText('Turned In');
            await expect(studentWorkItem.unsubmitButton).toBeVisible();
        });

        await test.step('Checking assignment on dashboard', async () => {
            await studentWorkItem.dashboardLink.click();
            await expect((studentDashboard.assignmentEntry).filter({ hasText: teacherCurriculum.assignmentName })).toContainText('Turned In');
        });

        await studentContext.close();

        await test.step('Checking teacher submissions table', async () => {
            await teacherNavbar.submissionButton.click();
            // validating turned in submission
            await expect(teacherPage.getByRole('cell', { name: teacherCurriculum.assignmentName })).toBeVisible();
        });

        await teacherContext.close();
    });
});
