import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
import { useState } from 'react'
import './ResetPasswordForm.scss'
import { useTranslation } from 'react-i18next'
import { NAMESPACES } from '@infra/translations'

export function ResetPasswordForm() {
  const { t } = useTranslation(NAMESPACES.auth)
  const [form, setForm] = useState({ email: '' })
  const [error, setError] = useState<string>('')
  const idDisabled = error ? true : false

  async function handlerSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // const response = await resetPassword(form)

    // if (response.success) {

    // } else {
    //   setError(response.error)
    // }
  }

  function handlerChange(field: string, value: string) {
    setForm({ ...form, [field]: value })
    setError('')
  }

  return (
    <form onSubmit={handlerSubmit} className='reset-password-form'>
      <Input
        value={form.email}
        onChange={value => handlerChange('email', value)}
      >
        {t('Email')}
      </Input>

      {error && <p className='reset-password-form__error'>{error}</p>}

      <Button disabled={idDisabled}>{t('Recover password')}</Button>
    </form>
  )
}
