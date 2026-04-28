/**
 * i18n setup — vue-i18n with Russian and English.
 */

import { createI18n } from 'vue-i18n'
import { en } from './en'
import { ru } from './ru'

const STORAGE_KEY = 'score68-lang'

function detectLocale(): 'en' | 'ru' {
  try {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'ru' || stored === 'en') return stored
    }
  } catch (err) {
    console.error('[storage] Failed to load locale:', err)
  }
  const nav = navigator.language.toLowerCase()
  return nav.startsWith('ru') ? 'ru' : 'en'
}

export function initI18n() {
  const i18n = createI18n({
    legacy: false,
    locale: detectLocale(),
    fallbackLocale: 'en',
    messages: { en, ru },
  })

  return i18n
}

export { STORAGE_KEY as LANG_STORAGE_KEY }
