/**
 * Zod schemas — runtime contracts for all external boundaries.
 *
 * Every user input, localStorage read, and IPC message must pass through
 * the corresponding schema before entering pure core logic.
 *
 */

import { z } from 'zod'

/**
 * Numerology target: integer in [0, 99].
 *
 * @example targetSchema.parse(25)   // → 25
 * @example targetSchema.parse(100)  // → throws ZodError
 * @throws {ZodError} when value is not an integer in [0, 99]
 */
export const targetSchema = z.number().int().min(0).max(99)

/**
 * Derive the TypeScript type from the Zod schema.
 */
export type Target = z.infer<typeof targetSchema>

/**
 * ISO date string in YYYY-MM-DD format.
 *
 */
export const isoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)

/**
 * Persisted app settings from localStorage.
 *
 */
export const appSettingsSchema = z.object({
  target: targetSchema,
  lang: z.enum(['en', 'ru']),
  theme: z.enum(['light', 'dark']),
})

export type AppSettings = z.infer<typeof appSettingsSchema>


