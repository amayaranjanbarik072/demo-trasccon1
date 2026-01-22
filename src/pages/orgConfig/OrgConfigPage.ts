import BasePage from "../../base/BasePage";
import { Locator, Page } from "@playwright/test";
export class OrgConfigPage extends BasePage {
    //Company Master locators
   private companyMasterCreateLInk: Locator;
   private companyMasterModiftViewLink: Locator;

   //Secondary Masters Lcators
    private approvalRangeLink: Locator;
    private warehouseLink: Locator;
    private companyCategoryLink: Locator;
    private salutationsLink: Locator;
    private uocLink: Locator;



    constructor(page: Page) {
        super(page);
        this.companyMasterCreateLInk = this.page.locator('xpath= //a[normalize-space(.)="Create"]');
        this.companyMasterModiftViewLink = this.page.locator('xpath= //a[normalize-space(.)="Modify / View"]');
        //secondary Master
        this.approvalRangeLink = this.page.locator('xpath= //a[normalize-space(.)="Approval Range"]');
        this.warehouseLink = this.page.locator('xpath= //a[normalize-space(.)="Warehouse"]');
        this.companyCategoryLink = this.page.locator('xpath= //a[normalize-space(.)="Company Category"]');
        this.salutationsLink = this.page.locator('xpath= //a[normalize-space(.)="Salutations"]');
        this.uocLink = this.page.locator('xpath= //a[normalize-space(.)="UOC"]');
    }

    async navigateToCreateCompanyMaster() {
       // await this.page.waitForTimeout(2000);
        await this.companyMasterCreateLInk.click();
    }
    async navigateToModifyViewCompanyMaster() {
        // await this.page.waitForTimeout(2000);
        await this.companyMasterModiftViewLink.click();
    }
//Secondary Master Navigation
    async navigateToApprovalRangeSecondarymasterPage(){
        await this.approvalRangeLink.click();
        await this.page.waitForTimeout(4000);
    }
    async navigateToWarehouseSecondarymasterPage(){
        await this.warehouseLink.click();
    }
    async navigateToCompanyCategorySecondarymasterPage(){
        await this.companyCategoryLink.click();
    }
    async navigateToSalutationsSecondarymasterPage(){
        await this.salutationsLink.click();
    }
    async navigateToUOCSecondarymasterPage(){
        await this.uocLink.click();
    }
}