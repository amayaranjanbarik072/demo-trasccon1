import BasePage from "../../base/BasePage";
import { Page, expect, Locator } from "@playwright/test";

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
        await this.tablePageUtil.clickAddIcon();
        await this.uomNameTextField.fill(this.secondaryMasterFakerUtils.generateName('Uom'));
        await this.descriptionTextarea.fill(this.secondaryMasterFakerUtils.generateDescription());
        await this.remarksTextarea.fill(this.secondaryMasterFakerUtils.generateRemarks());
        await this.secondaryMasterFakerUtils.generateActiveStatus();
        await this.saveButton.click();
    }

    async navigateToUomCreatePage() {
        await this.tablePageUtil.clickAddIcon();
    }
}   