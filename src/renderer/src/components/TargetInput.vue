<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  modelValue: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
  reset: []
}>()

const inputValue = ref(String(props.modelValue))
const isInvalid = ref(false)
const errorFlash = ref(false)
let errorTimer: ReturnType<typeof setTimeout> | undefined

watch(
  () => props.modelValue,
  (val) => {
    inputValue.value = String(val)
    isInvalid.value = false
  },
)

function handleInput(e: Event): void {
  const el = e.target as HTMLInputElement
  inputValue.value = el.value
}

function showError(): void {
  isInvalid.value = true
  errorFlash.value = true
  clearTimeout(errorTimer)
  errorTimer = setTimeout(() => {
    errorFlash.value = false
  }, 200)
}

function commitValue(): void {
  const raw = inputValue.value.trim()

  if (raw === '') {
    showError()
    inputValue.value = String(props.modelValue)
    return
  }

  const parsed = Number(raw)

  if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) {
    showError()
    inputValue.value = String(props.modelValue)
    return
  }

  if (parsed < 0 || parsed > 99) {
    showError()
    const clamped = Math.max(0, Math.min(99, parsed))
    inputValue.value = String(clamped)
    emit('update:modelValue', clamped)
    return
  }

  isInvalid.value = false
  emit('update:modelValue', parsed)
}

function handleKeydown(e: KeyboardEvent): void {
  if (e.key === 'Enter') {
    ;(e.target as HTMLInputElement).blur()
  }
}
</script>

<template>
  <input
    id="target-input"
    type="number"
    class="target-input"
    :class="{ 'error-flash': errorFlash }"
    :value="inputValue"
    :aria-label="t('target.ariaLabel')"
    :aria-invalid="isInvalid"
    aria-describedby="target-error"
    min="0"
    max="99"
    inputmode="numeric"
    @input="handleInput"
    @blur="commitValue"
    @keydown="handleKeydown"
  >
  <span
    id="target-error"
    class="visually-hidden"
    aria-live="polite"
  >{{ isInvalid ? t('target.error') : '' }}</span>
</template>

<style scoped>
.target-input {
  width: 64px;
  padding: var(--sp-1) var(--sp-2);
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  color: var(--color-text);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  outline: none;
  transition: border-color var(--transition-fast), background-color var(--transition-fast);
  -moz-appearance: textfield;
}

.target-input::-webkit-inner-spin-button,
.target-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.target-input:focus-visible {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-accent) 30%, transparent);
}

.target-input.error-flash {
  border-color: var(--color-error);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-error) 20%, transparent);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 479px) {
  .target-input {
    width: 50px;
    font-size: 16px;
  }
}
</style>
