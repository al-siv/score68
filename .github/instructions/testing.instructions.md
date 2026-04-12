---
description: 'Use when writing, modifying, or reviewing tests.'
applyTo: 'test/**/*.test.js'
---

# Testing Conventions

## Framework

- `node:test` built-in runner with `describe` / `it` blocks.
- `node:assert/strict` for assertions (never loose `assert`).
- `fast-check` for property-based invariant tests.

## Running

- `npm test` — runs `node --test test/*.test.js`.
- `npm run verify` — lint + test in one pass.

## Test layers (prefer the smallest sufficient)

1. **Unit** (`dates68.test.js`, `args.test.js`) — pure function contracts.
2. **Integration** (`cli.test.js`, `env.test.js`) — full CLI via `execFileSync`.
3. **Property-based** (`property.test.js`) — formula invariants over wide input space.

## Conventions

- One `describe` per module or feature; one `it` per behavior.
- Test names read as sentences: `'returns default config for empty args'`.
- Integration tests use a helper `run(args, env)` that wraps `execFileSync`.
- Keep test setup in `describe`-level `const`s, not `beforeEach`.
- No mocking — architecture is designed for DI and pure functions.
