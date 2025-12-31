import { ISong, ISongEditable, songApi, SongForm } from '@entities/song'
import { useAppDispatch } from '@shared/hooks'
import { toggleEditMode } from '../model/editSongSlice'
import { useTranslation } from 'react-i18next'

interface IProps {
  song: ISong
}

export function EditSongForm({ song }: IProps) {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [editSong, { isLoading }] = songApi.useUpdateSongMutation()

  async function handleSubmit(form: ISongEditable) {
    try {
      const data = { ...song, ...form }
      const response = await editSong({ id: song.id, data })
      if (response.data) dispatch(toggleEditMode())
    } catch (error) {
      console.error(error)
    }
  }

  function handleCancel() {
    dispatch(toggleEditMode())
  }

  return (
    <SongForm
      initialForm={song}
      title={t('Edit song')}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  )
}
