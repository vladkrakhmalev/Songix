import { FC, ReactNode } from 'react'
import './SongContent.scss'
import { ISong } from '@entities/song'
import { ICounterItem } from '@shared/ui/counter'

interface ISongProps {
  song: ISong
  textSize: ICounterItem
  configurate: ReactNode
  actionButtons: ReactNode
}

export const SongContent: FC<ISongProps> = props => {
  const { song, configurate, textSize, actionButtons } = props

  return (
    <div className='song-content'>
      <div className='song-content__header'>
        <div>
          <h1 className='song-content__title'>{song?.title}</h1>
        </div>

        {configurate}
      </div>
      <p
        className='song-content__text'
        style={{ fontSize: textSize.value + 'px' }}
      >
        {song?.text}
      </p>

      {actionButtons}
    </div>
  )
}
