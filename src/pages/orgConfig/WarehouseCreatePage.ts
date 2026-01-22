import BasePage from "../../base/BasePage";
import { expect, Locator, Page } from "@playwright/test";

export default class WarehouseCreatePage extends BasePage {
    private warehouseNameTextField: Locator;
    private descriptionTextarea: Locator;
    private activeSatusToggleButton: Locator;
    private saveButton: Locator;


    constructor(page: Page) {
        super(page);

        this.warehouseNameTextField = this.page.locator('xpath= //input[@formcontrolname="name"]');
        this.descriptionTextarea = this.page.locator('xpath= //textarea[@formcontrolname="description"]');
        this.activeSatusToggleButton = this.page.locator('xpath= //span[@class="slider round"]');
        this.saveButton = this.page.locator('xpath= (//button[normalize-space(.="Save")])[2]');
    }
    async createWarehouse() {
        await this.warehouseNameTextField.fill('Test Warehouse');
        await this.descriptionTextarea.fill('Test Warehouse');
        await this.activeSatusToggleButton.click();
        //await this.saveButton.click();
    }


}
