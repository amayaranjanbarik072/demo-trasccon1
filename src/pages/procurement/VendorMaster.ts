import { Page, Locator, expect } from "@playwright/test";
import BasePage from "../../base/BasePage";
import { faker } from '@faker-js/faker'
import { ToggleUtil } from "../../utils/ToggleUtil";
import { RadioUtil } from "../../utils/RadioUtil";
import path from "path";
import { FileUtil } from "../../utils/FileUtil";

export class VendorMaster extends BasePage {

    // ================= HEADER ELEMENTS =================
    private vendorNameField: Locator;
    private vendorAliasField: Locator;
    private activeStatusToggle: Locator;
    private saveButton: Locator;
    private options: Locator;

    // ================= TAB NAVIGATION =================
    private generalTab: Locator;
    private contactsTab: Locator;
    private relatedVendorLinkTab: Locator;
    private addressesTab: Locator;
    private shippingAddressTab: Locator;
    private bankingTab: Locator;
    private dispatchTab: Locator;
    private termsTab: Locator;
    private statutoryTab: Locator;
    private certificationOrDocsTab: Locator;
    private detailsTab: Locator;
    private vendorApprovalTab: Locator;
    private infoTab: Locator;

    // ================= GENERAL TAB ELEMENTS (Column 1) =================
    private vendorTypeDropdown: Locator;
    private addressField: Locator;
    private cityField: Locator;
    private stateField: Locator;
    private countryDropdown: Locator;
    private zipCodeField: Locator;
    private vendorCodeField: Locator;
    private purchaseGroupDropdown: Locator;
    private boardNumberField: Locator;
    private websiteField: Locator;
    private generalEmailField: Locator;
    private currencyDropdown: Locator;
    private googlePinLocationField: Locator;
    private typeOfCompanyDropdown: Locator;
    private exportUnitTypeDropdown: Locator;
    private generalMsmeToggle: Locator;
    private salesManagerCodeField: Locator;
    private salesManagerField: Locator;
    private regionField: Locator;
    private shippingModeDropdown: Locator;

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
    private skypeIdField: Locator;
    private extensionField: Locator;
    private timeToCallPicker: Locator;
    private languageDropdown: Locator;
    private contactPrimaryToggle: Locator;
    private contactActiveToggle: Locator;
    private contactAddButton: Locator;

    // ================= Related Vendor Link Tab =================
    private vendorDropdown: Locator;
    private natureOfRelationshipDropdown: Locator;
    private vendorAliasReadonlyField: Locator;

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
    private bankingPrimaryToggle: Locator;
    private bankingActiveToggle: Locator;
    private bankingAddButton: Locator;

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

    //====================Cerification/Docs Tab====================
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

    //====================Vendor Approval Tab====================
    private scopeOfSupplyDropdown: Locator;
    private vendorCategoryDropdown: Locator;
    private basisOfApprovalDropdown: Locator;
    private inventoryItemToggle: Locator;
    private approvalDateField: Locator;
    private approvalByField: Locator;
    private reAuditToggle: Locator;
    // private uploadFileField: Locator;
    // private uploadedFileName: Locator;
    // private removeFileButton: Locator;
    // private saveFilesButton: Locator;
    // private viewFilesButton: Locator;
    // private modalBox: Locator; // Added this to count files in the list
    // private modalCloseButton: Locator;
    // private modalUploadInput: Locator;
    // private modalUploadButton: Locator;
    // private modalTableRows: Locator;
    private auditFrequencyDropdown: Locator;
    private approvedRadioButton: Locator;
    private conditionallyApprovedRadioButton: Locator;
    private notApprovedRadioButton: Locator;
    private underObservationRadioButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        // Main level Items      
        this.vendorNameField = page.locator('xpath= //input[@formcontrolname="vendorName"]');
        this.vendorAliasField = page.locator('xpath= //input[@formcontrolname="vendorAlias"]');
        this.activeStatusToggle = page.locator('xpath= //input[@formcontrolname="isActive"]/..//span[@class="slider round"]');
        this.saveButton = page.locator('xpath= //button[.="Save"]');
        this.options = page.locator("//div[contains(@class,'ng-dropdown-panel')]//div/span");

