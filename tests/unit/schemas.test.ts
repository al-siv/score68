import { describe, it, expect } from 'vitest'
import {
  targetSchema,
  isoDateSchema,
  appSettingsSchema,
  partialSettingsSchema,
} from '../../src/shared/contracts/schemas'

describe('targetSchema', () => {
  it('accepts valid targets', () => {
    expect(targetSchema.parse(0)).toBe(0)
    expect(targetSchema.parse(50)).toBe(50)
    expect(targetSchema.parse(99)).toBe(99)
  })

  it('rejects values outside [0, 99]', () => {
    expect(() => targetSchema.parse(-1)).toThrow()
    expect(() => targetSchema.parse(100)).toThrow()
    expect(() => targetSchema.parse(999)).toThrow()
  })

  it('rejects non-integers', () => {
    expect(() => targetSchema.parse(1.5)).toThrow()
    expect(() => targetSchema.parse(NaN)).toThrow()
    expect(() => targetSchema.parse(Infinity)).toThrow()
    expect(() => targetSchema.parse(-Infinity)).toThrow()
  })

  it('rejects non-numbers', () => {
    expect(() => targetSchema.parse('68')).toThrow()
    expect(() => targetSchema.parse(null)).toThrow()
    expect(() => targetSchema.parse(undefined)).toThrow()
    expect(() => targetSchema.parse({})).toThrow()
  })

  it('safeParse returns success for valid input', () => {
    const result = targetSchema.safeParse(42)
    expect(result.success).toBe(true)
  })

  it('safeParse returns failure for invalid input', () => {
    const result = targetSchema.safeParse(200)
    expect(result.success).toBe(false)
  })
})

describe('isoDateSchema', () => {
  it('accepts valid YYYY-MM-DD', () => {
    expect(isoDateSchema.parse('2026-04-25')).toBe('2026-04-25')
    expect(isoDateSchema.parse('1900-01-01')).toBe('1900-01-01')
    expect(isoDateSchema.parse('2100-12-31')).toBe('2100-12-31')
  })

  it('rejects invalid formats', () => {
    expect(() => isoDateSchema.parse('25-04-2026')).toThrow()
    expect(() => isoDateSchema.parse('not-a-date')).toThrow()
    expect(() => isoDateSchema.parse('2026/04/25')).toThrow()
    expect(() => isoDateSchema.parse('')).toThrow()
    expect(() => isoDateSchema.parse('2026-4-5')).toThrow()
  })
})

describe('appSettingsSchema', () => {
  it('accepts valid settings', () => {
    const result = appSettingsSchema.parse({ target: 25, lang: 'en', theme: 'light' })
    expect(result.target).toBe(25)
    expect(result.lang).toBe('en')
    expect(result.theme).toBe('light')
  })

  it('accepts all valid combinations', () => {
    expect(() => appSettingsSchema.parse({ target: 0, lang: 'en', theme: 'dark' })).not.toThrow()
    expect(() => appSettingsSchema.parse({ target: 99, lang: 'ru', theme: 'light' })).not.toThrow()
  })

  it('rejects invalid target in settings', () => {
    expect(() => appSettingsSchema.parse({ target: -1, lang: 'en', theme: 'light' })).toThrow()
    expect(() => appSettingsSchema.parse({ target: 100, lang: 'en', theme: 'light' })).toThrow()
  })

  it('rejects invalid lang', () => {
    expect(() => appSettingsSchema.parse({ target: 25, lang: 'de', theme: 'light' })).toThrow()
    expect(() => appSettingsSchema.parse({ target: 25, lang: 'FR', theme: 'light' })).toThrow()
  })

  it('rejects invalid theme', () => {
    expect(() => appSettingsSchema.parse({ target: 25, lang: 'en', theme: 'blue' })).toThrow()
  })

  it('rejects missing fields', () => {
    expect(() => appSettingsSchema.parse({ target: 25, lang: 'en' })).toThrow()
    expect(() => appSettingsSchema.parse({})).toThrow()
  })
})

describe('partialSettingsSchema', () => {
  it('accepts empty object', () => {
    const result = partialSettingsSchema.parse({})
    expect(result.target).toBeUndefined()
    expect(result.lang).toBeUndefined()
    expect(result.theme).toBeUndefined()
  })

  it('accepts partial settings', () => {
    const result = partialSettingsSchema.parse({ target: 42 })
    expect(result.target).toBe(42)
    expect(result.lang).toBeUndefined()
    expect(result.theme).toBeUndefined()
  })

  it('accepts full settings', () => {
    const result = partialSettingsSchema.parse({ target: 0, lang: 'ru', theme: 'dark' })
    expect(result.target).toBe(0)
    expect(result.lang).toBe('ru')
    expect(result.theme).toBe('dark')
  })

  it('rejects invalid values even in partial', () => {
    expect(() => partialSettingsSchema.parse({ target: -1 })).toThrow()
    expect(() => partialSettingsSchema.parse({ lang: 'xx' })).toThrow()
    expect(() => partialSettingsSchema.parse({ theme: 'auto' })).toThrow()
  })

  it('ignores unknown keys (strip by default)', () => {
    const result = partialSettingsSchema.parse({ unknown: 'value' })
    expect((result as Record<string, unknown>)['unknown']).toBeUndefined()
  })
})
