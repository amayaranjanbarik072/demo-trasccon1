console.log('✅ FIXTURE FILE LOADED');


import { test as base, expect } from '@playwright/test';
import LoginPage from '../pages/login/LoginPage';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { OrgConfigPage } from '../pages/orgConfig/OrgConfigPage';
//=============All the Secondary Master Pages to be imported here==================//
import AdditionalCharges from '../pages/secondaryMasters/AdditionalCharges';
import { ApprovalRange } from '../pages/secondaryMasters/ApprovalRange';
import AuditFrequency from '../pages/secondaryMasters/AuditFrequency';
import BankName from '../pages/secondaryMasters/BankName';
import BasisOfApproval from '../pages/secondaryMasters/BasisOfApproval';
import { Category } from '../pages/secondaryMasters/Category';
import { Commodity } from '../pages/secondaryMasters/Commodity';
import { CompanyCategory } from '../pages/secondaryMasters/CompanyCategory';
import { CostCenter } from '../pages/secondaryMasters/CostCenter';
import { CostingMethod } from '../pages/secondaryMasters/CostingMethod';
import CurrencyConversionRate from '../pages/secondaryMasters/CurrencyConversionRate';
import { CustomerCategory } from '../pages/secondaryMasters/CustomerCategory';
import { CustomerType } from '../pages/secondaryMasters/CustomerType';
import DeliveryTerms from '../pages/secondaryMasters/DeliveryTerms';
import { Department } from '../pages/secondaryMasters/Department';
import ExportUnitType from '../pages/secondaryMasters/ExportUnitType';
import GstPercentage from '../pages/secondaryMasters/GstPercentage';
import IncoTerm from '../pages/secondaryMasters/IncoTerm';
import IssuingStock from '../pages/secondaryMasters/IssuingStock';
import Language from '../pages/secondaryMasters/Language';
import LeadTimes from '../pages/secondaryMasters/LeadTimes';
import Location from '../pages/secondaryMasters/Location';
import { MaterialType } from '../pages/secondaryMasters/MaterialType';
import NatureOfRelationship from '../pages/secondaryMasters/NatureOfRelationship';
import OtherCharges from '../pages/secondaryMasters/OtherCharges';
import { PackingInstructions } from '../pages/secondaryMasters/PackingInstructions';
import { OrderType } from '../pages/secondaryMasters/OrderType';
import { PartType } from '../pages/secondaryMasters/PartType';
import PaymentTerm from '../pages/secondaryMasters/PaymentTerm';
import PreferredFreightForwarder from '../pages/secondaryMasters/PreferredFreightForwarder';
import PriceList from '../pages/secondaryMasters/PriceList';
import { Process } from '../pages/secondaryMasters/Process';
import { ProcurementType } from '../pages/secondaryMasters/ProcurementType';
import ProductType from '../pages/secondaryMasters/ProductType';
import PurchaseGroup from '../pages/secondaryMasters/PurchaseGroup';
import RiskCategory from '../pages/secondaryMasters/RiskCategory';
import { Salutations } from '../pages/secondaryMasters/Salutations';
import ScopeOfSupply from '../pages/secondaryMasters/ScopeOfSupply';
import Segment from '../pages/secondaryMasters/Segment';
import ShipmentInstructions from '../pages/secondaryMasters/ShipmentInstructions';
import ShipmentMode from '../pages/secondaryMasters/ShipmentMode';
import TypeOfCompany from '../pages/secondaryMasters/TypeOfCompany';
import TypeOfSolution from '../pages/secondaryMasters/TypeOfSolution';
import { Uoc } from '../pages/secondaryMasters/Uoc';
import { Uom } from '../pages/secondaryMasters/Uom';
import VendorCategory from '../pages/secondaryMasters/VendorCategory';
import { Warehouse } from '../pages/secondaryMasters/Warehouse';
import { SalesAndMarketingPage } from '../pages/salesAndMarketing/SalesAndMarketingPage';
import VendorType from '../pages/secondaryMasters/VendorType';




type AppFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  orgConfigPage: OrgConfigPage;
  salesAndMarketingPage: SalesAndMarketingPage;

  //All the secondary master pages to be added here
  additionalCharges: AdditionalCharges;
  approvalRange: ApprovalRange;
  auditFrequency: AuditFrequency;
  bankName: BankName;
  basisOfApproval: BasisOfApproval;
  category: Category;
  commodity: Commodity;
  companyCategory: CompanyCategory;
  costCenter: CostCenter;
  costingMethod: CostingMethod;
  currencyConversionRate: CurrencyConversionRate;
  customerCategory: CustomerCategory;
  customerType: CustomerType;
  deliveryTerms: DeliveryTerms;
  department: Department;
  exportUnitType: ExportUnitType;
  gstPercentages: GstPercentage;
  incoTerm: IncoTerm;
  issuingStock: IssuingStock;
  language: Language;
  leadTimes: LeadTimes;
  location: Location;
  materialType: MaterialType;
  natureOfRelationship: NatureOfRelationship;
  orderType: OrderType;
  otherCharges: OtherCharges;
  packingInstructions: PackingInstructions;
  partType: PartType;
  paymentTerm: PaymentTerm;
  preferredFreightForwarder: PreferredFreightForwarder;
  priceList: PriceList;
  process: Process;
  procurementType: ProcurementType;
  productType: ProductType;
  purchaseGroup: PurchaseGroup;
  riskCategory: RiskCategory;
  salutations: Salutations;
  scopeOfSupply: ScopeOfSupply;
  segment: Segment;
  shipmentInstructions: ShipmentInstructions;
  shipmentMode: ShipmentMode;
  typeOfCompany: TypeOfCompany;
  typeOfSolution: TypeOfSolution;
  uoc: Uoc;
  uom: Uom;
  vendorCategory: VendorCategory;
  vendorType: VendorType;
  warehouse: Warehouse;


};

