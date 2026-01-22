import BasePage from "../../base/BasePage";
import { expect, Locator, Page } from "@playwright/test";

export class Salutations extends BasePage {
    private salutationsPlusIcon: Locator;
    private salutationsNameTextField: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.salutationsPlusIcon = page.locator('xpath = //i[@class="mdi mdi-plus-box-outline edit-table-icon"]');
        this.salutationsNameTextField = page.locator('xpath = //input[@formcontrolname="name"]');
        this.descriptionTextarea = page.locator('xpath = //textarea[@formcontrolname="description"]');
        this.remarksTextarea = page.locator('xpath = //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggleButton = page.locator('xpath = //span[@class="slider round"]');
        this.saveButton = page.locator('xpath = //button[@class="btn btn_primary ng-star-inserted"]');

    }
    async createSalutations() {
        await this.tablePageUtil.clickAddIcon();
        await this.salutationsNameTextField.fill(this.secondaryMasterFakerUtils.generateName('Salutations'));
        await this.descriptionTextarea.fill(this.secondaryMasterFakerUtils.generateDescription());
        await this.remarksTextarea.fill(this.secondaryMasterFakerUtils.generateRemarks());
        await this.secondaryMasterFakerUtils.generateActiveStatus();
        await this.saveButton.click();
    }
    async navigateToSalutationsCreatePage() {
        await this.tablePageUtil.clickAddIcon();
    }
}   