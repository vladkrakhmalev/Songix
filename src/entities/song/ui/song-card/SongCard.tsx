import { FC, ReactNode } from 'react'
import './SongCard.scss'
import { useNavigate } from 'react-router-dom'
import type { ISong } from '@entities/song'
import { routerConfig } from '@shared/config/routerConfig'

interface ISongCard {
  song: ISong
  likeSong: ReactNode
}

export const SongCard: FC<ISongCard> = ({ song, likeSong }) => {
  const navigate = useNavigate()

  const handleRedirect = () => {
    const link = routerConfig.collectionSong
      .replace(':collectionId', song.collectionId.toString())
      .replace(':songId', song.id.toString())
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
