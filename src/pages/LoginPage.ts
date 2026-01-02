import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators

  get title(): Locator {
    return this.page.locator('h1');
  }

  get passwordInput(): Locator {
    return this.page.locator('#dlab-password');
  }

  get continueButton(): Locator {
    return this.page.getByRole('button', { name: /^continue$/i });
  }

  get loginButton(): Locator {
    return this.page.locator('nav').getByRole('button', { name: /log in/i });
  }

  get emailOrUsernameInput(): Locator {
    return this.page.getByPlaceholder(/email or username/i);
  }
  get understandButton(): Locator {
    return this.page.getByRole('button', { name: /^i understand$/i });
  }

  get badCredentials(): Locator {
    return this.page.getByText('Bad credentials');
  }

  // Methods
  async open() {
    await this.page.goto('/dashboard');
  }

  async waitForTimeout(timeout: number) {
    await this.page.waitForTimeout(timeout);
  }

  async login(email: string, password: string) {
    console.log('email :' + email, 'password :' + password);
    await this.emailOrUsernameInput.fill(email);
    await this.continueButton.click();
    await this.passwordInput.fill(password);
    await this.continueButton.click();
  }

  async assertNavigation() {
    await expect(this.page).toHaveURL(
      'https://app.thesportexchange.com/dashboard'
    );
  }

  async assertTitleText(expected: string | RegExp) {
    await expect(this.title).toHaveText(expected);
  }

  async assertTitle(expected: string | RegExp = /account/i) {
    await expect(this.page).toHaveTitle(expected);
  }

  async acceptImportantNoticeIfPresent() {
    if (
      await this.understandButton
        .isVisible({ timeout: 3000 })
        .catch(() => false)
    ) {
      await this.understandButton.click();
    }
  }

  assertBadCredentials() {
    return expect(this.badCredentials).toBeVisible();
  }
}
