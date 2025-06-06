import { TCategoryName } from '@entities/category'
import { TONALITIES } from '../config/consts'
export interface ISongEditable {
  title: string
  text: string
  isFavorite: boolean
  categories: TCategoryName[]
  tonalities: TTonality[]
}

export interface ISong extends ISongEditable {
  id: string
  collectionId: number
}

export type TSongWithoutId = Omit<ISong, 'id'>

export type TTonality = typeof TONALITIES
