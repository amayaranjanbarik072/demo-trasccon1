import { Page, Locator, test, expect } from '@playwright/test';
import BasePage from '../../base/BasePage';
import { JsonUtil } from '../../utils/JsonUtil';
import { FakerUtil } from '../../utils/FakerUtil';
import { ToggleUtil } from '../../utils/ToggleUtil';
import { RadioUtil } from '../../utils/RadioUtil';
import { Warehouse } from '../secondaryMasters/Warehouse';

export class ItemMaster extends BasePage {

  readonly page: Page;
  readonly options: Locator;
  readonly saveButton: Locator;

  // ================= GENERAL =================
  private itemNumberField: Locator;
  private descriptionField: Locator;

  // ================= GENERAL DESCRIPTIONS =================
  private itemTypeDropdown: Locator;
  private commodityDropdown: Locator;
  private materialGroupDropdown: Locator;
  private purchaseGroupDropdown: Locator;
  private departmentDropdown: Locator;
  private uomDropdown: Locator;
  private hsnField: Locator;
  private validFromDatePicker: Locator;
  private validToDatePicker: Locator;
  private customerSuppliedItemToggle: Locator;
  private prRequiredToggle: Locator;
  private poMaterialTypeDropdown: Locator;
  private openGrinToggle: Locator;
  private toleranceToggle: Locator;

  // ================= ALTERNATE =================
  private alternateTab: Locator;
  private alternatePartField: Locator;
  private manufacturerRadioButton: Locator;
  private customerRadioButton: Locator;
  private manufacturerOrCustomerNameField: Locator;
  private defaultToggle: Locator;
  private addButton: Locator;

  // ================= ENGINEERING =================
  private engineeringTab: Locator;
  private drawingNoField: Locator;
  private revNoField: Locator;
  private docRetField: Locator;
  private remarksToVendorField: Locator;
  private cocToggle: Locator;
  private shelfLifeToggle: Locator;
  private rohsToggle: Locator;
  private reachToggle: Locator;
  private uploadFileButton: Locator;
  private uploadFileField: Locator;

  // ================= DIMENSIONS =================
  private dimensionTab: Locator;
  private netWeightField: Locator;
  private grossWeightField: Locator;
  private volumeField: Locator;
  private sizeField: Locator;
  private footprintField: Locator;
  private netWeightUomDropdown: Locator;
  private grossWeightUomDropdown: Locator;
  private volumeUomDropdown: Locator;

  // ================= ROUTING =================
  private routingTab: Locator;
  private processDropdown: Locator;
  private processStepField: Locator;
  private routingDescriptionField: Locator;
  private machineHrsField: Locator;
  private labourHrsField: Locator;
  private activeToggle: Locator;
  private routingAddButton: Locator;
  private upArrowButton: Locator;
  private downArrowButton: Locator;

  // ================= APPROVED VENDOR LIST =================
  private approvedVendorTab: Locator;
  private vendorCodeDropdown: Locator;
  private vendorNameDropdown: Locator;
  private shareOfBusinessField: Locator;
  private approvedVendorListAddButton: Locator;

  // ================= PLANNING =================
  private planningTab: Locator;
  private minField: Locator;
  private maxField: Locator;
  private reorderField: Locator;
  private twoBinField: Locator;
  private leadTimeField: Locator;
  private kanbanToggle: Locator;

  // ================= WAREHOUSE =================
  private warehouseTab: Locator;
  private warehouseDropdown: Locator;
  private warehouseAddButton: Locator;
  private warehouseActiveToggle: Locator;
  private warehouseCancelIcon: Locator;
  private esdToggle: Locator;
  private fifoToggle: Locator;
  private cycleCountToggle: Locator;
  private lifoToggle: Locator;
  private hazardousMaterialToggle: Locator;
  private expiryField: Locator;
  private inspectionField: Locator;
  private specialInstuctionsField: Locator;

  // ================= SHIPPING =================
  private shippingTab: Locator;
  private instructionField: Locator;

  // ================= QUALITY =================
  private qualityTab: Locator;
  private iqcToggle: Locator;
  private grProcessField: Locator;
  private batchSizeField: Locator;

