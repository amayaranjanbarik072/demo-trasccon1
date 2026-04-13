import { test } from '../../base/fixture';
import { QuoteModifyView } from '../../pages/salesAndMarketing/QuoteModifyView';
import { SalesOrder } from '../../pages/salesAndMarketing/SalesOrder';
import quoteData = require('../../testData/QuoteDetails.json');
import rfqData = require('../../testData/RFQDetails.json');

test.setTimeout(120000);
test('Create Sales Oeder', async ({ page, loginPage }) => {
    await loginPage.secondValidLogin();
    await page.goto('/sales/quote/table');
    const quoteModifyView = new QuoteModifyView(page)
    await quoteModifyView.clickQuoteAction(rfqData.rfqNumber, quoteData.quoteNumber, 'release');
    await quoteModifyView.releaseQuoteByRetailShopOrder();
    await page.waitForTimeout(2000);
    //await page.goto('/transaction/sales-order/table');
    const salesOrder = new SalesOrder(page);
    await salesOrder.createSalesOrder(rfqData.rfqNumber, quoteData.quoteNumber);
    await salesOrder.storeNewlyCreatedSalesOrder();

    await page.waitForTimeout(2000);
})