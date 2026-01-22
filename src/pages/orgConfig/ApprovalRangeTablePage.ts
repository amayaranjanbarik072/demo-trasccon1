import BasePage from "../../base/BasePage";
import { expect, Locator, Page } from "@playwright/test";


export class ApprovalRangeTablePage extends BasePage {
    private approvalRangePlusIcon: Locator;
    private searchTextfield: Locator;
    private searchButton: Locator;
    private backupIcon: Locator;
    private homeIcon: Locator;
    private backSpaceIcon: Locator;
    private pageSizeDropdown: Locator;
    private showingXToTOfZItems: Locator;

    constructor(page: Page) {
        super(page);
        this.approvalRangePlusIcon = page.locator('xpath = //i[@class="mdi mdi-plus-box-outline edit-table-icon"]');
        this.searchTextfield = page.locator('#example-search-input');
        this.searchButton = page.locator('xpath= //button[@class="btn btn_primary search_btn"]');
        this.backupIcon = page.locator('xpath= //i[@class="mdi mdi-backup-restore edit-table-icon"]');
        this.homeIcon = page.locator('xpath= //i[@class="mdi mdi-home-outline edit-table-icon"]');
        this.backSpaceIcon = page.locator('xpath= //i[@class="mdi mdi-keyboard-backspace edit-table-icon"]');
        this.pageSizeDropdown = page.locator('xpath= //select[@class="form-control select_field ng-pristine ng-valid ng-touched"]');
        this.showingXToTOfZItems = page.locator('');
    }

    //Navigation to Approval Range Create page
    async navigateToApprovalRangeCreatePage() {
        await this.approvalRangePlusIcon.click();
        console.log(await this.page.url());
    }
    async searchApprovalRange() {
        await this.searchBarUtils.search('Approval Range');
    }
    async clearSearch() {
        await this.searchBarUtils.clearSearch();
    }





}

