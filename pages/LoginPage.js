export class LoginPage {
    constructor ( page ) {
        this.page = page;
    };

    async login( username, password ) {
        await this.page.goto('/');
        await this.page.fill('#username', 'username');
        await this.page.fill('#password', 'password');
        await this.page.click('#login-button');
    }
}