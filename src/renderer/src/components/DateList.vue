<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import type { YearGroup } from '../../../shared/core'
import { formatDateDM, formatDateFull } from '../../../shared/core'

const { t } = useI18n()

defineProps<{
  groups: YearGroup[]
  target: number
}>()

const listRef = ref<HTMLElement | null>(null)

function scrollToCurrentYear(): void {
  if (!listRef.value) return
  const el = listRef.value.querySelector('[data-current-year="true"]')
  if (el) {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'center' })
  }
}

onMounted(() => nextTick(scrollToCurrentYear))

async function copyDate(date: Date): Promise<void> {
  try {
    await navigator.clipboard.writeText(formatDateFull(date))
  } catch {
    // silently ignore single-date copy errors
  }
}
</script>

<template>
  <div
    ref="listRef"
    class="date-list"
    role="list"
    :aria-label="t('dates.listLabel')"
  >
    <div
      v-for="group in groups"
      :key="group.year"
      class="date-group"
      :data-current-year="group.isCurrentYear"
      role="group"
      :aria-label="t('dates.yearLabel', { year: group.year })"
    >
      <div
        class="year-heading"
        :class="{ 'current-year': group.isCurrentYear }"
      >
        <template v-if="group.isCurrentYear">
          {{ t('dates.today') }} &mdash;
        </template>{{ group.year }}
      </div>
      <div class="chip-row">
        <button
          v-for="item in group.dates"
          :key="item.date.getTime()"
          type="button"
          class="date-chip mono"
          :class="{ today: item.isToday }"
          :aria-current="item.isToday ? 'date' : undefined"
          :title="formatDateFull(item.date)"
          @click="copyDate(item.date)"
        >
          {{ formatDateDM(item.date) }}
        </button>
      </div>
    </div>
    <div
      v-if="groups.length === 0"
      class="empty-state"
    >
      <div class="empty-icon">
        &#128269;
      </div>
      <div class="empty-title">
        {{ t('empty.title') }}
      </div>
      <div class="empty-message">
        {{ t('empty.message', { target }) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.date-list {
  flex: 1 1 0;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  -webkit-overflow-scrolling: touch;
  padding: var(--sp-3) var(--sp-4);
  scroll-behavior: smooth;
}

.date-list::-webkit-scrollbar {
  width: 6px;
}

.date-list::-webkit-scrollbar-track {
  background: transparent;
}

.date-list::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 3px;
}

.date-list::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-dim);
}

.date-group {
  margin-bottom: var(--sp-4);
  content-visibility: auto;
  contain-intrinsic-size: 0 80px;
}

.date-group + .date-group {
  padding-top: var(--sp-2);
  border-top: 1px solid var(--color-border);
}

.year-heading {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-dim);
  margin-bottom: var(--sp-2);
  letter-spacing: 0.02em;
}

.year-heading.current-year {
  color: var(--color-accent);
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-1);
}

.date-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 8px;
  font-size: 13px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background-color var(--transition-fast);
  border: 1px solid transparent;
  background: none;
  color: inherit;
  font-family: inherit;
  user-select: none;
  touch-action: manipulation;
}

.date-chip:hover {
  background: var(--color-hover);
}

.date-chip.today {
  background: var(--color-accent-bg);
  border-color: var(--color-accent);
  font-weight: 600;
}

@media (hover: none) {
  .date-chip {
    min-height: 44px;
    min-width: 44px;
  }

  .date-chip:hover {
    background: transparent;
  }

  .date-chip:active {
    background: var(--color-hover);
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 200px;
  color: var(--color-text-dim);
  gap: var(--sp-2);
  text-align: center;
}

.empty-icon {
  font-size: 40px;
  opacity: 0.5;
}

.empty-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text);
}

.empty-message {
  font-size: 13px;
}

@media (max-width: 479px) {
  .date-list {
    padding: var(--sp-2) var(--sp-3);
  }

  .date-group {
    margin-bottom: var(--sp-3);
  }
}
</style>
