import { Page, Locator, expect } from "@playwright/test";
import BasePage from "../../base/BasePage";
import customerData = require('../../testData/CustomerMasterDetails.json');
import rfqData = require('../../testData/RFQDetails.json');
import bomData = require('../../testData/CapturedBOMResults.json');
import itemPriceListData = require('../../testData/ItemPriceListDetails.json');
import { time } from "console";
import { RadioUtil } from "../../utils/RadioUtil";
import { JsonUtil } from "../../utils/JsonUtil";

export class Quote extends BasePage {

    private customerNamedropdown: Locator;
    private customerAliasNameDropdown: Locator;
    private rfqNumberDropdown: Locator;
    private quoteRefField: Locator;
    private quoteTypeDropdown: Locator;
    private leadTimefield: Locator;
    private generalTab: Locator;
    private totalCalculationTab: Locator;
    private rfqNotesTab: Locator;
    private otherTemsTab: Locator;
    private specialTemsTab: Locator;

    //General Tab
    private generalDiscountPercentageRadioButton: Locator;
    private generalDiscountRsRadioButton: Locator;
    private generalDiscountField: Locator;
    private totalAmountReadonlyfield: Locator;
    private generalAddButton: Locator;
    //Item Details Row
    private itemRow: Locator;
    private rowCustomerItemNumber: Locator;
    private rowItemNumber: Locator;
    private rowDescription: Locator;
    private rowQuantity: Locator;
    private rowUnitPrice: Locator;
    private rowTotalPrice: Locator;

    private priceListField: Locator;
    private quantityField: Locator;
    private unitPriceField: Locator;
    private discoutPercentageRadioButton: Locator;
    private discountRsRadioButton: Locator;
    private discountField: Locator;
    private discountedUnitPriceField: Locator;
    private specialDiscountPercentageRadioButton: Locator;
    private specialDiscountRsRadioButton: Locator;
    private itemSpeciaDiscountfield: Locator;
    private totalDiscountedUnitPriceField: Locator;
    private basicAmountField: Locator;
    private hsnNoField: Locator;
    private itemIgstField: Locator;
    private itemCgstField: Locator;
    private itemSgstField: Locator;
    private itemUtgstField: Locator;
    private itemTotalField: Locator;
    private itemAddButton: Locator;







    //Total Calculation
    private printedInQuoteToggle: Locator;
    private additionalChargesLabelNameField: Locator;
    private additionalChargesValueField: Locator;
    private additionalChargesValuePercentageRadioButton: Locator;
    private additionalChargesValueAbsRadioButton: Locator;
    private igstField: Locator;
    private cgstField: Locator;
    private sgstField: Locator;
    private utgstField: Locator;
    private additionalChargesAddButton: Locator;
    private totalAdditionalChargesReadonlyField: Locator;
    private specialDiscoutPercentageRadioButton: Locator;
    private specialDiscountAbsRadioButton: Locator;
    private specialDiscountField: Locator;
    private totalFinalAmountReadonlyField: Locator;
    private paymentTermDropdown: Locator;

    //RFQ Notes
    private selectRfqNotesDropdown: Locator;
    private selectOtherTemsDropdown: Locator;
    private specialTemsField: Locator;
    private specialTemsAddButton: Locator;

    private quoteTableRows: Locator;
    private firstRowQuoteNumber: Locator;
    private firstRowRfqNumber: Locator;
    private firstRowQuoteTotalAmount: Locator;

    //Quote Release
    private releaseIcon: Locator;
    private releaseQuotePpUp: Locator;
    private retailShopOrderButton: Locator;
    private buildToPrintButton: Locator;
    private lossButton: Locator;
    private closeButton: Locator;


