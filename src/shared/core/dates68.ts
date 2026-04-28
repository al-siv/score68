/**
 * Core date-scoring logic — pure functions, no side-effects.
 *
 * Formula: `(D + M + ⌊Y/100⌋ + Y%100) % 100`
 */

import type { DateRange, YearGroup, DatedResult } from './types'

/** Number of years to look back from today. */
export const YEARS_BACK = 200

/** Number of years to look forward from today. */
export const YEARS_FORWARD = 50

/**
 * Compute the numerology sum for a given UTC date.
 *
 * @param date - UTC date
 * @returns Integer in [0, 99]
 *
 * @example numerologySum(new Date(Date.UTC(2022, 0, 25))) // → 68
 */
export function numerologySum(date: Date): number {
  const day = date.getUTCDate()
  const month = date.getUTCMonth() + 1
  const year = date.getUTCFullYear()
  return (day + month + Math.floor(year / 100) + (year % 100)) % 100
}

/**
 * Compute today's numerology sum (UTC).
 *
 * @returns Integer in [0, 99]
 *
 * @example numerologySumOfToday()
 */
export function numerologySumOfToday(): number {
  return numerologySum(new Date())
}

/**
 * Compute the default date range: [today − YEARS_BACK, today + YEARS_FORWARD].
 *
 * @returns Inclusive date range with UTC midnight boundaries
 *
 * @example computeDefaultRange() // { start: Date(1826-04-25), end: Date(2076-04-25) }
 */
export function computeDefaultRange(): DateRange {
  const now = new Date()
  const y = now.getUTCFullYear()
  const m = now.getUTCMonth()
  const d = now.getUTCDate()
  return {
    start: new Date(Date.UTC(y - YEARS_BACK, m, d)),
    end: new Date(Date.UTC(y + YEARS_FORWARD, m, d)),
  }
}

/**
 * Yield every UTC date from `start` to `end` inclusive (day granularity).
 *
 * @param start - Inclusive start (UTC midnight)
 * @param end - Inclusive end (UTC midnight)
 * @yields New Date object for each day
 *
 * @example [...dateRange(new Date(Date.UTC(2026,0,1)), new Date(Date.UTC(2026,0,3)))]
 * // → [2026-01-01, 2026-01-02, 2026-01-03]
 */
export function* dateRange(start: Date, end: Date): Generator<Date> {
  const cur = new Date(start.getTime())
  while (cur <= end) {
    yield new Date(cur.getTime())
    cur.setUTCDate(cur.getUTCDate() + 1)
  }
}

/**
 * List all dates in [start, end] whose numerology sum equals the target.
 *
 * @param target - Integer in [0, 99]
 * @param start - Inclusive start date (UTC)
 * @param end - Inclusive end date (UTC)
 * @returns Array of matching UTC dates
 *
 * @example listDatesWithSum(68, new Date(Date.UTC(2022,0,1)), new Date(Date.UTC(2022,11,31)))
 */
export function listDatesWithSum(target: number, start: Date, end: Date): Date[] {
  const result: Date[] = []
  for (const d of dateRange(start, end)) {
    if (numerologySum(d) === target) result.push(d)
  }
  return result
}

/**
 * Check whether two UTC dates represent the same calendar day.
 *
 * @param a - First date
 * @param b - Second date
 * @returns `true` when year, month, and day are equal
 *
 * @example isSameDay(new Date(Date.UTC(2026,3,25)), new Date(Date.UTC(2026,3,25))) // → true
 */
export function isSameDay(a: Date, b: Date): boolean {
  if (isNaN(a.getTime()) || isNaN(b.getTime())) return false
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  )
}

/**
 * Group matching dates by year, marking today and the current year.
 *
 * @param dates - Flat array of UTC dates (assumed matching the target)
 * @returns Array of `YearGroup` objects sorted by year descending (newest first)
 *
 * @example groupByYear(dates)
 */
export function groupByYear(dates: Date[]): YearGroup[] {
  const today = new Date()
  const currentYear = today.getUTCFullYear()
  const map = new Map<number, DatedResult[]>()

  for (const d of dates) {
    const y = d.getUTCFullYear()
    const bucket = map.get(y)
    const entry: DatedResult = { date: d, isToday: isSameDay(d, today) }
    if (bucket) {
      bucket.push(entry)
    } else {
      map.set(y, [entry])
    }
  }

  const groups: YearGroup[] = []
  for (const [year, items] of map) {
    groups.push({
      year,
      dates: items,
      isCurrentYear: year === currentYear,
    })
  }

  groups.sort((a, b) => b.year - a.year)
  return groups
}

/**
 * Format a UTC date as DD.MM.
 *
 * @param date - UTC date
 * @returns String in DD.MM format
 *
 * @example formatDateDM(new Date(Date.UTC(2026, 0, 25))) // → "25.01"
 */
export function formatDateDM(date: Date): string {
  const dd = String(date.getUTCDate()).padStart(2, '0')
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0')
  return `${dd}.${mm}`
}

/**
 * Format a UTC date as DD.MM.YYYY.
 *
 * @param date - UTC date
 * @returns String in DD.MM.YYYY format
 *
 * @example formatDateFull(new Date(Date.UTC(2026, 0, 25))) // → "25.01.2026"
 */
export function formatDateFull(date: Date): string {
  return `${formatDateDM(date)}.${date.getUTCFullYear()}`
}

/**
 * Format the entire result set as a plain-text string for clipboard export.
 *
 * @param target - The numerology target that was used
 * @param groups - Year-grouped results
 * @param range - The date range
 * @param totalCount - Total number of matching dates
 * @returns Formatted plain-text string
 *
 * @example formatClipboardText(25, groups, range, 2847)
 */
export function formatClipboardText(
  target: number,
  groups: YearGroup[],
  range: DateRange,
  totalCount: number,
): string {
  const lines: string[] = [
    `score68 — Target: ${target}`,
    `Range: ${formatDateFull(range.start)} — ${formatDateFull(range.end)}`,
    '',
  ]
  for (const g of groups) {
    lines.push(`${g.year}: ${g.dates.map((d) => formatDateDM(d.date)).join(' ')}`)
  }
  lines.push('')
  lines.push(`Total: ${totalCount}`)
  return lines.join('\n')
}
