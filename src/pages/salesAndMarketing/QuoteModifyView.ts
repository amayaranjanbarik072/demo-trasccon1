import { Page, Locator, expect } from "@playwright/test";
import BasePage from "../../base/BasePage";

export class QuoteModifyView extends BasePage {
    private releaseIcon: Locator;
    private releaseQuotePopUp: Locator;
    private retailShopOrderButton: Locator;
    private buildToPrintButton: Locator;
    private lossButton: Locator;
    private closeButton: Locator;

    constructor(page: Page) {
        super(page); {
            this.releaseIcon = page.locator('//i[@class="mdi mdi-arrow-top-right-bold-outline edit-table-icon"]');
            this.releaseQuotePopUp = page.locator('//div[@class="modal-content"]');
            this.retailShopOrderButton = page.locator('//div[@class="modal-content"]//button[normalize-space()="Retail Shop Order"]');
            this.buildToPrintButton = page.locator('//button[normalize-space()="Build To Print"]');
            this.lossButton = page.locator('//button[normalize-space()="Loss"]');
            this.closeButton = page.locator('//button[normalize-space()="Close"]');
        }
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
        //await expect(this.releaseQuotePopUp).toBeVisible();
        console.log(`Successfully clicked ${action} icon.`);
    }

    async releaseQuoteByRetailShopOrder() {
        await this.retailShopOrderButton.click();
        await this.page.waitForURL(/sales-order/);
    }
    async releaseQuoteByBuildToPrint() {
        await this.buildToPrintButton.click();
        await this.page.waitForURL(/sales-order/);
    }
    async lossQuote() {
        await this.lossButton.click();
    }

}