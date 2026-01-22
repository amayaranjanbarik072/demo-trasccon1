import BasePage from "../../base/BasePage";
import { expect, Locator, Page } from "@playwright/test";


export class UocTablePage extends BasePage {

    private uocPlusIcon: Locator;

    constructor(page: Page) {
        super(page);
        this.uocPlusIcon = page.locator('xpath = //i[@class="mdi mdi-plus-box-outline edit-icon"]');
    }

    async navigateToUocCreatePage() {
        await this.uocPlusIcon.click();
        console.log(await this.page.url());
    }

    async searchUoc() {
        await this.searchBarUtils.search('Uoc');
    }

    async clearSearch() {
        await this.searchBarUtils.clearSearch();
    }



}