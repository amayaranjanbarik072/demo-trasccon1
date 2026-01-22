import BasePage from "../../base/BasePage";
import { Page, expect, Locator } from "@playwright/test";

export class Process extends BasePage {
    private processPlusIcon: Locator;
    private processNameTextField: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.processPlusIcon = this.page.locator('xpath= //i[@class="mdi mdi-plus-box-outline edit-icon"]');
        this.processNameTextField = this.page.locator('xpath= //input[@formcontrolname="name"]');
        this.descriptionTextarea = this.page.locator('xpath= //textarea[@formcontrolname="description"]');
        this.remarksTextarea = this.page.locator('xpath= //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggleButton = this.page.locator('xpath= //span[@class="slider round"]');
        this.saveButton = this.page.locator('xpath= //button[@class="btn btn_primary ng-star-inserted"]');
    }

    async createProcess() {
        await this.tablePageUtil.clickAddIcon();
        await this.processNameTextField.fill(this.secondaryMasterFakerUtils.generateName('Process'));
        await this.descriptionTextarea.fill(this.secondaryMasterFakerUtils.generateDescription());
        await this.remarksTextarea.fill(this.secondaryMasterFakerUtils.generateRemarks());
        await this.secondaryMasterFakerUtils.generateActiveStatus();
        await this.saveButton.click();
    }

    async navigateToProcessCreatePage() {
        await this.tablePageUtil.clickAddIcon();
    }
}