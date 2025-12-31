import { useTranslation } from 'react-i18next'
import {
  LANGUAGES_CODES,
  DEFAULT_LANGUAGE,
} from '../config/translations.constants'
import type { LanguageCode } from './types'

function normalizeLanguage(value?: string): LanguageCode {
  if (!value) return DEFAULT_LANGUAGE

  const normalized = value.split('-')[0] as LanguageCode

  if (LANGUAGES_CODES.includes(normalized)) {
    return normalized
  }

  return DEFAULT_LANGUAGE
}

export function useCurrentLanguage() {
  const { i18n } = useTranslation()

  const language = normalizeLanguage(i18n.resolvedLanguage ?? i18n.language)

  function changeLanguage(nextLanguage: LanguageCode) {
    return i18n.changeLanguage(nextLanguage)
  }

  return { language, changeLanguage }
}
