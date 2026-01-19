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
  private get nav(): Locator {
    return this.page.getByRole('navigation');
  }

  get depositButton(): Locator {
    return this.page.getByRole('button', { name: /^deposit$/i });
  }

  get fantasyPick5Button(): Locator {
    return this.page.locator('a[href="/fantasypick5"]:visible');
  }

 get portfolioButton(): Locator {
  return this.nav.getByRole('link', { name: /^portfolio$/i });
}


 get availableWalletButton(): Locator {
  return this.nav.getByRole('link', { name: /^available$/i });
}


  get preBoughtButton(): Locator {
    return this.nav.getByRole('link', { name: /^pre-bought$/i });
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
    // await this.continueButton.click();
  }

  async assertNavigation() {
    await expect(this.page).toHaveURL(
      'https://app.test.pandafantasy.id/dashboard'
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

  async assertSuccessfulLogin() {
    await expect(this.depositButton).toBeVisible({ timeout: 30_000 });
    await expect(this.fantasyPick5Button).toBeVisible();
    await expect(this.portfolioButton).toBeVisible();
    await expect(this.availableWalletButton).toBeVisible();
    await expect(this.preBoughtButton).toBeVisible();
  }

  async clickAndAssertApiResponse(
    trigger: Locator,
    urlContains: string,
    expectedStatus: number,
    expectedSuccess?: boolean
  ) {
    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes(urlContains) &&
        response.request().method() === 'POST'
    );

    await trigger.click();

    const response = await responsePromise;

    const responseUrl = response.url();
    const status = response.status();

    const raw = await response.text();
    let body: unknown = null;

    if (raw && raw.trim().length > 0) {
      try {
        body = JSON.parse(raw);
      } catch {
        body = raw; // not JSON (html/text)
      }
    }

    console.log('API URL:', responseUrl);
    console.log('Status:', status);
    console.log('Response body(raw):', raw);
    console.log(
      'Response body(parsed):',
      typeof body === 'string' ? body : JSON.stringify(body, null, 2)
    );

    expect(status).toBe(expectedStatus);

    if (expectedSuccess !== undefined) {
      expect(body).toEqual(
        expect.objectContaining({
          success: expectedSuccess,
        })
      );
    }

    return { status, url: responseUrl, raw, body };
  }
}
