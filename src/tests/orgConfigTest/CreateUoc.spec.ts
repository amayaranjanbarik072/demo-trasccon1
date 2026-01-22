import { test, expect } from "@playwright/test";
import { BaseTest } from "../../base/BaseTest";
import LoginPage from "../../pages/login/LoginPage";
import { DashboardPage } from "../../pages/dashboard/DashboardPage";
import { OrgConfigPage } from "../../pages/orgConfig/OrgConfigPage";
import { UocTablePage } from "../../pages/orgConfig/UocTablePage";
import { UocCreatePage } from "../../pages/orgConfig/UocCreatePage";

const baseTest = new BaseTest();
test('verify Uoc Create functioality', async () => {
    await baseTest.launchBrowser();
    const loginPage = new LoginPage(baseTest.page);
    await loginPage.login();
    const dashboardPage = new DashboardPage(baseTest.page)
    await dashboardPage.navigateToOrgConfig();
    const orgConfigPage = new OrgConfigPage(baseTest.page);
    await orgConfigPage.navigateToUoc();
    const uocPage = new UocTablePage(baseTest.page);
    await uocPage.navigateToUocCreatePage();
    const uocCreatePage = new UocCreatePage(baseTest.page);
    await uocCreatePage.createUoc();
    await baseTest.page.waitForTimeout(2000);
});
