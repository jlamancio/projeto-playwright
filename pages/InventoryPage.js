// pages/InventoryPage.js

export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.productsTitle = this.page.getByText('Products');
        this.cartLink = this.page.locator(".shopping_cart_link");
    }

    async waitForLoad() {
        await this.productsTitle.waitFor({ state: 'visible' });
        return true;
    }

    async addItemToCart(itemName) {
        const itemBlock = this.page.locator('.inventory_item').filter({ hasText: itemName });
    }
    
    async goToCart() {
        await this.cartLink.click();
    }
};