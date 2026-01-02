import { test, expect } from '../src/fixtures/base.fixture';

test.describe('Login flow', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.assertNavigation();
    await loginPage.acceptImportantNoticeIfPresent();
  });

  test('Verify searched league is listed', async ({ mainPage }) => {
    await mainPage.searchLeague.fill('Premier League');
    await mainPage.waitForTimeout(2000);
    await mainPage.assertAllLeaguesContainPremierLeague();
    await mainPage.assertSearchResultsContainKeyword('Premier League');
  });

  test('Verify searched result is listed', async ({ mainPage }) => {
    await mainPage.searchLeague.fill('french');
    await mainPage.waitForTimeout(1000);
    await mainPage.assertSearchResultsContainKeyword('french');
  });

  test('Verify main listings are displayed', async ({ mainPage }) => {
    await mainPage.clickMarkets();
    await mainPage.assertMainListingsVisibleOnLoad();
  });
});
