import { ISongEditable, songApi, SongForm } from '@entities/song'
import { useNavigate } from 'react-router-dom'
import { routes } from '@infra/router'

interface IProps {
  collectionId: string
}

export function AddSongForm({ collectionId }: IProps) {
  const navigate = useNavigate()

  const [addSong, { isLoading }] = songApi.useAddSongMutation()

  function navigateToSongs(songId: string = '') {
    navigate(routes.song(collectionId ?? ':collectionId', songId))
  }

  async function handleSubmit(form: ISongEditable) {
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
