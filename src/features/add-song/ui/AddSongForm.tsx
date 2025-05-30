import { ISongEditable, songApi, SongForm } from '@entities/song'
import { useNavigate, useParams } from 'react-router-dom'

export const AddSongForm = () => {
  const navigate = useNavigate()
  // TODO Придумать более безопасный способ получения id колекции
  const { collectionId = '' } = useParams()
  const [addSong, { isLoading }] = songApi.useAddSongMutation()

  const navigateToSongs = (songId: string = '') => {
    navigate(`/collections/${collectionId}/songs/${songId}`)
  }

  const handleSubmit = async (form: ISongEditable) => {
    try {
      const newSong = { ...form, collectionId }
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
      onCancel={navigateToSongs}
    />
  )
}
