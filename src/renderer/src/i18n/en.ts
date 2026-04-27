export const en = {
  app: {
    title: 'score68',
  },
  target: {
    label: 'Target',
    ariaLabel: 'Target numerology sum',
  },
  info: {
    formula: '(D + M + YY\u2081 + YY\u2082) % 100',
    today: 'Today',
    range: 'Range',
  },
  dates: {
    year: '{year}',
    today: '\u2605 Today',
  },
  action: {
    copy: 'Copy dates',
    copyShort: 'Copy',
    copied: 'Copied!',
    total: 'Total: {count}',
  },
  theme: {
    light: 'Light',
    dark: 'Dark',
  },
  lang: {
    en: 'EN',
    ru: 'RU',
  },
  empty: {
    title: 'No matching dates',
    message: 'No dates match target {target}',
  },
}

export type MessageSchema = typeof en
