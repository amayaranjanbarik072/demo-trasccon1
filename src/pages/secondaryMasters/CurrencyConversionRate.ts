import BasePage from "../../base/BasePage";
import { Page, Locator, expect } from "@playwright/test";
import { uocData } from "../../utils/propertiesReader";



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
        await this.tablePageUtil.clickAddIcon();
        await this.uocDropdown.click();

        // Type from properties/config
        await this.page.keyboard.type(uocData.name, { delay: 50 });

        // Wait for filter to apply
        await this.page.waitForTimeout(300);

        // Select first matched result
        await this.page.keyboard.press('Enter');
        const toastText = await this.toastUtil.getToastMessage(this.page);

        if (await this.toastUtil.getToastMessage(this.page) === toastText) {
            console.log('Toast Text: ' + toastText);
        } else {
            await this.conversionRateTextfield.fill('1');
            const date = await this.dateUtil.setDateByFormControl(this.page, 'date', new Date(2026, 1, 7));
            console.log('Date: ' + date);
            // await this.dateTextfield.fill(date);
            await this.secondaryMasterFakerUtils.generateActiveStatus();
            await this.saveButton.click();
        }
    }
}