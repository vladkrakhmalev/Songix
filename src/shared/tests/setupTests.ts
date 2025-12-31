import '@testing-library/jest-dom'
import { vi } from 'vitest'
import i18next from 'i18next'
import { testI18n } from '@infra/translations/config/testI18n'
import {
  DEFAULT_LANGUAGE,
  LANGUAGES_CODES,
  NAMESPACES,
  NAMESPACES_LIST,
} from '@infra/translations/config/translations.constants'

// Mock matchMedia for components relying on system theme detection.
if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: query.includes('prefers-color-scheme: dark') ? false : false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  })
}

// Mock clipboard API used in sharing flows.
if (!navigator.clipboard) {
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: vi.fn(),
    },
  })
}

if (!i18next.isInitialized) {
  i18next.init({
    resources: testI18n.options.resources,
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: LANGUAGES_CODES,
    defaultNS: NAMESPACES.default,
    ns: NAMESPACES_LIST,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    initImmediate: false,
  })
}
