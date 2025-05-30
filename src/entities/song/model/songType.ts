import { TCategoryName } from '@entities/category'
import { TONALITIES } from '../config/consts'
export interface ISongEditable {
  title: string
  body: string
  isFavorite: boolean
  categories: TCategoryName[]
}

export interface ISong extends ISongEditable {
  id: string
  collectionId: string
}

export type TSongWithoutId = Omit<ISong, 'id'>

export type TTonality = typeof TONALITIES
