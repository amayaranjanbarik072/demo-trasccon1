import { BaseTest } from "../../base/BaseTest";
import { DashboardPage } from "../../pages/dashboard/DashboardPage";
import LoginPage from "../../pages/login/LoginPage";
import { test, expect } from "@playwright/test";

let baseTest: BaseTest;
let loginPage: LoginPage;

test.beforeEach(async () => {
  baseTest = new BaseTest();
  await baseTest.launchBrowser();

});
test("Valid Login Test", async () => {
  loginPage = new LoginPage(baseTest.page);
  await loginPage.secondValidLogin();
});

test("Invalid Login Test", async () => {
  loginPage = new LoginPage(baseTest.page);
  await loginPage.InvalidLogin();
  //await page.waitForTimeout(2000);
  //console.log('Dashboard Page URL: ' + await page.url());
});
