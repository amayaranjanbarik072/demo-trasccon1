import BasePage from "../../base/BasePage";
import { Page, Locator, expect } from "@playwright/test";

export default class PriceList extends BasePage {
    private priceListPlusIcon: Locator;
    private priceListTextfield: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.priceListPlusIcon = page.locator('xpath = //button[@class="mdi mdi-plus-box-outline"]');
        this.priceListTextfield = page.locator('xpath = //input[@formcontrolname="name"]');
        this.descriptionTextarea = page.locator('xpath = //textarea[@formcontrolname="description"]');
        this.remarksTextarea = page.locator('xpath = //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggleButton = page.locator('xpath = //span[@class="slider round"]');
        this.saveButton = page.locator('xpath = //button[.="Save"]');
    }
    async createPriceList() {
        await this.tablePageUtil.clickAddIcon();
        await this.priceListTextfield.fill(this.secondaryMasterFakerUtils.generateName('PriceList'));
        await this.descriptionTextarea.fill(this.secondaryMasterFakerUtils.generateDescription());
        await this.remarksTextarea.fill(this.secondaryMasterFakerUtils.generateRemarks());
        await this.secondaryMasterFakerUtils.generateActiveStatus();
        await this.saveButton.click();
    }
}