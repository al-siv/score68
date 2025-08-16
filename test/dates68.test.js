import assert from 'node:assert/strict';
import { listDatesWithSum, numerologySum } from '../src/dates68.js';

const dates = listDatesWithSum();

// Ensure non-empty
assert.ok(dates.length > 0, 'Expected some dates');

// All sums are 68
for (const d of dates) {
  assert.equal(numerologySum(d), 68, 'Date sum mismatch');
}

// Count per year expectations (derived earlier)
const counts = dates.reduce((m,d)=>{const y=d.getUTCFullYear(); m[y]=(m[y]||0)+1; return m;},{});
assert.deepEqual(counts, { 2022:12, 2023:12, 2024:12, 2025:12, 2026:12 });

console.log('All tests passed.');
