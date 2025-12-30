import { describe, expect, it } from 'vitest'
import { editSongReducer, toggleEditMode } from './editSongSlice'

describe('editSongSlice', () => {
  it('toggles edit mode when no payload provided', () => {
    const state = editSongReducer(undefined, toggleEditMode())
    expect(state.isEditMode).toBe(true)
  })

  it('sets explicit edit mode when payload provided', () => {
    const state = editSongReducer({ isEditMode: true }, toggleEditMode(false))
    expect(state.isEditMode).toBe(false)
  })
})
