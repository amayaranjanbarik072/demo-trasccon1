import BasePage from "../../base/BasePage";
import { Page, Locator } from "@playwright/test";

export class PackingInstructions extends BasePage {
    private packingInstructionsNameTextField: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.packingInstructionsNameTextField = page.locator('xpath= //input[@formcontrolname="name"]');
        this.descriptionTextarea = page.locator('xpath= //textarea[@formcontrolname="description"]');
        this.remarksTextarea = page.locator('xpath= //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggleButton = page.locator('xpath= //span[@class="slider round"]');
        this.saveButton = page.locator('xpath= (//button[normalize-space(.="Save")])[2]');
    }

    async createPackingInstructions() {
        await this.tablePageUtil.clickAddIcon();
        await this.packingInstructionsNameTextField.fill(this.secondaryMasterFakerUtils.generateName('Packing Instructions'));
        await this.descriptionTextarea.fill(this.secondaryMasterFakerUtils.generateDescription());
        await this.remarksTextarea.fill(this.secondaryMasterFakerUtils.generateRemarks());
        await this.secondaryMasterFakerUtils.generateActiveStatus();
        await this.saveButton.click();
    }
}
