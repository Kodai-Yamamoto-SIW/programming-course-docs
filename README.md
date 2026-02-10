# programming-course-docs

Course content repository for the Programming course.

This repo is **content-only** (not a Next.js app). The shared site runtime lives in [`metyatech/course-docs-site`](https://github.com/metyatech/course-docs-site).

## Overview

This repository contains the MDX-based course content, static assets, and site configuration for the Programming course site. It is designed to be consumed by a generic documentation site runtime.

## Support and Compliance

- **Supported Environments**: Node.js 20+ (for tools)
- **CI**: GitHub Actions (Linting, rule verification)
- **Security**: See [SECURITY.md](SECURITY.md)
- **Contribution**: See [CONTRIBUTING.md](CONTRIBUTING.md)
- **License**: [MIT](LICENSE)

## Local Preview

To preview the content locally, you must use the `course-docs-site` runtime and point it at this directory:

```sh
# 1. Clone the site runtime
git clone https://github.com/metyatech/course-docs-site.git
cd course-docs-site
npm install

# 2. Run the site pointing to this local content directory
# Replace /path/to/programming-course-docs with your actual local path
COURSE_CONTENT_SOURCE=path/to/programming-course-docs npm run dev
```

## Development Commands

*   `compose-agentsmd`: Regenerates `AGENTS.md` from `agent-ruleset.json` and external rule sources.
*   `compose-agentsmd --check`: Verifies that `AGENTS.md` is up to date (used in CI).

## Deploy (Vercel)

Deployment is automated via GitHub Actions when changes are pushed to the `master` branch.
See [`.github/workflows/deploy-vercel.yml`](.github/workflows/deploy-vercel.yml).

Required GitHub Actions secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Project Structure

- `content/`: Course pages (MDX) and page-specific assets (`img/`, `assets/`).
- `public/`: Global static files (e.g., `public/img/favicon.ico`).
- `site.config.ts`: Per-course site configuration.
- `agent-rules-private/`: Git submodule containing private course-authoring rules.
- `AGENTS.md`: Combined rules for AI agents.

## Student Works

Student works are hosted in a separate repository: [`metyatech/programming-course-student-works`](https://github.com/metyatech/programming-course-student-works).
The base URL is: `https://metyatech.github.io/programming-course-student-works`.

---

[LICENSE](LICENSE) | [SECURITY](SECURITY.md) | [CONTRIBUTING](CONTRIBUTING.md) | [CODE OF CONDUCT](CODE_OF_CONDUCT.md) | [CHANGELOG](CHANGELOG.md)
