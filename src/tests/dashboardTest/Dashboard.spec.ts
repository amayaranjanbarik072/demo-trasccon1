import { BaseTest } from "../../base/BaseTest";
import { DashboardPage } from "../../pages/dashboard/DashboardPage";
import LoginPage from "../../pages/login/LoginPage";
import { test, expect } from "@playwright/test";


test('verify dashboard page after login', async () => {
  const baseTest = new BaseTest();
  await baseTest.launchBrowser();
  const loginPage = new LoginPage(baseTest.page);
  await loginPage.secondValidLogin();
  const dashboard = new DashboardPage(baseTest.page);
  await dashboard.verifyToastMessage();
  await dashboard.verifyDashboardHeader();
});

