import BasePage from "../../base/BasePage";
import { Page, Locator, expect } from "@playwright/test";

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
        await this.tablePageUtil.clickAddIcon();
        await this.daysTextField.fill('1');
        await this.weeksTextfield.fill('1');
        await this.descriptionTextfield.fill(this.secondaryMasterFakerUtils.generateDescription());
        await this.remarksTextfield.fill(this.secondaryMasterFakerUtils.generateRemarks());
        await this.secondaryMasterFakerUtils.generateActiveStatus();
        await this.saveButton.click();
    }
}   