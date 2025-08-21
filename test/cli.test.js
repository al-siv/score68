import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const pkg = require('../package.json');

const cliPath = path.resolve('cli.js');

// Help output
const helpOut = execFileSync(process.execPath, [cliPath, '--help'], { encoding: 'utf8' });
const versionPattern = new RegExp(`^score68 v${pkg.version.replace(/\./g, '\\.')}`, 'm');
assert.match(helpOut, versionPattern, 'Help should start with name and current version');
assert.match(helpOut, /github\.com\/al-siv\/score68/i, 'Help should contain repository URL');
assert.match(helpOut, /Usage:\n\s+node cli\.js \[targetSum\]/, 'Help usage block missing');
assert.match(helpOut, /default 68/);
assert.match(helpOut, /-h, --help/);

// Custom target run (pick 69) should produce header with sum = 69
const run69 = execFileSync(process.execPath, [cliPath, '69'], { encoding: 'utf8' });
assert(run69.includes('sum = 69'), 'Header should reflect custom target 69');
assert(/Total dates matching target '\\b69\\b': \d+/.test(run69) || /Total dates matching target '69': \d+/.test(run69), 'Should include total statistics line for target 69');

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

// Banner presence (labels with colons, values following)
assert(/Utility:\s+score68/.test(run69));
const bannerVersionPattern = new RegExp(`Version:\\s+${pkg.version.replace(/\./g, '\\.')}`);
assert(bannerVersionPattern.test(run69));
assert(/Total dates matching target '68': \d+/.test(rangeOut), 'Range run should include total line');

console.log('CLI tests passed');
