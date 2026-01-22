import BasePage from "../../base/BasePage";
import { expect, Locator, Page } from "@playwright/test";

export default class CompanyCategoryCreatepage extends BasePage {
    private companyCategoryNameTextField: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.companyCategoryNameTextField = this.page.locator('xpath= //input[@formcontrolname="name"]');
        this.descriptionTextarea = this.page.locator('xpath= //textarea[@formcontrolname="description"]');
        this.remarksTextarea = this.page.locator('xpath= //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggleButton = this.page.locator('xpath= //span[@class="slider round"]');
        this.saveButton = this.page.locator('xpath= //button[.="Save"]');
    }

    async createCompanyCategory() {
        await this.companyCategoryNameTextField.fill('Test Company Category');
        await this.descriptionTextarea.fill('Test Company Category Description');
        await this.remarksTextarea.fill('Test Company Category Remarks');
        await this.activeStatusToggleButton.click();
        //await this.saveButton.click();
    }
}   