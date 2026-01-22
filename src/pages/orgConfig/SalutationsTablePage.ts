import BasePage from "../../base/BasePage";
import { expect, Locator, Page } from "@playwright/test";

export default class SalutationsTablePage extends BasePage {

    private salutationsPlusIcon: Locator;

    constructor(page: Page) {
        super(page);
        this.salutationsPlusIcon = page.locator('xpath = //i[@class="mdi mdi-plus-box-outline edit-icon"]');
    }

    async navigateToSalutationsCreatePage() {
        await this.salutationsPlusIcon.click();
        console.log(await this.page.url());
    }

    async searchSalutations() {
        await this.searchBarUtils.search('Salutations');
    }

    async clearSearch() {
        await this.searchBarUtils.clearSearch();
    }




}