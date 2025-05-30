import { FC, ReactNode } from 'react'
import './SongContent.scss'
import { ISong } from '@entities/song'
import { Spinner } from '@shared/ui/spinner'
import { ICounterItem } from '@shared/ui/counter'

interface ISongProps {
  song: ISong | undefined
  isFetching: boolean
  configurate: ReactNode
  textSize: ICounterItem
  actionButtons: ReactNode
  toggleLayout?: ReactNode
}

export const SongContent: FC<ISongProps> = props => {
  const {
    song,
    isFetching,
    configurate,
    textSize,
    actionButtons,
    toggleLayout,
  } = props

  if (!song || isFetching) return <Spinner />

  return (
    <div className='song-content'>
      <div className='song-content__header'>
        {toggleLayout}
        <h1 className='song-content__title'>{song.title}</h1>
        {configurate}
      </div>
      <p
        className='song-content__text'
        style={{ fontSize: textSize.value + 'px' }}
      >
        {song.body}
      </p>

      {actionButtons}
    </div>
  )
}
