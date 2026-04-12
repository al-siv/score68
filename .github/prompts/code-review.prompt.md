---
description: 'Review code quality and suggest improvements.'
mode: 'agent'
---

# Code Review

Perform a code review of the score68 project.

## Checklist

1. **Purity**: All `src/` modules are free of side-effects (`process`, `console`, `fs`).
2. **Tests**: Every exported function has test coverage; tests use `node:test` describe/it.
3. **Lint**: `npm run lint` passes with zero warnings.
4. **Types**: JSDoc `@param`/`@returns` on all exports.
5. **Architecture**: `cli.js` is thin; logic lives in `src/` modules.
6. **Error handling**: Parser returns discriminated unions, not exceptions.
7. **Edge cases**: modulo wrap, empty ranges, conflicting flags.

## Scope

$input
