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

### Start production server

```bash
npm run start
```

### Typecheck

```bash
npm run typecheck
```

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

Deploy via GitHub Actions with the Vercel CLI (`.github/workflows/deploy-vercel.yml`).

Required GitHub secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

You can obtain the org/project IDs by running `npx vercel link` locally and checking
`.vercel/project.json` (do not commit that directory).

## Environment variables

None.
