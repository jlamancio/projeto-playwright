
//@ts-check

import { test, expect } from '@playwright/test';

test.describe('Login Functionality - positive way', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    });

    test('Login with valid credentials', async ({ page }) => {
        
        // Preencher credenciais válidas e clica no botão login. 
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        // Validar redirecionamento a página de produtos e se os produtos estão visíveis.

        await expect(page).toHaveURL(/inventory/);
        await expect(page.getByText('Products')).toBeVisible();

        const items = await page.locator('.inventory_item').count();
        await expect(items).toBeGreaterThan(0);

    });
});


test.describe('Login Functionality - negative way', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    });

    test('Login with invalid username and password', async ({ page }) => {
        await page.fill('#user-name', 'invalid_user');
        await page.fill('#password', 'invalid_pasword');
        await page.click('#login-button');

        // Msg de erro para usuário e senha invalidos    
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();

    });

    test('Login with blank username and password', async ({ page }) => {
        await page.fill('#user-name', '');
        await page.fill('#password', '');
        await page.click('#login-button');

        // Msg de erro para usuário e senha em branco    
        await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();

    });

    test('Login with invalid username', async ({ page }) => {
        await page.fill('#user-name', 'invalid_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        // Msg de erro para usuário invalido
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
    });

    test('Login with invalid password', async ({ page }) => {
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'invalid_password');
        await page.click('#login-button');

        // Msg de erro para password invalida
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
    });

    test('Login with valid user_name and blank password', async ({ page }) => {
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', '');
        await page.click('#login-button');

        // Msg de erro para usuário válido e senha em branco
        await expect(page.getByText('Epic sadface: Password is required')).toBeVisible();
    });

    test('Login with blank user_name and valid password', async ({ page }) => {
        await page.fill('#user-name', '');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        // Msg de erro para usuário válido e senha em branco
        await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
    });
});