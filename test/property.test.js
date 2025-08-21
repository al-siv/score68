import assert from 'node:assert/strict';
import fc from 'fast-check';
import { numerologySum } from '../src/dates68.js';

// Property: numerologySum(date) equals (d + m + firstPair + secondPair) % 100
fc.assert(fc.property(
  fc.date({ min: new Date('1900-01-01T00:00:00Z'), max: new Date('2100-12-31T00:00:00Z') }),
  d => {
    const day = d.getUTCDate();
    const month = d.getUTCMonth() + 1;
    const year = d.getUTCFullYear();
    const firstPair = Math.floor(year / 100);
    const secondPair = year % 100;
    const expected = (day + month + firstPair + secondPair) % 100;
    assert.equal(numerologySum(d), expected);
    assert(expected >= 0 && expected < 100);
  }
));

console.log('Property test passed');
