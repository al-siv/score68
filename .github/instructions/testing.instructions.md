---
description: 'Use when writing, modifying, or reviewing tests.'
applyTo: 'tests/**/*.test.ts'
---

# Testing Conventions

## Framework

- **Vitest** 4 with `describe` / `it` blocks.
- `expect` from Vitest for assertions (never loose asserts).
- `fast-check` for property-based invariant tests.

## Running

- `npm run test` — runs Vitest.
- `npm run verify` — lint + typecheck + tests in one pass.

## Test layers (prefer the smallest sufficient)

1. **Unit** (`tests/unit/dates68.test.ts`, `tests/unit/schemas.test.ts`) — pure function contracts.
2. **Property** (`tests/property/numerology.test.ts`) — formula invariants over wide input space.

## Conventions

- One `describe` per module or feature; one `it` per behavior.
- Test names read as sentences: `'returns dates matching the target'`.
- Keep test setup in `describe`-level `const`s, not `beforeEach`.
- No mocking for pure functions — architecture is designed for direct unit testing.
