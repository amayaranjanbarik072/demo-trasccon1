import { expect, test } from '../../base/fixture';
import { Quote } from '../../pages/salesAndMarketing/Quote';
import { TestFlowUtils } from '../../utils/TestFlowUtils';
import rfqData = require('../../testData/RFQDetails.json');
import bomData = require('../../testData/CapturedBOMResults.json');
import quoteData = require('../../testData/QuoteDetails.json');

test.describe('run all the tests serially', async () => {

    test.beforeEach(async ({ page, loginPage }) => {
        await loginPage.secondValidLogin();
        await page.goto('/sales/quote/table');
    });
    test.afterEach(async ({ page }) => {
        await page.close();
    });
    test('Create Quote', async ({ page, loginPage }) => {
        // await TestFlowUtils.clickOnOption(page, 'Sales & Marketing', 'Quote', 'Create');
        const quote = new Quote(page);
        await quote.fillQuoteHeaders();
        await page.waitForTimeout(2000);
        const maxLimit = 67;
        await quote.validatePricingLifecycle(30, maxLimit, 10);
        await page.waitForTimeout(2000);
        await quote.fillAndValidateTotalCalculation(10, 10);
        await page.waitForTimeout(2000);
        await quote.fillOtherTabs();
        await page.waitForTimeout(2000);
        await quote.clickSave();
        await page.waitForTimeout(2000);
        await quote.captureQuoteTableData();

    });

    test('Release Quote', async ({ page, loginPage }) => {
        const quote1 = new Quote(page);
        await quote1.clickQuoteAction(rfqData.rfqNumber, quoteData.quoteNumber, 'release');

    });

});