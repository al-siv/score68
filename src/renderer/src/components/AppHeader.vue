<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import TargetInput from './TargetInput.vue'
import ThemeToggle from './ThemeToggle.vue'
import LangToggle from './LangToggle.vue'

const { t } = useI18n()

defineProps<{
  target: number
  theme: 'light' | 'dark'
  locale: string
}>()

const emit = defineEmits<{
  'update:target': [value: number]
  'reset-target': []
  'toggle-theme': []
  'toggle-lang': []
}>()
</script>

<template>
  <header class="app-header">
    <span class="app-title">{{ t('app.title') }}</span>
    <div class="target-wrap">
      <span class="target-label">{{ t('target.label') }}</span>
      <TargetInput
        :model-value="target"
        @update:model-value="emit('update:target', $event)"
        @reset="emit('reset-target')"
      />
    </div>
    <div class="header-controls">
      <LangToggle
        :locale="locale"
        @toggle="emit('toggle-lang')"
      />
      <ThemeToggle
        :theme="theme"
        @toggle="emit('toggle-theme')"
      />
    </div>
  </header>
</template>

<style scoped>
.app-header {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 0 var(--sp-4);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  transition: background-color var(--transition-normal), border-color var(--transition-normal);
}

.app-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
  user-select: none;
  letter-spacing: -0.01em;
}

.target-wrap {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
}

.target-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--color-text-dim);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  user-select: none;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
}

@media (max-width: 479px) {
  .app-header {
    padding: 0 var(--sp-3);
    height: 48px;
  }

  .target-label {
    display: none;
  }
}
</style>
