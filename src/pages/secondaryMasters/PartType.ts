import BasePage from "../../base/BasePage";
import { Page, expect, Locator } from "@playwright/test";

export class PartType extends BasePage {
    private partTypePlusIcon: Locator;

    constructor(page: Page) {
        super(page);
        this.partTypePlusIcon = this.page.locator('xpath= //i[@class="mdi mdi-plus-box-outline edit-icon"]');
    }

    async navigateToPartTypeCreatePage() {
        await this.tablePageUtil.clickAddIcon();
    }
}

