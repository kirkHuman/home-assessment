import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Palco First - Desktop Home', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
  });

  test('homepage loads and shows main heading', async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(page.locator(homePage.selectors.heading)).toBeVisible();
    await expect(page).toHaveTitle(/Redefining Self-Direction|Palco/);
  });

  test('Programs navigation is visible', async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(page.locator(homePage.selectors.programsNav).first()).toBeVisible();
  });

  test('Connect Portal link is present', async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(page.locator(homePage.selectors.connectPortal).first()).toBeVisible();
  });

  test('Contact Us link is present', async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(page.locator(homePage.selectors.contactUs).first()).toBeVisible();
  });

  test('FMS Services section is present', async ({ page }) => {
    await expect(page.getByText('FMS Services').first()).toBeVisible();
  });
});
