# programming-course-docs

Course site built with [Nextra](https://nextra.site/) (Next.js + MDX).

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
npm run dev
```

### Build

```bash
npm run build
```

Outputs static files to `out/`.

### Preview production build

```bash
npx serve out
```

### Typecheck

```bash
npm run typecheck
```

## Base path

The site is configured with a base path in `next.config.js` (`/programming-course-docs`).
Update it if you deploy under a different path.

## AGENTS.md

This project uses `agent-rules`, `agent-rules-tools`, and `agent-rules-private` as git submodules.
After cloning, initialize submodules:

```bash
git submodule update --init --recursive
```

Update `agent-ruleset.json` as needed and regenerate:

```bash
node agent-rules-tools/tools/compose-agents.cjs
```

## Assets / course components

This site uses shared modules from sibling repositories:

- `@metyatech/code-preview` (interactive HTML/CSS/JS previews)

Static assets live in `public/`.

## Deploy

GitHub Pages deployment is handled by GitHub Actions: `.github/workflows/deploy.yml`.

## Environment variables

None.
