import { Page, Locator, expect } from '@playwright/test';
import BasePage from '../../base/BasePage';
import bomData = require('../../testData/CapturedBOMResults.json');
import rfqData = require('../../testData/RFQDetails.json');
import { DateUtil } from '../../utils/DateUtil';
import { JsonUtil } from '../../utils/JsonUtil';

export class SalesOrder extends BasePage {
    // Header Fields
    private projectNumberField: Locator;
    private quoteNumberField: Locator;
    private quoteRevNoField: Locator;
    private orderDateField: Locator;
    private leadIdField: Locator;
    private orderTypeDropdown: Locator;
    private customerNameField: Locator;
    private customerIdField: Locator;
    private quoteTypeField: Locator;
    private totalField: Locator;

    // Tabs
    private itemsTab: Locator;
    private poDetailsTab: Locator;
    private billingAndShippingDetailsTab: Locator;
    private totalCalculationTab: Locator;

    // Total Calculation Elements
    private generalDiscountPercentageRadioButton: Locator;
    private generalDiscountRsRadioButton: Locator;
    private generalDiscountField: Locator;
    private totalAmountField: Locator;
    private generalAddButton: Locator;

    // Table
    private itemTableRows: Locator;
    private deliveryScedulePopUp: Locator;
    private deliverySceduleItemNumber: Locator;
    private deliverySceduleQuantity: Locator;
    private deliverySceduleDateField: Locator;
    private deliverySceduleUpQuantityField: Locator;
    private deliverySceduleAddButton: Locator;
    private deliverySceduleUpdateButton: Locator;
    private deliverySceduleClearButton: Locator;
    private deliverySceduleSaveButton: Locator;
    private deliverySceduleCloseButton: Locator;
    private deliveryScheduleRow: Locator;

    private salesOrderListingRows: Locator;
    private firstSalesOrderRow: Locator;




    constructor(page: Page) {
        super(page);

        // Header Section
        this.projectNumberField = page.locator('//input[@formcontrolname="projectNumber"]');
        this.quoteNumberField = page.locator('//input[@formcontrolname="quoteNumber"]');
        this.quoteRevNoField = page.locator('//input[@formcontrolname="quoteRevNumber"]');
        this.orderDateField = page.locator('//input[@formcontrolname="orderDate"]');
        this.leadIdField = page.locator('//input[@formcontrolname="leadId"]');
        this.orderTypeDropdown = page.locator('//label[normalize-space()="Order Type"]/../ng-select');
        this.customerNameField = page.locator('//input[@formcontrolname="customerName"]');
        this.customerIdField = page.locator('//input[@formcontrolname="customerNumber"]');
        this.quoteTypeField = page.locator('//input[@formcontrolname="typeOfSolution"]');
        this.totalField = page.locator('//input[@formcontrolname="totalAmount"]');

        // Tab Navigation
        this.itemsTab = page.locator('//a[normalize-space()="Items"]');
        this.poDetailsTab = page.locator('//a[normalize-space()="PO Details"]');
        this.billingAndShippingDetailsTab = page.locator('//a[normalize-space()="Billing & Shipping Details"]');
        this.totalCalculationTab = page.locator('//a[normalize-space()="Total Calculation"]');

        // Discount Section
        this.generalDiscountPercentageRadioButton = page.locator('//input[@formcontrolname="generalDiscountType" and @value="Percentage"]');
        this.generalDiscountRsRadioButton = page.locator('//input[@formcontrolname="generalDiscountType" and @value="Rupees"]');
        this.generalDiscountField = page.locator('//input[@placeholder="Enter General Discount"]');
        this.totalAmountField = page.locator('//input[@placeholder="Enter Total Amount"]');
        this.generalAddButton = page.locator('//button[.="Add"]');

        // Table Rows
        this.itemTableRows = page.locator('tr.itemTableTr');
        this.deliveryScedulePopUp = page.locator('//div[@class="modal-content"]');
        this.deliverySceduleItemNumber = page.locator('//label[normalize-space()="Item Number :"]/..//label[@class="property"]');
        this.deliverySceduleQuantity = page.locator('//label[normalize-space()="Quantity :"]/..//label[@class="property"]');
        this.deliverySceduleDateField = page.locator('//input[@formcontrolname="deliveryScheduleDate"]');
        this.deliverySceduleUpQuantityField = page.locator('//input[@formcontrolname="deliveryScheduleQty"]');
        this.deliverySceduleAddButton = page.locator('//div[@class="modal-content"]//button[normalize-space()="Add"]');
        this.deliverySceduleUpdateButton = page.locator('//div[@class="modal-content"]//button[normalize-space()="Update"]');
        this.deliverySceduleClearButton = page.locator('//div[@class="modal-content"]//button[normalize-space()="Clear"]');
        this.deliveryScheduleRow = page.locator('//table[@class="table table-striped"]//tbody//tr');
        this.deliverySceduleSaveButton = page.locator('//div[@class="modal-content"]//button[normalize-space()="save"]');
        this.deliverySceduleCloseButton = page.locator('//div[@class="modal-content"]//button[normalize-space()="Close"]');

        // Listing Screen Rows (based on image_ec8c44.png)
        this.salesOrderListingRows = page.locator('table tbody tr');
        this.firstSalesOrderRow = page.locator('table tbody tr').first();

    }
    async storeSalesOrderData() {
        // Wait for the table to be visible and stable
        await this.firstSalesOrderRow.waitFor({ state: 'visible', timeout: 10000 });

        const cells = this.firstSalesOrderRow.locator('td');

        // Extracting data based on the structure in image_ec8c44.png
        const createdOrderData = {
            orderNo: await cells.nth(1).innerText(),
            orderDate: await cells.nth(2).innerText(),
            projectNo: await cells.nth(3).innerText(),
            orderType: await cells.nth(4).innerText(),
            customerName: await cells.nth(5).innerText(),
            customerId: await cells.nth(6).innerText(),
            receivedDate: await cells.nth(7).innerText(),
            poNumber: await cells.nth(8).innerText(),
            poDate: await cells.nth(9).innerText(),
            revNumber: await cells.nth(10).innerText(),
            createdBy: await cells.nth(11).innerText(),
            createdOn: await cells.nth(12).innerText(),
            status: await cells.nth(15).innerText()
        };

        // Clean up whitespace/newlines if any
        // for (const key in createdOrderData) {
        //     createdOrderData[key] = createdOrderData[key].trim();
        // }

        // Store as a single object (not an array) for easier direct access in tests
        JsonUtil.saveEntity('SalesOrdersDetails.json', createdOrderData);

        console.log(`Successfully stored created Order: ${createdOrderData.orderNo}`);
        return createdOrderData;
    }

