#!/usr/bin/env node
import { listDatesWithSum, TARGET_SUM, START_DATE, END_DATE, groupDatesByYear, formatDateDM, formatHeader, formatDateFull, formatBanner } from './src/dates68.js';
import { parseArgs } from './src/args.js';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const raw = process.argv.slice(2);
const parsed = parseArgs(raw);
if (!parsed.ok) {
  console.error(parsed.error.message);
  process.exit(1);
}
const { help, target, start, end } = parsed.config;

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
    `  -h, --help     Show this help message and exit`;
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
