import BasePage from "../../base/BasePage";
import { Page, expect, Locator } from "@playwright/test";
import { procurementData } from "../../utils/propertiesReader";

export class ProcurementType extends BasePage {
    private procurementTypePlusIcon: Locator;
    private procurementTypeNameTextField: Locator;
    private descriptionTextarea: Locator;
    private activeSatusToggleButton: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.procurementTypePlusIcon = page.locator('xpath = //i[@class="mdi mdi-plus-box-outline edit-table-icon"]');
        this.procurementTypeNameTextField = page.locator('xpath= //input[@formcontrolname="name"]');
        this.descriptionTextarea = page.locator('xpath= //textarea[@formcontrolname="description"]');
        this.activeSatusToggleButton = page.locator('xpath= //span[@class="slider round"]');
        this.saveButton = page.locator('xpath= (//button[normalize-space(.="Save")])[2]');
    }

    // Methods To Create Procurement Type
    //========================================
    async createProcurementType() {
        await this.tablePageUtil.clickAddIcon();
        await this.procurementTypeNameTextField.fill(procurementData.name);
        await this.descriptionTextarea.fill(procurementData.description);
        await this.secondaryMasterFakerUtils.generateActiveStatus();
        const toastText = await this.toastUtil.getToastMessage(this.page);
        if (await this.toastUtil.getToastMessage(this.page) === toastText) {
            console.log('Toast Text: ' + toastText);
        } else {
            await this.saveButton.click();
        }
    }

    async navigateToProcurementTypeCreatePage() {
        await this.tablePageUtil.clickAddIcon();
    }
}