  // ================= COSTING =================
  private costingTab: Locator;
  private costCenterDropdown: Locator;
  private costingMethodDropdown: Locator;
  private stdCostField: Locator;
  private valuationToggle: Locator;
  private depreciationToggle: Locator;
  private pfoToggle: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;

    this.options = page.locator("//div[contains(@class,'ng-dropdown-panel')]//div/span");
    this.saveButton = page.locator("//button[normalize-space()='Save']");

    // ===== GENERAL =====
    this.itemNumberField = page.getByPlaceholder("Enter Item Number");
    this.descriptionField = page.getByPlaceholder("Enter Item Description");
    this.itemTypeDropdown = page.locator("//ng-select[@placeholder='Select Item Type']");

    this.commodityDropdown = page.locator("//label[text()='Commodity']/..//ng-select//input");
    this.materialGroupDropdown = page.locator("//label[text()='Material Group']/..//ng-select//input");
    this.purchaseGroupDropdown = page.locator("//label[text()='Purchase Group']/..//ng-select//input");
    this.departmentDropdown = page.locator("//label[text()='Department']/..//ng-select//input");
    this.uomDropdown = page.locator("//ng-select[@formcontrolname='uom']");
    this.hsnField = page.locator('xpath= //input[@formcontrolname="hsn"]');
    this.validFromDatePicker = page.locator('xpath= //input[@formcontrolname="valid_from"]');
    this.validToDatePicker = page.locator('xpath= //input[@formcontrolname="valid_date"]');
    this.customerSuppliedItemToggle = page.locator('xpath= //input[@formcontrolname="customerSuppliedItem"]/..//span[@class="slider round"]');
    this.prRequiredToggle = page.locator('xpath= //input[@formcontrolname="prRequired"]/..//span[@class="slider round"]');
    this.openGrinToggle = page.locator('xpath= //input[@formcontrolname="openGrin"]/..//span[@class="slider round"]');
    this.toleranceToggle = page.locator('xpath= //input[@formcontrolname="tolerance"]/..//span[@class="slider round"]');
    this.poMaterialTypeDropdown = page.locator('xpath= //select[@formcontrolname="poMaterialType"]');

    // ===== ALTERNATE =====
    this.alternateTab = page.locator("//a[normalize-space()='Alternates']");
    this.alternatePartField = page.getByPlaceholder("Enter Alternate Part No");
    this.manufacturerRadioButton = page.locator("//input[@id='manufacturer']");
    this.customerRadioButton = page.locator("//input[@id='customer']")
    this.manufacturerOrCustomerNameField = page.getByPlaceholder("Enter Munufacturer/Customer");
    this.defaultToggle = page.locator('xpath= //input[@formcontrolname="default_manufacturer"]/..//span[@class="slider round"]')
    this.addButton = page.locator("//button[normalize-space()='Add']");

    // ===== ENGINEERING =====
    this.engineeringTab = page.locator("(//a[normalize-space()='Engineering'])[2]");
    this.drawingNoField = page.getByPlaceholder("Enter Drawing No");
    this.revNoField = page.getByPlaceholder("Enter Rev No");
    this.docRetField = page.getByPlaceholder("Enter Doc Ret");
    this.remarksToVendorField = page.locator('//input[@formcontrolname="remarksToVendor"]');
    this.cocToggle = page.locator('xpath= //input[@formcontrolname="coc"]/..//span[@class="slider round"]');
    this.shelfLifeToggle = page.locator('xpath= //input[@formcontrolname="shelf_life"]/..//span[@class="slider round"]');
    this.rohsToggle = page.locator('xpath= //input[@formcontrolname="rohs"]/..//span[@class="slider round"]');
    this.reachToggle = page.locator('xpath= //input[@formcontrolname="reach"]/..//span[@class="slider round"]');
    this.uploadFileButton = page.locator("xpath= //label[contains(text(), 'Upload File')]/following-sibling::div//span[contains(@class, 'icon-color-upload')]");
    this.uploadFileField = page.locator("xpath= //label[contains(text(), 'Upload File')]/following-sibling::div//input[@formcontrolname='upload_file_name']");

