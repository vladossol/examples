class LoginPage {
    constructor(page) {
        this.page = page;
        this.alertLogOut = page.locator('[id="\\31 "]').getByRole('alert');
        this.googleButton = page.getByRole('button', { name: 'Google' });
        this.switchAccountLink = page.getByRole('link', { name: 'Click Here' });
    }
};

module.exports = LoginPage;
