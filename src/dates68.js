// Pure module providing listing functionality.
export const TARGET_SUM = 68;
export const START_DATE = new Date(Date.UTC(2022, 1, 24));
export const END_DATE = new Date(Date.UTC(2026, 11, 31));

export function numerologySum(date) {
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const firstPair = Math.floor(year / 100);
  const secondPair = year % 100;
  return day + month + firstPair + secondPair;
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
