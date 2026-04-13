import { Page, Locator, expect } from "@playwright/test";
import BasePage from "../../base/BasePage";
import { faker } from '@faker-js/faker';
import { JsonUtil } from "../../utils/JsonUtil";
import { FakerUtil } from "../../utils/FakerUtil";
import { DateUtil } from "../../utils/DateUtil";

export class CompanyMaster extends BasePage {

    // ================= HEADER ELEMENTS =================
    private companyIdField: Locator;
    private companyNameField: Locator;
    private companyAliasField: Locator;
    private activeStatusToggle: Locator;
    private saveButton: Locator;
    private options: Locator;

    // ================= TAB NAVIGATION =================
    private generalTab: Locator;
    private contactsTab: Locator;
    private relatedCompanyLinkTab: Locator;
    private addressesTab: Locator;
    private bankingTab: Locator;
    private termsTab: Locator;
    private statutoryTab: Locator;
    private certificationsDocsTab: Locator;
    private detailsTab: Locator;
    private companyApprovalTab: Locator;
    private infoTab: Locator;

    // ================= GENERAL TAB ELEMENTS (Column 1) =================
    private companyTypeDropdown: Locator;
    private addressField: Locator;
    private cityField: Locator;
    private stateField: Locator;
    private countryDropdown: Locator;
    private zipCodeField: Locator;
    private purchaseGroupDropdown: Locator;
    private boardNumberField: Locator;
    private websiteField: Locator;
    private generalEmailField: Locator;
    private currencyDropdown: Locator;
    private googlePinLocationField: Locator;
    private typeOfCompanyDropdown: Locator;
    private exportUnitTypeDropdown: Locator;
    private generalMsmeToggle: Locator;

    // ================= Contacts Tab =================
    private salutationDropdown: Locator;
    private firstNameField: Locator;
    private lastNameField: Locator;
    private callNameField: Locator;
    private designationField: Locator;
    private departmentDropdown: Locator;
    private mobileNumberCountryDropdown: Locator;
    private mobileNumberField: Locator;
    private alternateMobileCountryDropdown: Locator;
    private alternateMobileField: Locator;
    private emailField: Locator;
    private landLineField: Locator;
    private extensionField: Locator;
    private timeToCallPicker: Locator;
    private languageDropdown: Locator;
    private contactPrimaryToggle: Locator;
    private contactActiveToggle: Locator;
    private contactAddButton: Locator;

    // ================= Related Company Link Tab =================
    private companyDropdown: Locator;
    private natureOfRelationshipDropdown: Locator;
    private companyAliasReadonlyField: Locator;

    //====================Addresses Tab====================
    private poAddressField: Locator;
    private sameAsGeneralCheckbox: Locator;
    private gstnNumberField: Locator;
    private panNumberField: Locator;
    private addressActiveToggle: Locator;
    private addressAddButton: Locator;

    //====================Banking Tab====================
    private bankNameDropdown: Locator;
    private branchField: Locator;
    private accountNumberField: Locator;
    private ifscCodeField: Locator;
    private swiftCodeField: Locator;
    private ibanCodeField: Locator;
    private primaryToggle: Locator;
    private activeToggle: Locator;
    private bankAddButton: Locator;

    //====================Terms Tab====================
    private advanceField: Locator;
    private paymentTermsDropdown: Locator;
    private incoTermsDropdown: Locator;
    private specialTermsField: Locator;
    private preferredFreightForwarderDropdown: Locator;

    //====================Statutory Tab====================
    private incorpotationToggle: Locator;
    private tinToggle: Locator;
    private gstToggle: Locator;
    private iecToggle: Locator;
    private panToggle: Locator;
    private udhyamCertificateToggle: Locator;
    private statutoryMsmeToggle: Locator;

    //====================Certifications & Docs Tab====================
    private isoToggle: Locator;
    private asToggle: Locator;
    private medicalToggle: Locator;
    private nadcapToggle: Locator;

