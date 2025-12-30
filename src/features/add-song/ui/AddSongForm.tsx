import { ISongEditable, songApi, SongForm } from '@entities/song'
import { useNavigate } from 'react-router-dom'
import { routerConfig } from '@shared/config'
import { FC } from 'react'

interface IProps {
  collectionId: string
}

export const AddSongForm: FC<IProps> = ({ collectionId }) => {
  const navigate = useNavigate()

  const [addSong, { isLoading }] = songApi.useAddSongMutation()

  const navigateToSongs = (songId: string = '') => {
    navigate(
      routerConfig.song
        .replace(':collectionId', collectionId ?? '')
        .replace(':songId', songId)
    )
  }

  const handleSubmit = async (form: ISongEditable) => {
    try {
      const newSong = { ...form, collectionId: Number(collectionId) }
      const response = await addSong(newSong)
      if (response.data) navigateToSongs(response.data.id)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SongForm
      title='Добавить песню'
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onCancel={() => navigateToSongs()}
    />
  )
}
