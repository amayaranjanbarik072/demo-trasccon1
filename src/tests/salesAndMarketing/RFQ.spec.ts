import { test } from '../../base/fixture';
import { JsonUtil } from '../../utils/JsonUtil';
test.describe.configure({ mode: 'parallel', timeout: 200000 });
test('End-to-End RFQ Cycle: Create, Complete and Capture Details', async ({ page, loginPage, rfq }) => {
    // 1. Setup & Login
    await loginPage.secondValidLogin();

    // 2. Step 1: Create RFQ — captures auto-generated RFQ number, Rev, and Customer from table
    const rfqHeaders = await rfq.createRfq();
    console.log('Created RFQ Headers:', rfqHeaders);

    // 3. Step 2: CS Complete — Find row by RFQ number and capture Item/Qty used inside
    // We pass the desired Item and Qty, and the method returns the actual values filled
    const csDetails = await rfq.createCsComplete(rfqHeaders.rfqNumber);
    await rfq.createCsRelease(rfqHeaders.rfqNumber);
    console.log('Captured CS Details:', csDetails);
    const enggDetails = await rfq.createEnggCompelete(rfqHeaders.rfqNumber);
    await rfq.createEnggRelease(rfqHeaders.rfqNumber);

    // 4. Step 3: Merge Header and Item details, then Save to JSON
    // This creates the single flat object your JsonUtil expects
    await JsonUtil.saveEntity('RFQDetails.json', {
        rfqNumber: rfqHeaders.rfqNumber,
        revisionNo: rfqHeaders.revisionNo,
        customerName: rfqHeaders.customerName,
        quantity: csDetails.quantity
    });
});