    /**
     * PRIVATE HELPER
     * Maps locators for a specific row. By keeping this as a method, 
     * we avoid scope errors and make the code reusable.
     */
    private getRowLocators(row: Locator) {
        return {
            slNo: row.locator('td').nth(0),
            itemNumber: row.locator('td').nth(1),
            description: row.locator('td').nth(2),
            uom: row.locator('td').nth(3),
            currency: row.locator('td').nth(4),
            priceList: row.locator('td').nth(5),
            unitPrice: row.locator('td').nth(6),
            orderQty: row.locator('td').nth(7).locator('input'),
            discountPercent: row.locator('input[value="%"]'),
            discountRs: row.locator('input[value="Rs"]'),
            discountValue: row.locator('td').nth(9).locator('input'),
            basicAmount: row.locator('td').nth(11),
            sgst: row.locator('td').nth(12).locator('input'),
            cgst: row.locator('td').nth(13).locator('input'),
            igst: row.locator('td').nth(14).locator('input'),
            utgst: row.locator('td').nth(15).locator('input'),
            totalAmount: row.locator('td').nth(16),
            scheduleDateBtn: row.locator('td').nth(18).locator('i'),
            remarks: row.locator('td').nth(19).locator('input'),
            deleteBtn: row.locator('td').nth(20).locator('i')
        };
    }

    /**
     * Actions for Creating Sales Order
     */
    async validateSalesOrderData() {

    }
    async itemToSchedule(itemToSchedule: string) {
        // Ensure we are on the items tab
        await this.itemsTab.click();

        // 1. Identify the specific row by text (Item Number)
        const row = this.itemTableRows.filter({ hasText: itemToSchedule }).first();

        // Ensure row is visible before interacting
        await expect(row).toBeVisible({ timeout: 10000 });

        // 2. Use the helper to get locators for this specific row
        const rowLocators = this.getRowLocators(row);

        // 3. Perform actions
        await rowLocators.scheduleDateBtn.click();

        // Optional: Perform additional row actions here if needed
        // await rowLocators.orderQty.fill('10');
    }
    async createSalesOrder(rfqNumber: string, quoteNumber: string) {

        await this.itemToSchedule(bomData.FG[0].itemNumber);
        let date = await DateUtil.getFormattedDate(0);
        await this.deliverySceduleDateField.fill(date);
        let lessQuantity = Number(rfqData.quantity) - 1;
        await this.deliverySceduleUpQuantityField.fill(lessQuantity.toString());
        await this.deliverySceduleAddButton.click();
        await this.deliverySceduleSaveButton.click();
        await this.page.waitForTimeout(2000);
        // await this.verifyToast('× Sum of Schedule qty Should be equal to Quantity');
        await this.deliveryScheduleRow.click();
        await this.deliverySceduleUpQuantityField.fill(rfqData.quantity);
        await this.deliverySceduleUpdateButton.click();
        await this.page.waitForTimeout(2000);
        await this.deliverySceduleSaveButton.click();
        await this.page.waitForTimeout(2000);



        // 4. Save the full form
        await this.robustClick(this.globalSaveButton);
        await this.verifyToast(['successfully', 'Created']);
    }
}