import { test, expect, Browser } from '@playwright/test';
import { BaseTest } from '../../base/BaseTest';

//let baseTest: BaseTest;

test('launch empty browser', async () => {
  const baseTest = new BaseTest();
  await baseTest.launchBrowser();
});
