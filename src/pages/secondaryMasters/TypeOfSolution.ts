import BasePage from "../../base/BasePage";
import { Page, Locator } from "@playwright/test";

export default class TypeOfSolution extends BasePage {
    private typeOfSolutionPlusIcon: Locator;
    private typeOfSolutionTextField: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.typeOfSolutionPlusIcon = this.page.locator('xpath = //button[@class="btn btn-primary"]');
        this.typeOfSolutionTextField = this.page.locator('xpath = //input[@formcontrolname="name"]');
        this.descriptionTextarea = this.page.locator('xpath = //textarea[@formcontrolname="description"]');
        this.remarksTextarea = this.page.locator('xpath = //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggleButton = this.page.locator('xpath = //span[@class="slider round"]');
        this.saveButton = this.page.locator('xpath = (//button[normalize-space(.="Save")])[2]');
    }

    async createTypeOfSolution() {
        await this.tablePageUtil.clickAddIcon();
        await this.typeOfSolutionTextField.fill(this.secondaryMasterFakerUtils.generateName('Type Of Solution'));
        await this.descriptionTextarea.fill(this.secondaryMasterFakerUtils.generateDescription());
        await this.remarksTextarea.fill(this.secondaryMasterFakerUtils.generateRemarks());
        await this.secondaryMasterFakerUtils.generateActiveStatus();
        await this.saveButton.click();
    }
}   