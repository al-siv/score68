export const en = {
  app: {
    title: 'score68',
  },
  target: {
    label: 'Target',
    ariaLabel: 'Target numerology sum',
    error: 'Enter an integer from 0 to 99',
  },
  info: {
    formula: '(D + M + YY\u2081 + YY\u2082) % 100',
    today: 'Today',
    target: 'Target',
  },
  dates: {
    year: '{year}',
    yearLabel: 'Year {year}',
    today: '\u2605 Today',
    listLabel: 'Matching dates',
  },
  action: {
    copy: 'Copy dates',
    copyShort: 'Copy',
    copied: 'Copied!',
    copyFailed: 'Copy failed',
    total: 'Total: {count}',
  },
  theme: {
    light: 'Light',
    dark: 'Dark',
  },
  lang: {
    en: 'EN',
    ru: 'RU',
    switchToEn: 'Switch to English',
    switchToRu: 'Switch to Russian',
  },
  empty: {
    title: 'No matching dates',
    message: 'No dates match target {target}',
  },
}

export type MessageSchema = typeof en
