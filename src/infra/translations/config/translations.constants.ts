export const LANGUAGES = {
  ru: {
    code: 'ru',
    labelKey: 'Russian',
  },
  en: {
    code: 'en',
    labelKey: 'English',
  },
} as const

export const LANGUAGES_CODES = Object.values(LANGUAGES).map(
  language => language.code
)

export const DEFAULT_LANGUAGE = LANGUAGES.ru.code

export const NAMESPACES = {
  default: 'default',
  auth: 'auth',
} as const

export const NAMESPACES_LIST = Object.values(NAMESPACES)
