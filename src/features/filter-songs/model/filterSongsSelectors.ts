import { useAppSelector } from '@shared/hooks'

export const useCategoriesSelector = () =>
  useAppSelector(state => state.filterSongs.categories)

export const useActiveCategoriesSelector = () =>
  useAppSelector(state =>
    state.filterSongs.categories.filter(category => category.active)
  )

export const useSearchSelector = () =>
  useAppSelector(state => state.filterSongs.search)
