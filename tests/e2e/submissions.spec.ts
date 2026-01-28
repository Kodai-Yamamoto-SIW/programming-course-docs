import { expect, test } from '@playwright/test';

const seedYear = '2099-e2e';
const seedStudentId = '25020001';
const nestedStudentId = '25020002';
let introsStore: Map<string, string>;
let commentsStore: Map<
  string,
  Array<{
    id: string;
    student_id: string;
    author_name: string | null;
    message: string;
    created_at: string;
  }>
>;

test.beforeEach(async ({ page }) => {
  introsStore = new Map<string, string>();
  commentsStore = new Map<
    string,
    Array<{
      id: string;
      student_id: string;
      author_name: string | null;
      message: string;
      created_at: string;
    }>
  >();

  await page.route('**/__supabase__/rest/v1/work_intros**', async (route) => {
    const request = route.request();
    const method = request.method();

    if (method === 'GET') {
      const data = Array.from(introsStore.entries()).map(
        ([studentId, intro]) => ({
          year: seedYear,
          student_id: studentId,
          intro,
          updated_at: new Date().toISOString(),
        })
      );
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(data),
      });
      return;
    }

    if (method === 'POST') {
      const payload = JSON.parse(request.postData() ?? '{}') as Record<
        string,
        string | null
      >;
      const introValue = payload.intro ?? null;
      if (introValue) {
        introsStore.set(payload.student_id as string, introValue);
      } else {
        introsStore.delete(payload.student_id as string);
      }

      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            year: payload.year,
            student_id: payload.student_id,
            intro: introValue,
            updated_at: new Date().toISOString(),
          },
        ]),
      });
      return;
    }

    await route.fulfill({ status: 204, body: '' });
  });

  await page.route('**/__supabase__/rest/v1/work_comments**', async (route) => {
    const request = route.request();
    const method = request.method();

    if (method === 'GET') {
      const data = commentsStore.get(seedStudentId) ?? [];
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(data),
      });
      return;
    }

    if (method === 'POST') {
      const payload = JSON.parse(request.postData() ?? '{}') as {
        student_id: string;
        author_name: string | null;
        message: string;
      };
      const nextComment = {
        id: `comment-${Date.now()}`,
        student_id: payload.student_id,
        author_name: payload.author_name ?? null,
        message: payload.message,
        created_at: new Date().toISOString(),
      };
      const current = commentsStore.get(payload.student_id as string) ?? [];
      current.unshift(nextComment);
      commentsStore.set(payload.student_id as string, current);

      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify([nextComment]),
      });
      return;
    }

    await route.fulfill({ status: 204, body: '' });
  });
});

test('intro can be saved and reflected in the card', async ({ page }) => {
  await page.goto(`/submissions?year=${seedYear}`);

  const card = page.getByTestId(`work-card-${seedStudentId}`);
  await card.getByTestId('work-intro-open').click();
  const introInput = card.getByTestId('work-intro-input');
  const saveButton = card.getByTestId('work-intro-save');

  await introInput.fill('テスト紹介文');
  await saveButton.click();

  await expect(card.getByTestId('work-intro-text')).toHaveText('テスト紹介文');
});

test('comment can be submitted and shown', async ({ page }) => {
  await page.goto(`/submissions?year=${seedYear}`);

  const card = page.getByTestId(`work-card-${seedStudentId}`);
  await card.getByTestId('comment-open').click();
  await card.getByTestId('comment-name').fill('テスター');
  await card.getByTestId('comment-message').fill('素敵な作品でした');
  await card.getByTestId('comment-submit').click();

  await expect(card.getByTestId('comment-body')).toContainText(
    '素敵な作品でした'
  );
  const commentAuthor = card.getByTestId('comment-author');
  await expect(commentAuthor).toBeHidden();
  await card.getByTestId('comment-author-toggle').hover();
  await expect(commentAuthor).toContainText('テスター');
});

