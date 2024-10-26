import { FC, ReactNode, useEffect, useState } from 'react';
import './SongForm.scss'
import { EMPTY_SONG_OBJ, ISong } from '@entities/song';
import { Button } from '@shared/ui/button';
import { useAppDispatch } from '@shared/hooks';
import { toggleEdit } from '@entities/song';
import { Input } from '@shared/ui/input';
import { Textarea } from '@shared/ui/textarea';
import { useEditSongMutation } from '@entities/song';
import { Select } from '@shared/ui/select';
import { useNavigate, useParams } from 'react-router-dom';

interface ISongForm {
  song?: ISong
  isNew?: boolean
  toggleLayout?: ReactNode
}

export const SongForm: FC<ISongForm> = ({ song = EMPTY_SONG_OBJ, isNew = false, toggleLayout, }) => {

  const navigate = useNavigate()
  const { collectionId } = useParams()
  const [form, setForm] = useState<Partial<ISong>>({})
  const [initialData, setInitialData] = useState<ISong>(song)
  const dispatch = useAppDispatch()
  const [editSong, {isLoading}] = useEditSongMutation()

  useEffect(() => {
    if (song) setInitialData(song)
  }, [initialData])

  const handleChange = (field: string, value: string | string[]) => {
    setForm({...form, [field]: value})
  }

  const handleSubmit = async () => {
    await editSong({ ...form, id: song.id })
    dispatch(toggleEdit())
  }

  const handleCancel = () => {
    dispatch(toggleEdit())
    if (isNew) navigate(`/collections/${collectionId}/songs/`)
  }

  const data = [
    'Избранные',
    'Торжественные',
    'Евангельские', 
    'Благодарственные',
  ]

  const data2 = [
    'C',
    'C+',
    'D',
    'D+',
    'E',
    'F',
    'F+',
    'G',
    'G+',
    'A',
    'A+',
    'B',
  ]

  const title = isNew ? 'Добавление песни' : 'Редактирование песни'

  return (
    <div className="song-form">
      <div className="song-form__header">
        {toggleLayout}
        <h1 className="song-form__title">{title}</h1>
      </div>
      <div className="song-form__container">
        <Input
          value={form.title ?? initialData.title}
          onChange={value => handleChange('title', value)}
        >Название</Input>

        <Select
          items={data}
          values={form.tags ?? initialData.tags}
          placeholder='Категории'
          multiselect={true}
          className="song-form__column"
          onChange={value => handleChange('tags', value)}
        />

        <Select
          items={data2}
          value="C"
          placeholder='Тональность'
          className="song-form__column"
          onChange={value => handleChange('tonality', value)}
        />

        <Textarea
          value={form.body ?? initialData.body}
          placeholder='Текст'
          onChange={value => handleChange('body', value)}
        />
      </div>

      <Button
        className='song-form__button'
        icon='rr-disk'
        onClick={handleSubmit}
        disabled={isLoading}
      >Сохарнить</Button>

      <Button
        className='song-form__button'
        icon='rr-cross-small'
        color='light'
        onClick={handleCancel}
        disabled={isLoading}
      >Отменить</Button>
    </div>
  );
};