        //Tab Navigations
        this.generalTab = page.locator('xpath= //a[normalize-space()="General"]');
        this.contactsTab = page.locator('xpath= //a[normalize-space()="Contacts"]');
        this.relatedVendorLinkTab = page.locator('xpath= //a[normalize-space()="Related Vendor Link"]');
        this.addressesTab = page.locator('xpath= //a[normalize-space()="Addresses"]');
        this.shippingAddressTab = page.locator('xpath= //a[normalize-space()="Shipping Addresses"]')
        this.bankingTab = page.locator('xpath= //a[normalize-space()="Banking"]');
        this.dispatchTab = page.locator('xpath= //a[normalize-space()="Dispatch"]')
        this.termsTab = page.locator('xpath= //a[normalize-space()="Terms"]');
        this.statutoryTab = page.locator('xpath= //a[normalize-space()="Statutory"]');
        this.certificationOrDocsTab = page.locator('xpath= //a[normalize-space()="Certifications/Docs"]')
        this.detailsTab = page.locator('xpath= //a[normalize-space()="Details"]');
        this.vendorApprovalTab = page.locator('xpath= //a[normalize-space()="Vendor Approval"]');
        this.infoTab = page.locator('xpath= //a[normalize-space()="Info Tab"]');

        // General Tab Elements
        this.vendorTypeDropdown = page.locator("xpath= //label[normalize-space(text())='Vendor Type']/..//ng-select[@placeholder='Select Vendor Type']");
        this.addressField = page.locator('xpath= //textarea[@formcontrolname="address"]');
        this.cityField = page.locator('xpath= //input[@formcontrolname="city"]');
        this.stateField = page.locator('xpath= //input[@formcontrolname="state"]');
        this.countryDropdown = page.locator('xpath= //label[normalize-space(text())="Country"]/..//ng-select[@formcontrolname="country"]');
        this.zipCodeField = page.locator('xpath= //input[@formcontrolname="pin_zip_code"]');
        this.vendorCodeField = page.locator('xpath= //input[@formcontrolname="vendorCode"]');
        this.purchaseGroupDropdown = page.locator('xpath= //label[normalize-space(text())="Purchase Group"]/..//ng-select[@formcontrolname="purchaseGroup"]');
        this.boardNumberField = page.locator('xpath= //input[@formcontrolname="board_no"]');
        this.websiteField = page.locator('xpath= //input[@formcontrolname="website"]');
        this.generalEmailField = page.locator('xpath= //input[@formcontrolname="gen_email"]');
        this.currencyDropdown = page.locator('xpath= //label[normalize-space(text())="Currency"]/..//ng-select[@formcontrolname="currency"]');
        this.googlePinLocationField = page.locator('xpath= //input[@formcontrolname="google_pin_location"]');
        this.typeOfCompanyDropdown = page.locator('xpath= //label[normalize-space(text())="Type Of Company"]/..//ng-select[@formcontrolname="type_of_company"]');
        this.exportUnitTypeDropdown = page.locator('xpath= //label[normalize-space(text())="Export Unit Type"]/..//ng-select[@formcontrolname="export_unit_type"]');
        this.generalMsmeToggle = page.locator('xpath= //input[@formcontrolname="msme"]/..//span[@class="slider round"]');
        this.salesManagerCodeField = page.locator('xpath= //input[@formcontrolname="sales_manager_code"]');
        this.salesManagerField = page.locator('xpath= //input[@formcontrolname="sales_manager"]');
        this.regionField = page.locator('xpath= //input[@formcontrolname="region"]');
        this.shippingModeDropdown = page.locator('xpath= //label[normalize-space(text())="Shipping Mode"]/..//ng-select[@formcontrolname="shippingMode"]');

