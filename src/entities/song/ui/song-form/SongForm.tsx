import { useState } from 'react'
import './SongForm.scss'
import { EMPTY_SONG_OBJ, ISongEditable } from '@entities/song'
import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
import { Textarea } from '@shared/ui/textarea'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
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
          {t('Save')}
        </Button>

        <Button
          icon='cross-small'
          size='small'
          disabled={isLoading}
          className='song-form__button'
          onClick={onCancel}
        >
          {t('Cancel')}
        </Button>
      </div>

      <div className='song-form__container'>
        <Input
          value={form.title}
          onChange={value => handleChange('title', value)}
        >
          {t('Title')}
        </Input>

        {/* <Select
          options={CATEGORIES}
          value={form.categories}
          placeholder={t('Categories')}
          isMultiselect
          className='song-form__column'
          onChange={value => handleChange('categories', value)}
        /> */}

        {/* <Select
          options={TONALITIES}
          value='C'
          placeholder={t('Tonality')}
          className='song-form__column'
          onChange={value => handleChange('tonalities', value)}
        /> */}

        <Textarea
          value={form.text}
          placeholder={t('Text')}
          onChange={value => handleChange('text', value)}
        />
      </div>
    </div>
  )
}
