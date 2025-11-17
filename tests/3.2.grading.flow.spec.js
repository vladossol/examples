const { test, expect } = require('@playwright/test');
const TeacherNavbar = require('./PageObjects/teacher.navbar.js');
const TeacherCurriculum = require('./PageObjects/teacher.curriculum.js');
const TeacherAssignmentModal = require('./PageObjects/teacher.assignment.modal.js');
const InvitationPage = require('./PageObjects/invitation.page.js');
const StudentWorkItem = require('./PageObjects/student.work.item.js');
const StudentDashboard = require('./PageObjects/student.dashboard.js');
const TeacherGrader = require('./PageObjects/teacher.grader.js');

test.describe('Assignment grading flow', async () => {

    let teacherNavbar;
    let teacherCurriculum;
    let teacherGrader;
    let assignmentModal;
    let invitationPage;
    let studentWorkItem;
    let studentDashboard;

    // initiating sequantial execution of tests

    test.describe.configure({ mode: 'serial' });

    test('Evaluating, overwriting score and final grading', async ({ browser }) => {
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

        await test.step('Turning in assignment', async () => {
            await studentWorkItem.evaluateButton.click();
            // applying small wait between click action
            await studentPage.waitForTimeout(1000);
            await studentWorkItem.turnInButton.click();
            // asserting that earned points are displayed. Assignment file is configured to return 50% of points
            await expect(studentWorkItem.pointsCounter).toContainText('15 / 30 pts (50.0%)');
            // assering elements in task bar: complete/incomplete tabs
            await studentWorkItem.completeTab.click();
            await expect(studentWorkItem.task1Button).toBeVisible();
            await expect(studentWorkItem.task2Button).toBeVisible();
            await studentWorkItem.incompleteTab.click();
            await expect(studentWorkItem.task3Button).toBeVisible();
            await expect(studentWorkItem.task4Button).toBeVisible();
        });

        await test.step('Overwriting platform evaluation and grading assignment', async () => {
            await teacherPage.goto('https://qa.gradeflow.net/teacher/submission');
            // checking evaluation score in submissions table
            await expect(teacherPage.getByRole('row', { name: teacherCurriculum.assignmentName }).locator('td:nth-child(7)').first()).toContainText('15/30 (50%) | 2/0');
            // opening grader for selected submission
            await teacherPage.getByRole('row', { name: teacherCurriculum.assignmentName }).locator('button').first().click();
            // checking page rendering and document display
            await expect(teacherPage).toHaveURL(/.*grade/);
            await expect(teacherPage).toHaveTitle('Gradeflow - Grade Submission');
            await expect(teacherGrader.assignmentDocument).toBeVisible();
            // checking evaluation score on grader page
            await expect(teacherGrader.runningScore).toContainText('Running 15/30');
            // checking task buttons display
            await expect(teacherGrader.task1Button).toBeVisible();
            await expect(teacherGrader.task2Button).toBeVisible();
            await expect(teacherGrader.task3Button).toBeVisible();
            await expect(teacherGrader.task4Button).toBeVisible();
            // overwriting task 1 platform grade results and checking runnig score change
            await teacherGrader.dragSlider();
            await teacherGrader.taskGradeButton.click();
            await expect(teacherGrader.runningScore).toContainText('Running 10/30');
            await teacherGrader.finalGradeButton.click();
            // checking submissions page redirection and validating that submission isn't in the table
            await expect(teacherPage).toHaveURL('https://qa.gradeflow.net/teacher/submission');
            await expect(teacherPage).toHaveTitle('Gradeflow - Submissions');
            await teacherPage.waitForTimeout(1000);
            await expect(teacherPage.getByRole('row', { name: teacherCurriculum.assignmentName })).not.toBeVisible();
        });

        await teacherContext.close();

        await test.step('Checking graded status on student dashboard', async () => {
            // checking status and points change on graded work item
            await studentPage.reload();
            await studentPage.waitForTimeout(1000);
            await expect(studentWorkItem.assignmentStatus).toHaveText('Graded');
            await expect(studentWorkItem.pointsCounter).toContainText('10 / 30 pts (33.3%)');
            await studentWorkItem.dashboardLink.click();
            await expect((studentDashboard.assignmentEntry).filter({ hasText: teacherCurriculum.assignmentName })).toContainText('Graded');
        });

        await studentContext.close();
    });
});
