# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Setup

### Installation

```bash
yarn
```

## Development Commands

### Local Development

```bash
yarn start
```

This starts a local development server and opens a browser window. Most changes are reflected live without restarting the server.

### Build

```bash
yarn build
```

This generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command builds the website and pushes to the `gh-pages` branch.

### Typecheck

```bash
yarn typecheck
```

## Environment Variables/Settings

None.
