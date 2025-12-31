import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'
import YAML from 'yaml'
import {
  LANGUAGES_CODES,
  DEFAULT_LANGUAGE,
  NAMESPACES,
  NAMESPACES_LIST,
} from './translations.constants'

const htmlTag =
  typeof document === 'undefined' ? undefined : document.documentElement

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: LANGUAGES_CODES,
    fallbackLng: DEFAULT_LANGUAGE,
    nonExplicitSupportedLngs: true,
    defaultNS: NAMESPACES.default,
    ns: NAMESPACES_LIST,
    load: 'languageOnly',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      htmlTag,
    },
    backend: {
      loadPath: '/translations/{{lng}}/{{ns}}.yaml',
      parse: (data: string) => YAML.parse(data) ?? {},
    },
    react: {
      useSuspense: true,
    },
    debug: false,
  })

export { i18n }
