// import { test, expect, Browser, Page, BrowserContext } from '@playwright/test'
// import { chromium, firefox, webkit } from '@playwright/test'
// import { CREDENTIALS } from '../config/envConfig';


// export class BaseTest {
//   browser!: Browser;
//   context!: BrowserContext;
//   page!: Page;
//   //loginPage!: LoginPage;
//   //loginPage = new LoginPage(this.page);

//   async launchBrowser() {
//     this.browser = await chromium.launch({ headless: false });
//     this.context = await this.browser.newContext();
//     this.page = await this.context.newPage();
//     await this.page.goto(CREDENTIALS.baseUrl + 'login');
//     await this.page.waitForTimeout(2000);
//   }
// };
