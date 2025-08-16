#!/usr/bin/env node
/**
 * List all dates between 2022-02-24 and 2026-12-31 (inclusive) whose numerological sum
 * D + M + (year first two digits) + (year last two digits) equals 68.
 * Sum rule example: 28.07.1914 => 28 + 7 + 19 + 14 = 68.
 * Pure computation (no external IO) per FP discipline.
 */

function* dateRange(start, end) {
  const d = new Date(start.getTime());
  while (d <= end) {
    yield new Date(d.getTime());
    d.setDate(d.getDate() + 1);
  }
}

function numerologySum(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1; // JS months 0-based
  const year = date.getFullYear();
  const firstPair = Math.floor(year / 100); // first two digits
  const secondPair = year % 100; // last two digits
  return day + month + firstPair + secondPair;
}

function groupBy(xs, keyFn) { return xs.reduce((m, x) => { const k = keyFn(x); (m[k] ||= []).push(x); return m; }, {}); }

function formatDate(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

const START = new Date(Date.UTC(2022, 1, 24)); // 24 Feb 2022 (month index 1)
const END = new Date(Date.UTC(2026, 11, 31)); // 31 Dec 2026

const TARGET = 68;

const matching = [];
for (const day of dateRange(START, END)) {
  if (numerologySum(day) === TARGET) {
    matching.push(day);
  }
}

const byYear = groupBy(matching, d => d.getFullYear());

console.log("Numerology date listing (sum = 68) using rule D + M + YY(first pair) + YY(second pair). Range: 24.02.2022–31.12.2026.\n");
Object.keys(byYear).sort().forEach(year => {
  const parts = byYear[year]
    .sort((a,b)=>a-b)
    .map(d => `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}`);
  console.log(`${year}: ${parts.join(' ')}`);
});
