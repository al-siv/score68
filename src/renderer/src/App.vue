<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, onMounted, onUnmounted } from 'vue'
import { useDateSearch } from './composables/useDateSearch'
import AppHeader from './components/AppHeader.vue'
import InfoPanel from './components/InfoPanel.vue'
import DateList from './components/DateList.vue'
import ActionBar from './components/ActionBar.vue'

const { locale } = useI18n()
const {
  target,
  groups,
  totalCount,
  rangeLabel,
  todayValue,
  clipboardText,
  setTarget,
  resetTarget,
} = useDateSearch()

const theme = ref<'light' | 'dark'>('light')

function loadTheme(): 'light' | 'dark' {
  const stored = localStorage.getItem('score68-theme')
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(t: 'light' | 'dark'): void {
  document.documentElement.setAttribute('data-theme', t)
  localStorage.setItem('score68-theme', t)
  theme.value = t
}

function toggleTheme(): void {
  applyTheme(theme.value === 'light' ? 'dark' : 'light')
}

function toggleLang(): void {
  const next = locale.value === 'en' ? 'ru' : 'en'
  locale.value = next
  localStorage.setItem('score68-lang', next)
}

const isMobile = ref(false)

function checkMobile(): void {
  isMobile.value = window.innerWidth < 480
}

onMounted(() => {
  applyTheme(loadTheme())
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <AppHeader
    :target="target"
    :theme="theme"
    :locale="(locale as string)"
    @update:target="setTarget"
    @reset-target="resetTarget"
    @toggle-theme="toggleTheme"
    @toggle-lang="toggleLang"
  />
  <InfoPanel
    :target="target"
    :today-value="todayValue"
    :range-label="rangeLabel"
    :is-mobile="isMobile"
  />
  <DateList
    :groups="groups"
    :target="target"
  />
  <ActionBar
    :total-count="totalCount"
    :clipboard-text="clipboardText"
    :is-mobile="isMobile"
  />
</template>
