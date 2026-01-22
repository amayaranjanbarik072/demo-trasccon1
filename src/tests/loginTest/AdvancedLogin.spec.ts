import { test, expect } from '../../base/fixture';
import LoginPage from '../../pages/login/LoginPage';
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/login');
  //await loginPage.secondValidLogin();
});

test('Valid Login Test', async ({ loginPage }) => {
  await loginPage.secondValidLogin();
});

test('Invalid Login Test', async ({ loginPage }) => {
  await loginPage.InvalidLogin();
});

test('verify dashboard page after login', async ({ loginPage, dashboardPage, orgConfigPage }) => {
  //await dashboardPage.verifyToastMessage();
  await loginPage.secondValidLogin();
  await dashboardPage.verifyDashboardHeader();
  await dashboardPage.navigateToOrgConfig();
  await orgConfigPage.navigateToApprovalRangeSecondarymasterPage();
});

test('create warehouse', async ({ dashboardPage }) => {
  await dashboardPage.navigateToEngineering();
});

