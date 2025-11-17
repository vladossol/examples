class StudentDashboard {
    constructor(page) {
        this.page = page;
        this.assignmentEntry = page.locator('div[dir = "ltr"]').locator('div.p-2.pt-0');
        this.evaluatedHeader = page.getByRole('heading', { name: 'Latest Evaluated Assignment' });
        this.pieChart = page.locator('g.recharts-pie');
        this.pieLegend = page.locator('ul.recharts-default-legend');
        this.pieTooltip = page.locator('.recharts-tooltip-wrapper');
        this.evaluatedData = page.locator('div.p-2.pt-0.px-2');
        this.currentHeader = page.getByRole('heading', { name: 'Current Assignments' });
        this.assignmentsList = page.locator('div[dir = "ltr"]');
        this.allAssignmentsButton = page.getByRole('button', { name: 'View All Assignments' });
        this.overdueHeader = page.getByRole('heading', { name: 'Overdue Assignments' });
        this.allOverdueButton = page.getByRole('button', { name: 'View All Overdue Assignments' });
        this.feedbackHeader = page.getByRole('heading', { name: 'Teacher feedback' });
        this.allFeedbackButton = page.getByRole('button', { name: 'View More' });
    }

    async hoverPieChart() {
        await this.pieChart.hover({ position: { x: 5, y: 82 } });
    }

    async goToAssignment() {
        await this.assignmentEntry.filter({ hasText: 'In Progress' }).first().click();
    }
};

module.exports = StudentDashboard;
