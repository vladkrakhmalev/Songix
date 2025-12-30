import { useState } from 'react'
import './SongForm.scss'
import { EMPTY_SONG_OBJ, ISongEditable } from '@entities/song'
import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
import { Textarea } from '@shared/ui/textarea'

interface ISongForm {
  initialForm?: ISongEditable
  isLoading?: boolean
  title: string
  onSubmit: (form: ISongEditable) => void
  onCancel: () => void
}

export function SongForm({
  initialForm = EMPTY_SONG_OBJ,
  isLoading,
  title,
  onSubmit,
  onCancel,
}: ISongForm) {
  const [form, setForm] = useState<ISongEditable>(initialForm)

  function handleChange(field: keyof ISongEditable, value?: string | string[]) {
    setForm({ ...form, [field]: value })
  }

  return (
    <div className='song-form'>
      <div className='song-form__header'>
        <h1 className='song-form__title'>{title}</h1>

        <Button
          icon='disk'
          variant='accent'
          size='small'
          disabled={isLoading}
          className='song-form__button'
          onClick={() => onSubmit(form)}
        >
          Сохарнить
        </Button>

        <Button
          icon='cross-small'
          size='small'
          disabled={isLoading}
          className='song-form__button'
          onClick={onCancel}
        >
          Отменить
        </Button>
      </div>

      <div className='song-form__container'>
        <Input
          value={form.title}
          onChange={value => handleChange('title', value)}
        >
          Название
        </Input>

        {/* <Select
          options={CATEGORIES}
          value={form.categories}
          placeholder='Категории'
          isMultiselect
          className='song-form__column'
          onChange={value => handleChange('categories', value)}
        /> */}

        {/* <Select
          options={TONALITIES}
          value='C'
          placeholder='Тональность'
          className='song-form__column'
          onChange={value => handleChange('tonalities', value)}
        /> */}

        <Textarea
          value={form.text}
          placeholder='Текст'
          onChange={value => handleChange('text', value)}
        />
      </div>
    </div>
  )
}
