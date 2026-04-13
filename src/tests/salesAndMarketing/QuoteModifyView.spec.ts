import { expect, test } from '../../base/fixture';
import { QuoteModifyView } from '../../pages/salesAndMarketing/QuoteModifyView';
import { TestFlowUtils } from '../../utils/TestFlowUtils';
import rfqData = require('../../testData/RFQDetails.json');
import bomData = require('../../testData/CapturedBOMResults.json');
import quoteData = require('../../testData/QuoteDetails.json');

test('Create Quotation', async ({ page, loginPage }) => {
    await loginPage.secondValidLogin();
    await page.goto('/sales/quote/table');
    //await TestFlowUtils.clickOnOption(page, 'Sales & Marketing', 'Quotation', 'Modify / View');
    const quoteModifyView = new QuoteModifyView(page);
    await quoteModifyView.clickQuoteAction(rfqData.rfqNumber, quoteData.quoteNumber, 'release');
    await quoteModifyView.releaseQuoteByRetailShopOrder();
});