
import { test, expect } from "../../test-setup/base.ts";
import { users } from "../../fixtures/userData.js";

test.describe('Validate Inventory Page', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('Validate Inventory Page', async ({ page, inventoryPage }) => {
    await inventoryPage.waitForLoad();
    await expect(page).toHaveURL(/inventory/);
    await expect(inventoryPage.productsTitle).toBeVisible();
    await expect(inventoryPage.cartLink).toBeVisible();

  });

  test('Add item to cart', async ({ page, inventoryPage }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
   // await expect.locator('data-test="shopping-cart-badge"').toHaveText('1');
  });

});



