import { Button } from "@shared/ui/button"
import { Input } from "@shared/ui/input";
import { useState } from "react";
import './RegistrationForm.scss'
import { register, IRegistration } from "@entities/auth";
import { useNavigate } from "react-router-dom";
import { Popup } from "@shared/ui/popup";
import { PRIVACY_POLICY_TEXT } from "@shared/config/privacy-policy";

export const RegistrationForm = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState<IRegistration>({
    email: '',
    password: '',
    repeatPassword: '',
  })
  const [error, setError] = useState<string>('')
  const idDisabled = error ? true : false
  

  const handlerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await register(form)

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

  const privacyPolicyTrigger = (
    <p className="registration-form__link">
      пользовательского соглашения
    </p>
  )

  const helpText = <p className="registration-form__message">
    Нажимая «Зарегистироваться», вы принимаете следующие условия
    <Popup size='full' trigger={privacyPolicyTrigger}>
      <div
        className="registration-form__pre"
        dangerouslySetInnerHTML={{__html: PRIVACY_POLICY_TEXT}}
      ></div>
    </Popup>
  </p>

  return (
    <form onSubmit={handlerSubmit} className="registration-form">
      <Input
        value={form.email}
        onChange={value => handlerChange('email', value)}
      >Email</Input>

      <Input
        type="password"
        value={form.password}
        onChange={value => handlerChange('password', value)}
      >Пароль</Input>

      <Input
        type="password"
        value={form.repeatPassword}
        onChange={value => handlerChange('repeatPassword', value)}
      >Повторите пароль</Input>

      {error && <p className="registration-form__error">{error}</p>}

      {helpText}

      <Button disabled={idDisabled}>Зарегистироваться</Button>
    </form>
  )
}