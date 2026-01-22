import BasePage from "../../base/BasePage";
import { Page, Locator, expect } from "@playwright/test";

export class CustomerType extends BasePage {
    private customerTypeTextField: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.customerTypeTextField = page.locator('xpath= //input[@formcontrolname="name"]');
        this.descriptionTextarea = page.locator('xpath= //textarea[@formcontrolname="description"]');
        this.remarksTextarea = page.locator('xpath= //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggleButton = page.locator('xpath= //span[@class="slider round"]');
        this.saveButton = page.locator('xpath= (//button[normalize-space(.="Save")])[2]');
    }

    async createCustomerType() {
        await this.tablePageUtil.clickAddIcon();
        await this.customerTypeTextField.fill(this.secondaryMasterFakerUtils.generateName('Customer Type'));
        await this.descriptionTextarea.fill(this.secondaryMasterFakerUtils.generateDescription());
        await this.remarksTextarea.fill(this.secondaryMasterFakerUtils.generateRemarks());
        await this.secondaryMasterFakerUtils.generateActiveStatus();
        await this.saveButton.click();
    }
}