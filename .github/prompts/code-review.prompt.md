---
description: 'Review code quality and suggest improvements.'
mode: 'agent'
---

# Code Review

Perform a code review of the score68 project.

## Checklist

1. **Purity**: All `src/shared/core/` modules are free of side-effects (no Electron APIs, no DOM, no `console`, no `fs`).
2. **Tests**: Every exported shared-core function has unit or property test coverage; tests use Vitest with `expect`.
3. **Lint**: `npm run lint` passes with zero warnings.
4. **Types**: TSDoc `@param`/`@returns` on all exports; strict TypeScript (`noImplicitAny`).
5. **Architecture**: `src/shared/core/` is thin and pure; UI logic lives in `src/renderer/src/composables/` and `src/renderer/src/components/`.
6. **Contracts**: All external boundaries (user input, localStorage, IPC) validated through Zod schemas in `src/shared/contracts/`.
7. **Error handling**: Defensive checks at boundaries; no silent catch without `console.error` logging.
8. **Edge cases**: modulo wrap, empty ranges, invalid dates, NaN, QuotaExceededError in localStorage.

## Scope

$input
