---
description: 'Use when writing or modifying TypeScript code in this project.'
applyTo: 'src/**/*.ts,src/**/*.vue'
---

# Code Style

## Language

- TypeScript strict mode (`strict: true`, `noImplicitAny: true`).
- ES modules (`import`/`export`), never CommonJS.
- `const` by default; `let` only when reassignment is necessary; never `var`.
- Strict equality (`===`) everywhere — enforced by ESLint.

## Architecture

- **Pure boundary**: `src/shared/core/` modules export only pure functions. No Electron APIs, no DOM, no `console`, no `fs`.
- **Renderer process**: `src/renderer/src/` contains Vue 3 SFCs (`<script setup lang="ts">`), composables, and i18n.
- **Main process**: `src/main/index.ts` manages window lifecycle only.
- **Contracts**: Zod schemas in `src/shared/contracts/schemas.ts` validate all external boundaries (user input, localStorage, IPC). Derive TypeScript types via `z.infer`.
- **Dependency injection** for testability: pure functions accept parameters rather than reading global state.

## Functions

- Prefer small, focused, single-responsibility functions.
- Use TSDoc on all exports: `@param`, `@returns`, `@example`.
- Generator functions (`function*`) for lazy sequences.
- Named exports only; no default exports.

## Formatting

- Prettier handles formatting: `npm run format`.
- Single quotes, trailing commas, 100-char print width.
