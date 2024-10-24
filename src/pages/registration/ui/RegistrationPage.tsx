import { UILink } from "@shared/ui/link";
import { RegistrationForm } from "@entities/auth";

export const RegistrationPage = () => {

  return (
    <>
      <h1>Зарегистироваться</h1>
      <RegistrationForm/>
      <UILink to='/login'>Войти</UILink>
    </>
  )
}