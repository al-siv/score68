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

console.log('CLI tests passed');
