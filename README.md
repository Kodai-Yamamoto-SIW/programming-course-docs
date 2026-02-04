# programming-course-docs

Programmingコースの **教材コンテンツ専用** リポジトリです。

このリポジトリ自体は Next.js アプリではありません（サイト実行基盤は別リポジトリ `metyatech/course-docs-site` で共有します）。

## Local preview

`course-docs-site` を使ってプレビューします。

```sh
git clone https://github.com/metyatech/course-docs-site.git
cd course-docs-site
npm install
COURSE_CONTENT_REPO=metyatech/programming-course-docs npm run dev
```

## Deploy (Vercel)

このリポジトリへの push をトリガに、GitHub Actions から Vercel CLI でデプロイします（`.github/workflows/deploy-vercel.yml`）。

必要な GitHub Actions secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Student works hosting (GitHub Pages)

student-works は別リポジトリ `metyatech/programming-course-student-works` で管理し、GitHub Pages に公開します（大容量のため分離）。

サイト側は `NEXT_PUBLIC_WORKS_BASE_URL`（例: `https://metyatech.github.io/programming-course-student-works`）で参照します。
また、作品一覧の表示に必要な `works-index.json` は student-works 側で自動生成されます。

## AGENTS.md

After cloning, initialize submodules:

```bash
git submodule update --init --recursive
```

Regenerate `AGENTS.md`:

```bash
compose-agentsmd
```
