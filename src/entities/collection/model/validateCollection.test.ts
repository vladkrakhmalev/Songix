import { describe, expect, it } from 'vitest'
import { validateCollection } from './validateCollection'

describe('validateCollection', () => {
  it('returns error when title is empty', () => {
    expect(validateCollection('')).toBe('Название должно быть заполнено')
  })

  it('passes when title provided', () => {
    expect(validateCollection('My collection')).toBeUndefined()
  })
})
