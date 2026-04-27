import { describe, it, expect } from 'vitest'
import {
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
} from '../../src/shared/core/dates68'

describe('numerologySum', () => {
  it('computes correct sum for 2022-01-25 (→ 68)', () => {
    expect(numerologySum(new Date(Date.UTC(2022, 0, 25)))).toBe(68)
  })

  it('applies modulo 100 when raw sum exceeds 99', () => {
    expect(numerologySum(new Date(Date.UTC(2099, 11, 31)))).toBe(62)
  })

  it('returns a value in [0, 99] for any valid date', () => {
    const dates = [
      new Date(Date.UTC(1800, 0, 1)),
      new Date(Date.UTC(1900, 5, 15)),
      new Date(Date.UTC(2000, 11, 31)),
      new Date(Date.UTC(2100, 6, 1)),
    ]
    for (const d of dates) {
      const result = numerologySum(d)
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThanOrEqual(99)
    }
  })

  it('computes sum for 2000-01-01 correctly', () => {
    expect(numerologySum(new Date(Date.UTC(2000, 0, 1)))).toBe(
      (1 + 1 + 20 + 0) % 100,
    )
  })

  it('computes sum for 1999-12-31 correctly', () => {
    expect(numerologySum(new Date(Date.UTC(1999, 11, 31)))).toBe(
      (31 + 12 + 19 + 99) % 100,
    )
  })

  it('handles modulo 100 wrapping correctly', () => {
    const date = new Date(Date.UTC(2050, 11, 31))
    const day = date.getUTCDate()
    const month = date.getUTCMonth() + 1
    const year = date.getUTCFullYear()
    const expected = (day + month + Math.floor(year / 100) + (year % 100)) % 100
    expect(numerologySum(date)).toBe(expected)
  })
})

describe('numerologySumOfToday', () => {
  it('returns same value as numerologySum(new Date())', () => {
    expect(numerologySumOfToday()).toBe(numerologySum(new Date()))
  })

  it('returns a value in [0, 99]', () => {
    const val = numerologySumOfToday()
    expect(val).toBeGreaterThanOrEqual(0)
    expect(val).toBeLessThanOrEqual(99)
  })
})

describe('computeDefaultRange', () => {
  it('returns a range spanning YEARS_BACK + YEARS_FORWARD years', () => {
    const { start, end } = computeDefaultRange()
    const now = new Date()
    expect(start.getUTCFullYear()).toBe(now.getUTCFullYear() - YEARS_BACK)
    expect(end.getUTCFullYear()).toBe(now.getUTCFullYear() + YEARS_FORWARD)
  })

  it('start is before end', () => {
    const { start, end } = computeDefaultRange()
    expect(start.getTime()).toBeLessThan(end.getTime())
  })
})

describe('dateRange', () => {
  it('yields every day from start to end inclusive', () => {
    const start = new Date(Date.UTC(2026, 0, 1))
    const end = new Date(Date.UTC(2026, 0, 3))
    const dates = [...dateRange(start, end)]
    expect(dates.length).toBe(3)
    expect(dates[0].getUTCDate()).toBe(1)
    expect(dates[1].getUTCDate()).toBe(2)
    expect(dates[2].getUTCDate()).toBe(3)
  })

  it('yields single date when start equals end', () => {
    const d = new Date(Date.UTC(2026, 5, 15))
    const dates = [...dateRange(d, d)]
    expect(dates.length).toBe(1)
    expect(dates[0].getTime()).toBe(d.getTime())
  })

  it('yields nothing when start > end', () => {
    const start = new Date(Date.UTC(2026, 1, 1))
    const end = new Date(Date.UTC(2026, 0, 1))
    const dates = [...dateRange(start, end)]
    expect(dates.length).toBe(0)
  })

  it('each yielded date is a new object (no aliasing)', () => {
    const start = new Date(Date.UTC(2026, 0, 1))
    const end = new Date(Date.UTC(2026, 0, 2))
    const dates = [...dateRange(start, end)]
    expect(dates[0]).not.toBe(dates[1])
  })
})

describe('listDatesWithSum', () => {
  it('returns only dates matching the target', () => {
    const start = new Date(Date.UTC(2022, 0, 1))
    const end = new Date(Date.UTC(2022, 11, 31))
    const dates = listDatesWithSum(68, start, end)
    for (const d of dates) {
      expect(numerologySum(d)).toBe(68)
    }
  })

  it('yields exactly 12 dates per year for a 1-year range', () => {
    const start = new Date(Date.UTC(2022, 0, 1))
    const end = new Date(Date.UTC(2022, 11, 31))
    const dates = listDatesWithSum(68, start, end)
    expect(dates.length).toBe(12)
  })

  it('finds a single date in a one-day range', () => {
    const d = new Date(Date.UTC(2099, 11, 31))
    expect(listDatesWithSum(62, d, d).length).toBe(1)
  })

  it('returns empty array when no dates match', () => {
    const start = new Date(Date.UTC(2000, 0, 1))
    const end = new Date(Date.UTC(2000, 0, 1))
    expect(listDatesWithSum(99, start, end).length).toBe(0)
  })

  it('returns empty array when start > end', () => {
    const start = new Date(Date.UTC(2026, 1, 1))
    const end = new Date(Date.UTC(2026, 0, 1))
    expect(listDatesWithSum(0, start, end)).toEqual([])
  })

  it('works for boundary target 0', () => {
    const start = new Date(Date.UTC(2060, 0, 1))
    const end = new Date(Date.UTC(2060, 11, 31))
    const dates = listDatesWithSum(0, start, end)
    for (const d of dates) {
      expect(numerologySum(d)).toBe(0)
    }
    expect(dates.length).toBeGreaterThan(0)
  })

  it('works for boundary target 99', () => {
    const start = new Date(Date.UTC(2000, 0, 1))
    const end = new Date(Date.UTC(2000, 11, 31))
    const dates = listDatesWithSum(99, start, end)
    for (const d of dates) {
      expect(numerologySum(d)).toBe(99)
    }
  })
})

