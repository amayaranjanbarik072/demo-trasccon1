import BasePage from "../../base/BasePage";
import { expect, Locator, Page } from "@playwright/test";

export class ApprovalRangeCreatePage extends BasePage {
    private procurementType: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;

    //Approve Range section
    private rangeFromTextfield: Locator;
    private rangeToTextfield: Locator;
    private secondRangeToTextfield: Locator;
    private approval1Checkbox: Locator;
    private approval2Checkbox: Locator;
    private approval3Checkbox: Locator;
    private approval4Checkbox: Locator;
    private doYouWantApproval3And4TogetherCheckbox: Locator;
    private doYouWantApproval3Checkbox: Locator;
    private doYouWantApproval4Checkbox: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.procurementType = page.locator('xpath = //div[@class="ng-input"]');
        this.descriptionTextarea = page.locator('xpath = //textarea[@formcontrolname="description"]');
        this.remarksTextarea = page.locator('xpath = //textarea[@formcontrolname="remarks"]');
        this.rangeFromTextfield = page.locator('xpath = //input[@formcontrolname="rangeFrom"]');
        this.rangeToTextfield = page.locator('xpath = //input[@formcontrolname="rangeTo"]');
        this.secondRangeToTextfield = page.locator('xpath = //input[@formcontrolname="rangeTo3"]');
        this.approval1Checkbox = page.locator('xpath = //input[@formcontrolname="approval1"]');
        this.approval2Checkbox = page.locator('xpath = //input[@formcontrolname="approval2"]');
        this.approval3Checkbox = page.locator('xpath = //input[@formcontrolname="approval3"]');
        this.approval4Checkbox = page.locator('xpath = //input[@formcontrolname="approval4"]');
        this.doYouWantApproval3And4TogetherCheckbox = page.locator('#enableApproval34');
        this.doYouWantApproval3Checkbox = page.locator('#enableApproval3');
        this.doYouWantApproval4Checkbox = page.locator('#enableApproval4');
        this.saveButton = page.locator('xpath = //button[normalize-space(.)="Save"]');
    }

    async createApprovalRangeForThreeAndFourTogether() {
        //Open the dropdown capture the options and count them
        await this.procurementType.click();
        const options = this.page.getByRole('option');
        const count = await options.count();
        console.log(`Total options found: ${count}`);

        //print all the options
        for (let i = 0; i < await options.count(); i++) {
            const text = await options.nth(i).innerText();
            console.log(`Option ${i + 1}: ${text}`);
        }
        //Select Option
        //const valueToSelect = ' Service';
        //await this.procurementType.getByRole('option', { name: 'Service' }).click();

        //Select option by index
        await options.nth(10).click();

        //Select first option
        // await options.first().click();

        //Select last option
        // await options.last().click();

        await this.descriptionTextarea.fill('Approval Description');
        await this.remarksTextarea.fill('Approval Remarks');
        //Check Approval 3 and 4 together
        await this.doYouWantApproval3And4TogetherCheckbox.click();
        await this.rangeToTextfield.fill('100');
        //await this.saveButton.click();
    }
    async createApprovalRangeforThree() {
        await this.procurementType.click();
        const options = this.page.getByRole('option');
        await options.nth(10).click();
        await this.descriptionTextarea.fill('Approval Description');
        await this.remarksTextarea.fill('Approval Remarks');
        //Check Approval 3
        await this.doYouWantApproval3Checkbox.click();
        await this.rangeToTextfield.fill('100');
        //await this.saveButton.click();    
    }
    async createApprovalRangeForFour() {
        await this.procurementType.click();
        const options = this.page.getByRole('option');
        await options.nth(10).click();
        await this.descriptionTextarea.fill('Approval Description');
        await this.remarksTextarea.fill('Approval Remarks');
        await this.doYouWantApproval3Checkbox.click();
        await this.doYouWantApproval4Checkbox.click();
        await this.rangeToTextfield.fill('100');
        await this.secondRangeToTextfield.fill('150');
        //await this.saveButton.click();


    }
}