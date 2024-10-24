import { Button } from "@shared/ui/button"
import { Input } from "@shared/ui/input";
import { useState } from "react";
import './LoginForm.scss'
import { login, ILogin } from "@entities/auth";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState<ILogin>({
    email: '',
    password: '',
  })
  const [error, setError] = useState<string>('')
  const idDisabled = error ? true : false
  

  const handlerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await login(form)

    if (response.success) {
      navigate('/collections')
    } else {
      setError(response.error)
    }
  }

  const handlerChange = (field: string, value: string) => {
    setForm({...form, [field]: value})
    setError('')
  }

  return (
    <form onSubmit={handlerSubmit} className="login-form">
      <Input
        value={form.email}
        onChange={value => handlerChange('email', value)}
      >Email</Input>
      <Input
        type="password"
        value={form.password}
        onChange={value => handlerChange('password', value)}
      >Пароль</Input>
      {error && <p className="login-form__error">{error}</p>}
      <Button disabled={idDisabled}>Войти</Button>
    </form>
  )
}