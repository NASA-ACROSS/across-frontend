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
essential for operation, you can find an example in `.env.example`. Copy the file and rename it to `.env`.

| Variable                   | Use                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------ |
| `API_URL`                  | Base hostname and port for the API                                                               |
| `RUNTIME_ENV`              | Runtime mode (`local`, `test`, etc.) used by server-side auth initialization                     |
| `ACROSS_SERVER_SECRET`     | client_secret used webserver credentials manager (defaults to current local secret)              |
| `ACROSS_SERVER_ID`         | client_id used by webserver credentials manager (defaults to current local ID)                   |
| `ACROSS_TEST_ACCESS_TOKEN` | dummy test access token                                                                          |
| `ALTCHA_HMAC_KEY`          | HMAC secret for the self-hosted ALTCHA captcha. When set, takes precedence over SSM (local/test) |
| `ALTCHA_HMAC_KEY_PATH`     | SSM parameter path for the ALTCHA HMAC secret (defaults to `frontend/altcha/hmac_key`)           |
| `PUBLIC_BUILD_VERSION`     | Sets version in header meta tag "build-version". **REQUIRED** for `npm run build`                |

**IMPORTANT:** For local development the `ACROSS_SERVER_SECRET` will be the default service account secret `'local-service-account-key'`. For any other environments, the key will be stored in the SSM param store.

**ALTCHA captcha:** The register and login-verify pages are protected by a self-hosted [ALTCHA](https://altcha.org) proof-of-work captcha (no third-party service). In deployed environments the HMAC secret is read from SSM at `/${APP_ENV}/${ALTCHA_HMAC_KEY_PATH}`; locally it falls back to a built-in development key, so no setup is required.

## Building

To create a production version:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Copilot Instructions

This repository includes project-specific Copilot guidance for more accurate recommendations and higher-quality reviews:

- `.github/copilot-instructions.md` for global project standards.
- `.github/instructions/*.instructions.md` for targeted, file-scoped rules.

When auth, config, routing, or testing conventions change, update the instruction files in the same PR so AI guidance stays aligned with the codebase.
