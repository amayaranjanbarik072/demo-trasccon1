import { test, expect } from '../../base/fixture';
import LoginPage from '../../pages/login/LoginPage';


test.beforeEach(async ({ page }) => {
  await page.goto('/login');

});
test("Valid Login Test", async ({ loginPage }) => {
  await loginPage.secondValidLogin();
});

test("Invalid Login Test", async ({ loginPage }) => {
  await loginPage.InvalidLogin();
});
