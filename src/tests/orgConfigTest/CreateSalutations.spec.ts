import { test, expect } from "@playwright/test";
import { BaseTest } from "../../base/BaseTest";
import LoginPage from "../../pages/login/LoginPage";
import { DashboardPage } from "../../pages/dashboard/DashboardPage";
import { OrgConfigPage } from "../../pages/orgConfig/OrgConfigPage";
import SalutationsTablePage from "../../pages/orgConfig/SalutationsTablePage";
import SalutationsCreatePage from "../../pages/orgConfig/SalutationsCreatePage";

const baseTest = new BaseTest();
test('verify Salutations Create functioality', async () => {
    await baseTest.launchBrowser();
    const loginPage = new LoginPage(baseTest.page);
    await loginPage.login();
    const dashboardPage = new DashboardPage(baseTest.page)
    await dashboardPage.navigateToOrgConfig();
    const orgConfigPage = new OrgConfigPage(baseTest.page);
    await orgConfigPage.navigateToSalutations();
    const salutationsPage = new SalutationsTablePage(baseTest.page);
    await salutationsPage.navigateToSalutationsCreatePage();
    const salutationsCreatePage = new SalutationsCreatePage(baseTest.page);
    await salutationsCreatePage.createSalutations();
    await baseTest.page.waitForTimeout(2000);
})  