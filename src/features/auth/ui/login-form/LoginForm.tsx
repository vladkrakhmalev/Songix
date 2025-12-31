import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
import { useState } from 'react'
import './LoginForm.scss'
import { authApi } from '@entities/auth'
import { useNavigate } from 'react-router-dom'
import { GoogleLoginButton } from './GoogleLoginButton'
import { routes } from '@infra/router'
import { useTranslation } from 'react-i18next'
import { NAMESPACES } from '@infra/translations'

export function LoginForm() {
  const { t } = useTranslation(NAMESPACES.auth)
  const navigate = useNavigate()
  const [login, { isLoading }] = authApi.useLoginMutation()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState<string>('')
  const idDisabled = !!error || isLoading

  async function handlerSubmit() {
    const response = await login(form)

    if (response.error) {
      setError(t('Invalid email or password'))
    } else {
      navigate(routes.collections())
    }
  }

  function handlerChange(field: string, value: string) {
    setForm({ ...form, [field]: value })
    setError('')
  }

  return (
    <form onSubmit={event => event.preventDefault()} className='login-form'>
      <Input
        value={form.email}
        onChange={value => handlerChange('email', value)}
        disabled={isLoading}
      >
        {t('Email')}
      </Input>

      <Input
        type='password'
        value={form.password}
        onChange={value => handlerChange('password', value)}
        disabled={isLoading}
      >
        {t('Password')}
      </Input>

      {error && <p className='login-form__error'>{error}</p>}

      <Button disabled={idDisabled} onClick={handlerSubmit}>
        {t('Sign in')}
      </Button>

      <GoogleLoginButton />
    </form>
  )
}
