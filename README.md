# score68

Utility that enumerates all calendar dates between 1 Jan 2022 and 31 Dec 2026 whose numerological sum (mod 100)

Raw sum:
```
Day + Month + (first two digits of year) + (last two digits of year)
```
The value used is (raw sum % 100). Example: 24.02.2022 → 24 + 2 + 20 + 22 = 68 → 68 % 100 = 68.
If the raw sum exceeded 100 (e.g. hypothetical future date yielding 162) it would count as 62.

## CLI Usage
Default (target sum 68):
```
npm run dates:68
```

Custom target (pass desired sum as first argument):
```
node cli.js 69
```
If no dates satisfy the target within the fixed range, output lines will simply be absent for those years.

Custom date range (explicit) (--range or -r):
```
node cli.js 68 --range 2000-01-01:2025-12-31
node cli.js 68 -r 2000-01-01:2025-12-31
```

Last N years (dynamic):
```
node cli.js 68 -y 10   # Jan 1 (currentYear-9) .. Dec 31 currentYear
```
`--range` and `-y/--years` are mutually exclusive.

Help:
```
node cli.js --help
```

Sample output for default target (first year shown):
```
Utility        score68
Version          0.1.0
Repository https://github.com/al-siv/score68.git
Target              68
Range    01.01.2022–31.12.2026

Numerology date listing (sum = 68) using rule (D + M + YY(first pair) + YY(second pair)) % 100. Range: 01.01.2022–31.12.2026.

2022: 25.01 24.02 23.03 22.04 21.05 20.06 19.07 18.08 17.09 16.10 15.11 14.12
```
Each year in the range has exactly 12 such dates for target 68.

## Programmatic Usage
```js
import { listDatesWithSum } from 'score68/src/dates68.js';

// Default target (68)
const dates = listDatesWithSum();
// Custom target example
const alt = listDatesWithSum(69);
console.log(`Alt target 69 count: ${alt.length}`);
console.log(dates.length);
```

## Tests
```
npm test
```

## License
See `LICENSE` (CC0 1.0 Universal).
