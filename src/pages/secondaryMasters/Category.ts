import BasePage from "../../base/BasePage";
import { Page, Locator } from "@playwright/test";

export class Category extends BasePage {
    private categoryPlusIcon: Locator;
    private categoryTextfield: Locator;
    private descriptionTextarea: Locator;
    private activeStatusToggle: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.categoryPlusIcon = page.locator('xpath = //i[@class="mdi mdi-plus-box-outline edit-icon"]');
        this.categoryTextfield = page.locator('xpath= //input[@formcontrolname="name"]');
        this.descriptionTextarea = page.locator('xpath= //textarea[@formcontrolname="description"]');
        this.activeStatusToggle = page.locator('xpath= //span[@class="slider round"]');
        this.saveButton = page.locator('xpath= (//button[normalize-space(.="Save")])[2]');
    }

    async createCategory() {
        await this.tablePageUtil.clickAddIcon();
        await this.categoryTextfield.fill(this.secondaryMasterFakerUtils.generateName('Category'));
        await this.descriptionTextarea.fill(this.secondaryMasterFakerUtils.generateDescription());
        await this.secondaryMasterFakerUtils.generateActiveStatus();
        await this.saveButton.click();
    }
}