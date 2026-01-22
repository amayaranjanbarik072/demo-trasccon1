import BasePage from "../../base/BasePage";
import { Page, Locator, expect } from "@playwright/test";

export class SalesAndMarketingPage extends BasePage {
    private categoryLink: Locator;

    constructor(page: Page) {
        super(page);
        this.categoryLink = this.page.locator('xpath= //a[normalize-space(.)="Category"]');
    }

    async navigateToCategory() {
        await this.categoryLink.click();
        console.log('Category Table Page URL: ' + await this.page.url());
    }
}