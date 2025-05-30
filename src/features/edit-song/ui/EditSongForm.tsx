import { ISong, ISongEditable, songApi, SongForm } from '@entities/song'
import { useAppDispatch } from '@shared/hooks'
import { toggleEditMode } from '../model/editSongSlice'
import { FC } from 'react'

interface IProps {
  song: ISong
}

export const EditSongForm: FC<IProps> = ({ song }) => {
  const dispatch = useAppDispatch()

  const [editSong, { isLoading }] = songApi.useUpdateSongMutation()

  const handleSubmit = async (form: ISongEditable) => {
    try {
      const data = { ...song, ...form }
      const response = await editSong({ id: song.id, data })
      if (response.data) dispatch(toggleEditMode())
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SongForm
      initialForm={song}
      title='Редактировать песню'
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onCancel={() => dispatch(toggleEditMode())}
    />
  )
}
