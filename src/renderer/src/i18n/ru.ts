import type { MessageSchema } from './en'

export const ru: MessageSchema = {
  app: {
    title: 'score68',
  },
  target: {
    label: 'Цель',
    ariaLabel: 'Целевая сумма нумерологии',
    error: 'Введите целое число от 0 до 99',
  },
  info: {
    formula: '(Д + М + YY₁ + YY₂) % 100',
    today: 'Сегодня',
    target: 'Цель',
  },
  dates: {
    year: '{year}',
    yearLabel: '{year} год',
    today: '★ Сегодня',
    listLabel: 'Подходящие даты',
  },
  action: {
    copy: 'Копировать даты',
    copyShort: 'Копировать',
    copied: 'Скопировано!',
    copyFailed: 'Не удалось скопировать',
    total: 'Всего: {count}',
  },
  theme: {
    light: 'Светлая',
    dark: 'Тёмная',
  },
  lang: {
    en: 'EN',
    ru: 'RU',
    switchToEn: 'Switch to English',
    switchToRu: 'Переключить на русский',
  },
  empty: {
    title: 'Нет подходящих дат',
    message: 'Нет дат с суммой {target}',
  },
}