    constructor(page: Page) {
        super(page);
        this.releaseIcon = page.locator('//i[@class="mdi mdi-arrow-top-right-bold-outline edit-table-icon"]');
        this.releaseQuotePpUp = page.locator('div.modal-content');
        this.retailShopOrderButton = page.locator('//button[normalize-space()="Retail Shop Order"]');
        this.buildToPrintButton = page.locator('//button[normalize-space()="Build To Print"]');
        this.lossButton = page.locator('//button[normalize-space()="Loss"]');
        this.closeButton = page.locator('//button[normalize-space()="Close"]');

        // Table Locators for after creation (image_a9eb10.png)
        this.quoteTableRows = page.locator('table tbody tr');
        const firstRow = this.quoteTableRows.first();
        this.firstRowQuoteNumber = firstRow.locator('td').nth(1);
        this.firstRowRfqNumber = firstRow.locator('td').nth(2);
        this.firstRowQuoteTotalAmount = firstRow.locator('td').nth(5);

        this.customerNamedropdown = page.locator('//ng-select[@formcontrolname="customerIdName"]//div[@class="ng-select-container ng-has-value"]');
        this.customerAliasNameDropdown = page.locator("//div[@aria-expanded='true']//input[@type='text']");
        this.rfqNumberDropdown = page.locator("//ng-select[@placeholder='Select RFQ Number']//input[@type='text']");
        this.quoteRefField = page.locator("//input[@placeholder='Enter Quote Ref.']");
        this.quoteTypeDropdown = page.locator('//label[normalize-space()="Quote Type"]/..//input');
        this.leadTimefield = page.locator("//input[@placeholder='Enter Lead Time']");

        //General Tab
        this.generalTab = page.locator("//a[normalize-space()='General']");
        this.generalDiscountPercentageRadioButton = page.locator("//input[@value='Percentage']");
        this.generalDiscountRsRadioButton = page.locator("//input[@value='Rupees']");
        this.generalDiscountField = page.locator("//input[@placeholder='Enter General Discount']");
        this.totalAmountReadonlyfield = page.locator("//input[@placeholder='Enter Total Amount']");
        this.generalAddButton = page.locator("//button[normalize-space()='Add']");

        this.rowCustomerItemNumber = page.locator("(//label[normalize-space()='Customer Item No']/..//label)[2]");
        this.rowItemNumber = page.locator("(//label[normalize-space()='Item Number']/..//label)[2]");
        this.rowDescription = page.locator("(//label[normalize-space()='Description']/..//label)[2]");
        this.rowQuantity = page.locator("(//label[normalize-space()='Qty']/..//label)[2]");
        this.rowUnitPrice = page.locator("(//label[normalize-space()='Unit Price']/..//label)[2]");
        this.rowTotalPrice = page.locator("(//label[normalize-space()='Total']/..//label)[2]");
        this.itemRow = page.locator('//mat-expansion-panel-header[@role="button"]');

        //Item Details 
        this.priceListField = page.locator('//label[normalize-space()="Price List"]/..//input');
        this.quantityField = page.locator('//label[normalize-space()="Quantity"]/..//input');
        this.unitPriceField = page.locator('//label[normalize-space()="Unit Price"]/..//input');
        this.discoutPercentageRadioButton = page.locator('//label[normalize-space()="Discount"]/..//input[@value="Percentage"]');
        this.discountRsRadioButton = page.locator('//label[normalize-space()="Discount"]/..//input[@value="Rupees"]');
        this.discountField = page.locator('//label[normalize-space()="Discount"]/..//input[@placeholder="Enter Discount"]');
        this.discountedUnitPriceField = page.locator('//label[normalize-space()="Discounted Unit Price"]/..//input');
        this.specialDiscountPercentageRadioButton = page.locator('//label[normalize-space()="Special Discount"]/..//input[@value="Percentage"]');
        this.specialDiscountRsRadioButton = page.locator('//label[normalize-space()="Special Discount"]/..//input[@value="Rupees"]');
        this.itemSpeciaDiscountfield = page.locator('//label[normalize-space()="Special Discount"]/..//input[@placeholder="Enter Special Discount"]');
        this.totalDiscountedUnitPriceField = page.locator('//label[normalize-space()="Total Discounted Unit Price"]/..//input');
        this.basicAmountField = page.locator('//label[normalize-space()="Basic Amount"]/..//input');
        this.hsnNoField = page.locator('//label[normalize-space()="HSN No"]/..//input');
        this.itemIgstField = page.locator('//label[normalize-space()="IGST(%)"]/..//input');
        this.itemCgstField = page.locator('//label[normalize-space()="CGST(%)"]/..//input');
        this.itemSgstField = page.locator('//label[normalize-space()="SGST(%)"]/..//input');
        this.itemUtgstField = page.locator('//label[normalize-space()="UTGST(%)"]/..//input');
        this.itemTotalField = page.locator('//label[normalize-space()="Total"]/..//input');
        this.itemAddButton = page.locator('//button[.="Add"]');




        //Total Calculation
        this.totalCalculationTab = page.locator("//a[normalize-space()='Total Calculation']");
        this.printedInQuoteToggle = page.locator("//span[@class='slider round']");
        this.additionalChargesLabelNameField = page.locator("//input[@placeholder='Enter Additinal charges']");
        this.additionalChargesValuePercentageRadioButton = page.locator("//input[@id='addtionalPer']");
        this.additionalChargesValueAbsRadioButton = page.locator("//input[@id='specialDiscTotAmt']");
        this.additionalChargesValueField = page.locator("//input[@placeholder='Enter Additional Charges']");
        this.igstField = page.locator("//input[@placeholder='Enter IGST']");
        this.cgstField = page.locator("//input[@placeholder='Enter CGST']");
        this.sgstField = page.locator("//input[@placeholder='Enter SGST']");
        this.utgstField = page.locator("//input[@placeholder='Enter UTGST']");
        this.additionalChargesAddButton = page.locator("//button[normalize-space()='Add']");
        this.totalAdditionalChargesReadonlyField = page.locator('//label[normalize-space()="Total Additional Charges"]/../div//input');
        this.specialDiscoutPercentageRadioButton = page.locator("//input[@id='specialDiscTotPer']");
        this.specialDiscountAbsRadioButton = page.locator("//input[@id='specialDiscTotAmt']");
        this.specialDiscountField = page.locator("//input[@placeholder='Enter Special Discount']");
        this.totalFinalAmountReadonlyField = page.locator("//input[@placeholder='Enter Total Final Amount']");
        this.paymentTermDropdown = page.locator("//ng-select[@placeholder='Select Payment Terms']//input[@type='text']");

        //other
        this.rfqNotesTab = page.locator("//a[normalize-space()='RFQ Notes']");
        this.selectRfqNotesDropdown = page.locator("//ng-select[@placeholder='Select RFQ Notes']//input[@type='text']");
        this.otherTemsTab = page.locator("//a[normalize-space()='Other Terms']");
        this.selectOtherTemsDropdown = page.locator("//ng-select[@placeholder='Select Other Terms']//input[@type='text']");
        this.specialTemsTab = page.locator("//a[normalize-space()='Special Terms']");
        this.specialTemsField = page.locator("//textarea[@placeholder='Enter Special Terms']");
        this.specialTemsAddButton = page.locator("//button[normalize-space()='Add']");
    }

