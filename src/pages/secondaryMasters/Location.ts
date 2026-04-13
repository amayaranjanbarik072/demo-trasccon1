import BasePage from "../../base/BasePage";
import { Page, Locator } from "@playwright/test";
import { warehouseData } from "../../utils/propertiesReader";
import { SecondaryMasterFaker } from "../../utils/SecondaryMasterFakerUtils";

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
        await this.clickAddIcon();
        await this.selectWarehouseDropdown.click();

        // Type from properties/config
        //await this.page.keyboard.type(warehouseData.name, { delay: 50 });
        await this.page.keyboard.type('Warehouse', { delay: 50 });

        // Wait for filter to apply
        await this.page.waitForTimeout(300);

        // Select first matched result
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(300);
        await this.locationTextfield.fill(SecondaryMasterFaker.generateName('Location'));
        await this.descriptionTextarea.fill(SecondaryMasterFaker.generateDescription());
        await this.remarksTextarea.fill(SecondaryMasterFaker.generateRemarks());
        await SecondaryMasterFaker.generateActiveStatus();
        await this.toastContainer().waitFor({ state: 'hidden', timeout: 5000 });
        await this.saveButton.click();
        await this.verifyToast(['created', 'successfully']);
        await this.page.waitForURL(/table/);
    }

}
