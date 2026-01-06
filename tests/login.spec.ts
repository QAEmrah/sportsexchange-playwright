import { test, expect } from '../src/fixtures/base.fixture';

test.describe('Login flow', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.assertNavigation();
    await loginPage.acceptImportantNoticeIfPresent();
  });

  test('login flow works', async ({ loginPage, testUser }) => {
    await loginPage.loginButton.click();
    await loginPage.login(testUser.email, testUser.password);
    await loginPage.clickAndAssertApiResponse(
      loginPage.continueButton,
      '/papi/coil-web/rest/login',
      400,
      false
    );

    await loginPage.assertBadCredentials();
  });
});
