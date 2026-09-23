---
description: 'Use when writing tests or performing code review. Covers project expectations for quality checks, traceability to issue acceptance criteria, and technical spec alignment in PRs.'
name: 'Tests And PR Review Traceability Rules'
applyTo:
    - 'tests/**/*.ts'
    - 'src/**/*.test.ts'
    - 'src/**/*.spec.ts'
---

# Test And Review Guidance

- Prefer deterministic tests with clear setup and assertions.
- Add or update tests for behavior changes, especially around auth, server routes, and parsing logic.
- Keep test names behavior-focused and avoid brittle timing assumptions.
- Recommend the smallest command set needed to validate the change: check, lint, and relevant tests.
- Use parametrized tests to cover multiple cases without duplication when appropriate.
