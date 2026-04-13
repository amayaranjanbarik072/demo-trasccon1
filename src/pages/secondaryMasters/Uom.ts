import BasePage from "../../base/BasePage";
import { Page, expect, Locator } from "@playwright/test";
import { SecondaryMasterFaker } from "../../utils/SecondaryMasterFakerUtils";

export class Uom extends BasePage {
    private uomPlusIcon: Locator;
    private uomNameTextField: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.uomPlusIcon = this.page.locator('xpath= //i[@class="mdi mdi-plus-box-outline edit-icon"]');
        this.uomNameTextField = this.page.locator('xpath= //input[@formcontrolname="name"]');
        this.descriptionTextarea = this.page.locator('xpath= //textarea[@formcontrolname="description"]');
        this.remarksTextarea = this.page.locator('xpath= //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggleButton = this.page.locator('xpath= //span[@class="slider round"]');
        this.saveButton = this.page.locator('xpath= //button[@class="btn btn_primary ng-star-inserted"]');
    }

    async createUom() {
        await this.clickAddIcon();
        await this.uomNameTextField.fill(SecondaryMasterFaker.generateName('Uom'));
        await this.descriptionTextarea.fill(SecondaryMasterFaker.generateDescription());
        await this.remarksTextarea.fill(SecondaryMasterFaker.generateRemarks());
        await SecondaryMasterFaker.generateActiveStatus();
        await this.toastContainer().waitFor({ state: 'hidden', timeout: 5000 });
        await this.saveButton.click();
        await this.verifyToast(['created', 'successfully']);
        await this.page.waitForURL(/table/);
    }
}   