        //Contacts Tab Elements
        this.salutationDropdown = page.locator('xpath= //label[normalize-space(text())="Salutation"]/..//ng-select[@formcontrolname="salutation"]');
        this.firstNameField = page.locator('xpath= //input[@formcontrolname="first_name"]');
        this.lastNameField = page.locator('xpath= //input[@formcontrolname="last_name"]');
        this.callNameField = page.locator('xpath= //input[@formcontrolname="call_name"]');
        this.designationField = page.locator('xpath= //input[@formcontrolname="designation"]');
        this.departmentDropdown = page.locator('xpath= //label[normalize-space(text())="Department"]/..//ng-select[@formcontrolname="department"]');
        this.mobileNumberCountryDropdown = page.locator('xpath= //label[normalize-space(text())="Mobile Number"]/..//ng-select[@formcontrolname="country_code"]');
        this.mobileNumberField = page.locator('xpath= //input[@formcontrolname="mobile_no"]');
        this.alternateMobileCountryDropdown = page.locator('xpath= //label[normalize-space(text())="Alternate Mobile No."]/..//ng-select[@formcontrolname="alternateMobileCountryCode"]');
        this.alternateMobileField = page.locator('xpath= //input[@formcontrolname="alternateMobileNumber"]');
        this.emailField = page.locator('xpath= //input[@formcontrolname="email_contact"]');
        this.landLineField = page.locator('xpath= //input[@formcontrolname="land_line"]');
        this.skypeIdField = page.locator('xpath= //input[@formcontrolname="skype_id"]');
        this.extensionField = page.locator('xpath= //input[@formcontrolname="extension"]');
        this.timeToCallPicker = page.locator('xpath= //input[@formcontrolname="time_to_call"]');
        this.languageDropdown = page.locator('xpath= //label[normalize-space(text())="Language"]/..//ng-select[@formcontrolname="language"]');
        this.contactPrimaryToggle = page.locator('xpath= //input[@formcontrolname="primary_contact"]/..//span[@class="slider round"]');
        this.contactActiveToggle = page.locator('xpath= //input[@formcontrolname="active_contact"]/..//span[@class="slider round"]');
        this.contactAddButton = page.locator('xpath= //button[.="Add"]');

        //Related Vendor Link Tab
        this.vendorDropdown = page.locator('xpath= //label[normalize-space(text())="Vendors"]/..//ng-select[@formcontrolname="related_vendors_name"]');
        this.natureOfRelationshipDropdown = page.locator('xpath= //label[normalize-space(text())="Nature Of Relationship"]/..//ng-select[@formcontrolname="nature_of_relationship"]');
        this.vendorAliasReadonlyField = page.locator('xpath= //label[normalize-space(text())="Vendor Alias"]/..//input[@readonly]');
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
        this.bankingPrimaryToggle = page.locator('xpath= //input[@formcontrolname="primary_bank"]/..//span[@class="slider round"]');
        this.bankingActiveToggle = page.locator('xpath= //input[@formcontrolname="active_bank"]/..//span[@class="slider round"]');
        this.bankingAddButton = page.locator('xpath= //button[.="Add"]');

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

        //Certification/Docs Tab
        this.isoToggle = page.locator('xpath= //input[@formcontrolname="iso"]/..//span[@class="slider round"]');
        this.asToggle = page.locator('xpath= //input[@formcontrolname="as"]/..//span[@class="slider round"]');
        this.medicalToggle = page.locator('xpath= //input[@formcontrolname="medical"]/..//span[@class="slider round"]');
        this.nadcapToggle = page.locator('xpath= //input[@formcontrolname="nadcap"]/..//span[@class="slider round"]');

        //Details Tab Elements
        this.turnOverField = page.locator('xpath= //input[@formcontrolname="turn_over"]');
        this.dnbNumberField = page.locator('xpath= //input[@formcontrolname="dnb_number"]');
        this.icraField = page.locator('xpath= //input[@formcontrolname="indian_credit_no"]');
        this.headCountExpansionPanel = page.locator('xpath= //mat-expansion-panel-header[.//mat-panel-title[contains(text(), "Head Count")]]');
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

        //====================Vendor Approval Tab==================== 
        this.scopeOfSupplyDropdown = page.locator('xpath= //label[normalize-space(text())="Scope of Supply"]/..//ng-select[@formcontrolname="scope_of_supply"]');
        this.vendorCategoryDropdown = page.locator('xpath= //label[normalize-space(text())="Vendor Category"]/..//ng-select[@formcontrolname="vendor_category"]');
        this.basisOfApprovalDropdown = page.locator('xpath= //label[normalize-space(text())="Basis of Approval"]/..//ng-select[@formcontrolname="basis_of_approval"]');
        this.inventoryItemToggle = page.locator('xpath= //input[@formcontrolname="inventory_item"]/..//span[@class="slider round"]');
        this.approvalByField = page.locator('xpath= //input[@formcontrolname="approval_by"]');
        this.reAuditToggle = page.locator('xpath= //input[@formcontrolname="re_audit"]/..//span[@class="slider round"]');
        this.approvalDateField = page.locator('xpath= //input[@formcontrolname="approval_date"]');

