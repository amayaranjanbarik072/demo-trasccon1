import BasePage from "../../base/BasePage";
import { expect, Locator, Page } from "@playwright/test";
import { uocData } from "../../utils/propertiesReader";
import { SecondaryMasterFaker } from "../../utils/SecondaryMasterFakerUtils";
export class Uoc extends BasePage {
    private uocPlusIcon: Locator;
    private uocTypeTextField: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;



    constructor(page: Page) {
        super(page);
        this.uocPlusIcon = page.locator('xpath = //i[@class="mdi mdi-plus-box-outline edit-table-icon"]');
        this.uocTypeTextField = page.locator('xpath = //input[@formcontrolname="name"]');
        this.descriptionTextarea = page.locator('xpath = //textarea[@formcontrolname="description"]');
        this.remarksTextarea = page.locator('xpath = //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggleButton = page.locator('xpath = //span[@class="slider round"]');
        this.saveButton = page.locator('xpath = //button[@class="btn btn_primary ng-star-inserted"]');

    }
    async createUoc() {
        await this.clickAddIcon();
        await this.uocTypeTextField.fill(uocData.name);
        await this.descriptionTextarea.fill(uocData.description);
        await this.remarksTextarea.fill(uocData.remarks);
        await SecondaryMasterFaker.generateActiveStatus();
        await this.toastContainer().waitFor({ state: 'hidden', timeout: 5000 });
        await this.saveButton.click();
        await this.verifyToast('× Created Successfully !!');
    }
    async createRandomUoc() {
        await this.clickAddIcon();
        await this.uocTypeTextField.fill(SecondaryMasterFaker.generateName('Uoc'));
        await this.descriptionTextarea.fill(SecondaryMasterFaker.generateDescription());
        await this.remarksTextarea.fill(SecondaryMasterFaker.generateRemarks());
        await SecondaryMasterFaker.generateActiveStatus();
        await this.toastContainer().waitFor({ state: 'hidden', timeout: 5000 });
        await this.saveButton.click();
        await this.verifyToast(['created', 'successfully']);
        await this.page.waitForURL(/table/);
    }
} 