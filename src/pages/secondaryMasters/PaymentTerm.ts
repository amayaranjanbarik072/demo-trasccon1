import BasePage from "../../base/BasePage";
import { Page, Locator } from "@playwright/test";
import { SecondaryMasterFaker } from "../../utils/SecondaryMasterFakerUtils";

export default class PaymentTerm extends BasePage {
    private paymentTermPlusIcon: Locator;
    private paymentTermTextField: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.paymentTermPlusIcon = this.page.locator('xpath = //button[@class="btn btn-primary"]');
        this.paymentTermTextField = this.page.locator('xpath = //input[@formcontrolname="name"]');
        this.descriptionTextarea = this.page.locator('xpath = //textarea[@formcontrolname="description"]');
        this.remarksTextarea = this.page.locator('xpath = //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggleButton = this.page.locator('xpath = //span[@class="slider round"]');
        this.saveButton = this.page.locator('xpath = //button[.="Save"]');
    }

    async createPaymentTerm() {
        await this.clickAddIcon();
        await this.paymentTermTextField.fill(SecondaryMasterFaker.generateName('Payment Term'));
        await this.descriptionTextarea.fill(SecondaryMasterFaker.generateDescription());
        await this.remarksTextarea.fill(SecondaryMasterFaker.generateRemarks());
        await SecondaryMasterFaker.generateActiveStatus();
        await this.toastContainer().waitFor({ state: 'hidden', timeout: 5000 });
        await this.saveButton.click();
        await this.verifyToast(['created', 'successfully']);
        await this.page.waitForURL(/table/);
    }
}