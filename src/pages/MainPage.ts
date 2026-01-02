import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class MainPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  // Locators
  get searchLeague(): Locator {
    return this.page.locator('input[name="competition-search"]');
  }

  get leagueNameItems(): Locator {
    return this.page.locator('span.unit.fw-bold');
  }

  get topValuedKeysTitle(): Locator {
    return this.page.getByText('Top Valued Keys', { exact: true });
  }

  get newListingsTitle(): Locator {
    return this.page.getByText('New Listings', { exact: true });
  }

  get topGainerKeysTitle(): Locator {
    return this.page.getByText('Top Gainer Keys', { exact: true });
  }

  get topVolumeKeysTitle(): Locator {
    return this.page.getByText('Top Volume Keys', { exact: true });
  }

  get marketsLinks(): Locator {
    return this.page.locator('a[href="/markets"]');
  }

  get marketsLink(): Locator {
    return this.marketsLinks.filter({ hasText: 'Markets' }).first();
  }

  // Methods

  async clickMarkets() {
    const links = this.page
      .locator('a[href="/markets"]')
      .filter({ hasText: 'Markets' });
    const count = await links.count();

    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      if (await link.isVisible().catch(() => false)) {
        await link.click();
        return;
      }
    }

    throw new Error('Markets link exists but none are visible/clickable');
  }

  async waitForTimeout(timeout: number) {
    await this.page.waitForTimeout(timeout);
  }
  async assertMainListingsVisibleOnLoad() {
    const titles = [
      this.topValuedKeysTitle,
      this.newListingsTitle,
      this.topGainerKeysTitle,
      this.topVolumeKeysTitle,
    ];

    console.log('\n📋 Main listings displayed on load:');

    for (let i = 0; i < titles.length; i++) {
      const titleLocator = titles[i];

      await expect(titleLocator).toBeVisible();

      const text = (await titleLocator.textContent())?.trim();
      console.log(`  ${i + 1}. ${text}`);
    }
  }

  async assertAllLeaguesContainPremierLeague() {
    const names = await this.leagueNameItems.allTextContents();

    // Safety check (you expect 3 results)
    expect(names.length).toBeGreaterThan(0);

    for (const name of names) {
      expect(name).toContain('Premier League');
    }
  }

  async assertSearchResultsContainKeyword(keyword: string): Promise<number> {
    const normalizedKeyword = keyword.toLowerCase();

    // Wait until at least one result is visible
    await expect(this.leagueNameItems.first()).toBeVisible();

    const names = await this.leagueNameItems.allTextContents();
    const count = names.length;

    console.log(`\n🔍 Search keyword: "${keyword}"`);
    console.log(`📊 Results found: ${count}`);

    expect(count).toBeGreaterThan(0);

    names.forEach((name, index) => {
      console.log(`  ${index + 1}. ${name}`);
      expect(name.toLowerCase()).toContain(normalizedKeyword);
    });

    return count;
  }
}
