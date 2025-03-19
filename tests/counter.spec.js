// @ts-check

import { test, expect } from "@playwright/test";

// Test 2
test('Counter should increment, decrement, and reset correctly', async ({ page }) => {
    await page.goto('/login');
   
    await page.locator('#email-input').fill('test@maddox123.ai');
    await page.locator('#password-input').fill('supersecure');
    await page.getByRole('button', { name: 'Login' }).click();
   
    await expect(page.getByRole('paragraph')).toContainText('0');

    await page.getByRole('button', { name: '+' }).click();
    await expect(page.getByRole('paragraph')).toContainText('1');

    await page.getByRole('button', { name: '-' }).click();
    await expect(page.getByRole('paragraph')).toContainText('0');

    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await expect(page.getByRole('paragraph')).toContainText('2');

    await page.getByRole('button', { name: 'Reset' }).click();
    await expect(page.getByRole('paragraph')).toContainText('0');
  });