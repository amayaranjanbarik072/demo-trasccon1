import BasePage from "../../base/BasePage";
import { Page, Locator, expect } from "@playwright/test";

export default class IssuingStock extends BasePage {
    private issuingStockPlusIcon: Locator;
    private issuingStockTextfield: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;


    constructor(page: Page) {
        super(page);
        this.issuingStockPlusIcon = page.locator('xpath = //button[@class="btn btn-primary"]');
        this.issuingStockTextfield = page.locator('xpath = //input[@formcontrolname="name"]');
        this.descriptionTextarea = page.locator('xpath = //textarea[@formcontrolname="description"]');
        this.remarksTextarea = page.locator('xpath = //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggleButton = page.locator('xpath = //span[@class="slider round"]');
        this.saveButton = page.locator('xpath = //button[.="Save"]');
    }
    async createIssuingStock() {
        await this.tablePageUtil.clickAddIcon();
        await this.issuingStockTextfield.fill(this.secondaryMasterFakerUtils.generateName('Issuing Stock'));
        await this.descriptionTextarea.fill(this.secondaryMasterFakerUtils.generateDescription());
        await this.remarksTextarea.fill(this.secondaryMasterFakerUtils.generateRemarks());
        await this.secondaryMasterFakerUtils.generateActiveStatus();
        await this.saveButton.click();
    }
}