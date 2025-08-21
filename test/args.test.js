import assert from 'node:assert/strict';
import { parseArgs } from '../src/args.js';

// Valid basic
let r = parseArgs([]);
assert(r.ok && r.config.target === 68, 'Default target 68');

// Help flag
r = parseArgs(['--help']);
assert(r.ok && r.config.help, 'Help flag parsed');

// Custom target
r = parseArgs(['70']);
assert(r.ok && r.config.target === 70, 'Custom target 70');

// Range
r = parseArgs(['--range', '2024-01-01:2024-12-31']);
assert(r.ok && r.config.start.toISOString().startsWith('2024-01-01') && r.config.end.toISOString().startsWith('2024-12-31'), 'Range parsed');

// Years
r = parseArgs(['-y', '1']);
assert(r.ok && r.config.start.getUTCFullYear() <= r.config.end.getUTCFullYear(), 'Years range created');

// Conflict
r = parseArgs(['--range', '2024-01-01:2024-12-31', '-y', '2']);
assert(!r.ok && r.error.code === 'CONFLICT_RANGE_YEARS', 'Conflict detected');

// Invalid target
r = parseArgs(['-1']);
assert(!r.ok && r.error.code === 'INVALID_TARGET', 'Negative target invalid');

// Invalid flag
r = parseArgs(['--unknown']);
assert(!r.ok && r.error.code === 'UNKNOWN_FLAG', 'Unknown flag error');

// Invalid range format
r = parseArgs(['--range', 'bad']);
assert(!r.ok && r.error.code === 'RANGE_FORMAT', 'Range format error');

// Invalid years value
r = parseArgs(['-y', '0']);
assert(!r.ok && r.error.code === 'YEARS_VALUE', 'Years must be positive');

console.log('Args parser tests passed');
