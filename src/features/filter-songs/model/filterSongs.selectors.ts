import { createSelector } from '@reduxjs/toolkit'
import type { AppState } from '@shared/config/redux'

export const selectFilterSongsState = (state: AppState) => state.filterSongs

export const selectCategories = createSelector(
  selectFilterSongsState,
  state => state.categories
)

export const selectActiveCategories = createSelector(
  selectCategories,
  categories => categories.filter(category => category.active)
)

export const selectSearch = createSelector(
  selectFilterSongsState,
  state => state.search
)
