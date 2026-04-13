import { test, expect } from '../../base/fixture';

test.describe.configure({ mode: 'serial', timeout: 500000 });
test('Release BOM for Engineering', async ({ page, loginPage, releseBOM }) => {
    await page.goto('/login');
    await loginPage.secondValidLogin();

    //Release for SA
    await releseBOM.releaseBOMEngineering('SA');
    await releseBOM.releaseBOMCosting('SA');
    await releseBOM.releaseBOMProduction('SA');

    //Release for FG
    await releseBOM.releaseBOMEngineering('FG');
    await releseBOM.releaseBOMCosting('FG');
    await releseBOM.releaseBOMProduction('FG');



}); 
