import { expect, test } from '@playwright/test';

test('"/" focuses search when not typing, and does not steal focus from CodePreview editor', async ({
  page,
}) => {
  await page.goto('/docs/html-basics/elements/');

  const searchInput = page.locator('input[type="search"]').first();
  await expect(searchInput).toBeVisible();

  const monacoEditor = page.locator('.monaco-editor').first();
  await expect(monacoEditor).toBeVisible();

  await monacoEditor.click();
  await expect
    .poll(async () => {
      return await page.evaluate(() => {
        const el = document.activeElement;
        return !!el && typeof (el as HTMLElement).closest === 'function'
          ? (el as HTMLElement).closest('.monaco-editor') !== null
          : false;
      });
    })
    .toBe(true);

  await page.keyboard.type('/SLASH_TEST_123');
  await expect(searchInput).toHaveValue('');
  await expect(monacoEditor).toContainText('SLASH_TEST_123');

  await page.getByRole('heading', { name: '要素' }).first().click();
  await page.keyboard.press('/');
  await expect(searchInput).toBeFocused();
});

