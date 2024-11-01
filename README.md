# across-frontend

## Developing

Install dependencies with `npm ci`.

### Start a development server

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Configuration Environment Variables

The ACROSS frontend relies on environment variables to run. The following are
essential for operation:

| Variable               | Use                                                                               |
| ---------------------- | --------------------------------------------------------------------------------- |
| `API_URL`              | Base hostname and port for the API                                                |
| `ACROSS_API_TOKEN`     | API key used by admin user for login and registration routes.                     |
| `PUBLIC_BUILD_VERSION` | Sets version in header meta tag "build-version". **REQUIRED** for `npm run build` |

**IMPORTANT:** The `ACROSS_ADMIN_TOKEN` env var in `across-api` should match
`ACROSS_API_TOKEN`. Run the API locally after running a migration to add the
user to local database.

## Building

To create a production version:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Testing

This project utilizes the following tools for various testing requirements

| Unit Tests | Component Tests                      | E2E Tests  |
| ---------- | ------------------------------------ | ---------- |
| Vitest     | `vitest` + `@testing-library/svelte` | Playwright |

### E2E

It is assumed that playwright is installed locally with

```bash
npx playwright install
```

when running e2e tests locally, you must simulataneously run an accompanying `across-api` server to receive requests

It is recommended to install the extension
[Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) which is included in the workspace recommended extension configuration

#### Running E2E tests

1. Start the API server and database
2. Click the Testing tab on the left side of VSCode and choose a test to run or use the command line to run

```bash
npm run test:e2e
```
