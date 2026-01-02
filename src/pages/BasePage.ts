import type { Page } from '@playwright/test';
import { expect, type Locator } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path: string) {
    await this.page.goto(path);
  }

  async assertText(
    locator: Locator,
    expectedText: string | RegExp
  ): Promise<void> {
    await expect(locator).toHaveText(expectedText);
  }
}
