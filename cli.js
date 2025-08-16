#!/usr/bin/env node
import { listDatesWithSum, TARGET_SUM, START_DATE, END_DATE, groupDatesByYear, formatDateDM, formatHeader } from './src/dates68.js';

const dates = listDatesWithSum();
const grouped = groupDatesByYear(dates);

console.log(formatHeader({ target: TARGET_SUM, start: START_DATE, end: END_DATE }));
console.log();
for (const year of Object.keys(grouped).sort()) {
  const line = grouped[year].map(d => formatDateDM(d)).join(' ');
  console.log(`${year}: ${line}`);
}
