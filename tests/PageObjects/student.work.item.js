class StudentWorkItem {
    constructor(page) {
        this.page = page;
        this.alertInvitationAccepted = page.locator('[id="\\31 "]').getByRole('alert');
        this.alertSubmitted = page.locator('[id="\\32 "]').getByRole('alert');
        this.navbarHeader = page.locator('header');
        // assignment title elements
        this.assignmentTitle = page.locator('div.justify-center > div').first();
        this.assignmentClass = page.locator('div.justify-center > div').nth(1).locator('div').nth(0);
        this.assignmentDate = page.locator('div.justify-center > div').nth(1).locator('div').nth(2);
        this.assignmentStatus = page.locator('div.justify-center > div').nth(1).locator('div').nth(4);
        // header buttons and links
        this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
        this.evaluateButton = page.getByRole('button', { name: 'Evaluate' });
        this.googleDocsLink = page.locator('a.items-center').nth(1);
        this.profileButton = page.getByRole('button', { name: 'profile picture' });
        this.docsTooltip = page.locator('span[role = "tooltip"]');
        this.pointsCounter = page.locator('a[class = "hover:cursor-pointer"]');
        this.unsubmitButton = page.getByRole('button', { name: 'Unsubmit' });
        // points tooltip elements
        this.pointsPie = page.locator('g.recharts-pie');
        this.pointsPieTooltip = page.locator('.recharts-wrapper');
        this.pointsLegend1 = page.locator('li.legend-item-0');
        this.pointsLegend2 = page.locator('li.legend-item-1');
        this.pointsLegend3 = page.locator('li.legend-item-2');
        this.pointsPlatformEntry = page.locator('div.mt-4 > div').nth(0);
        this.pointsTeacherEntry = page.locator('div.mt-4 > div').nth(1);
        this.pointsUnearnedEntry = page.locator('div.mt-4 > div').nth(2);
        // taskbar elements 
        /* Update (25.01): Changed button locators to suit this speific rubric naming, 
        since when 'Hint' appears on UI it also haves <button> tag which is breaking further button locators. */

        /* this.overviewButton = page.locator('div.border-b').nth(0).locator('button');
        this.sectionButton = page.locator('div.border-b').nth(1).locator('button').first();
        this.task1Button = page.locator('div.border-b').nth(2).locator('button').first();
        this.task2Button = page.locator('div.border-b').nth(3).locator('button').first(); */

        this.overviewButton = page.locator('button').filter({ hasText: 'Assignment Overview' });
        this.section1Button = page.locator('button').filter({ hasText: 'Section 1' }).first();
        this.section2Button = page.locator('button').filter({ hasText: 'Section 2' }).first();
        this.task1Button = page.locator('button').filter({ hasText: 'Task 1' }).first();
        this.task2Button = page.locator('button').filter({ hasText: 'Task 2' }).first();
        this.task3Button = page.locator('button').filter({ hasText: 'Task 3' }).first();
        this.task4Button = page.locator('button').filter({ hasText: 'Task 4' }).first();
        this.descriptionText = page.locator('div.p-4').locator('p');
        this.resourceHeader = page.locator('div.my-3').locator('div');
        this.resourceLink = page.locator('div.my-3').locator('button');
        this.instructionsHeader = page.locator('div.mb-3').locator('div').first();
        this.instructionsText = page.locator('div.mb-3').locator('p');
        // resource modal
        this.resourceModal = page.getByLabel('Media Viewer');
        this.videoFrame = page.locator('iframe#video-player');
        this.newTabButton = page.getByRole('button', { name: 'Open In New Tab' });
        this.closeButton = page.getByRole('button', { name: 'Close' }).first();
        // taskbar tabs
        this.completeTab = page.getByRole('tab', { name: 'Complete', exact: true });
        this.allTab = page.getByRole('tab', { name: 'All' });
        this.incompleteTab = page.getByRole('tab', { name: 'Incomplete' });
        // docs iframe
        this.docsIframe = page.locator('iframe.border-none');
        // evaluation modal
        this.evaluationDialog = page.getByRole('dialog', { name: 'Evaluating...' });
        this.evaluationText = page.locator('p.text-muted-foreground'); //Please wait while we evaluate your work
        this.evaluationModal = page.getByRole('dialog', { name: 'Evaluation Results' });
        this.continueWorkingButton = page.getByRole('button', { name: 'Continue Working' });
        this.turnInButton = page.getByRole('button', { name: 'Turn In Assignment' });
        this.evaluationPie = page.locator('g.recharts-pie');
        this.evaluationPieTooltip = page.locator('div.recharts-tooltip-wrapper');
        this.evaluationPieLegend = page.locator('div.recharts-legend-wrapper');
        // unsubmit modal
        this.unsubmitAlert = page.getByRole('alertdialog', { name: 'Are you absolutely sure?' });
        this.cancelUnsubmitButton = page.getByRole('button', { name: 'Cancel' });
        this.continueUnsubmitButton = page.getByRole('button', { name: 'Continue' });
    }

    async hoverDocsLink() {
        await this.googleDocsLink.hover();
    }

    async hoverPointsCounter() {
        await this.pointsCounter.hover();
    }

    async hoverPointsPie() {
        await this.pointsPie.hover({ position: { x: 5, y: 82 } });
    }

    async hoverEvaluationPie() {
        await this.evaluationPie.hover({ position: { x: 5, y: 82 } });
    }
};

module.exports = StudentWorkItem;
