import BasePage from "../../base/BasePage";
import { Page, Locator } from "@playwright/test";

export default class OtherCharges extends BasePage {
    private otherChargesPlusIcon: Locator;
    private otherChargesNameTextField: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.otherChargesPlusIcon = this.page.locator('xpath = //button[@class="btn btn-primary"]');
        this.otherChargesNameTextField = this.page.locator('xpath = //input[@formcontrolname="otherChargesName"]');
        this.descriptionTextarea = this.page.locator('xpath = //textarea[@formcontrolname="description"]');
        this.remarksTextarea = this.page.locator('xpath = //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggleButton = this.page.locator('xpath = //span[@class="slider round"]');
        this.saveButton = this.page.locator('xpath = //button[.="Save"]');
    }

    async createOtherCharges() {
        await this.tablePageUtil.clickAddIcon();
        await this.otherChargesNameTextField.fill(this.secondaryMasterFakerUtils.generateName('Other Charges'));
        await this.descriptionTextarea.fill(this.secondaryMasterFakerUtils.generateDescription());
        await this.remarksTextarea.fill(this.secondaryMasterFakerUtils.generateRemarks());
        await this.secondaryMasterFakerUtils.generateActiveStatus();
        await this.saveButton.click();
    }
}
