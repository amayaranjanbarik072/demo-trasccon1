import BasePage from "../../base/BasePage";
import { Page, Locator, expect } from "@playwright/test";

export class DashboardPage extends BasePage {
    //Profile section locators
    private profileDropdown: Locator;
    private messageDropdown: Locator;
    private notificationDropdown: Locator;
    private signOutLink: Locator;
    private toastMessage: Locator;


    //Dashboard section locators
    private dashboardHeader: Locator;
    private orgConfigHeader: Locator;
    private engineeringHeader: Locator;
    private salesAndMarketingHeader: Locator;
    private sourcingAndPlanningHeader: Locator;
    private procurementHeader: Locator;
    private manufacturingHeader: Locator;
    private warehouseHeader: Locator;
    private logisticsHeader: Locator;
    private financeHeader: Locator;

    //Dashboard section - Sub-section locators
    private presentSectionLink: Locator;
    private financialYearSectionLink: Locator;
    private lastWeekSectionLink: Locator;





    constructor(page: Page) {
        super(page);
        //Profile section locators
        this.profileDropdown = this.page.locator('#profileDropdown');
        this.messageDropdown = this.page.locator('#messageDropdown');
        this.notificationDropdown = this.page.locator('#notificationDropdown');
        this.signOutLink = this.page.locator('xpath= //a[.="Sign Out"]');
        this.toastMessage = this.page.locator('#toast-container');

        //Dashboard Header locators
        this.dashboardHeader = this.page.locator('xpath= //a[@routerlink="/dashboard"]');
        this.orgConfigHeader = this.page.locator('xpath= //a[.="Org Config"]');
        this.engineeringHeader = this.page.locator('xpath= //a[.="Engineering"]');
        this.salesAndMarketingHeader = this.page.locator('xpath= //a[.="Sales & Marketing"]');
        this.sourcingAndPlanningHeader = this.page.locator('xpath= //a[.="Sourcing & Planning"]');
        this.procurementHeader = this.page.locator('xpath= //a[.="Procurement"]');
        this.manufacturingHeader = this.page.locator('xpath= //a[.="Manufacturing"]');
        this.warehouseHeader = this.page.locator('xpath= //a[.="Warehouse"]');
        this.logisticsHeader = this.page.locator('xpath= //a[.="Logistics"]');
        this.financeHeader = this.page.locator('xpath= //a[.="Finance"]');

        //Dashboard section - Sub-section locators
        this.presentSectionLink = this.page.locator('xpath= //a[@id="ngb-nav-42"]');
        this.financialYearSectionLink = this.page.locator('xpath= //a[@id="ngb-nav-43"]');
        this.lastWeekSectionLink = this.page.locator('xpath= //a[@id="ngb-nav-44"]');





    }
    async verifyToastMessage() {
        await this.toastMessage.waitFor({ state: 'visible' });
        await expect(this.toastMessage).toBeVisible();
        const toastMessageText = await this.toastMessage.textContent();
        await expect(this.toastMessage).toHaveText('× Login Successfully!!!');
        console.log('Message: ' + toastMessageText);
    }

    async verifyDashboardHeader() {
        await expect(this.dashboardHeader).toBeVisible();

    }

    //All Navigation methods
    async navigateToOrgConfig() {
        await this.orgConfigHeader.click();
    }
    async navigateToEngineering() {
        await this.engineeringHeader.click();
    }
    async navigateToSalesAndMarketing() {
        await this.salesAndMarketingHeader.click();
    }
}