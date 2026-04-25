# SKILLS.md — Development Workflows

This file describes specialized development workflows (skills) available in the
score68 project. Each skill is a repeatable pattern for a common task.

---

## Skill: Add a New Component

1. Create `src/renderer/src/components/ComponentName.vue`
2. Use `<script setup lang="ts">` + Composition API
3. Define props with `defineProps<{ ... }>()` (TypeScript generic syntax)
4. Define emits with `defineEmits<{ ... }>()`
5. If component needs i18n: use `const { t } = useI18n()`
6. If component needs theme: use CSS custom properties from `main.css`
7. Add unit test in `tests/unit/` if logic is non-trivial
8. Run `npm run verify`

## Skill: Add a New Shared Function

1. Add pure function to appropriate file in `src/shared/core/`
2. Export from barrel `src/shared/core/index.ts`
3. Add Zod schema in `src/shared/contracts/schemas.ts` if it validates external input
4. Add TSDoc: `@param`, `@returns`, `@example`, `@since`, `@throws`
5. Add unit test in `tests/unit/`
6. Add property-based test in `tests/property/` if the function has invariants
7. Run `npm run verify`

## Skill: Add / Modify i18n Keys

1. Add key to both `src/renderer/src/i18n/en.ts` and `ru.ts`
2. Use in component: `{{ t('key.path') }}` or `t('key.path')`
3. Never hardcode user-visible strings in components
4. Run `npm run verify`

## Skill: Debug Electron Main Process

1. Set env `ELECTRON_ENABLE_LOGGING=1`
2. Run `npm run dev`
3. Main process logs appear in terminal (stdout/stderr)
4. Renderer logs appear in DevTools (Ctrl+Shift+I / Cmd+Option+I)

## Skill: Update Dependencies

1. `npx npm-check-updates -u`
2. `npm install`
3. `npm run verify`
4. If breaking: fix compatibility, then verify again
5. Commit updated `package.json` and `package-lock.json`

## Skill: Build Release Package

1. Ensure `npm run verify` passes
2. Update version in `package.json`
3. Update `CHANGELOG.md`
4. `npm run package`
5. Artifacts in `dist/`
6. Tag: `git tag -a v<X.Y.Z> -m "score68 <X.Y.Z>"`

## Skill: Run Tests

| Command              | Scope                        |
| -------------------- | ---------------------------- |
| `npm run test`       | All tests (unit + property)  |
| `npx vitest run`     | Same as above                |
| `npx vitest`         | Watch mode                   |
| `npx vitest --reporter=verbose` | Verbose output      |

## Skill: Contract-Driven Feature

When adding a feature with external inputs:

1. **Define the contract first** — write Zod schema in `src/shared/contracts/schemas.ts`
2. **Derive types** — `type X = z.infer<typeof xSchema>`
3. **Implement** — write pure function using the derived types
4. **Validate at boundary** — call `xSchema.parse(input)` where data enters the system
5. **Test** — unit test with valid/invalid inputs against the Zod schema
6. **Document** — TSDoc references the schema name
