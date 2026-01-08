# programming-course-docs

Course site built with [Docusaurus](https://docusaurus.io/) (TypeScript).

## Requirements

- Node.js: see `engines.node` in `package.json` (currently `>=20`)
- Package manager: npm

## Setup

```bash
npm install
```

## Development commands

### Local development

```bash
npm run start
```

### Build

```bash
npm run build
```

Outputs static files to `build/`.

### Preview production build

```bash
npm run serve
```

### Typecheck

```bash
npm run typecheck
```

## Assets / course components

This site uses shared modules from the workspace:

- `@metyatech/code-preview` (interactive HTML/CSS/JS previews)
- `@metyatech/exercise` (exercise/solution blocks)
- `@metyatech/docusaurus-download-assets` (import/require for `docs/**/assets/`)

## Deploy

GitHub Pages deployment is handled by GitHub Actions: `.github/workflows/deploy.yml`.

`npm run deploy` (Docusaurus deploy script) still exists, but the default deployment flow is the Actions workflow.

## Environment variables

None.
