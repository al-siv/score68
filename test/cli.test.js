import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const cliPath = path.resolve('cli.js');

// Help output
const helpOut = execFileSync(process.execPath, [cliPath, '--help'], { encoding: 'utf8' });
assert.match(helpOut, /^score68 v0\.1\.0/m, 'Help should start with name and version');
assert.match(helpOut, /github\.com\/al-siv\/score68/i, 'Help should contain repository URL');
assert.match(helpOut, /Usage: node cli\.js \[targetSum\]/);
assert.match(helpOut, /default 68/);
assert.match(helpOut, /-h, --help/);

// Custom target run (pick 69) should produce header with sum = 69
const run69 = execFileSync(process.execPath, [cliPath, '69'], { encoding: 'utf8' });
assert(run69.includes('sum = 69'), 'Header should reflect custom target 69');

// Range flag test
const rangeOut = execFileSync(process.execPath, [cliPath, '68', '--range', '2024-01-01:2024-12-31'], { encoding: 'utf8' });
assert(rangeOut.includes('Range')); // banner
assert(rangeOut.includes('2024') && !rangeOut.includes('2023:'), 'Should only list 2024 year');

// Short -r alias test
const rangeAliasOut = execFileSync(process.execPath, [cliPath, '68', '-r', '2024-01-01:2024-12-31'], { encoding: 'utf8' });
assert(rangeAliasOut.includes('2024') && !rangeAliasOut.includes('2023:'), 'Short -r alias should behave like --range');

// Years flag test (1 year) - dynamic year may change; just assert Range present
const currentYear = new Date().getUTCFullYear();
const yearsOut = execFileSync(process.execPath, [cliPath, '68', '-y', '1'], { encoding: 'utf8' });
assert(yearsOut.includes(`${currentYear}:`), 'Years flag should include current year');

// Conflict flags should error
let conflictFailed = false;
try {
	execFileSync(process.execPath, [cliPath, '68', '--range', '2024-01-01:2024-12-31', '-y', '2'], { encoding: 'utf8', stdio: 'pipe' });
} catch (e) {
	conflictFailed = true;
	assert(String(e.stderr || e.message).toLowerCase().includes('either --range or -y'), 'Conflict error message expected');
}
assert(conflictFailed, 'Expected conflict to fail');

// Banner format columns (Utility and Version right-aligned near end of lines). Basic presence check.
assert(/Utility\s+score68/.test(run69));
assert(/Version\s+0\.1\.0/.test(run69));

console.log('CLI tests passed');
