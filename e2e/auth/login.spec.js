
//@ts-check

import { test, expect } from "../../test-setup/base.ts";
import { users } from "../../fixtures/userData.js";

test.describe('Login Functionality - positive way', () => {

    test('Login with valid credentials', async ({ page, loginPage }) => {

        await loginPage.login(users.standard.username, users.standard.password);
        await expect(page).toHaveURL(/inventory/);
        await expect(page.getByText('Products')).toBeVisible();

        const items = await page.locator('.inventory_item').count();
        await expect(items).toBeGreaterThan(0);

    });
});


test.describe('Login Functionality - negative way', () => {

    test('Login with invalid username and password', async ({ page, loginPage }) => {

        await loginPage.login(users.invalid_credentials.username, users.invalid_credentials.password);
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();

    });

    test('Login with blank username and password', async ({ page, loginPage }) => {

        await loginPage.login('', '');
        await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();

    });

    test('Login with invalid username', async ({ page, loginPage }) => {

        await loginPage.login(users.invalid_credentials.username, users.standard.password);
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
        
    });

    test('Login with invalid password', async ({ page, loginPage }) => {

        await loginPage.login(users.standard.username, users.invalid_credentials.password);
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();

    });

    test('Login with valid user_name and blank password', async ({ page, loginPage }) => {

        await loginPage.login(users.standard.username, '');
        await expect(page.getByText('Epic sadface: Password is required')).toBeVisible();

    });

    test('Login with blank user_name and valid password', async ({ page, loginPage }) => {
        await loginPage.login('', users.standard.password);
        await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();

    });

});
