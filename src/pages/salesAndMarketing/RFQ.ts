import { Page, Locator, expect } from '@playwright/test';
import BasePage from '../../base/BasePage';
import { DateUtil } from '../../utils/DateUtil';
import bomData = require('../../testData/CapturedBOMResults.json');
import customerData = require('../../testData/CustomerMasterDetails.json');
import rfqData = require('../../testData/RFQDetails.json');

export class RFQ extends BasePage {
    // --- TABLE / LIST VIEW LOCATORS ---
    readonly rfqTableRows: Locator;
    readonly firstRowRfqNumber: Locator;
    readonly firstRowRevisionNumber: Locator;
    readonly firstRowCustomerName: Locator;
    readonly firstRowCsCompleteStatus: Locator;
    readonly firstRowCsReleaseStatus: Locator;
    readonly firstRowEnggCompleteStatus: Locator;
    readonly firstRowEnggReleaseStatus: Locator;

    // --- CREATE PAGE LOCATORS ---
    private customerNameDropdown: Locator;
    private customerAliasDropdown: Locator;
    private customerRfqNumberField: Locator;
    private requestReceivedDateField: Locator;
    private quoteExpectDateField: Locator;
    private sbuField: Locator;

    // --- CS / ENGG COMPLETE TAB LOCATORS ---
    private revNoReadonlyField: Locator;
    private itemsTab: Locator;
    private notesTab: Locator;
    private itemNumberField: Locator;
    private quantityField: Locator;
    private descriptionField: Locator;
    private addScheduleButton: Locator;
    private addCustomFieldsButton: Locator;
    private itemsAddButton: Locator;
    private categoryDropdown: Locator;
    private notesField: Locator;
    private notesAddButton: Locator;

    //CS/Engg Release Locaters
    private tableHeadCheckBox: Locator;
    private tableRowCheckBox: Locator;
    private editButton: Locator;
    private releaseButton: Locator;
    private itemNumberDropdown: Locator;




    // --- ACTION ICONS (From Table) ---
    private csIcon: Locator;
    private enggIcon: Locator;

    constructor(page: Page) {
        super(page);

        // 1. Table View Locators (Indices based on your screenshot)
        this.rfqTableRows = page.locator('table tbody tr');
        const firstRow = this.rfqTableRows.first();

        this.firstRowRfqNumber = firstRow.locator('td').nth(1);
        this.firstRowRevisionNumber = firstRow.locator('td').nth(2);
        this.firstRowCustomerName = firstRow.locator('td').nth(3);
        this.firstRowCsCompleteStatus = firstRow.locator('td').nth(4);
        this.firstRowCsReleaseStatus = firstRow.locator('td').nth(5);
        this.firstRowEnggCompleteStatus = firstRow.locator('td').nth(6);
        this.firstRowEnggReleaseStatus = firstRow.locator('td').nth(7);

        // 2. Create Page Form Locators
        this.customerNameDropdown = page.locator('//label[text()="Customer Name "]/..//ng-select[@formcontrolname="customerIdName"]');
        this.customerAliasDropdown = page.locator('//label[text()="Customer Alias Name "]/..//ng-select[@formcontrolname="customerAliasName"]');
        this.customerRfqNumberField = page.locator('//input[@formcontrolname="cusRfqNumber"]');
        this.requestReceivedDateField = page.locator('//input[@formcontrolname="requestReceivedDate"]');
        this.quoteExpectDateField = page.locator('//input[@formcontrolname="quotesExpectedDate"]');
        this.sbuField = page.locator('//input[@formcontrolname="sbu"]');

        // 3. CS / Engg Details Tabs Locators
        this.revNoReadonlyField = page.locator('//input[@formcontrolname="revNo"]');
        this.itemsTab = page.locator('//a[.="Item"]');
        this.notesTab = page.locator('//a[.="Notes"]');
        this.itemNumberField = page.locator('//input[@formcontrolname="itemNumber"]');
        this.quantityField = page.locator('//input[@formcontrolname="quantity"]');
        this.descriptionField = page.locator('//textarea[@formcontrolname="description"]');
        this.addScheduleButton = page.locator('//button[normalize-space()="Add Schedule"]');
        this.addCustomFieldsButton = page.locator('//button[normalize-space()="Add Custom Fields"]');
        this.itemsAddButton = page.locator('//button[normalize-space()="Add"]');
        this.categoryDropdown = page.locator('//label[normalize-space()="Category"]/../ng-select');
        this.notesField = page.locator('//textarea[@formcontrolname="note"]');
        this.notesAddButton = page.locator('//button[normalize-space()="Add"]');
        this.itemNumberDropdown = page.locator('//td//ng-select[@placeholder="Select Item Number"]');
        //Release
        this.tableHeadCheckBox = page.locator('//th//input[@type="checkbox"]')
        this.tableRowCheckBox = page.locator('//tr//td[@class="checkbox"]')
        this.editButton = page.locator('//button[normalize-space()="Edit"]')
        this.releaseButton = page.locator('//button[normalize-space()="Release"]')

        // 4. Action Icons (Targeted within the first row)
        this.csIcon = firstRow.locator('.mdi-account-switch');
        this.enggIcon = firstRow.locator('.mdi-application-cog');
    }

