# score68 — Copilot Instructions

## Project overview

Electron desktop app that enumerates dates whose numerological sum equals a target value.

- **Runtime**: Electron 41 + Node.js ≥ 22
- **Language**: TypeScript 6.0 (strict)
- **UI**: Vue 3 (Composition API, SFC) + Vite 7.3
- **Build**: electron-vite 5.0
- **Test**: Vitest 4.1 + fast-check 4.7 (80 tests)
- **Contracts**: Zod 4.3 runtime validation
- **i18n**: vue-i18n 11.4 (EN + RU)
- **Lint**: ESLint 10 flat config + typescript-eslint + eslint-plugin-vue
- **CI shortcut**: `npm run verify` (lint + typecheck + test)

## Architecture

```
src/main/         Electron main process (window lifecycle)
src/preload/      Context bridge (minimal)
src/renderer/     Vue 3 app (Vite renderer)
src/shared/       Pure core logic (no Electron/Vue deps)
tests/            Vitest unit + property + scenario tests
```

### Design principles

- **Pure core**: All `src/shared/` code is pure functions — no Electron APIs, DOM, or side-effects.
- **Contract-driven**: Zod schemas validate all external inputs; types derived from schemas.
- **Docs-in-code**: TSDoc with `@example`, `@since`, `@throws` on all exports.

## Quality gates

1. `npm run lint` — ESLint clean
2. `npm run typecheck` — TypeScript clean
3. `npm run test` — all 80 tests pass
4. `npm run verify` — combined lint + typecheck + test

## Agent rules

- Default to action over speculation. Read code before claiming root cause.
- Keep changes focused; don't over-engineer.
- Merge to main only with explicit user approval.
- No destructive or irreversible operations without confirmation.
- All `src/shared/` code must remain pure (no `process`, `console`, `fs`, or DOM).
- When modifying behavior, update relevant tests in the same change.
- Follow existing patterns in the codebase.
