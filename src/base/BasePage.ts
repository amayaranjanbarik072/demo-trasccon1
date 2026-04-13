import { Page, Locator, expect } from '@playwright/test';

export default class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
    this.ngOptions = page.locator("//div[contains(@class,'ng-dropdown-panel')]//div/span");
    this.globalSaveButton = page.locator('xpath= //button[.="Save"]');
    this.commonUploadInput = page.locator('//label[normalize-space(text())="Upload"]/following-sibling::div//input[@type="file"]');
    this.commonUploadPreview = page.locator('input[placeholder="Select Upload file"]');
    this.commonSaveFilesBtn = page.getByRole('button', { name: 'Save Files' });
    this.commonViewFilesBtn = page.getByRole('button', { name: 'View Files' });
    this.commonModalBox = page.locator('div.modal-content');
    this.commonModalTableRows = page.locator('div.modal-content tbody tr');
    this.commonModalCloseBtn = page.locator('div.modal-footer').getByRole('button', { name: 'Close' });
    this.commonRemoveFileBtn = page.locator('span.input-group-text i.fa-times, .fa-xmark'); // The red 'X' button')
    this.commonModalUploadInput = page.locator('div.modal-content input[type="file"]');
    this.commonModalUploadBtn = page.locator('div.modal-content button').getByText('Upload', { exact: true });

  }

  // ================= GLOBAL UI LOCATORS =================
  // These are standard across your ERP's Master Pages
  readonly addIcon = () => this.page.locator('i.mdi-plus-box-outline');
  readonly searchBox = () => this.page.getByPlaceholder('Search');
  readonly searchIcon = () => this.page.locator('i.mdi-magnify.search_icon');
  readonly toastContainer = () => this.page.locator('#toast-container');
  readonly tableRows = () => this.page.locator('tr.ng-star-inserted');

  // These are standard locators for File Upload operations
  protected readonly ngOptions: Locator;
  protected readonly globalSaveButton: Locator;
  protected readonly commonUploadInput: Locator;
  protected readonly commonUploadPreview: Locator;
  protected readonly commonSaveFilesBtn: Locator;
  protected readonly commonViewFilesBtn: Locator;
  protected readonly commonModalBox: Locator;
  protected readonly commonModalTableRows: Locator;
  protected readonly commonModalCloseBtn: Locator;
  protected readonly commonRemoveFileBtn: Locator;
  protected readonly commonModalUploadInput: Locator;
  protected readonly commonModalUploadBtn: Locator;


  // Helper to find a specific row by text
  getRowByText = (text: string) => this.page.locator('tr.ng-star-inserted', { hasText: text });

  // ================= TOAST ACTIONS (Moved from ToastUtils) =================
  async getToastMessage(timeout = 5000): Promise<string | null> {
    try {
      await this.toastContainer().waitFor({ state: 'visible', timeout });
      const message = (await this.toastContainer().textContent())?.trim() || '';
      console.log('🔔 System Toast:', message);
      return message;
    } catch {
      return null;
    }
  }

  // async verifyToast(expectedText: string, timeout = 5000) {
  //   const actual = await this.getToastMessage(timeout);
  //   if (!actual?.includes(expectedText)) {
  //     throw new Error(`❌ Toast failed. Expected: "${expectedText}" Actual: "${actual}"`);
  //   }
  // }
  async verifyToast(keywords: string | string[], timeout = 5000) {
    const actual = await this.getToastMessage(timeout);
    const actualLower = actual?.toLowerCase() || "";
    const keywordArray = Array.isArray(keywords) ? keywords : [keywords];
    const isMatch = keywordArray.some(word => actualLower.includes(word.toLowerCase()));
    if (!isMatch) {
      throw new Error(`❌ Toast Validation Failed. Actual: "${actual}". Expected keywords: [${keywordArray}]`);
    }
    // console.log(`✅ Toast validated containing keyword(s): ${keywordArray}`);
  }

  // ================= TABLE & ICON ACTIONS (Moved from TablePage) =================
  async clickAddIcon() {
    await this.addIcon().click();
  }

  async verifyRecordPresent(text: string) {
    await expect(this.getRowByText(text)).toBeVisible();
  }

  async clickRowAction(text: string, action: 'eye' | 'pencil' | 'microsoft-excel') {
    // const row = this.getRowByText(text);
    // await row.locator(`i.mdi-${action}`).click();
    await this.getRowByText(text).locator(`i.mdi-${action}`).click();
  }

  async expectActionVisible(text: string, action: 'eye' | 'pencil') {
    await expect(this.getRowByText(text).locator(`i.mdi-${action}`)).toBeVisible();
  }

  // ================= SEARCH & PAGINATION =================
  async search(text: string) {
    await this.searchBox().fill(text);
    await this.searchIcon().click();
    await this.page.waitForTimeout(500); // Standard debounce
  }

  async navigatePagination(label: 'First' | 'Last' | 'Next' | 'Previous' | number) {
    const selector = typeof label === 'number'
      ? `role=link[name="${label}"]`
      : `xpath=//a[@aria-label="${label}"]`;
    await this.page.locator(selector).click();
  }


  // Robust click: waits for locator and clicks (retries briefly)
  async robustClick(locator: Locator | { click: () => Promise<void> }) {
    // Accept both Locator and objects with click()
    if ((locator as any).click) {
      const l = locator as Locator;
      await l.waitFor({ state: 'visible', timeout: 5000 }).catch(() => null);
      await (l.click ? l.click() : (locator as any).click());
      return;
    }
  }

  // Select first option by providing field locator string and option list locator string
  async selectFirstOption1(fieldLocator: string, optionListLocator: string) {
    await this.page.locator(fieldLocator).click();
    await this.page.waitForTimeout(300);
    const first = this.page.locator(optionListLocator).first();
    await first.click();
  }

  /**
 * Selects the first option from a dropdown properly
 * @param field The Locator for the dropdown trigger
 * @param optionList The Locator for the options (e.g., 'ng-option' or 'span')
 */
  async selectFirstOption(field: Locator, optionList: Locator) {
    await field.click();
    const firstOption = optionList.first();
    await firstOption.waitFor({ state: 'visible', timeout: 5000 });
    await firstOption.click();
    await expect(this.page.locator('ng-dropdown-panel')).toHaveCount(0);
  }

  /**
 * Strong validation for ERP tables after adding data
 * @param tableSelector Optional custom selector, defaults to your standard striped table
 */
  async validateTabTable(tableSelector: string = '.table-striped') {
    const tableBody = this.page.locator(`${tableSelector} tbody`);
    await tableBody.waitFor({ state: 'visible', timeout: 10000 });
    await expect(tableBody).toBeVisible();
    // Content Validation: Ensure at least one row exists (not just an empty header)
    const rowCount = await tableBody.locator('tr').count();
    expect(rowCount).toBeGreaterThan(0);
    //console.log(`✅ Tab Table ${tableSelector} validated with ${rowCount} row(s).`);
  }

  /**
   * Selects an option from an Angular ng-select dropdown by text
   * @param page The Playwright page instance
   * @param optionText The string value you want to select
   */
  async selectFromDropdown(dropdownLocator: Locator, optionText: string) {
    // 1. Click the dropdown to focus it
    await dropdownLocator.click();
    // 2. Find the input field inside the ng-select to filter the list
    // ng-select usually has a nested input with role="combobox" or type="text"
    //const filterInput = dropdownLocator.locator('input[type="text"]');
    // 3. Type the search text to bring the hidden option into view
    //await filterInput.fill(optionText);
    await dropdownLocator.fill(optionText);
    // 4. Wait for the dropdown panel to update and click the specific option
    // We use .ng-option as seen in your image_5bdc0a.png console log
    const option = this.page.locator('div.ng-option').filter({ hasText: new RegExp(`^${optionText}$`, 'i') }).first();
    //await option.waitFor({ state: 'visible', timeout: 5000 });
    await this.page.keyboard.press('Enter');
    // await option.click();
    // 5. Verify the panel is closed
    await expect(this.page.locator('ng-dropdown-panel')).toHaveCount(0);


    // const option = this.page.locator('ng-dropdown-panel span', { hasText: optionText }).first();
    // await option.waitFor({ state: 'visible', timeout: 10000 });
    // await option.click();
    // await expect(this.page.locator('ng-dropdown-panel')).toHaveCount(0);
  }

  async verifyFieldNotEmpty(locator: Locator, fieldName: string) {
    // Standard: Use a web-first assertion for automatic retries
    const value = await locator.inputValue() || await locator.textContent();
    expect(value?.trim().length, `❌ Field [${fieldName}] should not be empty`).toBeGreaterThan(0);
  }
}

