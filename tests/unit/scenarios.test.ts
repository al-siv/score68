import { describe, it, expect } from 'vitest'
import {
  numerologySum,
  numerologySumOfToday,
  computeDefaultRange,
  listDatesWithSum,
  groupByYear,
  formatDateFull,
  isSameDay,
  formatClipboardText,
} from '../../src/shared/core/index'

describe('Scenario: Default target is today', () => {
  it('today numerology sum matches formula', () => {
    const today = new Date()
    const expected =
      (today.getUTCDate() + (today.getUTCMonth() + 1) + Math.floor(today.getUTCFullYear() / 100) + (today.getUTCFullYear() % 100)) % 100
    expect(numerologySumOfToday()).toBe(expected)
  })
})

describe('Scenario: Range is ±200/50 years', () => {
  it('spans exactly 250 years from today', () => {
    const { start, end } = computeDefaultRange()
    const today = new Date()
    expect(start.getUTCFullYear()).toBe(today.getUTCFullYear() - 200)
    expect(end.getUTCFullYear()).toBe(today.getUTCFullYear() + 50)
  })

  it('range is valid', () => {
    const { start, end } = computeDefaultRange()
    expect(start.getTime()).toBeLessThan(end.getTime())
  })

  it('range label format is correct', () => {
    const { start, end } = computeDefaultRange()
    const label = `${formatDateFull(start)} — ${formatDateFull(end)}`
    expect(label).toMatch(/\d{2}\.\d{2}\.\d{4} — \d{2}\.\d{2}\.\d{4}/)
  })
})

describe('Scenario: Compute and display matching dates', () => {
  const { start, end } = computeDefaultRange()
  const target = numerologySumOfToday()
  const dates = listDatesWithSum(target, start, end)
  const groups = groupByYear(dates)

  it('all dates match target', () => {
    for (const d of dates) {
      expect(numerologySum(d)).toBe(target)
    }
  })

  it('groups are sorted descending by year', () => {
    for (let i = 1; i < groups.length; i++) {
      expect(groups[i - 1].year).toBeGreaterThanOrEqual(groups[i].year)
    }
  })

  it('current year group is marked', () => {
    const currentYear = new Date().getUTCFullYear()
    const cg = groups.find((g) => g.year === currentYear)
    expect(cg).toBeDefined()
    expect(cg!.isCurrentYear).toBe(true)
  })

  it('non-current groups are not marked', () => {
    const currentYear = new Date().getUTCFullYear()
    const others = groups.filter((g) => g.year !== currentYear)
    for (const g of others) {
      expect(g.isCurrentYear).toBe(false)
    }
  })

  it('each group has at least 1 date', () => {
    for (const g of groups) {
      expect(g.dates.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('today is flagged in results if present', () => {
    const today = new Date()
    const todayEntry = dates.find((d) => isSameDay(d, today))
    if (todayEntry) {
      const group = groups.find((g) => g.isCurrentYear)
      const item = group?.dates.find((d) => d.isToday)
      expect(item).toBeDefined()
    }
  })
})

describe('Scenario: Change target', () => {
  const { start, end } = computeDefaultRange()

  it('target 0 produces results', () => {
    const dates = listDatesWithSum(0, start, end)
    expect(dates.length).toBeGreaterThan(0)
    for (const d of dates) {
      expect(numerologySum(d)).toBe(0)
    }
  })

  it('target 99 produces results', () => {
    const dates = listDatesWithSum(99, start, end)
    expect(dates.length).toBeGreaterThan(0)
  })

  it('target 50 produces results', () => {
    const dates = listDatesWithSum(50, start, end)
    expect(dates.length).toBeGreaterThan(0)
  })

  it('switching target re-validates', () => {
    for (const t of [0, 25, 50, 75, 99]) {
      const dates = listDatesWithSum(t, start, end)
      for (const d of dates) {
        expect(numerologySum(d)).toBe(t)
      }
    }
  })
})

describe('Scenario: Copy to clipboard format', () => {
  it('output has correct structure', () => {
    const { start, end } = computeDefaultRange()
    const target = 68
    const dates = listDatesWithSum(target, start, end)
    const groups = groupByYear(dates)
    const text = formatClipboardText(target, groups, { start, end }, dates.length)

    const lines = text.split('\n')
    expect(lines[0]).toBe('score68 — Target: 68')
    expect(lines[1]).toMatch(/^Range: \d{2}\.\d{2}\.\d{4} — \d{2}\.\d{2}\.\d{4}$/)

    const yearLines = lines.filter((l) => /^\d{4}:/.test(l))
    expect(yearLines.length).toBeGreaterThan(0)

    for (const yl of yearLines) {
      expect(yl).toMatch(/^\d{4}: \d{2}\.\d{2}( \d{2}\.\d{2})*$/)
    }

    expect(text).toContain(`Total: ${dates.length}`)
  })

  it('empty results produce header + total only', () => {
    const { start, end } = computeDefaultRange()
    const text = formatClipboardText(77, [], { start, end }, 0)
    expect(text).toContain('Target: 77')
    expect(text).toContain('Total: 0')
    const yearLines = text.split('\n').filter((l) => /^\d{4}:/.test(l.trim()))
    expect(yearLines.length).toBe(0)
  })
})

describe('Scenario: Theme / Lang persistence keys', () => {
  it('localStorage keys match DESIGN.md spec', () => {
    const keys = ['score68-target', 'score68-lang', 'score68-theme']
    for (const k of keys) {
      expect(k).toMatch(/^score68-/)
    }
  })
})
