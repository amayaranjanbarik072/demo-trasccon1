import BasePage from "../../base/BasePage";
import { expect, Locator, Page } from "@playwright/test";
export class CreateCompanyMasterPage extends BasePage {
   private companyIdTextfield: Locator;
   private companyNameTextfield: Locator;
   private companyAliasTextfield: Locator;
   private activeStatusToggleButton: Locator;

   //General section locators
   private generalLink: Locator;
   private companyTypeDropdown: Locator;
   private addressTextarea: Locator;
   private cityTextfield: Locator;
   private stateTextfield: Locator;
   private countryDropdown: Locator;
   private pinOrCodeTextfield: Locator;
   private purchaseGroupDropdown: Locator;
   private boardNumberTextfield: Locator;
   private websiteTextfield: Locator;
   private generalEmailTextfield: Locator;
   private currencyDropdown: Locator;
   private googlePinLocationTextfield: Locator;
   private typeOfCompanyDropdown: Locator;
   private exportUnitTypeDropdown: Locator;
   private msmeToggleButton: Locator;
   private saveButton: Locator;

   //Contacts section locators
   private salutationDropdown: Locator;
   private firstNameTextfield: Locator;
   private lastNameTextfield: Locator;
   private callNameTextfield: Locator;
   private designationTextfield: Locator;
   private departmentDropdown: Locator;
   private mobileNumberCountryCodeDropdown: Locator;
   private mobileNumberTextfield: Locator;  
   private alternameMobileNumberCountryCodeDropdown: Locator;
   private alternameMobileNumberTextfield: Locator;
   private emailTextfield: Locator;
   private landLineTextfield: Locator;
   private extensionTextfield: Locator;
   private timeToCallTextfield: Locator;
   private TimeToCallTimePicker: Locator;
   private languageDropdown: Locator;
   private primaryToggleButton: Locator;
   private activeToggleButton: Locator;
   private addButton: Locator;


    constructor(page: Page) {
        super(page);
        this.companyIdTextfield = this.page.locator('xpath= //input[@placeholder="Enter Company ID"]');
        this.companyNameTextfield = this.page.locator('xpath= //input[@placeholder="Enter Company Name"]');
        this.companyAliasTextfield = this.page.locator('xpath= //input[@placeholder="Enter Company Alias"]');
        this.activeStatusToggleButton = this.page.locator('xpath= (//span[@class="slider round"])[1]');
    }

    async verifyCompanyIdTextfield() {
         await this.companyIdTextfield.isVisible();
         await expect(this.companyIdTextfield.isVisible()).toBeTruthy();
         console.log(await this.companyIdTextfield.getAttribute('placeholder'));
         await this.companyIdTextfield.fill('C001');
         await this.page.waitForTimeout(2000);
         console.log('Filled Company ID: ' + await this.companyIdTextfield.inputValue());
    }

    async verifyCompanyNameTextfield() {
        await expect(this.companyNameTextfield.isVisible()).toBeTruthy();

    }

    async verifyCompanyAliasTextfield() {
        await expect(this.companyAliasTextfield.isVisible()).toBeTruthy();
    }

    async verifyActiveStatusToggleButton() {
        await expect(this.activeStatusToggleButton.isVisible()).toBeTruthy();
    }




    
    }

