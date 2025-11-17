class InvitationPage {
    constructor(page) {
        this.page = page;
        this.header = page.getByRole('heading', { name: 'Assignment Invite' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });       
    }
};

module.exports = InvitationPage;
