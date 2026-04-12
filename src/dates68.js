/**
 * Core date-scoring logic — pure functions, no side-effects.
 *
 * Formula: (Day + Month + ⌊Year/100⌋ + Year%100) % 100
 */

/** Default target sum for the numerology formula. */
export const TARGET_SUM = 68;

/** Default inclusive start date (UTC). */
export const START_DATE = new Date(Date.UTC(2022, 0, 1));

/** Default inclusive end date (UTC). */
export const END_DATE = new Date(Date.UTC(2026, 11, 31));

/**
 * Compute the numerology sum for a given date.
 * @param {Date} date — UTC date
 * @returns {number} Value in [0, 99]
 */
export function numerologySum(date) {
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  return (day + month + Math.floor(year / 100) + (year % 100)) % 100;
}

/**
 * Yield every date from start to end inclusive (UTC day granularity).
 * @param {Date} start
 * @param {Date} end
 * @yields {Date}
 */
export function* dateRange(start, end) {
  const d = new Date(start.getTime());
  while (d <= end) {
    yield new Date(d.getTime());
    d.setUTCDate(d.getUTCDate() + 1);
  }
}

/**
 * List all dates in [start, end] whose numerology sum equals the target.
 * @param {number} [target=TARGET_SUM]
 * @param {Date}   [start=START_DATE]
 * @param {Date}   [end=END_DATE]
 * @returns {Date[]}
 */
export function listDatesWithSum(target = TARGET_SUM, start = START_DATE, end = END_DATE) {
  const result = [];
  for (const day of dateRange(start, end)) {
    if (numerologySum(day) === target) result.push(day);
  }
  return result;
}

/**
 * Group dates by UTC year.
 * @param {Date[]} dates
 * @returns {Record<number, Date[]>}
 */
export function groupDatesByYear(dates) {
  return dates.reduce((acc, d) => {
    const y = d.getUTCFullYear();
    (acc[y] ||= []).push(d);
    return acc;
  }, {});
}

/**
 * Format date as DD.MM.
 * @param {Date} date
 * @returns {string}
 */
export function formatDateDM(date) {
  const dd = String(date.getUTCDate()).padStart(2, '0');
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}`;
}

/**
 * Format date as DD.MM.YYYY.
 * @param {Date} date
 * @returns {string}
 */
export function formatDateFull(date) {
  return `${formatDateDM(date)}.${date.getUTCFullYear()}`;
}

/**
 * Build the header line for output.
 * @param {{ target?: number }} [options]
 * @returns {string}
 */
export function formatHeader({ target = TARGET_SUM } = {}) {
  return `Numerology date listing (sum = ${target}) using rule (D + M + YY(first pair) + YY(second pair)) % 100.`;
}

/**
 * Format a key-value banner with right-aligned labels.
 * @param {Array<[string, unknown]>} entries — [label, value] pairs
 * @returns {string}
 */
export function formatBanner(entries) {
  const labelWidth = Math.max(...entries.map(([l]) => l.length));
  return entries.map(([l, v]) => `${l.padStart(labelWidth)}  ${String(v)}`).join('\n');
}
