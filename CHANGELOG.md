# Changelog

All notable changes are documented here. Dates use YYYY-MM-DD.

## [1.0.0] - 2026-04-12

### Changed

- **Total refactoring** — showcase-quality codebase for LLM-assisted development demo.
- Extracted `src/env.js` — pure environment variable resolver (was inline in `cli.js`).
- Rewrote `cli.js` as a thin impure shell: parse → resolve → compute → print.
- Replaced `createRequire` JSON hack with `import ... with { type: 'json' }`.
- Modernized all tests from raw `assert` scripts to `node:test` `describe`/`it` structure.
- Replaced manual test chaining with `node --test test/*.test.js` runner.
- Upgraded ESLint config: proper flat config with `globals` package, removed deprecated `--ext`.
- Bumped Node engine from ≥18 to ≥22 (Node 18/20 are EOL).
- Enabled trailing commas in Prettier config (cleaner diffs).
- Added JSDoc with `@param`/`@returns` on all exports.
- Froze `ERROR_CODES` with `Object.freeze()`.

### Added

- `src/env.js` — pure `resolveEnv(env, config)` with dependency injection.
- `.github/workflows/ci.yml` — GitHub Actions CI (Node 22 + 24 matrix).
- `.github/instructions/code-style.instructions.md` — Copilot code style rules.
- `.github/instructions/testing.instructions.md` — Copilot testing conventions.
- `.github/prompts/add-feature.prompt.md` — reusable feature prompt template.
- `.github/prompts/investigate-bug.prompt.md` — reusable bug investigation prompt.
- `.github/prompts/code-review.prompt.md` — reusable code review prompt.
- Architecture and LLM-Assisted Development sections in README.

## [0.2.1] - 2025-08-21

### Documentation

- Added CONTRIBUTING.md with step-by-step PR author & maintainer workflows.
- Added Contributing section in README.

## [0.2.0] - 2025-08-21

### Added

- Pure argument parser (`src/args.js`) with error codes (UNKNOWN_FLAG, INVALID_TARGET, RANGE_FORMAT, RANGE_ORDER, YEARS_VALUE, CONFLICT_RANGE_YEARS).
- Environment variable overrides: SCORE68_TARGET, SCORE68_RANGE, SCORE68_YEARS (lower precedence than CLI).
- Property-based numerology invariant test (`test/property.test.js`).
- Environment override test (`test/env.test.js`).

### Changed

- Applied modulo 100 rule in numerology sum (introduced earlier, consolidated here).
- Banner and help text extended to include environment variables.

### Tooling

- ESLint and Prettier configuration added.
- Unified test script updated to include new tests.

## [0.1.1] - 2025-08-20

### Changed

- Refactor: extracted helpers and adjusted header formatting.
- Internal restructuring toward pure boundary separation.

## [0.1.0] - 2025-08-20

### Added

- Initial implementation: date listing logic for target 68 (2022-01-01..2026-12-31).
- Basic CLI script and README.
- License (CC0 1.0 Universal).
