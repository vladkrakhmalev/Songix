import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
import { useState } from 'react'
import './LoginForm.scss'
import { authApi } from '@entities/auth'
import { useNavigate } from 'react-router-dom'
import { GoogleLoginButton } from './GoogleLoginButton'
import { routerConfig } from '@shared/config'

export const LoginForm = () => {
  const navigate = useNavigate()
  const [login, { isLoading }] = authApi.useLoginMutation()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState<string>('')
  const idDisabled = !!error || isLoading

  const handlerSubmit = async () => {
    const response = await login(form)

    if (response.error) {
      setError('Неверный email или пароль')
    } else {
      navigate(routerConfig.collections)
    }
  }

  const handlerChange = (field: string, value: string) => {
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
        Email
      </Input>

      <Input
        type='password'
        value={form.password}
        onChange={value => handlerChange('password', value)}
        disabled={isLoading}
      >
        Пароль
      </Input>

      {error && <p className='login-form__error'>{error}</p>}

      <Button disabled={idDisabled} onClick={handlerSubmit}>
        Войти
      </Button>

      <GoogleLoginButton />
    </form>
  )
}
