import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { generateRandomEmail, generateRandomPassword } from '../utils/testData';

type TestUser = {
  email: string;
  password: string;
};

type Pages = {
  loginPage: LoginPage;
  mainPage: MainPage;
  testUser: TestUser;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },

  testUser: async ({}, use) => {
    await use({
      email: generateRandomEmail('yopmail.com'),
      password: generateRandomPassword(),
    });
  },
});

export { expect };
