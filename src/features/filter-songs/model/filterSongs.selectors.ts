import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@app/store/store'

export const selectFilterSongsState = (state: RootState) => state.filterSongs

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
