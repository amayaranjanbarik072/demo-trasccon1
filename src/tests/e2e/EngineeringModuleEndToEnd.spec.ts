import { test, expect } from '../../base/fixture';
import * as itemData from '../../testData/itemNumber.json';
import { EnggBOM } from '../../pages/engineering/EnggBOM';
import { JsonUtil } from '../../utils/JsonUtil';



test.describe('run all the tests serially', async () => {
    test.setTimeout(30000);
    let sharedPage: any;
    test.beforeAll(async ({ browser, page, loginPage }) => {
        sharedPage = await browser.newPage();
        await page.goto('/login');
        await loginPage.secondValidLogin();
    });
    test.afterAll(async ({ page }) => {
        await page.close();
    });

    test('Crete Item Master', async ({ itemMaster, releseBOM }) => {
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
        } catch (error) {
            console.log(error);
        }
    });
    test('Create Engg BOM', async () => {
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
    test('Release BOM', async ({ releseBOM }) => {
        //Release for SA
        await releseBOM.releaseBOMEngineering('SA');
        await releseBOM.releaseBOMCosting('SA');
        await releseBOM.releaseBOMProduction('SA');

        //Release for FG
        await releseBOM.releaseBOMEngineering('FG');
        await releseBOM.releaseBOMCosting('FG');
        await releseBOM.releaseBOMProduction('FG');
    });
});