    /**
     * Fills the RFQ creation form and handles the Save process.
     */
    async navigateToRfqCreatePage() {
        await this.page.goto('/sales/rfq/create')
    }
    async createRfq(manualRfqNum: string = 'RFQ_001', sbuValue: string = 'SBU_001') {
        await this.navigateToRfqCreatePage();
        await this.customerNameDropdown.click();
        await this.page.keyboard.type(customerData.customerName);
        await this.ngOptions.waitFor({ state: 'visible', timeout: 5000 });
        await this.ngOptions.click();
        await this.customerRfqNumberField.fill(manualRfqNum);

        const today = await DateUtil.getFormattedDate(0);
        const deadline = await DateUtil.getFormattedDate(5);
        await DateUtil.selectDate(this.requestReceivedDateField, today);
        await DateUtil.selectDate(this.quoteExpectDateField, deadline);
        await this.sbuField.fill(sbuValue);
        await this.robustClick(this.globalSaveButton);

        // Wait for redirect to table
        await this.page.waitForURL(/table/);
        await this.verifyToast(['created', 'successfully']);
        // Read auto-generated values from first row of table
        const generatedRfqNumber = (await this.firstRowRfqNumber.innerText()).trim();
        const generatedRevNo = (await this.firstRowRevisionNumber.innerText()).trim();
        const generatedCustomer = (await this.firstRowCustomerName.innerText()).trim();

        const row = await this.getRowByRfqNumber(generatedRfqNumber);
        await expect(this.firstRowCsCompleteStatus).toHaveText('Not Completed');
        await expect(this.firstRowCsReleaseStatus).toHaveText('Not Yet Released');
        await expect(this.firstRowEnggCompleteStatus).toHaveText('Not Completed');
        await expect(this.firstRowEnggReleaseStatus).toHaveText('Not Yet Released');
        console.log(`System RFQ: ${generatedRfqNumber} | Revision: ${generatedRevNo} | Customer: ${generatedCustomer}`);
        // Validate format (Example: TISPL-2184)
        expect(generatedRfqNumber).toMatch(/TISPL-\d+/);

        // Return all details as an object
        return {
            rfqNumber: generatedRfqNumber,
            revisionNo: generatedRevNo,
            customerName: generatedCustomer,

        };
    }

    /**
     * Finds the table row matching the given RFQ number
     */
    private getRowByRfqNumber(rfqNumber: string): Locator {
        return this.page.locator('table tbody tr', {
            has: this.page.locator('td', { hasText: rfqNumber })
        });
    }
    /**
     * Clicks CS icon on the row matching the given RFQ number
     */
    async navigateToCsByRfqNumber(rfqNumber: string) {
        const row = this.getRowByRfqNumber(rfqNumber);
        await expect(row).toBeVisible();
        await row.locator('.mdi-account-switch').click();
    }

    /**
     * Clicks Engg icon on the row matching the given RFQ number
     */
    async navigateToEnggByRfqNumber(rfqNumber: string) {
        const row = this.getRowByRfqNumber(rfqNumber);
        await expect(row).toBeVisible();
        await row.locator('.mdi-application-cog').click();
    }
    /**
     * Fills internal details in the CS or Engineering completion screens.
     */
    async createCsComplete(rfqNumber: string, itemNum: string = '1', qtyValue: string = '500') {
        // Navigate to table first, then find the correct row
        await this.page.goto('/sales/rfq/table');
        await this.navigateToCsByRfqNumber(rfqNumber);
        // Items Tab
        await this.itemsTab.click();
        await this.itemNumberField.fill(itemNum);
        await this.quantityField.fill(qtyValue);
        const capturedQuantity = await this.quantityField.inputValue();
        await this.descriptionField.fill(bomData.FG[0].description);
        await this.itemsAddButton.click();
        if (this.validateTabTable) await this.validateTabTable();
        // Notes Tab
        await this.notesTab.click();
        await this.selectFirstOption(this.categoryDropdown, this.ngOptions);
        await this.notesField.fill('NA - Automated Note');
        await this.notesAddButton.click();
        if (this.validateTabTable) await this.validateTabTable();
        // Save
        await this.robustClick(this.globalSaveButton);
        await this.verifyToast(['successfully', 'Created']);
        await this.page.waitForURL(/table/);
        await expect(this.firstRowCsCompleteStatus).toHaveText('Completed');
        await expect(this.firstRowCsReleaseStatus).toHaveText('Not Yet Released');
        return {
            quantity: capturedQuantity
        };

    }

    async createCsRelease(rfqNumber: string) {
        await this.page.goto('/sales/rfq/table');
        await this.navigateToCsByRfqNumber(rfqNumber);
        await this.tableHeadCheckBox.check();
        await expect(this.releaseButton).toBeEnabled();
        await this.releaseButton.click();
        await this.verifyToast(['Released', 'CustomerSupport']);
        await expect(this.firstRowCsCompleteStatus).toHaveText('Completed');
        await expect(this.firstRowCsReleaseStatus).toHaveText('Fully Released');
        await this.page.waitForURL(/table/);
    }

    async createEnggCompelete(rfqNumber: string) {
        await this.page.goto('/sales/rfq/table');
        await this.navigateToEnggByRfqNumber(rfqNumber);
        await this.itemNumberDropdown.click();
        await this.page.keyboard.type(bomData.FG[0].itemNumber);
        await this.page.keyboard.press('Enter');
        await this.robustClick(this.globalSaveButton);
        await this.verifyToast(['successfully', 'Created']);
        await this.page.waitForURL(/table/);
        await expect(this.firstRowEnggCompleteStatus).toHaveText('Completed');
        await expect(this.firstRowEnggReleaseStatus).toHaveText('Not Yet Released');
    }
    async createEnggRelease(rfqNumber: string) {
        await this.page.goto('/sales/rfq/table');
        await this.navigateToEnggByRfqNumber(rfqNumber);
        await this.tableHeadCheckBox.check();
        await this.releaseButton.click();
        await this.page.waitForURL(/table/);
        await this.verifyToast(['Released', 'Activated']);
        await expect(this.firstRowEnggCompleteStatus).toHaveText('Completed');
        await expect(this.firstRowEnggReleaseStatus).toHaveText('Fully Released');

    }
}