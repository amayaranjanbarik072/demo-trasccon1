import BasePage from "../../base/BasePage";
import { expect, Locator, Page } from "@playwright/test";

export default class WarehouseTablePage extends BasePage {

    private warehousePlusIcon: Locator;

    constructor(page: Page) {
        super(page);
        this.warehousePlusIcon = this.page.locator('xpath= //i[@class="mdi mdi-plus-box-outline edit-icon"]');
    }

    async navigateToWarehouseCreatePage() {
        await this.warehousePlusIcon.click();
    }
}

