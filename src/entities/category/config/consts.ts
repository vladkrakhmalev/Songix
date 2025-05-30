import { ICategory, TCategoryName } from '../model/categoryType'

export const CATEGORIES: TCategoryName[] = [
  'Избранные',
  'Торжественные',
  'Евангельские',
  'Благодарственные',
] as const

export const CATEGORY_ITEM_LIST: ICategory[] = CATEGORIES.map(
  (category, idx) => ({
    id: idx,
    name: category,
    active: false,
  })
)
