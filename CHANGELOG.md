# Changelog

All notable changes are documented here. Dates use YYYY-MM-DD.

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
