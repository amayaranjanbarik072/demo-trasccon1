import { test, expect } from '../../base/fixture';
import { FakerUtil } from '../../utils/FakerUtil';

test('Company Master with all the fields', async ({ page, companyMaster, loginPage }) => {
    // const data = companyMaster.generateData();
    const data = FakerUtil.getCompanyData();
    test.setTimeout(100000);
    await page.goto('/login');
    await loginPage.secondValidLogin();
    await page.waitForLoadState('networkidle');
    await companyMaster.createCompanyMaster(data);
    await companyMaster.verifyRecordPresent(data.companyName);
    await companyMaster.expectActionVisible(data.companyName, 'eye');
    await companyMaster.expectActionVisible(data.companyName, 'pencil');
    await companyMaster.clickRowAction(data.companyName, 'eye');
    await page.waitForTimeout(2000);

});
