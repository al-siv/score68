/**
 * Zod schemas — runtime contracts for all external boundaries.
 *
 * Every user input, localStorage read, and IPC message must pass through
 * the corresponding schema before entering pure core logic.
 *
 * @since 2.0.0
 */

import { z } from 'zod'

/**
 * Numerology target: integer in [0, 99].
 *
 * @example targetSchema.parse(25)   // → 25
 * @example targetSchema.parse(100)  // → throws ZodError
 * @throws {ZodError} when value is not an integer in [0, 99]
 * @since 2.0.0
 */
export const targetSchema = z.number().int().min(0).max(99)

/**
 * Derive the TypeScript type from the Zod schema.
 */
export type Target = z.infer<typeof targetSchema>

/**
 * ISO date string in YYYY-MM-DD format.
 *
 * @since 2.0.0
 */
export const isoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)

/**
 * Persisted app settings from localStorage.
 *
 * @since 2.0.0
 */
export const appSettingsSchema = z.object({
  target: targetSchema,
  lang: z.enum(['en', 'ru']),
  theme: z.enum(['light', 'dark']),
})

export type AppSettings = z.infer<typeof appSettingsSchema>

/**
 * Partial settings — used when reading from localStorage (fields may be missing).
 *
 * @since 2.0.0
 */
export const partialSettingsSchema = z.object({
  target: targetSchema.optional(),
  lang: z.enum(['en', 'ru']).optional(),
  theme: z.enum(['light', 'dark']).optional(),
})

export type PartialSettings = z.infer<typeof partialSettingsSchema>
