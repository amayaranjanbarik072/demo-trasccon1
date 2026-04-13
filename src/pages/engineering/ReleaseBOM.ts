import { Page, Locator } from '@playwright/test';
import BasePage from '../../base/BasePage';
import bomData = require('../../testData/CapturedBOMResults.json');



export class ReleaseBOM extends BasePage {
    private releaseForDropdown: Locator;
    private itemNumberOrDescriptionDropdown: Locator;
    private releaseVersionDropdown: Locator;
    private releaseNoteField: Locator;
    private uploadFileButton: Locator;
    private uploadFileField: Locator;
    private releaseButton: Locator;
    private engineeringRoleTab: Locator;
    private costingRoleTab: Locator;
    private productionRoleTab: Locator;


    constructor(page: Page) {
        super(page);
        this.releaseForDropdown = page.locator("//label[text()='Release For ']/..//ng-select//input");
        this.itemNumberOrDescriptionDropdown = page.locator("//label[text()='Item Number/Description']/..//ng-select//input");
        this.releaseVersionDropdown = page.locator("//label[text()='Release Version ']/..//ng-select//input");
        this.releaseNoteField = page.getByPlaceholder("Enter Release Note");
        this.uploadFileButton = page.locator("//label[text()='Upload File']/..//span");
        this.uploadFileField = page.locator("//label[text()='Upload File']/..//input[@formcontrolname='file']");
        this.releaseButton = page.locator("//button[.='Release']");
        this.engineeringRoleTab = page.locator("//a[@role='tab' and contains(., 'Engineering')]");
        this.costingRoleTab = page.locator("//a[@role='tab' and contains(., 'Costing')]");
        this.productionRoleTab = page.locator("//a[@role='tab' and contains(., 'Production')]");

    }
    async navigateToReleaseBOMPage() {
        await this.page.goto('/engineering/release-bom/table');
        await this.page.waitForLoadState('networkidle');
    }
    async navigateToReleaseBOMCreatePage() {
        this.navigateToReleaseBOMPage();
        await this.clickAddIcon();
    }

    async releaseFor(selection: 'Engineering' | 'Costing' | 'Production') {
        await this.navigateToReleaseBOMCreatePage();
        // 1. Open the dropdown
        await this.releaseForDropdown.click();
        // 2. Locate the specific option by its text
        // We use the 'selection' variable to filter the options
        const targetOption = this.page.locator('ng-dropdown-panel span').filter({ hasText: selection });
        // 3. Wait for the specific option to be visible (prevents strict mode error)
        await targetOption.waitFor({ state: 'visible', timeout: 10000 });
        // 4. Click it
        await targetOption.click();
        await this.page.waitForLoadState('networkidle');
    }

    async selectItemByType(type: 'FG' | 'SA') {
        // 2. Extract the item number from the JSON based on the type
        // We access the first element [0] of the array for that key
        const itemToSelect = bomData[type][0].itemNumber;
        // 3. Open the dropdown
        await this.itemNumberOrDescriptionDropdown.click();
        // 4. Handle the ng-select: Type the item number to filter the list
        // This is more reliable than scrolling through a long list 
        await this.itemNumberOrDescriptionDropdown.fill(itemToSelect);
        // 5. Select the matching option from the dropdown panel
        const option = this.page.locator('ng-dropdown-panel span', { hasText: itemToSelect });
        await option.waitFor({ state: 'visible', timeout: 10000 });
        await option.click();
        await this.page.waitForLoadState('networkidle');
    }
    async selectReleaseVersion(type: 'FG' | 'SA') {
        const versionToSelect = bomData[type][0].revNumber;
        await this.releaseVersionDropdown.click();
        await this.releaseForDropdown.fill(versionToSelect);
        const option = this.page.locator('ng-dropdown-panel span', { hasText: versionToSelect });
        await option.waitFor({ state: 'visible', timeout: 10000 });
        await option.click();
        await this.page.waitForLoadState('networkidle');
    }
    async fillReleaseNote() {
        await this.releaseNoteField.fill('Released');
    }
    async clickRelease() {
        await this.robustClick(this.releaseButton);
    }


