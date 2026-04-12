# score68 — Copilot Instructions

## Project

Small Node.js CLI utility. Lists dates (2022–2026) whose digit-group sum equals a target (default 68).

- **Runtime**: Node.js >= 18, ES modules
- **Stack**: vanilla JS, no framework
- **Lint**: ESLint 9 (`npm run lint`)
- **Format**: Prettier (`npm run format`)
- **Test**: Node.js built-in test runner + fast-check (`npm test`)
- **CI shortcut**: `npm run verify` (lint + test)

## Source layout

```
cli.js          — CLI entry point
src/dates68.js  — core date-scoring logic
src/args.js     — argument parsing
test/           — unit, CLI, property, env tests
```

## Quality gates

1. `npm run lint` — ESLint clean on touched files
2. `npm test` — all suites pass
3. `npm run verify` — combined (CI equivalent)

## Agent rules

- Default to action over speculation. Read code before claiming root cause.
- Keep changes focused; don't over-engineer a small utility.
- Merge to main only with explicit user approval.
- No destructive or irreversible operations without confirmation.
- Prefer the smallest sufficient test layer (unit > integration > E2E).
- When modifying behavior, update relevant tests in the same change.
- Process rigor is proportional to change size — skip ceremony for tiny fixes.