    async fillQuoteHeaders() {
        await this.clickAddIcon();
        await this.customerNamedropdown.click();
        await this.page.keyboard.type(customerData.customerName);
        await this.ngOptions.waitFor({ state: 'visible', timeout: 5000 });
        await this.ngOptions.click();
        await this.rfqNumberDropdown.click();
        await this.page.keyboard.type(rfqData.rfqNumber);
        // await this.page.waitForTimeout(2000);
        await this.ngOptions.waitFor({ state: 'visible', timeout: 5000 });
        await this.ngOptions.click();
        await this.quoteRefField.fill('Automated Quote');
        await this.selectFirstOption(this.quoteTypeDropdown, this.ngOptions);
        await this.leadTimefield.fill('Automated Lead Time');
    }
    async fillGeneralTab() {
        const value = [
            this.rowCustomerItemNumber,
            this.rowDescription,
            this.rowItemNumber,
            this.rowQuantity,
            this.rowUnitPrice,
            this.rowTotalPrice
        ]
        for (const val of value) {
            console.log(await val.innerText());
        }
        await expect(this.rowItemNumber).toHaveText(bomData.FG[0].itemNumber);
        await expect(this.rowDescription).toHaveText(bomData.FG[0].description);
        await this.itemRow.click();
    }

    async validatePricingLifecycle(appliedGeneralDiscount: number, maxAllowedDiscount: number, specialDiscount: number = 0) {
        // 1. Trigger Calculation via General Discount
        await this.itemRow.click();
        await this.generalDiscountField.click();
        await this.page.keyboard.press('Backspace');
        await this.page.keyboard.type(appliedGeneralDiscount.toString());
        await this.page.keyboard.press('Tab');

        // 2. Capture Baseline Data (Clean strings to numbers)
        const qty = parseFloat(await this.quantityField.inputValue());
        const unitPrice = parseFloat(await this.unitPriceField.inputValue());
        console.log('Quantity ' + qty);
        console.log('Unit Price ' + unitPrice);

        // 3. Validate Capped Discount Logic (Scenario 3 check)
        const expectedDiscount = Math.min(appliedGeneralDiscount, maxAllowedDiscount);
        await expect(this.discountField).toHaveValue(expectedDiscount.toString(), { timeout: 5000 });
        console.log('Expected Discount ' + expectedDiscount);


        // 4. Validate Discounted Unit Price Calculation
        const expectedDiscountedPrice = unitPrice - (unitPrice * expectedDiscount / 100);
        const actualDiscountedPrice = parseFloat(await this.discountedUnitPriceField.inputValue());
        expect(actualDiscountedPrice).toBeCloseTo(expectedDiscountedPrice, 1);
        console.log('Actual Discounted Price ' + actualDiscountedPrice);

        // 5. Apply and Validate Special Discount (image_82631f.png)
        await this.specialDiscountField.click();
        await this.page.keyboard.type(specialDiscount.toString());
        await this.page.keyboard.press('Tab');

        const expectedTotalDiscUnitPrice = actualDiscountedPrice - (actualDiscountedPrice * specialDiscount / 100);
        await expect(this.totalDiscountedUnitPriceField).not.toHaveValue(actualDiscountedPrice.toString());
        const actualTotalDiscUnitPrice = parseFloat(await this.totalDiscountedUnitPriceField.inputValue());
        expect(actualTotalDiscUnitPrice).toBeCloseTo(expectedTotalDiscUnitPrice, 1);
        console.log('Expected Total Discount Price ' + expectedTotalDiscUnitPrice);

        // 6. Validate Basic Amount (Total Disc Unit Price * Quantity)
        const expectedBasicAmount = actualTotalDiscUnitPrice * qty;
        const actualBasicAmount = parseFloat((await this.basicAmountField.inputValue()).replace(/,/g, ''));
        expect(actualBasicAmount).toBeCloseTo(expectedBasicAmount, 0);
        console.log('Expected basic amount ' + expectedBasicAmount);


        // 7. Validate Taxes and Final Total (image_321726.png shows 9% CGST/SGST)
        const cgstPercent = parseFloat(await this.cgstField.inputValue()) || 0;
        const sgstPercent = parseFloat(await this.sgstField.inputValue()) || 0;

        const taxAmount = (expectedBasicAmount * cgstPercent / 100) + (expectedBasicAmount * sgstPercent / 100);
        const expectedGrandTotal = expectedBasicAmount + taxAmount;

        const actualGrandTotal = parseFloat((await this.itemTotalField.inputValue()).replace(/,/g, ''));
        expect(actualGrandTotal).toBeCloseTo(expectedGrandTotal, 0);

        console.log(`✅ Lifecycle Verified for ${appliedGeneralDiscount}% discount. Final Total: ${actualGrandTotal}`);
    }

