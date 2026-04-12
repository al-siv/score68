import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliPath = resolve(__dirname, '..', 'cli.js');

function run(env, args = []) {
  return execFileSync(process.execPath, [cliPath, ...args], {
    encoding: 'utf8',
    env: { ...process.env, ...env },
  });
}

describe('environment variable overrides', () => {
  it('SCORE68_TARGET sets target when no CLI target given', () => {
    assert.match(run({ SCORE68_TARGET: '72' }), /Target:\s+72/);
  });

  it('CLI argument overrides SCORE68_TARGET', () => {
    assert.match(run({ SCORE68_TARGET: '72' }, ['69']), /Target:\s+69/);
  });

  it('SCORE68_RANGE sets date range', () => {
    const out = run({ SCORE68_RANGE: '2024-01-01:2024-12-31' });
    assert.match(out, /Range:\s+01\.01\.2024/);
    assert.match(out, /31\.12\.2024/);
  });

  it('SCORE68_YEARS computes year range', () => {
    const currentYear = new Date().getFullYear();
    const out = run({ SCORE68_YEARS: '1' });
    assert.match(out, new RegExp(`01\\.01\\.${currentYear}.*31\\.12\\.${currentYear}`));
  });

  it('CLI range overrides SCORE68_YEARS', () => {
    const out = run({ SCORE68_YEARS: '5' }, ['--range', '2023-01-01:2023-12-31']);
    assert.match(out, /Range:\s+01\.01\.2023–31\.12\.2023/);
  });
});
