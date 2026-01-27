import { defineConfig } from '@playwright/test';

const e2ePort = process.env.E2E_PORT ?? '3003';
const e2eBaseUrl = process.env.E2E_BASE_URL ?? `http://localhost:${e2ePort}`;

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: e2eBaseUrl,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `npm run dev -- --port ${e2ePort}`,
    url: e2eBaseUrl,
    reuseExistingServer: true,
    timeout: 120_000,
    env: {
      NEXT_PUBLIC_SUPABASE_URL: `${e2eBaseUrl}/__supabase__`,
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: 'sb_test_publishable_key',
      NEXT_PUBLIC_WORKS_BASE_URL: `${e2eBaseUrl}/__works__`,
    },
  },
});
