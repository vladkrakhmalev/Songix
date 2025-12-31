import fs from 'node:fs'
import path from 'node:path'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import YAML from 'yaml'
import {
  DEFAULT_LANGUAGE,
  LANGUAGES_CODES,
  NAMESPACES,
  NAMESPACES_LIST,
} from './translations.constants'
import type { LanguageCode, Namespace } from '../model/types'

type TranslationResources = Record<string, string>

type Resources = Record<LanguageCode, Record<Namespace, TranslationResources>>

function loadNamespace(lang: LanguageCode, namespace: Namespace) {
  const filePath = path.resolve(
    process.cwd(),
    'public',
    'translations',
    lang,
    `${namespace}.yaml`
  )

  const content = fs.readFileSync(filePath, 'utf-8')

  return (YAML.parse(content) ?? {}) as TranslationResources
}

const resources = LANGUAGES_CODES.reduce<Resources>((acc, lang) => {
  acc[lang] = NAMESPACES_LIST.reduce(
    (nsAcc, namespace) => {
      nsAcc[namespace] = loadNamespace(lang, namespace)
      return nsAcc
    },
    {} as Record<Namespace, TranslationResources>
  )
  return acc
}, {} as Resources)

export const testI18n = i18next.createInstance()

testI18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: LANGUAGES_CODES,
  defaultNS: NAMESPACES.default,
  ns: NAMESPACES_LIST,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  initImmediate: false,
})
