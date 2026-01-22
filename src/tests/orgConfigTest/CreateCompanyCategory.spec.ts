import { test, expect } from '@playwright/test';
import { BaseTest } from '../../base/BaseTest';
import LoginPage from '../../pages/login/LoginPage';
import { DashboardPage } from '../../pages/dashboard/DashboardPage';
import CompanyCategoryTablePage from '../../pages/orgConfig/CompanyCategoryTablePage';
import CompanyCategoryCreatepage from '../../pages/orgConfig/CompanyCategoryCreatepage';
import { OrgConfigPage } from '../../pages/orgConfig/OrgConfigPage';

test('Create Company Category', async () => {
    const baseTest = new BaseTest();
    await baseTest.launchBrowser();
    const loginPage = new LoginPage(baseTest.page);
    await loginPage.login();
    const dashboardPage = new DashboardPage(baseTest.page);
    await dashboardPage.navigateToOrgConfig();
    const orgConfigPage = new OrgConfigPage(baseTest.page);
    await orgConfigPage.navigateToCompanyCategory();
    const companyCategoryTablePage = new CompanyCategoryTablePage(baseTest.page);
    await companyCategoryTablePage.navigateToCompanyCategoryCreatePage();
    const companyCategoryCreatePage = new CompanyCategoryCreatepage(baseTest.page);
    await companyCategoryCreatePage.createCompanyCategory();
    await baseTest.page.waitForTimeout(2000);
});
