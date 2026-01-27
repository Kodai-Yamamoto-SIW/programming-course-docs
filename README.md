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

### Search

Nextra search uses Pagefind. The search index is generated on `npm run build`
via the `postbuild` script and written to `public/_pagefind/` (ignored in git).
Search isn't available in `npm run dev` until you've built once; run
`npm run build` and then restart `npm run dev` to test.

### Start production server

```bash
npm run start
```

### Typecheck

```bash
npm run typecheck
```

### Test

```bash
npm run test
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

### Student works metadata

Each submission is served from `public/student-works/<year>/<studentId>/index.html`.
Introductions and comments are stored in Supabase so they are shared across devices
and updated in real time.

#### Supabase setup

Create a Supabase project, then create the tables below and enable Row Level Security
(RLS). The app uses a publishable API key in the browser, so RLS policies are required.

```sql
create table if not exists public.work_intros (
  year text not null,
  student_id text not null,
  intro text,
  updated_at timestamptz not null default now(),
  primary key (year, student_id)
);

create table if not exists public.work_comments (
  id uuid primary key default gen_random_uuid(),
  year text not null,
  student_id text not null,
  author_name text,
  message text not null,
  created_at timestamptz not null default now()
);
```

Enable realtime for both tables:

```sql
alter publication supabase_realtime add table public.work_intros;
alter publication supabase_realtime add table public.work_comments;
```

Example RLS policies (public read, anonymous insert, public update for intros, no deletes):

```sql
alter table public.work_intros enable row level security;
alter table public.work_comments enable row level security;

create policy "read work intros"
on public.work_intros for select
using (true);

create policy "read work comments"
on public.work_comments for select
using (true);

create policy "insert work comments"
on public.work_comments for insert
with check (true);

create policy "upsert work intros"
on public.work_intros for insert
with check (true);

create policy "update work intros"
on public.work_intros for update
using (true)
with check (true);
```

Introductions can be edited from the submissions page UI (public editing).

#### Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=https://qshyifbipsyrowssjqnd.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_fPG8qs1FKKvqYKsdTsCYjg_iWGNgwPN
NEXT_PUBLIC_WORKS_BASE_URL=https://metyatech.github.io/programming-course-docs
```

### Student works hosting (GitHub Pages)

Student works can be hosted on GitHub Pages to reduce Vercel bandwidth usage.
The workflow `.github/workflows/deploy-student-works-pages.yml` publishes
`public/student-works` to Pages on every push.

Set `NEXT_PUBLIC_WORKS_BASE_URL` to the Pages base URL so the iframe links
point to the external host. Example:

```
NEXT_PUBLIC_WORKS_BASE_URL=https://metyatech.github.io/programming-course-docs
```

## Deploy

Deploy via GitHub Actions with the Vercel CLI (`.github/workflows/deploy-vercel.yml`).

Required GitHub secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

You can obtain the org/project IDs by running `npx vercel link` locally and checking
`.vercel/project.json` (do not commit that directory).

## Environment variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_WORKS_BASE_URL` (optional; GitHub Pages base URL for works)
