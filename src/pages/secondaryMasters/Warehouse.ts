import BasePage from "../../base/BasePage";
import { expect, Locator, Page } from "@playwright/test";
import { warehouseData } from "../../utils/propertiesReader";
import { faker } from '@faker-js/faker';
import { SecondaryMasterFaker } from "../../utils/SecondaryMasterFakerUtils";

export class Warehouse extends BasePage {
    private warehousePlusIcon: Locator;
    private warehouseNameTextField: Locator;
    private descriptionTextarea: Locator;
    private activeSatusToggleButton: Locator;
    private saveButton: Locator;


    constructor(page: Page) {
        super(page);
        this.warehousePlusIcon = page.locator('xpath = //i[@class="mdi mdi-plus-box-outline edit-table-icon"]');
        this.warehouseNameTextField = page.locator('xpath= //input[@formcontrolname="name"]');
        this.descriptionTextarea = page.locator('xpath= //textarea[@formcontrolname="description"]');
        this.activeSatusToggleButton = page.locator('xpath= //span[@class="slider round"]');
        this.saveButton = page.locator('xpath= (//button[normalize-space(.="Save")])[2]');
    }

    // Methods To Create Warehouse
    //========================================
    async createWarehouse() {
        await this.clickAddIcon();
        await this.warehouseNameTextField.fill(warehouseData.name);
        await this.descriptionTextarea.fill(warehouseData.description);
        await SecondaryMasterFaker.generateActiveStatus();
        await this.toastContainer().waitFor({ state: 'hidden', timeout: 5000 });
        await this.saveButton.click();
        await this.verifyToast(['created', 'successfully']);
        await this.page.waitForURL(/table/);
    }
    async createRandomWarehouse() {
        await this.clickAddIcon();
        await this.warehouseNameTextField.fill(SecondaryMasterFaker.generateName('Warehouse'));
        await this.descriptionTextarea.fill(SecondaryMasterFaker.generateDescription());
        await SecondaryMasterFaker.generateActiveStatus();
        await this.toastContainer().waitFor({ state: 'hidden', timeout: 5000 });
        await this.saveButton.click();
        await this.verifyToast(['created', 'successfully']);
        await this.page.waitForURL(/table/);
    }
}   