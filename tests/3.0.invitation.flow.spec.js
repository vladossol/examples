const { test, expect } = require('@playwright/test');
const TeacherNavbar = require('./PageObjects/teacher.navbar.js');
const TeacherCurriculum = require('./PageObjects/teacher.curriculum.js');
const TeacherAssignmentModal = require('./PageObjects/teacher.assignment.modal.js')
const InvitationPage = require('./PageObjects/invitation.page.js');
const StudentWorkItem = require('./PageObjects/student.work.item.js');
const StudentDashboard = require('./PageObjects/student.dashboard.js');

test.describe('Assignment invitation flow', async () => {

    let teacherNavbar;
    let teacherCurriculum;
    let assignmentModal;
    let invitationPage;
    let studentWorkItem;
    let studentDashboard;

    // initiating sequantial execution of tests

    test.describe.configure({ mode: 'serial' });

    test('Accepting invitation link', async ({ browser }) => {
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
            // validating alert pop up presence and contents
            await expect(teacherCurriculum.alertAssignmentCreated).toBeVisible();
            await expect(teacherCurriculum.alertAssignmentCreated).toHaveText('New Assignment Created');
            // validating assingment entry presence
            await teacherPage.waitForTimeout(1000);
            await expect(teacherCurriculum.assignmentEntry).toBeVisible();
        });

        await test.step('Copying assignment link', async () => {
            await teacherCurriculum.copyLink();
            // validating alert pop up presence and contents
            await expect(teacherCurriculum.alertLinkCopied).toBeVisible();
            await expect(teacherCurriculum.alertLinkCopied).toHaveText(teacherCurriculum.assignmentName + ' assignment invitation link sucessfully copied.');
            // validating clipboard URL string
            await expect(teacherCurriculum.invitationLink).toContain('/students/assignments/invite/');
        });

        await teacherContext.close();

        await test.step('Navigating to invitation page', async () => {
            // navigating to invitation link and clicking to continue to work item page
            await studentPage.goto('https://qa.gradeflow.net/signin');
            await studentPage.goto(teacherCurriculum.invitationLink);
            await expect(studentPage).toHaveTitle('Gradeflow - Assignment Invite');
            await expect(invitationPage.header).toBeVisible();
            await expect(invitationPage.continueButton).toBeVisible();
            // navigating to work item page
            await invitationPage.continueButton.click();
        });

        await test.step('Checking work item page', async () => {
            // validating work item page
            await expect(studentWorkItem.alertInvitationAccepted).toBeVisible();
            await expect(studentWorkItem.alertInvitationAccepted).toHaveText('Assignment Invite Accepted');
            await expect(studentPage).toHaveURL(/.*workitem/);
            await expect(studentPage).toHaveTitle('Gradeflow - Student Assignment');
            await expect(studentWorkItem.assignmentTitle).toHaveText(teacherCurriculum.assignmentName);
            // navigating to student dashboard
            await studentWorkItem.dashboardLink.click();
        });

        await test.step('Checking student dashboard page', async () => {
            // validating assignment entry on dashboard
            await studentPage.waitForTimeout(1000);
            await expect(studentDashboard.assignmentEntry.filter({ hasText: teacherCurriculum.assignmentName })).toBeVisible();
        });

        await studentContext.close();
    });
});
