/**
 * Barrel export for shared core.
 */

export {
  numerologySum,
  numerologySumOfToday,
  computeDefaultRange,
  dateRange,
  listDatesWithSum,
  isSameDay,
  groupByYear,
  formatDateDM,
  formatDateFull,
  formatClipboardText,
  YEARS_BACK,
  YEARS_FORWARD,
} from './dates68'

export type {
  Target,
  DateRange,
  DatedResult,
  YearGroup,
  AppSettings,
  ClipboardPayload,
} from './types'
