import { Page, Locator, expect } from "@playwright/test";
import BasePage from "../../base/BasePage";
import bomData = require('../../testData/CapturedBOMResults.json');
import { DateUtil } from "../../utils/DateUtil";
import { ToggleUtil } from "../../utils/ToggleUtil";


export class ItemPriceList extends BasePage {
    private priceListNameDropdown: Locator;
    private itemNUmberDescriptionField: Locator;
    private quantityField: Locator;
    private uomReadonlyField: Locator;
    private uocDropdown: Locator;
    private leastCostField: Locator;
    private markupField: Locator;
    private leastCostPlus: Locator;
    private leastCostMinus: Locator;
    private isDiscountApplicableToggle: Locator;
    private discountPlusField: Locator;
    private discountMinusField: Locator;
    private validThroughDatePicker: Locator;
    private activeStatusToggle: Locator;


    constructor(page: Page) {
        super(page);
        this.page = page;
        // this.priceListNameDropdown = page.locator('xpath= //label[normalize-space(text())="Price List Name"]/..//ng-select[@formcontrolname="name"]');
        this.priceListNameDropdown = page.locator('xpath= //label[normalize-space(text())="Price List Name"]/..//ng-select');
        this.itemNUmberDescriptionField = page.locator('//label[normalize-space(text())="Item Number-description"]/..//input');
        this.quantityField = page.locator('//label[normalize-space(text())="Quantity"]/..//input');
        this.uomReadonlyField = page.locator('//label[normalize-space(text())="UOM"]/..//input');
        this.uocDropdown = page.locator('//label[normalize-space(text())="UOC"]/..//input');
        this.leastCostField = page.locator('//label[normalize-space(text())="Least Cost"]/..//input');
        this.markupField = page.locator('//label[normalize-space(text())="Markup"]/..//input');
        this.leastCostPlus = page.locator('//label[normalize-space(text())="Least Cost Plus"]/..//input');
        this.leastCostMinus = page.locator('//label[normalize-space(text())="Least Cost Minus"]/..//input');
        this.isDiscountApplicableToggle = page.locator('//label[normalize-space(text())="Is Discount Applicable"]/..//span[@class="slider round"]');
        this.discountPlusField = page.locator('//label[normalize-space(text())="Discount Plus"]/..//input');
        this.discountMinusField = page.locator('//label[normalize-space(text())="Discount Minus"]/..//input');
        this.validThroughDatePicker = page.locator('//label[normalize-space(text())="Valid Through"]/..//input');
        this.activeStatusToggle = page.locator('//label[normalize-space(text())="Active Status"]/..//span[@class="slider round"]');
    }


    async createItemPriceList(data: any) {
        //await this.priceListNameDropdown.click();
        await this.selectFirstOption(this.priceListNameDropdown, this.ngOptions)
        const capturedPriceListName = await this.priceListNameDropdown.innerText();
        const capturedUom = await this.uomReadonlyField.inputValue();

        await this.itemNUmberDescriptionField.fill(bomData.FG[0].itemNumber);
        const option = this.page.locator('//div[@role="listbox"]//mat-option', { hasText: bomData.FG[0].itemNumber });
        await option.waitFor({ state: 'visible', timeout: 10000 });
        await option.click();
        await this.quantityField.fill('1');
        await this.selectFromDropdown(this.uocDropdown, 'INR');
        await this.leastCostField.fill(data.leastCost);
        await this.markupField.fill(data.markup);
        await this.leastCostPlus.fill(data.leastCostPlus);
        await this.leastCostMinus.fill(data.leastCostMinus);
        await ToggleUtil.set(this.isDiscountApplicableToggle, false, 'Is Discount Applicable');
        await expect(this.discountPlusField).toBeDisabled();
        await expect(this.discountMinusField).toBeDisabled();
        await ToggleUtil.set(this.isDiscountApplicableToggle, true, 'Is Discount Applicable');
        await this.discountPlusField.fill(data.discountPlus);
        await this.discountMinusField.fill(data.discountMinus);
        const date = await DateUtil.getFormattedDate(0);
        await this.validThroughDatePicker.fill(date);
        await ToggleUtil.set(this.activeStatusToggle, false, 'Active Status');
        await ToggleUtil.set(this.activeStatusToggle, true, 'Active Status');
        await this.robustClick(this.globalSaveButton);

        // Return all details as an object
        return {
            priceListName: capturedPriceListName.trim(),
            itemNumber: bomData.FG[0].itemNumber,
            quantity: '1',
            uom: capturedUom,
            leastCost: data.leastCost,
            markup: data.markup,
            leastCostPlus: data.leastCostPlus,
            leastCostMinus: data.leastCostMinus,
            discountPlus: data.discountPlus,
            discountMinus: data.discountMinus,
            validThrough: date
        };
    }

    async verifyTheItemInPriceLIst() {
        await this.selectFirstOption(this.priceListNameDropdown, this.ngOptions);
        await this.verifyRecordPresent(bomData.FG[0].itemNumber);
    }
}