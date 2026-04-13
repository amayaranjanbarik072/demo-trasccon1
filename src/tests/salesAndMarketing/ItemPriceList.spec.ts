import { expect, test } from '../../base/fixture';
import { FakerUtil } from '../../utils/FakerUtil';
import { JsonUtil } from '../../utils/JsonUtil';
import { TestFlowUtils } from '../../utils/TestFlowUtils';

test('Create Item price list', async ({ page, loginPage, itemPriceList }) => {
    await loginPage.secondValidLogin();
    const data = FakerUtil.getItemPriceLIstData();
    await TestFlowUtils.clickOnOption(page, 'Sales & Marketing', 'Item Price List', 'Create');
    await page.waitForLoadState('networkidle');
    const priceListDetails = await itemPriceList.createItemPriceList(data);
    await JsonUtil.saveEntity('ItemPriceListDetails.json', priceListDetails);
    await expect(page).toHaveURL(/\/table$/); // ends with table
    await itemPriceList.verifyTheItemInPriceLIst();

});