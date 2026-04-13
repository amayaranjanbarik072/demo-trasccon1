import { test, expect } from '../../base/fixture';
import { DashboardPage } from "../../pages/dashboard/DashboardPage";
import LoginPage from "../../pages/login/LoginPage";


test('verify dashboard page after login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.secondValidLogin();
  const dashboard = new DashboardPage(page);
  await dashboard.verifyToastMessage();
  await dashboard.verifyDashboardHeader();
});
