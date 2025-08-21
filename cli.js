#!/usr/bin/env node
import { listDatesWithSum, TARGET_SUM, START_DATE, END_DATE, groupDatesByYear, formatDateDM, formatHeader } from './src/dates68.js';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
// Load package metadata (kept side-effect free)
const pkg = require('./package.json');

const args = process.argv.slice(2);
if (args.includes('-h') || args.includes('--help')) {
  const repo = pkg.repository && (typeof pkg.repository === 'string' ? pkg.repository : pkg.repository.url);
  const help = `${pkg.name} v${pkg.version}\n${repo || ''}\n\n` +
    `Usage: node cli.js [targetSum]\n\n` +
    `Enumerate dates between ${START_DATE.toISOString().slice(0,10)} and ${END_DATE.toISOString().slice(0,10)} whose numerological sum (Day + Month + firstPair + secondPair) % 100 equals targetSum.\n\n` +
    `Arguments:\n` +
    `  targetSum   Non-negative integer (default ${TARGET_SUM})\n\n` +
    `Options:\n` +
    `  -h, --help  Show this help message and exit`;
  console.log(help.trimEnd());
  process.exit(0);
}

// Allow optional custom target sum via first positional argument.
let target = TARGET_SUM;
if (args[0] !== undefined) {
  const parsed = Number(args[0]);
  if (!Number.isFinite(parsed) || !Number.isInteger(parsed) || parsed < 0) {
    console.error(`Invalid target sum: ${args[0]}. Provide a non-negative integer.`);
    process.exit(1);
  }
  target = parsed;
}

const dates = listDatesWithSum(target);
const grouped = groupDatesByYear(dates);

console.log(formatHeader({ target, start: START_DATE, end: END_DATE }));
console.log();
for (const year of Object.keys(grouped).sort()) {
  const line = grouped[year].map(d => formatDateDM(d)).join(' ');
  console.log(`${year}: ${line}`);
}
