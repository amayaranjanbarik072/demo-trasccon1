import { test, expect } from '../../base/fixture';
import { FakerUtil } from '../../utils/FakerUtil';
import { JsonUtil } from '../../utils/JsonUtil';

test('Create Customer Master', async ({ page, loginPage, customerMaster }) => {
    //test.setTimeout(15000);
    //const data = customerMaster.generateData();
    const data = FakerUtil.getCustomerData();

    await loginPage.secondValidLogin();

    await page.goto('/masters/customer-master/create');
    await customerMaster.fillCustomerName(data);
    await customerMaster.fillGeneralTab(data);
    await customerMaster.fillContactsTab(data);
    await customerMaster.fillRelatedCustomerLinkTab(data);
    await customerMaster.fillAddressTabAsGeneral(data);
    await customerMaster.fillAddressTab(data);
    await customerMaster.fillBankingTab(data);
    await customerMaster.fillDispatchTab(data);
    await customerMaster.fillTermsTab(data);
    await customerMaster.fillStatutoryTab(data);
    await customerMaster.fillDetailsTab(data);
    await customerMaster.fillCustomerApprovalTab(data);
    await customerMaster.clickSaveButton();
    // await JsonUtil.saveCustomerDetails(data);
    await JsonUtil.saveEntity('CustomerMasterDetails.json', data);





});