    async fillTotalCalculationTab() {
        await this.totalCalculationTab.click();
        await this.additionalChargesLabelNameField.fill('Installation Charges');
        await this.additionalChargesValuePercentageRadioButton.check();
        await this.additionalChargesValueField.fill('10');
        await this.igstField.fill('9');
        await this.cgstField.fill('3');
        await this.sgstField.fill('3');
        await this.utgstField.fill('3');
        await this.additionalChargesAddButton.click();
    }
    async fillAndValidateTotalCalculation(chargePercent: number, specialDiscPercent: number) {
        await this.totalCalculationTab.click();

        // 1. Get the base amount carried from the General Tab
        const baseTotalAmount = parseFloat((await this.totalAmountReadonlyfield.inputValue()).replace(/,/g, ''));

        // 2. Fill Additional Charges
        await this.additionalChargesLabelNameField.fill('Installation Charges');
        // If clicking radio is flaky, use the label locator
        //await this.page.locator('//label[contains(., "%")]/preceding-sibling::input').click();
        await RadioUtil.select(this.additionalChargesValuePercentageRadioButton, "Additional Charges");

        await this.additionalChargesValueField.fill(chargePercent.toString());
        await this.igstField.fill('9');
        await this.cgstField.fill('3');
        await this.sgstField.fill('3');
        await this.utgstField.fill('3');
        await this.additionalChargesAddButton.click();

        // 3. Math for Total Additional Charges:
        // Value = Base * (chargePercent / 100)
        // Taxes = Value * (9+3+3+3 / 100)
        const chargeValue = baseTotalAmount * (chargePercent / 100);
        const chargeTaxes = chargeValue * ((9 + 3 + 3 + 3) / 100);
        const expectedTotalAdditional = chargeValue + chargeTaxes;
        //await this.validateTabTable();

        // 4. Validate Additional Charges Field
        await expect(async () => {
            const actualAdd = parseFloat((await this.totalAdditionalChargesReadonlyField.inputValue()).replace(/,/g, ''));
            expect(actualAdd).toBeCloseTo(expectedTotalAdditional, 0);
        }).toPass();

        // 5. Fill Special Discount on this tab
        await RadioUtil.select(this.specialDiscountPercentageRadioButton, 'Special Discount');
        await this.specialDiscountField.click();
        await this.page.keyboard.type(specialDiscPercent.toString());
        await this.page.keyboard.press('Tab');

        // 6. Final Amount Math: (Base Amount + Total Additional Charges) - Special Discount %
        const subtotal = baseTotalAmount + expectedTotalAdditional;
        const discountAmount = subtotal * (specialDiscPercent / 100);
        const expectedFinalAmount = subtotal - discountAmount;

        // 7. Validate Final Amount
        await expect(async () => {
            const actualFinal = parseFloat((await this.totalFinalAmountReadonlyField.inputValue()).replace(/,/g, ''));
            console.log(`Final Calc: Base(${baseTotalAmount}) + Addit(${expectedTotalAdditional}) - Disc(${specialDiscPercent}%) = ${expectedFinalAmount}`);
            expect(actualFinal).toBeCloseTo(expectedFinalAmount, 0);
        }).toPass();
    }