test('admin can delete a comment', async ({ page }) => {
  await page.addInitScript(() => {
    window.sessionStorage.setItem('admin-comment-token', 'test-admin');
  });

  await page.route('**/api/admin/comments/**', async (route) => {
    const requestUrl = new URL(route.request().url());
    const commentId = requestUrl.pathname.split('/').pop() ?? '';
    if (commentId) {
      for (const [studentId, list] of commentsStore.entries()) {
        commentsStore.set(
          studentId,
          list.filter((comment) => comment.id !== commentId)
        );
      }
    }
    await route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) });
  });

  await page.goto(`/submissions?year=${seedYear}`);

  const card = page.getByTestId(`work-card-${seedStudentId}`);
  await card.getByTestId('comment-open').click();
  await card.getByTestId('comment-message').fill('削除対象のコメント');
  await card.getByTestId('comment-submit').click();

  const commentBody = card.getByTestId('comment-body').filter({
    hasText: '削除対象のコメント',
  });
  await expect(commentBody).toBeVisible();

  const commentItem = commentBody.locator('..');
  await commentItem.getByTestId('comment-delete').click();
  await expect(commentBody).toBeHidden();
});

test('intro and comments refresh when data changes in background', async ({
  page,
}) => {
  introsStore.set(seedStudentId, '初期紹介文');
  commentsStore.set(seedStudentId, [
    {
      id: 'comment-seed',
      student_id: seedStudentId,
      author_name: '見学者',
      message: '初期コメント',
      created_at: new Date().toISOString(),
    },
  ]);

  await page.goto(`/submissions?year=${seedYear}`);

  const card = page.getByTestId(`work-card-${seedStudentId}`);
  await expect(card.getByTestId('work-intro-text')).toHaveText('初期紹介文');
  await card.getByTestId('comment-open').click();
  await expect(card.getByTestId('comment-body')).toHaveText('初期コメント');

  introsStore.set(seedStudentId, '更新後の紹介文');
  commentsStore.set(seedStudentId, []);

  await page.evaluate(() => {
    window.dispatchEvent(new Event('focus'));
    document.dispatchEvent(new Event('visibilitychange'));
  });

  await expect(card.getByTestId('work-intro-text')).toHaveText(
    '更新後の紹介文'
  );
  await card.getByTestId('comment-close').click();
  await expect(card.getByTestId('comment-open')).toHaveText(/コメントを見る/);
});

test('comment display name is shared across cards', async ({ page }) => {
  await page.goto(`/submissions?year=${seedYear}`);

  const cardA = page.getByTestId(`work-card-${seedStudentId}`);
  const cardB = page.getByTestId(`work-card-${nestedStudentId}`);

  await cardA.getByTestId('comment-open').click();
  await cardA.getByTestId('comment-name').fill('共通表示名');
  await page.getByTestId('comment-close').click();

  await cardB.getByTestId('comment-open').click();
  await expect(cardB.getByTestId('comment-name')).toHaveValue('共通表示名');

  await cardB.getByTestId('comment-name').fill('更新済み表示名');
  await page.getByTestId('comment-close').click();

  await cardA.getByTestId('comment-open').click();
  await expect(cardA.getByTestId('comment-name')).toHaveValue(
    '更新済み表示名'
  );
});

test('nested index.html uses the nested path', async ({ page }) => {
  await page.goto(`/submissions?year=${seedYear}`);

  const card = page.getByTestId(`work-card-${nestedStudentId}`);
  const iframe = card.locator('iframe');

  await expect(iframe).toHaveAttribute(
    'src',
    new RegExp(`/__works__/${seedYear}/${nestedStudentId}/project/index\\.html$`)
  );
});

test('long comments can be expanded and collapsed', async ({ page }) => {
  const longMessage = Array.from({ length: 12 })
    .map((_, index) => `長文コメント行${index + 1}`)
    .join('\n');
  commentsStore.set(seedStudentId, [
    {
      id: 'comment-long',
      student_id: seedStudentId,
      author_name: '長文投稿者',
      message: longMessage,
      created_at: new Date().toISOString(),
    },
  ]);

  await page.goto(`/submissions?year=${seedYear}`);

  const card = page.getByTestId(`work-card-${seedStudentId}`);
  await card.getByTestId('comment-open').click();
  const expandButton = card.getByTestId('comment-expand');
  await expect(expandButton).toHaveText('続きを読む');

  await expandButton.click();
  await expect(expandButton).toHaveText('折りたたむ');

  await expandButton.click();
  await expect(expandButton).toHaveText('続きを読む');
});

test('comments are collapsed by default', async ({ page }) => {
  await page.goto(`/submissions?year=${seedYear}`);

  const card = page.getByTestId(`work-card-${seedStudentId}`);
  await expect(card.getByTestId('comment-open')).toBeVisible();
  await expect(page.getByTestId('comment-drawer')).toHaveCount(0);
});