    async releaseBOMEngineering(type: 'SA' | 'FG') {
        // this.navigateToReleaseBOMCreatePage();
        await this.releaseFor('Engineering');
        await this.selectItemByType(type);
        await this.selectReleaseVersion(type);
        await this.fillReleaseNote();
        await this.clickRelease();
        console.log("Released Item No: ", bomData[type][0].itemNumber);
        //Validations
        await this.verifyToast("Successfully");
        await this.verifyRecordPresent(bomData[type][0].itemNumber);
        await this.expectActionVisible(bomData[type][0].itemNumber, 'eye');
        await this.costingRoleTab.click();
        try {
            await this.verifyRecordPresent(bomData[type][0].itemNumber);
            await this.expectActionVisible(bomData[type][0].itemNumber, 'eye');
        } catch (error) {
            console.log("Item Number :" + bomData[type][0].itemNumber + " is not present in costing");
        }
        await this.productionRoleTab.click();
        try {
            await this.verifyRecordPresent(bomData[type][0].itemNumber);
            await this.expectActionVisible(bomData[type][0].itemNumber, 'eye');
        } catch (error) {
            console.log("Item Number :" + bomData[type][0].itemNumber + " is not present in Production");
        }
    }
    async releaseBOMCosting(type: 'SA' | 'FG') {
        //this.navigateToReleaseBOMCreatePage();
        await this.releaseFor('Costing');
        await this.selectItemByType(type);
        await this.selectReleaseVersion(type);
        await this.fillReleaseNote();
        await this.clickRelease();
        //Validations
        await this.verifyToast("Successfully");
        console.log("Released Item No: ", bomData[type][0].itemNumber);
        await this.verifyRecordPresent(bomData[type][0].itemNumber);
        await this.expectActionVisible(bomData[type][0].itemNumber, 'eye');

        await this.costingRoleTab.click();
        try {
            await this.verifyRecordPresent(bomData[type][0].itemNumber);
            await this.expectActionVisible(bomData[type][0].itemNumber, 'eye');
        } catch (error) {
            console.log("Item Number :" + bomData[type][0].itemNumber + " is not present in Costing");
        }

        await this.productionRoleTab.click();
        try {
            await this.verifyRecordPresent(bomData[type][0].itemNumber);
            await this.expectActionVisible(bomData[type][0].itemNumber, 'eye');
        } catch (error) {
            console.log("Item Number :" + bomData[type][0].itemNumber + " is not present in Production");
        }
    }
    async releaseBOMProduction(type: 'SA' | 'FG') {
        // this.navigateToReleaseBOMCreatePage();
        await this.releaseFor('Production');
        await this.selectItemByType(type);
        await this.selectReleaseVersion(type);
        await this.fillReleaseNote();
        await this.clickRelease();
        //Validations
        await this.verifyToast("Successfully");
        console.log("Released Item No: ", bomData[type][0].itemNumber);
        await this.verifyRecordPresent(bomData[type][0].itemNumber);
        await this.expectActionVisible(bomData[type][0].itemNumber, 'eye');
        await this.costingRoleTab.click();
        try {
            await this.verifyRecordPresent(bomData[type][0].itemNumber);
            await this.expectActionVisible(bomData[type][0].itemNumber, 'eye');
        } catch (error) {
            console.log("Item Number :" + bomData[type][0].itemNumber + " is not present in Costing");
        }
        await this.productionRoleTab.click();
        try {
            await this.verifyRecordPresent(bomData[type][0].itemNumber);
            await this.expectActionVisible(bomData[type][0].itemNumber, 'eye');
        } catch (error) {
            console.log("Item Number :" + bomData[type][0].itemNumber + " is not present in Production");
        }
    }
}