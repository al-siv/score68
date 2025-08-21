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

// --- Custom target test ---
// Choose a nearby target (e.g., 69) and ensure all produced dates match that sum
const altTarget = TARGET_SUM + 1;
const altDates = listDatesWithSum(altTarget, START_DATE, END_DATE);
for (const d of altDates) {
  assert.equal(numerologySum(d), altTarget, `Alt target date mismatch for ${d.toISOString()}`);
}
// Alt target may have 0 or more dates; simple invariant only.
console.log(`Alt target ${altTarget} produced ${altDates.length} dates.`);

// --- Modulo 100 behavior test ---
// Construct a date with raw sum > 100. Example: 2099-12-31
// Raw components: day=31, month=12, firstPair=20, secondPair=99 => raw total = 162 -> 62 after %100.
const future = new Date(Date.UTC(2099, 11, 31));
const rawTotal = 31 + 12 + 20 + 99;
assert.equal(rawTotal, 162);
assert.equal(numerologySum(future), 62, 'Modulo 100 remainder expected (162 % 100 = 62)');

// Ensure listDatesWithSum can find that date when specifying a range including it and target 62.
const dates62 = listDatesWithSum(62, future, future);
assert.equal(dates62.length, 1, 'Expected exactly one match for the future test date');
assert.equal(dates62[0].toISOString().slice(0,10), future.toISOString().slice(0,10));
