import { test, expect } from '../../base/fixture';
import LoginPage from "../../pages/login/LoginPage";
import { TestFlowUtils } from "../../utils/TestFlowUtils";

test.describe('run all the tests serially', async () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await page.goto('/login');
        await loginPage.secondValidLogin();
    });
    test.afterEach(async ({ page }) => {
        await page.close();
    });

    //Creating Procurement Type
    test('Create procurement type', async ({ page, procurementType }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Procurement Type');
        //await procurementType.createProcurementType();
        await procurementType.createRandomProcurementType();
        await page.waitForURL(/table/);
    })

    //Creating Approval Range
    test('Create Approval Range', async ({ page, approvalRange }) => {
        await TestFlowUtils.clickOnOption(page, 'Org Config', 'Secondary Master', 'Approval Range');
        //await approvalRange.createApprovalRangeForThreeAndFourTogether();
        await approvalRange.createApprovalRangeForThree();
        await approvalRange.createApprovalRangeForFour();
    });
    //Creating Warehouse
    test('Create Warehouse', async ({ page, warehouse }) => {
        await TestFlowUtils.clickOnOption(page, 'Org Config', 'Secondary Master', 'Warehouse');
        await warehouse.createRandomWarehouse();
        //await warehouse.createWarehouse();

    });
    //Creating Company Category
    test('Create Company Category', async ({ page, companyCategory }) => {
        await TestFlowUtils.clickOnOption(page, 'Org Config', 'Secondary Master', 'Company Category');
        await companyCategory.createCompanyCategory();


    });
    //Creating Salutations
    test('Creating Salutations', async ({ page, salutations }) => {
        await TestFlowUtils.clickOnOption(page, 'Org Config', 'Secondary Master', 'Salutations');
        await salutations.createSalutations();
    })
    //Creating UOC
    test('Create uoc', async ({ page, uoc }) => {
        await TestFlowUtils.clickOnOption(page, 'Org Config', 'Secondary Master', 'UOC');
        await uoc.createRandomUoc();
    })
    //Creating commodity
    test('Create commodity', async ({ page, commodity }) => {
        await TestFlowUtils.clickOnOption(page, 'Engineering', 'Secondary Master', 'Commodity');
        await commodity.createCommodity();
    })
    //Creating cost center
    test('Create cost center', async ({ page, costCenter }) => {
        await TestFlowUtils.clickOnOption(page, 'Engineering', 'Secondary Master', 'Cost Center');
        await costCenter.createCostCenter();
    })
    //Creating costing method
    test('Create costing method', async ({ page, costingMethod }) => {
        await TestFlowUtils.clickOnOption(page, 'Engineering', 'Secondary Master', 'Costing Method');
        await costingMethod.createCostingMethod();
    })
    //Creating department
    test('Create department', async ({ page, department }) => {
        await TestFlowUtils.clickOnOption(page, 'Engineering', 'Secondary Master', 'Department');
        await department.createDepartment();
    })
    //Creating material type
    test('Create material type', async ({ page, materialType }) => {
        await TestFlowUtils.clickOnOption(page, 'Engineering', 'Secondary Master', 'Material Type');
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
        await uom.createUom();
    })

    //Create Process
    test('Create process', async ({ page, process }) => {
        await TestFlowUtils.clickOnOption(page, 'Engineering', 'Secondary Master', 'Process');
        await process.createProcess();
    })
    //Procurement


    //=============================Sales & Markettintg=============================
    //Additional charges
    test('Additional charges', async ({ page, additionalCharges }) => {
        await TestFlowUtils.clickOnOption(page, 'Sales & Marketing', 'Secondary Master', 'Additional Charges');
        await additionalCharges.createAdditionalCharges();
    })
    test('Category', async ({ page, category }) => {
        await TestFlowUtils.clickOnOption(page, 'Sales & Marketing', 'Secondary Master', 'Category');
        await category.createCategory();
    })
    test('Customer Category', async ({ page, customerCategory }) => {
        await TestFlowUtils.clickOnOption(page, 'Sales & Marketing', 'Secondary Master', 'Customer Category');
        await customerCategory.createCustomerCategory();
    })
    test('Customer Type', async ({ page, customerType }) => {
        await TestFlowUtils.clickOnOption(page, 'Sales & Marketing', 'Secondary Master', 'Customer Type');
        await customerType.createCustomerType();
    })
    test('Order Type Master', async ({ page, orderType }) => {
        await TestFlowUtils.clickOnOption(page, 'Sales & Marketing', 'Secondary Master', 'Order Type Master');
        await orderType.createOrderType();
    })
    test('Packing Instructions', async ({ page, packingInstructions }) => {
        await TestFlowUtils.clickOnOption(page, 'Sales & Marketing', 'Secondary Master', 'Instructions');
        await packingInstructions.createPackingInstructions();
    })
    test('Product Type', async ({ page, productType }) => {
        await TestFlowUtils.clickOnOption(page, 'Sales & Marketing', 'Secondary Master', 'Product Type');
        await productType.createProductType();
    })
    test('Risk Category', async ({ page, riskCategory }) => {
        await TestFlowUtils.clickOnOption(page, 'Sales & Marketing', 'Secondary Master', 'Risk');
        await riskCategory.createRiskCategory();
    })
    test('Create Segment', async ({ page, segment }) => {
        await TestFlowUtils.clickOnOption(page, 'Sales & Marketing', 'Secondary Master', 'Segment');
        await segment.createSegment();
    })
    test('Type Of Solution', async ({ page, typeOfSolution }) => {
        await TestFlowUtils.clickOnOption(page, 'Sales & Marketing', 'Secondary Master', 'Type Of Solution');
        await typeOfSolution.createTypeOfSolution();
    })

    //Sourcing and Planning
    test('Currency Conversion Rate', async ({ page, currencyConversionRate }) => {
        await TestFlowUtils.clickOnOption(page, 'Sourcing & Planning', 'Secondary Master', 'Currency Conversion Rate');
        // await TestFlowUtils.clickOnOption(page, 'Sourcing', 'Secondary Master', 'Currency Conversion Rate');
        await currencyConversionRate.createCurrencyConversionRate();
    })
    test('Create Lead Times', async ({ page, leadTimes }) => {
        await TestFlowUtils.clickOnOption(page, 'Sourcing & Planning', 'Secondary Master', 'Lead Times');
        //await TestFlowUtils.clickOnOption(page, 'Sourcing', 'Secondary Master', 'Lead Times');
        await leadTimes.createLeadTimes();
    })
    test('Create Price List', async ({ page, priceList }) => {
        await TestFlowUtils.clickOnOption(page, 'Sourcing & Planning', 'Secondary Master', 'Price List');
        //await TestFlowUtils.clickOnOption(page, 'Sourcing', 'Secondary Master', 'Price List');
        await priceList.createPriceList();
    })

    //=============================Procurement=============================
    test('Create Audit Frequency', async ({ page, auditFrequency }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Audit Frequency');
        await auditFrequency.createAuditFrequency();
    })
    test('Create Bank Name', async ({ page, bankName }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Bank Name');
        await bankName.createBankName();
    })
    test('Create Basis Of Approval', async ({ page, basisOfApproval }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Basis of Approval');
        await basisOfApproval.createBasisOfApproval();
    })
    test('Create Delivery Terms', async ({ page, deliveryTerms }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Delivery Terms');
        await deliveryTerms.createDeliveryTerms();
    })
    test('Create Export Unit Type', async ({ page, exportUnitType }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Export Unit Type');
        await exportUnitType.createExportUnitType();
    })
    test('Create GST Percentage', async ({ page, gstPercentages }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'GST Percentage');
        await gstPercentages.createGstPercentage();
    })
    test('Create INCO Term', async ({ page, incoTerm }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'INCO Term');
        await incoTerm.createIncoTerm();
    })
    test('Create Language', async ({ page, language }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Language');
        await language.createLanguage();
    })
    test('Create Nature Of Relationship', async ({ page, natureOfRelationship }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Nature of Relationship');
        await natureOfRelationship.createNatureOfRelationship();
    })
    test('Create Other Charges', async ({ page, otherCharges }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Other Charges');
        await otherCharges.createOtherCharges();
    })
    test('Create Payment Term', async ({ page, paymentTerm }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Payment Term');
        await paymentTerm.createPaymentTerm();
    })
    test('Create Preferred Freight Forwarder', async ({ page, preferredFreightForwarder }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Preferred Freight Forwarder');
        await preferredFreightForwarder.createPreferredFreightForwarder();
    })
    test('Create Purchase Group', async ({ page, purchaseGroup }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Purchase Group');
        await purchaseGroup.createPurchaseGroup();
    })
    test('Create Scope Of Supply', async ({ page, scopeOfSupply }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Scope of supply');
        await scopeOfSupply.createScopeOfSupply();
    })
    test('Create Shipment Instructions', async ({ page, shipmentInstructions }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Shipment Instructions');
        await shipmentInstructions.createShipmentInstructions();
    })
    test('Create Shipment Mode', async ({ page, shipmentMode }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Shipment Mode');
        await shipmentMode.createShipmentMode();
    })
    test('Create Type Of Company', async ({ page, typeOfCompany }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Type of Company');
        await typeOfCompany.createTypeOfCompany();
    })
    test('Create Vendor Category', async ({ page, vendorCategory }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Vendor Category');
        await vendorCategory.createVendorCategory();
    })
    test('Create Vendor Type', async ({ page, vendorType }) => {
        await TestFlowUtils.clickOnOption(page, 'Procurement', 'Secondary Master', 'Vendor Type');
        await vendorType.createVendorType();
    })
    //==================Warehouse=================
    test('Create Issuing Stock', async ({ page, issuingStock }) => {
        await TestFlowUtils.clickOnOption(page, 'Warehouse', 'Secondary Master', 'Issuing Stock');
        await issuingStock.createIssuingStock();
    })
    test('Create Location', async ({ page, location }) => {
        await TestFlowUtils.clickOnOption(page, 'Warehouse', 'Secondary Master', 'Location');
        await location.createLocation();
    })
});
