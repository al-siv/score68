<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  todayValue: number
  rangeLabel: string
  isMobile: boolean
}>()
</script>

<template>
  <div class="info-panel">
    <template v-if="!isMobile">
      <span class="info-segment mono">{{ t('info.formula') }}</span>
      <span class="info-dot">&bull;</span>
    </template>
    <span class="info-segment">
      {{ t('info.today') }}: <strong>{{ todayValue }}</strong>
    </span>
    <span class="info-dot">&bull;</span>
    <span class="info-segment">{{ rangeLabel }}</span>
  </div>
</template>

<style scoped>
.info-panel {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-2) var(--sp-4);
  font-size: 12px;
  color: var(--color-text-dim);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  transition: background-color var(--transition-normal), border-color var(--transition-normal);
}

.info-segment strong {
  color: var(--color-text);
  font-weight: 600;
}

.info-dot {
  opacity: 0.4;
  font-size: 10px;
}

@media (max-width: 479px) {
  .info-panel {
    padding: var(--sp-1) var(--sp-3);
    font-size: 11px;
    gap: var(--sp-1);
  }
}
</style>
