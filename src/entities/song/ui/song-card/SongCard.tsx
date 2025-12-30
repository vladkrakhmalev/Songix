import { FC, ReactNode } from 'react'
import './SongCard.scss'
import { useNavigate } from 'react-router-dom'
import type { ISong } from '@entities/song'
import { routerConfig } from '@shared/config'

interface ISongCard {
  song: ISong
  likeSong: ReactNode
}

export const SongCard: FC<ISongCard> = ({ song, likeSong }) => {
  const navigate = useNavigate()

  const handleRedirect = () => {
    const link = routerConfig.song
      .replace(':collectionId', String(song.collectionId))
      .replace(':songId', String(song.id))
    navigate(link)
  }

  return (
    <div className='song-card'>
      <div onClick={handleRedirect} className='song-card__link'>
        {song.title}
      </div>

      {likeSong}
    </div>
  )
}
