import { test, expect } from '@playwright/test';

test('backgrounds exercise CodePreviews do not show JavaScript tab when no JS is provided', async ({
  page,
}) => {
  await page.goto('/docs/css-basics/backgrounds/');

  const exercise1Heading = page.getByRole('heading', {
    name: '演習1: 相対パス練習1',
  });
  await expect(exercise1Heading).toBeVisible();

  const exercise1Block = exercise1Heading.locator(
    'xpath=following::div[contains(@class,"rensyuBlock")][1]'
  );
  await expect(exercise1Block).toBeVisible();

  const exercise1Problem = exercise1Block.locator('.rensyuNaiyou').first();
  const exercise1Solution = exercise1Block.locator('.rensyuKaitou').first();

  const exercise1ProblemPreview = exercise1Problem
    .locator('[class*="codePreviewContainer"]')
    .first();
  await expect(exercise1ProblemPreview).toBeVisible();

  const exercise1ProblemJs = exercise1ProblemPreview.getByText('JavaScript');
  await expect
    .poll(async () => await exercise1ProblemJs.isVisible(), { timeout: 5_000 })
    .toBe(false);

  await expect(exercise1Solution).toBeVisible();
  await exercise1Solution.locator('summary').click();

  const exercise1SolutionPreview = exercise1Solution
    .locator('[class*="codePreviewContainer"]')
    .first();
  await expect(exercise1SolutionPreview).toBeVisible();
  const exercise1SolutionJs = exercise1SolutionPreview.getByText('JavaScript');
  await expect
    .poll(async () => await exercise1SolutionJs.isVisible(), { timeout: 5_000 })
    .toBe(false);

  const exercise2Heading = page.getByRole('heading', {
    name: '演習2: 相対パス練習2',
  });
  await expect(exercise2Heading).toBeVisible();

  const exercise2Block = exercise2Heading.locator(
    'xpath=following::div[contains(@class,"rensyuBlock")][1]'
  );
  await expect(exercise2Block).toBeVisible();

  const exercise2Problem = exercise2Block.locator('.rensyuNaiyou').first();
  const exercise2Solution = exercise2Block.locator('.rensyuKaitou').first();

  const exercise2ProblemPreview = exercise2Problem
    .locator('[class*="codePreviewContainer"]')
    .first();
  await expect(exercise2ProblemPreview).toBeVisible();
  const exercise2ProblemJs = exercise2ProblemPreview.getByText('JavaScript');
  await expect
    .poll(async () => await exercise2ProblemJs.isVisible(), { timeout: 5_000 })
    .toBe(false);

  await expect(exercise2Solution).toBeVisible();
  await exercise2Solution.locator('summary').click();

  const exercise2SolutionPreview = exercise2Solution
    .locator('[class*="codePreviewContainer"]')
    .first();
  await expect(exercise2SolutionPreview).toBeVisible();
  const exercise2SolutionJs = exercise2SolutionPreview.getByText('JavaScript');
  await expect
    .poll(async () => await exercise2SolutionJs.isVisible(), { timeout: 5_000 })
    .toBe(false);
});
