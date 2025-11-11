// pages/InventoryPage.js

export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.productsTitle = this.page.getByText('Products');
        // Localizador corrigido com o ponto '.'
        this.cartLink = this.page.locator(".shopping_cart_link");
    }

    async waitForLoad() {
        await this.productsTitle.waitFor({ state: 'visible' });
        return true;
    }

    async addItemToCart(itemName) {
        // CORREÇÃO LÓGICA: Localiza o bloco inteiro do item (.inventory_item)
        const itemBlock = this.page.locator('.inventory_item').filter({ hasText: itemName });
        // Clica no botão 'Add to cart' DENTRO desse bloco
        await itemBlock.getByRole('button', { name: /Add to cart/i }).click();
    }
    
    async goToCart() {
        // AÇÃO: Navegação para o Carrinho
        await this.cartLink.click();
    }
};