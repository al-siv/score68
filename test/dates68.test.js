import assert from 'node:assert/strict';
import { numerologySum, listDatesWithSum, TARGET_SUM, START_DATE, END_DATE, groupDatesByYear, formatDateDM, formatHeader, formatDateFull } from '../src/dates68.js';

const dates = listDatesWithSum();

// Ensure non-empty
assert.ok(dates.length > 0, 'Expected some dates');

// All sums are 68
for (const d of dates) {
  assert.equal(numerologySum(d), TARGET_SUM, `Date ${d.toISOString()} should sum to ${TARGET_SUM}`);
}

// Count per year expectations (derived earlier)
const grouped = groupDatesByYear(dates);
const counts = Object.fromEntries(Object.entries(grouped).map(([y, arr]) => [y, arr.length]));
// Each year in the range has exactly 12 qualifying dates (day + month constant per year).
assert.deepEqual(counts, { '2022': 12, '2023': 12, '2024': 12, '2025': 12, '2026': 12 });

// Formatting helpers
const sample = grouped['2022'][0];
assert.match(formatDateDM(sample), /^\d{2}\.\d{2}$/);
assert.match(formatDateFull(sample), /^\d{2}\.\d{2}\.2022$/);

// Header formatting
const header = formatHeader({ target: TARGET_SUM, start: START_DATE, end: END_DATE });
assert(header.includes('sum = 68'));
assert(header.includes('2022') && header.includes('2026'));

console.log('All tests passed. Total dates:', dates.length);