    // ===== DIMENSIONS =====
    this.dimensionTab = page.locator("//a[normalize-space()='Dimensions']");
    this.netWeightField = page.getByPlaceholder("Enter Net Weight");
    this.grossWeightField = page.getByPlaceholder("Enter Gross Weight");
    this.volumeField = page.getByPlaceholder("Enter Volume");
    this.sizeField = page.getByPlaceholder("Enter Size");
    this.footprintField = page.getByPlaceholder("Enter Foot Print");
    this.netWeightUomDropdown = page.locator('xpath= //label[contains(text(), "UOM")]/..//ng-select[@formcontrolname="uom_net"]');
    this.grossWeightUomDropdown = page.locator('xpath= //label[contains(text(), "UOM")]/..//ng-select[@formcontrolname="uom_gross"]');
    this.volumeUomDropdown = page.locator('xpath= //label[contains(text(), "UOM")]/..//ng-select[@formcontrolname="uom_volume"]');


    // ===== ROUTING =====
    this.routingTab = page.locator("//a[normalize-space()='Routing']");
    this.processStepField = page.getByPlaceholder("Enter Process Step");
    this.processDropdown = page.locator("//label[text()='Process']/..//ng-select//input");
    this.routingDescriptionField = page.locator('//textarea[@formcontrolname="description"]')
    this.machineHrsField = page.getByPlaceholder("Enter Machine Hrs");
    this.labourHrsField = page.getByPlaceholder("Enter Labor Hrs");
    this.activeToggle = page.locator('xpath= //input[@formcontrolname="process_active"]/..//span[@class="slider round"]');
    this.routingAddButton = page.locator('xpath= //button[.="Add"]');
    this.upArrowButton = page.locator('xpath= //i[@class="mdi mdi-arrow-up edit-icon"]');
    this.downArrowButton = page.locator('xpath= //i[@class="mdi mdi-arrow-down edit-icon"]');

    // ===== APPROVED VENDOR =====
    this.approvedVendorTab = page.locator("//a[normalize-space()='Approved Vendor List']");
    this.vendorCodeDropdown = page.locator("//label[text()='Vendor Code']/..//ng-select//input");
    this.vendorNameDropdown = page.locator("//label[text()='Vendor Name']/..//ng-select//input");
    this.shareOfBusinessField = page.getByPlaceholder("Enter Share of Business");
    this.approvedVendorListAddButton = page.locator('xpath= //button[.="Add"]');

    // ===== PLANNING =====
    this.planningTab = page.locator("//a[normalize-space()='Planning']");
    this.minField = page.getByPlaceholder("Enter Min");
    this.maxField = page.getByPlaceholder("Enter Max");
    this.reorderField = page.getByPlaceholder("Enter Re-Order");
    this.twoBinField = page.getByPlaceholder("Enter 2 Bin");
    this.leadTimeField = page.getByPlaceholder("Enter Lead Time");
    this.kanbanToggle = page.locator('xpath= //input[@formcontrolname="kanban"]/..//span[@class="slider round"]');

    // ===== WAREHOUSE =====
    this.warehouseTab = page.locator("(//a[normalize-space()='Warehouse'])[2]");
    this.warehouseDropdown = page.locator("//label[text()='Warehouse']/..//ng-select//input");
    this.warehouseAddButton = page.locator('xpath= //button[.="Add"]');
    this.warehouseActiveToggle = page.locator('xpath= //input[@formcontrolname="isActive"]/..//span[@class="slider round"]');
    this.warehouseCancelIcon = page.locator('xpath= //i[@title="Delete Row"]')
    this.esdToggle = page.locator('xpath= //input[@formcontrolname="esd"]/..//span[@class="slider round"]');
    this.cycleCountToggle = page.locator('xpath= //input[@formcontrolname="cycle_count"]/..//span[@class="slider round"]');
    this.hazardousMaterialToggle = page.locator('xpath= //input[@formcontrolname="hazmat"]/..//span[@class="slider round"]');
    this.fifoToggle = page.locator('xpath= //input[@formcontrolname="fifo"]/..//span[@class="slider round"]');
    this.lifoToggle = page.locator('xpath= //input[@formcontrolname="lifo"]/..//span[@class="slider round"]');
    this.expiryField = page.getByPlaceholder("Enter Expiry (Days)");
    this.inspectionField = page.getByPlaceholder("Enter Inspection Int (Days)");
    this.specialInstuctionsField = page.locator('xpath= //textarea[@formcontrolname="special_instruction"]');