export const test = base.extend<AppFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await page.goto('/login');
    //await loginPage.secondValidLogin();
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  orgConfigPage: async ({ page }, use) => {
    await use(new OrgConfigPage(page));
  },
  salesAndMarketingPage: async ({ page }, use) => {
    await use(new SalesAndMarketingPage(page));
  },

  // All the secondary masters objects to be created here
  additionalCharges: async ({ page }, use) => {
    await use(new AdditionalCharges(page));
  },
  approvalRange: async ({ page }, use) => {
    await use(new ApprovalRange(page));
  },
  auditFrequency: async ({ page }, use) => {
    await use(new AuditFrequency(page));
  },
  bankName: async ({ page }, use) => {
    await use(new BankName(page));
  },
  basisOfApproval: async ({ page }, use) => {
    await use(new BasisOfApproval(page));
  },
  category: async ({ page }, use) => {
    await use(new Category(page));
  },
  commodity: async ({ page }, use) => {
    await use(new Commodity(page));
  },
  companyCategory: async ({ page }, use) => {
    await use(new CompanyCategory(page));
  },
  costCenter: async ({ page }, use) => {
    await use(new CostCenter(page));
  },
  costingMethod: async ({ page }, use) => {
    await use(new CostingMethod(page));
  },
  currencyConversionRate: async ({ page }, use) => {
    await use(new CurrencyConversionRate(page));
  },
  customerCategory: async ({ page }, use) => {
    await use(new CustomerCategory(page));
  },
  customerType: async ({ page }, use) => {
    await use(new CustomerType(page));
  },
  deliveryTerms: async ({ page }, use) => {
    await use(new DeliveryTerms(page));
  },
  department: async ({ page }, use) => {
    await use(new Department(page));
  },
  exportUnitType: async ({ page }, use) => {
    await use(new ExportUnitType(page));
  },
  gstPercentages: async ({ page }, use) => {
    await use(new GstPercentage(page));
  },
  incoTerm: async ({ page }, use) => {
    await use(new IncoTerm(page));
  },
  issuingStock: async ({ page }, use) => {
    await use(new IssuingStock(page));
  },
  language: async ({ page }, use) => {
    await use(new Language(page));
  },
  leadTimes: async ({ page }, use) => {
    await use(new LeadTimes(page));
  },
  location: async ({ page }, use) => {
    await use(new Location(page));
  },
  materialType: async ({ page }, use) => {
    await use(new MaterialType(page));
  },
  natureOfRelationship: async ({ page }, use) => {
    await use(new NatureOfRelationship(page));
  },
  orderType: async ({ page }, use) => {
    await use(new OrderType(page));
  },
  otherCharges: async ({ page }, use) => {
    await use(new OtherCharges(page));
  },
  packingInstructions: async ({ page }, use) => {
    await use(new PackingInstructions(page));
  },
  partType: async ({ page }, use) => {
    await use(new PartType(page));
  },
  paymentTerm: async ({ page }, use) => {
    await use(new PaymentTerm(page));
  },
  preferredFreightForwarder: async ({ page }, use) => {
    await use(new PreferredFreightForwarder(page));
  },
  priceList: async ({ page }, use) => {
    await use(new PriceList(page));
  },
  process: async ({ page }, use) => {
    await use(new Process(page));
  },
  procurementType: async ({ page }, use) => {
    await use(new ProcurementType(page));
  },
  productType: async ({ page }, use) => {
    await use(new ProductType(page));
  },
  purchaseGroup: async ({ page }, use) => {
    await use(new PurchaseGroup(page));
  },
  riskCategory: async ({ page }, use) => {
    await use(new RiskCategory(page));
  },
  salutations: async ({ page }, use) => {
    await use(new Salutations(page));
  },
  scopeOfSupply: async ({ page }, use) => {
    await use(new ScopeOfSupply(page));
  },
  segment: async ({ page }, use) => {
    await use(new Segment(page));
  },
  shipmentInstructions: async ({ page }, use) => {
    await use(new ShipmentInstructions(page));
  },
  shipmentMode: async ({ page }, use) => {
    await use(new ShipmentMode(page));
  },
  typeOfCompany: async ({ page }, use) => {
    await use(new TypeOfCompany(page));
  },
  typeOfSolution: async ({ page }, use) => {
    await use(new TypeOfSolution(page));
  },
  uoc: async ({ page }, use) => {
    await use(new Uoc(page));
  },
  uom: async ({ page }, use) => {
    await use(new Uom(page));
  },
  vendorCategory: async ({ page }, use) => {
    await use(new VendorCategory(page));
  },
  vendorType: async ({ page }, use) => {
    await use(new VendorType(page));
  },
  warehouse: async ({ page }, use) => {
    await use(new Warehouse(page));
  },

});

export { expect };
