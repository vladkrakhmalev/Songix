import { describe, expect, it } from 'vitest'
import { validateCollection } from './validateCollection'
import i18next from 'i18next'

describe('validateCollection', () => {
  it('returns error when title is empty', () => {
    expect(validateCollection('')).toBe(i18next.t('Title is required'))
  })

  it('passes when title provided', () => {
    expect(validateCollection('My collection')).toBeUndefined()
  })
})
