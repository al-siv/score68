# Changelog

All notable changes are documented here. Dates use YYYY-MM-DD.

## [2.0.0] - 2026-04-27

### Breaking

- Complete rewrite from Node.js CLI to Electron desktop application.
- Removed CLI interface (`cli.js`, `src/args.js`, `src/env.js`).
- Removed all `.js` source files; replaced with TypeScript.

### Added

- Electron 41.3 desktop app with Vue 3 + Vite renderer.
- Vue 3 Composition API GUI with minimalist design.
- i18n: Russian + English with toggle (vue-i18n 11.4).
- Light / Dark theme toggle with CSS custom properties.
- Default target: `numerologySum(today)` (auto-computed from current date).
- Fixed scrollable range: today − 200 years … today + 50 years.
- Today's date highlighted with accent color; auto-scroll to current year.
- Copy matching dates to clipboard with formatted output.
- Settings persistence via localStorage (target, language, theme).
- Responsive design: desktop (Electron) + mobile-ready (Capacitor config scaffold).
- TypeScript 6.0 strict mode across entire codebase.
- Zod 4.3 runtime contracts for all external boundaries.
- Vitest 4.1 + fast-check 4.7 test suite (80 tests: unit + scenarios + property-based).
- ESLint 10 flat config with typescript-eslint and eslint-plugin-vue.
- electron-vite 5.0 build pipeline.
- electron-builder 26.8 packaging (.dmg, .exe, .AppImage).
- `AGENTS.md` — project context for AI agents.
- `SKILLS.md` — development workflows and skill patterns.
- `DESIGN.md` — UI/UX specification with responsive breakpoints, color tokens, accessibility.
- `build/entitlements.mac.plist` for macOS code signing.
- ARIA attributes for accessibility (`role`, `aria-label`, `aria-current`).
- SVG icons for theme toggle (moon/sun).

### Changed

- Version bumped from 1.0.0 to 2.0.0.
- All shared core logic migrated to TypeScript with TSDoc documentation.
- Tests migrated from `node:test` to Vitest with extended coverage.
- ESLint config migrated to flat `.ts` config with Vue support.
- Prettier config unchanged (semi, single quotes, trailing commas).

### Removed

- `cli.js` — CLI interface removed.
- `src/args.js` — CLI argument parser removed.
- `src/env.js` — environment variable resolver removed.
- `src/dates68.js` — replaced by `src/shared/core/dates68.ts`.
- `test/` directory — replaced by `tests/` with TypeScript.
- `eslint.config.js` and `.eslintrc.json` — replaced by `eslint.config.ts`.
- `docs/` directory — sprint docs archived.

## [1.0.0] - 2026-04-12

### Changed

- Total refactoring — showcase-quality codebase for LLM-assisted development demo.
- Extracted `src/env.js` — pure environment variable resolver.
- Rewrote `cli.js` as a thin impure shell.
- Modernized all tests to `node:test` structure.
- Upgraded ESLint to flat config.
- Bumped Node engine to ≥22.

## [0.2.1] - 2025-08-21

### Documentation

- Added CONTRIBUTING.md.

## [0.2.0] - 2025-08-21

### Added

- Pure argument parser with error codes.
- Environment variable overrides.
- Property-based numerology invariant test.

## [0.1.0] - 2025-08-20

### Added

- Initial implementation: CLI date listing for target 68.
