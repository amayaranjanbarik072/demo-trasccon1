import BasePage from "../../base/BasePage";
import { expect, Locator, Page } from "@playwright/test";
import { SecondaryMasterFaker } from "../../utils/SecondaryMasterFakerUtils";

export class MaterialType extends BasePage {
    private materialTypePlusIcon: Locator;
    private materialTypeNameTextField: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.materialTypePlusIcon = page.locator('xpath = //button[@class="btn btn-primary"]');
        this.materialTypeNameTextField = page.locator('xpath = //input[@formcontrolname="name"]');
        this.descriptionTextarea = page.locator('xpath = //textarea[@formcontrolname="description"]');
        this.remarksTextarea = page.locator('xpath = //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggleButton = page.locator('xpath = //span[@class="slider round"]');
        this.saveButton = page.locator('xpath = //button[.="Save"]');
    }

    async createMaterialType() {
        await this.clickAddIcon();
        await this.materialTypeNameTextField.fill(SecondaryMasterFaker.generateName('MaterialType'));
        await this.descriptionTextarea.fill(SecondaryMasterFaker.generateDescription());
        await this.remarksTextarea.fill(SecondaryMasterFaker.generateRemarks());
        await SecondaryMasterFaker.generateActiveStatus();
        await this.toastContainer().waitFor({ state: 'hidden', timeout: 5000 });
        await this.saveButton.click();
        await this.verifyToast(['created', 'successfully']);
        await this.page.waitForURL(/table/);
    }
}   