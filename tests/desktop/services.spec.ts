import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

const SERVICE_SECTIONS = [
  'FMS',
  'Support Broker',
  'Palcare',
  'SDoH',
  'Wages Now',
] as const;

test.describe('Palco First - Services redirection from home', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await page.waitForTimeout(5000);
  });

  for (const section of SERVICE_SECTIONS) {
    test(`Services → ${section} redirects and URL is correct`, async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.hoverServicesDropdownAndClick(section);
      await expect(page).toHaveURL(HomePage.servicesUrls[section]);
    });
  }
});
