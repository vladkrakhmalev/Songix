import { ISongEditable } from '../model/songType'

export interface IUpdateSongRequest {
  id: string
  data: Partial<ISongEditable>
}
