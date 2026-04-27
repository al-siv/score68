import type { MessageSchema } from './en'

export const ru: MessageSchema = {
  app: {
    title: 'score68',
  },
  target: {
    label: 'Цель',
    ariaLabel: 'Целевая сумма нумерологии',
  },
  info: {
    formula: '(Д + М + YY₁ + YY₂) % 100',
    today: 'Сегодня',
    range: 'Диапазон',
  },
  dates: {
    year: '{year}',
    today: '★ Сегодня',
  },
  action: {
    copy: 'Копировать даты',
    copyShort: 'Копировать',
    copied: 'Скопировано!',
    total: 'Всего: {count}',
  },
  theme: {
    light: 'Светлая',
    dark: 'Тёмная',
  },
  lang: {
    en: 'EN',
    ru: 'RU',
  },
  empty: {
    title: 'Нет подходящих дат',
    message: 'Нет дат с суммой {target}',
  },
}
