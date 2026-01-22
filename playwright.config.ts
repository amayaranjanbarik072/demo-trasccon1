import { PlaywrightTestConfig, devices } from '@playwright/test';
import { EnvUtils } from './src/utils/envUtils';
const config: PlaywrightTestConfig = {
  testDir: './src/tests',
  timeout: 50_000,
  expect: {
    timeout: 5_000
  },
  // fullyParallel: true,
  // forbidOnly: !!process.env.CI,
  // retries: process.env.CI ? 2 : 0,
  reporter: [['html', { open: 'never' }]],
  use: {
    // baseURL: 'https://demo-tras.getapcs.com',
    baseURL: EnvUtils.getBaseUrl(),
    headless: false,
    // viewport: { width: 1280, height: 720 },
    viewport: null,      // ✅ allow full browser window
    screenshot: 'on',
    video: 'on-first-retry',
    launchOptions: {
      args: ['--start-maximized']      // ✅ maximize window
    },
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
  },
  // projects: [
  //   {
  //     name: 'Chromium',
  //     //use: { ...devices['Desktop Chrome'] }
  //     use: { browserName: 'chromium' }
  //   },
  //   {
  //     name: 'Firefox',
  //     use: { ...devices['Desktop Firefox'] }
  //   },
  //   {
  //     name: 'WebKit',
  //     use: { ...devices['Desktop Safari'] }
  //   }
  // ]
};

export default config;