    //====================Details Tab====================
    private turnOverField: Locator;
    private dnbNumberField: Locator;
    private icraField: Locator;
    private headCountExpansionPanel: Locator;
    private headCountField: Locator;
    private skillOrDepartmentField: Locator;
    private noOfPeopleField: Locator;
    private headCountAddButton: Locator;
    private capacityField: Locator;
    private floorSpaceField: Locator;
    private machineField: Locator;
    private toolsAndEquipField: Locator;
    private uomDropdown: Locator;
    private sqftField: Locator;
    private erpToggle: Locator;
    private erpField: Locator;
    private esdSetupRadioButtonYes: Locator;
    private esdSetupRadioButtonNo: Locator;
    private esdSetupRadioButonNA: Locator;
    private hazmatSetupRadioButtonYes: Locator;
    private hazmatSetupRadioButtonNo: Locator;
    private hazmatSetupRadioButonNA: Locator;
    private ospToggle: Locator;
    private ospField: Locator;

    //====================Company Approval Tab====================
    private scopeOfSupplyDropdown: Locator;
    private companyCategoryDropdown: Locator;
    private basisOfApprovalDropdown: Locator;
    private inventoryItemToggle: Locator;
    private approvalStatusRadioButtonApproved: Locator;
    private approvalStatusRadioButtonConditionallyApproved: Locator;
    private approvalStatusRadioButtonNotApproved: Locator;
    private approvalStatusRadioButtonUnderObservation: Locator;
    private approvalByField: Locator;
    private reAuditToggle: Locator;
    private approvalDateField: Locator;
    private uploadFileField: Locator;
    private auditFrequencyDropdown: Locator;

    //====================Info Tab====================
    //Coming Soon

