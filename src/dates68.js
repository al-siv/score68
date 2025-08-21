// Pure module providing listing functionality.
export const TARGET_SUM = 68;
export const START_DATE = new Date(Date.UTC(2022, 0, 1)); // changed from Feb 24 2022 to Jan 1 2022
export const END_DATE = new Date(Date.UTC(2026, 11, 31));

export function numerologySum(date) {
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const firstPair = Math.floor(year / 100);
  const secondPair = year % 100;
  const total = day + month + firstPair + secondPair;
  return total % 100; // Apply modulo 100 rule (exceeding 100 wraps around)
}

export function* dateRange(start, end) {
  const d = new Date(start.getTime());
  while (d <= end) {
    yield new Date(d.getTime());
    d.setUTCDate(d.getUTCDate() + 1);
  }
}

export function listDatesWithSum(target = TARGET_SUM, start = START_DATE, end = END_DATE) {
  const result = [];
  for (const day of dateRange(start, end)) {
    if (numerologySum(day) === target) {
      result.push(day);
    }
  }
  return result;
}

// --- New helpers (pure) ---
export function formatDateDM(date) {
  return `${String(date.getUTCDate()).padStart(2,'0')}.${String(date.getUTCMonth()+1).padStart(2,'0')}`;
}

export function formatDateFull(date) {
  return `${formatDateDM(date)}.${date.getUTCFullYear()}`;
}

export function groupDatesByYear(dates) {
  return dates.reduce((acc, d) => {
    const y = d.getUTCFullYear();
    (acc[y] ||= []).push(d);
    return acc;
  }, {});
}

export function formatHeader({ target = TARGET_SUM, start = START_DATE, end = END_DATE } = {}) {
  return `Numerology date listing (sum = ${target}) using rule (D + M + YY(first pair) + YY(second pair)) % 100. Range: ${formatDateFull(start)}–${formatDateFull(end)}.`;
}

// Banner formatting (label right-aligned, value left-aligned)
export function formatBanner(entries) {
  // entries: array of [label, value]
  const labelWidth = Math.max(...entries.map(([l]) => l.length));
  return entries
    .map(([l, v]) => `${l.padStart(labelWidth)}  ${String(v)}`)
    .join('\n');
}
