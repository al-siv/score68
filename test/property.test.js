import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fc from 'fast-check';
import { numerologySum } from '../src/dates68.js';

describe('numerologySum (property-based)', () => {
  it('equals (d + m + ⌊Y/100⌋ + Y%100) % 100 for any date in 1900–2100', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date('1900-01-01T00:00:00Z'), max: new Date('2100-12-31T00:00:00Z') }),
        (d) => {
          const day = d.getUTCDate();
          const month = d.getUTCMonth() + 1;
          const year = d.getUTCFullYear();
          const expected = (day + month + Math.floor(year / 100) + (year % 100)) % 100;
          assert.equal(numerologySum(d), expected);
          assert(expected >= 0 && expected < 100);
        },
      ),
    );
  });
});
