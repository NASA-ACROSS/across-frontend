# across-frontend

## Developing

Install dependencies with `npm install` (or `pnpm install` or `yarn`)
 
### Start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Configuration Environment Variables

The ACROSS frontend relies on environment variables to run. The following are
essential for operation:

| Varible                             | Use                                                   |
| ----------------------------------- | ----------------------------------------------------- |
| `API_URL`                           | Base hostname and port for the api                    |
| `ACROSS_ADMIN_TOKEN`                | API key used by admin user for login and registration routes. Set the same env var with the same value when running the API locally and run a migration to add the user to the local database |
| `PUBLIC_BUILD_VERSION`              | Sets version in header meta tag "build-version". **REQUIRED** for `npm run build`  |

These are included for your convenience in `.env.development` for local development

## Building

To create a production version:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
