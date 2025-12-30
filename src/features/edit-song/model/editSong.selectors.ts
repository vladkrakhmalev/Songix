import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@app/store/store'

export const selectEditSongState = (state: RootState) => state.editSong

export const selectIsEditMode = createSelector(
  selectEditSongState,
  state => state.isEditMode
)
