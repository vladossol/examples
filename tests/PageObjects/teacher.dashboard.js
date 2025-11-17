class TeacherDashboard {
    constructor(page) {
        this.page = page;
        this.newAssignmentButton = page.getByText('New Assignment');
    }
};

module.exports = TeacherDashboard;
