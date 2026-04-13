import { test, expect } from '../../base/fixture';
import { EnggBOM } from '../../pages/engineering/EnggBOM';
import * as itemData from '../../testData/itemNumber.json';
import LoginPage from '../../pages/login/LoginPage';
import { JsonUtil } from '../../utils/JsonUtil';

test.describe.configure({ mode: 'serial', timeout: 200000 });
test.describe('Engineering BOM Creation Logic', () => {
    let sharedPage: any;
    test.beforeAll(async ({ browser }) => {
        // Create one page for the entire describe block
        sharedPage = await browser.newPage();
        const loginPage = new LoginPage(sharedPage);
        await sharedPage.goto('/login');
        await loginPage.secondValidLogin();
    });

    test('Step 1: Create BOM for SA (Mapping PP1 & PP2)', async () => {
        const enggBOM = new EnggBOM(sharedPage);
        await enggBOM.navigateToEnggBomCreatePage();

        // Fetch Parent SA from JSON
        const parentSA = itemData.SA[0];
        await enggBOM.selectParentItem(parentSA);

        // Fetch Children PP1 and PP2 from JSON
        const saChildren = [itemData.PP[0], itemData.PP[1]];

        for (const child of saChildren) {
            console.log(`🔗 Adding Child to SA: ${child}`);
            await enggBOM.enterChildItem(child, '5', 'SA Component');
        }

        await enggBOM.clickSaveButton();
        // 2. Capture details from the table and save to JSON
        const saDetails = await enggBOM.getLatestBOMDetails();
        await JsonUtil.saveBOMResult(saDetails);
    });

    test('Step 2: Create BOM for FG (Mapping SA & PP3)', async () => {
        const enggBOM = new EnggBOM(sharedPage);
        await enggBOM.navigateToEnggBomCreatePage();

        // Fetch Parent FG from JSON
        const parentFG = itemData.FG[0];
        await enggBOM.selectParentItem(parentFG);

        // Fetch Children SA (from its array) and PP3
        const fgChildren = [itemData.SA[0], itemData.PP[2]];

        for (const child of fgChildren) {
            console.log(`🔗 Adding Child to FG: ${child}`);
            await enggBOM.enterChildItem(child, '1', 'FG Component');
        }

        await enggBOM.clickSaveButton();
        // 2. Capture details from the table and save to JSON
        const fgDetails = await enggBOM.getLatestBOMDetails();
        await JsonUtil.saveBOMResult(fgDetails);
    });
});