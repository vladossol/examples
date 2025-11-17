class TeacherSubmissions {
    constructor(page) {
        this.page = page;
        this.clearAllButton = page.getByRole('button', { name: 'Clear All' });
    }
};

module.exports = TeacherSubmissions;
