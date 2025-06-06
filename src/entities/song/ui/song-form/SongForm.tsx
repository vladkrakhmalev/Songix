import { FC, ReactNode, useState } from 'react'
import './SongForm.scss'
import { EMPTY_SONG_OBJ, ISongEditable } from '@entities/song'
import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
import { Textarea } from '@shared/ui/textarea'
import { Select } from '@shared/ui/select'
import { TONALITIES } from '@entities/song/config/consts'
import { CATEGORIES } from '@entities/category'

interface ISongForm {
  initialForm?: ISongEditable
  isLoading?: boolean
  title?: string
  toggleLayout?: ReactNode
  onSubmit: (form: ISongEditable) => void
  onCancel: () => void
}

export const SongForm: FC<ISongForm> = ({
  initialForm = EMPTY_SONG_OBJ,
  isLoading,
  title,
  toggleLayout,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState<ISongEditable>(initialForm)

  const handleChange = (
    field: keyof ISongEditable,
    value?: string | string[]
  ) => {
    setForm({ ...form, [field]: value })
  }

  return (
    <div className='song-form'>
      <div className='song-form__header'>
        {toggleLayout}
        {title && <h1 className='song-form__title'>{title}</h1>}
      </div>
      <div className='song-form__container'>
        <Input
          value={form.title}
          onChange={value => handleChange('title', value)}
        >
          Название
        </Input>

        <Select
          items={CATEGORIES}
          values={form.categories}
          placeholder='Категории'
          multiselect={true}
          className='song-form__column'
          onChange={value => handleChange('categories', value)}
        />

        <Select
          items={TONALITIES}
          value='C'
          placeholder='Тональность'
          className='song-form__column'
          onChange={value => handleChange('tonalities', value)}
        />

        <Textarea
          value={form.text}
          placeholder='Текст'
          onChange={value => handleChange('text', value)}
        />
      </div>

      <Button
        size='medium'
        className='song-form__button'
        icon='rr-disk'
        disabled={isLoading}
        onClick={() => onSubmit(form)}
      >
        Сохарнить
      </Button>

      <Button
        size='medium'
        className='song-form__button'
        icon='rr-cross-small'
        color='light'
        disabled={isLoading}
        onClick={onCancel}
      >
        Отменить
      </Button>
    </div>
  )
}
