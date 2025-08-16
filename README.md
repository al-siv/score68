# score68

Utility that enumerates all calendar dates between 24 Feb 2022 and 31 Dec 2026 whose numerological sum

```
Day + Month + (first two digits of year) + (last two digits of year) = 68
```

Example: 24.02.2022 → 24 + 2 + 20 + 22 = 68.

## Usage

Install Node.js (>=16). Then:

```
npm run dates:68
```

Output groups dates by year with compact `DD.MM` entries:

```
2022: 24.02 23.03 ...
...
```

## License
Public domain / CC0.
