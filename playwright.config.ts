import { devices, PlaywrightTestConfig } from '@playwright/test';
import { EnvUtils } from './src/utils/envUtils';
const config: PlaywrightTestConfig = {
  testDir: './src/tests',
  timeout: 50_000,

  expect: {
    timeout: 5_000
  },

  fullyParallel: true,
  //forbidOnly: !!process.env.CI,
  //retries: process.env.CI ? 2 : 0,
  retries: 2,
  reporter: [['html', { open: 'never' }]],

  use: {
    // baseURL: 'https://demo-tras.getapcs.com',
    baseURL: EnvUtils.getBaseUrl(),
    // baseURL: EnvUtils.getBaseUrl("demo_tras"),


    headless: false,              // ✅ show browser UI
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'],  // ✅ start maximized
      // slowMo: process.env.CI ? 0 : 300                // ✅ slow down actions for better visibility
    },
    //viewport: { width: 1280, height: 720 }, 
    screenshot: 'on',
    video: 'on-first-retry',
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' }
    },
    // {
    //   name: 'Firefox',
    //   use: { ...devices['Desktop Firefox'] }
    // },
    //   {
    //     name: 'WebKit',
    //     use: { ...devices['Desktop Safari'] }
    //   }
  ]
};

export default config;

