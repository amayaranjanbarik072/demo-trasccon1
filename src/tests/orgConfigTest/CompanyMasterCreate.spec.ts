import { BaseTest } from "../../base/BaseTest";
import { DashboardPage } from "../../pages/dashboard/DashboardPage";
import LoginPage from "../../pages/login/LoginPage";
import { CreateCompanyMasterPage } from "../../pages/orgConfig/CreateCompanyMasterPage";
import { OrgConfigPage } from "../../pages/orgConfig/OrgConfigPage";
import { test, expect } from "@playwright/test";

const baseTest = new BaseTest();

test('verify the functionality of company Id textfield', async ()) => {

    await baseTest.launchBrowser();
    const loginPage = new LoginPage(baseTest.page);
    await loginPage.login();
    const dashboard = new DashboardPage(baseTest.page);
    await dashboard.navigateToOrgConfig();
    const orgConfigPage = new OrgConfigPage(baseTest.page);
    await orgConfigPage.navigateToCreateCompanyMaster();
    const createCompanyMasterPage = new CreateCompanyMasterPage(baseTest.page);
    await createCompanyMasterPage.verifyCompanyIdTextfield();

});