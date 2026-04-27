<script setup lang="ts">
defineProps<{
  locale: string
}>()

const emit = defineEmits<{
  toggle: []
}>()
</script>

<template>
  <button
    class="lang-toggle"
    @click="emit('toggle')"
  >
    {{ locale === 'en' ? 'EN' : 'РУ' }}
  </button>
</template>

<style scoped>
.lang-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 32px;
  padding: 0 var(--sp-2);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-text-dim);
  background: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: color var(--transition-fast), background-color var(--transition-fast),
    border-color var(--transition-fast);
}

.lang-toggle:hover {
  background: var(--color-hover);
  color: var(--color-text);
  border-color: transparent;
}

@media (hover: none) {
  .lang-toggle {
    min-width: 40px;
    height: 40px;
    font-size: 12px;
  }
}
</style>