describe('isSameDay', () => {
  it('returns true for same UTC date', () => {
    const a = new Date(Date.UTC(2026, 3, 25))
    const b = new Date(Date.UTC(2026, 3, 25))
    expect(isSameDay(a, b)).toBe(true)
  })

  it('returns false for different day', () => {
    const a = new Date(Date.UTC(2026, 3, 25))
    const b = new Date(Date.UTC(2026, 3, 26))
    expect(isSameDay(a, b)).toBe(false)
  })

  it('returns false for different month same day', () => {
    const a = new Date(Date.UTC(2026, 3, 25))
    const b = new Date(Date.UTC(2026, 4, 25))
    expect(isSameDay(a, b)).toBe(false)
  })

  it('returns false for different year same month/day', () => {
    const a = new Date(Date.UTC(2025, 3, 25))
    const b = new Date(Date.UTC(2026, 3, 25))
    expect(isSameDay(a, b)).toBe(false)
  })

  it('is reflexive', () => {
    const a = new Date(Date.UTC(2026, 0, 1))
    expect(isSameDay(a, a)).toBe(true)
  })
})

describe('groupByYear', () => {
  it('groups dates and sorts descending by year', () => {
    const dates = [
      new Date(Date.UTC(2024, 5, 15)),
      new Date(Date.UTC(2026, 0, 25)),
      new Date(Date.UTC(2024, 0, 1)),
    ]
    const groups = groupByYear(dates)
    expect(groups.length).toBe(2)
    expect(groups[0].year).toBe(2026)
    expect(groups[1].year).toBe(2024)
    expect(groups[0].dates.length).toBe(1)
    expect(groups[1].dates.length).toBe(2)
  })

  it('returns empty array for empty input', () => {
    expect(groupByYear([])).toEqual([])
  })

  it('marks current year correctly', () => {
    const currentYear = new Date().getUTCFullYear()
    const dates = [
      new Date(Date.UTC(currentYear, 5, 15)),
      new Date(Date.UTC(currentYear - 1, 0, 1)),
    ]
    const groups = groupByYear(dates)
    const currentGroup = groups.find((g) => g.year === currentYear)
    const pastGroup = groups.find((g) => g.year === currentYear - 1)
    expect(currentGroup?.isCurrentYear).toBe(true)
    expect(pastGroup?.isCurrentYear).toBe(false)
  })

  it('marks today correctly', () => {
    const today = new Date()
    const dates = [today]
    const groups = groupByYear(dates)
    expect(groups[0].dates[0].isToday).toBe(true)
  })

  it('single year produces one group', () => {
    const dates = [
      new Date(Date.UTC(2026, 0, 1)),
      new Date(Date.UTC(2026, 5, 15)),
      new Date(Date.UTC(2026, 11, 31)),
    ]
    const groups = groupByYear(dates)
    expect(groups.length).toBe(1)
    expect(groups[0].dates.length).toBe(3)
  })
})

describe('formatting', () => {
  const sample = new Date(Date.UTC(2022, 0, 25))

  it('formatDateDM returns DD.MM', () => {
    expect(formatDateDM(sample)).toBe('25.01')
  })

  it('formatDateDM pads single digits', () => {
    const d = new Date(Date.UTC(2026, 0, 5))
    expect(formatDateDM(d)).toBe('05.01')
  })

  it('formatDateFull returns DD.MM.YYYY', () => {
    expect(formatDateFull(sample)).toBe('25.01.2022')
  })

  it('formatClipboardText includes target, range, dates, and total', () => {
    const groups = groupByYear([new Date(Date.UTC(2026, 0, 25))])
    const range = computeDefaultRange()
    const text = formatClipboardText(68, groups, range, 1)
    expect(text).toContain('Target: 68')
    expect(text).toContain('Total: 1')
    expect(text).toContain('2026: 25.01')
  })

  it('formatClipboardText with empty groups', () => {
    const range = computeDefaultRange()
    const text = formatClipboardText(99, [], range, 0)
    expect(text).toContain('Target: 99')
    expect(text).toContain('Total: 0')
    const lines = text.split('\n').filter((l) => l.trim().length > 0)
    const yearLines = lines.filter((l) => /^\d{4}:/.test(l.trim()))
    expect(yearLines.length).toBe(0)
  })
})
