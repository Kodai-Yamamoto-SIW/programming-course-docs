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

このリポジトリへの push をトリガに、Vercel の Deploy Hook を叩きます（`.github/workflows/deploy-vercel.yml`）。

必要な GitHub Actions secrets:

- `VERCEL_DEPLOY_HOOK_URL`

## Student works hosting (GitHub Pages)

`.github/workflows/deploy-student-works-pages.yml` が `public/student-works` を GitHub Pages に公開します。

サイト側は `NEXT_PUBLIC_WORKS_BASE_URL`（例: `https://metyatech.github.io/programming-course-docs`）で参照します。

## AGENTS.md

After cloning, initialize submodules:

```bash
git submodule update --init --recursive
```

Regenerate `AGENTS.md`:

```bash
compose-agentsmd
```

