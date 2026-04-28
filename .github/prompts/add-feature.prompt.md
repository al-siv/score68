---
description: 'Add a new feature to score68 with tests and docs.'
mode: 'agent'
---

# Add Feature

You are adding a feature to the score68 Electron desktop app.

## Context

- Read `src/shared/core/dates68.ts`, `src/shared/core/types.ts`, and `src/shared/contracts/schemas.ts` to understand pure core logic.
- Read `src/renderer/src/composables/useDateSearch.ts` to understand Vue reactivity layer.
- Read `src/renderer/src/components/` for UI patterns (Vue 3 SFC, `<script setup lang="ts">`, Composition API).
- `src/shared/core/` must remain pure: no Electron APIs, no DOM, no side-effects, no `console`.
- `src/main/index.ts` is the only Electron main-process boundary.

## Steps

1. Identify which module(s) need changes (`src/shared/core/`, `src/renderer/src/components/`, `src/renderer/src/composables/`, or `src/main/`).
2. Implement the feature in the appropriate layer (core logic first, then UI, then main process if needed).
3. If adding UI: create or update a Vue SFC component; wire it through `App.vue` if necessary.
4. Add or update tests at the smallest sufficient layer:
   - Unit tests in `tests/unit/` for pure core logic.
   - Property tests in `tests/property/` for invariants.
5. Run `npm run verify` to confirm lint + typecheck + tests pass.
6. Summarize changes made.

## Feature request

$input
