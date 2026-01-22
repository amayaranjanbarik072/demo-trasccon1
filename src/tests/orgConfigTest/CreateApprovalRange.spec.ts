import { test, Page, expect } from "@playwright/test";
import { BaseTest } from "../../base/BaseTest";
import LoginPage from "../../pages/login/LoginPage";
import { DashboardPage } from "../../pages/dashboard/DashboardPage";
import { OrgConfigPage } from "../../pages/orgConfig/OrgConfigPage";
import { ApprovalRangeTablePage } from "../../pages/orgConfig/ApprovalRangeTablePage";
import { ApprovalRangeCreatePage } from "../../pages/orgConfig/ApprovalRangeCreatePage";
import { SearchBarUtils } from "../../utils/SearchbarUtils";
import { TestFlowUtils } from "../../utils/TestFlowUtils";


const baseTest = new BaseTest();

test('verify Approval Range Create functioality', async () => {
    await baseTest.launchBrowser();
    const loginPage = new LoginPage(baseTest.page);
    await loginPage.login();
    const dashboardPage = new DashboardPage(baseTest.page)
    await dashboardPage.navigateToOrgConfig();
    const orgConfigPage = new OrgConfigPage(baseTest.page);
    await orgConfigPage.navigateToApprovalRange();
    const approvalRangePage = new ApprovalRangeTablePage(baseTest.page);
    await approvalRangePage.navigateToApprovalRangeCreatePage();
    const approvalRangeCreatePage = new ApprovalRangeCreatePage(baseTest.page);
    //await approvalRangeCreatePage.createApprovalRangeForThreeAndFourTogether();
    //await approvalRangeCreatePage.createApprovalRangeforThree();
    await approvalRangeCreatePage.createApprovalRangeForFour();
    await baseTest.page.waitForTimeout(2000);

});
test('Search Approval Range', async () => {
    await baseTest.launchBrowser();
    const loginPage = new LoginPage(baseTest.page);
    await loginPage.login();
    const dashboardPage = new DashboardPage(baseTest.page)
    await dashboardPage.navigateToOrgConfig();
    const orgConfigPage = new OrgConfigPage(baseTest.page);
    await orgConfigPage.navigateToApprovalRange();
    const approvalRangePage = new ApprovalRangeTablePage(baseTest.page);
    await baseTest.page.waitForTimeout(2000);
    await approvalRangePage.searchApprovalRange();
    await baseTest.page.waitForTimeout(2000);
    await approvalRangePage.clearSearch();

});
test('Create Approval', async () => {
    await baseTest.launchBrowser();
    const loginPage = new LoginPage(baseTest.page);
    await loginPage.login();
    await TestFlowUtils.clickOnOption(baseTest.page, 'Org Config', 'Secondary Master', 'Approval Range', '.mdi.mdi-plus-box-outline');
    await baseTest.page.waitForTimeout(2000);

})