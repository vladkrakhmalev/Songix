import { FC, useState } from 'react'
import './LikeSong.scss'
import { ISong, songApi } from '@entities/song'
import clsx from 'clsx'

interface IProps {
  song: ISong
}

export const LikeSong: FC<IProps> = ({ song }) => {
  const [updateSong] = songApi.useUpdateSongMutation()

  const [isFavorite, setIsFavorite] = useState<boolean>(song.isFavorite)

  const handleClick = () => {
    setIsFavorite(!isFavorite)
    updateSong({ id: song.id, data: { isFavorite: !isFavorite } })
  }

  return (
    <i
      className={clsx('like-song fi fi-sr-heart', {
        _active: isFavorite,
      })}
      onClick={handleClick}
    ></i>
  )
}
