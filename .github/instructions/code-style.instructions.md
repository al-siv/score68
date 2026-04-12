---
description: 'Use when writing or modifying JavaScript code in this project.'
applyTo: 'src/**/*.js,cli.js'
---

# Code Style

## Language

- ES modules (`import`/`export`), never CommonJS.
- `const` by default; `let` only when reassignment is necessary; never `var`.
- Use `import ... with { type: 'json' }` for JSON imports (Node ≥22).
- Strict equality (`===`) everywhere — enforced by ESLint.

## Architecture

- **Pure boundary**: `src/` modules export only pure functions. No `process`, `console`, or `fs`.
- **Impure shell**: `cli.js` is the sole boundary — reads `process.argv`, `process.env`, writes to `console`.
- **Discriminated unions** for results: `{ ok: true, config }` or `{ ok: false, error: { code, message } }`.
- **Dependency injection** for testability: `resolveEnv(env, config)` takes an env object, not `process.env`.

## Functions

- Prefer small, focused, single-responsibility functions.
- Use JSDoc on all exports: `@param`, `@returns`.
- Generator functions (`function*`) for lazy sequences.
- Named exports only; no default exports.

## Formatting

- Prettier handles formatting: `npm run format`.
- Single quotes, trailing commas, 100-char print width.
