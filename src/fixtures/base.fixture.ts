import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { generateRandomEmail, generateRandomPassword } from '../utils/testData';
import { env } from '../utils/env';

type LoginTestUser = {
  email: string;
  password: string;
};

type SignupTestUser = {
  email: string;
  password: string;
};

type Pages = {
  loginPage: LoginPage;
  mainPage: MainPage;
  loginTestUser: LoginTestUser;
  signupTestUser: SignupTestUser;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },

  loginTestUser: async ({}, use) => {
    await use({
      email: env.testEmail,
      password: env.testPassword,
    });
  },
  signupTestUser: async ({}, use) => {
    const email = generateRandomEmail();
    const password = generateRandomPassword();
    await use({ email, password });
  }
});

export { expect };
