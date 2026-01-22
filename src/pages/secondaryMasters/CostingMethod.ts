import BasePage from "../../base/BasePage";
import { Locator, Page, expect } from "@playwright/test";

export class CostingMethod extends BasePage {
    private costingMethodPlusIcon: Locator;
    private costingMethodNameTextField: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.costingMethodPlusIcon = page.locator('xpath = //button[@class="btn btn-primary"]');
        this.costingMethodNameTextField = page.locator('xpath = //input[@formcontrolname="name"]');
        this.descriptionTextarea = page.locator('xpath = //textarea[@formcontrolname="description"]');
        this.remarksTextarea = page.locator('xpath = //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggleButton = page.locator('xpath = //span[@class="slider round"]');
        this.saveButton = page.locator('xpath = //button[.="Save"]');
    }

    async createCostingMethod() {
        await this.tablePageUtil.clickAddIcon();
        await this.costingMethodNameTextField.fill(this.secondaryMasterFakerUtils.generateName('Costing Method'));
        await this.descriptionTextarea.fill(this.secondaryMasterFakerUtils.generateDescription());
        await this.remarksTextarea.fill(this.secondaryMasterFakerUtils.generateRemarks());
        await this.secondaryMasterFakerUtils.generateActiveStatus();
        await this.saveButton.click();
    }
}
