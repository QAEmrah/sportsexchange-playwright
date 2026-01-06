import 'dotenv/config';
import { defineConfig } from '@playwright/test';
import { env } from './src/utils/env';

export default defineConfig({
  reporter: [
    ['list'],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['html', { open: 'never' }],
  ],
  use: {
    baseURL: env.baseUrl,
    viewport: { width: 1280, height: 720 },
    headless: env.headless,
    trace: 'on-first-retry',
    video: 'retain-on-failure', // or 'on' / 'off' / 'on-first-retry'
  },
});
