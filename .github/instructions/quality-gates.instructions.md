---
description: 'Use when validating code changes, running quality checks, or verifying test coverage.'
applyTo: '**/*.js'
---

# Quality Gates

## Validation order

1. `npm run lint` — ESLint clean on touched files
2. `npm test` — all test suites pass (`node --test test/*.test.js`)
3. `npm run verify` — combined lint + test (CI equivalent)

## Rules

- MUST: lint clean on touched files.
- MUST: tests relevant to touched behavior pass.
- MUST: all `src/` modules remain pure (no side-effects, no `process`/`console`/`fs`).
- SHOULD: add or update tests when changing behavior.
- SHOULD: remove dead code discovered inside touched scope.
- SHOULD: run `npm run format` before committing.
