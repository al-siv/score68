---
description: "Use when validating code changes, running quality checks, or verifying test coverage."
applyTo: "**/*.js"
---

# Quality Gates

## Validation order

1. `npm run lint` — ESLint clean on touched files
2. `npm test` — all test suites pass
3. `npm run verify` — combined lint + test (CI equivalent)

## Rules

- MUST: lint clean on touched files.
- MUST: tests relevant to touched behavior pass.
- SHOULD: add or update tests when changing behavior.
- SHOULD: remove dead code discovered inside touched scope.
