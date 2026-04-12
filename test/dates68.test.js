import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  numerologySum,
  listDatesWithSum,
  TARGET_SUM,
  START_DATE,
  END_DATE,
  groupDatesByYear,
  formatDateDM,
  formatDateFull,
  formatHeader,
} from '../src/dates68.js';

describe('numerologySum', () => {
  it('computes correct sum for a known date', () => {
    // 2022-01-25: 25 + 1 + 20 + 22 = 68
    assert.equal(numerologySum(new Date(Date.UTC(2022, 0, 25))), 68);
  });

  it('applies modulo 100 when raw sum exceeds 99', () => {
    // 2099-12-31: 31 + 12 + 20 + 99 = 162 → 62
    const date = new Date(Date.UTC(2099, 11, 31));
    assert.equal(31 + 12 + 20 + 99, 162);
    assert.equal(numerologySum(date), 62);
  });
});

describe('listDatesWithSum', () => {
  const dates = listDatesWithSum();

  it('returns non-empty result for default target', () => {
    assert.ok(dates.length > 0);
  });

  it('returns only dates matching the target sum', () => {
    for (const d of dates) {
      assert.equal(numerologySum(d), TARGET_SUM);
    }
  });

  it('yields exactly 12 dates per year in default range', () => {
    const grouped = groupDatesByYear(dates);
    const counts = Object.fromEntries(Object.entries(grouped).map(([y, arr]) => [y, arr.length]));
    assert.deepEqual(counts, { 2022: 12, 2023: 12, 2024: 12, 2025: 12, 2026: 12 });
  });

  it('works with a custom target', () => {
    const alt = listDatesWithSum(TARGET_SUM + 1, START_DATE, END_DATE);
    for (const d of alt) {
      assert.equal(numerologySum(d), TARGET_SUM + 1);
    }
  });

  it('finds a single date in a one-day range', () => {
    const d = new Date(Date.UTC(2099, 11, 31));
    assert.equal(listDatesWithSum(62, d, d).length, 1);
  });
});

describe('groupDatesByYear', () => {
  it('groups dates by UTC year', () => {
    const dates = [
      new Date(Date.UTC(2022, 0, 1)),
      new Date(Date.UTC(2022, 5, 15)),
      new Date(Date.UTC(2023, 0, 1)),
    ];
    const grouped = groupDatesByYear(dates);
    assert.equal(grouped[2022].length, 2);
    assert.equal(grouped[2023].length, 1);
  });
});

describe('formatting', () => {
  const sample = new Date(Date.UTC(2022, 0, 25));

  it('formatDateDM returns DD.MM', () => {
    assert.equal(formatDateDM(sample), '25.01');
  });

  it('formatDateFull returns DD.MM.YYYY', () => {
    assert.equal(formatDateFull(sample), '25.01.2022');
  });

  it('formatHeader includes target and modulo rule', () => {
    const header = formatHeader({ target: 68 });
    assert(header.includes('sum = 68'));
    assert(header.includes('% 100'));
  });
});
