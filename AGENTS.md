# AGENTS.md — Project Context for AI Agents

## Project Overview

**score68** — Electron desktop app that enumerates dates whose numerological sum
`(Day + Month + ⌊Year/100⌋ + Year%100) % 100` equals a user-specified target value.

- **Default target**: `numerologySum(today)` — auto-computed from current date.
- **Scrollable range**: today − 200 years … today + 50 years (fixed).
- **GUI**: Vue 3 + Composition API, no menu bar, minimalist design.
- **i18n**: Russian + English with toggle.
- **Theme**: Light / Dark toggle.
- **Persistence**: localStorage for target, language, theme.
- **Export**: Copy matching dates to clipboard.

## Tech Stack

| Layer            | Technology                    | Version    | npm package         |
| ---------------- | ----------------------------- | ---------- | ------------------- |
| Runtime          | Electron                      | 41.3       | `electron`          |
| Language         | TypeScript (strict)           | 6.0        | `typescript`        |
| UI Framework     | Vue 3 (Composition API, SFC)  | 3.5        | `vue`               |
| Bundler          | Vite                          | 7.3        | `vite`              |
| Electron Build   | electron-vite                 | 5.0        | `electron-vite`     |
| Packaging        | electron-builder              | 26.8       | `electron-builder`  |
| Testing          | Vitest                        | 4.1        | `vitest`            |
| Property Tests   | fast-check                    | 4.7        | `fast-check`        |
| Contracts        | Zod                           | 4.3        | `zod`               |
| i18n             | vue-i18n                      | 11.4       | `vue-i18n`          |
| Linting          | ESLint (flat config)          | 10.2       | `eslint`            |
| TS ESLint        | typescript-eslint             | 8.59       | `typescript-eslint` |
| Vue ESLint       | eslint-plugin-vue             | 10.9       | `eslint-plugin-vue` |
| Formatting       | Prettier                      | 3.8        | `prettier`          |
| Vite Vue Plugin  | @vitejs/plugin-vue            | 6.0        | `@vitejs/plugin-vue`|

## Project Structure

```
score68/
├── src/
│   ├── main/                    # Electron main process
│   │   └── index.ts
│   ├── preload/                 # Preload script (minimal)
│   │   └── index.ts
│   ├── renderer/                # Vue 3 app (Vite renderer)
│   │   ├── src/
│   │   │   ├── App.vue
│   │   │   ├── main.ts
│   │   │   ├── components/
│   │   │   │   ├── DateList.vue
│   │   │   │   ├── TargetInput.vue
│   │   │   │   ├── AppHeader.vue
│   │   │   │   ├── ThemeToggle.vue
│   │   │   │   └── LangToggle.vue
│   │   │   ├── composables/
│   │   │   │   └── useDateSearch.ts
│   │   │   ├── i18n/
│   │   │   │   ├── index.ts
│   │   │   │   ├── ru.ts
│   │   │   │   └── en.ts
│   │   │   └── assets/
│   │   │       └── styles/
│   │   │           └── main.css
│   │   └── index.html
│   └── shared/                  # Pure core logic (no Electron/Vue deps)
│       ├── core/
│       │   ├── dates68.ts       # Numerology computation
│       │   ├── types.ts         # Core TypeScript types
│       │   └── index.ts         # Barrel export
│       └── contracts/
│           └── schemas.ts       # Zod schemas (runtime validation)
├── tests/
│   ├── unit/
│   │   ├── dates68.test.ts
│   │   └── schemas.test.ts
│   └── property/
│       └── numerology.test.ts
├── electron.vite.config.ts
├── electron-builder.yml
├── vitest.config.ts
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.web.json
├── eslint.config.ts
├── .prettierrc.json
├── .gitignore
├── AGENTS.md
├── SKILLS.md
├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
└── LICENSE
```

## Commands

| Task              | Command              |
| ----------------- | -------------------- |
| Install deps      | `npm install`        |
| Dev (Electron)    | `npm run dev`        |
| Build             | `npm run build`      |
| Test              | `npm run test`       |
| Lint              | `npm run lint`       |
| Format            | `npm run format`     |
| Verify            | `npm run verify`     |
| Package installer | `npm run package`    |

## Architecture

```
┌──────────────────────────────────────────────┐
│  Electron Main (src/main/)                   │
│  Window lifecycle, no menu bar               │
├──────────────────────────────────────────────┤
│  Preload (src/preload/)                      │
│  Minimal contextBridge (extensibility only)  │
├──────────────────────────────────────────────┤
│  Renderer (src/renderer/) — Vue 3 + Vite    │
│  UI components, i18n, theme, composables     │
├──────────────────────────────────────────────┤
│  Shared Core (src/shared/)                   │
│  Pure numerology, Zod contracts, types       │
│  ← imported by both main and renderer        │
└──────────────────────────────────────────────┘
```

**Key decision**: All computation runs client-side in the renderer process
using shared pure functions. No IPC needed for numerology computation.
The preload script is minimal and exists only for future extensibility.

## Conventions

### Code Style
- TypeScript strict mode (`strict: true`, `noImplicitAny: true`)
- Vue SFC: `<script setup lang="ts">` + Composition API
- Prettier: semi, single quotes, printWidth 100, trailing commas
- No inline code comments unless explicitly requested
- No `any` type — use Zod inference or explicit types

### Docs-in-Code / Contract-Driven Development
- Every exported function has TSDoc with `@example`, `@since`, `@throws`
- Zod schemas validate all external inputs (user input, config, IPC)
- TypeScript types derived from Zod: `type X = z.infer<typeof XSchema>`
- Runtime validation at boundaries; compile-time types internally
- No separate docs — code IS the documentation

### Purity Rules
- All `src/shared/` code: pure functions only — no Electron APIs, no DOM, no
  side-effects, no `process`, no `console`
- Renderer composables may call shared core and manage Vue reactivity
- Main process: only window/lifecycle management

### Testing
- Vitest for unit/integration tests
- fast-check for property-based invariant tests
- All shared core logic must have unit + property test coverage
- Test files mirror source structure: `tests/unit/` and `tests/property/`

### Naming
- Files: `kebab-case.ts` / `PascalCase.vue`
- Functions: `camelCase`
- Types/Interfaces: `PascalCase`
- Zod schemas: `camelCaseSchema` suffix (e.g., `targetSchema`)
- Constants: `UPPER_SNAKE_CASE`

## Formula

```
numerologySum(date) = (D + M + ⌊Y/100⌋ + Y % 100) % 100
```

Where:
- D = day of month (1–31)
- M = month (1–12)
- Y = full year (e.g., 2026)
- ⌊Y/100⌋ = first two digits of year (e.g., 20)
- Y % 100 = last two digits of year (e.g., 26)

## Quality Gates

`npm run verify` = lint + typecheck + tests. Must pass before every commit.

## Persistence (localStorage keys)

| Key              | Type     | Default                  |
| ---------------- | -------- | ------------------------ |
| `score68-target` | `number` | `numerologySum(today)`   |
| `score68-lang`   | `string` | System locale or `"en"`  |
| `score68-theme`  | `string` | `"light"`                |

## Release / Final Build Protocol

When a task set is complete and the codebase is ready for delivery, the agent
must run the full build pipeline to produce updated distributables:

1. `npm run verify` — lint + typecheck + tests must pass.
2. `npm run build` — production bundles (`out/`).
3. `npm run package` — platform-specific installers (`dist/`).

Do not consider a task fully finished until the `dist/` folder contains the
latest `.dmg`, `.zip`, or equivalent artifacts for the current platform.
