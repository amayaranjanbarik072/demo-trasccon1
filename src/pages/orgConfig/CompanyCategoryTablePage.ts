import BasePage from "../../base/BasePage";
import { expect, Locator, Page } from "@playwright/test";

export default class CompanyCategoryTablepage extends BasePage {
    private companyCategoryPlusIcon: Locator;

    constructor(page: Page) {
        super(page);
        this.companyCategoryPlusIcon = this.page.locator('xpath= //i[@class="mdi mdi-plus-box-outline edit-icon"]');

    }

    async navigateToCompanyCategoryCreatePage() {
        await this.companyCategoryPlusIcon.click();
        console.log('Company Category Create Page URL: ' + await this.page.url());
    }
}