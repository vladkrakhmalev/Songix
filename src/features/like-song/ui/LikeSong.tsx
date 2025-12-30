import { useState } from 'react'
import './LikeSong.scss'
import { ISong, songApi } from '@entities/song'
import clsx from 'clsx'
import { Icon } from '@shared/ui/icon'

interface IProps {
  song: ISong
}

export function LikeSong({ song }: IProps) {
  const [updateSong] = songApi.useUpdateSongMutation()

  const [isFavorite, setIsFavorite] = useState<boolean>(song.isFavorite)

  function handleClick() {
    setIsFavorite(!isFavorite)
    updateSong({ id: song.id, data: { isFavorite: !isFavorite } })
  }

  return (
    <Icon
      name='heart'
      style='sr'
      className={clsx('like-song', {
        _active: isFavorite,
      })}
      onClick={handleClick}
    />
  )
}
