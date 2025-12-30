import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@app/store/store'

export const selectConfigurateSongsState = (state: RootState) =>
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
