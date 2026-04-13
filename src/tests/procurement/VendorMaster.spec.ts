import path from 'node:path';
import { test, expect } from '../../base/fixture';
import { FakerUtil } from '../../utils/FakerUtil';
import { JsonUtil } from '../../utils/JsonUtil';
import { base } from '@faker-js/faker/.';


test.describe.configure({ mode: 'parallel', timeout: 80000 });
test('Create Vendor Master', async ({ page, loginPage, vendorMaster }) => {
    const filePath = path.resolve(__dirname, '../../testData/sample-data/getapcs-image.png');
    const filename = path.basename(filePath);

    // const myfiles = [
    //     'src/testData/sample-data/getapcs-image.png',
    //     'src/testData/sample-data/Excel-sample.xlsx'
    // ]
    const data = FakerUtil.getVendorData();
    await loginPage.secondValidLogin();
    await page.goto('/masters/vendor-master/create');
    await vendorMaster.fillVendorName(data);
    await vendorMaster.fillGeneralTab(data);
    await vendorMaster.fillContactsTab(data);
    await vendorMaster.fillRelatedVendorLinkTab(data);
    await vendorMaster.fillAddressTabAsGeneral(data);
    await vendorMaster.fillAddressTab(data);
    await vendorMaster.fillBankingTab(data);
    await vendorMaster.fillTermsTab(data);
    await vendorMaster.fillStatutoryTab(data);
    await vendorMaster.fillCertificationOrDocsTab(data);
    await vendorMaster.fillDetailsTab(data);
    await vendorMaster.fillVendorApprovalTab(data, filePath, filename);
    // await vendorMaster.fillVendorApprovalTab(data, myfiles, filename);
    await vendorMaster.clickSaveButton();
    await JsonUtil.saveVendorDetails(data);
    await page.waitForURL(/table/);
    await vendorMaster.verifyToast('× VendorMaster Successfully Created');








});