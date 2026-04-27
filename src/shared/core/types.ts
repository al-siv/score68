/**
 * Core TypeScript types for score68.
 *
 * @since 2.0.0
 */

/** Numerology target: integer in [0, 99]. */
export type Target = number

/** A date range with inclusive boundaries (UTC). */
export interface DateRange {
  /** Inclusive start date (UTC midnight). */
  start: Date
  /** Inclusive end date (UTC midnight). */
  end: Date
}

/** A single date grouped under a year, with today-flag. */
export interface DatedResult {
  /** The matching date (UTC). */
  date: Date
  /** Whether this date is today. */
  isToday: boolean
}

/** A year-grouped bucket of matching dates. */
export interface YearGroup {
  /** UTC full year (e.g. 2026). */
  year: number
  /** Dates matching the target in this year. */
  dates: DatedResult[]
  /** Whether this group contains today's year. */
  isCurrentYear: boolean
}

/** App-wide persisted settings. */
export interface AppSettings {
  target: Target
  lang: 'en' | 'ru'
  theme: 'light' | 'dark'
}

/** Clipboard output payload. */
export interface ClipboardPayload {
  target: Target
  range: DateRange
  groups: YearGroup[]
  totalCount: number
}
