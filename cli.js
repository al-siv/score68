/** CLI entry for score68 (replaces scripts/dates68.js) */
import { listDatesWithSum, TARGET_SUM, START_DATE, END_DATE } from './src/dates68.js';

function groupBy(xs, keyFn) { return xs.reduce((m, x) => { const k = keyFn(x); (m[k] ||= []).push(x); return m; }, {}); }

function fmt(date) { return `${String(date.getUTCDate()).padStart(2,'0')}.${String(date.getUTCMonth()+1).padStart(2,'0')}.${date.getUTCFullYear()}`; }

const matching = listDatesWithSum(TARGET_SUM, START_DATE, END_DATE);
const byYear = groupBy(matching, d => d.getUTCFullYear());

console.log(`Numerology date listing (sum = ${TARGET_SUM}) using rule D + M + YY(first pair) + YY(second pair). Range: ${fmt(START_DATE)}–${fmt(END_DATE)}.\n`);
Object.keys(byYear).sort().forEach(year => {
  const parts = byYear[year]
    .sort((a,b)=>a-b)
    .map(d => `${String(d.getUTCDate()).padStart(2,'0')}.${String(d.getUTCMonth()+1).padStart(2,'0')}`);
  console.log(`${year}: ${parts.join(' ')}`);
});
