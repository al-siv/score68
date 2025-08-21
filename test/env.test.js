import assert from 'node:assert';
import { execFileSync } from 'node:child_process';

function runEnv(env, args = []) {
  return execFileSync('node', ['cli.js', ...args], { env: { ...process.env, ...env } })
    .toString();
}

// Test SCORE68_TARGET applied when no CLI target provided
const out1 = runEnv({ SCORE68_TARGET: '72' });
assert.match(out1, /Target:\s+72/);

// CLI argument should override env SCORE68_TARGET
const out2 = runEnv({ SCORE68_TARGET: '72' }, ['69']);
assert.match(out2, /Target:\s+69/);

// SCORE68_RANGE should set range when no CLI range flags
const out3 = runEnv({ SCORE68_RANGE: '2024-01-01:2024-12-31' });
assert.match(out3, /Range:\s+01\.01\.2024/);
assert.match(out3, /31\.12\.2024/);

// SCORE68_YEARS applied when no range and no years flag (non-deterministic current year; just assert pattern)
const currentYear = new Date().getFullYear();
const out4 = runEnv({ SCORE68_YEARS: '1' });
assert.match(out4, new RegExp(`01\\.01\\.${currentYear}.*31\\.12\\.${currentYear}`));

// CLI range should override env years
const out5 = runEnv({ SCORE68_YEARS: '5' }, ['--range', '2023-01-01:2023-12-31']);
assert.match(out5, /Range:\s+01\.01\.2023–31\.12\.2023/);

console.log('Env override tests passed');
