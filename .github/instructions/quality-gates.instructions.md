---
description: 'Use when validating code changes, running quality checks, or verifying test coverage.'
applyTo: 'src/**/*.ts,src/**/*.vue,tests/**/*.test.ts'
---

# Quality Gates

## Validation order

1. `npm run lint` — ESLint clean on touched files.
2. `npm run test` — all Vitest suites pass.
3. `npm run verify` — combined lint + typecheck + tests (CI equivalent).

## Rules

- MUST: lint clean on touched files.
- MUST: tests relevant to touched behavior pass.
- MUST: all `src/shared/core/` modules remain pure (no side-effects, no `process`/`console`/`fs`).
- SHOULD: add or update tests when changing behavior.
- SHOULD: remove dead code discovered inside touched scope.
- SHOULD: run `npm run format` before committing.
