import { Page, Locator } from '@playwright/test';

export class SearchBarUtils {
    private page: Page;

    searchTextfield: Locator;
    searchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchTextfield = page.locator('xpath= //input[@id="example-search-input"]');
        this.searchButton = page.locator('xpath= //button[@class="btn btn_primary search_btn"]');

    }

    async search(text: string) {
        await this.searchTextfield.click();
        await this.searchTextfield.fill(text);
        await this.searchButton.click();
    }

    async clearSearch() {
        await this.searchTextfield.fill('');
        await this.searchButton.click();
    }

}
