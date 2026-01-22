import BasePage from "../../base/BasePage";
import { Page, Locator } from "@playwright/test";

export default class PreferredFreightForwarder extends BasePage {
    private preferredFreightForwarderPlusIcon: Locator;
    private preferredFreightForwarderTextField: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.preferredFreightForwarderPlusIcon = this.page.locator('xpath = //button[@class="btn btn-primary"]');
        this.preferredFreightForwarderTextField = this.page.locator('xpath = //input[@formcontrolname="name"]');
        this.descriptionTextarea = this.page.locator('xpath = //textarea[@formcontrolname="description"]');
        this.remarksTextarea = this.page.locator('xpath = //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggleButton = this.page.locator('xpath = //span[@class="slider round"]');
        this.saveButton = this.page.locator('xpath = //button[.="Save"]');
    }

    async createPreferredFreightForwarder() {
        await this.tablePageUtil.clickAddIcon();
        await this.preferredFreightForwarderTextField.fill(this.secondaryMasterFakerUtils.generateName('Preferred Freight Forwarder'));
        await this.descriptionTextarea.fill(this.secondaryMasterFakerUtils.generateDescription());
        await this.remarksTextarea.fill(this.secondaryMasterFakerUtils.generateRemarks());
        await this.secondaryMasterFakerUtils.generateActiveStatus();
        await this.saveButton.click();
    }
}   