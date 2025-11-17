const { test, expect } = require('@playwright/test');
const TeacherNavbar = require('./PageObjects/teacher.navbar.js');
const TeacherCurriculum = require('./PageObjects/teacher.curriculum.js');
const TeacherAssignmentModal = require('./PageObjects/teacher.assignment.modal.js');
const InvitationPage = require('./PageObjects/invitation.page.js');
const StudentWorkItem = require('./PageObjects/student.work.item.js');
const StudentDashboard = require('./PageObjects/student.dashboard.js');
const TeacherGrader = require('./PageObjects/teacher.grader.js');

test.describe('Assignment feedback flow', async () => {

    let teacherNavbar;
    let teacherCurriculum;
    let teacherGrader;
    let assignmentModal;
    let invitationPage;
    let studentWorkItem;
    let studentDashboard;

    // initiating sequantial execution of tests

    test.describe.configure({ mode: 'serial' });

    test.skip('Assignment feedback sending, checking UI changes', async ({ browser }) => {
        // declaring necessary variables and loading browser instances
        const teacherContext = await browser.newContext({ storageState: './auth.teacher.json' });
        const teacherPage = await teacherContext.newPage();
        teacherNavbar = new TeacherNavbar(teacherPage);
        teacherCurriculum = new TeacherCurriculum(teacherPage);
        assignmentModal = new TeacherAssignmentModal(teacherPage);
        teacherGrader = new TeacherGrader(teacherPage);
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

        await test.step.skip('Evaluating assignment, checking UI', async () => {

        });

        await test.step.skip('Filling feedback and sending', async () => {

            // validating that submission isn't in the table
        });
        
        await test.step.skip('Checking assignment status change, reading feedback', async () => {

            // validating assignment status on dashboard
        });

        //await teacherContext.close();
        //await studentContext.close();
    });
});
