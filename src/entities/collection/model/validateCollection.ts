import i18next from 'i18next'

export function validateCollection(name: string) {
  if (!name.length) {
    return i18next.t('Title is required')
  }
}
