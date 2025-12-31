import { LANGUAGES, NAMESPACES } from '../config/translations.constants'

export type Language = typeof LANGUAGES

export type LanguageCode = Language[keyof typeof LANGUAGES]['code']

export type Namespace = keyof typeof NAMESPACES
