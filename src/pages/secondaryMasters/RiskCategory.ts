import BasePage from "../../base/BasePage";
import { Page, Locator, expect } from "@playwright/test";
import { SecondaryMasterFaker } from "../../utils/SecondaryMasterFakerUtils";

export default class RiskCategory extends BasePage {
    private riskCategoryPlusIcon: Locator;
    private riskCategoryTextField: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;
    private saveButton1: Locator;

    constructor(page: Page) {
        super(page);
        this.riskCategoryPlusIcon = this.page.locator('xpath = //button[@class="btn btn-primary"]');
        this.riskCategoryTextField = this.page.locator('xpath = //input[@formcontrolname="name"]');
        this.descriptionTextarea = this.page.locator('xpath = //textarea[@formcontrolname="description"]');
        this.remarksTextarea = this.page.locator('xpath = //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggleButton = this.page.locator('xpath = //span[@class="slider round"]');
        this.saveButton = this.page.locator('xpath = //button[.="Save"]');
        this.saveButton1 = this.page.locator('//button[normalize-space()="Save" and not(@disabled)]');

    }

    async createRiskCategory() {
        await this.clickAddIcon();
        await this.riskCategoryTextField.fill(SecondaryMasterFaker.generateName('Risk Category'));
        await this.descriptionTextarea.fill(SecondaryMasterFaker.generateDescription());
        await SecondaryMasterFaker.generateActiveStatus();
        await this.toastContainer().waitFor({ state: 'hidden', timeout: 5000 });
        await this.saveButton.click();
        await this.verifyToast(['created', 'successfully']);
        await this.page.waitForURL(/table/);
    }
}   