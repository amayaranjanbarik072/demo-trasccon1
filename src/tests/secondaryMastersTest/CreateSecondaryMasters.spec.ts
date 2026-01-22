import { test, expect } from '../../base/fixture';
import LoginPage from "../../pages/login/LoginPage";
import { TestFlowUtils } from "../../utils/TestFlowUtils";

test.describe('run all the tests serially', async () => {
    //const baseTest = new BaseTest();

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await page.goto('/login');
        await loginPage.secondValidLogin();
    });

    //Creating Approval Range
    test('Create Approval Range', async ({ page, approvalRange }) => {
        await TestFlowUtils.clickOnOption(page, 'Org Config', 'Secondary Master', 'Approval Range');
        await page.waitForTimeout(2000);
        //const approvalRange = new ApprovalRange(page);
        //await approvalRange.createApprovalRangeForThreeAndFourTogether();
        //await approvalRange.createApprovalRangeforThree();
        // await approvalRange.pagination();
        // await approvalRange.searchApprovalRange();
        //await approvalRange.viewApprovalRange();
        await approvalRange.selectPageSize();

    });
    //Creating Warehouse
    test('Create Warehouse', async ({ page, warehouse }) => {
        await TestFlowUtils.clickOnOption(page, 'Org Config', 'Secondary Master', 'Warehouse');
        await page.waitForTimeout(2000);
        //const warehouse = new Warehouse(page);
        await warehouse.createWarehouse();
        await page.waitForTimeout(3000);

    });
    //Creating Company Category
    test('Create Company Category', async ({ page, companyCategory }) => {
        await TestFlowUtils.clickOnOption(page, 'Org Config', 'Secondary Master', 'Company Category');
        await page.waitForTimeout(2000);
        //const companyCategory = new CompanyCategory(page);
        await companyCategory.createCompanyCategory();


    });
    //Creating Salutations
    test('Creating Salutations', async ({ page, salutations }) => {
        await TestFlowUtils.clickOnOption(page, 'Org Config', 'Secondary Master', 'Salutations');
        await page.waitForTimeout(2000);
        //const salutations = new Salutations(page);
        await salutations.createSalutations();
    })
    //Creating UOC
    test('Create uoc', async ({ page, uoc }) => {
        await TestFlowUtils.clickOnOption(page, 'Org Config', 'Secondary Master', 'UOC');
        await page.waitForTimeout(2000);
        //const uoc = new Uoc(page);
        await uoc.createUoc();
    })
    //Creating commodity
    test('Create commodity', async ({ page, commodity }) => {
        await TestFlowUtils.clickOnOption(page, 'Engineering', 'Secondary Master', 'Commodity');
        await page.waitForTimeout(2000);
        //const commodity = new Commodity(page);
        await commodity.createCommodity();
    })
    //Creating cost center
    test('Create cost center', async ({ page, costCenter }) => {
        await TestFlowUtils.clickOnOption(page, 'Engineering', 'Secondary Master', 'Cost Center');
        await page.waitForTimeout(2000);
        //const costCenter = new CostCenter(page);
        await costCenter.createCostCenter();
    })
    //Creating costing method
    test('Create costing method', async ({ page, costingMethod }) => {
        await TestFlowUtils.clickOnOption(page, 'Engineering', 'Secondary Master', 'Costing Method');
        await page.waitForTimeout(2000);
        //const costingMethod = new CostingMethod(page);
        await costingMethod.createCostingMethod();
    })
    //Creating department
    test('Create department', async ({ page, department }) => {
        await TestFlowUtils.clickOnOption(page, 'Engineering', 'Secondary Master', 'Department');
        await page.waitForTimeout(2000);
        //const department = new Department(page);
        await department.createDepartment();
    })
    //Creating material type
    test('Create material type', async ({ page, materialType }) => {
        await TestFlowUtils.clickOnOption(page, 'Engineering', 'Secondary Master', 'Material Type');
        await page.waitForTimeout(2000);
        //const materialType = new MaterialType(page);
        await materialType.createMaterialType();
    })
    //Crate Part Type
    // test('Create part type', async () => {
    //     await TestFlowUtils.clickOnOption(baseTest.page, 'Engineering', 'Secondary Master', 'Part Type', '.mdi.mdi-plus-box-outline');
    //     await baseTest.page.waitForTimeout(2000);
    //     const partType = new PartType(baseTest.page);

    // })  

    //Create UOM
    test('Create uom', async ({ page, uom }) => {
        await TestFlowUtils.clickOnOption(page, 'Engineering', 'Secondary Master', 'UOM');
        await page.waitForTimeout(2000);
        //const uom = new Uom(page);
        await uom.createUom();
    })

    //Create Process
    test('Create process', async ({ page, process }) => {
        await TestFlowUtils.clickOnOption(page, 'Engineering', 'Secondary Master', 'Process');
        await page.waitForTimeout(2000);
        //const process = new Process(page);
        await process.createProcess();
    })
    //Procurement
    //Creating Procurement Type
    test('Create procurement type', async ({ page, procurementType }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Procurement Type');
        await page.waitForTimeout(2000);
        //const procurementType = new ProcurementType(page);
        await procurementType.createProcurementType();
    })

    //=============================Sales & Markettintg=============================
    //Additional charges
    test('Additional charges', async ({ page, additionalCharges }) => {
        await TestFlowUtils.clickOnOption(page, 'Sales & Marketing', 'Secondary Master', 'Additional Charges');
        await page.waitForTimeout(2000);
        //const additionalCharges = new AdditionalCharges(page);
        await additionalCharges.createAdditionalCharges();
    })
    test('Category', async ({ page, dashboardPage, salesAndMarketingPage, category }) => {
        //await TestFlowUtils.clickOnOption(baseTest.page, 'Sales & Marketing', 'Secondary Master', 'Category');
        await page.waitForTimeout(2000);
        //const dashboardPage = new DashboardPage(baseTest.page);
        await dashboardPage.navigateToSalesAndMarketing();

        // const salesAndMarketingPage = new SalesAndMarketingPage(page);
        await salesAndMarketingPage.navigateToCategory();
        //const category = new Category(page);
        await category.createCategory();
    })
    test('Customer Category', async ({ page, customerCategory }) => {
        await TestFlowUtils.clickOnOption(page, 'Sales & Marketing', 'Secondary Master', 'Customer Category');
        await page.waitForTimeout(2000);
        await customerCategory.createCustomerCategory();
    })
    test('Customer Type', async ({ page, customerType }) => {
        await TestFlowUtils.clickOnOption(page, 'Sales & Marketing', 'Secondary Master', 'Customer Type');
        await page.waitForTimeout(2000);
        //const customerType = new CustomerType(page);
        await customerType.createCustomerType();
    })
    test('Order Type Master', async ({ page, orderType }) => {
        await TestFlowUtils.clickOnOption(page, 'Sales & Marketing', 'Secondary Master', 'Order Type Master');
        await page.waitForTimeout(2000);
        //const orderTypeMaster = new OrderTypeMaster(baseTest.page);
        await orderType.createOrderType();
    })
    test('Packing Instructions', async ({ page, packingInstructions }) => {
        await TestFlowUtils.clickOnOption(page, 'Sales & Marketing', 'Secondary Master', 'Instructions');
        await page.waitForTimeout(2000);
        //const packingInstructions = new PackingInstructions(baseTest.page);
        await packingInstructions.createPackingInstructions();
    })
    test('Product Type', async ({ page, productType }) => {
        await TestFlowUtils.clickOnOption(page, 'Sales & Marketing', 'Secondary Master', 'Product Type');
        await page.waitForTimeout(2000);
        //const productType = new ProductType(baseTest.page);
        await productType.createProductType();
    })
    test('Risk Category', async ({ page, riskCategory }) => {
        await TestFlowUtils.clickOnOption(page, 'Sales & Marketing', 'Secondary Master', 'Risk');
        await page.waitForTimeout(2000);
        //const riskCategory = new RiskCategory(baseTest.page);
        await riskCategory.createRiskCategory();
    })
    test('Create Segment', async ({ page, segment }) => {
        await TestFlowUtils.clickOnOption(page, 'Sales & Marketing', 'Secondary Master', 'Segment');
        await page.waitForTimeout(2000);
        //const segment = new Segment(baseTest.page);
        await segment.createSegment();
    })
    test('Type Of Solution', async ({ page, typeOfSolution }) => {
        await TestFlowUtils.clickOnOption(page, 'Sales & Marketing', 'Secondary Master', 'Type Of Solution');
        await page.waitForTimeout(2000);
        //const typeOfSolution = new TypeOfSolution(baseTest.page);
        await typeOfSolution.createTypeOfSolution();
        await page.waitForTimeout(2000);
    })
    test('Currency Conversion Rate', async ({ page, currencyConversionRate }) => {
        await TestFlowUtils.clickOnOption(page, 'Sourcing & Planning', 'Secondary Master', 'Currency Conversion Rate');
        await page.waitForTimeout(2000);
        //const currencyConversionRate = new CurrencyConversionRate(baseTest.page);
        await currencyConversionRate.createCurrencyConversionRate();
        await page.waitForTimeout(2000);
    })
    test('Create Lead Times', async ({ page, leadTimes }) => {
        await TestFlowUtils.clickOnOption(page, 'Sourcing & Planning', 'Secondary Master', 'Lead Times');
        await page.waitForTimeout(2000);
        //const leadTimes = new LeadTimes(baseTest.page);
        await leadTimes.createLeadTimes();
        await page.waitForTimeout(2000);
    })
    test('Create Price List', async ({ page, priceList }) => {
        await TestFlowUtils.clickOnOption(page, 'Sourcing & Planning', 'Secondary Master', 'Price List');
        await page.waitForTimeout(2000);
        //const priceList = new PriceList(baseTest.page);
        await priceList.createPriceList();
        await page.waitForTimeout(2000);
    })

    //=============================Procurement=============================
    test('Create Audit Frequency', async ({ page, auditFrequency }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Audit Frequency');
        await page.waitForTimeout(2000);
        //const auditFrequency = new AuditFrequency(baseTest.page);
        await auditFrequency.createAuditFrequency();
    })
    test('Create Bank Name', async ({ page, bankName }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Bank Name');
        await page.waitForTimeout(2000);
        //const bankName = new BankName(baseTest.page);
        await bankName.createBankName();
    })
    test('Create Basis Of Approval', async ({ page, basisOfApproval }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Basis of Approval');
        await page.waitForTimeout(2000);
        //const basisOfApproval = new BasisOfApproval(baseTest.page);
        await basisOfApproval.createBasisOfApproval();
    })
    test('Create Delivery Terms', async ({ page, deliveryTerms }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Delivery Terms');
        await page.waitForTimeout(2000);
        //const deliveryTerms = new DeliveryTerms(baseTest.page);
        await deliveryTerms.createDeliveryTerms();
    })
    test('Create Export Unit Type', async ({ page, exportUnitType }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Export Unit Type');
        await page.waitForTimeout(2000);
        //const exportUnitType = new ExportUnitType(baseTest.page);
        await exportUnitType.createExportUnitType();
    })
    test('Create GST Percentage', async ({ page, gstPercentages }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'GST Percentage');
        await page.waitForTimeout(2000);
        //const gstPercentage = new GstPercentage(baseTest.page);
        await gstPercentages.createGstPercentage();
    })
    test('Create INCO Term', async ({ page, incoTerm }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'INCO Term');
        await page.waitForTimeout(2000);
        //const incoterm = new IncoTerm(baseTest.page);
        await incoTerm.createIncoTerm();
    })
    test('Create Language', async ({ page, language }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Language');
        await page.waitForTimeout(2000);
        //const language = new Language(baseTest.page);
        await language.createLanguage();
    })
    test('Create Nature Of Relationship', async ({ page, natureOfRelationship }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Nature of Relationship');
        await page.waitForTimeout(2000);
        //const natureOfRelationship = new NatureOfRelationship(baseTest.page);
        await natureOfRelationship.createNatureOfRelationship();
    })
    test('Create Other Charges', async ({ page, otherCharges }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Other Charges');
        await page.waitForTimeout(2000);
        //const othercharges = new OtherCharges(baseTest.page);
        await otherCharges.createOtherCharges();
    })
    test('Create Payment Term', async ({ page, paymentTerm }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Payment Term');
        await page.waitForTimeout(2000);
        //const paymentTerm = new PaymentTerm(baseTest.page);
        await paymentTerm.createPaymentTerm();
    })
    test('Create Preferred Freight Forwarder', async ({ page, preferredFreightForwarder }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Preferred Freight Forwarder');
        await page.waitForTimeout(2000);
        //const preferredFreightForwarder = new PreferredFreightForwarder(baseTest.page);
        await preferredFreightForwarder.createPreferredFreightForwarder();
    })
    test('Create Purchase Group', async ({ page, purchaseGroup }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Purchase Group');
        await page.waitForTimeout(2000);
        //const purchaseGroup = new PurchaseGroup(baseTest.page);
        await purchaseGroup.createPurchaseGroup();
    })
    test('Create Scope Of Supply', async ({ page, scopeOfSupply }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Scope of supply');
        await page.waitForTimeout(2000);
        //const scopeOfSupply = new ScopeOfSupply(baseTest.page);
        await scopeOfSupply.createScopeOfSupply();
    })
    test('Create Shipment Instructions', async ({ page, shipmentInstructions }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Shipment Instructions');
        await page.waitForTimeout(2000);
        //const shipmentInstructions = new ShipmentInstructions(baseTest.page);
        await shipmentInstructions.createShipmentInstructions();
    })
    test('Create Shipment Mode', async ({ page, shipmentMode }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Shipment Mode');
        await page.waitForTimeout(2000);
        //const shipmentMode = new ShipmentMode(baseTest.page);
        await shipmentMode.createShipmentMode();
    })
    test('Create Type Of Company', async ({ page, typeOfCompany }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Type of Company');
        await page.waitForTimeout(2000);
        //const typeOfCompany = new TypeOfCompany(baseTest.page);
        await typeOfCompany.createTypeOfCompany();
    })
    test('Create Vendor Category', async ({ page, vendorCategory }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Vendor Category');
        await page.waitForTimeout(2000);
        //const vendorCategory = new VendorCategory(baseTest.page);
        await vendorCategory.createVendorCategory();
    })
    test('Create Vendor Type', async ({ page, vendorType }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Vendor Type');
        await page.waitForTimeout(2000);
        //const vendorType = new VendorType(baseTest.page);
        await vendorType.createVendorType();
    })
    //==================Warehouse=================
    test('Create Issuing Stock', async ({ page, issuingStock }) => {
        await TestFlowUtils.clickOnOption(page, 'Warehouse', 'Secondary Master', 'Issuing Stock');
        await page.waitForTimeout(2000);
        //const issuingStock = new IssuingStock(baseTest.page);
        await issuingStock.createIssuingStock();
    })
    test('Create Location', async ({ page, location }) => {
        await TestFlowUtils.clickOnOption(page, 'Warehouse', 'Secondary Master', 'Location');
        await page.waitForTimeout(2000);
        //const location = new LocationWarehouse(baseTest.page);
        await location.createLocation();
        await page.waitForTimeout(2000);
    })
});
