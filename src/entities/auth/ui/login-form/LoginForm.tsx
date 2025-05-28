import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
import { useState } from 'react'
import './LoginForm.scss'
import { useGetTokenQuery, useLoginMutation } from '@entities/auth'
import { useNavigate } from 'react-router-dom'

export const LoginForm = () => {
  useGetTokenQuery('')
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState<string>('')
  const idDisabled = !!error || isLoading

  const handlerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const response = await login(form)

    if (response.error) {
      setError(String(response.error))
    } else {
      navigate('/collections')
    }
  }

  const handlerChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value })
    setError('')
  }

  return (
    <form onSubmit={handlerSubmit} className='login-form'>
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
      <Button disabled={idDisabled}>Войти</Button>
    </form>
  )
}
