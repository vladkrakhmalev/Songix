export interface IConcertEditable {
  name: string
  date: string
}

export const EMPTY_CONCERT: IConcertEditable = {
  name: '',
  date: '',
}

export interface IConcert extends IConcertEditable {
  id: number
}

export type IConcertBase = IConcertEditable
