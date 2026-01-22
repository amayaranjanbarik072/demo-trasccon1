import { Page, Locator, expect } from '@playwright/test';

export class TablePage {
  constructor(private page: Page) { }

  //*---------------Header Level Locators-----------------*//
  restoreIcon(): Locator {
    return this.page.locator('i.mdi-backup-restore');
  }
  homeIcon(): Locator {
    return this.page.locator('i.mdi-home-outline');
  }
  backIcon(): Locator {
    return this.page.locator('i.mdi-keyboard-backspace');
  }

  //*---------------Locators-----------------*//(robust & reusable)
  createPlusIcon(): Locator {
    // return this.page.locator('xpath= //i[@class="mdi mdi-plus-box-outline edit-table-icon"]');
    // return this.page.locator('xpath= //i[@class="mdi mdi-plus-box-outline edit-icon"] ');
    return this.page.locator('xpath= //i[contains(@class,"mdi-plus-box-outline")]');
  }

  tableRows(): Locator {
    return this.page.locator('xpath= //tr[@class="ng-star-inserted"]');
  }

  rowByText(text: string): Locator {
    return this.page.locator('xpath= //tr[@class="ng-star-inserted"]', { hasText: text });
  }

  searchBox(): Locator {
    return this.page.getByPlaceholder('Search');
  }

  searchIcon(): Locator {
    return this.page.locator('xpath= //button[@class="btn btn_primary search_btn"]')
  }

  pageSizeDropdown(): Locator {
    return this.page.locator('select');
  }

  firstPageBtn(): Locator {
    return this.page.locator('xpath= //a[@aria-label="First"]');
  }

  lastPageBtn(): Locator {
    return this.page.locator('xpath= //a[@aria-label="Last"]');
  }

  nextPageBtn(): Locator {
    return this.page.locator('xpath= //a[@aria-label="Next"]');
  }

  prevPageBtn(): Locator {
    return this.page.locator('xpath= //a[@aria-label="Previous"]');
  }

  pageNumberBtn(): Locator {
    return this.page.locator('xpath= //a[@class="page-link ng-star-inserted"]');
  }

  //*---------------Header Actions-----------------*//

  async clickToRestore() {
    await this.restoreIcon().waitFor({ state: 'visible' });
    await this.restoreIcon().click();
  }

  async clickToHome() {
    await this.homeIcon().waitFor({ state: 'visible' });
    await this.homeIcon().click();
  }

  async clickToBack() {
    await this.backIcon().waitFor({ state: 'visible' });
    await this.backIcon().click();
  }

  //*---------------Create Actions-----------------*//
  async clickAddIcon() {
    await this.createPlusIcon().click();
  }

  async verifyRecordPresent(text: string) {
    await expect(this.rowByText(text)).toBeVisible();
  }

  //*---------------View & Edit Actions-----------------*//
  async clickView(text: string) {
    await this.rowByText(text).locator('i.mdi-eye').click();
  }

  async clickEdit(text: string) {
    await this.rowByText(text).locator('i.mdi-pencil').click();
  }

  //*---------------Search Actions-----------------*//
  async search(text: string) {
    await this.searchBox().fill(text);
    await this.searchIcon().click();
    await this.page.waitForTimeout(500); // debounce
  }

  async clearSearch(text: String) {
    await this.searchBox().fill('')
    await this.searchIcon().click();
  }

  //*---------------Pagination Actions-----------------*//
  async changePageSize(size: string) {
    await this.pageSizeDropdown().selectOption({ label: size });
  }

  async goToNextPage() {
    await this.nextPageBtn().click();
  }

  async goToPreviousPage() {
    await this.prevPageBtn().click();
  }

  async goToLastPage() {
    await this.lastPageBtn().click();
  }

  async goToFirstPage() {
    await this.firstPageBtn().click();
  }

  async goToAnyPage(pageNumber: number) {
    await this.page.getByRole('link', { name: pageNumber.toString() }).click();

  }

  // ================= PERMISSION ASSERTIONS =================

  async expectCreateIconVisible(p0: boolean) {
    await expect(this.createPlusIcon()).toBeVisible();
  }

  async expectCreateIconHidden() {
    await expect(this.createPlusIcon()).toHaveCount(0);
  }

  async expectEditIconVisible(text: string) {
    await expect(
      this.rowByText(text).locator('i.mdi-pencil')
    ).toBeVisible();
  }

  async expectEditIconHidden(text: string) {
    await expect(
      this.rowByText(text).locator('i.mdi-pencil')
    ).toHaveCount(0);
  }

  async expectViewIconVisible(text: string) {
    await expect(
      this.rowByText(text).locator('i.mdi-eye')
    ).toBeVisible();
  }

  async expectViewIconHidden(text: string) {
    await expect(
      this.rowByText(text).locator('i.mdi-eye')
    ).toHaveCount(0);
  }

  async expectTableVisible() {
    await expect(this.tableRows().first()).toBeVisible();
  }

  async expectTableHidden() {
    await expect(this.tableRows()).toHaveCount(0);
  }


}
