import BasePage from "../../base/BasePage";
import { Page, Locator } from "@playwright/test";
import { SecondaryMasterFaker } from "../../utils/SecondaryMasterFakerUtils";

export default class GstPercentage extends BasePage {
    private gstPercentagePlusIcon: Locator;
    private gstPercentageTextField: Locator;
    private descriptionTextarea: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.gstPercentagePlusIcon = this.page.locator('xpath = //button[@class="btn btn-primary"]');
        this.gstPercentageTextField = this.page.locator('xpath = //input[@formcontrolname="name"]');
        this.descriptionTextarea = this.page.locator('xpath = //textarea[@formcontrolname="description"]');
        this.activeStatusToggleButton = this.page.locator('xpath = //span[@class="slider round"]');
        this.saveButton = this.page.locator('xpath = //button[.="Save"]');
    }

    async createGstPercentage() {
        await this.clickAddIcon();
        await this.gstPercentageTextField.fill(SecondaryMasterFaker.generateName('GST Percentage'));
        await this.descriptionTextarea.fill(SecondaryMasterFaker.generateDescription());
        await SecondaryMasterFaker.generateActiveStatus();
        await this.toastContainer().waitFor({ state: 'hidden', timeout: 5000 });
        await this.saveButton.click();
        await this.verifyToast(['created', 'successfully']);
        await this.page.waitForURL(/table/);
    }
}