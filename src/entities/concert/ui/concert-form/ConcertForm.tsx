import { useState } from 'react'
import './ConcertForm.scss'
import { EMPTY_CONCERT, IConcertEditable } from '../../model/concertType'
import { validateConcert } from '../../model/validateConcert'
import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
import { useTranslation } from 'react-i18next'

type TProps = {
  initialForm?: IConcertEditable
  onSubmit: (form: IConcertEditable) => void
}
export function ConcertForm({ initialForm = EMPTY_CONCERT, onSubmit }: TProps) {
  const { t } = useTranslation()
  const [form, setForm] = useState<IConcertEditable>(initialForm)
  const [nameError, setNameError] = useState<string | undefined>()

  function handleChange(field: keyof IConcertEditable, value: string) {
    if (field === 'name') setNameError(undefined)
    setForm({ ...form, [field]: value })
  }

  function handleSubmit() {
    const error = validateConcert(form.name)

    if (error) {
      return setNameError(t(error))
    }

    onSubmit(form)
  }

  return (
    <div className='concert-form'>
      <Input
        value={form.name}
        error={nameError}
        shouldFocus
        onChange={value => handleChange('name', value)}
        onSave={handleSubmit}
      >
        {t('Title')}
      </Input>

      <Input
        type='date'
        value={form.date}
        onChange={value => handleChange('date', value)}
      >
        {t('Date')}
      </Input>

      <Button icon='disk' variant='accent' onClick={handleSubmit}>
        {t('Save')}
      </Button>
    </div>
  )
}
