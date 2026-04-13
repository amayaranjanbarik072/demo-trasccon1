import { Page, Locator } from '@playwright/test';
import BasePage from '../../base/BasePage';
import { JsonUtil } from '../../utils/JsonUtil';

export class EnggBOM extends BasePage {
    private itemNumberDropdown: Locator;
    private childItemInput: Locator;
    private quantityField: Locator;
    private remarksField: Locator;
    private addButton: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.itemNumberDropdown = page.locator('ng-select[placeholder="Select Item Number"]');
        this.childItemInput = page.locator('textarea[type="text"]');
        this.quantityField = page.getByPlaceholder('Enter Quantity');
        this.remarksField = page.getByPlaceholder('Enter Remarks');
        this.addButton = page.getByRole('button', { name: 'Add', exact: true });
        this.saveButton = page.getByRole('button', { name: 'Save' });
    }

    async navigateToEnggBomCreatePage() {
        await this.page.goto('/engineering/engg-bom/create');
        await this.page.waitForLoadState('networkidle');
    }

    async selectParentItem(itemNumber: string) {
        await this.itemNumberDropdown.click();
        const searchInput = this.itemNumberDropdown.locator('input[type="text"]');
        await searchInput.fill(itemNumber);
        // Explicitly click the option to ensure the selection is registered
        await this.page.locator(`span.ng-option-label:has-text("${itemNumber}")`).click();
    }

    async enterChildItem(childItem: string, qty: string = '1', remarks: string = 'NA') {
        // 1. Click and Type to open the list
        await this.childItemInput.click();
        await this.page.waitForTimeout(1000);
        await this.childItemInput.fill(childItem);
        //await this.childItemInput.pressSequentially(childItem, { delay: 100 });
        await this.page.waitForTimeout(1000);
        // 2. THE FIX: Use Regex to find the option
        // This looks for any option that contains your childItem string, 
        const option = this.page.locator('//span[@class="mat-option-text"]').filter({
            hasText: new RegExp(`^${childItem}`)
        });

        // 3. Robust selection: Wait, Hover, and Click
        try {
            await option.waitFor({ state: 'visible', timeout: 3000 });
            await option.hover();
            await option.click({ force: true });
        } catch (e) {
            // Fallback: If the click still fails, use the keyboard to select the filtered result
            //console.log(`Click failed for ${childItem}, attempting Keyboard selection...`);
            await this.page.keyboard.press('ArrowDown');
            await this.page.keyboard.press('Enter');
        }

        // 4. Fill remaining fields
        await this.quantityField.fill(qty);
        await this.remarksField.fill(remarks);
        await this.addButton.click();

        // 5. Verification
        //await this.page.locator('table').getByText(childItem).waitFor({ state: 'visible' });
        await this.validateTabTable();
    }

    async clickSaveButton() {
        await this.saveButton.click();
        // Wait for redirect to confirm the save was successful
        await this.page.waitForURL(/.*table/);
    }

    async getLatestBOMDetails() {
        // 1. Wait for table row to be visible
        const firstRow = this.page.locator('table tbody tr').first();
        await firstRow.waitFor({ state: 'visible', timeout: 10000 });

        // 2. Extract data
        const details = {
            itemNumber: (await firstRow.locator('td').nth(1).innerText()).trim(),
            description: (await firstRow.locator('td').nth(2).innerText()).trim(),
            itemType: (await firstRow.locator('td').nth(3).innerText()).trim().toUpperCase(),
            revNumber: (await firstRow.locator('td').nth(4).innerText()).trim(),
            timestamp: new Date().toISOString()
        };
        return details;
    }
}