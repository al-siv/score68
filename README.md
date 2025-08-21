# score68

![CI](https://github.com/al-siv/score68/actions/workflows/ci.yml/badge.svg)

Date numerology enumerator: list dates whose `(Day + Month + YY(first) + YY(last)) % 100` equals a target.

---

## Quick Start
Clone and run (private package, local usage):
```
git clone https://github.com/al-siv/score68.git
cd score68
npm install
npm run dates:68
```
Sample output excerpt:
```
Utility:  score68
Version:  <version>
Target:   68
Range:    01.01.2022–31.12.2026
2022: 25.01 24.02 23.03 ... 14.12
...
Total dates matching target '68': 60
```

## Features
- Fixed default range: 2022-01-01..2026-12-31 (UTC)
- Custom target positional argument
- Explicit range flag (`--range` / `-r`)
- Dynamic last N years (`--years` / `-y`)
- Environment variable overrides (lower precedence than CLI)
- Pure computation module and thin CLI shell
- Property-based invariant test coverage

## Formula
Raw sum:
```
Day + Month + (first two digits of year) + (last two digits of year)
```
Effective value: `raw % 100`.

## Installation
Current state: private (not published to npm). Use clone method above. Planned publish path (if enabled later):
```
npm install score68
npx score68
```

## CLI Usage

### Commands / Examples
| Purpose              | Command |
|----------------------|---------|
| Default target 68    | `npm run dates:68` |
| Custom target 69     | `node cli.js 69` |
| Explicit range       | `node cli.js 68 --range 2000-01-01:2025-12-31` |
| Explicit range (sh.) | `node cli.js 68 -r 2000-01-01:2025-12-31` |
| Last 10 years        | `node cli.js 68 -y 10` |
| Help                 | `node cli.js --help` |

### Flags
| Flag | Alias | Value | Description |
|------|-------|-------|-------------|
| `--range` | `-r` | `YYYY-MM-DD:YYYY-MM-DD` | Inclusive explicit date span |
| `--years` | `-y` | `N` | Last N full calendar years (ending current year) |
| `--help`  | `-h` | – | Show help |

Mutual exclusion: `--range` and `--years` cannot be combined.

### Environment Variables
Lower precedence than CLI arguments.

| Variable | Example | Meaning |
|----------|---------|---------|
| `SCORE68_TARGET` | `72` | Numeric target (non-negative integer) |
| `SCORE68_RANGE`  | `2024-01-01:2024-12-31` | Explicit range (overrides years) |
| `SCORE68_YEARS`  | `5` | Last N years (ignored if range provided) |

If both `SCORE68_RANGE` and `SCORE68_YEARS` are set, the range takes priority.

### Exit / Error Behavior
Process exits with code 1 on invalid input. Example:
```
$ node cli.js --years 0
years must be positive integer
```

## Error Codes (parser)
| Code | Condition |
|------|-----------|
| `UNKNOWN_FLAG` | Unrecognized flag (not negative number) |
| `INVALID_TARGET` | Target positional not a non-negative integer |
| `RANGE_FORMAT` | `--range` value not matching pattern |
| `RANGE_ORDER` | Range start > end or invalid dates |
| `YEARS_VALUE` | `--years` value missing or non-positive integer |
| `CONFLICT_RANGE_YEARS` | Both range and years supplied |

## Programmatic API
Module: `src/dates68.js` (ESM). Example:
```js
import { listDatesWithSum, numerologySum } from './src/dates68.js';

const matches = listDatesWithSum();           // default target (68) and default range
const alt = listDatesWithSum(69);             // alternate target
console.log(matches.length);
```
Function contract:
```
listDatesWithSum(target = 68, startDate = START_DATE, endDate = END_DATE) -> Date[]
```

## Development
| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Run all tests | `npm test` |
| Lint | `npm run lint` |
| Format | `npm run format` |
| Verify (lint + tests) | `npm run verify` |

Node version: target modern LTS (>=18).

Release process: see `docs/BUILD_RELEASE.md`.

## Changelog
See `CHANGELOG.md` for version history.

## Contributing
See `CONTRIBUTING.md` for author & maintainer workflows (branch naming, verification, PR template usage, merge & tag steps).

## Non-goals
- Time zone localization (uses UTC internally)
- Alternative numerology formulas
- Output formatting customization beyond provided flags

## License
CC0 1.0 Universal. See `LICENSE`.
