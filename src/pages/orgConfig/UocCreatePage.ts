import BasePage from "../../base/BasePage";
import { expect, Locator, Page } from "@playwright/test";


export class UocCreatePage extends BasePage {

    private uocTypeTextField: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.uocTypeTextField = page.locator('xpath = //input[@formcontrolname="name"]');
        this.descriptionTextarea = page.locator('xpath = //textarea[@formcontrolname="description"]');
        this.remarksTextarea = page.locator('xpath = //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggleButton = page.locator('xpath = //span[@class="slider round"]');
        this.saveButton = page.locator('xpath = //button[@class="btn btn_primary ng-star-inserted"]');
    }

    async createUoc() {
        await this.uocTypeTextField.fill('Test Uoc');
        await this.descriptionTextarea.fill('Test Description');
        await this.remarksTextarea.fill('Test Remarks');
        //await this.activeStatusToggleButton.click();
        await this.page.waitForTimeout(2000);
        // await this.saveButton.click();

    }

}