    constructor(page: Page) {
        super(page);
        this.page = page;
        // Main level Items        
        this.companyIdField = page.locator('xpath= //input[@formcontrolname="companyNumber"]');
        this.companyNameField = page.locator('xpath= //input[@formcontrolname="companyName"]');
        this.companyAliasField = page.locator('xpath= //input[@formcontrolname="companyAlias"]');
        this.activeStatusToggle = page.locator('xpath= //input[@formcontrolname="isActive"]/..//span[@class="slider round"]');
        this.saveButton = page.locator('xpath= //button[.="Save"]');
        // Navigation Tabs
        this.generalTab = page.locator('xpath= //a[normalize-space()="General"]');
        this.contactsTab = page.locator('xpath= //a[normalize-space()="Contacts"]');
        this.relatedCompanyLinkTab = page.locator('xpath= //a[normalize-space()="Related Company Link"]');
        this.addressesTab = page.locator('xpath= //a[normalize-space()="Addresses"]');
        this.bankingTab = page.locator('xpath= //a[normalize-space()="Banking"]');
        this.termsTab = page.locator('xpath= //a[normalize-space()="Terms"]');
        this.statutoryTab = page.locator('xpath= //a[normalize-space()="Statutory"]');
        this.certificationsDocsTab = page.locator('xpath= //a[normalize-space()="Certifications/Docs"]');
        this.detailsTab = page.locator('xpath= //a[normalize-space()="Details"]');
        this.companyApprovalTab = page.locator('xpath= //a[normalize-space()="Company Approval"]');
        this.infoTab = page.locator('xpath= //a[normalize-space()="Info"]');
        // General Tab Elements
        this.companyTypeDropdown = page.locator("xpath= //label[normalize-space(text())='Company Type']/..//ng-select[@placeholder='Select Company Type']");
        this.addressField = page.locator('xpath= //textarea[@formcontrolname="address"]');
        this.cityField = page.locator('xpath= //input[@formcontrolname="city"]');
        this.stateField = page.locator('xpath= //input[@formcontrolname="state"]');
        this.countryDropdown = page.locator('xpath= //label[normalize-space(text())="Country"]/..//ng-select[@formcontrolname="country"]');
        this.zipCodeField = page.locator('xpath= //input[@formcontrolname="pin_zip_code"]');
        this.purchaseGroupDropdown = page.locator('xpath= //label[normalize-space(text())="Purchase Group"]/..//ng-select[@formcontrolname="purchaseGroup"]');
        this.boardNumberField = page.locator('xpath= //input[@formcontrolname="board_no"]');
        this.websiteField = page.locator('xpath= //input[@formcontrolname="website"]');
        this.generalEmailField = page.locator('xpath= //input[@formcontrolname="gen_email"]');
        this.currencyDropdown = page.locator('xpath= //label[normalize-space(text())="Currency"]/..//ng-select[@formcontrolname="currency"]');
        this.googlePinLocationField = page.locator('xpath= //input[@formcontrolname="google_pin_location"]');
        this.typeOfCompanyDropdown = page.locator('xpath= //label[normalize-space(text())="Type Of Company"]/..//ng-select[@formcontrolname="type_of_company"]');
        this.exportUnitTypeDropdown = page.locator('xpath= //label[normalize-space(text())="Export Unit Type"]/..//ng-select[@formcontrolname="export_unit_type"]');
        this.generalMsmeToggle = page.locator('xpath= //input[@formcontrolname="msme"]/..//span[@class="slider round"]');
        //Contacts Tab Elements
        this.salutationDropdown = page.locator('xpath= //label[normalize-space(text())="Salutation"]/..//ng-select[@formcontrolname="salutation"]');
        this.firstNameField = page.locator('xpath= //input[@formcontrolname="first_name"]');
        this.lastNameField = page.locator('xpath= //input[@formcontrolname="last_name"]');
        this.callNameField = page.locator('xpath= //input[@formcontrolname="call_name"]');
        this.designationField = page.locator('xpath= //input[@formcontrolname="designation"]');
        this.departmentDropdown = page.locator('xpath= //label[normalize-space(text())="Department"]/..//ng-select[@formcontrolname="department"]');
        this.mobileNumberCountryDropdown = page.locator('xpath= //label[normalize-space(text())="Mobile Number"]/..//ng-select[@formcontrolname="country_code"]');
        this.mobileNumberField = page.locator('xpath= //input[@formcontrolname="mobile_no"]');
        this.alternateMobileCountryDropdown = page.locator('xpath= //label[normalize-space(text())="Alternate Mobile No."]/..//ng-select[@formcontrolname="alt_country_code"]');
        this.alternateMobileField = page.locator('xpath= //input[@formcontrolname="alt_mobile_no"]');
        this.emailField = page.locator('xpath= //input[@formcontrolname="email_contact"]');
        this.landLineField = page.locator('xpath= //input[@formcontrolname="land_line"]');
        this.extensionField = page.locator('xpath= //input[@formcontrolname="extension"]');
        this.timeToCallPicker = page.locator('xpath= //input[@formcontrolname="time_to_call"]');
        this.languageDropdown = page.locator('xpath= //label[normalize-space(text())="Language"]/..//ng-select[@formcontrolname="language"]');
        this.contactPrimaryToggle = page.locator('xpath= //input[@formcontrolname="primary_contact"]/..//span[@class="slider round"]');
        this.contactActiveToggle = page.locator('xpath= //input[@formcontrolname="active_contact"]/..//span[@class="slider round"]');
        this.contactAddButton = page.locator('xpath= //button[.="Add"]');
        //Related Company Link Tab
        this.companyDropdown = page.locator('xpath= //label[normalize-space(text())="Company"]/..//ng-select[@formcontrolname="relatedCompanyName"]');
        this.natureOfRelationshipDropdown = page.locator('xpath= //label[normalize-space(text())="Nature Of Relationship"]/..//ng-select[@formcontrolname="nature_of_relationship"]');
        this.companyAliasReadonlyField = page.locator('xpath= //label[normalize-space(text())="Company Alias"]/..//input[@readonly]');
        //Address Tab Elements
        this.poAddressField = page.locator('xpath= //textarea[@formcontrolname="po_address"]');
        this.sameAsGeneralCheckbox = page.locator('xpath= //input[@formcontrolname="sameAsAddress"]');
        this.gstnNumberField = page.locator('xpath= //input[@formcontrolname="gstn_no"]');
        this.panNumberField = page.locator('xpath= //input[@formcontrolname="pan_no"]');
        this.addressActiveToggle = page.locator('xpath= //input[@formcontrolname="active_Address"]/..//span[@class="slider round"]');
        this.addressAddButton = page.locator('xpath= //button[.="Add"]');
        //Banking Tab Elements
        this.bankNameDropdown = page.locator('xpath= //label[normalize-space(text())="Bank Name"]/..//ng-select[@formcontrolname="bank_name"]');
        this.branchField = page.locator('xpath= //input[@formcontrolname="branch"]');
        this.accountNumberField = page.locator('xpath= //input[@formcontrolname="account_number"]');
        this.ifscCodeField = page.locator('xpath= //input[@formcontrolname="ifsc_code"]');
        this.swiftCodeField = page.locator('xpath= //input[@formcontrolname="swift_code"]');
        this.ibanCodeField = page.locator('xpath= //input[@formcontrolname="iban_code"]');
        this.primaryToggle = page.locator('xpath= //input[@formcontrolname="primary_bank"]/..//span[@class="slider round"]');
        this.activeToggle = page.locator('xpath= //input[@formcontrolname="active_bank"]/..//span[@class="slider round"]');
        this.bankAddButton = page.locator('xpath= //button[.="Add"]');

        //Terms Tab Elements
        this.advanceField = page.locator('xpath= //input[@formcontrolname="advance"]');
        this.paymentTermsDropdown = page.locator('xpath= //label[normalize-space(text())="Payment Terms"]/..//ng-select[@formcontrolname="payment_terms"]');
        this.incoTermsDropdown = page.locator('xpath= //label[normalize-space(text())="INCO Terms"]/..//ng-select[@formcontrolname="inco_terms"]');
        this.specialTermsField = page.locator('xpath= //textarea[@formcontrolname="special_terms"]');
        this.preferredFreightForwarderDropdown = page.locator('xpath= //label[normalize-space(text())="Preferred Freight Forwarder"]/..//ng-select[@formcontrolname="preferred_freight_forwarder"]');

        //Statutory Tab Elements
        this.incorpotationToggle = page.locator('xpath= //input[@formcontrolname="incorporation_check"]/..//span[@class="slider round"]');
        this.tinToggle = page.locator('xpath= //input[@formcontrolname="tin"]/..//span[@class="slider round"]');
        this.gstToggle = page.locator('xpath= //input[@formcontrolname="gst"]/..//span[@class="slider round"]');
        this.iecToggle = page.locator('xpath= //input[@formcontrolname="iec"]/..//span[@class="slider round"]');
        this.panToggle = page.locator('xpath= //input[@formcontrolname="pan"]/..//span[@class="slider round"]');
        this.udhyamCertificateToggle = page.locator('xpath= //input[@formcontrolname="udhyam_certi"]/..//span[@class="slider round"]');
        this.statutoryMsmeToggle = page.locator('xpath= //input[@formcontrolname="msme_cer"]/..//span[@class="slider round"]');

        //Certifications & Docs Tab Elements    
        this.isoToggle = page.locator('xpath= //input[@formcontrolname="iso"]/..//span[@class="slider round"]');
        this.asToggle = page.locator('xpath= //input[@formcontrolname="as"]/..//span[@class="slider round"]');
        this.medicalToggle = page.locator('xpath= //input[@formcontrolname="medical"]/..//span[@class="slider round"]');
        this.nadcapToggle = page.locator('xpath= //input[@formcontrolname="nadcap"]/..//span[@class="slider round"]');

        //Details Tab Elements
        this.turnOverField = page.locator('xpath= //input[@formcontrolname="turn_over"]');
        this.dnbNumberField = page.locator('xpath= //input[@formcontrolname="dnb_number"]');
        this.icraField = page.locator('xpath= //input[@formcontrolname="indian_credit_no"]');
        this.headCountExpansionPanel = page.locator('xpath= //mat-expansion-panel-header[.//b[contains(text(), "Head Count")]]');
        this.headCountField = page.locator('xpath= //input[@formcontrolname="head_count"]');
        this.skillOrDepartmentField = page.locator('xpath= //input[@formcontrolname="skill"]');
        this.noOfPeopleField = page.locator('xpath= //input[@formcontrolname="qty"]');
        this.headCountAddButton = page.locator('xpath= //button[.="Add"]');
        this.capacityField = page.locator('xpath= //input[@formcontrolname="capacity"]');
        this.floorSpaceField = page.locator('xpath= //input[@formcontrolname="Floor_space"]');
        this.machineField = page.locator('xpath= //input[@formcontrolname="machine"]');
        this.toolsAndEquipField = page.locator('xpath= //input[@formcontrolname="tools_equip"]');
        this.uomDropdown = page.locator('xpath= //label[normalize-space(text())="UOM"]/..//ng-select[@formcontrolname="uom_capacity"]');
        this.sqftField = page.locator('xpath= //input[@formcontrolname="sqft"]');
        this.erpToggle = page.locator('xpath= //input[@formcontrolname="erp_check"]/..//span[@class="slider round"]');
        this.erpField = page.locator('xpath= //input[@formcontrolname="erp"]');
        this.esdSetupRadioButtonYes = page.locator('xpath= //input[@id="yes" and @formcontrolname="esd_setup"]');
        this.esdSetupRadioButtonNo = page.locator('xpath= //input[@id="no" and @formcontrolname="esd_setup"]');
        this.esdSetupRadioButonNA = page.locator('xpath= //input[@id="n_a" and @formcontrolname="esd_setup"]');
        this.hazmatSetupRadioButtonYes = page.locator('xpath= //input[@id="yes" and @formcontrolname="hazmat_setup"]');
        this.hazmatSetupRadioButtonNo = page.locator('xpath= //input[@id="no" and @formcontrolname="hazmat_setup"]');
        this.hazmatSetupRadioButonNA = page.locator('xpath= //input[@id="n_a" and @formcontrolname="hazmat_setup"]');
        this.ospToggle = page.locator('xpath= //input[@formcontrolname="osp_check"]/..//span[@class="slider round"]');
        this.ospField = page.locator('xpath= //textarea[@formcontrolname="osp"]');

        //====================Company Approval Tab====================
        this.scopeOfSupplyDropdown = page.locator('xpath= //label[normalize-space(text())="Scope of Supply"]/..//ng-select[@formcontrolname="scope_of_supply"]');
        this.companyCategoryDropdown = page.locator('xpath= //label[normalize-space(text())="Company Category"]/..//ng-select[@formcontrolname="companyCategory"]');
        this.basisOfApprovalDropdown = page.locator('xpath= //label[normalize-space(text())="Basis of Approval"]/..//ng-select[@formcontrolname="basis_of_approval"]');
        this.inventoryItemToggle = page.locator('xpath= //input[@formcontrolname="inventory_item"]/..//span[@class="slider round"]');
        this.approvalStatusRadioButtonApproved = page.locator('xpath= //input[@value="approved"]');
        this.approvalStatusRadioButtonConditionallyApproved = page.locator('xpath= //input[@value="conditionallyApproved"]');
        this.approvalStatusRadioButtonNotApproved = page.locator('xpath= //input[@value="notApproved"]');
        this.approvalStatusRadioButtonUnderObservation = page.locator('xpath= //input[@value="underObservation"]');
        this.approvalByField = page.locator('xpath= //input[@formcontrolname="approval_by"]');
        this.reAuditToggle = page.locator('xpath= //input[@formcontrolname="re_audit"]/..//span[@class="slider round"]');
        this.approvalDateField = page.locator('xpath= //input[@formcontrolname="approval_date"]');
        this.uploadFileField = page.locator('xpath= //label[normalize-space(text())="Upload"]/..//div[@class="form-group input-group data_field"]');
        this.auditFrequencyDropdown = page.locator('xpath= //label[normalize-space(text())="Audit Frequency"]/..//ng-select[@formcontrolname="audit_frequency"]');

        this.options = page.locator("//div[contains(@class,'ng-dropdown-panel')]//div/span");
    }
    // ============================Methods================================
    //====================================================================
    async fillCompanyIdAndName(data: any, manualId?: string, manualName?: string) {
        data.companyName = manualName || data.companyName;
        data.companyId = manualId || data.companyId;
        await this.companyIdField.fill(data.companyId);
        await this.companyNameField.fill(data.companyName);
        await this.companyAliasField.fill(data.companyAlias);
    }
    async fillGeneralTab(data: any) {
        const dropdowns = [
            this.companyTypeDropdown,
            this.countryDropdown,
            this.purchaseGroupDropdown,
            this.currencyDropdown,
            this.typeOfCompanyDropdown,
            this.exportUnitTypeDropdown
        ]
        for (const dropdown of dropdowns) {
            await dropdown.click();
            if (dropdown === this.countryDropdown) {
                await this.page.keyboard.type('India');
                await this.page.keyboard.press('Enter');
            } else {
                await this.options.first().click();
            }
        }
        await this.addressField.fill(data.address);
        await this.cityField.fill(data.city);
        await this.stateField.fill(data.state);
        await this.zipCodeField.fill(data.zipCode);
        await this.boardNumberField.fill(data.boardNumber);
        await this.websiteField.fill(data.website);
        await this.generalEmailField.fill(data.email);
        await this.googlePinLocationField.fill(data.googlePin);
        await this.page.waitForTimeout(2000);
    }
    async fillContactsTab(data: any) {
        await this.contactsTab.click();
        await this.firstNameField.fill(data.firstName);
        await this.lastNameField.fill(data.lastName);
        await this.callNameField.fill(data.callName);
        await this.designationField.fill(data.designation);
        const dropdowns = [
            this.salutationDropdown,
            this.departmentDropdown,
            this.languageDropdown
        ]
        for (const dropdown of dropdowns) {
            await dropdown.click();
            await this.options.first().click();
        }
        const countryCodeDropdown = [
            this.mobileNumberCountryDropdown,
            this.alternateMobileCountryDropdown
        ]
        for (const dropdown of countryCodeDropdown) {
            await dropdown.click();
            await this.page.keyboard.type('+91');
            await this.page.keyboard.press('Enter');
        }
        await this.mobileNumberField.fill(data.mobile);
        await this.alternateMobileField.fill(data.alternateMobile);
        await this.emailField.fill(data.email);
        await this.landLineField.fill(data.landline);
        await this.extensionField.fill(data.ext);
        await this.timeToCallPicker.fill(data.timeToCall);
        await this.contactAddButton.click();
        // const table = this.page.locator('xpath= //div/.//table[@class="table table-striped"]/..//tbody');
        // expect(await table.waitFor({ state: 'visible', timeout: 10000 }));
        await this.validateTabTable();
        await this.page.waitForTimeout(1000);
    }
    async fillRelatedCompanyLink(data: any) {
        await this.relatedCompanyLinkTab.click();
        const dropdowns = [
            this.companyDropdown,
            this.natureOfRelationshipDropdown
        ]
        for (const dropdown of dropdowns) {
            await dropdown.click();
            await this.options.first().click();
        }
        await this.page.waitForTimeout(1000);
    }
    async fillAddressTab(data: any) {
        await this.addressesTab.click();
        await this.poAddressField.fill(data.poAddress);
        await this.gstnNumberField.fill(data.gstn);
        await this.panNumberField.fill(data.pan);
        await this.addressAddButton.click();
        // const table = this.page.locator('xpath= //div/.//table[@class="table table-striped"]/..//tbody');
        // expect(await table.waitFor({ state: 'visible', timeout: 10000 }));
        await this.validateTabTable();
        await this.page.waitForTimeout(1000);
    }
    async fillAddressTabAsGeneral(data: any) {
        await this.addressesTab.click();
        await this.sameAsGeneralCheckbox.check();
        await this.gstnNumberField.fill(data.gstn);
        await this.panNumberField.fill(data.pan);
        await this.addressAddButton.click();
        // const table = this.page.locator('xpath= //div/.//table[@class="table table-striped"]/..//tbody');
        // expect(await table.waitFor({ state: 'visible', timeout: 10000 }));
        await this.validateTabTable();
        await this.page.waitForTimeout(1000);
    }
    async fillBankingTab(data: any) {
        await this.bankingTab.click();
        await this.bankNameDropdown.click();
        await this.options.first().click();
        await this.branchField.fill(data.branch);
        await this.accountNumberField.fill(data.accountNo);
        await this.ifscCodeField.fill(data.ifsc);
        await this.swiftCodeField.fill(data.swift);
        await this.ibanCodeField.fill(data.iban);
        await this.bankAddButton.click();
        // const table = this.page.locator('xpath= //div/.//table[@class="table table-striped"]/..//tbody');
        // expect(await table.waitFor({ state: 'visible', timeout: 10000 }));
        await this.validateTabTable();
        await this.page.waitForTimeout(1000);
    }
    async fillTermsTab(data: any) {
        await this.termsTab.click();
        await this.advanceField.fill(data.advance);
        await this.specialTermsField.fill(data.specialTerms);
        const dropdowns = [
            this.paymentTermsDropdown,
            this.incoTermsDropdown,
            this.preferredFreightForwarderDropdown
        ]
        for (const dropdown of dropdowns) {
            await dropdown.click();
            await this.options.first().click();
            await dropdown.getAttribute('value')
        }
        await this.page.waitForTimeout(1000);

    }
    async fillStatutoryTab(data: any) {
        await this.statutoryTab.click();
        await this.page.waitForTimeout(1000);
    }
    async fillCertificationsDocsTab(data: any) {
        await this.certificationsDocsTab.click();
        await this.page.waitForTimeout(1000);
    }
    async fillDetailsTab(data: any) {
        await this.detailsTab.click();
        await this.turnOverField.fill(data.turnover);
        await this.dnbNumberField.fill(data.dnbNumber);
        await this.icraField.fill(data.icra);
        await this.capacityField.fill(data.capacity);
        await this.floorSpaceField.fill(data.floorSpace);
        await this.machineField.fill(data.machine);
        await this.toolsAndEquipField.fill(data.toolsAndEquip);
        await this.sqftField.fill(data.sqft);
        await this.uomDropdown.click();
        await this.options.first().click();
        await this.fillHeadCountSection();
    }
    async fillHeadCountSection() {
        await this.headCountExpansionPanel.click();
        // 1. Generate the Total (This is the 'Head Count' field value)
        const totalHeadCount = faker.number.int({ min: 10, max: 20 });

        // Fill the main total field first
        await this.headCountField.fill(totalHeadCount.toString());

        // 2. Split the total into 2 random parts
        // This ensures: Part A + Part B = Total
        const partA = faker.number.int({ min: 1, max: totalHeadCount - 1 });
        const partB = totalHeadCount - partA;

        const departmentRows = [
            { name: faker.commerce.department(), qty: partA },
            { name: faker.commerce.department(), qty: partB }
        ];

        // 3. Loop through and add them to the table
        for (const row of departmentRows) {
            await this.skillOrDepartmentField.fill(row.name);
            await this.noOfPeopleField.fill(row.qty.toString());

            // Add wait for the 'Add' button to be clickable if needed
            await this.headCountAddButton.click();

            // Small delay to let the UI update the table row
            await this.page.waitForTimeout(500);
        }
        console.log('Total Head Count: ' + totalHeadCount);
        console.log('Part A: ' + partA);
        console.log('Part B: ' + partB);
        expect(await totalHeadCount === partA + partB);
        // const table = this.page.locator('xpath= //div/.//table[@class="table table-striped"]/..//tbody');
        // expect(await table.waitFor({ state: 'visible', timeout: 10000 }));
        await this.validateTabTable();
        await this.page.waitForTimeout(1000);
    }
    async fillCompanyApprovalTab(data: any) {
        await this.companyApprovalTab.click();
        await this.approvalByField.fill(data.approvalBy);
        const approvalDate = await DateUtil.getFormattedDate(3);
        await DateUtil.selectDate(this.approvalDateField, approvalDate);
        const dropdowns = [
            this.scopeOfSupplyDropdown,
            this.companyCategoryDropdown,
            this.basisOfApprovalDropdown,
            this.auditFrequencyDropdown
        ]
        for (const dropdown of dropdowns) {
            await dropdown.click();
            await this.options.first().click();
        }
        await this.page.waitForTimeout(2000);

    }
    async clickSaveButton() {
        await this.robustClick(this.saveButton);
        await this.page.waitForURL(/table/);
    }

    async createCompanyMaster(data: any) {
        // 1. Synchronize Data: If a manual name is provided, override the faker value
        // This ensures the 'data' object remains the single source of truth
        await this.page.goto('/masters/company-master/create')
        await this.fillCompanyIdAndName(data);
        await this.fillGeneralTab(data);
        await this.fillContactsTab(data);
        await this.fillRelatedCompanyLink(data);
        await this.fillAddressTab(data);
        await this.fillBankingTab(data);
        await this.fillTermsTab(data);
        await this.fillStatutoryTab(data);
        await this.fillCertificationsDocsTab(data);
        await this.fillDetailsTab(data);
        await this.fillCompanyApprovalTab(data);
        await this.clickSaveButton();
        await JsonUtil.saveCompanyDetails(data.companyId, data.companyName);
    }
}