    async fillOtherTabs() {
        await this.rfqNotesTab.click();
        await this.selectFirstOption(this.selectRfqNotesDropdown, this.ngOptions);

        await this.otherTemsTab.click();
        await this.selectFirstOption(this.selectOtherTemsDropdown, this.ngOptions);

        await this.specialTemsTab.click();
        await this.specialTemsField.fill('Automated Special Terms');
        await this.specialTemsAddButton.click();
    }
    async clickSave() {
        await this.robustClick(this.globalSaveButton);
    }

    /**
    * Captures data from the Quote listing table after creation and saves to JSON
    */
    async captureQuoteTableData() {
        await expect(this.quoteTableRows.first()).toBeVisible();

        const quoteNo = (await this.firstRowQuoteNumber.innerText()).trim();
        const rfqNo = (await this.firstRowRfqNumber.innerText()).trim();
        const totalAmount = (await this.firstRowQuoteTotalAmount.innerText()).trim();

        const capturedData = {
            quoteNumber: quoteNo,
            rfqNumber: rfqNo,
            quoteTotalAmount: totalAmount
        };

        console.log(`Captured Quote Table Data:`, capturedData);

        // Save to a specific file for Quote Results
        await JsonUtil.saveEntity('QuoteDetails.json', capturedData);

        return capturedData;
    }

    async clickQuoteAction(rfqNumber: string, quoteNumber: string, action: 'edit' | 'view' | 'release' = 'release') {
        console.log(`Navigating to ${action} for RFQ: ${rfqNumber}, Quote: ${quoteNumber}`);

        // 1. Locate the row that matches BOTH the RFQ Number and the Quote Number
        // This handles cases where multiple quotes exist for the same RFQ or vice versa
        const targetRow = this.page.locator('table tbody tr').filter({
            has: this.page.locator('td', { hasText: quoteNumber }),
        }).filter({
            has: this.page.locator('td', { hasText: rfqNumber }),
        });

        // Ensure the row is visible and present
        await expect(targetRow.first()).toBeVisible({ timeout: 15000 });

        // 2. Identify the action button within that specific row
        // Based on image_a9eb10.png: Index 0 is Edit (Pencil), 1 is View (Eye), 2 is Release (Arrow)
        let actionIndex = 2; // Default to release
        if (action === 'edit') actionIndex = 0;
        if (action === 'view') actionIndex = 1;

        const actionButton = targetRow.first().locator('td').first().locator('button, a, i').nth(actionIndex);

        // 3. Perform the click
        await actionButton.scrollIntoViewIfNeeded();
        await actionButton.click();
        await this.retailShopOrderButton.click();
        await this.page.waitForURL(/sales-order/);

        console.log(`Successfully clicked ${action} icon.`);

    }

}