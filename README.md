# score68

Electron desktop app that enumerates dates whose numerological sum `(Day + Month + ⌊Year/100⌋ + Year%100) % 100` equals a user-specified target value.

---

## Quick Start

```
git clone https://github.com/al-siv/score68.git
cd score68
npm install
npm run dev
```

## Features

- Default target: numerology sum of today's date
- Scrollable date range: today − 200 years … today + 50 years
- Vue 3 GUI with minimalist design
- Russian / English interface (toggle)
- Light / Dark theme (toggle, persists)
- Today's date highlighted, auto-scroll to current year
- Copy all matching dates to clipboard
- Settings persistence via localStorage
- Cross-platform: macOS, Windows, Linux (Electron); mobile-ready (Capacitor)

## Formula

```
numerologySum(date) = (D + M + ⌊Y/100⌋ + Y%100) % 100
```

| Component  | Meaning                  | Example (2026-04-25) |
| ---------- | ------------------------ | -------------------- |
| D          | Day of month             | 25                   |
| M          | Month                    | 4                    |
| ⌊Y/100⌋   | First two digits of year | 20                   |
| Y%100      | Last two digits of year  | 26                   |

Result: `(25 + 4 + 20 + 26) % 100 = 75`

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

## Tech Stack

| Layer          | Technology                      | Version |
| -------------- | ------------------------------- | ------- |
| Runtime        | Electron                        | 41.3    |
| Language       | TypeScript (strict)             | 6.0     |
| UI Framework   | Vue 3 (Composition API, SFC)    | 3.5     |
| Bundler        | Vite + electron-vite            | 7.3     |
| Packaging      | electron-builder                | 26.8    |
| Testing        | Vitest + fast-check             | 4.1     |
| Contracts      | Zod                             | 4.3     |
| i18n           | vue-i18n                        | 11.4    |
| Linting        | ESLint 10 (flat config)         | 10.2    |

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

All computation runs client-side using shared pure functions. No IPC needed.

## Project Structure

```
src/
  main/index.ts              Electron main process
  preload/index.ts           Context bridge
  renderer/                  Vue 3 app
    src/
      App.vue                Root component
      main.ts                App entry + i18n setup
      components/            UI components
      composables/           Reactive business logic
      i18n/                  en.ts, ru.ts
      assets/styles/         CSS tokens, themes
  shared/                    Pure core (no Electron/Vue deps)
    core/dates68.ts          Numerology computation
    core/types.ts            TypeScript types
    contracts/schemas.ts     Zod schemas
tests/
  unit/                      dates68, schemas, scenarios
  property/                  fast-check invariants
```

## Persistence

| Key              | Default                  |
| ---------------- | ------------------------ |
| `score68-target` | `numerologySum(today)`   |
| `score68-lang`   | System locale or `"en"`  |
| `score68-theme`  | `"light"`                |

## Development

See `AGENTS.md` for detailed project context, conventions, and quality gates.
See `DESIGN.md` for UI/UX specification.
See `SKILLS.md` for development workflows.

## License

CC0 1.0 Universal. See `LICENSE`.
