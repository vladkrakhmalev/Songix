export type TCategoryName =
  | 'Избранные'
  | 'Торжественные'
  | 'Евангельские'
  | 'Благодарственные'

export interface ICategory {
  id: number
  name: TCategoryName
  active: boolean
}
