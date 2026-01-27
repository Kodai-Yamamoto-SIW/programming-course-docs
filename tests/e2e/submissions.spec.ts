import { expect, test } from '@playwright/test';

const seedYear = '2025';
const seedStudentId = '25020001';

test.beforeEach(async ({ page }) => {
  const intros = new Map<string, string>();
  const comments = new Map<
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
      const data = Array.from(intros.entries()).map(([studentId, intro]) => ({
        year: seedYear,
        student_id: studentId,
        intro,
        updated_at: new Date().toISOString(),
      }));
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
        intros.set(payload.student_id as string, introValue);
      } else {
        intros.delete(payload.student_id as string);
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
      const data = comments.get(seedStudentId) ?? [];
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
      const current = comments.get(payload.student_id as string) ?? [];
      current.unshift(nextComment);
      comments.set(payload.student_id as string, current);

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
  await expect(card.getByTestId('comment-author')).toContainText('テスター');
});
