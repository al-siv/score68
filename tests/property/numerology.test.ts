import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { numerologySum, isSameDay, formatDateDM, formatDateFull } from '../../src/shared/core/dates68'

describe('numerologySum (property-based)', () => {
  it('equals (d + m + ⌊Y/100⌋ + Y%100) % 100 for any date in 1800–2100', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date('1800-01-01T00:00:00Z'), max: new Date('2100-12-31T00:00:00Z') }),
        (d) => {
          const day = d.getUTCDate()
          const month = d.getUTCMonth() + 1
          const year = d.getUTCFullYear()
          const expected = (day + month + Math.floor(year / 100) + (year % 100)) % 100
          expect(numerologySum(d)).toBe(expected)
        },
      ),
    )
  })

  it('always returns value in [0, 99]', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date('0001-01-01T00:00:00Z'), max: new Date('9999-12-31T00:00:00Z') }),
        (d) => {
          const result = numerologySum(d)
          expect(result).toBeGreaterThanOrEqual(0)
          expect(result).toBeLessThanOrEqual(99)
        },
      ),
    )
  })

  it('is deterministic: same date always yields same result', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date('1900-01-01T00:00:00Z'), max: new Date('2100-12-31T00:00:00Z') }),
        (d) => {
          expect(numerologySum(d)).toBe(numerologySum(d))
        },
      ),
    )
  })

  it('is symmetric: numerologySum(d) = numerologySum(copy of d)', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date('1900-01-01T00:00:00Z'), max: new Date('2100-12-31T00:00:00Z') }),
        (d) => {
          const copy = new Date(d.getTime())
          expect(numerologySum(d)).toBe(numerologySum(copy))
        },
      ),
    )
  })
})

describe('isSameDay (property-based)', () => {
  it('is reflexive: isSameDay(d, d) === true for valid dates', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date('1900-01-01T00:00:00Z'), max: new Date('2100-12-31T00:00:00Z') }),
        (d) => {
          if (isNaN(d.getTime())) return
          expect(isSameDay(d, d)).toBe(true)
        },
      ),
    )
  })

  it('is symmetric: isSameDay(a, b) === isSameDay(b, a)', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date('1900-01-01T00:00:00Z'), max: new Date('2100-12-31T00:00:00Z') }),
        fc.date({ min: new Date('1900-01-01T00:00:00Z'), max: new Date('2100-12-31T00:00:00Z') }),
        (a, b) => {
          if (isNaN(a.getTime()) || isNaN(b.getTime())) return
          expect(isSameDay(a, b)).toBe(isSameDay(b, a))
        },
      ),
    )
  })
})

describe('formatDateDM (property-based)', () => {
  it('always produces DD.MM format', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date('1900-01-01T00:00:00Z'), max: new Date('2100-12-31T00:00:00Z') }),
        (d) => {
          if (isNaN(d.getTime())) return
          const formatted = formatDateDM(d)
          expect(formatted).toMatch(/^\d{2}\.\d{2}$/)
          const [dd, mm] = formatted.split('.').map(Number)
          expect(dd).toBe(d.getUTCDate())
          expect(mm).toBe(d.getUTCMonth() + 1)
        },
      ),
    )
  })
})

describe('formatDateFull (property-based)', () => {
  it('always produces DD.MM.YYYY format', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date('1900-01-01T00:00:00Z'), max: new Date('2100-12-31T00:00:00Z') }),
        (d) => {
          if (isNaN(d.getTime())) return
          const formatted = formatDateFull(d)
          expect(formatted).toMatch(/^\d{2}\.\d{2}\.\d{4}$/)
        },
      ),
    )
  })
})
