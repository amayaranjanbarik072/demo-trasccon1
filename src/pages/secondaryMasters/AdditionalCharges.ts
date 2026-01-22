import { faker } from '@faker-js/faker';
import BasePage from '../../base/BasePage';
import { Page, Locator } from 'playwright';

export default class AdditionalCharges extends BasePage {

    private additionalChargesPlusIcon: Locator;
    private additionalChargesNameTextField: Locator;
    private additionalChargesValueTypePercentageRadioButton: Locator;
    private additionalChargesValueTypeRupeesRadioButton: Locator;
    private additionalChargesAmountTextField: Locator;
    private igstTextField: Locator;
    private cgstTextField: Locator;
    private sgstTextField: Locator;
    private utgstTextField: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggle: Locator;
    private saveButton: Locator;


    constructor(page: Page) {
        super(page);
        this.additionalChargesPlusIcon = this.page.locator('xpath = //button[@class="btn btn-primary"]');
        this.additionalChargesNameTextField = this.page.locator('xpath = //input[@formcontrolname="name"]');
        this.additionalChargesValueTypePercentageRadioButton = this.page.locator('xpath = //input[@id="addtionalPer"]');
        this.additionalChargesValueTypeRupeesRadioButton = this.page.locator('xpath = //input[@id="addtionalAmt"]');
        this.additionalChargesAmountTextField = this.page.locator('xpath = //input[@placeholder="Addtional Charges Amount"]');
        this.igstTextField = this.page.locator('xpath = //input[@formcontrolname="igst"]');
        this.cgstTextField = this.page.locator('xpath = //input[@formcontrolname="cgst"]');
        this.sgstTextField = this.page.locator('xpath = //input[@formcontrolname="sgst"]');
        this.utgstTextField = this.page.locator('xpath = //input[@formcontrolname="utgst"]');
        this.descriptionTextarea = this.page.locator('xpath = //textarea[@formcontrolname="description"]');
        this.remarksTextarea = this.page.locator('xpath = //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggle = this.page.locator('xpath = //span[@class="slider round"]');
        this.saveButton = this.page.locator('xpath = //button[.="Save"]');


    }
    //Adding Fakers
    static generateValueType(): 'PERCENTAGE' | 'ABS' {
        // You can control this if needed
        return faker.helpers.arrayElement(['PERCENTAGE', 'ABS']);
    }
    static generateAdditionalChargesAmount(): string {
        // Amount field (supports decimals)
        return faker.number.float({
            min: 1,
            max: 1000,
            fractionDigits: 2
        }).toString();
    }
    static generateIGST(): string {
        return faker.number.int({ min: 0, max: 28 }).toString();
    }

    static generateCGST(): string {
        return faker.number.int({ min: 0, max: 14 }).toString();
    }

    static generateSGST(): string {
        return faker.number.int({ min: 0, max: 14 }).toString();
    }

    static generateUTGST(): string {
        return faker.number.int({ min: 0, max: 14 }).toString();
    }


    async createAdditionalCharges() {
        // await this.additionalChargesPlusIcon.click();
        await this.tablePageUtil.clickAddIcon();
        await this.additionalChargesNameTextField.fill(this.secondaryMasterFakerUtils.generateName('Additional Charges'));
        await this.additionalChargesValueTypePercentageRadioButton.click();
        await this.additionalChargesAmountTextField.fill(AdditionalCharges.generateAdditionalChargesAmount());
        await this.igstTextField.fill(AdditionalCharges.generateIGST());
        await this.cgstTextField.fill(AdditionalCharges.generateCGST());
        await this.sgstTextField.fill(AdditionalCharges.generateSGST());
        await this.utgstTextField.fill(AdditionalCharges.generateUTGST());
        await this.descriptionTextarea.fill(this.secondaryMasterFakerUtils.generateDescription());
        await this.remarksTextarea.fill(this.secondaryMasterFakerUtils.generateRemarks());
        await this.activeStatusToggle.click();
        await this.saveButton.click();
        console.log(await this.page.url());
        await this.page.waitForTimeout(2000);
    }
}