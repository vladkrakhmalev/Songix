import { useAppSelector } from '@shared/hooks'

export function useCategoriesSelector() {
  return useAppSelector(state => state.filterSongs.categories)
}

export function useActiveCategoriesSelector() {
  return useAppSelector(state =>
    state.filterSongs.categories.filter(category => category.active)
  )
}

export function useSearchSelector() {
  return useAppSelector(state => state.filterSongs.search)
}
