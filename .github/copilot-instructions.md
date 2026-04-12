# score68 — Copilot Instructions

## Project overview

Small Node.js CLI utility. Lists dates (2022–2026) whose digit-group sum equals a target (default 68).

- **Runtime**: Node.js ≥ 22, ES modules (`"type": "module"`)
- **Stack**: vanilla JS, no framework
- **Lint**: ESLint 9 flat config (`npm run lint`)
- **Format**: Prettier (`npm run format`)
- **Test**: Node.js built-in test runner `node:test` + fast-check property tests (`npm test`)
- **CI shortcut**: `npm run verify` (lint + test)

## Architecture

```
cli.js            — Thin CLI shell (only file with side-effects)
src/
  dates68.js      — Core date-scoring computation (pure)
  args.js         — CLI argument parser (pure, returns discriminated union)
  env.js          — Environment variable resolver (pure)
test/
  dates68.test.js — Unit: core computation + formatting
  args.test.js    — Unit: argument parser
  cli.test.js     — Integration: full CLI invocations
  env.test.js     — Integration: env variable overrides
  property.test.js— Property-based: numerology formula invariants
```

### Design principles

- **Pure boundary**: All `src/` modules are pure functions. Side-effects live only in `cli.js`.
- **Discriminated unions**: `parseArgs()` returns `{ ok: true, config }` or `{ ok: false, error }`.
- **ENV resolver**: `resolveEnv(env, config)` takes an env object (not `process.env` directly) — testable, no hidden state.

## Quality gates

1. `npm run lint` — ESLint clean on touched files
2. `npm test` — all test suites pass (36 tests across 8 suites)
3. `npm run verify` — combined lint + test (CI equivalent)

## Agent rules

- Default to action over speculation. Read code before claiming root cause.
- Keep changes focused; don't over-engineer a small utility.
- Merge to main only with explicit user approval.
- No destructive or irreversible operations without confirmation.
- Prefer the smallest sufficient test layer (unit > integration > E2E).
- When modifying behavior, update relevant tests in the same change.
- Process rigor is proportional to change size — skip ceremony for tiny fixes.
- All `src/` code must remain pure (no `process`, `console`, or `fs` calls).
- `cli.js` is the only impure boundary — keep it thin.
