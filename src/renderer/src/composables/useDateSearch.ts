import { ref, computed, watch } from 'vue'
import {
  numerologySumOfToday,
  computeDefaultRange,
  listDatesWithSum,
  groupByYear,
  formatDateFull,
  formatClipboardText,
} from '../../../shared/core'
import { targetSchema } from '../../../shared/contracts/schemas'
import type { YearGroup, DateRange } from '../../../shared/core'

const TARGET_KEY = 'score68-target'

function loadTarget(): number {
  const stored = localStorage.getItem(TARGET_KEY)
  if (stored !== null) {
    const parsed = Number(stored)
    const result = targetSchema.safeParse(parsed)
    if (result.success) return result.data
  }
  return numerologySumOfToday()
}

function saveTarget(value: number): void {
  localStorage.setItem(TARGET_KEY, String(value))
}

export function useDateSearch() {
  const target = ref<number>(loadTarget())
  const range: DateRange = computeDefaultRange()

  const rawDates = computed(() => listDatesWithSum(target.value, range.start, range.end))

  const groups = computed<YearGroup[]>(() => groupByYear(rawDates.value))

  const totalCount = computed(() => rawDates.value.length)

  const rangeLabel = computed(() => `${formatDateFull(range.start)} — ${formatDateFull(range.end)}`)

  const todayValue = computed(() => numerologySumOfToday())

  const clipboardText = computed(() =>
    formatClipboardText(target.value, groups.value, range, totalCount.value),
  )

  watch(target, (val) => {
    const result = targetSchema.safeParse(val)
    if (result.success) {
      saveTarget(val)
    }
  })

  function setTarget(val: number): void {
    const result = targetSchema.safeParse(val)
    if (result.success) {
      target.value = val
    }
  }

  function resetTarget(): void {
    target.value = numerologySumOfToday()
  }

  return {
    target,
    groups,
    totalCount,
    rangeLabel,
    todayValue,
    clipboardText,
    setTarget,
    resetTarget,
  }
}
