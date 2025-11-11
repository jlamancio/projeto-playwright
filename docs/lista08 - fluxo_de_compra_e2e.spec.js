//@ts-check

import { test, expect } from "@playwright/test";

test.describe('Purchase Flow - positive way', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    });

    test('Complete purchase flow with a valid user', async ({ page }) => {
        //Login
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        await expect(page).toHaveURL(/inventory/);
        await expect(page.getByText('Products')).toBeVisible();
        const items = await page.locator('.inventory_item').count();
        await expect(items).toBeGreaterThan(0);

        //Selecionar item e adicionar ao carrinho 

        await expect(page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' })).toBeVisible();
        await expect(page.locator('.inventory_item').filter({ hasText: '$29.99' })).toBeVisible();

        const selectorMochila = page.locator('.inventory_item').filter({ hasText: /Backpack/ });
        await selectorMochila.getByRole('button', { name: /Add to cart/ }).click();
        await expect(selectorMochila.getByRole('button', { name: /Remove/ })).toBeVisible();

        //Validar item adicionado ao carrinho.

        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        // Navegar até o carrinho de compras

        await page.click('.shopping_cart_link');
        await expect(page).toHaveURL(/cart/);
        await expect(page.getByText('Your Cart')).toBeVisible();

        // Validar o item no carrinho

        const cartItem = page.locator('.cart_item').filter({ hasText: 'Sauce Labs Backpack' });
        const cartItemPrice = page.locator('.inventory_item_price').filter({ hasText: '$29.99' });
        await expect(cartItem).toBeVisible();
        await expect(cartItemPrice).toBeVisible();

        //Ir para o checkout 
        await page.click('#checkout');
        await expect(page).toHaveURL(/checkout-step-one/);
        await expect(page.getByText('Checkout: Your Information')).toBeVisible();
        //Preencher informações do comprador no checkout
        await page.fill(('#first-name'), 'José Luis');
        await page.fill(('#last-name'), 'Amancio');
        await page.fill(('#postal-code'), '12345-678');
        await page.click('#continue');
        //Chechout fase 2 / validar dados de pagamento e total
        await expect(page).toHaveURL(/checkout-step-two/);
        await expect(page.getByText('Checkout: Overview')).toBeVisible();
        await expect(page.locator('.cart_quantity').filter({ hasText: '1' })).toBeVisible();
        await expect(page.locator('.inventory_item_name').filter({ hasText: 'Sauce Labs Backpack' })).toBeVisible();
        await expect(page.locator('.inventory_item_price').filter({ hasText: '$29.99' })).toBeVisible();

        await expect(page.getByText('Payment Information:')).toBeVisible();
        await expect(page.getByText('SauceCard #31337')).toBeVisible();
        await expect(page.getByText('Free Pony Express Delivery!')).toBeVisible();
        await expect(page.getByText('Item total: $29.99')).toBeVisible();
        await expect(page.getByText('Tax: $2.40')).toBeVisible();
        await expect(page.getByText('Total: $32.39')).toBeVisible();

        //Finalizar compra e voltar para home.
        await page.click('#finish');
        await expect(page).toHaveURL(/checkout-complete/);
        await expect(page.getByText('Thank you for your order!')).toBeVisible();
        await expect(page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there!')).toBeVisible();
        await expect(page.locator('.shopping_cart_link')).toBeEmpty();
        await page.click('#back-to-products');
        await expect(page).toHaveURL(/inventory/);
    });
});