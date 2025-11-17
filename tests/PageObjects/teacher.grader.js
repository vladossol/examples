class TeacherGrader {
    constructor(page) {
        this.page = page;
        this.runningScore = page.locator('span.text-md');
        this.assignmentDocument = page.locator('iframe[title="Assignment file preview"]');
        this.task1Button = page.getByRole('button', { name: '/ 10 Task 1' });
        this.task2Button = page.getByRole('button', { name: '/ 5 Task 2' });
        this.task3Button = page.getByRole('button', { name: '/ 10 Task 3' });
        this.task4Button = page.getByRole('button', { name: '/ 5 Task 4' });
        this.graderSlider = page.getByRole('slider');
        this.graderRange = page.getByRole('region', { name: '/ 10 Task 1' }).locator('span').nth(2)
        this.taskGradeButton = page.getByRole('button', { name: 'Grade' });
        this.finalGradeButton = page.getByRole('button').filter({ hasText: /^$/ }).nth(1);
    }

    async dragSlider() {
        await this.graderSlider.dragTo(this.graderRange);
    }
};

module.exports = TeacherGrader;
