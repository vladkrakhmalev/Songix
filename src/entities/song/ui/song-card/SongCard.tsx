import { FC, ReactNode } from 'react'
import './SongCard.scss'
import { useNavigate } from 'react-router-dom'
import type { ISong } from '@entities/song'

interface ISongCard {
  song: ISong
  likeSong: ReactNode
}

export const SongCard: FC<ISongCard> = ({ song, likeSong }) => {
  const navigate = useNavigate()

  const handleRedirect = () => {
    const link = `/collections/${song.collectionId}/songs/${song.id}`
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
