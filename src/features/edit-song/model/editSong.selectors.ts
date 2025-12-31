import { createSelector } from '@reduxjs/toolkit'
import type { AppState } from '@shared/config/redux'

export const selectEditSongState = (state: AppState) => state.editSong

export const selectIsEditMode = createSelector(
  selectEditSongState,
  state => state.isEditMode
)
