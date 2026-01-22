import BasePage from "../../base/BasePage";
import { Page, Locator, expect } from "@playwright/test";

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
        await this.tablePageUtil.clickAddIcon();
        await this.riskCategoryTextField.fill(this.secondaryMasterFakerUtils.generateName('Risk Category'));
        await this.descriptionTextarea.fill(this.secondaryMasterFakerUtils.generateDescription());
        await this.secondaryMasterFakerUtils.generateActiveStatus();
        await this.saveButton.click();
    }

}   