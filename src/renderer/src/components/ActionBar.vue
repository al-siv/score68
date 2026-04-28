<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  totalCount: number
  clipboardText: string
  isMobile: boolean
}>()

const copied = ref(false)
const copyError = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

async function copyToClipboard(): Promise<void> {
  if (copied.value || copyError.value) return
  try {
    await navigator.clipboard.writeText(props.clipboardText)
    copied.value = true
    copyError.value = false
    clearTimeout(timer)
    timer = setTimeout(() => {
      copied.value = false
    }, 1500)
  } catch (err) {
    console.error('[clipboard] Failed to copy to clipboard:', err)
    copied.value = false
    copyError.value = true
    clearTimeout(timer)
    timer = setTimeout(() => {
      copyError.value = false
    }, 2000)
  }
}
</script>

<template>
  <div class="action-bar">
    <button
      type="button"
      class="copy-btn"
      :class="{ copied, error: copyError }"
      :aria-label="t('action.copy')"
      @click="copyToClipboard"
    >
      <span class="copy-icon">{{ copied ? '&#10003;' : copyError ? '&#10007;' : '&#128203;' }}</span>
      <span aria-live="polite">{{ copied ? t('action.copied') : copyError ? t('action.copyFailed') : isMobile ? t('action.copyShort') : t('action.copy') }}</span>
    </button>
    <span class="total-count">{{ isMobile ? totalCount : t('action.total', { count: totalCount }) }}</span>
  </div>
</template>

<style scoped>
.action-bar {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 0 var(--sp-4);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.03);
  transition: background-color var(--transition-normal), border-color var(--transition-normal);
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-1);
  padding: var(--sp-2) var(--sp-4);
  font-size: 13px;
  font-weight: 500;
  color: #ffffff;
  background: var(--color-copy-bg);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background-color var(--transition-fast), transform var(--transition-fast);
}

.copy-btn:hover {
  background: var(--color-copy-hover);
}

.copy-btn:active {
  transform: scale(0.97);
}

.copy-btn.copied {
  background: var(--color-accent);
}

.copy-btn.error {
  background: var(--color-error);
}

.copy-icon {
  font-size: 14px;
}

.total-count {
  font-size: 12px;
  color: var(--color-text-dim);
  font-variant-numeric: tabular-nums;
}

@media (max-width: 479px) {
  .action-bar {
    padding: 0 var(--sp-3);
    height: 56px;
  }

  .copy-btn {
    min-height: 40px;
    min-width: 40px;
  }
}
</style>
