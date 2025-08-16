# score68

Utility that enumerates all calendar dates between 24 Feb 2022 and 31 Dec 2026 whose numerological sum

```
Day + Month + (first two digits of year) + (last two digits of year) = 68
```

Example: 24.02.2022 → 24 + 2 + 20 + 22 = 68.

## CLI Usage
```
npm run dates:68
```

Sample output (truncated):
```
2022: 24.02 23.03 22.04 ...
```

## Programmatic Usage
```js
import { listDatesWithSum } from 'score68/src/dates68.js';

const dates = listDatesWithSum();
console.log(dates.length);
```

## Tests
```
npm test
```

## License
See `LICENSE` (CC0 1.0 Universal).
