#!/usr/bin/env node
import { listDatesWithSum, TARGET_SUM, START_DATE, END_DATE, groupDatesByYear, formatDateDM, formatHeader, formatDateFull, formatBanner } from './src/dates68.js';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
// Load package metadata (kept side-effect free)
const pkg = require('./package.json');

const args = process.argv.slice(2);

function parseArgs(argv) {
  const flags = { positional: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '-h' || a === '--help') flags.help = true;
  else if (a === '--range' || a === '-r') {
      const v = argv[++i];
      if (!v) throw new Error('--range requires value YYYY-MM-DD:YYYY-MM-DD');
      flags.range = v;
    } else if (a === '-y' || a === '--years') {
      const v = argv[++i];
      if (!v) throw new Error('-y/--years requires integer value');
      flags.years = Number(v);
      if (!Number.isInteger(flags.years) || flags.years <= 0) throw new Error('years must be positive integer');
    } else if (a.startsWith('-')) {
      throw new Error(`Unknown flag: ${a}`);
    } else {
      flags.positional.push(a);
    }
  }
  return flags;
}

let parsedFlags;
try { parsedFlags = parseArgs(args); } catch (e) { console.error(e.message); process.exit(1); }
if (parsedFlags.help) {
  const repo = pkg.repository && (typeof pkg.repository === 'string' ? pkg.repository : pkg.repository.url);
  const help = `${pkg.name} v${pkg.version}\n${repo || ''}\n\n` +
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
  console.log(help.trimEnd());
  process.exit(0);
}

// Allow optional custom target sum via first positional argument.
let target = TARGET_SUM;
if (parsedFlags.positional[0] !== undefined) {
  const parsed = Number(parsedFlags.positional[0]);
  if (!Number.isFinite(parsed) || !Number.isInteger(parsed) || parsed < 0) {
    console.error(`Invalid target sum: ${parsedFlags.positional[0]}. Provide a non-negative integer.`);
    process.exit(1);
  }
  target = parsed;
}

// Resolve date range
let start = START_DATE;
let end = END_DATE;
if (parsedFlags.range && parsedFlags.years) {
  console.error('Provide either --range or -y/--years, not both.');
  process.exit(1);
}
if (parsedFlags.range) {
  const m = parsedFlags.range.match(/^(\d{4}-\d{2}-\d{2}):(\d{4}-\d{2}-\d{2})$/);
  if (!m) { console.error('Invalid --range format'); process.exit(1); }
  start = new Date(m[1] + 'T00:00:00Z');
  end = new Date(m[2] + 'T00:00:00Z');
  if (isNaN(start) || isNaN(end) || start > end) { console.error('Invalid range values'); process.exit(1); }
}
if (parsedFlags.years) {
  const now = new Date();
  const currentYear = now.getUTCFullYear();
  const firstYear = currentYear - parsedFlags.years + 1;
  start = new Date(Date.UTC(firstYear, 0, 1));
  end = new Date(Date.UTC(currentYear, 11, 31));
}

const dates = listDatesWithSum(target, start, end);
const grouped = groupDatesByYear(dates);

// Banner
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
console.log(`Total dates matching target ${target}: ${dates.length}`);
