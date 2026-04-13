import { test, expect } from '../../base/fixture';
import { FakerUtil } from '../../utils/FakerUtil';
import { TestFlowUtils } from '../../utils/TestFlowUtils';
const ItemNumber = require('../../testData/ItemNumber.json');

test.describe.configure({ mode: 'parallel', timeout: 500000 });
test('Create FG, PP and SA', async ({ page, itemMaster, loginPage }) => {
  // ========Login============
  //await page.goto('/login');
  // const loginPage = new LoginPage(page);
  await loginPage.secondValidLogin();

  // ===== Create FG PP SA Items =====
  try {
    await itemMaster.createItem('FG');
    await itemMaster.getToastMessage();

    for (let i = 0; i < 3; i++) {
      await itemMaster.createItem('PurchasePart');
      await itemMaster.getToastMessage();
    }
    await itemMaster.createItem('SA');
    await itemMaster.getToastMessage();
  }
  finally {
    await page.close();
  }
});
test('Create Single Item', async ({ page, itemMaster, loginPage }) => {
  const data = FakerUtil.getItemData('SA');
  test.setTimeout(200000); // 3 minutes - creation of 5 items is slow
  // ========Login============
  await page.goto('/login');
  await loginPage.secondValidLogin();
  await TestFlowUtils.clickOnOption(page, "Engineering", "Item Master", "Create");
  await itemMaster.createSingleItem(data, 'SA');
  await page.waitForURL(/table/);
  await itemMaster.verifyRecordPresent(data.itemNumber);
  await itemMaster.expectActionVisible(data.itemNumber, 'eye');
  await itemMaster.expectActionVisible(data.itemNumber, 'pencil');


});