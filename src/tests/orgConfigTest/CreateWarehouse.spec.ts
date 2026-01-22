import { test, expect } from "@playwright/test";
import { BaseTest } from "../../base/BaseTest";
import { DashboardPage } from "../../pages/dashboard/DashboardPage";
import { OrgConfigPage } from "../../pages/orgConfig/OrgConfigPage";
import WarehouseTablePage from "../../pages/orgConfig/WarehouseTablePage";
import WarehouseCreatePage from "../../pages/orgConfig/WarehouseCreatePage";
import LoginPage from "../../pages/login/LoginPage";
const baseTest = new BaseTest();

test("Create Warehouse", async () => {
    await baseTest.launchBrowser();
    const dashboardPage = new DashboardPage(baseTest.page);
    const loginPage = new LoginPage(baseTest.page);
    await loginPage.login();
    await dashboardPage.navigateToOrgConfig();
    const orgConfigPage = new OrgConfigPage(baseTest.page);
    await orgConfigPage.navigateToWarehouse();
    const warehouseTablePage = new WarehouseTablePage(baseTest.page);
    await warehouseTablePage.navigateToWarehouseCreatePage();
    const warehouseCreatePage = new WarehouseCreatePage(baseTest.page);
    await warehouseCreatePage.createWarehouse();
    await baseTest.page.waitForTimeout(2000);
});