    // ===== SHIPPING ===== 
    this.shippingTab = page.locator("//a[normalize-space()='Shipping']");
    this.instructionField = page.getByPlaceholder("Enter Instructions");

    // ===== QUALITY =====
    this.iqcToggle = page.locator('xpath= //input[@formcontrolname="iqc"]/..//span[@class="slider round"]');
    this.qualityTab = page.locator("//a[normalize-space()='Quality']");
    this.grProcessField = page.getByPlaceholder("Enter GR Process");
    this.batchSizeField = page.getByPlaceholder("Enter Batch Size");

    // ===== COSTING =====
    this.costingTab = page.locator("//a[normalize-space()='Costing']");
    this.costCenterDropdown = page.locator("//label[text()='Cost Center']/..//ng-select//input");
    this.costingMethodDropdown = page.locator("//label[text()='Costing Method']/..//ng-select//input");
    this.stdCostField = page.getByPlaceholder("Enter Std Cost");
    this.valuationToggle = page.locator('xpath= //input[@formcontrolname="valuation"]/..//span[@class="slider round"]');
    this.depreciationToggle = page.locator('xpath= //input[@formcontrolname="depreciation"]/..//span[@class="slider round"]');
    this.pfoToggle = page.locator('xpath= //input[@formcontrolname="pfo"]/..//span[@class="slider round"]');
  }

  // ============================================================
  // =================== COMPLETE FLOW (UNCHANGED) ============== 
  // ============================================================
  async fillRandomItemumberAndDescription(data: any) {
    await this.itemNumberField.fill(data.itemNumber);
    await this.page.keyboard.press('Tab');
    await this.descriptionField.fill(data.description);
    await this.page.waitForTimeout(500);
  }

  async fillItemumberAndDescription(itemNumber: string, description: string) {
    await this.itemNumberField.fill(itemNumber);
    await this.page.keyboard.press('Tab');
    await this.descriptionField.fill(description);
    await this.page.waitForTimeout(500);
  }

  async fillGeneralDescriptions(data: any, type: 'FG' | 'SA' | 'PurchasePart') {
    await this.itemTypeDropdown.click();
    await this.page.locator(`//span[normalize-space()='${type}']`).click();
    const dropdowns = [
      this.commodityDropdown,
      this.materialGroupDropdown,
      this.purchaseGroupDropdown,
      this.departmentDropdown,
      this.uomDropdown
    ];
    for (const dropdown of dropdowns) {
      await this.selectFirstOption(dropdown, this.options);

    }
    await this.hsnField.fill(data.hsn);
    await this.validFromDatePicker.fill(data.validFrom);
    await this.validToDatePicker.fill(data.validTo);
    await this.poMaterialTypeDropdown.selectOption('Direct');
    await this.page.waitForTimeout(500);
    await ToggleUtil.set(this.customerSuppliedItemToggle, true, 'Customer Supplied Item');
    await ToggleUtil.set(this.customerSuppliedItemToggle, false, 'Customer Supplied Item');
    const toggles = [
      { loc: this.prRequiredToggle, key: 'PR Required' },
      { loc: this.openGrinToggle, key: 'Open Grin' },
      { loc: this.toleranceToggle, key: 'Tolerance' }
    ]
    for (const toggle of toggles) {
      await ToggleUtil.set(toggle.loc, false, toggle.key);
      await ToggleUtil.set(toggle.loc, true, toggle.key);

    }
  }

  async fillAlternate(data: any) {
    await this.alternateTab.click();
    await this.alternatePartField.fill(data.alternatePart);
    await this.manufacturerRadioButton.check();
    await this.manufacturerOrCustomerNameField.fill(data.manufacturerOrCustomerName);
    await ToggleUtil.verifyState(this.defaultToggle, true, 'Default Manufacturer');
    await this.addButton.click();
    await ToggleUtil.verifyState(this.defaultToggle, false, 'Default Manufacturer');
    await this.validateTabTable();
    await RadioUtil.select(this.customerRadioButton, 'Customer Radio Button');
    await this.alternatePartField.fill(data.alternatePart);
    await this.manufacturerRadioButton.check();
    await this.manufacturerOrCustomerNameField.fill(data.manufacturerOrCustomerName);
    await this.addButton.click();
    await this.page.waitForTimeout(500);
  }

  async fillEngineering(data: any) {
    await this.engineeringTab.click();
    await this.drawingNoField.fill(data.drawingNo);
    await this.revNoField.fill(data.revNo);
    await this.remarksToVendorField.fill(data.remarksToVendor);
    await this.docRetField.fill(data.docRet);
    const toggles = [
      { loc: this.cocToggle, key: 'COC Toggle' },
      { loc: this.rohsToggle, key: 'ROHS Toggle' },
      { loc: this.shelfLifeToggle, key: 'Shelf Life Toggle' },
      { loc: this.reachToggle, key: 'REACH Toggle' }
    ]
    for (const toggle of toggles) {
      await ToggleUtil.set(toggle.loc, true, toggle.key);
      await ToggleUtil.set(toggle.loc, false, toggle.key);
    }
    await this.page.waitForTimeout(500);
  }

  async fillDimensions(data: any) {
    await this.dimensionTab.click();
    await this.netWeightField.fill(data.netWeight);
    await this.grossWeightField.fill(data.grossWeight);
    await this.volumeField.fill(data.volume);
    await this.sizeField.fill(data.size);
    await this.footprintField.fill(data.footprint);
    const dropdowns = [
      this.netWeightUomDropdown,
      this.grossWeightUomDropdown,
      this.volumeUomDropdown
    ]
    for (const dropdown of dropdowns) {
      await this.selectFirstOption(dropdown, this.options);
    }
    await this.page.waitForTimeout(500);
  }

  async fillRouting(data: any) {
    await this.routingTab.click();
    await this.processDropdown.click();
    await this.options.first().click();
    await this.processStepField.fill(data.processStep);
    await this.routingDescriptionField.fill(data.routingDescription);
    await this.machineHrsField.fill(data.machineHrs);
    await this.labourHrsField.fill(data.labourHrs);
    await ToggleUtil.set(this.activeToggle, false, 'Active Toggle');
    await ToggleUtil.set(this.activeToggle, true, 'Active Toggle');
    await this.routingAddButton.click();
    // const table = this.page.locator('xpath= //div/.//table[@class="table table-striped"]/..//tbody');
    // expect(await table.waitFor({ state: 'visible', timeout: 10000 }));
    await this.validateTabTable();
    await this.page.waitForTimeout(500);
  }

  async fillApprovedVendorList(data: any) {
    await this.approvedVendorTab.click();
    // const dropdowns = [
    //   this.vendorCodeDropdown,
    //   this.vendorNameDropdown
    // ]
    // for (const dropdown of dropdowns) {
    //   await this.selectFirstOption(dropdown, this.options);
    // }
    await this.selectFromDropdown(this.vendorCodeDropdown, 'VD-000067');
    await this.shareOfBusinessField.fill(data.shareOfBusiness);
    await this.approvedVendorListAddButton.click();
    // const table = this.page.locator('xpath= //div/.//table[@class="table table-striped"]/..//tbody');
    // expect(await table.waitFor({ state: 'visible', timeout: 10000 }));
    await this.validateTabTable();
    await this.page.waitForTimeout(500);
  }

  async fillPlanning(data: any) {
    await this.planningTab.click();
    await this.minField.fill(data.min);
    await this.maxField.fill(data.max);
    await this.reorderField.fill(data.reorder);
    await this.twoBinField.fill(data.twoBin);
    await this.leadTimeField.fill(data.leadTime);
    await ToggleUtil.set(this.kanbanToggle, true, 'Kanban Toggle');
    await ToggleUtil.set(this.kanbanToggle, false, 'Kanban Toggle');
    await this.page.waitForTimeout(500);
  }
  async fillWarehouse(data: any) {
    await this.warehouseTab.click();
    await ToggleUtil.set(this.warehouseActiveToggle, false, 'Warehouse Active Toggle');
    await ToggleUtil.set(this.warehouseActiveToggle, true, 'Warehouse Active Toggle');
    await this.warehouseDropdown.click();
    await this.options.first().click();
    await this.expiryField.fill(data.expiry);
    await this.inspectionField.fill(data.inspection);
    await this.specialInstuctionsField.fill(data.specialInstructions);
    const toggles = [
      { loc: this.esdToggle, key: 'ESD Toggle' },
      { loc: this.cycleCountToggle, key: 'Cycle Count Toggle' },
      { loc: this.hazardousMaterialToggle, key: 'Hazardous Material Toggle' },
      { loc: this.fifoToggle, key: 'FIFO Toggle' },
      { loc: this.lifoToggle, key: 'LIFO Toggle' }
    ]
    for (const toggle of toggles) {
      await ToggleUtil.set(toggle.loc, true, toggle.key);
      await ToggleUtil.set(toggle.loc, false, toggle.key);
    }
    await this.page.waitForTimeout(500);
  }

  async fillShipping(data: any) {
    await this.shippingTab.click();
    await this.instructionField.fill(data.instructions);
    await this.page.waitForTimeout(500);
  }
  async fillQuality(data: any) {
    await this.qualityTab.click();
    await ToggleUtil.set(this.iqcToggle, false, 'IQC Toggle');
    await ToggleUtil.set(this.iqcToggle, true, 'IQC Toggle');
    await this.grProcessField.fill(data.grProcess);
    await this.batchSizeField.fill(data.batchSize);
    await this.page.waitForTimeout(500);
  }

  async fillCosting(data: any) {
    await this.costingTab.click();
    const dropdowns = [
      this.costCenterDropdown,
      this.costingMethodDropdown
    ]
    for (const dropdown of dropdowns) {
      await this.selectFirstOption(dropdown, this.options);
    }
    await this.stdCostField.fill(data.stdCost);
    const toggles = [
      { loc: this.valuationToggle, key: 'Valuation Toggle' },
      { loc: this.depreciationToggle, key: 'Depreciation Toggle' },
      { loc: this.pfoToggle, key: 'PFO Toggle' }
    ]
    for (const toggle of toggles) {
      await ToggleUtil.set(toggle.loc, true, toggle.key);
      await ToggleUtil.set(toggle.loc, false, toggle.key);

    }
    await this.page.waitForTimeout(500);
  }

  async clickSaveButton() {
    await this.robustClick(this.saveButton);
  }

  async createItem(type: 'FG' | 'SA' | 'PurchasePart') {
    await this.page.goto('/engineering/item-master/create');
    await this.itemNumberField.waitFor({ state: 'visible' });
    const data = FakerUtil.getItemData(type);
    await this.fillRandomItemumberAndDescription(data);
    await this.fillGeneralDescriptions(data, type);
    await this.fillAlternate(data);
    await this.fillEngineering(data);
    await this.fillDimensions(data);
    await this.fillRouting(data);
    await this.fillApprovedVendorList(data);
    await this.fillPlanning(data);
    await this.fillWarehouse(data);
    await this.fillShipping(data);
    await this.fillQuality(data);
    await this.fillCosting(data);
    await this.page.keyboard.press('Escape'); // Closes any lingering dropdowns
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
    await this.clickSaveButton();
    await this.page.waitForURL(/table/);
    await this.page.waitForTimeout(1000);
    await JsonUtil.updateItemNumbers(data);
    await this.page.waitForTimeout(2000);
  }


  async createSingleItem(data: any, type: 'FG' | 'SA' | 'PurchasePart') {
    // const data = FakerUtil.getItemData(type);
    await this.fillRandomItemumberAndDescription(data);
    await this.fillGeneralDescriptions(data, type);
    await this.fillAlternate(data);
    await this.fillEngineering(data);
    await this.fillDimensions(data);
    await this.fillRouting(data);
    await this.fillApprovedVendorList(data);
    await this.fillPlanning(data);
    await this.fillWarehouse(data);
    await this.fillShipping(data);
    await this.fillQuality(data);
    await this.fillCosting(data);
    await this.page.keyboard.press('Escape'); // Closes any lingering dropdowns
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
    await this.clickSaveButton();


  }
}