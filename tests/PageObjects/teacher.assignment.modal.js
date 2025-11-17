class TeacherAssignmentModal {
    constructor(page) {
        this.page = page;
        this.nameInput = page.getByPlaceholder('Name');
        this.instructionsInput = page.getByPlaceholder('Instructions');
        this.rubricDropdown = page.getByText('Select a Rubric');
        this.rubricOption = page.getByRole('option', { name: 'Default EduSperience' });
        this.rubricVersion = page.getByLabel('Version');
        this.rubricVersionOption = page.locator('span').filter({ hasText: ' • Current Version' });
        this.classDropdown = page.getByLabel('Class');
        this.classOption = page.getByLabel('Default Class');
        this.startDateButton = page.getByLabel('Start Date');
        this.endDateButton = page.getByLabel('End Date');
        this.startDate = page.getByRole('gridcell', { name: '1', exact: true }).first();
        this.studentGoToNextMonth = page.getByLabel('Go to next month').nth(1);
        this.endDate = page.getByRole('gridcell', { name: '15' }).first();
        this.addAssignmentButton = page.getByRole('button', { name: 'Add Assignment' });
    }

    async fillInstructions() {
        await this.instructionsInput.fill('Some testing instructions');
    }

    async selectRubric() {
        await this.rubricDropdown.click();
        await this.rubricOption.click();
    }

    async selectVersion() {
        await this.rubricVersion.click();
        await this.rubricVersionOption.click();
    }

    async selectClass() {
        await this.classDropdown.click();
        await this.classOption.click();
    }

    async selectStartDate() {
        await this.startDateButton.click();
        await this.startDate.click();
    }

    async selectEndDate() {
        await this.endDateButton.click();
        await this.studentGoToNextMonth.click();
        await this.endDate.click();
    }

    // populating assignment modal details

    async fillAssignmentData() {
        await this.fillInstructions();
        await this.selectRubric();
        await this.selectVersion();
        await this.selectClass();
        await this.selectStartDate();
        await this.selectEndDate();
    }
};

module.exports = TeacherAssignmentModal;
