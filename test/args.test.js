import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parseArgs, ERROR_CODES } from '../src/args.js';

describe('parseArgs', () => {
  it('returns default config for empty args', () => {
    const r = parseArgs([]);
    assert(r.ok);
    assert.equal(r.config.target, 68);
    assert.equal(r.config.help, false);
  });

  it('parses --help flag', () => {
    const r = parseArgs(['--help']);
    assert(r.ok && r.config.help);
  });

  it('parses custom target as positional', () => {
    const r = parseArgs(['70']);
    assert(r.ok && r.config.target === 70);
  });

  it('parses --range flag', () => {
    const r = parseArgs(['--range', '2024-01-01:2024-12-31']);
    assert(r.ok);
    assert(r.config.start.toISOString().startsWith('2024-01-01'));
    assert(r.config.end.toISOString().startsWith('2024-12-31'));
  });

  it('parses short -y flag', () => {
    const r = parseArgs(['-y', '1']);
    assert(r.ok);
    assert(r.config.start.getUTCFullYear() <= r.config.end.getUTCFullYear());
  });

  it('rejects conflicting --range and -y', () => {
    const r = parseArgs(['--range', '2024-01-01:2024-12-31', '-y', '2']);
    assert(!r.ok);
    assert.equal(r.error.code, ERROR_CODES.CONFLICT_RANGE_YEARS);
  });

  it('rejects negative target', () => {
    const r = parseArgs(['-1']);
    assert(!r.ok);
    assert.equal(r.error.code, ERROR_CODES.INVALID_TARGET);
  });

  it('rejects unknown flag', () => {
    const r = parseArgs(['--unknown']);
    assert(!r.ok);
    assert.equal(r.error.code, ERROR_CODES.UNKNOWN_FLAG);
  });

  it('rejects malformed range', () => {
    const r = parseArgs(['--range', 'bad']);
    assert(!r.ok);
    assert.equal(r.error.code, ERROR_CODES.RANGE_FORMAT);
  });

  it('rejects zero years', () => {
    const r = parseArgs(['-y', '0']);
    assert(!r.ok);
    assert.equal(r.error.code, ERROR_CODES.YEARS_VALUE);
  });
});
