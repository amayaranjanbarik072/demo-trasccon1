import BasePage from "../../base/BasePage";
import { expect, Locator, Page } from "@playwright/test";
import { warehouseData } from "../../utils/propertiesReader";
import { faker } from '@faker-js/faker';

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
        await this.tablePageUtil.clickAddIcon();
        await this.warehouseNameTextField.fill(warehouseData.name);
        await this.descriptionTextarea.fill(warehouseData.description);
        await this.secondaryMasterFakerUtils.generateActiveStatus();
        const toastText = await this.toastUtil.getToastMessage(this.page);
        expect(await this.toastUtil.verifyToastMessage(this.page, toastText));
        //await this.toastUtil.verifyToastMessage(this.page, 'Warehouse created successfully');
        // if (await this.toastUtil.getToastMessage(this.page) === toastText) {
        //     console.log('Name already exists.');
        // }else{
        //     await this.saveButton.click();
        // }
        if (await this.toastUtil.getToastMessage(this.page) === toastText) {
            console.log('🔔 Toast Message: ', toastText);
        } else {
            await this.saveButton.click();
        }

    }

    async navigateToWarehouseCreatePage() {
        await this.tablePageUtil.clickAddIcon();
    }
    async createRandomWarehouse() {
        await this.tablePageUtil.clickAddIcon();
        await this.warehouseNameTextField.fill(this.secondaryMasterFakerUtils.generateName('Warehouse'));
        await this.descriptionTextarea.fill(this.secondaryMasterFakerUtils.generateDescription());
        await this.secondaryMasterFakerUtils.generateActiveStatus();
        await this.saveButton.click();
    }

}   