class TeacherNavbar {
    constructor(page) {
        this.page = page;
        this.profileButton = page.getByRole('button', { name: 'profile picture' });
        this.logOutButton = page.getByRole('menuitem', { name: 'Log out' });
        this.submissionButton = page.getByRole('button', { name: 'Submission' });
        this.classesButton = page.getByRole('button', { name: 'Classes' });
        this.myCurriculumButton = page.getByRole('button', { name: 'My Curriculum' });
        this.studentsButton = page.getByRole('button', { name: 'Students' });
        this.dashboardButton = page.getByRole('button', { name: 'Dashboard' });
        this.startTourButton = page.getByRole('button', { name: 'Start Tour' });
        this.marketplaceLink = page.getByRole('link', { name: 'Marketplace' });
    }
};

module.exports = TeacherNavbar;
