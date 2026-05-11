import { test, expect } from '@playwright/test';

test('homepage loads and has correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Astro/);
});

test('homepage renders the main heading', async ({ page }) => {
  await page.goto('/');
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toBeVisible();
});
