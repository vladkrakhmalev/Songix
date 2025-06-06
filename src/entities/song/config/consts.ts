import { ISongEditable } from '@entities/song'

export const EMPTY_SONG_OBJ: ISongEditable = {
  title: '',
  text: '',
  tonalities: [],
  isFavorite: false,
  categories: [],
}

export type TTonality =
  | 'C'
  | 'C+'
  | 'D'
  | 'D+'
  | 'E'
  | 'F'
  | 'F+'
  | 'G'
  | 'G+'
  | 'A'
  | 'A+'
  | 'B'

export const TONALITIES = [
  'C',
  'C+',
  'D',
  'D+',
  'E',
  'F',
  'F+',
  'G',
  'G+',
  'A',
  'A+',
  'B',
]