        // All the Locators for File Upload Operation are dclared in Base Page
        // this.uploadFileField = page.locator('xpath= //label[normalize-space(text())="Upload"]/following-sibling::div//input[@type="file"]');
        // // Add these to your Page Object locators
        // this.uploadedFileName = page.locator('input[placeholder="Select Upload file"]'); // To verify text
        // this.removeFileButton = page.locator('span.input-group-text i.fa-times, .fa-xmark'); // The red 'X' button
        // this.saveFilesButton = page.getByRole('button', { name: 'Save Files' });
        // // The 'View Files' button on the main form
        // this.viewFilesButton = page.getByRole('button', { name: 'View Files' });
        // this.modalBox = page.locator('div.modal-content');
        // this.modalTableRows = page.locator('div.modal-content tbody tr');
        // this.modalCloseButton = page.locator('div.modal-footer').getByRole('button', { name: 'Close' });
        // // Inside the Modal
        // this.modalUploadInput = page.locator('div.modal-content input[type="file"]');
        // this.modalUploadButton = page.locator('div.modal-content button').getByText('Upload', { exact: true });
        // this.modalTableRows = page.locator('div.modal-content tbody tr');// The final 'Save Files' button
        this.auditFrequencyDropdown = page.locator('xpath= //label[normalize-space(text())="Audit Frequency"]/..//ng-select[@formcontrolname="audit_frequency"]');
        this.approvedRadioButton = page.locator('//label[normalize-space(text())="Approved"]/..//input');
        this.conditionallyApprovedRadioButton = page.locator('//label[normalize-space(text())="Conditionally approved"]/..//input');
        this.notApprovedRadioButton = page.locator('//label[normalize-space(text())="Not approved"]/..//input');
        this.underObservationRadioButton = page.locator('//label[normalize-space(text())="Under observation"]/..//input');
    }
    //Methods
    async fillVendorName(data: any, manualName?: string) {
        if (manualName) {
            data.vendorName = manualName;
        }
        await this.vendorNameField.fill(data.vendorName);
        await this.vendorAliasField.fill(data.vendorAlias);

    }

    async fillGeneralTab(data: any) {
        const dropdowns = [
            { loc: this.vendorTypeDropdown, key: 'vendorType' },
            { loc: this.countryDropdown, key: 'country' },
            { loc: this.purchaseGroupDropdown, key: 'purchaseGroup' },
            { loc: this.currencyDropdown, key: 'currency' },
            { loc: this.typeOfCompanyDropdown, key: 'typeOfCompany' },
            { loc: this.exportUnitTypeDropdown, key: 'exportUnitType' },
            { loc: this.shippingModeDropdown, key: 'shippingMode' }
        ];
        for (const item of dropdowns) {
            await item.loc.click();
            if (item.key === 'country') {
                await this.page.keyboard.type('India');
                await this.page.keyboard.press('Enter');
                data[item.key] = "India";
            } else {
                await this.selectFirstOption(item.loc, this.options)
            }
        }
        await this.addressField.fill(data.address);
        await this.cityField.fill(data.city);
        await this.stateField.fill(data.state);
        await this.zipCodeField.fill(data.zipCode);
        await this.boardNumberField.fill(data.boardNumber);
        await this.websiteField.fill(data.website);
        await this.generalEmailField.fill(data.email);
        await this.googlePinLocationField.fill(data.googlePinLocation);
        await ToggleUtil.verifyState(this.generalMsmeToggle, false, 'MSME');
        await ToggleUtil.set(this.generalMsmeToggle, true, 'MSME');
        await ToggleUtil.set(this.generalMsmeToggle, false, 'MSME');
        await this.page.waitForTimeout(1000);
    }

    async fillContactsTab(data: any) {
        await this.contactsTab.click();
        await this.firstNameField.fill(data.firstName);
        await this.lastNameField.fill(data.lastName);
        await this.callNameField.fill(data.callName);
        await this.designationField.fill(data.designation);

        const dropdowns = [
            { loc: this.salutationDropdown, key: 'salutation' },
            { loc: this.departmentDropdown, key: 'department' },
            { loc: this.languageDropdown, key: 'language' }
        ];

        for (const item of dropdowns) {
            await this.selectFirstOption(item.loc, this.options)
        }

        const countryCodeDropdowns = [
            { loc: this.mobileNumberCountryDropdown, key: 'mobileCountryCode' },
            { loc: this.alternateMobileCountryDropdown, key: 'altMobileCountryCode' }
        ];

        for (const item of countryCodeDropdowns) {
            await item.loc.click();
            await this.page.keyboard.type('+91');
            await this.page.keyboard.press('Enter');
            data[item.key] = "+91";
        }

        await this.mobileNumberField.fill(data.mobileNumber);
        await this.alternateMobileField.fill(data.alternateMobile);
        await this.emailField.fill(data.email);
        await this.landLineField.fill(data.landLine);
        await this.extensionField.fill(data.extension);
        await this.timeToCallPicker.fill(data.timeToCall);
        const toggles = [
            { loc: this.contactPrimaryToggle, key: 'Primary Contact' },
            { loc: this.contactActiveToggle, key: 'Contact Status' }
        ];
        for (const toggle of toggles) {
            await ToggleUtil.set(toggle.loc, false, toggle.key);
            await ToggleUtil.set(toggle.loc, true, toggle.key);
        }
        await this.contactAddButton.click();
        await this.validateTabTable();
        await ToggleUtil.verifyState(this.contactPrimaryToggle, false, 'Primary Contact Status');
        await this.page.waitForTimeout(1000);
    }

    async fillRelatedVendorLinkTab(data: any) {
        await this.relatedVendorLinkTab.click();
        const dropdowns = [
            { loc: this.vendorDropdown, key: 'relatedVendor' },
            { loc: this.natureOfRelationshipDropdown, key: 'relationshipNature' }
        ];
        for (const item of dropdowns) {
            await this.selectFirstOption(item.loc, this.options)
        }
        await this.verifyFieldNotEmpty(this.vendorAliasReadonlyField, 'Vendor Alias ReadOnly');
    }
    async fillAddressTabAsGeneral(data: any) {
        await this.addressesTab.click();
        await this.sameAsGeneralCheckbox.check();
        // 1. Combine your data into a single string
        const expectedAddress = `${data.address}, ${data.city}, ${data.state}, ${data.zipCode}, ${data.country}`;
        // 2. Use a Regex with the 'i' flag to ignore casing
        //await expect(this.poAddressField).toHaveValue(new RegExp(expectedAddress, 'i'));
        await expect(this.poAddressField, "❌ PO Address field should not be editable!").toBeDisabled();
        await this.gstnNumberField.fill(data.gstnNumber);
        await this.panNumberField.fill(data.panNumber);
        await ToggleUtil.verifyState(this.addressActiveToggle, true, 'Address Active');
        await this.addressAddButton.click();
        await ToggleUtil.verifyState(this.addressActiveToggle, false, 'Address Active');
        await expect(this.poAddressField, "❌ PO Address field should be editable!").toBeEnabled();
        await this.validateTabTable();
        await this.page.waitForTimeout(1000);
    }

    async fillAddressTab(data: any) {
        await this.addressesTab.click();
        await this.poAddressField.fill(data.poAddress);
        await this.gstnNumberField.fill(data.gstnNumber);
        await this.panNumberField.fill(data.panNumber);
        await this.addressAddButton.click();
        await this.validateTabTable();
        await this.page.waitForTimeout(1000);
    }

    async fillBankingTab(data: any) {
        await this.bankingTab.click();
        await this.selectFirstOption(this.bankNameDropdown, this.options);
        //await this.selectFromDropdown(this.bankNameDropdown, 'HDFC');
        await this.branchField.fill(data.branch);
        await this.accountNumberField.fill(data.accountNumber);
        await this.ifscCodeField.fill(data.ifscCode);
        await this.swiftCodeField.fill(data.swiftCode);
        await this.ibanCodeField.fill(data.ibanCode);
        const toggles = [
            { loc: this.bankingPrimaryToggle, key: 'Primary Bank' },
            { loc: this.bankingActiveToggle, key: 'Bank Status' }
        ];
        for (const toggle of toggles) {
            await ToggleUtil.set(toggle.loc, false, toggle.key);
            await ToggleUtil.set(toggle.loc, true, toggle.key);
        }
        await this.bankingAddButton.click();
        await this.validateTabTable();
        await ToggleUtil.verifyState(this.bankingPrimaryToggle, false, 'Primary Bank Status');
        await this.page.waitForTimeout(1000);
    }

    async fillTermsTab(data: any) {
        await this.termsTab.click();
        await this.advanceField.fill(data.advance);
        await this.specialTermsField.fill(data.specialTerms);

        const dropdowns = [
            { loc: this.paymentTermsDropdown, key: 'paymentTerms' },
            { loc: this.incoTermsDropdown, key: 'incoTerms' },
            { loc: this.preferredFreightForwarderDropdown, key: 'freightForwarder' }
        ];
        for (const item of dropdowns) {
            await this.selectFirstOption(item.loc, this.options)
        }
        await this.page.waitForTimeout(1000);
    }
    async fillStatutoryTab(data: any) {
        await this.statutoryTab.click();
        const toggles = [
            { loc: this.incorpotationToggle, key: 'Incorporation Toggle Button' },
            { loc: this.tinToggle, key: 'TIN Toggle' },
            { loc: this.gstToggle, key: 'GST Toggle' },
            { loc: this.iecToggle, key: 'IEC Toggle' },
            { loc: this.panToggle, key: 'PAN Toggle' },
            { loc: this.udhyamCertificateToggle, key: 'Udhyam Certification Toggle' },
            { loc: this.statutoryMsmeToggle, key: 'Statutory MAME Toggle' }
        ]
        for (const toggle of toggles) {
            await ToggleUtil.verifyState(toggle.loc, false, toggle.key);
            await ToggleUtil.set(toggle.loc, true, toggle.key);
            await ToggleUtil.set(toggle.loc, false, toggle.key);
        }
        await this.page.waitForTimeout(1000);
    }

    async fillCertificationOrDocsTab(data: any) {
        await this.certificationOrDocsTab.click();
        const toggles = [
            { loc: this.isoToggle, key: 'ISO Toggle' },
            { loc: this.asToggle, key: 'AS Toggle' },
            { loc: this.medicalToggle, key: 'Medical Toggle' },
            { loc: this.nadcapToggle, key: 'NADCAP Toggle' }
        ]
        for (const toggle of toggles) {
            await ToggleUtil.verifyState(toggle.loc, false, toggle.key);
            await ToggleUtil.set(toggle.loc, true, toggle.key);
            await ToggleUtil.set(toggle.loc, false, toggle.key);
        }
        await this.page.waitForTimeout(1000);
    }

    async fillDetailsTab(data: any) {
        await this.detailsTab.click();
        await this.turnOverField.fill(data.turnOver);
        await this.dnbNumberField.fill(data.dnbNumber);
        await this.icraField.fill(data.icra);
        await this.capacityField.fill(data.capacity);
        await this.floorSpaceField.fill(data.floorSpace);
        await this.machineField.fill(data.machine);
        await this.toolsAndEquipField.fill(data.toolsAndEquip);
        await this.selectFirstOption(this.uomDropdown, this.options);
        await this.sqftField.fill(data.sqft);
        await this.fillHeadCountSection(data);
        await RadioUtil.verifySelected(this.esdSetupRadioButonNA, 'ESD Setup N/A');
        await RadioUtil.verifySelected(this.hazmatSetupRadioButonNA, 'Hazmat setup N/A');
        const radios = [
            { loc: this.esdSetupRadioButtonYes, key: 'ESD Yes' },
            { loc: this.esdSetupRadioButtonNo, key: 'ESD No' },
            { loc: this.esdSetupRadioButonNA, key: 'ESD N/A' },
            { loc: this.hazmatSetupRadioButtonYes, key: 'Hazmat Yes' },
            { loc: this.hazmatSetupRadioButtonNo, key: 'Hazmat NO' },
            { loc: this.hazmatSetupRadioButonNA, key: 'Hazmat N/A' }
        ]
        for (const radio of radios) {
            await RadioUtil.select(radio.loc, 'Radio Buttons');
        }
        const toggles = [
            { loc: this.erpToggle, key: 'ERP Toggle' },
            { loc: this.ospToggle, key: 'OSP Toggle' }
        ]
        for (const toggle of toggles) {
            await ToggleUtil.verifyState(toggle.loc, false, toggle.key);
            await expect(this.erpField).toBeDisabled();
            await expect(this.ospField).toBeDisabled();
            await ToggleUtil.set(toggle.loc, true, toggle.key);
            if (toggle.loc === this.erpToggle) {
                await this.erpField.fill(data.erp);
            } else {
                await this.ospField.fill(data.osp);
            }
            await ToggleUtil.set(toggle.loc, false, toggle.key);
            if (toggle.loc === this.erpToggle) {
                await expect(this.erpField).toBeDisabled();
            } else {
                await expect(this.ospField).toBeDisabled();
            }
        }
        await this.page.waitForTimeout(1000);
    }

    async fillHeadCountSection(data: any) {
        await this.headCountExpansionPanel.click();
        const totalHeadCount = faker.number.int({ min: 10, max: 20 });
        data.totalHeadCount = totalHeadCount.toString(); // Store in JSON

        await this.headCountField.fill(data.totalHeadCount);

        const partA = faker.number.int({ min: 1, max: totalHeadCount - 1 });
        const partB = totalHeadCount - partA;

        data.headCountDetails = [
            { dept: faker.commerce.department(), qty: partA },
            { dept: faker.commerce.department(), qty: partB }
        ];

        for (const row of data.headCountDetails) {
            await this.skillOrDepartmentField.fill(row.dept);
            await this.noOfPeopleField.fill(row.qty.toString());
            await this.headCountAddButton.click();
            await this.page.waitForTimeout(500);
        }
    }

    async fillVendorApprovalTab(data: any, filePath: string | string[], filename: string) {
        await this.vendorApprovalTab.click();
        const dropdowns = [
            { loc: this.scopeOfSupplyDropdown, key: 'scopeOfSupply' },
            { loc: this.vendorCategoryDropdown, key: 'vendorCategory' },
            { loc: this.basisOfApprovalDropdown, key: 'basisOfApproval' },
            { loc: this.auditFrequencyDropdown, key: 'auditFrequency' }
        ];
        for (const item of dropdowns) {
            await this.selectFirstOption(item.loc, this.options);
        }
        await this.approvalByField.fill(data.approvalBy);
        await this.approvalDateField.fill(data.approvalDate);
        await RadioUtil.verifySelected(this.approvedRadioButton, 'Approved Radio');
        const radios = [
            { loc: this.conditionallyApprovedRadioButton, key: 'Conditionally Approved' },
            { loc: this.notApprovedRadioButton, key: 'Not Approved' },
            { loc: this.underObservationRadioButton, key: 'Under Observation' },
            { loc: this.approvedRadioButton, key: 'Approved' }
        ]
        for (const radio of radios) {
            await RadioUtil.select(radio.loc, radio.key);
            await RadioUtil.verifySelected(radio.loc, radio.key);
        }
        const toggles = [
            { loc: this.inventoryItemToggle, key: 'Inventory Item' },
            { loc: this.reAuditToggle, key: 'Re-Audit' }
        ]
        for (const toggle of toggles) {
            await ToggleUtil.set(toggle.loc, true, toggle.key);
            await ToggleUtil.set(toggle.loc, false, toggle.key);
        }
        // // File Upload
        // const uploadLocators = {
        //     input: this.commonUploadInput,
        //     preview: this.commonUploadPreview,
        //     save: this.commonSaveFilesBtn,
        //     view: this.commonViewFilesBtn,
        //     modal: this.commonModalBox,
        //     rows: this.commonModalTableRows,
        //     close: this.commonModalCloseBtn
        // };
        // await FileUtil.completeLifecycle(uploadLocators, filePath);
        // await this.page.waitForTimeout(1000);
        // await this.commonViewFilesBtn.click();
        // await this.page.waitForTimeout(1000);
        // await this.commonModalUploadInput.setInputFiles(filePath);
        // await this.page.waitForTimeout(1000);
        // await this.commonModalUploadBtn.click();
        // await this.page.waitForTimeout(2000);
        // await FileUtil.verifyUploadedFileInModal(this.commonViewFilesBtn, this.commonModalBox, [filename]);
        // await this.page.waitForTimeout(2000);
        // await this.commonModalCloseBtn.click();
        // await this.page.waitForTimeout(2000);
    }

    async clickSaveButton() {
        await this.saveButton.click();
    }

    async validateFields(map: { loc: Locator; key: string; isDropdown?: boolean }[], data: any) {
        for (const item of map) {
            if (item.isDropdown) {
                // ng-select displays selected text in these specific classes
                const selectedValue = item.loc.locator('.ng-value-label, .ng-single-value, .ng-value').first();
                await expect(selectedValue).toHaveText(data[item.key]);
            } else {
                // Standard inputs and textareas
                await expect(item.loc).toHaveValue(data[item.key]);
            }
        }
    }
}

