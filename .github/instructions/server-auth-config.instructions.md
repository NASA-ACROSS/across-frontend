---
description: 'Use when editing or reviewing server hooks, auth/token handling, credential managers, private/public configuration, and shared server-side utilities.'
name: 'Server Auth And Config Rules'
applyTo:
    - 'src/hooks.server.ts'
    - 'src/config/**/*.ts'
    - 'src/lib/**/*.ts'
---

# Server/Auth/Config Guidance

- Treat auth, cookies, tokens, and secrets as high-risk review areas.
- Do not expose private environment values to client bundles.
- Keep credential and token flow aligned with existing managers and refresh behavior.
- Ensure cookie writes preserve secure attributes appropriate for production use.
- For auth-protected behavior, use existing guard patterns such as requireUser and locals checks.
- In hook-based fetch logic, avoid breaking request pass-through behavior for auth token endpoints.
- Keep API URL and domain construction centralized in config getters.
- On error paths, prefer structured error handling and traceable IDs over silent failures.
- When changing auth/config logic, recommend regression tests for login, verification, refresh, and protected route access.
