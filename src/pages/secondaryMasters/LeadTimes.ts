import BasePage from "../../base/BasePage";
import { Page, Locator, expect } from "@playwright/test";
import { SecondaryMasterFaker } from "../../utils/SecondaryMasterFakerUtils";

export default class LeadTimes extends BasePage {
    private daysTextField: Locator;
    private weeksTextfield: Locator;
    private descriptionTextfield: Locator;
    private remarksTextfield: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.daysTextField = page.locator('xpath = //input[@formcontrolname="days"]');
        this.weeksTextfield = page.locator('xpath = //input[@formcontrolname="weeks"]');
        this.descriptionTextfield = page.locator('xpath = //textarea[@formcontrolname="description"]');
        this.remarksTextfield = page.locator('xpath = //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggleButton = page.locator('xpath = //span[@class="slider round"]');
        this.saveButton = page.locator('xpath = //button[.="Save"]');
    }
    async createLeadTimes() {
        await this.clickAddIcon();
        await this.daysTextField.fill('1');
        await this.weeksTextfield.fill('1');
        await this.descriptionTextfield.fill(SecondaryMasterFaker.generateDescription());
        await this.remarksTextfield.fill(SecondaryMasterFaker.generateRemarks());
        await SecondaryMasterFaker.generateActiveStatus();
        await this.toastContainer().waitFor({ state: 'hidden', timeout: 5000 });
        await this.saveButton.click();
        await this.verifyToast(['created', 'successfully']);
        await this.page.waitForURL(/table/);
    }
}   