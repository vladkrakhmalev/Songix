import { Button } from "@shared/ui/button"
import { Input } from "@shared/ui/input";
import { useState } from "react";
import './ResetPassword.scss'
import { resetPassword, IResetPassword } from "@entities/auth";

export const ResetPassword = () => {

  const [form, setForm] = useState<IResetPassword>({ email: '' })
  const [error, setError] = useState<string>('')
  const idDisabled = error ? true : false
  

  const handlerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await resetPassword(form)

    if (response.success) {

    } else {
      setError(response.error)
    }
  }

  const handlerChange = (field: string, value: string) => {
    setForm({...form, [field]: value})
    setError('')
  }

  return (
    <form onSubmit={handlerSubmit} className="reset-password-form">
      <Input
        value={form.email}
        onChange={value => handlerChange('email', value)}
      >Email</Input>  
      {error && <p className="reset-password-form__error">{error}</p>}
      <Button disabled={idDisabled}>Восстановить пароль</Button>
    </form>
  )
}