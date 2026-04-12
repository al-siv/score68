#!/usr/bin/env node

/**
 * CLI entry point — thin orchestration shell.
 * All logic lives in pure src/ modules; this file only wires I/O.
 */

import {
  listDatesWithSum,
  TARGET_SUM,
  START_DATE,
  END_DATE,
  groupDatesByYear,
  formatDateDM,
  formatDateFull,
  formatHeader,
  formatBanner,
} from './src/dates68.js';
import { parseArgs } from './src/args.js';
import { resolveEnv } from './src/env.js';
import pkg from './package.json' with { type: 'json' };

// ── Parse & validate ────────────────────────────────────────

const parsed = parseArgs(process.argv.slice(2));

if (!parsed.ok) {
  console.error(parsed.error.message);
  process.exit(1);
}

if (parsed.config.help) {
  printHelp();
  process.exit(0);
}

// ── Resolve env overrides → compute → print ─────────────────

const { target, start, end } = resolveEnv(process.env, parsed.config);
const dates = listDatesWithSum(target, start, end);
const grouped = groupDatesByYear(dates);

printBanner(target, start, end);
printResults(grouped, target, dates.length);

// ── Output helpers ──────────────────────────────────────────

function printHelp() {
  const repo = repoUrl();
  console.log(
    [
      `${pkg.name} v${pkg.version}`,
      repo,
      '',
      'Usage:',
      '  node cli.js [targetSum] [--range YYYY-MM-DD:YYYY-MM-DD | -r YYYY-MM-DD:YYYY-MM-DD | -y N]',
      '',
      'Description:',
      `  Enumerate dates between ${iso(START_DATE)} and ${iso(END_DATE)} whose numerological sum`,
      '  (Day + Month + firstPair + secondPair) % 100 equals targetSum.',
      '',
      'Arguments:',
      `  targetSum      Non-negative integer (default ${TARGET_SUM})`,
      '',
      'Options:',
      '  -r, --range    Explicit date range YYYY-MM-DD:YYYY-MM-DD (inclusive)',
      '  -y, --years    Last N years (Jan 1 of (currentYear-N+1) to Dec 31 currentYear)',
      '  -h, --help     Show this help message and exit',
      '',
      'Environment overrides (lower precedence than CLI):',
      '  SCORE68_TARGET  numeric target (default if not provided via CLI)',
      '  SCORE68_RANGE   YYYY-MM-DD:YYYY-MM-DD (ignored if CLI range/years given)',
      '  SCORE68_YEARS   N (ignored if CLI range/years or SCORE68_RANGE provided)',
    ].join('\n'),
  );
}

function printBanner(target, start, end) {
  console.log(
    formatBanner([
      ['Utility:', 'score68'],
      ['Version:', pkg.version],
      ['Repository:', repoUrl()],
      ['Target:', target],
      ['Range:', `${formatDateFull(start)}–${formatDateFull(end)}`],
    ]),
  );
  console.log();
  console.log(formatHeader({ target }));
  console.log();
}

function printResults(grouped, target, total) {
  for (const year of Object.keys(grouped).sort()) {
    console.log(`${year}: ${grouped[year].map(formatDateDM).join(' ')}`);
  }
  console.log();
  console.log(`Total dates matching target '${target}': ${total}`);
}

function repoUrl() {
  return (
    (pkg.repository &&
      (typeof pkg.repository === 'string' ? pkg.repository : pkg.repository.url)) ||
    ''
  );
}

function iso(date) {
  return date.toISOString().slice(0, 10);
}
