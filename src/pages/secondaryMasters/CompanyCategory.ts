import { text } from "node:stream/consumers";
import BasePage from "../../base/BasePage";
import { expect, Locator, Page } from "@playwright/test";

export class CompanyCategory extends BasePage {
    private companyCategoryPlusIcon: Locator;
    private companyCategoryNameTextField: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.companyCategoryPlusIcon = page.locator('xpath = //i[@class="mdi mdi-plus-box-outline edit-table-icon"]');
        this.companyCategoryNameTextField = this.page.locator('xpath= //input[@formcontrolname="name"]');
        this.descriptionTextarea = this.page.locator('xpath= //textarea[@formcontrolname="description"]');
        this.remarksTextarea = this.page.locator('xpath= //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggleButton = this.page.locator('xpath= //span[@class="slider round"]');
        this.saveButton = this.page.locator('xpath= //button[.="Save"]');
    }

    // Methods To Create Company Category
    //========================================
    async createCompanyCategory() {
        await this.tablePageUtil.clickAddIcon();
        await this.companyCategoryNameTextField.fill(this.secondaryMasterFakerUtils.generateName('Company Category'));
        await this.descriptionTextarea.fill(this.secondaryMasterFakerUtils.generateDescription());
        await this.remarksTextarea.fill(this.secondaryMasterFakerUtils.generateRemarks());
        await this.secondaryMasterFakerUtils.generateActiveStatus();
        await this.saveButton.click();
    }

    async verifyCompanyCategoryCreated() {
        // await this.tablePageUtil.searchBox().fill('Company Category_15-01-2026_ZLF3F');
        // await this.page.waitForTimeout(2000);
        // await this.tablePageUtil.searchIcon().click();
        // await this.page.waitForTimeout(4000);
        expect(await this.tablePageUtil.verifyRecordPresent('Company Category_15-01-2026_ZLF3F'));
        console.log('Company Category Created Successfully');
        await this.page.waitForTimeout(2000);
    }
    async editCompanyCategory() {
        await this.tablePageUtil.clickEdit('Company Category_15-01-2026_ZLF3F');
        await this.companyCategoryNameTextField.fill(this.secondaryMasterFakerUtils.generateName('Company Category'));
        await this.descriptionTextarea.fill(this.secondaryMasterFakerUtils.generateDescription());
        await this.remarksTextarea.fill(this.secondaryMasterFakerUtils.generateRemarks());
        await this.secondaryMasterFakerUtils.generateActiveStatus();
        //await this.saveButton.click();  
        await this.page.waitForTimeout(2000);
    }
    async viewCompanyCategory() {
        await this.page.waitForTimeout(2000);
        await this.tablePageUtil.clickView('Company Category_15-01-2026_ZLF3F');
        await this.page.waitForTimeout(3000);
    }
    async pagination() {
        await this.tablePageUtil.goToNextPage();
        await this.page.waitForTimeout(2000);
        await this.tablePageUtil.goToPreviousPage();
        await this.page.waitForTimeout(2000);
        await this.tablePageUtil.goToFirstPage();
        await this.page.waitForTimeout(2000);
        await this.tablePageUtil.goToLastPage();
        await this.page.waitForTimeout(2000);
        await this.tablePageUtil.goToAnyPage(1);
        await this.page.waitForTimeout(2000);
    }

    async navigateToCompanyCategoryCreatePage() {
        await this.tablePageUtil.clickAddIcon();
    }
}
