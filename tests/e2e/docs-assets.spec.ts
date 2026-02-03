import { test, expect } from '@playwright/test';

const encodePath = (pathname: string) => encodeURI(pathname);

test.describe('docs assets', () => {
  test('serves images from content/docs', async ({ request }) => {
    const res = await request.get(
      '/docs/css-basics/backgrounds/img/background-sample.png'
    );
    expect(res.status()).toBe(200);
    const contentType = res.headers()['content-type'] ?? '';
    expect(contentType).toContain('image/png');
    const bytes = await res.body();
    expect(bytes.byteLength).toBeGreaterThan(1000);
  });

  test('serves downloadable files from content/docs (txt/html/zip)', async ({
    request,
  }) => {
    const txtRes = await request.get(
      encodePath(
        '/docs/html-basics/practice-exercises/markup-exercises/assets/演習用原稿.txt'
      )
    );
    expect(txtRes.status()).toBe(200);
    expect(txtRes.headers()['content-type'] ?? '').toContain('text/plain');
    expect(txtRes.headers()['content-disposition'] ?? '').toContain(
      'attachment'
    );
    const txtBody = await txtRes.text();
    expect(txtBody.length).toBeGreaterThan(10);

    const htmlRes = await request.get(
      '/docs/html-basics/practice-exercises/markup-exercises/assets/markup-exercises-complete.html'
    );
    expect(htmlRes.status()).toBe(200);
    expect(htmlRes.headers()['content-type'] ?? '').toContain('text/html');
    expect(htmlRes.headers()['content-disposition'] ?? '').toContain(
      'attachment'
    );

    const zipRes = await request.get(
      '/docs/html-basics/images-links/assets/images-links-complete.zip'
    );
    expect(zipRes.status()).toBe(200);
    expect(zipRes.headers()['content-type'] ?? '').toContain('application/zip');
    expect(zipRes.headers()['content-disposition'] ?? '').toContain(
      'attachment'
    );
    const zipBytes = await zipRes.body();
    expect(zipBytes.byteLength).toBeGreaterThan(1000);
  });
});
