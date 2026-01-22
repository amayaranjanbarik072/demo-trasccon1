import BasePage from "../../base/BasePage";
import { Page, Locator } from "@playwright/test";
import { warehouseData } from "../../utils/propertiesReader";

export default class LocationWarehouse extends BasePage {
    private locationPlusIcon: Locator;
    private selectWarehouseDropdown: Locator;
    private locationTextfield: Locator;
    private descriptionTextarea: Locator;
    private remarksTextarea: Locator;
    private activeStatusToggleButton: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.locationPlusIcon = page.locator('xpath = //button[@class="btn btn-primary"]');
        this.selectWarehouseDropdown = page.locator('xpath = //div[@class="ng-select-container ng-has-value"]');
        this.locationTextfield = page.locator('xpath = //input[@formcontrolname="name"]');
        this.descriptionTextarea = page.locator('xpath = //textarea[@formcontrolname="description"]');
        this.remarksTextarea = page.locator('xpath = //textarea[@formcontrolname="remarks"]');
        this.activeStatusToggleButton = page.locator('xpath = //span[@class="slider round"]');
        this.saveButton = page.locator('xpath = //button[.="Save"]');
    }
    async createLocation() {
        await this.tablePageUtil.clickAddIcon();
        await this.selectWarehouseDropdown.click();

        // Type from properties/config
        await this.page.keyboard.type(warehouseData.name, { delay: 50 });

        // Wait for filter to apply
        await this.page.waitForTimeout(300);

        // Select first matched result
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(300);
        await this.locationTextfield.fill(this.secondaryMasterFakerUtils.generateName('Location'));
        await this.descriptionTextarea.fill(this.secondaryMasterFakerUtils.generateDescription());
        await this.remarksTextarea.fill(this.secondaryMasterFakerUtils.generateRemarks());
        await this.secondaryMasterFakerUtils.generateActiveStatus();
        await this.saveButton.click();
    }

}
