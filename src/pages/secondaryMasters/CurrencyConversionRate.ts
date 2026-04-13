import BasePage from "../../base/BasePage";
import { Page, Locator, expect } from "@playwright/test";
import { uocData } from "../../utils/propertiesReader";
import { SecondaryMasterFaker } from "../../utils/SecondaryMasterFakerUtils";
import { DateUtil } from "../../utils/DateUtil";



export default class CurrencyConversionRate extends BasePage {
    private uocDropdown: Locator;
    private conversionRateTextfield: Locator;
    private dateTextfield: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.uocDropdown = this.page.locator('xpath= //input[@aria-autocomplete="list"]');
        this.conversionRateTextfield = this.page.locator('xpath= //textarea[@formcontrolname="conversionRate"]');
        this.dateTextfield = this.page.locator('xpath= //input[@formcontrolname="date"]');
        this.activeStatusToggleButton = this.page.locator('xpath= //button[@formcontrolname="activeStatus"]');
        this.saveButton = this.page.locator('xpath = //button[.="Save"]');
    }

    async createCurrencyConversionRate() {
        await this.clickAddIcon();
        await this.uocDropdown.click();

        // Type from properties/config
        //await this.page.keyboard.type(uocData.name, { delay: 50 });
        await this.page.keyboard.type('uoc', { delay: 50 });

        // Wait for filter to apply
        await this.page.waitForTimeout(300);

        // Select first matched result 
        await this.page.keyboard.press('Enter');
        await this.conversionRateTextfield.fill('1');
        const date = await DateUtil.getFormattedDate(0);
        await DateUtil.selectDate(this.dateTextfield, date);
        await SecondaryMasterFaker.generateActiveStatus();
        await this.toastContainer().waitFor({ state: 'hidden', timeout: 5000 });
        await this.saveButton.click();
        await this.verifyToast(['created', 'successfully']);
        await this.page.waitForURL(/table/);
    }

}