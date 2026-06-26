---
description: 'Use when creating, changing, or reviewing SvelteKit routes, load/actions, +server endpoints, and route-level data flows.'
name: 'SvelteKit Routes And Server Load Rules'
applyTo:
    - 'src/routes/**/*.ts'
    - 'src/routes/**/*.svelte'
---

# SvelteKit Route Guidance

- Keep auth checks and data loading in server route files when data is sensitive.
- In route handlers and server loads, validate required params and return explicit 4xx responses for bad inputs.
- For proxied API calls, use configured API origins and avoid hardcoded hostnames.
- Check response.ok and status code branches explicitly before using payloads.
- Use existing parseErrorResponse and related error utilities when handling API failures.
- Validate external response shapes with type guards before trusting payload fields.
- Preserve query param parsing and serialization patterns used in existing routes.
- Avoid browser-only APIs in server code; use client components or onMount for browser interactions.
- For changed behavior in routes, recommend targeted tests and clear repro steps.
