import BasePage from "../../base/BasePage";
import { expect, Locator, Page } from "@playwright/test";

export class Commodity extends BasePage {
    private commodityPlusIcon: Locator;
    private commodityNameTextField: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;


    constructor(page: Page) {
        super(page);
        this.commodityPlusIcon = page.locator('xpath = //button[@class="btn btn-primary"]');
        this.commodityNameTextField = page.locator('xpath = //input[@formcontrolname="name"]');
        this.descriptionTextarea = page.locator('xpath = //textarea[@formcontrolname="description"]');
        this.remarksTextarea = page.locator('xpath = //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggleButton = page.locator('xpath = //span[@class="slider round"]');
        this.saveButton = page.locator('xpath = //button[.="Save"]');
    }

    async createCommodity() {
        await this.tablePageUtil.clickAddIcon();
        await this.commodityNameTextField.fill(this.secondaryMasterFakerUtils.generateName('Commodity'));
        await this.descriptionTextarea.fill(this.secondaryMasterFakerUtils.generateDescription());
        await this.remarksTextarea.fill(this.secondaryMasterFakerUtils.generateRemarks());
        await this.secondaryMasterFakerUtils.generateActiveStatus();
        await this.saveButton.click();
    }

}
