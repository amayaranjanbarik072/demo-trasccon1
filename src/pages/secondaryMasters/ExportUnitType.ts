import BasePage from "../../base/BasePage";
import { Page, Locator } from "@playwright/test";

export default class ExportUnitType extends BasePage {
    private exportUnitTypePlusIcon: Locator;
    private exportUnitTypeNameTextField: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.exportUnitTypePlusIcon = this.page.locator('xpath = //button[@class="btn btn-primary"]');
        this.exportUnitTypeNameTextField = this.page.locator('xpath = //input[@formcontrolname="name"]');
        this.descriptionTextarea = this.page.locator('xpath = //textarea[@formcontrolname="description"]');
        this.remarksTextarea = this.page.locator('xpath = //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggleButton = this.page.locator('xpath = //span[@class="slider round"]');
        this.saveButton = this.page.locator('xpath = //button[.="Save"]');
    }

    async createExportUnitType() {
        await this.tablePageUtil.clickAddIcon();
        await this.exportUnitTypeNameTextField.fill(this.secondaryMasterFakerUtils.generateName('Export Unit Type'));
        await this.descriptionTextarea.fill(this.secondaryMasterFakerUtils.generateDescription());
        await this.remarksTextarea.fill(this.secondaryMasterFakerUtils.generateRemarks());
        await this.secondaryMasterFakerUtils.generateActiveStatus();
        await this.saveButton.click();
    }
}