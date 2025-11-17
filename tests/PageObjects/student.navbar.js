class StudentNavbar {
    constructor(page) {
        this.page = page;
        this.profileButton = page.getByRole('button', { name: 'profile picture' });
        this.logOutButton = page.getByRole('menuitem', { name: 'Log out' });
        this.assignmentsButton = page.getByRole('button', { name: 'Assignments', exact: true });
        this.messagesButton = page.getByRole('button', { name: 'Messages' });
        this.classesButton = page.getByRole('button', { name: 'Classes' });
        this.dashboardButton = page.getByRole('button', { name: 'Dashboard' });
    }
};

module.exports = StudentNavbar;
