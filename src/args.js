// Pure argument parser (no side-effects). Returns a discriminated union result.
// Contract:
// parseArgs(raw: string[]) ->
//   { ok: true, config: { target:number, start:Date, end:Date, help:boolean } }
// | { ok:false, error: { code:string, message:string } }
// Error codes: UNKNOWN_FLAG, INVALID_TARGET, RANGE_FORMAT, RANGE_ORDER, YEARS_VALUE, CONFLICT_RANGE_YEARS
import { TARGET_SUM, START_DATE, END_DATE } from './dates68.js';

const RANGE_RE = /^(\d{4}-\d{2}-\d{2}):(\d{4}-\d{2}-\d{2})$/;

export function parseArgs(raw) {
  const flags = { positional: [], help: false };
  for (let i = 0; i < raw.length; i++) {
    const a = raw[i];
    if (a === '-h' || a === '--help') flags.help = true;
    else if (a === '--range' || a === '-r') {
      const v = raw[++i];
      if (!v) return err('RANGE_FORMAT', '--range requires value YYYY-MM-DD:YYYY-MM-DD');
      flags.range = v;
    } else if (a === '-y' || a === '--years') {
      const v = raw[++i];
      if (!v) return err('YEARS_VALUE', '-y/--years requires integer value');
      const n = Number(v);
      if (!Number.isInteger(n) || n <= 0) return err('YEARS_VALUE', 'years must be positive integer');
      flags.years = n;
    } else if (a.startsWith('-')) {
      // Distinguish negative numbers from unknown flags
      if (/^-\d+$/.test(a)) {
        flags.positional.push(a);
      } else {
        return err('UNKNOWN_FLAG', `Unknown flag: ${a}`);
      }
    } else {
      flags.positional.push(a);
    }
  }

  if (flags.range && flags.years) return err('CONFLICT_RANGE_YEARS', 'Provide either --range or -y/--years, not both.');

  // target positional
  let target = TARGET_SUM;
  if (flags.positional[0] !== undefined) {
    const parsed = Number(flags.positional[0]);
    if (!Number.isFinite(parsed) || !Number.isInteger(parsed) || parsed < 0) {
      return err('INVALID_TARGET', `Invalid target sum: ${flags.positional[0]}. Provide a non-negative integer.`);
    }
    target = parsed;
  }

  let rangeStart = START_DATE;
  let rangeEnd = END_DATE;
  if (flags.range) {
    const m = flags.range.match(RANGE_RE);
    if (!m) return err('RANGE_FORMAT', 'Invalid --range format');
    rangeStart = new Date(m[1] + 'T00:00:00Z');
    rangeEnd = new Date(m[2] + 'T00:00:00Z');
    if (isNaN(rangeStart) || isNaN(rangeEnd) || rangeStart > rangeEnd) {
      return err('RANGE_ORDER', 'Invalid range values');
    }
  }

  if (flags.years) {
    const now = new Date();
    const currentYear = now.getUTCFullYear();
    const firstYear = currentYear - flags.years + 1;
    rangeStart = new Date(Date.UTC(firstYear, 0, 1));
    rangeEnd = new Date(Date.UTC(currentYear, 11, 31));
  }

  const rangeProvided = Boolean(flags.range || flags.years);
  return { ok: true, config: { help: flags.help, target, start: rangeStart, end: rangeEnd, rangeProvided } };
}

function err(code, message) {
  return { ok: false, error: { code, message } };
}

export const ERROR_CODES = {
  UNKNOWN_FLAG: 'UNKNOWN_FLAG',
  INVALID_TARGET: 'INVALID_TARGET',
  RANGE_FORMAT: 'RANGE_FORMAT',
  RANGE_ORDER: 'RANGE_ORDER',
  YEARS_VALUE: 'YEARS_VALUE',
  CONFLICT_RANGE_YEARS: 'CONFLICT_RANGE_YEARS'
};
