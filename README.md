# across-frontend

[![CI](https://github.com/NASA-ACROSS/across-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/NASA-ACROSS/across-frontend/actions/workflows/ci.yml)
[![Main](https://github.com/NASA-ACROSS/across-frontend/actions/workflows/main.yml/badge.svg)](https://github.com/NASA-ACROSS/across-frontend/actions/workflows/main.yml)
[![Release](https://github.com/NASA-ACROSS/across-frontend/actions/workflows/release-please.yml/badge.svg)](https://github.com/NASA-ACROSS/across-frontend/actions/workflows/release-please.yml)

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
