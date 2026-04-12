/**
 * Pure environment variable resolver — no side-effects.
 *
 * Reads from a provided env object (not process.env directly),
 * making the logic testable and deterministic.
 *
 * Precedence: explicit CLI params always win;
 * env vars fill only when CLI left default values.
 *
 * Supported variables:
 *   SCORE68_TARGET  — numeric target
 *   SCORE68_RANGE   — YYYY-MM-DD:YYYY-MM-DD
 *   SCORE68_YEARS   — last N years (RANGE wins if both set)
 */

import { TARGET_SUM } from './dates68.js';

/**
 * Apply environment overrides to a parsed CLI config.
 * @param {Record<string, string | undefined>} env
 * @param {{ target: number, start: Date, end: Date, rangeProvided: boolean }} config
 * @returns {{ target: number, start: Date, end: Date }}
 */
export function resolveEnv(env, config) {
  let { target, start, end } = config;

  if (env.SCORE68_TARGET && config.target === TARGET_SUM) {
    const t = Number(env.SCORE68_TARGET);
    if (Number.isFinite(t) && Number.isInteger(t) && t >= 0) target = t;
  }

  if (config.rangeProvided) return { target, start, end };

  const range = parseRange(env.SCORE68_RANGE);
  const years = parseYears(env.SCORE68_YEARS);

  // RANGE takes priority over YEARS when both are set
  if (range) {
    ({ start, end } = range);
  } else if (years) {
    ({ start, end } = years);
  }

  return { target, start, end };
}

/** @returns {{ start: Date, end: Date } | null} */
function parseRange(value) {
  if (!value) return null;
  const [s, e] = value.split(':');
  const start = new Date(s);
  const end = new Date(e);
  return !isNaN(start) && !isNaN(end) && start <= end ? { start, end } : null;
}

/** @returns {{ start: Date, end: Date } | null} */
function parseYears(value) {
  if (!value) return null;
  const n = Number(value);
  if (!Number.isFinite(n) || !Number.isInteger(n) || n <= 0) return null;
  const currentYear = new Date().getFullYear();
  return {
    start: new Date(Date.UTC(currentYear - n + 1, 0, 1)),
    end: new Date(Date.UTC(currentYear, 11, 31)),
  };
}
