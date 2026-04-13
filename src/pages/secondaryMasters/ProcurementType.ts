import BasePage from "../../base/BasePage";
import { Page, expect, Locator } from "@playwright/test";
import { procurementData } from "../../utils/propertiesReader";
import { SecondaryMasterFaker } from "../../utils/SecondaryMasterFakerUtils";

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
        await this.clickAddIcon();
        await this.procurementTypeNameTextField.fill(procurementData.name);
        await this.descriptionTextarea.fill(procurementData.description);
        await SecondaryMasterFaker.generateActiveStatus();
        await this.toastContainer().waitFor({ state: 'hidden', timeout: 5000 });
        await this.saveButton.click();
        await this.verifyToast('× Created Successfully !!');
    }

    async createRandomProcurementType() {
        await this.clickAddIcon();
        await this.procurementTypeNameTextField.fill(SecondaryMasterFaker.generateName('Procurement Type'));
        await this.descriptionTextarea.fill(SecondaryMasterFaker.generateDescription());
        await SecondaryMasterFaker.generateActiveStatus();
        await this.toastContainer().waitFor({ state: 'hidden', timeout: 5000 });
        await this.saveButton.click();
        await this.verifyToast(['created', 'successfully']);
        await this.page.waitForURL(/table/);
    }
}