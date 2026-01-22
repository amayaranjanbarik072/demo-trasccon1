import BasePage from "../../base/BasePage";
import { expect, Locator, Page } from "@playwright/test";
import { uocData } from "../../utils/propertiesReader";
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
        await this.page.waitForTimeout(2000);
        await this.tablePageUtil.clickAddIcon();
        await this.uocTypeTextField.fill(uocData.name);
        await this.descriptionTextarea.fill(uocData.description);
        await this.remarksTextarea.fill(uocData.remarks);
        await this.secondaryMasterFakerUtils.generateActiveStatus();
        const toastText = await this.toastUtil.getToastMessage(this.page);
        if (await this.toastUtil.getToastMessage(this.page) === toastText) {
            console.log('🔔 Toast Message: ', toastText);
        } else {
            await this.saveButton.click();
        }

    }
    async navigateToUocCreatePage() {
        await this.tablePageUtil.clickAddIcon();
    }
}   