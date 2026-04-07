# programming-course-docs

Course content repository for the Programming course.

This repo is **content-only** (not a Next.js app). The shared site runtime lives in `metyatech/course-docs-site`.

## Local preview

Use `course-docs-site` and point it at this content repo:

```sh
git clone https://github.com/metyatech/course-docs-site.git
cd course-docs-site
npm install
COURSE_CONTENT_SOURCE=../programming-course-docs npm run dev
```

This repository follows the same local-checkout flow used by the GitHub Actions deploy workflow.
`course-docs-site` always reads this repo from a checked-out local path rather than `github:owner/repo#ref`.

## Deploy (Vercel)

Deployment is done via GitHub Actions using the Vercel CLI (no Vercel GitHub integration).
See `.github/workflows/deploy-vercel.yml`.
The workflow checks out this repository into `course-content`, then points
`COURSE_CONTENT_SOURCE` at `../course-content`.

Required GitHub Actions secrets:

- `VERCEL_TOKEN` (a Vercel access token with access to the target project/team)
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Student works (GitHub Pages)

Student works are hosted from a separate repository to avoid bloating this repo:

- Works repo: `metyatech/programming-course-student-works`
- Pages base URL: `https://metyatech.github.io/programming-course-student-works`

The course site uses `NEXT_PUBLIC_WORKS_BASE_URL` to build iframe URLs, and reads `works-index.json`
from the same base URL.

## Project files

- `content/`: course pages (MDX)
- `public/`: static files (e.g. `public/img/**`)
- `site.config.ts`: per-course site configuration consumed by `course-docs-site`

## Agent rules

This repo includes `agent-rules-private` as a git submodule. Initialize it after cloning:

```bash
git submodule update --init --recursive
```

Regenerate `AGENTS.md` after editing `agent-ruleset.json`:

```bash
compose-agentsmd
```
