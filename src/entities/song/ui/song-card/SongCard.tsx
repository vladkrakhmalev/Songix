import { ReactNode } from 'react'
import './SongCard.scss'
import { useNavigate } from 'react-router-dom'
import type { ISong } from '@entities/song'
import { routes } from '@infra/router'

interface ISongCard {
  song: ISong
  likeSong: ReactNode
}

export function SongCard({ song, likeSong }: ISongCard) {
  const navigate = useNavigate()

  function handleRedirect() {
    navigate(routes.song(song.collectionId, song.id))
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
