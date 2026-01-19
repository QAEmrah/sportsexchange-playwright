import { test, expect } from '../src/fixtures/base.fixture';

test.describe('Login flow', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.assertNavigation();
    await loginPage.acceptImportantNoticeIfPresent();
  });

  test('Login with valid credentials', async ({ loginPage, loginTestUser }) => {
    await loginPage.loginButton.click();
    await loginPage.login(loginTestUser.email, loginTestUser.password);
    await loginPage.clickAndAssertApiResponse(
      loginPage.continueButton,
      '/papi/coil-web/rest/login',
      200
    );

    await loginPage.assertSuccessfulLogin();
  });

  test('Signup flow does not work without affiliate link', async ({
    loginPage,
    signupTestUser,
  }) => {
    await loginPage.loginButton.click();
    await loginPage.login(signupTestUser.email, signupTestUser.password);
    await loginPage.clickAndAssertApiResponse(
      loginPage.continueButton,
      '/papi/coil-web/rest/login',
      400,
      false
    );

    await loginPage.assertBadCredentials();
  });
});
