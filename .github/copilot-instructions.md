# across-frontend Copilot Instructions

## Scope

- Apply these rules for all code suggestions and reviews in this repository.
- Prefer concise, actionable recommendations tied to existing project patterns.

## Tech Stack And Runtime

- SvelteKit 2 with Svelte 4 and strict TypeScript (there should not be any JavaScript files).
- Node.js 22+.
- Tailwind CSS 4 and DaisyUI 5 for UI.
- API integration is proxied through server routes and hooks.

## Core Project Conventions

- Use config getters from src/config/config.ts for server URL/domain values.
- Follow auth and request patterns in src/hooks.server.ts and src/lib/utils/across/auth/.
- Keep server-only logic in +page.server.ts, +layout.server.ts, hooks, or server endpoints.
- Do not use browser-only APIs in server contexts.
- Prefer existing utility and guard patterns over introducing new custom abstractions.

## Review Priorities

- Security and auth correctness first: token handling, cookie security flags, secrets exposure, and auth guards.
- API correctness and type safety: explicit status handling, typed response parsing, and safe error paths.
- SSR boundary correctness: no window/localStorage/document in server code.
- Test readiness: recommend or add relevant test updates when behavior changes.
- Accessibility quality for UI changes: semantics, labels, keyboard/focus behavior.

## PR Review Traceability Rules

- During PR reviews, validate implementation against the resolved issue or ticket requirements.
- Validate implementation against acceptance criteria in the PR description.
- If the PR links a technical spec, verify alignment with that spec and call out any deltas.
- If issue/spec links are missing, ask for them and mark traceability as incomplete.
- Report findings first (ordered by severity), then assumptions/questions, then summary.

## Verification Commands

- Use npm run check for SvelteKit sync and type checks.
- Use npm run lint:all for lint validation.
- Use npm run test:unit and npm run test:integration where relevant.
- Prefer minimal command set that validates the changed area.

## Recommendation Style

- Be project-accurate and reference concrete files/patterns in this repository.
- Avoid generic framework advice that conflicts with current architecture.
- For risky changes, provide safer alternatives and missing-test suggestions.
