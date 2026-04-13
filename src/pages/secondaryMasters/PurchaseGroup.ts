import { Locator, Page } from "@playwright/test";
import BasePage from "../../base/BasePage";
import { SecondaryMasterFaker } from "../../utils/SecondaryMasterFakerUtils";

export default class PurchaseGroup extends BasePage {
    private purchaseGroupPlusIcon: Locator;
    private purchaseGroupNameTextField: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.purchaseGroupPlusIcon = this.page.locator('xpath = //button[@class="btn btn-primary"]');
        this.purchaseGroupNameTextField = this.page.locator('xpath = //input[@formcontrolname="name"]');
        this.descriptionTextarea = this.page.locator('xpath = //textarea[@formcontrolname="description"]');
        this.remarksTextarea = this.page.locator('xpath = //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggleButton = this.page.locator('xpath = //span[@class="slider round"]');
        this.saveButton = this.page.locator('xpath = //button[.="Save"]');
    }

    async createPurchaseGroup() {
        await this.clickAddIcon();
        await this.purchaseGroupNameTextField.fill(SecondaryMasterFaker.generateName('Purchase Group'));
        await this.descriptionTextarea.fill(SecondaryMasterFaker.generateDescription());
        await this.remarksTextarea.fill(SecondaryMasterFaker.generateRemarks());
        await SecondaryMasterFaker.generateActiveStatus();
        await this.toastContainer().waitFor({ state: 'hidden', timeout: 5000 });
        await this.saveButton.click();
        await this.verifyToast(['created', 'successfully']);
        await this.page.waitForURL(/table/);
    }
}