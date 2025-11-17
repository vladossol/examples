class TeacherCurriculum {
    constructor(page) {
        this.page = page;
        this.assignmentName = Date.now() + ' Assignment';
        this.newAssignmentButton = page.getByText('New Assignment');
        this.alertAssignmentCreated = page.locator('[id="\\31 "]').getByRole('alert');
        this.alertLinkCopied = page.locator('[id="\\32 "]').getByRole('alert');
        this.assignmentEntry = page.locator('li', { hasText: this.assignmentName });
        this.copyLinkButton = page.locator('li', { hasText: this.assignmentName }).getByRole('button').first();
    }

    async copyLink() {
        await this.copyLinkButton.click();
        this.invitationLink = await this.page.evaluate("navigator.clipboard.readText()");
    }
};

module.exports = TeacherCurriculum;
