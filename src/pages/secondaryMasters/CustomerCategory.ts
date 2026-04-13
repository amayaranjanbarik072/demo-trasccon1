import BasePage from "../../base/BasePage";
import { Page, Locator } from "@playwright/test";
import { SecondaryMasterFaker } from "../../utils/SecondaryMasterFakerUtils";

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
        await this.clickAddIcon();
        await this.customerCategoryNameTextField.fill(SecondaryMasterFaker.generateName('Customer Category'));
        await this.descriptionTextarea.fill(SecondaryMasterFaker.generateDescription());
        await this.remarksTextarea.fill(SecondaryMasterFaker.generateRemarks());
        await SecondaryMasterFaker.generateActiveStatus();
        await this.toastContainer().waitFor({ state: 'hidden', timeout: 5000 });
        await this.saveButton.click();
        await this.verifyToast(['created', 'successfully']);
        await this.page.waitForURL(/table/);
    }
}