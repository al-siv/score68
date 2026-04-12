import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliPath = resolve(__dirname, '..', 'cli.js');

/** Run CLI and return stdout. */
function run(args = [], env = {}) {
  return execFileSync(process.execPath, [cliPath, ...args], {
    encoding: 'utf8',
    env: { ...process.env, ...env },
    stdio: ['pipe', 'pipe', 'pipe'],
  });
}

/** Run CLI expecting a non-zero exit, return the error. */
function runFail(args = []) {
  try {
    execFileSync(process.execPath, [cliPath, ...args], {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    assert.fail('Expected non-zero exit');
  } catch (e) {
    return e;
  }
}

describe('CLI', () => {
  it('prints help with version, repo URL, and usage', () => {
    const out = run(['--help']);
    assert.match(out, /^score68 v\d+\.\d+\.\d+/m);
    assert.match(out, /github\.com\/al-siv\/score68/i);
    assert.match(out, /Usage:/);
    assert.match(out, /-h, --help/);
  });

  it('runs with default target 68', () => {
    const out = run();
    assert(out.includes('sum = 68'));
    assert.match(out, /Total dates matching target '68': \d+/);
  });

  it('runs with custom target 69', () => {
    const out = run(['69']);
    assert(out.includes('sum = 69'));
    assert.match(out, /Total dates matching target '69': \d+/);
  });

  it('applies --range flag', () => {
    const out = run(['68', '--range', '2024-01-01:2024-12-31']);
    assert(out.includes('Range'));
    assert(out.includes('2024') && !out.includes('2023:'));
  });

  it('applies short -r alias', () => {
    const out = run(['68', '-r', '2024-01-01:2024-12-31']);
    assert(out.includes('2024') && !out.includes('2023:'));
  });

  it('applies -y years flag', () => {
    const currentYear = new Date().getUTCFullYear();
    const out = run(['68', '-y', '1']);
    assert(out.includes(`${currentYear}:`));
  });

  it('exits with error on conflicting flags', () => {
    const e = runFail(['68', '--range', '2024-01-01:2024-12-31', '-y', '2']);
    assert(
      String(e.stderr || e.message)
        .toLowerCase()
        .includes('either --range or -y'),
    );
  });

  it('prints banner with utility info', () => {
    const out = run(['69']);
    assert.match(out, /Utility:\s+score68/);
    assert.match(out, /Version:\s+\d+\.\d+\.\d+/);
  });

  it('includes total line for range run', () => {
    const out = run(['68', '--range', '2024-01-01:2024-12-31']);
    assert.match(out, /Total dates matching target '68': \d+/);
  });
});
