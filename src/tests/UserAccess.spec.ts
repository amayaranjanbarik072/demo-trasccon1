import { test } from '@playwright/test';
import { AdminUserAccessPage } from "../pages/orgConfig/UserAccess";
import LoginPage from "../pages/login/LoginPage";
import { TestFlowUtils } from '../utils/TestFlowUtils';
import { TablePage } from '../utils/TablePage';

test('User Access', async ({ browser }) => {
    // ---------- ADMIN CONTEXT ----------
    const adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();

    await adminPage.goto('/login');
    //await loginAsAdmin(adminPage);
    const loginPage = new LoginPage(adminPage);
    await loginPage.secondValidLogin();

    await TestFlowUtils.clickOnOption(adminPage, 'Org Config', 'Admin', 'User Access');

    const adminAccess = new AdminUserAccessPage(adminPage);

    await adminAccess.selectUser('Admin');

    await adminAccess.setPermission('UOM', 'Create', false);
    await adminAccess.setPermission('UOM', 'Edit', false);
    await adminAccess.setPermission('UOM', 'View', true);

    await adminAccess.savePermissions();

    // ---------- USER CONTEXT ----------
    const userContext = await browser.newContext();
    const userPage = await userContext.newPage();

    await userPage.goto('/login');
    //await loginAsUser(userPage);
    //await navigateToUOM(userPage);
    await TestFlowUtils.clickOnOption(userPage, 'Org Config', 'Secondary Master', '');

    const table = new TablePage(userPage);

    await table.expectCreateIconVisible(false);
    await table.expectEditIconVisible('UOM');
    await userContext.close(); // 🔥 user browser closed
    // admin browser STILL OPEN
});