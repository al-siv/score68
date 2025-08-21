#!/usr/bin/env node
import { listDatesWithSum, TARGET_SUM, START_DATE, END_DATE, groupDatesByYear, formatDateDM, formatHeader, formatDateFull, formatBanner } from './src/dates68.js';
import { parseArgs } from './src/args.js';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const pkg = require('./package.json');

// CLI raw args
const raw = process.argv.slice(2);
const parsed = parseArgs(raw);
if (!parsed.ok) {
  console.error(parsed.error.message);
  process.exit(1);
}
const { help } = parsed.config; // Help flag immutable
let { target, start, end } = parsed.config; // Mutated if env overrides apply

// Environment variable overrides (lowest precedence: env < CLI flags/args)
// Supported:
//   SCORE68_TARGET   numeric target
//   SCORE68_RANGE    YYYY-MM-DD:YYYY-MM-DD
//   SCORE68_YEARS    last N years (mutually exclusive with SCORE68_RANGE)
// Precedence: explicit CLI params win; only fill if CLI left default values.
try {
  if (process.env.SCORE68_TARGET && parsed.config.target === TARGET_SUM) {
    const t = Number(process.env.SCORE68_TARGET);
    if (!Number.isNaN(t) && t >= 0) target = t;
  }
  const rangeEnv = process.env.SCORE68_RANGE;
  const yearsEnv = process.env.SCORE68_YEARS;
  if (!parsed.config.rangeProvided) {
    if (rangeEnv && yearsEnv) {
      // Conflict in env vars: choose RANGE for determinism.
      const [s, e] = rangeEnv.split(':');
      const rs = new Date(s);
      const re = new Date(e);
      if (!isNaN(rs) && !isNaN(re) && rs <= re) { start = rs; end = re; }
    } else if (rangeEnv) {
      const [s, e] = rangeEnv.split(':');
      const rs = new Date(s);
      const re = new Date(e);
      if (!isNaN(rs) && !isNaN(re) && rs <= re) { start = rs; end = re; }
    } else if (yearsEnv && !isNaN(Number(yearsEnv))) {
      const n = Number(yearsEnv);
      if (n > 0) {
        const today = new Date();
        const currentYear = today.getFullYear();
        const firstYear = currentYear - n + 1;
        start = new Date(Date.UTC(firstYear, 0, 1));
        end = new Date(Date.UTC(currentYear, 11, 31));
      }
    }
  }
} catch {
  // Silent: env overrides are best-effort; fall back to parsed values.
}

if (help) {
  const repo = pkg.repository && (typeof pkg.repository === 'string' ? pkg.repository : pkg.repository.url);
  const helpText = `${pkg.name} v${pkg.version}\n${repo || ''}\n\n` +
    `Usage:\n` +
    `  node cli.js [targetSum] [--range YYYY-MM-DD:YYYY-MM-DD | -r YYYY-MM-DD:YYYY-MM-DD | -y N]\n\n` +
    `Description:\n` +
    `  Enumerate dates between ${START_DATE.toISOString().slice(0,10)} and ${END_DATE.toISOString().slice(0,10)} whose numerological sum\n` +
    `  (Day + Month + firstPair + secondPair) % 100 equals targetSum.\n\n` +
    `Arguments:\n` +
    `  targetSum      Non-negative integer (default ${TARGET_SUM})\n\n` +
    `Options:\n` +
    `  -r, --range    Explicit date range YYYY-MM-DD:YYYY-MM-DD (inclusive)\n` +
    `  -y, --years    Last N years (Jan 1 of (currentYear-N+1) to Dec 31 currentYear)\n` +
    `  -h, --help     Show this help message and exit\n\n` +
    `Environment overrides (lower precedence than CLI):\n` +
    `  SCORE68_TARGET  numeric target (default if not provided via CLI)\n` +
    `  SCORE68_RANGE   YYYY-MM-DD:YYYY-MM-DD (ignored if CLI range/years given)\n` +
    `  SCORE68_YEARS   N (ignored if CLI range/years or SCORE68_RANGE provided)`;
  console.log(helpText.trimEnd());
  process.exit(0);
}

const dates = listDatesWithSum(target, start, end);
const grouped = groupDatesByYear(dates);
const repo = pkg.repository && (typeof pkg.repository === 'string' ? pkg.repository : pkg.repository.url);
console.log(formatBanner([
  ['Utility:', 'score68'],
  ['Version:', pkg.version],
  ['Repository:', repo || ''],
  ['Target:', target],
  ['Range:', `${formatDateFull(start)}–${formatDateFull(end)}`]
]));
console.log();
console.log(formatHeader({ target, start, end }));
console.log();
for (const year of Object.keys(grouped).sort()) {
  const line = grouped[year].map(d => formatDateDM(d)).join(' ');
  console.log(`${year}: ${line}`);
}
console.log();
console.log(`Total dates matching target '${target}': ${dates.length}`);
