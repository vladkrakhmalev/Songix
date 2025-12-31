import { createSelector } from '@reduxjs/toolkit'
import type { AppState } from '@shared/config/redux'

export const selectConfigurateSongsState = (state: AppState) =>
  state.configurateSongs

export const selectSpeed = createSelector(
  selectConfigurateSongsState,
  state => state.speed
)

export const selectTextSize = createSelector(
  selectConfigurateSongsState,
  state => state.textSize
)

export const selectTonality = createSelector(
  selectConfigurateSongsState,
  state => state.tonality
)
