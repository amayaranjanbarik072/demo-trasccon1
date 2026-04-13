import BasePage from "../../base/BasePage";
import { Page, Locator } from "@playwright/test";
import { SecondaryMasterFaker } from "../../utils/SecondaryMasterFakerUtils";

export default class BankName extends BasePage {
    private bankNamePlusIcon: Locator;
    private bankNameTextField: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.bankNamePlusIcon = this.page.locator('xpath = //button[@class="btn btn-primary"]');
        this.bankNameTextField = this.page.locator('xpath = //input[@formcontrolname="name"]');
        this.descriptionTextarea = this.page.locator('xpath = //textarea[@formcontrolname="description"]');
        this.remarksTextarea = this.page.locator('xpath = //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggleButton = this.page.locator('xpath = //span[@class="slider round"]');
        this.saveButton = this.page.locator('xpath = //button[.="Save"]');
    }

    async createBankName() {
        // await this.tablePageUtil.clickAddIcon();
        await this.clickAddIcon();
        await this.bankNameTextField.fill(SecondaryMasterFaker.generateName('Bank Name'));
        await this.descriptionTextarea.fill(SecondaryMasterFaker.generateDescription());
        await this.remarksTextarea.fill(SecondaryMasterFaker.generateRemarks());
        await SecondaryMasterFaker.generateActiveStatus();
        // STEP 1: Ensure any old toast (Login) is gone before clicking Save
        await this.toastContainer().waitFor({ state: 'hidden', timeout: 5000 });
        await this.saveButton.click();
        await this.page.waitForTimeout(2000);
        await this.verifyToast(['created', 'successfully']);
        await this.page.waitForURL(/table/);
    }
}
