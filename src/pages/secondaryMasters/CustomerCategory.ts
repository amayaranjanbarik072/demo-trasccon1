import BasePage from "../../base/BasePage";
import { Page, Locator } from "@playwright/test";

export class CustomerCategory extends BasePage {
    private customerCategoryNameTextField: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggle: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.customerCategoryNameTextField = page.locator('xpath= //input[@formcontrolname="name"]');
        this.descriptionTextarea = page.locator('xpath= //textarea[@formcontrolname="description"]');
        this.remarksTextarea = page.locator('xpath= //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggle = page.locator('xpath= //span[@class="slider round"]');
        this.saveButton = page.locator('xpath= (//button[normalize-space(.="Save")])[2]');
    }

    async createCustomerCategory() {
        await this.tablePageUtil.clickAddIcon();
        await this.customerCategoryNameTextField.fill(this.secondaryMasterFakerUtils.generateName('Customer Category'));
        await this.descriptionTextarea.fill(this.secondaryMasterFakerUtils.generateDescription());
        await this.remarksTextarea.fill(this.secondaryMasterFakerUtils.generateRemarks());
        await this.secondaryMasterFakerUtils.generateActiveStatus();
        await this.saveButton.click();
    }
}